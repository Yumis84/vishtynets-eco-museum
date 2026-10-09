// Verify source-faithful restoration inputs before generating the public bundle.
// Usage: node scripts/validate-legacy-restoration.cjs
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
const text = JSON.parse(fs.readFileSync(path.join(root, 'data/legacy-restored-priority.json'), 'utf8'));
const media = JSON.parse(fs.readFileSync(path.join(root, 'data/legacy-restored-media.json'), 'utf8'));
const seen = new Set();
let blocks = 0;
for (const entry of text.articles) {
  assert(entry.id && entry.sourcePage && entry.sourceSha256, 'Missing provenance');
  assert(['replace', 'append'].includes(entry.mode), 'Unknown restoration mode: ' + entry.id);
  assert(!seen.has(entry.sourcePage), 'Duplicate donor page: ' + entry.sourcePage);
  seen.add(entry.sourcePage);
  assert(Array.isArray(entry.content) && entry.content.length > 0, 'Empty restored body: ' + entry.id);
  for (const block of entry.content) {
    assert(['paragraph', 'heading', 'gallery'].includes(block.type), 'Unexpected block: ' + entry.id);
    if (block.type !== 'gallery') {
      assert(typeof block.text === 'string' && block.text.trim(), 'Empty text block: ' + entry.id);
      if (block.runs) assert.equal(block.runs.map(r => r.text).join(''), block.text, 'Rich-text mismatch: ' + entry.id);
      blocks++;
    }
  }
}
const ids = new Set(text.articles.map(e => e.id));
for (const entry of media.articles) {
  assert(ids.has(entry.id), 'Orphan media mapping: ' + entry.id);
  assert(Array.isArray(entry.images), 'Missing image list: ' + entry.id);
  const sources = new Set();
  for (const item of entry.images) {
    assert(typeof item.src === 'string' && /^https:\/\//.test(item.src), 'Invalid media URL: ' + entry.id);
    assert(!sources.has(item.src), 'Duplicate media URL: ' + entry.id);
    sources.add(item.src);
  }
}
console.log('PASS: ' + text.articles.length + ' source pages, ' + ids.size + ' article IDs, ' + blocks + ' text blocks, ' + media.articles.length + ' media mappings');
