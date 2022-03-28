import deepProxy from "deep-proxy-polyfill";
import { createProxyHandler, SubscribedCache } from "./createProxyHandler";

describe("createProxyHandler", () => {
    it("should mark subscriptions for accessed values of proxy obj", () => {
        const state = {
            str: "string",
            num: 10,
        };
        const mockRerenderer = jest.fn();
        const subscriptionRef: React.MutableRefObject<SubscribedCache> = { current: {} };
        const proxyHandler = createProxyHandler<typeof state>(subscriptionRef, mockRerenderer);

        const objProxy = deepProxy(state, proxyHandler);

        (() => objProxy.num)();

        expect(subscriptionRef.current).toMatchObject({ "update-num": true });
        expect(mockRerenderer).toBeCalledTimes(1);

        (() => objProxy.str)();

        expect(subscriptionRef.current).toMatchObject({ "update-str": true, "update-num": true });
        expect(mockRerenderer).toBeCalledTimes(2);
    });

    it("should mark subscriptions for specifically accessed nested values of proxy obj", () => {
        const state = {
            user: {
                name: {
                    first: "first",
                    last: "last",
                },
            },
        };
        const mockRerenderer = jest.fn();
        const subscriptionRef: React.MutableRefObject<SubscribedCache> = { current: {} };
        const proxyHandler = createProxyHandler<typeof state>(subscriptionRef, mockRerenderer);

        const objProxy = deepProxy(state, proxyHandler);

        (() => objProxy.user)();

        expect(subscriptionRef.current).toMatchObject({ "update-user": true });
        expect(mockRerenderer).toBeCalledTimes(1);

        (() => objProxy.user.name.first)();

        expect(subscriptionRef.current).toMatchObject({
            "update-user": false,
            "update-user.name": false,
            "update-user.name.first": true,
        });
        // 2 more renders for accessing name, then name.first
        expect(mockRerenderer).toBeCalledTimes(3);
    });

    it("should mark subscriptions with a prefix baseKey", () => {
        const state = {
            user: {
                name: {
                    first: "first",
                    last: "last",
                },
            },
        };
        const mockRerenderer = jest.fn();
        const subscriptionRef: React.MutableRefObject<SubscribedCache> = { current: {} };
        const proxyHandler = createProxyHandler<typeof state>(
            subscriptionRef,
            mockRerenderer,
            "state"
        );

        const objProxy = deepProxy(state, proxyHandler);

        (() => objProxy.user.name.last)();

        expect(subscriptionRef.current).toMatchObject({
            "update-state.user": false,
            "update-state.user.name": false,
            "update-state.user.name.last": true,
        });
    });
});
