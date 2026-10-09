#!/usr/bin/env python3
"""Evidence matrix for preserved donor HTML versus current runtime records."""
import csv,hashlib,json,re
from pathlib import Path
from lxml import html,etree
ROOT=Path(__file__).resolve().parents[1]; DONOR=ROOT.parent/'legacy'
RUNTIME=json.loads(Path('/tmp/museum-runtime-after.json').read_text())
by_url={}
for a in RUNTIME['articles']:
 u=a.get('legacyUrl')
 if u: by_url[re.sub(r'^https?://(?:www\.)?wystynez\.ru/','',u).lower().rstrip('/')]=a
rest=json.loads((ROOT/'data/legacy-restored-priority.json').read_text())
restpages={a['sourcePage'].lower() for a in rest['articles']}
nav={'index.htm','index.html','_scft.htm','p0084.htm','p45.htm','p0008.htm'}
rows=[]
for p in sorted(DONOR.rglob('*')):
 if p.suffix.lower() not in ('.htm','.html'): continue
 raw=p.read_bytes(); sha=hashlib.sha256(raw).hexdigest(); rel=p.relative_to(DONOR).as_posix()
 try: doc=html.fromstring(raw.decode('utf-8','replace'))
 except Exception: doc=html.fromstring(raw)
 title=' '.join(doc.xpath('//title//text()')).strip()
 body=' '.join(' '.join(x.split()) for x in doc.xpath('//body//text()') if x.strip())
 images=doc.xpath('//img/@src'); hrefs=doc.xpath('//a/@href')
 docs=[x for x in hrefs if re.search(r'\.(pdf|docx?|xlsx?|zip|rar)(?:$|[?#])',x,re.I)]
 key=p.name.lower(); runtime=by_url.get(key) or by_url.get(rel.lower())
 typ='navigation' if key in nav else ('archive-index' if key=='p0008.htm' else 'article')
 if typ=='navigation': status='SKIP' if key in {'_scft.htm','index.htm','index.html'} else 'ARCHIVE-ONLY'
 elif runtime is None: status='ARCHIVE-ONLY'
 elif key in restpages: status='PARTIAL' # text recovered; full public/media QA still open
 else: status='PARTIAL'
 rows.append({'source_path':rel,'legacy_url':'https://www.wystynez.ru/'+rel,'title':title,'type':typ,'runtime_id':runtime.get('id','') if runtime else '', 'source_text_chars':len(body),'source_image_count':len(images),'source_document_count':len(docs),'runtime_content_blocks':len(runtime.get('content',[])) if runtime else 0,'runtime_image_count':len(runtime.get('images',[])) if runtime else 0,'source_sha256':sha,'status':status,'next_action':'Verify source-to-runtime body/media parity and public rendering' if runtime else 'Keep as archive provenance; determine whether a dedicated public representation is warranted','evidence':'falke0039/wystynez@ba42a20180cc475e176c8b98606568580b754171:'+rel})
# runtime-only rows make denominator reconciliation explicit
source_keys={r['runtime_id'] for r in rows if r['runtime_id']}
for a in RUNTIME['articles']:
 if a['id'] not in source_keys:
  rows.append({'source_path':'','legacy_url':a.get('legacyUrl',''),'title':a.get('title',''),'type':'runtime-only','runtime_id':a['id'],'source_text_chars':0,'source_image_count':0,'source_document_count':0,'runtime_content_blocks':len(a.get('content',[])),'runtime_image_count':len(a.get('images',[])),'source_sha256':'','status':'ARCHIVE-ONLY','next_action':'Identify dedicated donor page or retain as archive-index/recovery record','evidence':'runtime '+a['id']})
out=ROOT/'docs/legacy-migration-matrix.csv';out.parent.mkdir(exist_ok=True)
fields=list(rows[0]);
with out.open('w',newline='',encoding='utf-8') as f:
 w=csv.DictWriter(f,fieldnames=fields);w.writeheader();w.writerows(rows)
from collections import Counter
c=Counter(r['status'] for r in rows); types=Counter(r['type'] for r in rows)
summary={'generated':'2026-10-09','donor_html_pages':sum(r['type']!='runtime-only' for r in rows),'rows_including_runtime_only':len(rows),'source_type_counts':dict(types),'status_counts':dict(c),'restored_priority_pages':len(restpages),'runtime_articles':len(RUNTIME['articles']),'rules':'FULL is intentionally zero until public/mobile QA and exact source-media parity are verified; PARTIAL includes restored text pending final gates.'}
(ROOT/'docs/legacy-migration-matrix-summary.json').write_text(json.dumps(summary,ensure_ascii=False,indent=2)+'\n')
(ROOT/'docs/LEGACY_MIGRATION_RECONCILIATION_2026-10-09.md').write_text(f'''# Legacy migration reconciliation — 2026-10-09\n\nMachine-readable matrix: `docs/legacy-migration-matrix.csv`. Donor commit: `ba42a20180cc475e176c8b98606568580b754171`.\n\nThe preserved donor contains **{summary["donor_html_pages"]} HTML rows**; the matrix adds **{summary["rows_including_runtime_only"]-summary["donor_html_pages"]} runtime-only rows** so the populations are not falsely treated as identical. Current runtime contains **{summary["runtime_articles"]} reconciled article records**.\n\n## Current classification\n\n| Status | Count | Meaning |\n|---|---:|---|\n'''+''.join(f'| {k} | {v} | {"No source/runtime representation yet or archive-index evidence only" if k=="ARCHIVE-ONLY" else "Navigation/support or intentionally excluded" if k=="SKIP" else "Source identified; text/media/public verification remains" if k=="PARTIAL" else "Not used in this conservative checkpoint"} |\\n' for k,v in sorted(c.items()))+'''\n`FULL` is intentionally zero at this checkpoint: source text restoration and repository mappings are implemented, but final source-media parity and public desktop/mobile rendering have not yet been verified.\n\nThe matrix records exact source byte hashes, titles, source image/document counts, runtime block/media counts, source paths and next actions. `rominten.wystynez.ru` remains a separate DEFER workstream because the live host currently mirrors the main site response for the tested root and cannot be treated as reliable historical evidence.\n''')
print(json.dumps(summary,ensure_ascii=False))
