export interface StateChanges {
    [key: string]: boolean;
}

export const getStateChanges = <TObject extends Object>(
    prevState: TObject,
    nextState: TObject,
    path: string = ""
): StateChanges => {
    const keys = Object.keys(nextState) as (keyof TObject & string)[];
    const results: StateChanges = {};

    keys.forEach((key) => {
        if (nextState[key] !== prevState[key]) {
            const currentPath = path.length > 0 ? `${path}.${key}` : key;

            if (typeof nextState[key] === "object" && !Array.isArray(nextState[key])) {
                const objDiffs = getStateChanges(prevState[key], nextState[key], currentPath);

                Object.keys(objDiffs).forEach((diffKey: string) => {
                    results[diffKey] = objDiffs[diffKey];
                });
            }
            results[currentPath] = true;
        }
    });

    return results;
};
