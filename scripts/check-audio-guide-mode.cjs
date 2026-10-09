// Static regression check for reversible museum audio guide access.
// Usage: node scripts/check-audio-guide-mode.cjs [open|ui_gated]
'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');
const read=name=>fs.readFileSync(path.join(root,name),'utf8');
const data=read('audio-guide-data.js'),core=read('audio-guide-v2-core.js'),payment=read('audio-guide-payment.js'),loader=read('audio-guide-v2.js'),html=read('index.html');
const match=data.match(/access:\{mode:'(open|ui_gated)'/);
assert(match,'Audio access mode missing or unexpected');
const mode=match[1],expected=process.argv[2]||'open';
assert(['open','ui_gated'].includes(expected),'Expected mode must be open or ui_gated');
assert.equal(mode,expected,'Configured mode differs from expected');
assert(core.includes("guide?.access?.mode!=='open'&&track?.access==='paid'"),'Track lock is not mode-aware');
assert(core.includes("function openAccess(){if(guide?.access?.mode==='open')return;"),'Payment modal is not mode-aware');
assert(payment.includes("if(window.VISHTYNETS_AUDIO_GUIDES?.museum?.access?.mode==='open')return;"),'Payment integration is not mode-aware');
assert(core.includes('function playTrack(t){if(!t)return;if(isLocked(t))'),'Player does not check access');
assert(core.includes('function renderTrack(t){const locked=isLocked(t)'),'Track cards do not use access check');
const dataVersion=html.match(/audio-guide-data\.js\?v=(\d+)/)?.[1];
const loaderDataVersion=loader.match(/const V='(\d+)'/)?.[1];
assert(dataVersion&&loaderDataVersion,'Missing data cache versions');
assert.equal(dataVersion,loaderDataVersion,'HTML and loader data versions disagree');
assert(html.includes('audio-guide-v2.js?v='),'Audio guide loader missing');
assert(html.includes('audio-guide-payment.js?v='),'Payment integration missing for later restoration');
assert(data.includes("methods:['yookassa','staff_code']"),'Original payment and staff-code methods missing');
console.log('PASS: '+mode+' mode, access guards, cache versions and reversible payment integration');
