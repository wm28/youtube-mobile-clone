// Code attribution: https://github.com/aholachek/mobile-first-animation
export const projection = (initialVelocity, rateName = "normal") => {
    const decelerationRates = {
        fast: 0.99,
        normal: 0.998,
    };
    const decelerationRate = decelerationRates[rateName] || rateName;
    return (initialVelocity * decelerationRate) / (1 - decelerationRate);
};

// Code attribution: https://github.com/aholachek/mobile-first-animation
export const findNearestNumberInArray = (n, arr) => {
    const sortedArr = [...arr].sort((a, b) => a - b);
    if (n <= sortedArr[0]) return sortedArr[0];
    if (n >= sortedArr[arr.length - 1]) return sortedArr[arr.length - 1];

    for (let i = 1; i < sortedArr.length; i++) {
        const prev = sortedArr[i - 1];
        const current = sortedArr[i];
        if (current === n) return current;
        if (current > n && prev < n) {
            return current - n < n - prev ? current : prev;
        }
    }
    return false;
};



export const findLimit = (input, a, b) => {
    if (input >= a && input <= b) {
        return input;
    } else if (input < a) {
        return a;
    } else if (input > b) {
        return b;
    }
};

/*
 * Maps the input value from arrFrom to an output value in arrTo.
 * The mapping is based strictly on the progress of input value between the corespeonding 
 * consecutive values in the arrFrom array.
 * 
 * So the value of element in index x in each array must either be >= or <= to
 * the value of the element in inde x + 1
 */
export const progressMap = (arrFrom, arrTo, input) => {
    for (let i = 1; i < arrFrom.length - 1; i++) {
        const upperFrom = Math.max(arrFrom[i], arrFrom[i + 1]);
        const lowerFrom = Math.min(arrFrom[i], arrFrom[i + 1]);

        if (input <= upperFrom && input >= lowerFrom) {
            const progress = Math.abs(input-arrFrom[i]) / Math.abs(arrFrom[i+1] - arrFrom[i]);
            return (arrTo[i+1] - arrTo[i]) * progress + arrTo[i];
        } 
    }

     if (input < arrFrom[0] && input < arrFrom[arrFrom.length-1]) {
        return arrTo[0];
    } else if (input > arrFrom[0] && input > arrFrom[arrFrom.length-1]) {
        return arrTo[arrTo.length-1];
    }

};
