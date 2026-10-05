import { model, models} from 'mongoose'
import mongoose from 'mongoose'

const fishSchema = new mongoose.Schema({

    fishName : {
        type : String
},
    fishPicture : {
        type : String
    },  
 
    price : {
        type : Number
    },

    type : {
        type : String,
        default : "Peixes inteiros"
    },
    available: {
        type: Boolean,
        default: true,
        }

}
)


export const Fish = models.Fish || model('Fish', fishSchema) //protegido em recompilações, diferente de mongoose.model