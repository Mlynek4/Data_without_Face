## 1. 🔍 Skąd bierzemy nowe dane (Mechanizm)

Generacja danych odbywa się w oparciu o **dwie główne składowe**, tworzone w oddzielnych krokach:

### A. Słowniki Wartości (Values)

* **Źródło:** Dane są pobierane z obszernego, wstępnie wygenerowanego słownika. Te wartości **nie są generowane na bieżąco** przez model językowy, lecz stanowią **statyczny zbiór** dla 25 kategorii encji (np. `name`, `pesel`, `address`).
* **Wzbogacanie:** Słowniki te bazują na listach zasobów (np. imion, nazwisk, miast) wzbogaconych o realistyczne wartości (np. numery kart, PESEL) wygenerowane przez funkcje pomocnicze (np. Generator PESEL i Kart).
* **Balans Kategorialny:** Docelowa liczba rekordów jest **równo rozdzielana** na 25 predefiniowanych kategorii encji, co ma zapewnić zbalansowany słownik dla każdej encji.

### B. Szablony Zdań (Templates)

* **Źródło:** Struktury zdaniowe zawierające placeholdery (`[name]`, `[city]`, `[phone]`) są pobierane z pliku, stworzonego na podstawie zbalansowanej mapy szablonów.

### Proces Iniekcji

Właściwa generacja syntetyczna polega na **losowym pobieraniu wartości** ze słownika i **wstawianiu ich w odpowiednie placeholdery** w szablonach, a następnie tokenizowaniu i tagowaniu w formacie CoNLL.

---

## 2. 🛡️ Dbałość o Sens (Spójność i Robustność)

Dbałość o jakość syntetycznego rozwiązania opiera się na trzech głównych filarach:

### A. Wymuszanie Kontekstu (Logika Szablonów)

* Dzięki **ręcznie zdefiniowanym szablonom**, model uczy się, że encje występują w **logicznych dla siebie kontekstach**.
* **Przykład:** Placeholder `[bank-account]` zawsze pojawia się w zdaniach dotyczących transakcji finansowych, a `[school-name]` w kontekście edukacji lub dyplomów.
* Jest to **najważniejsza forma dbałości o rozwiązanie**, ponieważ trenuje model, aby rozumiał **rolę encji** w zdaniu, a nie tylko ich skład leksykalny.

### B. Zaszumianie Danych (Robustness)

* Wartości są celowo **zniekształcane** (typosy, błędy) za pomocą funkcji `introduce_typo()`.
* Błędy wprowadzane są z prawdopodobieństwem **NOISE_PROB = 0.1** (**10%**).
* **Cel:** W ten sposób model jest trenowany, aby poprawnie identyfikować encje nawet w przypadku wystąpienia **literówek** lub drobnych błędów w danych źródłowych.
* Zwiększa to **odporność (robustness)** modelu na błędy świata rzeczywistego.

### C. Balans Kategorialny

* **Cel:** Równy rozkład rekordów na 25 predefiniowanych kategorii encji zapewnia, że **żadna kategoria encji nie jest pomijana** lub niedostatecznie reprezentowana w procesie treningowym.