import axios from "axios"
import {API_URL} from "../../constants/index"

export async function createUser(data:any) {
    try {
        console.log(data)
        const response = await axios.post(API_URL + "/api/user",data,{
            headers:{
                "Content-Type":" application/json"
            }
        })
        console.log(response)
    } catch (err) {
        console.error(err)
    }
   
}

