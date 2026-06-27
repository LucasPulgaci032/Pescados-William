import { BadRequestError } from "@/lib/Errors/BadRequest.Error"
import { Fish } from "./fishSchema"
import cloudinary from "@/lib/cloudinary";


interface FishDTO {
    fishName : string,
    fishPicture : string,
    price : number
}

class FishService {
    
    static async getFishes(){
        return Fish.find({})
    }
    static async createFish(data : FishDTO){

        const fishExists = await Fish.findOne({
            fishName: data.fishName,
            });

        if(fishExists) throw new BadRequestError("Peixe ja existe no banco de dados!")

       const fishCreated = await Fish.create({
          fishName : data.fishName,
          fishPicture :data.fishPicture,
          price : data.price
       })

       return fishCreated
    }

    static async patchFish(fishName: string, price: number){
        const fishUpdated = await Fish.findOneAndUpdate(
        { fishName },
        { price },
        { new: true }
    );
        console.log(fishUpdated)

        return fishUpdated
    }
    
}

export async function uploadFishImage(buffer : Buffer){
    return new Promise((resolve,reject)=> {
        cloudinary.uploader
        .upload_stream(
            {
                folder: "fishes",
            },
            (error, result) => {
                if (error) return reject(error);
                resolve(result)
            }
        )
        .end(buffer)
    })
}

export default FishService