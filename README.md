# Aplikacja_do_zarzadzania_klubem_sportowym_2021
Projekt zaliczeniowy z PPAK 2021

<h1>Jak uruchomić projekt lokalnie?</h1>
<p>(Linux) Przy "run.sh", back-end jest uruchamiany w tle. Pomiędzy uruchomieniami oraz po zakończeniu pracy, należy go zamknąć:
 
```javascript
sudo pkill java
```

<p>(Linux) Upewnij się, że masz dostęp do uruchamianych skryptów.</p>
<p>Na przykład: </p>

```javascript
chmod 777 Run.sh
```

<h2>Instalacja zależności</h2>
<p>Linux (wymaga uprawnień administratora):</p>

```javascript
sudo ./install.sh
```

<p>Windows:</p>

```javascript
zainstaluj ręcznie
```

<p> Lista zależności: Java JRE, Node/npm, (Linux) chromium
    
<h2>Uruchomienie projektu</h2>

<p>Linux (bez sudo):</p>

```javascript
./run.sh
```

<p>Windows:</p>

```javascript
.\run.cmd
```

<p>Strona React'owa zostanie uruchomiona pod adresem: "localhost:3000"
    
<h2>Uruchomienie testów</h2>
<h3>Testy jednostkowe</h3>

<p>Linux (bez sudo):</p>

```javascript
./test.sh
```

<p>Windows:</p>

```javascript
.\test.cmd
```

<h3>Testy akceptacyjne</h3>
<p>1) Uruchom projekt (skrypt "run") w tle.</p>
<p>2) Po uruchomieniu projektu, przejdź do katalogu SportClub-ui</p>

```javascript
cd SportClub-ui
```

<p>3) Uruchom testy:</p>

<p>Linux:</p>

```javascript
sudo ./CypressRun.sh
```

<p>Windows:</p>

```javascript
.\CypressRun.cmd
```

<p>(Linux) Uwaga! Jeśli pojawi się błąd z brakującym plikem "cypress", to oznacza, że "run.sh" lub "test.sh" został uruchomiony z uprawnieniami administratora. To sprawia, że Cypress nie jest w stanie się poprawnie zainstalować. Aby to naprawić należy uruchomić poniższą komendę w katalogu "SportClub-ui", bez uprawnień administratora.
    
```javascript
npm install
```

<h2>Serwis mailtrap</h2>
<p> Login i hasło do serwisu mailtrap na który przychodzą emaile: </p>

```javascript
pblackmt2@o2.pl
zseRT@@3
```

By: 
    FB &
    KB &
    MB &
    JR &
    PD

2021
