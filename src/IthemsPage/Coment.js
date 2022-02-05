import React from "react";
import { useDispatch, useSelector } from 'react-redux'
import cogoToast from 'cogo-toast';
import {createComment} from '../Redux/actionsColections';  
import { BsFillChatDotsFill } from "react-icons/bs";
import {readComment} from '../Redux/actionsColections'

 function  Coment(){
    const ithemKeyID = useSelector(state => state.colections.keyIdIthems);
    const user = useSelector(state => state.tables.userData);
    const dispatch = useDispatch();
    const comments = useSelector(state => state.colections.comment)
    // setInterval(() => { dispatch( readComment())}, 10000);
    return(<div className="row row-cols-auto justify-content-md-center">
    <div className="col-7 justify-content-md-center">
        {ShowComment(comments,ithemKeyID)}
        {CreateNewComment(ithemKeyID, user,dispatch)}
        </div>
    </div>)
};

function ShowComment(comment,ithemKeyID){
    if( !(comment.length === 0) ){
        let filtredComment = comment.filter(data => data.ithemKeyID === ithemKeyID)
        if (!(filtredComment.length === 0)) {
            return  filtredComment.map(data=>{
                return CommentAdd(data)
          })
        } else {return(<>{NoComments()}</>)}
    } else {return(<>{NoComments()}</>)}
}

function CommentAdd(data){
    return(
    <div className="container" key={data.keyID}> 
    <div className="card text-white bg-secondary mb-3" >
     <div className="card-header "> Comment   &nbsp;  <span className="badge bg-primary rounded-pill-">  {data.time} </span> 
       <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
       <BsFillChatDotsFill/>
     </span> 
     </div>
     <div className="card-body">
       <h5 className="card-title">  Autor: {data.userName} </h5>
       <p className="card-text"> Text: {data.text}</p>
     </div>
   </div>
       </div>
    )
}

function CreateNewComment(ithemKeyID, user, dispatch){
    if(user.length !== 0 ){
        return(
        <div className="container">
        <div className="card text-white bg-secondary mb-3" >
       <div className="card-header">Create new coment
       <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
       <BsFillChatDotsFill/>
       <span className="visually-hidden"></span>
     </span> 
       </div>
       <div className="card-body">
         <h5 className="card-title">   
         <span className="badge bg-primary rounded-pill">  User  -  {user[0].userName} </span>    
         </h5>
         <div className="input-group">
       <span className="input-group-text">Enter your comment. </span>
       <textarea className="form-control" aria-label="With textarea" id="comment"> </textarea>
       <div> &nbsp;
       <button type="button" className="btn btn-outline-light me-2" onClick={()=>{ createCommentIN(ithemKeyID,user,dispatch)}}>Create</button>
       </div>
       </div>
         </div>
         </div>
         </div>)
    }else {
        return(
            <div className="container">
        <div className="card text-white bg-secondary mb-3" >
       <div className="card-header">Create new coment 
       <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
       <BsFillChatDotsFill/>
       <span className="visually-hidden"></span>
     </span> </div>
       <div className="card-body">
         <h5 className="card-title">   
         <span className="badge bg-primary rounded-pill"> If you want to leave a comment, you must log in. </span>    
         </h5>
           </div>
            </div>
              </div>
        )
    }
    
}

function createCommentIN(ithemKEY,user,dispatch){
let a = document.getElementById('comment').value
if ( (a).length === 0 || a === " " ){
    document.getElementById('comment').value = ""
    return( <>
        {cogoToast.warn('Sorry, but you need to enter a comment.')}
          </>
    )
}else{
    document.getElementById('comment').value = ""
    cogoToast.success('Comment successfully added.');
    let obj = Object.assign({ ithemKeyID: ithemKEY}, {userKeyID : user[0].keyID}, {userName: user[0].userName}, {text: a} ,
         {time:new Date().toLocaleString() })
    console.log(obj)
    dispatch(createComment(obj))  
}
}

function NoComments(){
    return(
        <div className="container"> 
    <div className="card text-white bg-secondary mb-3" >
     <div className="card-header "> Comment   &nbsp; 
       <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
         <BsFillChatDotsFill/>
       <span class="visually-hidden"></span>
     </span> 
     </div>
     <div className="card-body">
       <h5 className="card-title"> Sorry, but no comments have been added yet.  </h5>
     </div>
   </div>
       </div>
    )
}

export default Coment;