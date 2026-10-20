const {chromium, devices}=require('playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const base=process.env.MAP_TEST_URL||'http://127.0.0.1:8765/';
const out=process.env.MAP_TEST_OUTPUT||'/tmp/map-controls';
fs.mkdirSync(out,{recursive:true});
(async()=>{
 const browser=await chromium.launch({headless:true});
 const results=[];
 for(const config of [{name:'mobile-390',...devices['iPhone 13']},{name:'mobile-360',viewport:{width:360,height:800},isMobile:true,hasTouch:true},{name:'desktop',viewport:{width:1366,height:900}}]){
  const {name,...options}=config;
  const page=await browser.newPage(options),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  const scripts={};
  page.on('response',async r=>{if(/\/(app|map-v3|icons-v3-runtime)\.js\?/.test(r.url()))scripts[r.url()]=require('node:crypto').createHash('sha256').update(await r.body()).digest('hex')});
  await page.goto(base,{waitUntil:'load'});
  const click=async selector=>{const loc=page.locator(selector);options.hasTouch?await loc.tap():await loc.click()};
  const chip=c=>`#mapCategories [data-map-category="${c}"]`;
  const pressed=async(selector,on)=>assert.equal(await page.locator(selector).getAttribute('aria-pressed'),String(on),selector);
  const count=async type=>page.locator('.leaflet-marker-pane .'+type).count();
  const snapshot=async step=>results.push({name,step,poi:await count('poi-pin'),guests:await count('guest-pin'),chips:await page.locator('#mapCategories button').evaluateAll(bs=>bs.map(b=>({label:b.dataset.mapCategory,pressed:b.getAttribute('aria-pressed'),active:b.classList.contains('is-active')})))});
  await click('#bottomNav [data-nav="map"]');
  await page.waitForSelector('script[data-map-v3-safe]');
  await page.waitForFunction(()=>document.querySelector('#mapCategories .map-chip-label'));
  await page.waitForSelector('.poi-pin');
  const total=await count('poi-pin'); assert(total>0);
  await snapshot('initial');
  await click('#mapLayersButton');
  const layer='[data-map-layer="museum"]';
  await pressed(layer,true);
  await click(layer+' strong'); await pressed(layer,false);assert.equal(await count('poi-pin'),0);await snapshot('attractions-off');
  await click(layer+' small'); await pressed(layer,true);assert.equal(await count('poi-pin'),total);
  await click('[data-map-layer="guests"] strong');
  await page.waitForSelector('.guest-pin'); assert.equal(await count('guest-pin'),7);await pressed('[data-map-layer="guests"]',true);
  await click(layer);assert.equal(await count('poi-pin'),0);assert.equal(await count('guest-pin'),7);
  await click(layer);await click('#sheetClose');
  await click(chip('Все')+' span');await pressed(chip('Все'),false);assert.equal(await count('poi-pin'),0);assert.equal(await count('guest-pin'),7);await snapshot('all-off-guests-on');
  await click(chip('Все'));await pressed(chip('Все'),true);assert.equal(await count('poi-pin'),total);
  await click(chip('Гостевые дома'));await pressed(chip('Гостевые дома'),false);assert.equal(await count('guest-pin'),0);assert.equal(await count('poi-pin'),total);
  for(const category of ['Природа','История','Камни','Мосты','Музей']){
   await click(chip(category));await pressed(chip(category),true);
   await click(chip(category));await pressed(chip(category),false);assert.equal(await count('poi-pin'),0);
  }
  await click(chip('Все'));
  await page.locator('#mapSearch').fill('zzzz-no-match');assert.equal(await count('poi-pin'),0);
  await page.locator('#mapSearch').fill('');assert.equal(await count('poi-pin'),total);
  await click('#mapFilterButton');await click('[data-map-sheet-category="Природа"] span');await pressed(chip('Природа'),true);
  await click('#mapLayersButton');await pressed(layer,true);await click('#sheetClose');
  await click('#bottomNav [data-nav="home"]');await click('#bottomNav [data-nav="map"]');await pressed(chip('Природа'),true);
  await click(chip('Все'));await click(chip('Гостевые дома'));await page.waitForSelector('.guest-pin');
  await page.screenshot({path:`${out}/${name}.png`});await snapshot('final');
  assert.deepEqual(errors,[]);results.push({name,scripts,errors});await page.close();
 }
 // Delayed/error guest service: rapid on/off/on must share a single request; retry works.
 const page=await browser.newPage({...devices['iPhone 13']});let requests=0,release;
 await page.route('**/guest-house-map/main/guest-houses.js',async route=>{requests++;await new Promise(r=>release=r);await route.fulfill({status:503,body:'Unavailable'})});
 await page.goto(base);await page.locator('#bottomNav [data-nav="map"]').tap();await page.waitForSelector('.poi-pin');
 const guest=page.locator('#mapCategories [data-map-category="Гостевые дома"]');
 await Promise.all([page.waitForRequest('**/guest-house-map/main/guest-houses.js'),guest.tap()]);
 await guest.tap();await guest.tap();assert.equal(requests,1);release();
 await page.waitForFunction(()=>document.querySelector('[data-map-category="Гостевые дома"]').getAttribute('aria-pressed')==='false');
 await page.unroute('**/guest-house-map/main/guest-houses.js');await guest.tap();await page.waitForSelector('.guest-pin');assert.equal(await page.locator('.guest-pin').count(),7);
 results.push({name:'failure-retry',requests,result:'PASS'});
 fs.writeFileSync(`${out}/results.json`,JSON.stringify(results,null,2));
 console.log(JSON.stringify(results,null,2));await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
