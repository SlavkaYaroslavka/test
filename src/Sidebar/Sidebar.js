import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';
import { BsFillPersonCheckFill, BsFillPersonPlusFill, BsFillPersonXFill, BsTropicalStorm} from "react-icons/bs";
import {logOut, backAccount} from '../Redux/actionsUser'
import cogoToast from 'cogo-toast';

function Sidebar(){
  let user = useSelector(state=>state.tables.userData);
  let backData = useSelector(state=>state.tables.backAccount );

  let navigate = useNavigate();
  const  dispatch = useDispatch();
    return(
      <div id="outer-container">
            <Menu>
            <div>
              {ShowButton(user,navigate,dispatch,backData)}
            </div>
          </Menu>
    </div>

    )
}

function ShowButton(dataUser,navigate,dispatch, backData){
  if ( dataUser.length === 0 ){
  return(<div className='container'>
   &nbsp;
  <div className="row">
  <div className="col">
  <button type="button" className="btn btn-outline-light me-2" onClick={()=>{navigate('/login')}}>Login <BsFillPersonCheckFill/> </button>
  </div>
  </div>
   &nbsp;
  <div className="row">
  <div className="col">
  <button type="button" className="btn btn-outline-light me-2" onClick={()=>{navigate('registration')}} >Sign-up <BsFillPersonPlusFill/> </button>
  </div>
  </div>
    
           
  </div>)
}else {
  return(<div className='container'>  
           &nbsp;
          <div className="row">
          <div className="col">
             Name - { Object.entries(dataUser)[0][1].userName } <br/>
             Email - {dataUser[0].email} <br/>
             Password - {dataUser[0].password} <br/>
             ID - {dataUser[0].ID} <br/>
             Theme - {dataUser[0].theme} <br/>
         </div>
         </div>
         &nbsp;
          <div className="row">
          <div className="col">
             <button type="button" className="btn btn-outline-light me-2" onClick={()=>{dispatch(logOut())}}>Logout <BsFillPersonXFill/> </button> 
        </div>
        </div>
          &nbsp; 
          <div className="row">
          <div className="col">
        {ShowButtonBackAccount(dispatch, backData ) } 
         </div>
         </div>
  </div>)
}
} 

function ShowButtonBackAccount(dispatch, backData){
  if ( !(Object.keys(backData).length === 0) ){
    return(<button type="button" className="btn btn-outline-light me-2" 
    onClick={()=>{ dispatch(backAccount()); cogoToast.success("You have returned to your account!") }}>  Back to your account <BsTropicalStorm/> </button>)
    }
}

export default Sidebar