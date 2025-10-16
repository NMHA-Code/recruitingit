import { Delete, Get, Post } from "../utils/request"

export const GetTags = async () => {
    const res = await Get('tags');
    return res;
}
export const DeleteTags = async ( dataid)=>{
    const res = await Delete('tags', dataid);
    return res;
}
export const PostTags = async (newdata)=>{
    const res = await Post('tags', newdata);
    return res;
}