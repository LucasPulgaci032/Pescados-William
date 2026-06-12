class ErroBase extends Error {

    public status: number; 

    constructor(message = "Server error", status = 500) {
        super(message);
        this.status = status;
        this.name = this.constructor.name;

        Error.captureStackTrace(this, this.constructor);
    }
}

export default ErroBase;