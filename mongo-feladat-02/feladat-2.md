# **A videoStore feladat folytatása (update, find, projection)**

**Normalization elve:** Csak a közvetlen összetartozó elemeket tároljuk egy táblázatban (listában). Minél összetettebb egy adat (több tulajdonsággal rendelkezhet, pl.: rendezőnek lehet neve, díjai, filmjei, születési adatai), annál inkább külön listába kell kiszervezni a tárolását.

1. Készíts el egy „directors” listát, amelyben filmrendezőket fogunk tárolni!

    ```
    use videoStore
    db.createCollection("directors")
    ```

2. Ments el benne 3 „rendező” dokumentumot az **insertOne()** parancs segítségével:
    - "_id": egész szám 1-estől indulva
    - "name": Steven Spielberg, Clint Eastwood, James Cameron
    - "birthYear": születési év (tetszőlegesen megadott egész szám)
    - "movies": kezdetben egy üres lista

    ```
    db.directors.insertOne(
        {
          _id: 1,
          name: "Steven Spielberg",
          birthYear: 1946,
          movies: []
        }
    )

    db.directors.insertOne(
        {
          _id: 2,
          name: "Clint Eastwood",
          birthYear: 1930,
          movies: []
        }
    )

    db.directors.insertOne(
        {
          _id: 3,
          name: "James Cameron",
          birthYear: 1954,
          movies: []
        }
    )
    ```

3. Frissítsd a rendezők dokumentumait, helyezd el a „movies” listájukba a megfelelő filmek id-jait (ha ObjectId-t használsz, akkor figyelj arra, hogy ObjectId-ként mentsd el őket). Tipp: kérdezd le a rendezőket, és alájuk listázd a filmeket úgy, hogy csak az id-jük és a rendező nevét adja vissza a lekérdezés:

    ![https://files.cdn.thinkific.com/file_uploads/219412/images/545/dbe/a26/1624372501576.jpg](https://files.cdn.thinkific.com/file_uploads/219412/images/545/dbe/a26/1624372501576.jpg)

    ![scr1.jpg](scr1.jpg)
    
    ```
    ObjectId hozzáadása egyenként:

    db.directors.update(
        { name: "Steven Spielberg" },
        { $push: { movies: ObjectId("60dac7d1c96af66befecb8e4")}} 
    )

    db.directors.update(
        { name: "Steven Spielberg" },
        { $push: { movies: ObjectId("60dac7d1c96af66befecb8e6")}} 
    )

    ObjectId hozzáadása $each segítségével:

    db.directors.update(
      { name: "Clint Eastwood" },
      { $push: { 
          movies: { 
            $each: [
              ObjectId("60dac7d1c96af66befecb8e1"),
              ObjectId("60dac7d1c96af66befecb8e5"),
              ObjectId("60dac7d1c96af66befecb8e7"),
              ObjectId("60dac7d1c96af66befecb8e9") 
            ]
          }
        } 
      }
    )

    db.directors.update(
      { name: "James Cameron" },
      { $push: { 
          movies: { 
            $each: [
              ObjectId("60dac7d1c96af66befecb8e2"),
              ObjectId("60dac7d1c96af66befecb8e3"),
              ObjectId("60dac7d1c96af66befecb8e8"),
              ObjectId("60dac7d1c96af66befecb8ea") 
            ]
          }
        } 
      }
    )
    ```

4. Ha frissítetted a rendezőket, ellenőrzés gyanánt kérdezd le a dokumentumokat a „directors” listából (használd a pretty() metódust a szebb megjelenítéshez)! Ehhez hasonló eredményt kell látnod:

    ![https://files.cdn.thinkific.com/file_uploads/219412/images/dd2/d12/31b/1624372501672.jpg](https://files.cdn.thinkific.com/file_uploads/219412/images/dd2/d12/31b/1624372501672.jpg)

    ![scr2.jpg](scr2.jpg)

5. **Ha elkészültél a rendezői listával**, frissítsd a movies listát („táblázatot”): távolítsd el a director mezőt ($unset operátor segítségével). Ezentúl a rendezőn keresztül fogjuk elérni a hozzájuk tartozó filmeket.

    ```
    db.movies.updateMany( {} , {$unset: {director: 0 } } )
    ```

6. Kérdezd le az egy bizonyos év előtt készült filmeket, majd az egy bizonyos év után készült filmeket! ($gt, $gte, $lt, $lte)

    ```
    db.movies.find( { releaseYear: {$gt: 2002} } )
    db.movies.find( { releaseYear: {$gte: 1991} } )
    db.movies.find( { releaseYear: {$lt: 2000} } )
    db.movies.find( { releaseYear: {$lte: 1980} } )
    ```

7. Kérdezz le két év között készült filmeket! (Próbáld ki $and operátorral is!)

    ```
    db.movies.find( { releaseYear: {$gte: 1980, $lte: 1990} } )

    db.movies.find( { $and: [ 
                        { releaseYear: { $gte: 1980 } },
                        { releaseYear: { $lte: 1990 } }
                      ]
    } )

    ```

8. Kérdezz le két év közötti filmeket, amelyek egy bizonyos kategóriával rendelkeznek!

    ```
    db.movies.find( { $and: [ 
                        { releaseYear: { $gte: 1980 } },
                        { releaseYear: { $lte: 1990 } },
                        { category: "ROMANTIC" }
                      ]
    } )
    ```

9. Kérdezd le a filmeket, amelyeknek a kategóriája NEM fantasy ($ne)!

    ```
    db.movies.find( { $and: [ 
                        { releaseYear: { $gte: 1990 } },
                        { releaseYear: { $lte: 2000 } },
                        { category: { $ne: "FANTASY" } }
                      ]
    } )
    ```

**Projection:** egy lekérdezés során van, hogy érzékeny adatainkat nem akarjuk elküldeni, vagy csak nincs okunk minden tulajdonságot lekérni egy dokumentumról. A szerveroldalról megjelenített adatok kezelése ezt a célt szolgálja.

1. Írj egy lekérdezést, amely visszaadja az egy konkrét időpont előtt készült filmek címét és kategóriáját (más mező ne jelenjen meg), amelyeknek a kategóriája „ROMANTIC” vagy „ACTION” ($in operátor vagy $or operátor is).

    ```
    db.movies.find( 
        { $and: [	
                { releaseYear: {$lte: 2000} },
                { $or: [
                        { category: "ROMANTIC" },
                        { category: "ACTION" }
                  ] }
          ]
        },
        { _id: 0, title: 1, category: 1 }
    )
    ```



