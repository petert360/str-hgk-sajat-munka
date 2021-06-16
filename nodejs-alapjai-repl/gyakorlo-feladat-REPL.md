# Gyakorló feladat - REPL

## 1. Feladat

Ellenőrizd a telepített NodeJS verziószámát!

`node -v`

## 2. Feladat

Ellenőrizd a telepített `npm` verziószámát!

`npm -v`

## 3. Feladat

Listázd ki a projekted függőségeit! Csak az első szint kell, a telepített csomagok függőségei nem!

`npm list --depth=0`

## 4. Feladat

Írasd ki a konzolra az `eslint` csomag adatait!

`npm view eslint`

`npm view eslint dependencies` - csak az eslint függőségek

## 5. Feladat

Kérdezd le az projekted elavult csomagjait, és ha van találat, frissítsd őket!

`npm outdated`

`npm update <package name>`