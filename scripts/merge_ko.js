const fs = require('fs');
let mergedData = {};
for(let i=0; i<6; i++) {
    const filePath = `src/data/locales/temp_ko_chunks/chunk_${i}_ko.json`;
    if(fs.existsSync(filePath)) {
        const chunkData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        Object.assign(mergedData, chunkData);
        console.log(`Merged chunk ${i} with ${Object.keys(chunkData).length} entries.`);
    } else {
        console.error(`Chunk ${i} not found!`);
        process.exit(1);
    }
}
fs.writeFileSync('src/data/locales/kanji_ko.json', JSON.stringify(mergedData, null, 2) + '\n');
console.log(`Successfully merged all chunks. Total entries: ${Object.keys(mergedData).length}.`);
