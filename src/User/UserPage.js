import React, { useState } from "react";
import {useNavigate} from 'react-router-dom'
import {connect,useDispatch} from 'react-redux'
import  ShowUserInfo from './UserInfo'
import ShowColections from './ColectionsInfo'
import {logOut} from '../Redux/actionsUser'
import cogoToast from 'cogo-toast';
import {createNewTags,createNewNameCollections} from '../Redux/actionsColections'
import { BsClipboardPlus,BsClipboardX,BsFileEarmarkExcel,BsFilePlus,BsFileMinus,BsJournalPlus,BsJournalMinus,BsHash, BsFillPaletteFill} from "react-icons/bs";

function UserPage(props){
  const [flag,changeFlag ] = useState(false)
  const [flag2,changeFlag2 ] = useState(false)
  let navigate = useNavigate();
  const  dispatch = useDispatch();
  if (Object.keys(props.dataUser).length === 0 ){return ( <h1> {}
      {setTimeout(()=>{  {navigate("/")}}, 1000)} </h1>) 
      }else if(Object.entries(props.dataUser)[0][1].block){
        return ( <>  <h1> You have been blocked by the administrator. </h1>
          {setTimeout(()=>{dispatch(logOut()); navigate("/") }, 2000)}  </>)
  }else { {cogoToast.success("Success!")} return( 
    <div className="container"> 
     <h2 className="funny-title section-title"> MY PAGE </h2>
          <div className="row">
        {/* <div className="col-4"><div className="header-h1"><h3>USER INFORMATIONS.</h3> </div>  <ShowUserInfo />   </div> */}
        <div className="col"> <div className="header-h1"><h3>COLLECTION INFORMATIONS.</h3> </div> <ShowColections /> </div>
        </div>
        <div className="row"> 
        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
        {AddNewCollections(navigate)}     {ButtonCreateTags(flag, changeFlag)}   {ButtonCreateNewNameCilections(flag2, changeFlag2)}  
       </div>
       <div>&nbsp;</div>
       </div>
       <div className="row row-cols-auto justify-content-md-center"> 
       <div className="col - 6">  { CreateNewTag(flag,changeFlag,dispatch)}   </div>
       <div className="col - 6">   {CreateNewCollections(flag2,changeFlag2,dispatch)} </div>
      
       </div>
    </div>
      )}
}

function ButtonCreateTags(flag, changeFlag){
  if(!flag){
    return(<div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
    <button type="button" className="btn btn-outline-light me-2"  onClick={()=>{changeFlag(true)}}>Create new TAG <BsHash/> </button>
  </div>)
  }else{
    return(<div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
    <button type="button" className="btn btn-outline-light me-2"  onClick={()=>{changeFlag(false)}}>Close window <BsFileEarmarkExcel/> </button>
  </div>)
  }
}

function CreateNewTag(flag,changeFlag,dispatch){
  if(flag){
    return( 
      <div className="col-10  mx-auto"  > 
      <div className="header-h1"><h3>Creator for tag.</h3> </div>
      <div className="input-group mb-3">
     <div className="input-group-text">
        <label> Name TAG </label>
     </div>
     <input type="text" className="form-control" aria-label="Text input with checkbox" id="name" />
      </div>
      <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
      <button type="button" className="btn btn-outline-light me-2" onClick={()=>{ createTags(dispatch, changeFlag) }}>Create TAG <BsClipboardPlus/> </button> &nbsp;
   <button type="button" className="btn btn-outline-light me-2" onClick={()=>{changeFlag(false)}}>Censel <BsClipboardX/> </button>
      </div> 
   </div>  
    )
  }else{}
}

function createTags(dispatch,changeFlag){
  let obj = Object.assign({value: document.getElementById('name').value }, {time:Date.now()}, {ID : randomInteger() }, {count: 1})
  dispatch(createNewTags ( obj ))
   cogoToast.loading("Creating new TAG !")
  document.getElementById('name').value = ""
  changeFlag(false)
}

function randomInteger() {
  let rand = 100 + Math.random() * (999999999 - 1);
  return (Math.round(rand) + Date.now())
}

function ButtonCreateNewNameCilections(flag2, changeFlag2){
  if(!flag2){
    return(<div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
    <button type="button" className="btn btn-outline-light me-2"   onClick={()=>{changeFlag2(true)}}>Create a new topic. <BsFilePlus/> </button>
  </div>)
  }else{
    return(<div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
    <button type="button" className="btn btn-outline-light me-2"  onClick={()=>{changeFlag2(false)}}>Close window <BsFileMinus/> </button>
  </div>)
  }
}

function CreateNewCollections(flag2,changeFlag2,dispatch){
  if(flag2){
    return(
      <div className="col-10  mx-auto"  > 
      <div className="header-h1"><h3>Creator for new topic.</h3> </div>
      <div className="input-group mb-3">
     <div className="input-group-text">
        <label> Name Topic  </label>
     </div>
     <input type="text" className="form-control" aria-label="Text input with checkbox" id="name" />
      </div>
      <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
   <button type="button" className="btn btn-outline-light me-2" onClick={()=>{ createNameColections(dispatch, changeFlag2) }}>
   Create new Topic   <BsJournalPlus/> </button> &nbsp;
   <button type="button" className="btn btn-outline-light me-2"  onClick={()=>{changeFlag2(false)}}>Censel <BsJournalMinus/> </button>
   </div>
   </div>
    )
  }else{}
}

function createNameColections(dispatch,changeFlag){
  let obj = Object.assign({value: document.getElementById('name').value }, {time:Date.now()}, {ID : randomInteger() }, {count: 1})
  dispatch(createNewNameCollections( obj ))
   cogoToast.loading("Creating new Name !")
  document.getElementById('name').value = ""
  changeFlag(false)
}

function AddNewCollections(navigate){
  return(<button type="button" className="btn btn-outline-light me-2" onClick={()=>{  navigate("/createColections")}}> Create new collections <BsFillPaletteFill/> </button>)
}

const mapStateToProps = state =>{ return { dataUser: state.tables.userData } }

//const mapDispatchToProps = dispatch => { return{ deleteUser, readData, addUser, blockUser, makeAdmin} }

export default connect(mapStateToProps, null)(UserPage)