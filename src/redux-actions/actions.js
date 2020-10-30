export const signin = () => {
    return {
        type : "sign_in"
    }
}

export const signout = () => {
    return {
        type : "sign_out"
    }
}

export const assignuserinfo = (uniqueid) => {
    return{
        type : "assign",
        value : uniqueid
    }
}