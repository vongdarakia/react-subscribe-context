import { renderHook } from "@testing-library/react-hooks";
import { useContext } from "react";
import { BaseContextControl } from "./context-control-types";
import { createSubscriberContext } from "./createSubscriberContext";

describe("createSubscriberContext", () => {
    const initialState = {
        user: {
            name: {
                first: "Peter",
                last: "Parker",
            },
        },
        age: 42,
    };

    it("should create a subscriber context", async () => {
        const { Context, Provider } = createSubscriberContext({ initialState });
        const { result } = renderHook(() => useContext(Context), {
            wrapper: ({ children }) => <Provider>{children}</Provider>,
        });

        expect(result.current.getState()).toMatchObject(initialState);
        expect(result.current.getValue("age")).toBe(initialState.age);

        result.current.setState({ age: 24 });

        expect(result.current.getValue("age")).toBe(24);

        result.current.setValue("user", (prevUser) => ({
            ...prevUser,
            name: { first: "Miles", last: "Morales" },
        }));
        expect(result.current.getState()).toMatchObject({
            user: {
                name: {
                    first: "Miles",
                    last: "Morales",
                },
            },
            age: 24,
        });
        expect(result.current.actions).toMatchObject({});
    });
    it("should create a subscriber context given an actions creator", async () => {
        const createActions = (baseContextControl: BaseContextControl<typeof initialState>) => {
            return {
                getAge: () => {
                    return baseContextControl.getValue("age");
                },
            };
        };

        const { Context, Provider } = createSubscriberContext({ initialState, createActions });
        const { result } = renderHook(() => useContext(Context), {
            wrapper: ({ children }) => <Provider>{children}</Provider>,
        });

        expect(result.current.actions.getAge()).toBe(initialState.age);
    });
    it("should use default controls when no provider is given", async () => {
        jest.spyOn(global.console, "error").mockImplementation(() => {});
        const createActions = (baseContextControl: BaseContextControl<typeof initialState>) => {
            return {
                getAge: () => {
                    return baseContextControl.getValue("age");
                },
            };
        };

        const [Context] = createSubscriberContext({ initialState, createActions });
        const { result } = renderHook(() => useContext(Context));

        expect(result.current.getState()).toMatchObject(initialState);
        expect(result.current.getValue("age")).toBe(initialState.age);

        result.current.setValue("age", initialState.age + 10);
        expect(result.current.getValue("age")).toBe(initialState.age);

        result.current.setState({ age: initialState.age + 10 });
        expect(result.current.getState()).toMatchObject(initialState);
        expect(console.error).toBeCalledTimes(6);
    });
});
