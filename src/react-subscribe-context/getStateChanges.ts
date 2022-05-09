/**
 * A key value pair of state changes. `true` indicating that the field was changed.
 */
export interface StateChanges {
    [key: string]: boolean;
}

/**
 * Compares the differences between the previous state and what will be changed.
 * @param prevState The previous (or current) state that will be changed.
 * @param nextState The next state (or partial update of the next state).
 * @param path Current path of the changed nested value. i.e. user.name.first
 * @returns A key value pair of what values were changed from the prevState.
 */
export const getStateChanges = <TObject extends Object>(
    prevState: TObject,
    nextState: TObject,
    path = ''
): StateChanges => {
    const keys = Object.keys(nextState) as (keyof TObject & string)[];
    const results: StateChanges = {};

    keys.forEach((key) => {
        if (nextState[key] !== prevState[key]) {
            const currentPath = path.length > 0 ? `${path}.${key}` : key;

            if (typeof nextState[key] === 'object' && !Array.isArray(nextState[key])) {
                const objDiffs = getStateChanges(
                    prevState[key] || {},
                    nextState[key] || {},
                    currentPath
                );

                Object.keys(objDiffs).forEach((diffKey: string) => {
                    results[diffKey] = objDiffs[diffKey];
                });
            }
            results[currentPath] = true;
        }
    });

    return results;
};
