import {
    act,
    Renderer,
    renderHook,
    RenderHookOptions,
    RenderHookResult,
} from '@testing-library/react-hooks';
import { createSubscriberContext } from '.';
import { useSubscribe, UseSubscribeStateReturn, UseSubscribeValueReturn } from './useSubscribe';

describe('useSubscribeProvider', () => {
    const initialState = {
        user: {
            name: {
                first: 'Peter',
                last: 'Parker',
            },
        },
        age: 24,
        items: ['web', 'mask', 'gloves'],
    };

    type State = typeof initialState;

    const [Context, Provider] = createSubscriberContext({ initialState });

    const renderHookOptions: RenderHookOptions<{}> = {
        wrapper: ({ children }) => <Provider>{children}</Provider>,
    };

    const renderUseSubscribeValue = <TKey extends keyof State>(
        field: TKey
    ): RenderHookResult<{}, UseSubscribeValueReturn<State, TKey, object>, Renderer<{}>> => {
        return renderHook(() => useSubscribe(Context, field), renderHookOptions);
    };

    const renderUseSubscribeState = (): RenderHookResult<
        {},
        UseSubscribeStateReturn<State, object>,
        Renderer<{}>
    > => {
        return renderHook(() => useSubscribe(Context), renderHookOptions);
    };

    describe('by value', () => {
        describe('object destructuring', () => {
            it('should return correct value', () => {
                const { result } = renderUseSubscribeValue('age');
                const { value } = result.current;

                expect(value).toBe(initialState.age);
            });
            it('should return proxy value if field is an object', () => {
                const { result } = renderUseSubscribeValue('user');
                const { value, contextControl } = result.current;

                expect(value).not.toBe(contextControl.getState().user);

                act(() => {
                    expect(value).toMatchObject(contextControl.getState().user);
                });
            });
            it('should return regular value if field is an array', () => {
                const { result } = renderUseSubscribeValue('items');
                const { value, contextControl } = result.current;

                expect(value).toBe(contextControl.getValue('items'));
            });
            it('should set values properly with setValue', async () => {
                const { result } = renderUseSubscribeValue('age');
                const { setValue } = result.current;

                act(() => {
                    setValue(initialState.age + 10);
                });
                expect(result.current.value).toBe(initialState.age + 10);

                let currAge = result.current.value;

                act(() => {
                    setValue((age) => age + 20);
                });
                expect(result.current.value).toBe(currAge + 20);

                currAge = result.current.value;

                act(() => {
                    setValue((_, state) => state.age + 20);
                });
                expect(result.current.value).toBe(currAge + 20);
            });
        });
        describe('array destructuring', () => {
            it('should return correct values as object destructuring', () => {
                const { result } = renderUseSubscribeValue('user');

                const { actions, contextControl, value, setValue } = result.current;
                const [aValue, aSetValue, aActions, aContextControl] = result.current;

                expect(aActions).toBe(actions);
                expect(aContextControl).toBe(contextControl);
                expect(aValue).toBe(value);
                expect(aSetValue).toBe(setValue);
            });
        });
    });

    describe('by state', () => {
        describe('object destructuring', () => {
            it('should return correct value', () => {
                const { result } = renderUseSubscribeState();

                act(() => {
                    const { state } = result.current;

                    expect(state).toMatchObject(initialState);
                });
            });
            it('should set state properly with setState', async () => {
                const { result } = renderUseSubscribeState();
                const { setState } = result.current;

                // subscribe to age
                await act(async () => {
                    (() => result.current.state.age)();
                });

                let currProxyState = result.current.state;

                act(() => {
                    setState({ age: currProxyState.age + 10 });
                });

                expect(result.current.state.age).toBe(currProxyState.age + 10);
                currProxyState = result.current.state;

                act(() => {
                    setState((state) => ({ age: state.age + 20 }));
                });

                expect(result.current.state.age).toBe(currProxyState.age + 20);
                expect(result.current.state).not.toBe(currProxyState);
            });
            it('should render only when subscribed value changes', async () => {
                const { result } = renderUseSubscribeState();
                const { setState } = result.current;

                // subscribe to age
                await act(async () => {
                    (() => result.current.state.age)();
                });

                let currProxyState = result.current.state;

                act(() => {
                    setState({ age: currProxyState.age + 10 });
                });

                expect(result.current.state.age).toBe(currProxyState.age + 10);
                currProxyState = result.current.state;

                act(() => {
                    setState((state) => ({
                        user: { name: { ...state.user.name, first: 'Miles' } },
                    }));
                });

                act(() => {
                    const user = result.current.contextControl.getValue('user');

                    expect(user.name.first).toBe('Miles');
                    expect(result.current.state.user.name.first).not.toBe('Miles');
                    expect(result.current.state).toMatchObject(currProxyState);
                });
            });
            it('should render only for subscribed nested value changes', async () => {
                const { result } = renderUseSubscribeState();
                const { setState } = result.current;

                // subscribe to user.name.first
                await act(async () => {
                    (() => result.current.state.user.name.first)();
                });

                act(() => {
                    setState(({ user }) => ({
                        user: { name: { first: 'Miles', last: user.name.last } },
                    }));
                });

                expect(result.current.state.user.name.first).toBe('Miles');

                act(() => {
                    setState(({ user }) => ({
                        user: { name: { first: user.name.first, last: 'Porker' } },
                    }));
                });

                expect(result.current.contextControl.getValue('user').name.last).toBe('Porker');

                act(() => {
                    expect(result.current.state.user.name.last).toBe('Parker');
                });
            });
        });
        describe('array destructuring', () => {
            it('should return correct values as object destructuring', () => {
                const { result } = renderUseSubscribeState();

                const { actions, contextControl, state, setState } = result.current;
                const [aState, aSetState, aActions, aContextControl] = result.current;

                expect(aActions).toBe(actions);
                expect(aContextControl).toBe(contextControl);
                expect(aState).toBe(state);
                expect(aSetState).toBe(setState);
            });
        });
    });
});
