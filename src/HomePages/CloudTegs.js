import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { TagCloud } from 'react-tagcloud';
import {useNavigate} from 'react-router-dom'
import {setKeyIthems} from '../Redux/actionsColections'

function CloudTags(){
    let navigate = useNavigate();
    const tags = useSelector((state)=>state.colections.tags)
    const ithems = useSelector((state)=>state.colections.ithems)
    const [choise,changeChoise ] = useState(false)
    const dispatch = useDispatch();
    if(!(tags.length === 0 )){
      return(<div className='container'>
      <div className="row">
      <TagCloud
        minSize={15}
        maxSize={35}
        tags={tags}
        onClick={tag =>{if(!choise){changeChoise(tag.value)} else{changeChoise(false)}   }}
      />
      </div> &nbsp;
      <div className='row'>
      {ShowIthems(ithems,choise,dispatch,navigate )}
      </div>
      </div>
        )
    }else{ return(<h2> Sorry, but no tags have been created yet. </h2>) }
}

function ShowIthems(ithems,choise,dispatch, navigate ){
   if(choise){let a = ithems.filter(data=> data.tegs === choise)
     if(!(a.length === 0)){
       return(<div className="list-group">
         {a.map( (str) => { return(
             <div> 
            <a className="list-group-item list-group-item-action list-group-item-danger" key={str.ID}
          onClick={()=>{ dispatch(setKeyIthems(str.keyID)) ;  navigate('/ithemsPage') }}> Ithems name  -  {str.name} 
          </a> &nbsp;
          </div>
          )    })}
       </div>)
     }else{return( <li className ="list-group-item list-group-item-warning" key={1}> Sorry, but no item with this tag has been created yet. </li>)} 
    }
}

export default CloudTags;