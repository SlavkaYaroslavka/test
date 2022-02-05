import React from "react";
import { connect,useDispatch } from "react-redux";
import { BsTrash} from "react-icons/bs";
import {deleteIthem} from '../Redux/actionsColections'
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

function IthemInfo(props){
    const  dispatch = useDispatch();
   if(! (props.ithems.length === 0 )){
    return(<div className="row row-cols-auto justify-content-md-center"> 
    {props.ithems.map((data)=>{ if(data.collectionsKeyId === props.keyId){ return(<> {CtrateList(data,dispatch)} </>) } })}
    </div>)   
   }else{ return(<div> <h2> Sorry, but no ithems have been created yet. </h2> </div>)}
}

function CtrateList(data,dispatch){
     return( <div className="container" >
      <div className="row row-cols-auto justify-content-md-center">
     {Object.entries(data).map(([key,value])=>{ let markdown = value;
      if(key === "description"){
            return ( <div class="card text-white bg-secondary mb-3">
                    <div class="card-header">key</div>
                     <div class="card-body">
                   <h5 class="card-title">   <ReactMarkdown children={markdown} remarkPlugins={[remarkGfm]} />   </h5>
                 <p class="card-text"></p>
                    </div> 
                    </div> )
      }else if(key === "pictures") {
        return ( <div class="card text-white bg-secondary mb-3">
                    <div class="card-header">key</div>
                     <div class="card-body">
                   <h5 class="card-title">   
                   <img src={value} alt="Pictures" width={100}></img>
                      </h5>
                 <p class="card-text"></p>
                    </div> 
                    </div> )
      }else{
        return (<div class="card text-white bg-secondary mb-3">
                     <div class="card-header">{key}</div>
                     <div class="card-body">
                      <h5 class="card-title">   {value}   </h5>
                     <p class="card-text"></p>
                    </div> 
                    </div>
                  )
             }
      }
          )   
      }   </div> &nbsp;
      <div className="d-grid gap-2 d-sm-flex justify-content-sm-center" >
      <button type="button" className="btn btn-outline-light me-2" onClick={()=>{ dispatch(deleteIthem(data.keyID)) }}>Delete Ithem  <BsTrash/> </button>
       </div> &nbsp;
      </div> )
}

function getRandomInt() {
    return Math.floor(Math.random() * 5000);
  }

const  mapStateToProps  = state => {return{ithems: state.colections.ithems}}

export default connect(mapStateToProps,null) (IthemInfo);