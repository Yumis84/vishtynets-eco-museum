const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const dir='/tmp/guest-map-artifacts';fs.mkdirSync(dir,{recursive:true});
(async()=>{
 const browser=await chromium.launch({headless:true});let page;
 try{
  for(const viewport of [{width:390,height:844},{width:1366,height:900}]){
   page=await browser.newPage({viewport});const errors=[];page.on('pageerror',e=>errors.push(e.message));
   await page.goto('http://127.0.0.1:8765/',{waitUntil:'domcontentloaded'});
   await page.locator('#bottomNav [data-nav="map"]').click();
   await page.locator('[data-map-category="Музей"] .map-chip-label').waitFor();
   const points=await page.evaluate(()=>window.MUSEUM_POINTS.filter(p=>Number.isFinite(p.lat)&&Number.isFinite(p.lng)&&p.articleIds?.length));
   const chip=c=>page.locator(`[data-map-category="${c}"]`);
   const ids=async()=>page.locator('[data-point-id]').evaluateAll(es=>es.map(e=>e.dataset.pointId).sort());
   const expected=c=>points.filter(p=>c==='Все'||[p.category,...(p.categories||[])].some(t=>c==='Камни'?/валун|камн|геолог/i.test(t):t?.toLowerCase()===c.toLowerCase())).map(p=>p.id).sort();
   const assertCategory=async c=>{
    assert.deepEqual(await ids(),expected(c),c+' exact marker set');
    assert.equal(await chip(c).getAttribute('aria-pressed'),'true');
    assert.equal(await page.locator('[data-map-category]:not([data-map-category="Гостевые дома"])[aria-pressed="true"]').count(),1);
    if(c!=='Все')assert.ok((await page.locator('[data-point-category]').evaluateAll(es=>es.map(e=>e.dataset.pointCategory))).every(x=>x===c));
   };
   const assertPanels=async panel=>{
    await page.waitForFunction(panel=>['filters','layers'].every(p=>document.querySelector(p==='filters'?'#mapFilterButton':'#mapLayersButton').getAttribute('aria-expanded')===String(p===panel)),panel);
   };
   await assertCategory('Все');await assertPanels(null);
   for(const c of ['Природа','История','Камни','Мосты','Музей']){
    await chip(c).click();await assertCategory(c);
    await page.screenshot({path:`${dir}/filter-${viewport.width}-${c}.png`});
    await chip(c).click();await assertCategory('Все'); // Repeat clears the category.
    await page.locator('#mapFilterButton').click();await assertPanels('filters');
    await page.locator(`[data-map-sheet-category="${c}"]`).click();await assertCategory(c);await assertPanels(null);
    await page.locator('#mapFilterButton').click();
    assert.equal(await page.locator(`[data-map-sheet-category="${c}"]`).getAttribute('aria-pressed'),'true');
    await page.locator(`[data-map-sheet-category="${c}"]`).click();await assertCategory('Все');
    console.log('PASS',viewport.width,c,'exact IDs, icon category, chip/modal toggle reset');
   }
   // A hidden point must not leave an unrelated card on the map.
   await chip('Музей').click();await page.locator('[data-point-id="poi_museum"]').dispatchEvent('click');
   await page.locator('#mapCard h3').waitFor();await chip('Природа').click();
   assert.equal(await page.locator('#mapCard h3').count(),0);
   await chip('Все').click();
   await chip('Гостевые дома').click();await page.waitForFunction(()=>document.querySelectorAll('.guest-pin').length===7);
   await assertPanels(null); // Guest source must not highlight the Layers toolbar button.
   await chip('Музей').click();await assertCategory('Музей');assert.equal(await page.locator('.guest-pin').count(),7);
   await page.locator('#mapLayersButton').click();await assertPanels('layers');
   assert.equal(await page.locator('#mapGuestLayerSwitch').getAttribute('aria-pressed'),'true');
   await page.locator('#mapMuseumLayerSwitch').click();assert.equal(await page.locator('.poi-pin').count(),0);assert.equal(await page.locator('.guest-pin').count(),7);
   assert.equal(await page.locator('#mapMuseumLayerSwitch').getAttribute('aria-pressed'),'false');
   await page.locator('#mapGuestLayerSwitch').click();assert.equal(await page.locator('.guest-pin').count(),0);await page.locator('[data-map-empty]').waitFor();
   await page.locator('#mapGuestLayerSwitch').click();assert.equal(await page.locator('.guest-pin').count(),7);
   await page.locator('#mapMuseumLayerSwitch').click();await assertCategory('Музей');
   await page.screenshot({path:`${dir}/layers-${viewport.width}.png`});
   await page.locator('#sheetClose').click();await assertPanels(null);
   await chip('Музей').click();await assertCategory('Все');
   await page.locator('[data-guest-id="house_001"]').dispatchEvent('click');await page.locator('#mapCard h3').waitFor();
   await page.locator('#mapSearch').fill('несуществующее место 948561');
   assert.equal(await page.locator('.poi-pin,.guest-pin').count(),0);assert.equal(await page.locator('#mapCard h3').count(),0);await page.locator('[data-map-empty]').waitFor();
   await page.locator('#mapSearch').fill('');await assertCategory('Все');assert.equal(await page.locator('.guest-pin').count(),7);
   await page.locator('#mapLayersButton').click();await page.locator('#mapMuseumLayerSwitch').click();await page.locator('#sheetClose').click();
   await chip('История').click();await assertCategory('История'); // Category re-enables its source.
   await page.locator('#mapLayersButton').click();await page.locator('#mapGuestLayerSwitch').click();await page.locator('#sheetClose').click();
   assert.equal(await chip('Гостевые дома').getAttribute('aria-pressed'),'false');await assertPanels(null);
   assert.deepEqual(errors,[]);console.log('PASS',viewport.width,'source switches, independent highlights, search, stale cards, restore');
   await page.close();
  }
 }catch(e){if(page&&!page.isClosed())await page.screenshot({path:dir+'/filter-failure.png'});throw e}
 finally{await browser.close()}
})().catch(e=>{console.error(e);process.exit(1)});
