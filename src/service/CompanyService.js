import { Edit, Get, Post } from "../utils/request"

export const GetCompany = async () =>{
    const res = await Get('companies');
    return res;
}
export const EditCompany = async (dataid, newdata)=>{
    const res = await Edit('companies', dataid, newdata);
    return res;
}
export const PostCompany = async (newdata) =>{
    const res = await Post('companies', newdata);
    return res;
}