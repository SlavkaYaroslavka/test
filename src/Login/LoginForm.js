import React from "react";
import {useForm} from 'react-hook-form'
import {checkingUser} from '../Redux/actionsUser'
import { useDispatch } from "react-redux";
import {useNavigate} from 'react-router-dom';
import cogoToast from 'cogo-toast'; 

function LoginForm() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
    const {
        register,
        formState:{errors, isValid},
        handleSubmit,
        reset
    } = useForm({mode:"onBlur"});

    const onSubmit = (data) => {
        dispatch(checkingUser(data));
        reset();
        cogoToast.loading('Loading your data...') 
       // setTimeout( ()=>  {navigate('/userPage') } ,600)
       navigate('/')
    }

  return(
  <div className="container" align="center"> 
    <h2 className="funny-title section-title"> LOGIN PAGE </h2>
    <form onSubmit={handleSubmit(onSubmit)}>
    <div className="col-9" >
        <label> <h4 style={ {color:"#004dc9"}}> Email </h4>
        <input type="text" className="form-control"  {...register('email',{required: " Input your email" ,
         minLength:{value:6 , message :"The email cannot be less than 6 characters"},
          maxLength: {value:20, message: "Email cannot be greater than 20 characters"},
          pattern: /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/ 
           })}/> 
        </label>
              <div style={ {color:"red"} }>
                {errors?.email && <p>{errors?.email?.message || "Email should be in the form «nick@mail.com»"}</p>}
              </div>
        </div>
        <div className="col-9" >
        <label> <h4 style={ {color:"#004dc9"}}> Password </h4>
        <input type="password" className="form-control"  {...register('password',{required: " Input your password" ,
         minLength:{value:5 , message :"The password cannot be less than 5 characters"},
          maxLength: {value:15, message: "Password cannot be greater than 15 characters"} })}/> 
        </label>
              <div style={ {color:"red"} }>
                {errors?.password && <p>{errors?.password?.message || "Error!"}</p>}
              </div>
        </div>  &nbsp;
        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
        <input type='submit' className="btn btn-primary" disabled={!isValid} value={'Login'}></input>
    <button type="button" className="btn btn-danger" onClick={()=>{navigate("/")}}>Cancel</button>
        </div>
    </form>
  </div>)  
}

export default LoginForm