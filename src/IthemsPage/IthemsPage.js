import React, {useState} from "react";
import { useDispatch, useSelector } from 'react-redux'
import { BsHandThumbsUp, BsHandThumbsDown} from "react-icons/bs";
import {useNavigate} from 'react-router-dom'
import {liked,dislike} from '../Redux/actionsColections'
import Coment from "./Coment";
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

function IthemPage(){ 
    const [flag,changeFlag ] = useState(false)
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const ithemsKey = useSelector((state)=>state.colections.keyIdIthems);
    const ithems = useSelector(state => state.colections.ithems);
    const user = useSelector(state => state.tables.userData);
    const like = useSelector(state => state.colections.like);
    if (!(ithemsKey.length ===0)){
        let ithemsFiltred = ithems.filter(ithem => ithem.keyID === ithemsKey)
        let likeFiltred = like.filter(like => like.ithemKeyID === ithemsKey)
        return(<div className="container">
        <h2 className="funny-title section-title"> Ithem PAGE </h2>
        <div className="row justify-content-md-center">
        <div className="col justify-content-md-center">   
        <div className="header-h1"><h3>ithem informations.</h3> </div> &nbsp;
            {ShowIthem(ithemsFiltred, user,dispatch,likeFiltred,flag,changeFlag)}
        </div>   
         </div> &nbsp;
         <div className="row justify-content-md-center">
         <div className="header-h1"><h3>ithem coment.</h3> </div>
        <div className="col"> 
              <Coment/>
            </div>
        </div>
    </div>)
    }else{return(<>{ navigate("/")}</>) }
}

function ShowIthem(ithem, user,dispatch,likeFiltred,flag,changeFlag){
    return ithem.map(data =>{
        return(
        <div className="container">
        <div className="row justify-content-md-center">
        <div className="col-6">
        <div class="two" onClick={()=>{ if (flag){ changeFlag(false)  }else{ changeFlag(true) }    }}><h1>{data.name} <br/> {data.tegs}  </h1>  <br/>  
        <span className="badge bg-primary rounded-pill"> LIKE {likeFiltred.length}</span>
           </div>  &nbsp; 
          {ButtonLike(data,user,dispatch,likeFiltred)}
        </div> <div className="container"  >   {MoreInfo(data,flag)}  </div>
         </div>
        </div>
        )
    })
}

function ButtonLike(ithem, user,dispatch,like){
    if(!(user.length === 0)){
        let a = like.filter(like => like.userKeyID === user[0].keyID ) 
        if(!(a.length === 0)){
            return( <>
                    <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                   <button type="button" className="btn btn-danger"  onClick={()=>{dispatch(dislike(like[0].keyID))}}>  <BsHandThumbsDown/></button>
                   </div>
                   &nbsp; </> )
        }else{
            return(<>
                   <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                   <button type="button" className="btn btn-success"  onClick={()=>{dispatch(liked(addLike(ithem, user)))  }}> <BsHandThumbsUp/></button>
                   </div>
                   &nbsp; </> )   
        }            
    }else{return(<> {} </>)}
}

function addLike(ithem, user){
   let rez = Object.assign({ithemKeyID:ithem.keyID}, {userKeyID: user[0].keyID})
   return rez;
}

function MoreInfo(data,flag){
    if(flag){let rez,rez2,rez3,rez4,rez5,rez6;
        if(data.description !== undefined){
            let markdown = data.description;
           rez = (  <>
                    <div className="card text-white bg-dark mb-3"> 
                    <div className="card-header">Description </div> 
                    <div className="card-body"> 
                    <h5 className="card-title"><ReactMarkdown children={markdown} remarkPlugins={[remarkGfm]} /></h5>
                    </div> </div> 
                   &nbsp; </>) }
        if(data.autor !== undefined){
            rez2 = (  <>
                     <div className="card text-white bg-dark mb-3"> 
                     <div className="card-header"> Autor </div> 
                     <div className="card-body"> <h5 class="card-title">{data.autor}</h5>
                    </div>  </div> 
                    &nbsp;</>) }
        if(data.data !== undefined){
            rez3 =  (<>
                    <div className="card text-white bg-dark mb-3"> 
                    <div className="card-header"> Data </div> 
                    <div className="card-body"> <h5 class="card-title">{data.data}</h5>
                      </div> </div> 
                      &nbsp; </>) }
        if(data.castom !== undefined){ 
            rez4 =  ( <>
                    <div className="card text-white bg-dark mb-3"> 
                    <div className="card-header"> Castom </div> 
                    <div className="card-body"> <h5 class="card-title">{data.castom}</h5>
                    </div> </div> 
                    &nbsp;</>) }
        if(data.userCreate !== undefined){
             rez5 =  ( <>
                    <div className="card text-white bg-dark mb-3"> 
                     <div className="card-header"> User Creator </div> 
                     <div className="card-body"> <h5 class="card-title">{data.userCreate }</h5>
                      </div> </div> 
                      &nbsp; </> ) }
        if(data.pictures !== undefined){
            rez6 =(<>
                <div className="card text-white bg-dark mb-3"> 
                     <div className="card-header"> User Creator </div> 
                     <div className="card-body"> <h5 class="card-title">
                     <img src={data.pictures} alt="Pictures" width={100}></img>
                     </h5>
                      </div> </div> 
                      &nbsp;  </>)  
        }
         return (<div className="row row-cols-auto justify-content-md-center">{rez}{rez2}{rez3}{rez4}{rez5}{rez6}</div>)} 
}

export default IthemPage;