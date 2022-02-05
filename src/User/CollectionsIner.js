import React from "react";
import { connect } from "react-redux";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

 function CollectionsIner(props){
     return (<div className="container"> 
     <GetData colections = {props.colections} keyID={props.keyID} /> 
     </div>)
 }
 
 function GetData(props){
        let objectColection = props.colections
        const keyCollections = props.keyID
    return (<div className="row row-cols-auto justify-content-md-center" > {CreateTable(objectColection, keyCollections )} </div>)
}

function CreateTable(objectColection, keyCollections){
return(<>
    {  objectColection.map(data=>{
        if(data.keyID === keyCollections){
          return (<> {createLi(data)}  </>)
    }
    } )
    }</> )
    }

 function createLi(data){
    const petList = Object.entries(data).map(([key,value])=>{ let markdown = value;
        if(key === "Description"){
            return (<> <div class="card text-white bg-secondary mb-4" >
                 <div clasName="card-body"> 
             <h5 className="card-title">  {key} </h5>
              <ReactMarkdown children={markdown} remarkPlugins={[remarkGfm]} />  </div> 
              </div> &nbsp; </>);
        }else if(key === "pictures"){
            return(<>  <div class="card text-white bg-secondary mb-4" >
                       <div className="card-body"> 
                       <h5 className="card-title">  {key} </h5>
                       <img src={value} alt="Pictures" width={100}></img>
                       </div>
                       </div>
            
                   </>)    
        }else{
            return (<> <div class="card text-white bg-secondary mb-4" > 
            <div className="card-body"> 
             <h5 className="card-title">  {key} </h5>
             {value.toString()} </div>
             </div> &nbsp; </> );
        }
      })
      return(<> {petList} </> )
 }
 
 function getRandomInt() {
    return Math.floor(Math.random() * 5000);
  }

 const  mapStateToProps  = state => {return{keyID: state.colections.keyID, colections: state.colections.colections}}

export default connect(mapStateToProps,null)(CollectionsIner)