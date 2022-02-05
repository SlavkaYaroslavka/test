import React, { useState } from "react";
import {useForm} from 'react-hook-form';
import {connect, useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import { createColections ,uploadFile} from "../Redux/actionsColections";
import {useNavigate} from 'react-router-dom';
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["JPG", "PNG", "GIF"];
let pictures;

function CreateFormColections(props) {
  let namesCollections = useSelector(state=>state.colections.nameCollections)
  let user;
  const  dispatch = useDispatch();
  let navigate = useNavigate();

 if(props.dataUser[0] === undefined){
   navigate('/')
 }
 
  for (const iterator of props.dataUser) {
    user = iterator
  }

  const {
      register,
      formState:{ errors, isValid },
      handleSubmit,
      reset,
  } = useForm({
      mode:"onBlur"
  })

  const onSubmit = (data) =>{
      let IDcol = randomInteger();
      let a = {email : user.email , ID: IDcol}
      let c= {timeOfCreation : Date.now()}  
      let d = document.getElementById('nameTheme').value
      let b = Object.assign(data,a,c,{collectionsTheme:d})
     // let formatData = new FormData();
     // formatData.append('file', picture)
     // let filePictures = picture.append({colectionsID:IDcol })
      //dispatch(createColections(b))
     // dispatch(uploadFile(formatData))
     if(pictures === undefined){dispatch(createColections(b))
      }else{
        dispatch(uploadFile(pictures,b))
      } 
      setTimeout(()=>{navigate("/userPage")},500)
      reset()
      pictures = undefined;
  } 
  return(
    <div className="container" align="center" >
      <h2 className="funny-title section-title">CREATIG COLLECTION</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
      <div className="col-4" >
      <label >  <h5 style={ {color:"#004dc9"}}> Name Collections </h5>
      <input type="text" className="form-control"  {...register('collectionsName',{required: " Input Collection name" ,
       minLength:{value:4 , message :"The collection name cannot be less than 4 characters"},
        maxLength: {value:20, message: " Collections cannot be greater than 20 characters"} })}/> 
      </label>
            <div style={ {color:"red"} }>
              {errors?.collectionsName && <p>{errors?.collectionsName.message || "Error!"}</p>}
            </div>
      </div>
      <div className="col-4" >
      <label >  <h5 style={ {color:"#004dc9"}}> Description </h5>
      <textarea type="text" className="form-control"  {...register('Description',{required: " Input Description" ,
       minLength:{value:4 , message :"The Description name cannot be less than 4 characters"},
        maxLength: {value:150, message: " Description cannot be greater than 150 characters"} })}/> 
      </label>
            <div style={ {color:"red"} }>
              {errors?.Description && <p>{errors?.Description.message || "Error!"}</p>}
            </div>
      </div>
      <div className="col-4" >
      <label >  <h5 style={ {color:"#004dc9"}}> Collection theme </h5>
      </label>
      {NameFild(namesCollections)}
      </div>
      <div className="col-4" >
     {DragDrop(dispatch)}
      </div>
      <div>
      </div> &nbsp;
      <div>
      <input type='submit' className="btn btn-primary" disabled={!isValid} value={'Create'}></input>&nbsp;
      <button type="button" className="btn btn-danger" onClick={()=>{navigate("/userPage")}}>Cancel</button>
      </div>
      </form>
    </div>
      )}
       
      function randomInteger() {
        let rand = 100 + Math.random() * (999999999 - 1);
        return (Math.round(rand) + Date.now());
      }

      function NameFild(namesCollections){
        return(<select className="form-select form-select-lg mb-3  "   id="nameTheme" aria-label=".form-select-lg example">
          { namesCollections.map(data=>{
          return(<option value={data.value}>{data.value}</option>)
        })}
        </select>)
      }

      function DragDrop(dispatch) {
        const [flag,changeFlag ] = useState(false)
        const [file, setFile] = useState(null);
        const handleChange = (file) => {
          setFile(file);
          changeFlag(true);
         // dispatch(uploadFile(file))
         pictures = file;
        };
        return (
          <FileUploader handleChange={handleChange} name="file" types={fileTypes} disabled ={flag} maxSize = {2}/>
        );
      }

const mapStateToProps = state =>{ return { dataUser: state.tables.userData } }

//const mapDispatchToProps = dispatch => { return{ deleteUser, readData, addUser, blockUser, makeAdmin} }

export default connect(mapStateToProps, null)(CreateFormColections);