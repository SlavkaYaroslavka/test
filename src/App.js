import React ,{useEffect,useState} from "react";
import {useDispatch, useSelector} from 'react-redux'
import {Routes , Route} from 'react-router-dom'
import Headers from "./Heders/Heders";
import Footers from "./Footers/Footers";
import CreateRegistartionForm from "./Registration/CreateRegistarationForm";
import LoginForm from "./Login/LoginForm";
import AdministaratorPage from "./Admin/AdministartorPage";
import UserPage from "./User/UserPage";
import CreateFormColections from "./User/CreateNewColections";
import HomePage from "./HomePages/HomePage";
import CreateIthem from "./CreateNewIthem/CreateIthem";
import {readData,} from './Redux/actionsUser'
import {readCollections,readAllIthems,readTags,readNameColections,readLike,readComment,setKeyIthems, closeSearch} from './Redux/actionsColections'
import IthemPage from "./IthemsPage/IthemsPage";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme, GlobalStyles } from "./theme";
import Sidebar from "./Sidebar/Sidebar";
import {useNavigate} from 'react-router-dom'

function App() {
  let navigate = useNavigate();
  const rezSearch = useSelector((state)=>state.colections.search);
  const  dispatch = useDispatch();
  useEffect( () => { dispatch(readData());dispatch(readCollections()); dispatch(readAllIthems()); dispatch(readTags());
     dispatch(readNameColections()); dispatch(readLike()); dispatch(readComment()) },[]);
  const [theme, setTheme] = useState("light");
  const switchTheme = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };
  const userThem = useSelector(state=> state.tables.userData)
     let themUS = choiseThem(userThem) 
  return (
    <ThemeProvider theme={theme === themUS ? lightTheme : darkTheme}>
    <GlobalStyles />
    <div>
    <Headers func = {switchTheme} />
    <Sidebar/> 
    <div className="content">
    <div className="container">
    <div className="col justify-content-md-center" >  
    {ShowSearch(rezSearch,dispatch,navigate)}
    </div>
    </div>   
       <Routes>
      <Route path="/" element= {<HomePage/>} />
      <Route path="registration" element= {<CreateRegistartionForm/>} />
      <Route path="login" element= {<LoginForm/>} />
      <Route path="userPage" element= {<UserPage/>} />
      <Route path="administratorPage" element= {<AdministaratorPage/>} />
      <Route path="createColections" element= {<CreateFormColections/>} />
      <Route path="createIthem" element= {<CreateIthem/>}  />
      <Route path="ithemsPage" element= {<IthemPage/>}  />  
      <Route path="WebProjectCollections" element= {navigate('/')}  /> 
    </Routes>
    </div>
    <Footers/>
    </div>
    </ThemeProvider>
  );
}

function choiseThem(dataUser){
if (dataUser.length === 0 ){ return('light') ;
}else{
    return(dataUser[0].theme)
}
}

function ShowSearch(ithem,dispatch,navigate){
  if(! (ithem.length === 0)){
    return(<div className="list-group">
      {ithem.map( ithemIner =>{
        return(<a  className="list-group-item list-group-item-action list-group-item-dark" 
        onClick={()=>{dispatch(setKeyIthems(ithemIner.keyID)) ;  navigate('/ithemsPage');  dispatch(closeSearch)  ; 
        document.getElementById('a').value =""  }}> Name - {ithemIner.name}  &nbsp; &nbsp; 
        Tag -  {ithemIner.tegs}  &nbsp; &nbsp; Creator -  {ithemIner.userCreate}  </a>)
      })}
    </div>)
  }
}

export default App;
