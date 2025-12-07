## 1. O projekcie

Nasz system anonimizacji opiera się na dwóch niezależnie rozwijanych podejściach: fine-tuningu HerBERT-Large do NER oraz systemie regułowym wspomagane AI + deanonimizacja syntetyczna.
Niestety nie starczylo nam czasu na podpiecie modelu HerBERT-Large do frontendu.
---

## 2. Struktura repozytorium

```
├── src/
│   ├── anonymizer.py          # Główny moduł anonimizacji
│   ├── generator.py           # Generator danych syntetycznych
│   ├── inference.py           # Uruchamianie modelu NER
│   └── utils/                 # Pomocnicze skrypty: tokenizacja, fleksja, słowniki
│
├── models/
│   └── herbert_ner/           # Wagi fine-tunowanego modelu (opcjonalnie)
│
├── data/
│   └── dictionaries/          # Słowniki imion, miast, adresów itd.
│
├── output_[nazwa_zespolu].txt                # Wynik anonimizacji (wymagane)
├── performance_[nazwa_zespolu].txt           # Metryki i środowisko (wymagane)
├── preprocessing_[nazwa_zespolu].md          # Opis przetwarzania danych (opcjonalnie)
├── synthetic_generation_[nazwa_zespolu].md   # Generator danych syntetycznych (opcjonalnie)
├── presentation_[nazwa_zespolu].pdf          # Prezentacja (wymagane)
└── Readme.md
```

---

## 3. Jak to działa – opis procesu anonimizacji
Nasz system anonimizacji został zbudowany w oparciu o **dwa równolegle rozwijane podejścia**:

1. **fine-tuning HerBERT-Large do NER**,
2. **metodę regułową wspomaganą AI (Microsoft Presidio + własne rozszerzenia)**.

Z uwagi na ograniczenia czasowe, do wersji demonstracyjnej podłączona została wyłącznie **metoda regułowa**, jednak oba podejścia zostały zaprojektowane, przetestowane i porównane pod kątem jakości anonimizacji.

Proces anonimizacji w finalnym rozwiązaniu działa następująco:

1. **Tekst wejściowy** jest analizowany przez Presidio oraz nasze dodatkowe reguły (RegEx + modele klasyfikacyjne).
2. **Dane wrażliwe** (imię, nazwisko, adres, PESEL itd.) są wykrywane i podmieniane na tokeny zastępcze, np. `{name}`, `{surname}`, `{address}`, `{pesel}`.
3. System może opcjonalnie wykonać **deanonimizację syntetyczną**, czyli ponowne wypełnienie tekstu realistycznymi, losowymi encjami zgodnymi z fleksją języka polskiego.
---

## 4. Instalacja

### Wymagania

* Python 3.10+
* PyTorch
* Transformers
* Morfeusz 2 (lub inny moduł morfologiczny użyty w projekcie)

### Instalacja

```bash
pip install -r requirements.txt
```

---

## 5. Uruchomienie anonimizacji

### Anonimizacja pliku wejściowego

```bash
python src/anonymizer.py --input input.txt --output output_[nazwa_zespolu].txt
```

### Generacja danych syntetycznych (opcjonalnie)

```bash
python src/generator.py --template templates/example.txt --output synthetic.txt
```

---

## 6. Kontakt / Zespół
**Hallucination Nation**

Jacek Młynarczyk
ICM UW, ML Engineering

Jakub Meixner
MagTop, IF PAN, ML Engineering 

Jakub Bot
PG, Frontend, Backend

Kamil Raubo
PG, ML Engineering


## 7. References
- https://aclanthology.org/2021.bsnlp-1.1/
- https://www.frontiersin.org/journals/artificial-intelligence/articles/10.3389/frai.2025.1585260/full
- https://www.sciencedirect.com/science/article/pii/S0957417425030908