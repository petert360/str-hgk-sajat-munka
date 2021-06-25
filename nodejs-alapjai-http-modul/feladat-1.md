# **Gyakorló feladat - HTTP modul**

## **A kész feladat feltöltésének helye:**

Repo: **str-hgk-sajat-munka**

Almappa: **nodejs-alapjai-http-modul**

```
Például:http://github.com/cherryApp/str-hgk-sajat-munka/nodejs-alapjai-http-modul
```

Hozz létre egy új NodeJS projektet!

Készíts egy http szervert! A szerver a 8080-as port forgalmát figyelje! Készíts 3 html fájlt:

- index
- about
- contact

Minden alkalommal, amikor beérkezik egy kérés, azt logold a konzolra az alábbi formátumban:

- Date: a kérés pontos ideje magyar lokalizáció szerint formázva
- Url: a kért url
- Method: a http metódus

Pl.: `Date: 2021.04.01 Url: /about Method: GET`

A logra saját függvényt írj!

A `controller`, `views`, `routers` külön mappákban/fájlokban legyenek!