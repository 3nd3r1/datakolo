export interface User {
    id: string;
    username: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface NewUser {
    username: string;
    password: string;
}

export type NonSensitiveUser = Omit<User, "password">;
