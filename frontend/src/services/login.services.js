import http from "./http-common";

export async function signup(user){
    return await http.post("/signup",user)
}

export async function UserLogin(user){
    return await http.post("/login",user)
}