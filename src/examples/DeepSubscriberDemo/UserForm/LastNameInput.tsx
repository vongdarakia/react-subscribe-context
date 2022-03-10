import { Input } from "components/Input";
import { ChangeEventHandler, ReactElement } from "react";
import { useSubscribe } from "react-subscribe-context/useSubscribe";
import { logRender } from "utils/logRender";
import { DeepSubscriberContext } from "../DeepSubscriberContext";

export const LastNameInput = (): ReactElement => {
    const [
        {
            name: { last },
        },
        setValue,
    ] = useSubscribe(DeepSubscriberContext, "user");

    const handleChangeLastName: ChangeEventHandler<HTMLInputElement> = (e) => {
        const last = e.target.value;

        setValue(({ user }) => ({ ...user, name: { ...user.name, last } }));
    };

    logRender("lastName Input");

    return (
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <label>Last name</label>
            <Input onChange={handleChangeLastName} value={last} />
        </div>
    );
};
