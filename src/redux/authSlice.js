import { createSlice } from '@reduxjs/toolkit'


const initialState={
    adminInfo:localStorage.getItem('adminInfo')?JSON.parse(localStorage.getItem('adminInfo')):null
}


const authSlice=createSlice({
    name:"auth",
    initialState,
      reducers:{
        setUserCredential:(state,action)=>{
            state.adminInfo=action.payload.user
            localStorage.setItem('adminInfo',JSON.stringify(action.payload.user))
            localStorage.setItem('adminaccestoken',JSON.stringify(action.payload.accestoken))
        },
        removeUserCredential:(state,action)=>{
         
            state.adminInfo=null;
            localStorage.removeItem('adminInfo')
            localStorage.removeItem('adminaccestoken')
        }
    }
})


export const {setUserCredential,removeUserCredential}=authSlice.actions

export default authSlice.reducer