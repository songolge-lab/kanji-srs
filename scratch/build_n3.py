import json
import os
import sys

from n3_kanji_1 import kanji_1
from n3_kanji_2 import kanji_2
from n3_sentences_1 import sentences_1
from n3_sentences_2 import sentences_2

def build():
    cards = []
    kanjis = kanji_1 + kanji_2
    sents = sentences_1 + sentences_2
    
    kanji_fronts = set()
    sent_fronts = set()
    
    # Process kanji
    for i, (k, mean, ex_jp, ex_en) in enumerate(kanjis):
        if k in kanji_fronts:
            print(f"DUPLICATE KANJI: {k}")
        kanji_fronts.add(k)
        
        cards.append({
            "id": f"n3-kanji-{i+1:03d}",
            "category": "kanji",
            "front": k,
            "back": mean,
            "exampleJp": ex_jp,
            "exampleTranslation": ex_en,
            "tags": ["JLPT N3", "Kanji"]
        })
        
    # Process sentences
    for i, (jp, en) in enumerate(sents):
        if jp in sent_fronts:
            print(f"DUPLICATE SENTENCE: {jp}")
        sent_fronts.add(jp)
        
        cards.append({
            "id": f"n3-sentence-b-{i+1:03d}",
            "category": "sentence",
            "front": jp,
            "back": en,
            "exampleJp": jp,
            "exampleTranslation": en,
            "tags": ["JLPT N3", "Reading Practice"]
        })
        
    out_dir = "data/curated-packs/en/intake/n3"
    os.makedirs(out_dir, exist_ok=True)
    out_file = os.path.join(out_dir, "kanji_sentences_280.json")
    
    output_data = {
        "shardId": "n3-kanji-sentences-280",
        "level": "N3",
        "language": "en",
        "cards": cards
    }
    
    with open(out_file, "w", encoding="utf-8") as f:
        json.dump(output_data, f, ensure_ascii=False, indent=2)
        
    print(f"Wrote to {out_file}")
    print(f"Total cards: {len(cards)}")
    print(f"Kanji count: {len(kanjis)}")
    print(f"Sentence count: {len(sents)}")
    
    # Validation checks
    print("\n--- VALIDATION ---")
    forbidden = ["furigana", "reading", "romaji", "onyomi", "kunyomi"]
    has_forbidden = False
    missing_fields = False
    
    for c in cards:
        for f in forbidden:
            if f in c:
                print(f"FORBIDDEN FIELD '{f}' in {c['id']}")
                has_forbidden = True
        req = ["id", "category", "front", "back", "exampleJp", "exampleTranslation", "tags"]
        for r in req:
            if r not in c:
                print(f"MISSING FIELD '{r}' in {c['id']}")
                missing_fields = True
                
    if not has_forbidden and not missing_fields:
        print("PASS: No forbidden or missing fields.")
    
    # Check for placeholder strings
    placeholders = ["example", "todo", "tbd", "placeholder", "dummy"]
    for c in cards:
        for p in placeholders:
            if p in c["front"].lower() or p in c["back"].lower() or p in c["exampleTranslation"].lower():
                print(f"WARNING: Possible placeholder '{p}' in {c['id']}")

if __name__ == "__main__":
    build()
