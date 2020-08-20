

export const containsObject = (obj, array) => {
    return array.some(elem => elem === obj);
};

export const containsObjectWithFieldNameValue = (array, fieldName, fieldValue) => {
    return array.some(elem => elem[fieldName] === fieldValue);    
};

export const getObjectsFromArrayWithFieldNameValue = (array, fieldName, fieldValue) => {
    return array.filter(elem => elem[fieldName] === fieldValue);
};

export const getObjectsFromArrayWithoutFieldNameValue = (array, fieldName, fieldValue) => {
    return array.filter(elem => elem[fieldName] !== fieldValue);
};