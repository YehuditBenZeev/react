//get map size
export const getMapSize = (x) => {
    var len = 0;
    for (var count in x)
        len++;
    return len;
}

//sort map by key
export const sortMapByKey = (o) => {
    return Object.keys(o).sort().reduce((r, k) => (r[k] = o[k], r), {});
}

//get random int
export const getRandomInt = (max) =>{
    return Math.floor(Math.random() * Math.floor(max));
}