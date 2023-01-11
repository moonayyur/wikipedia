import fs from 'fs';

import ProgressBar from 'progress';

import * as util from './util.js';

const ids = JSON.parse(fs.readFileSync('./data/ids.json'));

let start = 0;
let length = ids.length;
let revisions = [];
let missing = [];

console.log(`${ids.length} ids`);

let bar = new ProgressBar('  [:bar] :current treated (:eta s)', {
  width: 30,
  incomplete: ' ',
  total: length,
});

await getNextEntries();
console.log(`${revisions.length} revisions`);
fs.writeFileSync('./data/rev.json', JSON.stringify(revisions));
console.log(`${missing.length} missing`);
fs.writeFileSync('./data/rev-missing.json', JSON.stringify(missing));

function getNextEntries() {
  let idsToGet = [];
  let ii = Math.min(length, start + 50);
  for (; start < ii; start++) {
    idsToGet.push(ids[start]);
  }
  start = ii;
  return getRevisions(idsToGet).then(() => {
    bar.tick(idsToGet.length);
    if (start < length) {
      return getNextEntries();
    }
  });
}

// https://en.wikipedia.org/w/api.php?action=help&modules=query%2Brevisions
// https://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=ids&pageids=1912|4191
// Max 50 page ids at the same time

async function getRevisions(ids) {
  let param = {
    action: 'query',
    prop: 'revisions',
    rvprop: 'ids',
    continue: '',
    pageids: ids.join(['|']),
  };
  const result = await util.request(param);
  const pages = result.query.pages;
  for (let i = 0; i < ids.length; i++) {
    const page = pages[ids[i]];
    if (page) {
      revisions.push({
        id: page.pageid,
        rev: page.revisions[0].revid,
      });
    } else {
      missing.push(ids[i]);
    }
  }
}
