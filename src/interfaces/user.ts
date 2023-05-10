export interface IUser {
    _id: string;
    name: string;
    email: string;
    password?: string;
    role: ValidRoles;

    createdAt?: string;
    updatedAt?: string;
}

export interface IUserApi {
    email: string;
    role: string;
    name: string
}

type ValidRoles = 'admin' | 'client'