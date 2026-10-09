// Evaluate the data scripts in the same order as index.html, then the media enrichment.
const fs=require('node:fs'), vm=require('node:vm'), path=require('node:path');
const root=path.resolve(__dirname,'..');
const noop=()=>{};
const element=()=>({style:{},classList:{add:noop,remove:noop,contains:()=>false},setAttribute:noop,appendChild:noop,addEventListener:noop,querySelector:()=>element()});
const context={window:{},document:{readyState:'complete',querySelector:()=>null,getElementById:()=>null,createElement:element,head:element(),body:element(),addEventListener:noop},MutationObserver:class{observe(){}},console};
vm.createContext(context);
const files=[...fs.readFileSync(path.join(root,'index.html'),'utf8').matchAll(/<script src="(museum-[^"?]+)[^"]*"/g)].map(m=>m[1]);
for(const file of [...files,'article-media-v4.js'])vm.runInContext(fs.readFileSync(path.join(root,file),'utf8'),context,{filename:file});
const result={articles:context.window.MUSEUM_ARTICLES,points:context.window.MUSEUM_POINTS,aliases:context.window.MUSEUM_LEGACY_RUNTIME_ALIASES};
process.stdout.write(JSON.stringify(result,null,2)+'\n');
