import React from "react";
import CreatorTable from "./CreatorTable";
import {connect} from 'react-redux'
import {useNavigate} from 'react-router-dom'

function AdministaratorPage(props){
    let navigate = useNavigate();
    if (Object.keys(props.dataUser).length === 0 ){return ( <h1> Sorry. You will be directed to the main page.
        {setTimeout(()=>{ navigate("/") }, 1000)}  </h1>) 
        }else {
            return(<div className="container">
                <h2 className="funny-title section-title"> ADMINISTRATOR PAGE </h2>
                <CreatorTable/>
                </div>
               )
        }
}

const mapStateToProps = state =>{ return { dataUser: state.tables.userData } }

export default connect(mapStateToProps, null) (AdministaratorPage)