import ErroBase from "./Erro.Base";

export class UnauthorizedError extends ErroBase{
    constructor(message = "Email ou senha icorretos"){
        super(message,401)
    }
}