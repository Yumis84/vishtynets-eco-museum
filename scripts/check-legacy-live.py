#!/usr/bin/env python3
"""Read-only HTTP evidence; lxml required. No production changes."""
import concurrent.futures, datetime, hashlib, json, pathlib, re, sys, urllib.request, urllib.error, urllib.parse
from lxml import html

ROOT = pathlib.Path(__file__).resolve().parent.parent
DONOR = pathlib.Path(sys.argv[1] if len(sys.argv)>1 else ROOT.parent / 'legacy')
sha = lambda b: hashlib.sha256(b).hexdigest()
def text_body(raw):
    try: decoded = raw.decode('utf-8'); encoding = 'utf-8'
    except UnicodeDecodeError: decoded = raw.decode('cp1251'); encoding = 'cp1251'
    decoded = re.sub(r'<meta\b[^>]*charset[^>]*>', '', decoded, flags=re.I)
    tree = html.fromstring(decoded)
    for e in tree.xpath('//script|//style'): e.drop_tree()
    body = tree.find('body')
    text = ' '.join((body if body is not None else tree).text_content().split())
    return text, encoding

def fetch(job):
    url, source = job
    row = {'url':url, 'checked_at_utc':datetime.datetime.now(datetime.timezone.utc).isoformat()}
    try:
        with urllib.request.urlopen(urllib.request.Request(url, headers={'User-Agent':'MuseumMigrationEvidence/1.0'}), timeout=12) as r:
            raw=r.read(); row.update(status=r.status, final_url=r.url, content_type=r.headers.get('Content-Type'), bytes=len(raw), raw_sha256=sha(raw))
        if 'html' in (row['content_type'] or ''):
            body,enc=text_body(raw); row.update(encoding=enc, normalized_body_sha256=sha(body.encode()),normalized_body_chars=len(body),body_excerpt=body[:180])
        else: body=None
        if source:
            original=source.read_bytes(); old,enc=text_body(original)
            row.update(donor_path=source.name,donor_raw_sha256=sha(original),donor_normalized_body_sha256=sha(old.encode()),donor_body_chars=len(old),donor_encoding=enc,raw_equal=raw==original,normalized_body_equal=old==body)
            if body != old:
                import difflib
                row['body_similarity']=round(difflib.SequenceMatcher(None,old,body or '',autojunk=False).ratio(),6)
                stash=ROOT.parent/'live-source-evidence'; stash.mkdir(exist_ok=True)
                (stash/source.name).write_bytes(raw)
        row['result']='FETCHED'
    except urllib.error.HTTPError as e: row.update(result='HTTP_ERROR',status=e.code,error=str(e))
    except Exception as e: row.update(result='NETWORK_OR_PARSE_ERROR',error=str(e))
    return row

sources=sorted(p for p in DONOR.iterdir() if p.suffix.lower() in ('.htm','.html'))
jobs=[('https://www.wystynez.ru/'+urllib.parse.quote(p.name),p) for p in sources]
extra=['https://www.wystynez.ru/','https://wystynez.ru/']
for host in ['rominten.wystynez.ru','www.rominten.wystynez.ru']:
    extra += ['https://'+host+p for p in ['/','/p40.htm','/p37.htm','/p30.htm']]
extra += ['https://vishtynets.ru/','https://vishtynets.ru/app.css','https://vishtynets.ru/articles-v3.js']
jobs += [(url,None) for url in extra]
with concurrent.futures.ThreadPoolExecutor(max_workers=5) as pool: results=list(pool.map(fetch,jobs))
out={'checked_at_utc':datetime.datetime.now(datetime.timezone.utc).isoformat(),'donor_commit':'ba42a20180cc475e176c8b98606568580b754171','method':'urllib timeout 12s; 5 workers; strict UTF-8 then CP1251; remove malformed charset meta before lxml; strip scripts/styles; whitespace-normalized entire body, including navigation','source_html_count':len(sources),'checks':results}
(ROOT/'data/legacy-live-source-checks.json').write_text(json.dumps(out,ensure_ascii=False,indent=2)+'\n')
print(json.dumps({'count':len(results),'source_html_count':len(sources),'fetched':sum(r['result']=='FETCHED' for r in results),'body_equal':sum(r.get('normalized_body_equal',False) for r in results),'different':[r['donor_path'] for r in results if r.get('normalized_body_equal') is False],'errors':[r for r in results if r['result']!='FETCHED']},ensure_ascii=False))
