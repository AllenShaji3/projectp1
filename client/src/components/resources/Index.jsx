import React, {useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Axios from 'axios';

const Index = function () {
const [resources, setResources] = useState([]);
useEffect(() => {
    (async () => {
        await getResources();
    })();
},[]);
const getResources = async () => {
    const resourcesResp = await Axios.get('./resources');
    if(resourcesResp.status === 200) setResources(resourcesResp.data);
};


return (
    <Container className="my-5">
       <header>
           <h1>Diary</h1>

       </header>
       <hr/>
       <div className="content">{resources && resources.map((resource, i) => (
           <div key={i} className="card my-3">
               <div className="card-header clearfix">
               <div className="float-left">
                   <h5 className="card-title">
                       {resource.title}
                   </h5>
                   {resource.user ? (
                       <small>~{resource.user.fullname}</small>
                   ) : null}
               </div>
           </div>
           </div>
       ))}
       </div>
    </Container>
);
};

export default Index;