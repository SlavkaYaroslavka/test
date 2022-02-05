import React from 'react';
import CloudTags from './CloudTegs';
import RecentlyIthems from './RecentlyAddedIthems';
import TheBigestColections from './TheBigestColections';

function HomePage(){
    return(<div className="container">  
<h2 className="funny-title section-title"> HOME PAGE </h2>
    <div className="container">
  <div className="row">
    <div className="col">
    <div className="header-h1"><h3>Recently added items.</h3> </div>
     <RecentlyIthems/>
    </div>
    <div className="col">
    <div className="header-h1"><h3>Tag Cloud.</h3> </div>
    <CloudTags/>
    </div>
    <div className="col">
    <div className="header-h1"><h3>Collection with the most items.</h3> </div>
    <TheBigestColections/> 
    </div>
  </div>
</div>
    </div>)
}

export default HomePage;