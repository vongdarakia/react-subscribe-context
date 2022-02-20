export const getIncrementedNumValue = (num: number) => {
    const nextNumber = num + 1;

    if (nextNumber >= 100) {
        return 0;
    }

    return nextNumber;
};
