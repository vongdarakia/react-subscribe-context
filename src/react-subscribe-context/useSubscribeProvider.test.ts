import { renderHook } from "@testing-library/react-hooks";
import { EventEmitter } from "events";
import { ActionsCreator, BaseContextControl, ContextControl } from "./context-control-types";
import { useSubscribeProvider } from "./useSubscribeProvider";

describe("useSubscribeProvider", () => {
    const initialState = {
        user: {
            name: {
                first: "Peter",
                last: "Parker",
            },
        },
        age: 24,
    };

    type State = typeof initialState;

    const baseControl: BaseContextControl<State> = {
        emitter: new EventEmitter(),
        getState: jest.fn(() => initialState),
        getValue: jest.fn((fieldName) => initialState[fieldName]),
        setState: jest.fn(),
        setValue: jest.fn(),
    };

    const initialControlWithoutActions: ContextControl<State, object> = {
        ...baseControl,
        actions: {},
    };

    type Actions = {
        doSomething: () => BaseContextControl<State>;
    };

    const initialControlWithActions: ContextControl<State, Actions> = {
        ...baseControl,
        actions: {
            doSomething: () => baseControl,
        },
    };

    const getUseSubscriberProviderResult = () => {
        const { result } = renderHook(() =>
            useSubscribeProvider(initialControlWithoutActions, initialState)
        );

        const mockEmit = jest.fn();

        result.current.current.emitter.emit = mockEmit;

        return { controlContext: result.current.current, mockEmit };
    };

    const getUseSubscriberProviderWithActionsResult = () => {
        const createActions: ActionsCreator<State, Actions> = (contextControl) => {
            return {
                doSomething: () => contextControl,
            };
        };
        const { result } = renderHook(() =>
            useSubscribeProvider(initialControlWithActions, initialState, createActions)
        );

        const mockEmit = jest.fn();

        result.current.current.emitter.emit = mockEmit;

        return { controlContext: result.current.current, mockEmit };
    };

    describe("getValue", () => {
        const { controlContext } = getUseSubscriberProviderResult();

        it("should return value given a field name", () => {
            expect(controlContext.getValue("age")).toBe(initialState.age);
            expect(controlContext.getValue("user")).toBe(initialState.user);
        });
    });

    describe("getState", () => {
        const { controlContext } = getUseSubscriberProviderResult();

        it("should return the current state", () => {
            expect(controlContext.getState()).toMatchObject(initialState);
        });
    });

    describe("setValue", () => {
        it("should set value of specified field given a new value", () => {
            const { controlContext } = getUseSubscriberProviderResult();
            const currVal = controlContext.getValue("age");
            const nextVal = currVal + 10;

            controlContext.setValue("age", nextVal);

            expect(controlContext.getValue("age")).toBe(nextVal);
        });
        it("should set value of specified field given a function and using previous value", () => {
            const { controlContext } = getUseSubscriberProviderResult();
            const currVal = controlContext.getValue("age");

            controlContext.setValue("age", (prevVal) => prevVal + 10);

            expect(controlContext.getValue("age")).toBe(currVal + 10);
        });
        it("should set value of specified field given a function and using state", () => {
            const { controlContext } = getUseSubscriberProviderResult();
            const currVal = controlContext.getValue("age");

            controlContext.setValue("age", (_, state) => state.age + 10);

            expect(controlContext.getValue("age")).toBe(currVal + 10);
        });
        it("should emit an update when a value has changed", () => {
            const { controlContext, mockEmit } = getUseSubscriberProviderResult();
            const nextValue = controlContext.getValue("age") + 10;

            controlContext.setValue("age", nextValue);

            expect(mockEmit).toBeCalledTimes(1);
            expect(mockEmit.mock.calls).toEqual([["update-age", { age: nextValue }]]);
        });
        it("should NOT emit an update when a value has NOT changed", () => {
            const { controlContext, mockEmit } = getUseSubscriberProviderResult();

            controlContext.setValue("age", controlContext.getValue("age"));

            expect(mockEmit).toBeCalledTimes(0);
        });
        it("should emit updates for all changed nested values", () => {
            const { controlContext, mockEmit } = getUseSubscriberProviderResult();
            const user = controlContext.getValue("user");
            const updatedUser = { ...user, name: { ...user.name, first: "Peni" } };
            const partialUserUpdate = { user: updatedUser };

            controlContext.setValue("user", updatedUser);

            expect(mockEmit).toBeCalledTimes(3);
            expect(mockEmit.mock.calls).toEqual([
                ["update-user.name.first", partialUserUpdate],
                ["update-user.name", partialUserUpdate],
                ["update-user", partialUserUpdate],
            ]);
        });
    });

    describe("setState", () => {
        it("should set state given a whole new state", () => {
            const { controlContext } = getUseSubscriberProviderResult();
            const currState = controlContext.getState();
            const nextState = { ...currState, age: currState.age + 10 };

            controlContext.setState(nextState);

            expect(controlContext.getState()).not.toBe(nextState);
            expect(controlContext.getState()).toMatchObject(nextState);
        });
        it("should set state given a partial new state", () => {
            const { controlContext } = getUseSubscriberProviderResult();
            const currState = controlContext.getState();
            const partialNextState = { age: currState.age + 10 };
            const nextState = { ...currState, age: currState.age + 10 };

            controlContext.setState(partialNextState);

            expect(controlContext.getState()).toMatchObject(nextState);
        });
        it("should set state given a function and using previous state", () => {
            const { controlContext } = getUseSubscriberProviderResult();
            const currState = controlContext.getState();

            controlContext.setState((prevState) => ({
                ...prevState,
                age: prevState.age + 10,
            }));

            expect(controlContext.getState()).toMatchObject({
                ...currState,
                age: currState.age + 10,
            });
        });
        it("should set state given a function and returning partial state", () => {
            const { controlContext } = getUseSubscriberProviderResult();
            const currState = controlContext.getState();

            controlContext.setState(() => ({
                age: currState.age + 10,
            }));

            expect(controlContext.getState()).toMatchObject({
                ...currState,
                age: currState.age + 10,
            });
        });
        it("should emit an update when a value has changed", () => {
            const { controlContext, mockEmit } = getUseSubscriberProviderResult();
            const prevAge = controlContext.getValue("age");

            controlContext.setState(({ age }) => ({ age: age + 10 }));

            expect(mockEmit).toBeCalledTimes(2);
            expect(mockEmit.mock.calls).toEqual([
                ["update-state", { ...controlContext.getState(), age: prevAge + 10 }],
                ["update-age", { age: prevAge + 10 }],
            ]);
        });
        it("should NOT emit an update when a value has NOT changed", () => {
            const { controlContext, mockEmit } = getUseSubscriberProviderResult();

            controlContext.setState({ ...controlContext.getState() });

            expect(mockEmit).toBeCalledTimes(0);
        });
        it("should emit updates for all changed nested values", () => {
            const { controlContext, mockEmit } = getUseSubscriberProviderResult();
            const user = controlContext.getValue("user");
            const partialUserUpdate = { user: { ...user, name: { ...user.name, first: "Peni" } } };

            controlContext.setState(partialUserUpdate);

            expect(mockEmit).toBeCalledTimes(4);
            expect(mockEmit.mock.calls).toEqual([
                ["update-state", { ...controlContext.getState(), ...partialUserUpdate }],
                ["update-user.name.first", partialUserUpdate],
                ["update-user.name", partialUserUpdate],
                ["update-user", partialUserUpdate],
            ]);
        });
    });

    describe("actions", () => {
        it("should be empty when no createActions is passed in", () => {
            const { controlContext } = getUseSubscriberProviderResult();

            expect(controlContext.actions).toMatchObject({});
        });
        it("should be created with controlContext", () => {
            const { controlContext } = getUseSubscriberProviderWithActionsResult();

            expect(controlContext.actions.doSomething()).toBe(controlContext);
        });
    });
});
