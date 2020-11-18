function clone(obj) {
    const isArray = value => Array.isArray(value);
    const isDate = value => Object.getPrototypeOf(value) === Date.prototype;
    const isRegExp = value => Object.getPrototypeOf(value) === RegExp.prototype;
    const isObject = value => typeof value === 'object' && !isArray(value) && value !== null && !isDate(value) && !isRegExp(value);

    const cloneRecurse = (origin) => {
        let copy;
        if (isArray(origin)) {
            copy = [];
            for (let i = 0; i < origin.length; i++) {
                copy[i] = cloneRecurse(origin[i])
            }
        } else if (isObject(origin)) {
            copy = {}
            Object.keys(origin).forEach(
                key => {
                    copy[key] = cloneRecurse(origin[key])
                }
            )
        } else if (isDate(origin)) {
            copy = new Date();
            copy.setTime(origin.getTime());
        } else {
            copy = origin;
        }
        return copy;
    };
    
    return cloneRecurse(obj);
}