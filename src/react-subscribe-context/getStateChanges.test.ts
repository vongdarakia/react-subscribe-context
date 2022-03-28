import { getStateChanges } from "./getStateChanges";

describe("getStateChanges", () => {
    it("should get all state changes for first level fields", () => {
        const prevState = {
            str: "string",
            num: 0,
            bool: true,
            arr: ["x"],
            obj: {},
        };
        const nextState: typeof prevState = {
            str: "new string",
            num: 7,
            bool: false,
            arr: ["x"],
            obj: {},
        };
        const stateChanges = getStateChanges(prevState, nextState);

        expect(Object.keys(stateChanges)).toMatchObject(["str", "num", "bool", "arr", "obj"]);
    });

    it("should get no state changes for values that are the same", () => {
        const prevState = {
            str: "string",
            num: 0,
            bool: true,
            arr: ["x"],
            obj: {},
        };
        const nextState: typeof prevState = { ...prevState };
        const stateChanges = getStateChanges(prevState, nextState);

        expect(Object.keys(stateChanges)).toMatchObject([]);
    });

    it("should get all state changes for nested objects", () => {
        const prevState = {
            user: {
                name: {
                    first: "first",
                    last: "last",
                },
            },
        };
        const nextState: typeof prevState = {
            user: {
                name: {
                    first: "Peter",
                    last: "Parker",
                },
            },
        };
        const stateChanges = getStateChanges(prevState, nextState);

        expect(Object.keys(stateChanges)).toMatchObject([
            "user.name.first",
            "user.name.last",
            "user.name",
            "user",
        ]);
    });

    it("should get all state changes for values becoming undefined and vice versa", () => {
        const prevState = {
            str: "string" as string | undefined,
            obj: {} as object | undefined,
        };
        const nextState: typeof prevState = {
            str: undefined,
            obj: undefined,
        };
        const stateChanges = getStateChanges(prevState, nextState);

        expect(Object.keys(stateChanges)).toMatchObject(["str", "obj"]);

        const stateChangesReversed = getStateChanges(nextState, prevState);

        expect(Object.keys(stateChangesReversed)).toMatchObject(["str", "obj"]);
    });
});
