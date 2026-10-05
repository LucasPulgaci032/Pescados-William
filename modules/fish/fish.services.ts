import { BadRequestError } from "@/lib/Errors/BadRequest.Error"
import { Fish } from "./fishSchema"
import cloudinary from "@/lib/cloudinary";


interface FishDTO {
    fishName : string,
    fishPicture : string,
    price : number,
    type: string
}

interface PatchFishDTO {
  fishName: string;
  price?: number;
  type?: string;
  fishPicture?: Buffer;
  available?: boolean
}

interface CloudinaryUploadResult {
  secure_url: string;
}

class FishService {
    
    static async getFishes(){
        return Fish.find({}).lean()
    }
    static async createFish(data : FishDTO){

        const fishExists = await Fish.findOne({
            fishName: data.fishName,
            });

        if(fishExists) throw new BadRequestError("Peixe ja existe no banco de dados!")

       const fishCreated = await Fish.create({
          fishName : data.fishName,
          fishPicture :data.fishPicture,
          price : data.price,
          type : data.type.toLowerCase()
       })

       return fishCreated
    }

    static async patchFish({
  fishName,
  price,
  fishPicture,
  type,
  available
}: PatchFishDTO) {
  const updateData: Record<string, unknown> = {};

  if (price !== undefined) {
    updateData.price = price;
  }

  if (type !== undefined) {
    updateData.type = type;
  }

  if (fishPicture) {
    const image = await uploadFishImage(fishPicture);
    updateData.fishPicture = image.secure_url;
  }

  if (available !== undefined) {
     updateData.available = available;
}

  return await Fish.findOneAndUpdate(
    { fishName },
    {
      $set: updateData,
    },
    {
      returnDocument: "after",
    }
  );
}

static async getFishByName(fishName: string) {
  if (!fishName) {
    throw new BadRequestError("Nome do peixe é obrigatório.");
  }

  const fish = await Fish.findOne({
    fishName: decodeURIComponent(fishName),
  });

  if (!fish) {
    throw new BadRequestError("Peixe não encontrado.");
  }

  return fish;
}

static async deleteFish(fishName: string) {
  const fish = await Fish.findOneAndDelete({ fishName });

  if (!fish) {
    throw new BadRequestError("Peixe não encontrado.");
  }

  return fish;
}

static async patchFishImage(
  fishName: string,
  buffer: Buffer
) {
  const image = await uploadFishImage(buffer);

  return Fish.findOneAndUpdate(
    { fishName },
    {
      fishPicture: (image as { secure_url: string }).secure_url,
    },
    {
      new: true,
    }
  );
}
    
}

export async function uploadFishImage(
  buffer: Buffer
): Promise<CloudinaryUploadResult> {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder: "fishes",
        },
        (error, result) => {
          if (error) return reject(error);

          resolve({
            secure_url: result!.secure_url,
          });
        }
      )
      .end(buffer);
  });
  
}


export default FishService