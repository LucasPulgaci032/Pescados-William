import mongoose, {Schema, model, models} from 'mongoose'



interface IUser {
    userName : string;
    email: string;
    password: string;
    role: string,
    provider : string
    createdAt : Date;
}

const UserSchema = new mongoose.Schema<IUser>({

    userName : {
        type : String, required : true
    },

    email : {
        type: String, 
        required : true,
        unique: true
    },

    password : {
        type: String, required : false //em sso com o google não tem senha
    },

     role : {
        type : String,
        default : "user"
    },
    provider : {
        type : String,
        enum : ["local", "google"],
        default : "local"
    },

    createdAt : {  
        type : Date, default: Date.now
    }
   
})

export const User = models.User || model<IUser>("User", UserSchema)