export const filterApplication = (list) => {
    const arr = JSON.parse(JSON.stringify(list));
    arr.forEach(element => {
        for (let i in element) {
            if (element[i] !== '' && i === 'age') element[i] = +element[i];
            if (element[i] !== '' && i === 'team_number') element[i] = +element[i];
        }
    });
    return arr.filter((item) => {
        for (let i in item) {
            if (item[i] !== '' && item[i] !== null) return item;
        }
        return null;
    })
}

export const validateApplication = (list) => {
    for (let i of filterApplication(list)) {
        for (let j in i) {
            if ((i[j] === '' || i[j] === null) && j === 'name') return false;
            if ((i[j] === '' || i[j] === null) && j === 'gender') return false;
            if ((i[j] === '' || i[j] === null) && j === 'age') return false;
            if ((i[j] === '' || i[j] === null) && j === 'club') return false;
        }
    }
    return true;
}