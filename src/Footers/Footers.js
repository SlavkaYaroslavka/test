import React from "react";

function Footers(){
    return (
    <footer className="p-3 bg-dark text-white">
    <div className="container">  
    <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
    <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
    <p className="text-center text-muted">© 2022 Company, Inc</p>
     </ul>
    <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">  
    <audio controls>
      <source src="https://audioplayer.madza.dev/Madza-Persistence.mp3" type="audio/mpeg"/>
    </audio>
    </form>
    </div>
    </div>
  </footer>
  )
}
export default Footers;