import React from "react";
import {connect,useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {setKeyIthems} from '../Redux/actionsColections'

function RecentlyIthems(props){
    const  dispatch = useDispatch();
    let navigate = useNavigate();
    if(! (props.ithemsData.length === 0) ){
        let sortedIthems = sortIthems(props.ithemsData);
        return(<div >
        {ShowIthems(sortedIthems,dispatch,navigate)} 
        </div>)
    }else {return(<div> <h2> Sorry, but no ithems have been created yet. </h2> </div>)}
}

function sortIthems(data){
    const rez = [];
    let mas = [] ;
    for (const iterator of data) {
        mas.push(iterator.time)
    }
    mas.sort((a, b) => b - a);
    let a;
    mas.map(time=>{ 
        for (const i of data) {
            if(i.time === time){
              rez.push(i)
              return;
            }
        } ;
    })
    return (rez)
}

function ShowIthems(data,dispatch,navigate){
    return(<div className="list-group">
        { data.map(ithem=>{
           return CreateLi(ithem,dispatch,navigate)   })  
        }
    </div>)
}

function CreateLi(data,dispatch,navigate){
return ( <div>
<a  className="list-group-item list-group-item-action list-group-item-primary" key={data.ID}
 onClick={()=>{ dispatch(setKeyIthems(data.keyID)) ;  navigate('/ithemsPage') }}>
    Name Ithem : {data.name} <br/> tag: {data.tegs}
</a> &nbsp;
</div>
)
}

const mapStateToProps = state =>{ return { ithemsData: state.colections.ithems } }

export default connect(mapStateToProps, null) (RecentlyIthems);