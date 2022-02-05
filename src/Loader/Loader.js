import React from "react";

export default function Loader (props){
    if (props.show){
        return(<div style={{display: 'flex', justifyContent: 'center', margin: '5rem'}}>
        <div className="lds-ring"><div></div><div></div><div></div><div>  </div> </div> </div>) }
    }
    