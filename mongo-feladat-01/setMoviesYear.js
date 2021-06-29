const setYearToMovies = () => {
    
    const titles = [
        "Many Rivers to Cross",
        "Saimaa Gesture, The (Saimaa-ilmiö)",
        "Mr. Klein (Monsieur Klein)",
        "Welfare",
        "Severed Arm, The",
        "Battlefield Baseball (Jigoku kôshien)",
        "Vampire's Kiss",
        "Enchanted",
        "PTU",
        "In Time",
    ];

    let year = 0;

    const randomIntFromInterval = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };

    // mivel a művelet nem ad vissza értéket, a .map() helyett .forEach() metódust használok
    titles.forEach((item, index) => {
        if (index < 3) {
            year = randomIntFromInterval(1980, 1989);
        } else if (index < 6) {
            year = randomIntFromInterval(1990, 1999);
        } else {
            year = randomIntFromInterval(2000, 2009);
        }
        db.movies.update({ title: item }, { $set: { releaseYear: year } });
    });
};

setYearToMovies();

// load("setMoviesYear.js")

/*
Másik megoldás: index értéke alapján számolva az év

    const randomYearByIndex = index => {
        return 1980 + (index % 3) * 10 + Math.floor(Math.random() * 10);
    };

    // mivel a művelet nem ad vissza értéket, a .map() helyett .forEach() metódust használok
    titles.forEach((item, index) => {
        db.movies.update(
            { title: item },
            { $set: { releaseYear: randomYearByIndex(index) } }
        );
    });
*/