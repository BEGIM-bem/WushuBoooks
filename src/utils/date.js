export const getDate = (str) => {
    const date = str.split('').slice(0, 10).join('');
    const year = date.slice(0, 4);
    return date[8] + date[9] + '.' + date[5] + date[6] + '.' + year;
}