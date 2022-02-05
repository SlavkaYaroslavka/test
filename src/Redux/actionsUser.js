import axios from 'axios';
import { DELETE_USER,ADD_USER, READ_DATA, LOGIN_USER, LOGOUT_USER, BACK_ACCOUNT, BACK_ACOUNT_N, SET_THEME_LIGHT, SET_THEME_DARK,
BLOCK_USER,UN_BLOCK_USER,MAKE_ADMIN, MAKE_USER } from "./types";

//const urlDataUser = process.env.REACT_APP_URL
const urlDataUser = 'https://projectcolections-default-rtdb.europe-west1.firebasedatabase.app'

 function deleteUserSeccess(userID){
    return{
        type: DELETE_USER,
        payload: userID
    }
}

 function addUserSeccess(data){
    return{
        type: ADD_USER,
        payload:data
    }
}

 function readDataSuccess(masive){
    return{
        type: READ_DATA,
        payload: masive
    }
}

export function readData(){
    return (dispatch)=>{
        axios.get(`${urlDataUser}/data.json`)
        .then(function (response) {
            if(!response.statusText){
               throw new Error(response.statusText) 
            }
            return response;
          })
          .then(response=>{
            const rez =  Object.keys(response.data).map(key => {
            return{
                ...response.data[key],
                keyID:key
            } 
        }); return rez 
      })
      .then(masive=>{
        dispatch(readDataSuccess(masive))})
    }
}

export function deleteUser(keyID){
    return (dispatch) => {
         axios.delete(`${urlDataUser}/data/${keyID}.json/`)
         .then(function (response) {
            if(!response.statusText){
               throw new Error(response.statusText) 
            }
            return response;
          })
        .then(dispatch(deleteUserSeccess(keyID)))
    }
}

export function addUser(inerDataUser){
    let a;
    return (dispatch) => {axios.post(`${urlDataUser}/data.json`,inerDataUser)
    .then((response)=>{
        if (!response.statusText){
               throw new Error(response.statusText) 
        }return response
    }) 
    .then( (response)=> { a =  {...inerDataUser, keyID: response.data.name} })
    .then( ()=> { dispatch(addUserSeccess(a))      
    }) 
}   
}

export function blockUser(dataUser){
let keyID = (dataUser.keyID);
let flag ;
if (dataUser.block){flag = false}else{flag = true}
return (dispatch)=>{
    axios.patch(`${urlDataUser}/data/${keyID}.json`,{block:flag})
    .then(function (response) {
        if(!response.statusText){
           throw new Error(response.statusText) 
        }
        return response;
      })
      .then(response=>{
        const rez =  Object.keys(response.data).map(key => {
        return{
            ...response.data[key],
            keyID:key
        } 
    }); return rez 
  })
  .then(()=>{
    dispatch(blockUserSuccess(dataUser))
})}}

 function blockUserSuccess(dataUser){
     if(dataUser.block){
         return{
             type: UN_BLOCK_USER,
             payload:dataUser.ID
         }
     }else{
        return{
            type: BLOCK_USER,
            payload: dataUser.ID
        }
     }
 }

 export function makeAdmin(dataUser){
     let keyID = dataUser.keyID;
      let flag; 
    dataUser.admin? flag = false : flag = true;
    return (dispatch)=>{
        axios.patch(`${urlDataUser}/data/${keyID}.json`,{admin:flag})
        .then(function (response) {
            if(!response.statusText){
               throw new Error(response.statusText) 
            }
            return response;
          })
          .then(response=>{
            const rez =  Object.keys(response.data).map(key => {
            return{
                ...response.data[key],
                keyID:key
            } 
        }); return rez 
      })
      .then(()=>{
        dispatch(makeAdminSucces(dataUser))
    })
    }
 }

 function makeAdminSucces(dataUser){
     if(dataUser.admin){return{
        type:MAKE_USER,
        payload: dataUser.ID
     }}else{return{
        type: MAKE_ADMIN,
        payload: dataUser.ID
     }}
 }

/* export function blockUsera(dataUser){
    let flag;
    if (dataUser.block){flag = false}
    else {flag = true}
return (dispatch)=> {//axios.post(`${urlDataUser}/data/${dataUser.keyID}.json/`, {block: flag} )
    let a = {...dataUser, block: flag}   
    dispatch( deleteUser(dataUser.keyID))
    dispatch(addUser(a))
}} */

 /*export function makeAdmin(dataUser){
    let flag; 
    dataUser.admin? flag = false : flag = true
    return ((dispatch)=>{
        let a = {...dataUser, admin: flag}   
        dispatch( deleteUser(dataUser.keyID))
        dispatch(addUser(a))
    })
}*/

export function checkingUser(data){
    let flag = false;
    let user;
    return (dispatch)=>{
        axios.get(`${urlDataUser}/data.json`, {params:{ userName: "vasja"}})
        .then(function (response) {
            if(!response.statusText){
               throw new Error(response.statusText) 
            }
            return response;
          })
          .then(response=>{
            const rez =  Object.keys(response.data).map(key => {
                return{
                    ...response.data[key],
                    keyID:key
                } 
            });
             let m =  Object.values(rez)
             for (const iterator of m) {
                 if(iterator.email === data.email){
                     if(iterator.password === data.password){
                        user = iterator;
                        return {};
                     }else { flag = true}
                 }else  { flag = true}
             } if(flag){alert("Sorry, but this email or password is not")}
           })
           .then ( ()=>{
               if(!!user){dispatch(checkingUserSucses(user))
                }
           })
    }
}

function checkingUserSucses(data){
    return{
        type: LOGIN_USER,
        payload: data
    } 
}

export function logOut(){
    return{
        type: LOGOUT_USER,
    }
}

export function logInAsUser(data){

    return (dispatch)=>{dispatch(createBackAcount(data))}
}

function createBackAcount(data){
    return{
        type: BACK_ACCOUNT,
        payload: data
    }
}

export function backAccount(){
 return {
     type: BACK_ACOUNT_N
 }
}

export function setThemeLight(keyID){
    return (dispatch)=>{
        axios.patch(`${urlDataUser}/data/${keyID}.json`,{theme:'light'}, {theme:'dark'})
        .then(function (response) {
            if(!response.statusText){
               throw new Error(response.statusText) 
            }
            return response;
          })
          .then(response=>{
            const rez =  Object.keys(response.data).map(key => {
            return{
                ...response.data[key],
                keyID:key
            } 
        }); return rez 
      })
      .then(()=>{
        dispatch(setThemeLightSuccess())
    })
    }
}

function setThemeLightSuccess(){
return{
    type: SET_THEME_LIGHT
}
}

export function setThemeDark(keyID){
    return (dispatch)=>{
        axios.patch(`${urlDataUser}/data/${keyID}.json`,{theme:'dark'}, {theme:'light'})
        .then(function (response) {
            if(!response.statusText){
               throw new Error(response.statusText) 
            }
            return response;
          })
          .then(response=>{
            const rez =  Object.keys(response.data).map(key => {
            return{
                ...response.data[key],
                keyID:key
            } 
        }); return rez 
      })
      .then(()=>{
        dispatch(setThemeDarktSuccess())
    })
    }
}

function setThemeDarktSuccess(){
    return{
        type: SET_THEME_DARK
    }
}
