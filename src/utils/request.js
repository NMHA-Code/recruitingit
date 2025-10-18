// const API_DOMAIN = 'http://localhost:3002/';
const API_DOMAIN = 'https://datacuoicung-cl8m.vercel.app/';
// Get
export const Get = async (path) => {
    const res = await fetch(API_DOMAIN + path);
    const data = await res.json();
    return data;
}
// POST
export const Post = async (patch, newdata) =>{
    const res = await fetch(API_DOMAIN + patch, {
        method: 'POST',
        headers:{
            Accept: 'application/json',
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(newdata)
    })
    const data = await res.json();
    return data;
}

// Delete
export const Delete = async (path, dataid)=>{
    const res = await fetch(`${API_DOMAIN}${path}/${dataid}`, {
        method: 'DELETE',
    })
    const data = await res.json();
    return data;
}

// Edit
export const Edit = async (path, dataid, newdata)=>{
    const res = await fetch(`${API_DOMAIN}${path}/${dataid}`, {
        method: 'PATCH',
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newdata)
    })
    const data = await res.json();
    return data;
}