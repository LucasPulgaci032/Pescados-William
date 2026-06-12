import UserPurchase from "./userPurchase.schema";
import { CreatePurchaseDTO } from "./userPurchase.types";


class UserPurchaseService {

    static async createOrder(userID: string , data : CreatePurchaseDTO){
        return UserPurchase.create({
            user: userID,
            purchases: data.purchases
        })
    }


}

export default UserPurchaseService