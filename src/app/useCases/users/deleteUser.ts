import { Request, Response } from "express";
import { User } from "../../models/User";

export async function deleteUser(req: Request, res: Response) {
  try {
    const { userId } = req.params

    if(!userId) {
      res.status(400).json({ error: 'Paramter ID no found!'})
    }

    const userNotExist = await User.findById({ _id: userId })

    if(!userNotExist) {
      res.status(400).json({ error: 'User does not exist' })
      return
    }
    await User.deleteOne({ _id: userId })

    res.status(204).json({ message: 'User deleted' })

  }catch (error){
    console.log(error)
    res.status(500)
  }
}
