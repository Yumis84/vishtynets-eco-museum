const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const base='https://raw.githubusercontent.com/Yumis84/guest-house-map/main/';
const site=process.env.PREVIEW_URL||'http://127.0.0.1:8765/';
const artifacts=process.env.ARTIFACT_DIR||'/tmp/guest-map-artifacts';
fs.mkdirSync(artifacts,{recursive:true});
async function source(file){const r=await fetch(base+file);assert.ok(r.ok);return r.text()}
(async()=>{
  const data=await source('guest-houses.js'),photos=await source('guest-photos-v4.js');
  const houses=vm.runInNewContext('('+data.match(/window\.GUEST_HOUSES\s*=\s*(\[[\s\S]*?\]);/)[1]+')').filter(h=>h.active!==false&&!h.parentId);
  const covers=vm.runInNewContext('('+photos.match(/const\s+SOURCES\s*=\s*({[\s\S]*?});/)[1]+')');
  assert.equal(houses.length,7);
  const browser=await chromium.launch({headless:true});
  let page;
  const openMap=async()=>{
    await page.goto(site,{waitUntil:'domcontentloaded'});
    await page.locator('#bottomNav [data-nav="map"]').click();
    await page.locator('[data-map-category="Гостевые дома"]').waitFor({timeout:25000});
  };
  const toggle=()=>page.locator('[data-map-category="Гостевые дома"]').click();
  try{
    for(const viewport of [{width:390,height:844},{width:1366,height:900}]){
      page=await browser.newPage({viewport});
      const errors=[];page.on('pageerror',e=>errors.push(e.message));
      await openMap();await toggle();
      await page.waitForFunction(()=>document.querySelectorAll('[data-guest-id]').length===7);
      assert.equal(await page.locator('.guest-pin').count(),7);
      const actual=await page.locator('[data-guest-id]').evaluateAll(es=>es.map(e=>e.dataset.guestId).sort());
      assert.equal(JSON.stringify(actual),JSON.stringify(houses.map(h=>h.id).sort()));
      // Stable IDs: an overlapping marker must never silently test the previous house again.
      const seen=new Set();
      for(const h of houses){
        const marker=page.locator(`[data-guest-id="${h.id}"]`);
        await marker.dispatchEvent('click');
        await page.waitForFunction(name=>document.querySelector('#mapCard h3')?.textContent===name,h.name);
        assert.equal(await page.locator('#mapCard p').textContent(),h.address);
        const image=page.locator('#mapCard .map-place-photo img');
        const expected=new URL(covers[h.id].images[0],'https://yumis84.github.io/guest-house-map/').href;
        assert.equal(await image.getAttribute('src'),expected);
        await page.waitForFunction(()=>{const img=document.querySelector('#mapCard img');return img?.complete&&img.naturalWidth>0});
        const popupPromise=page.waitForEvent('popup');
        await page.locator('#openGuestCatalog').click();
        const popup=await popupPromise;
        await popup.waitForURL('**/?house='+h.id,{waitUntil:'domcontentloaded'});
        assert.equal(new URL(popup.url()).searchParams.get('house'),h.id);
        await popup.close();
        const route=page.locator('#mapCard a');
        assert.equal(new URL(await route.getAttribute('href')).searchParams.get('rtext'),'~'+h.lat+','+h.lng);
        assert.equal(await route.getAttribute('target'),'_blank');
        assert.match(await route.getAttribute('rel'),/noopener/);
        assert.equal(await route.isVisible(),true);
        await route.click({trial:true}); // Verify that map controls do not cover the action.
        const bounds=await page.locator('#mapCard .map-place-card').boundingBox();
        assert.ok(bounds.x>=0&&bounds.x+bounds.width<=viewport.width+1,'Card fits screen');
        await page.screenshot({path:`${artifacts}/map-${viewport.width}-${h.id}.png`});
        seen.add(h.id);console.log('PASS',viewport.width,h.id,h.name,'photo, exact link, route');
      }
      assert.equal(seen.size,7);assert.deepEqual(errors,[]);
      // Search, then a real pointer click on the now isolated first house marker.
      await toggle();await toggle();
      await page.locator('#mapSearch').fill(houses[0].name);
      await page.locator(`[data-guest-id="${houses[0].id}"]`).click();
      assert.equal(await page.locator('#mapCard h3').textContent(),houses[0].name);
      await page.locator('#mapSearch').fill('');
      await toggle();assert.equal(await page.locator('.guest-pin').count(),0);
      assert.ok(await page.locator('.poi-pin').count()>0);
      await page.close();
      // Failure and retry must preserve the museum layer.
      for(const mode of ['unavailable','malformed','executable','invalid-coordinates','photo-source','photo-image']){
        page=await browser.newPage({viewport});
        await page.route(base+'guest-houses.js',route=>{
          if(mode==='unavailable')return route.fulfill({status:503,body:'unavailable'});
          if(mode==='malformed')return route.fulfill({body:'bad catalog'});
          if(mode==='executable')return route.fulfill({body:'window.GUEST_HOUSES=[{id:(window.__injected=true)}];'});
          if(mode==='invalid-coordinates')return route.fulfill({body:data.replace('lat:54.39479297519165','lat:999')});
          return route.continue();
        });
        if(mode==='photo-source')await page.route(base+'guest-photos-v4.js',route=>route.abort());
        if(mode==='photo-image')await page.route('https://yumis84.github.io/guest-house-map/assets/**',route=>route.abort());
        await openMap();await toggle();
        if(mode.startsWith('photo-')){
          await page.waitForFunction(()=>document.querySelectorAll('.guest-pin').length===7);
          await page.locator('[data-guest-id="house_001"]').dispatchEvent('click');
          await page.locator('#openGuestCatalog').waitFor();
          if(mode==='photo-image')await page.getByText('Фото недоступно',{exact:true}).waitFor();
          else assert.equal(await page.locator('#mapCard img').count(),0);
        }else{
          await page.locator('[data-guest-error]').waitFor();
          assert.equal(await page.locator('.guest-pin').count(),0);
          assert.ok(await page.locator('.poi-pin').count()>0);
          assert.equal(await page.evaluate(()=>window.__injected),undefined);
          await page.unroute(base+'guest-houses.js');
          await toggle();
          await page.waitForFunction(()=>document.querySelectorAll('.guest-pin').length===7);
        }
        console.log('PASS',viewport.width,mode);await page.close();
      }
    }
  }catch(e){if(page&&!page.isClosed())await page.screenshot({path:artifacts+'/failure.png'});throw e}
  finally{await browser.close()}
})().catch(e=>{console.error(e);process.exit(1)});
