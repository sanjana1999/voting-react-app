const authReducers = (state = false, action) =>{
    switch(action.type){
        case "sign_in":
            state = true;
            return state;
        case "sign_out":
            state = false;
            return state;
        default : 
            return state;  
    }
}
export default authReducers;