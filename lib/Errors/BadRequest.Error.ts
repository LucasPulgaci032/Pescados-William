import ErroBase from "./Erro.Base";

export class BadRequestError extends ErroBase{
    constructor(message = "Preencha todos os campos!"){
        super(message,400)
    }
}