import { useSelector } from "react-redux";

 function useAuth(){
    const {email, keyId, password} = useSelector(state => state.tables.userData);
    return {
        isAuth: !! email,
        email,
        keyId,
        password
    };
}

//const mapStateToProps = state =>{ return { dataUser: state.tables.userData } }

export default useAuth