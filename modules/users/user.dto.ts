export type CreateUserDTO = {
    userName : string,
    email: string,
    role : string,
    password : string
}


export type ValidateUserDTO = {
    email : string,
    password : string
}