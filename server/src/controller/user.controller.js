import { addUser } from "../model/user.model.js"

export const createUser = async (req,res)=>{
    const {username,password,email} = req.body
    try {
        const result = await addUser(username,password,email)
        console.log(result);
        
        if(result.affectedRows === 0){
            res.status(402).json({message:'user not created'})
        } else {
            res.status(200).json({message:'user created successfully', user_Id:result.insertId})
        }
    } catch (error) {
        res.status(500).json({message:'error adding user', error:error.message})
    }
}
