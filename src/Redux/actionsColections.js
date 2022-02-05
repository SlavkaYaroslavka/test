import axios from "axios";
import { initializeApp } from "firebase/app";
import { getStorage , ref, uploadBytes, getDownloadURL} from "firebase/storage";

import { CREATE_COLECTIONS, DELETE_COLECTIONS, EDIT_COLECTIONS, SHOW_COLECTIONS, READ_COLLECTIONS , SET_TRUE_FLAG, 
    SET_FALSE_FLAG, SET_ID_ITHEM, ADD_NEW_ITHEM, READ_ITHEMS, DELETE_ITHEM, ADD_NEW_TAG, READ_TEGS, DELECTE_TAG, CREATE_NAME_COLLECTIONS,
    READ_NAME_COLECTIONS,SET_KEY_ITHEMS,LIKED, READ_LIKE,DISLIKE, CREATE_COMENT,READ_COMMENT, UPLOAD_PICTURES, UPLOAD_PICTURES_ITHEM,
    SEARCH_ITHEM, SEARCH_ITHEM_EMPTY, CLOSE_SEARCH} from "./types";

//const urlDataUser = process.env.REACT_APP_URL
//const urlDataUserData = process.env.REACT_APP_URL_FILE
//const firebaseConfig = process.env.REACT_APP_CONFIG
 const urlDataUserData = 'gs://projectcolections.appspot.com'
 const urlDataUser = 'https://projectcolections-default-rtdb.europe-west1.firebasedatabase.app'
 const firebaseConfig = {
    apiKey: "AIzaSyByArrDI_UvRl-dutEG8DIEvHOXtYJ0Wss",
    authDomain: "projectcolections.firebaseapp.com",
    databaseURL: "https://projectcolections-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "projectcolections",
    storageBucket: "projectcolections.appspot.com",
    messagingSenderId: "142002156176",
    appId: "1:142002156176:web:038367290412a6f2ccde15"
  };

export function showColections(keyID){
    return{
        type: SHOW_COLECTIONS,
        payload: keyID
    }
}

export function createColections(inerData){
    let a;
    return (dispatch) => {axios.post(`${urlDataUser}/collections.json`,inerData)
    .then((response)=>{
        if (!response.statusText){
               throw new Error(response.statusText) 
        }return response
    }) 
    .then( (response)=> { a =  {...inerData, keyID: response.data.name} })
    .then( ()=> { dispatch(createColectionsSecces(a))      
    }) 
}   
}

export function deleteColections(keyID){
    return (dispatch) => {
        axios.delete(`${urlDataUser}/collections/${keyID}.json/`)
        .then(function (response) {
           if(!response.statusText){
              throw new Error(response.statusText) 
           }
           return response;
         })
       .then(dispatch(deleteColectionsSecces(keyID)))
   }
}

export function editColections(){
    return{
        type:EDIT_COLECTIONS
    }
}

function createColectionsSecces(data){
    return{
        type:CREATE_COLECTIONS,
        payload: data
    }
}

export function readCollections(){
    return (dispatch)=>{
        axios.get(`${urlDataUser}/collections.json`)
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
        dispatch(readCollectionsSecces(masive))})
    }
}

function readCollectionsSecces(data){
  return{
      type: READ_COLLECTIONS,
      payload: data
  }
}

function deleteColectionsSecces(keyID){
    return{
        type: DELETE_COLECTIONS,
        payload: keyID
    }
}

export function setTrueFlag(data){
return {
    type: SET_TRUE_FLAG,
    payload: data
}
}

export function setFalseFlag(){
return {
    type:SET_FALSE_FLAG
}
}

export function setKeyIthem(data){
    return{
        type:SET_ID_ITHEM,
        payload: data
    }
}

export function addNewIthem(inerData){
    let a;
    return (dispatch) => {axios.post(`${urlDataUser}/ithems.json`,inerData)
    .then((response)=>{
        if (!response.statusText){
               throw new Error(response.statusText) 
        }return response
    }) 
    .then( (response)=> { a =  {...inerData, keyID: response.data.name} })
    .then( ()=> { dispatch(addNewIthemSecces(a))      
    }) 
}
}

function addNewIthemSecces(data){
    return{
        type:ADD_NEW_ITHEM,
        payload: data
    }
}

export function readAllIthems(){
    return (dispatch)=>{
        axios.get(`${urlDataUser}/ithems.json`)
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
        dispatch(readAllIthemsSecces(masive))})
    }
}

export function readAllIthemsSecces(data){
return{
    type: READ_ITHEMS,
    payload: data
}
}

export function deleteIthem(keyID){
    return (dispatch) => {
        axios.delete(`${urlDataUser}/ithems/${keyID}.json/`)
        .then(function (response) {
           if(!response.statusText){
              throw new Error(response.statusText) 
           }
           return response;
         })
       .then(dispatch(deleteIthemSecces(keyID)))
   }
}

function deleteIthemSecces(keyID){
return{
    type: DELETE_ITHEM,
    payload: keyID
}
}

export function createNewTags(inerData){
    let a;
    return (dispatch) => {axios.post(`${urlDataUser}/tags.json`,inerData)
    .then((response)=>{
        if (!response.statusText){
               throw new Error(response.statusText) 
        }return response
    }) 
    .then( (response)=> { a =  {...inerData, keyID: response.data.name} })
    .then( ()=> { dispatch(createNewTagsSucces(a))      
    }) 
}
}

function createNewTagsSucces(data){
    return{
        type: ADD_NEW_TAG,
        payload: data
    }
}

export function readTags(){
    return (dispatch)=>{
        axios.get(`${urlDataUser}/tags.json`)
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
        dispatch(readTagsSecces(masive))})
    }
}

function readTagsSecces(data){
    return{
        type:READ_TEGS,
        payload:data
    }
}

export function chandesTag(tag){
    return (dispatch) => {
        axios.delete(`${urlDataUser}/tags/${tag.keyID}.json/`)
        .then(function (response) {
           if(!response.statusText){
              throw new Error(response.statusText) 
           }
           return response;
         })
       .then(dispatch(deleteTagsSecces(tag.keyID)))
       .then(dispatch(createNewTags(tag)))
   }
}

function deleteTagsSecces(keyID){
    return{
        type: DELECTE_TAG,
        payload: keyID
    }
}

export function createNewNameCollections(inerData){
    let a;
    return (dispatch) => {axios.post(`${urlDataUser}/nameCollections.json`,inerData)
    .then((response)=>{
        if (!response.statusText){
               throw new Error(response.statusText) 
        }return response
    }) 
    .then( (response)=> { a =  {...inerData, keyID: response.data.name} })
    .then( ()=> { dispatch(createNewNameSucces(a))      
    }) 
}
}

function createNewNameSucces(data){
    return {
        type: CREATE_NAME_COLLECTIONS,
        payload: data
    }
}

export function readNameColections(){
    return (dispatch)=>{
        axios.get(`${urlDataUser}/nameCollections.json`)
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
        dispatch(readNameColectionsSucces(masive))})
    }
}

function readNameColectionsSucces(data){
    return{
        type: READ_NAME_COLECTIONS,
        payload: data
    }
}

export function setKeyIthems(key){
    return{
        type:SET_KEY_ITHEMS ,
        payload: key
    }
}

export function liked(inerData){
    let a;
    return (dispatch) => {axios.post(`${urlDataUser}/like.json`,inerData)
    .then((response)=>{
        if (!response.statusText){
               throw new Error(response.statusText) 
        }return response
    }) 
    .then( (response)=> { a =  {...inerData, keyID: response.data.name} })
    .then( ()=> { dispatch(likedSucces(a))      
    }) 
}
}

function likedSucces(data){
    return{
        type: LIKED,
        payload: data
    }
}

export function readLike(){
    return (dispatch)=>{
        axios.get(`${urlDataUser}/like.json`)
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
        dispatch(readLikeSucces(masive))})
    }
}

function readLikeSucces(data){
    return{
        type: READ_LIKE,
        payload: data
    }
}

export function dislike(keyID){
    return (dispatch) => {
        axios.delete(`${urlDataUser}/like/${keyID}.json/`)
        .then(function (response) {
           if(!response.statusText){
              throw new Error(response.statusText) 
           }
           return response;
         })
       .then(dispatch(dislikeSucces(keyID)))
   }
}

function dislikeSucces(data){
    return{
        type: DISLIKE ,
        payload: data
    }
}

export function createComment(inerData){
    let a;
    return (dispatch) => {axios.post(`${urlDataUser}/comment.json`,inerData)
    .then((response)=>{
        if (!response.statusText){
               throw new Error(response.statusText) 
        }return response
    }) 
    .then( (response)=> { a =  {...inerData, keyID: response.data.name} })
    .then( ()=> { dispatch(createCommentSucces(a))      
    }) 
}
}

function createCommentSucces(data){
return {
    type: CREATE_COMENT,
    payload: data
}
}

export function readComment(){
    return (dispatch)=>{
        axios.get(`${urlDataUser}/comment.json`)
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
        dispatch(readCommentSucces(masive))})
    }
}

function readCommentSucces(data){
    return{
        type: READ_COMMENT,
        payload: data
    }
}

export function uploadFile(form,dataColections){
    let urlPictures;
    return (dispatch)=>{
        const firebase =   initializeApp(firebaseConfig);
        const storage = getStorage(firebase)
        const imagesRef =  ref(storage, form.name)          
        uploadBytes(imagesRef , form)
        .then( snapshot =>{  // procent count or loader
         } )
         .then(()=>{
            getDownloadURL(ref(storage, form.name))
            .then((url) => {
              const xhr = new XMLHttpRequest();
              xhr.responseType = 'blob';
              xhr.onload = (event) => {
                const blob = xhr.response;
              };
             // xhr.open('GET', url);
             // xhr.send();
               urlPictures = url
                // Or inserted into an <img> element
               // const img = document.getElementById('myimg');
              //  img.setAttribute('src', url);
            }).then(()=>{
                let rez = Object.assign(dataColections,{pictures:urlPictures})
                dispatch(createColections(rez))
            })
            .catch((error) => {
             console.log(error)
            });
         })    
    }     
}

export function uploadFileIthems(form,dataColections){
    let urlPictures;
    return (dispatch)=>{
        const firebase =   initializeApp(firebaseConfig);
        const storage = getStorage(firebase)
        const imagesRef =  ref(storage, form.name)          
        uploadBytes(imagesRef , form)
        .then( snapshot =>{  // procent count or loader
         } )
         .then(()=>{
            getDownloadURL(ref(storage, form.name))
            .then((url) => {
              const xhr = new XMLHttpRequest();
              xhr.responseType = 'blob';
              xhr.onload = (event) => {
                const blob = xhr.response;
              };
               urlPictures = url
            }).then(()=>{
                let rez = Object.assign(dataColections,{pictures:urlPictures})
                dispatch(addNewIthem(rez))
            })
            .catch((error) => {
             console.log(error)
            });
         })    
    }      
}

export function searchIthems(data){
    if(! (data === '')){
        return{
            type: SEARCH_ITHEM,
            payload:data
        }
    }else{
        return{
            type: SEARCH_ITHEM_EMPTY
        }  
    }

}
export function closeSearch(){
    return{
        type: CLOSE_SEARCH
    }
}

