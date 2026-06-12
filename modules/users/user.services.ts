import { User } from "./userSchema";
import bcrypt from  'bcryptjs'
import  jwt  from "jsonwebtoken";
import { CreateUserDTO, ValidateUserDTO } from "./user.dto";
import { UnauthorizedError } from "@/lib/Errors/Unauthorized.Error";
import { BadRequestError } from "@/lib/Errors/BadRequest.Error";


class UserService {



  static async getUser(){
    return User.find({})
  }
  
  static async postUser(data : CreateUserDTO ){
  
    if (!data.email || !data.password ) {
      throw new BadRequestError()
      
    }
    const existingEmail = await User.findOne({email : data.email})
    if(existingEmail) throw new BadRequestError("Email já cadastrado!")
      
    const hashed = await bcrypt.hash(data.password,10)
    
    const newUser = await User.create({
      userName : data.userName,
      email: data.email,
      role: data.role,
      password : hashed
    })
    
     const token = generateToken(newUser)

     return { token }
  }
  
  static async loginUser( data : ValidateUserDTO){
     const email = data.email.trim().toLowerCase()
     const password = data.password?.trim()

     if(!email || !password) throw new BadRequestError()

      const user  = await User.findOne({email})
      
      if(!user) throw new UnauthorizedError()

      const validator = await bcrypt.compare(password, user.password)

      if(!validator) throw new UnauthorizedError()


     const token =  generateToken(user)


     return {token}
  }

   static async deleteDB(){
    return User.deleteMany()
   }
   
}

type JwtPayload = {
  _id: string;
  email: string;
};

const SECRET = process.env.SECRET_TOKEN as string

function generateToken(user : JwtPayload){
      return jwt.sign(
        {
        id : user._id,
        email : user.email
        },
        SECRET,
        {expiresIn : "1h"}
      )
}


export default UserService
