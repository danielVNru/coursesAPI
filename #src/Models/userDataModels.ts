
export type UserData = {
    id: string,
    name: string,
    login: string,
    created_at: number
}

let userData:UserData 

export const setUserData = (data: UserData)=>{
    userData = data
}

export const getUserData = ()=>{
    return userData
}