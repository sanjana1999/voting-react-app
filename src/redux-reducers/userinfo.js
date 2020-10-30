const userinfoReducers = (state="" , action) =>{
    switch(action.type){
        case "assign":
            state = action.value ;
            return state;
        default : 
            return state;  
    }
}
export default userinfoReducers;