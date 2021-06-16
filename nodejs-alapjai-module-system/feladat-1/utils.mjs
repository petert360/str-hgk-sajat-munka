const increaseDate = (date, day = 3) =>
    Date.parse(date) + day * 24 * 60 * 60 * 1000

export const increaseAndFormatDate = arr =>
    arr.map(item =>
        new Date(increaseDate(item)).toLocaleDateString('hu-HU', {
            dateStyle: 'long',
        })
    )
