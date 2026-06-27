const fs = require('fs');
const data = JSON.parse(fs.readFileSync('src/data/locales/kanji_en.json', 'utf8'));
const entries = Object.entries(data);
const chunkSize = Math.ceil(entries.length / 6);
fs.mkdirSync('src/data/locales/temp_ko_chunks', {recursive: true});
for(let i=0; i<6; i++) {
    const chunk = Object.fromEntries(entries.slice(i*chunkSize, (i+1)*chunkSize));
    fs.writeFileSync(`src/data/locales/temp_ko_chunks/chunk_${i}.json`, JSON.stringify(chunk, null, 2));
    console.log(`Chunk ${i} created with ${Object.keys(chunk).length} entries.`);
}
