import { StatusCodes } from "http-status-codes"

export const info = async(req,res) => {
    return res.status(StatusCodes.OK).json({
        success:true,
        message:"API is live",
        error:{},
        data:{}
    })
}
