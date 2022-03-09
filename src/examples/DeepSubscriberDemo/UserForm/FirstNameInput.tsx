import { Input } from "components/Input";
import { ChangeEventHandler, ReactElement } from "react";
import { useSubscribeAll } from "react-subscribe-context/useSubscribeAll";
import { logRender } from "utils/logRender";
import { DeepSubscriberContext } from "../DeepSubscriberContext";

export const FirstNameInput = (): ReactElement => {
    const [
        {
            user: { name },
        },
        setState,
    ] = useSubscribeAll(DeepSubscriberContext);

    const handleChangeFirstName: ChangeEventHandler<HTMLInputElement> = (e) => {
        const first = e.target.value;

        console.log({ first });

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
