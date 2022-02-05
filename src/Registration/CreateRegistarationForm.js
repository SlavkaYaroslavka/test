import React from "react";
import {useForm} from 'react-hook-form'
import {addUser} from '../Redux/actionsUser'
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom';
import cogoToast from 'cogo-toast';

function CreateRegistartionForm() {
  let navigate = useNavigate();
    const  dispatch = useDispatch();
    const {
        register,
        formState:{ errors, isValid },
        handleSubmit,
        reset,
    } = useForm({
        mode:"onBlur"
    })

    const onSubmit = (data) =>{
        let b = {admin : false, block : false, ID: randomInteger(), theme:"light" } 
        let a = Object.assign(data,b, {time:new Date().toLocaleString()})
        dispatch(addUser(a))
        reset();
        cogoToast.success("Success!")
        //setTimeout( ()=>  {navigate('/login') } ,600)
        navigate('/login');
    }

    return (
        <div className="container" align="center" > 
        <h2 className="funny-title section-title"> REGISTRATION PAGE </h2>
        <form onSubmit={handleSubmit(onSubmit)}> 
        <div className="col-9" >
        <label >  <h4 style={ {color:"#004dc9"}}> User name </h4>
        <input type="text" className="form-control"  {...register('userName',{required: " Input your name" ,
         minLength:{value:4 , message :"The name cannot be less than 4 characters"},
          maxLength: {value:10, message: "Name cannot be greater than 10 characters"} })}/> 
        </label>
              <div style={ {color:"red"} }>
                {errors?.userName && <p>{errors?.userName?.message || "Error!"}</p>}
              </div>
        </div>
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
        </div> &nbsp;
        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
        <input type='submit' className="btn btn-primary" disabled={!isValid} value={'Registration'}></input>&nbsp;
        <button type="button" className="btn btn-danger" onClick={()=>{navigate("/")}}>Cancel</button>
        </div>
        </form>
        </div>
    )
}

function randomInteger() {
  let rand = 100 + Math.random() * (999999999 - 1);
  return (Math.round(rand) + Date.now())
}

export default CreateRegistartionForm