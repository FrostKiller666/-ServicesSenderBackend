export interface UserEntity {
    id: string;
    username: string;
    email: string;
    password: string;
}

export interface ResponseUserPassword {
    oldPassword: string;
    password: string;
    resPassword: string;
    resUsername: string;
}

export interface ResponseUserUsername {
    resId: string;
    username: string;

}
