import { RouterContext } from "oak";
import { UserDTO } from "@/validators/user.ts";

export interface AppState {
    user?: UserDTO;
}

export type AppContext<
    Params extends Record<string, string> = Record<string, never>,
> = RouterContext<string, Params, AppState>;
