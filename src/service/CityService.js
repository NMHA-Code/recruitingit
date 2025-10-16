import { Get, Post } from "../utils/request"

export const GetCity = async ()=>{
    const res = await Get('cities');
    return res;
}
export const PostCity = async ( newdata)=>{
    const res = await Post('cities', newdata);
    return res;
}