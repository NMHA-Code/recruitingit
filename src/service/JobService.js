import { Delete, Edit, Get, Post } from "../utils/request"

export const GetJob = async () =>{
    const res = await Get('jobs');
    return res;
}
export const PostJob = async (newdata)=>{
    const res = await Post('jobs', newdata);
    return res;
}
export const DeleteJob = async (dataid) =>{
    const res = await Delete('jobs', dataid);
    return res;
}
export const EditJob = async ( dataid, newdata)=>{
    const res = await Edit('jobs', dataid,newdata);
    return res;
}