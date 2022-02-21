export const getIncrementedNumValue = (num: number) => {
    const nextNumber = num + 1;

    return nextNumber % 100;
};
