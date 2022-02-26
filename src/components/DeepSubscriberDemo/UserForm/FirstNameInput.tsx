import { ChangeEventHandler, ReactElement } from "react";
import { useSubscribeDeep } from "../../../react-subscribe-context/useSubscribeDeep";
import { logRender } from "../../../utils/logRender";
import { Input } from "../../Input";
import { DeepSubscriberContext } from "../DeepSubscriberContext";

export const FirstNameInput = (): ReactElement => {
    const [
        {
            user: { name },
        },
        setState,
    ] = useSubscribeDeep(DeepSubscriberContext);

    const handleChangeFirstName: ChangeEventHandler<HTMLInputElement> = (e) => {
        const first = e.target.value;

        setState(({ user }) => ({
            user: { ...user, name: { ...user.name, first } },
        }));
    };

    logRender("firstName Input");

    return (
        <div>
            <label>First name</label>
            <Input onChange={handleChangeFirstName} value={name.first} />
        </div>
    );
};
