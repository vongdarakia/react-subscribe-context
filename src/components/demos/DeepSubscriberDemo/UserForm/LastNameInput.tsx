import { ChangeEventHandler, ReactElement } from "react";
import { useSubscribeDeep } from "../../../../react-subscribe-context/useSubscribeDeep";
import { logRender } from "../../../../utils/logRender";
import { Input } from "../../../Input";
import { DeepSubscriberContext } from "../DeepSubscriberContext";

export const LastNameInput = (): ReactElement => {
    const [
        {
            user: { name },
        },
        setState,
    ] = useSubscribeDeep(DeepSubscriberContext);

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
