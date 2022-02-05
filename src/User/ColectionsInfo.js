import React, { useState } from "react";
import {useNavigate} from 'react-router-dom'
import { connect, useDispatch } from "react-redux";
import { BsFillGearFill ,BsTrash,BsZoomIn, BsFillPaletteFill, BsVectorPen,BsXLg} from "react-icons/bs";
import {deleteColections,showColections,setTrueFlag,setFalseFlag,setKeyIthem} from '../Redux/actionsColections'
import CollectionsIner from "./CollectionsIner";
import IthemInfo from "./IthemInfo";
import cogoToast from 'cogo-toast';

function ShowColections(props){ 
    const [flagIthems,changeFlag ] = useState(false)
    const [keyId,changeKey ] = useState(false)
    let flagForm = props.flagForm
    let navigate = useNavigate();
    const  dispatch = useDispatch();  
    if(!( props.colections.length ===0 )){
        return (<div>
            <div className="container">
           {MapColections(props.colections,props.dataUser[0].email,dispatch,navigate, flagForm, changeFlag,flagIthems,keyId,changeKey)}
           &nbsp;
               </div> 
            <div className="col justify-content-md-center"     >  
             {ShowInfo(flagForm,dispatch)} </div>
             <div  style={{display: 'flex', justifyContent: 'center', margin: '1rem'}}>  
             {ShowIthems(flagIthems,changeFlag,keyId)} </div>
        </div>) 
    }else{return(
          <div> <h2> Sorry, but no collections have been created yet. </h2>  
          </div>)}    
}

function MapColections(colections,userEmail,dispatch,navigate,flag,changeFlag, flagIthems,keyId,changeKey){
    return(
        <div className="row row-cols-auto justify-content-md-center">
            {colections.map(masive =>{     
                if ( masive.email === userEmail){
                    return CreateList(masive,dispatch,navigate, flag, changeFlag, flagIthems,keyId,changeKey)
                }
            })}
        </div>
    )
}

function CreateList(data,dispatch,navigate,flag, changeFlag, flagIthems,keyId,changeKey){
    return(<div className="col">
    <div className="card text-white bg-dark mb-3"> 
    <div className="card-header">Collections Card</div>
    <div className="card-body">
    <h5 className="card-title">Name - { data.collectionsName }</h5>
    <div className ="d-grid gap-2 d-sm-flex justify-content-sm-center">  {ButtonShowInfo(data,dispatch,flag)}  {ButtonShowIthems(changeFlag,flagIthems,data,keyId,changeKey)} </div> &nbsp;
    <div className ="d-grid gap-2 d-sm-flex justify-content-sm-center">  {ButtonCreateIthem(dispatch,data,navigate)} {ButtonDellete(data,dispatch)} </div>      
     </div>
     </div> 
     </div> )
}

function ButtonShowInfo(data, dispatch, flag){
   if(!flag){ return(<button type="button" className="btn btn-outline-light me-2" onClick={()=>{ dispatch(showColections(data.keyID));
    dispatch( setTrueFlag(data) ) } }>Show info <BsZoomIn/></button>)
    }else {
        return(<button type="button" className="btn btn-outline-light me-2" onClick={()=>{ dispatch(setFalseFlag())}  } > Close info <BsZoomIn/></button>)
    }  
}

function ButtonShowIthems(changeFlag,flagIthems,data,keyId,changeKey){
    if (!flagIthems){
        return(<button type="button" className="btn btn-outline-light me-2" onClick={()=>{ changeKey( keyId = data.keyID) ; 
            changeFlag(flagIthems= true) }}> Show Ithems <BsFillGearFill/></button>)
    }else{
        return(<button type="button" className="btn btn-outline-light me-2" onClick={()=>{changeKey( keyId = false);
            changeFlag(flagIthems = false ) }}> Close Ithems <BsFillGearFill/></button>)
    }
}

function ButtonDellete(data,dispatch,){
    return(<button type="button" className="btn btn-outline-light me-2" onClick={()=>{dispatch(deleteColections(data.keyID));  cogoToast.error("Deleted!") }}> Delete <BsTrash/> </button>)
}

function AddNewCollections(navigate){
    return(<button type="button" className="btn btn-outline-light me-2" onClick={()=>{  navigate("/createColections")}}> Create new collections <BsFillPaletteFill/> </button>)
}

function ButtonCreateIthem(dispatch,dataColections,navigate){
 return(<button type="button" className="btn btn-outline-light me-2" onClick={()=>{dispatch(setKeyIthem( dataColections.keyID) );
  navigate('/createIthem')  }}>Create new Ithem  <BsVectorPen/> </button>)   
}
 
 function ShowInfo (flag,dispatch){
     if (flag){  
        return(<div className="conteiner"> 
        <div className="header-h1"><h3>CHOISE INFORMATIONS.</h3> </div>
        <div className="row row-cols-auto justify-content-md-center">
        <div className="col-10">
        <CollectionsIner/>
        </div>
        </div>
         &nbsp;
        <div className ="d-grid gap-2 d-sm-flex justify-content-sm-center">
        <button type="button" className="btn btn-outline-light me-2" onClick={()=>{dispatch(setFalseFlag())}}>Close info <BsXLg/></button>
        </div>
         </div>) 
     } else{return(<></>)}
 }

 function ShowIthems (flag,changeFlag, keyId){
    if (flag){  
       return(<div className="container"> 
       <div className="header-h1"><h3>ITHEMS INFORMATIONS.</h3> </div>
       <IthemInfo keyId = {keyId}/>
       <div className="row"><div className="col" > &nbsp;
        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center" >
       <button type="button" className="btn btn-outline-light me-2" onClick={()=>{changeFlag( flag = false)}}>Close info <BsXLg/></button>
       </div>  </div> </div>
        </div>) 
    } else{return(<></>)}
}
 
const  mapStateToProps  = state => {return{dataUser: state.tables.userData, colections : state.colections.colections ,
     flagForm: state.colections.flag, collectionsData: state.colections.collectionsData  }}

//const mapDispatchToProps = dispatch => { return{deleteColections} }

export default connect(mapStateToProps,null)(ShowColections)