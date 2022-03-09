import { Input } from "components/Input";
import { ChangeEventHandler, ReactElement } from "react";
import { useSubscribeAll } from "react-subscribe-context/useSubscribeAll";
import { logRender } from "utils/logRender";
import { DeepSubscriberContext } from "../DeepSubscriberContext";

export const LastNameInput = (): ReactElement => {
    const [
        {
            user: { name },
        },
        setState,
    ] = useSubscribeAll(DeepSubscriberContext);

    const handleChangeLastName: ChangeEventHandler<HTMLInputElement> = (e) => {
        const last = e.target.value;

        setState(({ user }) => ({
            user: { ...user, name: { ...user.name, last } },
        }));
    };

    logRender("lastName Input");

    return (
        <div>
            <label>Last name</label>
            <Input onChange={handleChangeLastName} value={name.last} />
        </div>
    );
};
