const charCodeA = "A".charCodeAt(0);

export const getIncrementedCharValue = (char: string) => {
    const charCode = char.charCodeAt(0);
    const nextCharCode = ((charCode + 1 - charCodeA) % 26) + charCodeA;

    return String.fromCharCode(nextCharCode);
};
