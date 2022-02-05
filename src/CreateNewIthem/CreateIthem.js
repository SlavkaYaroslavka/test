import React , { useState } from "react";
import { connect, useDispatch , useSelector} from "react-redux";
import {addNewIthem, chandesTag,uploadFileIthems} from '../Redux/actionsColections'
import {useNavigate} from 'react-router-dom'
import cogoToast from 'cogo-toast';
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["JPG", "PNG", "GIF"];
let pictures;
function CreateIthem(props){
  let tags = useSelector(state=>state.colections.tags)
  let user = useSelector(state=>state.tables.userData)
  let navigate = useNavigate();
  const [ch1,changeCh1 ] = useState(true)
  const [ch2, changeCh2] = useState(true)
  const [ch3, changeCh3] = useState(true)
  const [ch4, changeCh4] = useState(true)
  const dispatch = useDispatch();
  if(user.length === 0){
    return(<>{navigate('/')}</>)
  }
  return(  <>   
   <h2 className="funny-title section-title"> CREATION ITHEM PAGE </h2>
  <div className="col-6  mx-auto"  > 
   <div className="input-group mb-3">
  <div className="input-group-text">
     <label> Name Ithem </label>
  </div>
  <input type="text" className="form-control" aria-label="Text input with checkbox" id="name" />
   </div>
    <div className="input-group mb-3">
  <div className="input-group-text"> 
  <label> Description  </label>  &nbsp;
    <input className="form-check-input mt-0" type="checkbox" value="" aria-label="Checkbox for following text input" onChange={()=>{
       if(ch1){ changeCh1(false) } else {changeCh1( true ) }  
    }}/>
  </div>
  <textarea type="text" className="form-control" aria-label="Text input with checkbox"  id="description" disabled={ch1}/>
</div>
<div className="input-group mb-3">
  <div className="input-group-text">
  <label> Autor </label>  &nbsp;
    <input className="form-check-input mt-0" type="checkbox" value="" aria-label="Checkbox for following text input" onChange={()=>{
      if(ch2){ changeCh2(false ) } else {changeCh2(true )}  
    }}/>
  </div>
  <input type="text" className="form-control" aria-label="Text input with checkbox" id="autor" disabled={ch2}/>
</div>
<div className="input-group mb-3">
  <div className="input-group-text">
  <label> Data </label>  &nbsp;
    <input className="form-check-input mt-0" type="checkbox" value="" aria-label="Checkbox for following text input" onChange={()=>{
      if(ch3){ changeCh3(false ) } else {changeCh3(true )}  
    }}/>
  </div>
  <input type="text" className="form-control" aria-label="Text input with checkbox" id="data" disabled={ch3}/>
</div>
<div className="input-group mb-3">
  <div className="input-group-text">
  <label> Name <br/>Kastom </label>  &nbsp;
    <input className="form-check-input mt-0" type="checkbox" value="" aria-label="Checkbox for following text input" onChange={()=>{
      if(ch4){ changeCh4(false ) } else {changeCh4(true )}  
    }}/>
  </div>
  <input type="text" className="form-control" aria-label="Text input with checkbox" id="kastomName" disabled={ch4}/>
  <span className="input-group-text">Value</span>
  <input type="text" className="form-control" aria-label="Text input with checkbox" id="kastomValue" disabled={ch4}/>
</div>
  {TagFild(tags)}
<div className="input-group mb-3">
<div className="d-grid gap-2 col-10 mx-auto">
  {DragDrop()}
</div>
</div>
<div className="d-grid gap-2 col-6 mx-auto">
<div>
<button type="button" className="btn btn-success" onClick={()=>{createIthem(ch1,ch2,ch3,ch4, props.collectionsID,dispatch,navigate,tags,user[0].userName);}}>Create ithem</button> &nbsp;
<button type="button" className="btn btn-danger" onClick={()=>{navigate('/UserPage')}}>Censel </button>
</div>
</div>
  </div>  </>  )  
}

function createIthem(fild1,fild2,fild3,fild4, collectionsKeyId,dispatch,navigate,tags,user){
  let a = document.getElementById('name').value
  let b = document.getElementById('description').value
  let c = document.getElementById('autor').value
  let d  = document.getElementById('teg').value
  let e = document.getElementById('data').value
  let f = document.getElementById('kastomName').value
  let g = document.getElementById('kastomValue').value
   let obj = {name:a}
    if(!!b.length) { if(!fild1) obj =  Object.assign(obj, {description:b}) }
    if (!!c.length) {if(!fild2) obj = Object.assign(obj, {autor:c})}
    if (!!e.length) {if(!fild3) obj = Object.assign(obj, {data:e})}
    if (!!f.length && !!g.length ) {if(!fild4) obj = Object.assign(obj, { castom : "name - " + f + ', value - ' + g})}
    obj = Object.assign(obj, {collectionsKeyId:collectionsKeyId}, {time:Date.now()}, {ID : randomInteger()}, {tegs: d},
     { userCreate: user} )
   if (pictures === undefined){ dispatch(addNewIthem(obj)) }else{ dispatch(uploadFileIthems(pictures,obj)) } 
   let fr =  AddValueTags(tags,d)
   dispatch(chandesTag(fr))
  navigate('/userPage')
  cogoToast.success("Success!")
}

function randomInteger() {
  let rand = 100 + Math.random() * (999999999 - 1);
  return (Math.round(rand) + Date.now())
}

function TagFild(tags){
  return(<select className="form-select form-select-lg mb-3  "  name="names"  id="teg" aria-label=".form-select-lg example">
    { tags.map(data=>{
    return(<option value={data.value}>{data.value}</option>)
  })}
  </select>)
}

function AddValueTags(tags,inputValue){
let rez;
   tags.map(data=>{
   if(data.value === inputValue){
     let b = data.count + 1
     let a = data
     rez =  Object.assign(a, {count: b })
   }  
 }); return rez
}

function DragDrop() {
  const [flag,changeFlag ] = useState(false)
  const [file, setFile] = useState(null);
  const handleChange = (file) => {
    setFile(file);
    changeFlag(true);
   pictures = file;
  };
  return (
    <FileUploader handleChange={handleChange} name="file" types={fileTypes} disabled ={flag} maxSize = {2}/>
  );
}

const  mapStateToProps  = state => {return{ collectionsID: state.colections.collectionsKeyId  }}

export default connect(mapStateToProps,null) (CreateIthem);