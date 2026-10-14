const fs=require('node:fs');
const vm=require('node:vm');
const assert=require('node:assert/strict');
const app=fs.readFileSync('app.js','utf8');
const parser=app.slice(app.indexOf('function parseGuestLiteral('),app.indexOf('async function loadGuestHouses('));
const parse=vm.runInNewContext(`(${parser})`);
const catalog=fs.readFileSync(process.argv[2]||'/tmp/guest-houses.js','utf8');
const photoText=fs.readFileSync(process.argv[3]||'/tmp/guest-photos-v4.js','utf8');
const literal=catalog.match(/window\.GUEST_HOUSES\s*=\s*(\[[\s\S]*?\]);/)[1];
const photoLiteral=photoText.match(/const\s+SOURCES\s*=\s*({[\s\S]*?});/)[1];
const houses=parse(literal),photos=parse(photoLiteral);
// Independently compare the restricted parser with trusted catalog literals in Node's VM.
assert.equal(JSON.stringify(houses),JSON.stringify(vm.runInNewContext('('+literal+')')));
assert.equal(JSON.stringify(photos),JSON.stringify(vm.runInNewContext('('+photoLiteral+')')));
const parents=houses.filter(h=>h.active!==false&&!h.parentId);
assert.equal(parents.length,7);
assert.equal(new Set(parents.map(h=>h.id)).size,7);
for(const h of parents){
  assert.ok(Number.isFinite(h.lat)&&Math.abs(h.lat)<=90);
  assert.ok(Number.isFinite(h.lng)&&Math.abs(h.lng)<=180);
  assert.match(photos[h.id].images[0],/^assets\//);
  console.log(h.id,h.name,h.lat,h.lng,photos[h.id].images[0]);
}
for(const malicious of ['[{id:(globalThis.pwned=true)}]','[{id:foo()}]','[{...foo}]','[{get id(){return 1}}]','[undefined]','[NaN]'])assert.throws(()=>parse(malicious));
assert.equal(parse("{text:'it\\'s \\\"ok\\\" \\u0041',a:[true,false,null,],}").text,'it\'s "ok" A');
assert.ok(!app.includes('Function('),'Remote catalog must not be executable');
console.log('PASS canonical data/photo parity and rejection of executable input');
