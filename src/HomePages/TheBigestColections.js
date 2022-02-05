import React, { useState } from 'react'
import {setKeyIthems} from '../Redux/actionsColections'
import {useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

function TheBigestColections(){
    const [choise,changeChoise ] = useState(false)
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const colections = useSelector(state => state.colections.colections)
    const ithems = useSelector(state =>state.colections.ithems )
    if(!(colections.length === 0) && !(ithems.length === 0 ) ){
        let sortedCollectionsData =  sortedCollections(colections, ithems)
        return (
        <div className="list-group" >
        {ShowColections(sortedCollectionsData,changeChoise,choise)}
        &nbsp;
        {ShowIthems(ithems,choise,dispatch, navigate ) }
        </div>)
    }else {return(<div> <h2> Sorry, but no collections have been created yet. </h2> </div>)}
}

function countIthems(data,keyId){
   return  data.filter(item => item.collectionsKeyId === keyId).length
}

function createSortedData(data,ithems){
    const rez = [];
    const mas = [];
    const rezSecond = [];
    let idM = []
  data.map(colections => {
     let a =  countIthems( ithems ,colections.keyID) 
     mas.push(a)
     rez.push({keyID: colections.keyID , values: a })
  }) 
  mas.sort((a, b) => b - a);
  mas.map(value=>{ 
    for (const i of rez) {
        if((i.values === value) && !(idM.includes(i.keyID)) ){
            idM.push(i.keyID)
            rezSecond.push(i)
          return;
        }
    } ;
}) ; 
 return rezSecond;
}

function sortedCollections(data,ithems){
    let sortedData = createSortedData(data,ithems);
    let rez=[];
    sortedData.map(dataSort=>{
        data.map(colections=>{
            if(colections.keyID === dataSort.keyID && !(dataSort.values===0)){
               let b = Object.assign(colections , {numberOfIthem: dataSort.values})
               // rez.push(colections)
               rez.push(b)
            }
        })
    })
  return rez
}

function ShowColections(data,changeChoise,choise){
    return(<div className="list-group"> 
        { data.map(collections=>{
           return CreateLi(collections,changeChoise,choise)   })  
        }
    </div>)
}

function CreateLi(data,changeChoise,choise){
    return (<div>
    <a  className="list-group-item list-group-item-action list-group-item-dark"   key={data.ID}  
    onClick={()=>{ if(!choise){changeChoise(data.keyID)}else {changeChoise(false)}    }}>
        Name Collections : {data.collectionsName}, <br/> Collections theme :{data.collectionsTheme}  
        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
        {data.numberOfIthem}
     </span> 
    </a> &nbsp; </div>
    )
}

function ShowIthems(ithems,choise,dispatch, navigate ){
    if(choise){let a = ithems.filter(data=> data.collectionsKeyId === choise)
      if(!(a.length === 0)){
        return(<div className="list-group">
          {a.map( (str) => { return( 
              <div> 
              <a className="list-group-item list-group-item-action list-group-item-warning" key={str.ID}
           onClick={()=>{ dispatch(setKeyIthems(str.keyID)) ;  navigate('/ithemsPage') }}> Ithems name  - 
            {str.name}   
           </a> &nbsp;      
           </div>
           )    })}
        </div>)
      }else{return( <li className ="list-group-item list-group-item-warning" key={1}> Sorry, but no item with this tag has been created yet. </li>)} 
     }
 }

export default TheBigestColections