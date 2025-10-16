import { Delete, Edit, Get, Post } from "../utils/request"

export const GetCV = async ()=>{
    const res = await Get('cvs');
    return res;
}
export const PostCV = async (newdata) =>{
    const res = await Post('cvs', newdata);
    return res;
}
export const EditCV = async (dataid, newdata) => {
    const res = await Edit('cvs', dataid, newdata);
    return res;
}
export const DeleteCV = async (dataid) =>{
    const res = await Delete('cvs', dataid);
    return res;
}