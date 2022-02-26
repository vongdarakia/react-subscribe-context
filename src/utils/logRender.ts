import { RENDER_COLOR } from "constants/colors";
import { logColor } from "./logColor";

export const logRender = (message: string, ...args: any[]) => {
    console.log(`%crender ${message}`, logColor(RENDER_COLOR), ...args);
};
