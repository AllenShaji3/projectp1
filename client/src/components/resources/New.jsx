import React, {useState} from 'react';
import {Form, Container} from 'react-bootstrap';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';

const New = function() {
    const [inputs, setInputs] = useState({
        title: '',
        content: '',
        status: '',
        date: Date

    });
    const [redirect, setRedirect] = useState(false);

    const handleSubmit = async event => {
        event.preventDefault();
        const resp = await Axios.post('./resources', inputs);
        if(resp.status === 200){
            setRedirect(true);
        }

    };

    const handleInputChange = async event => {
        event.persist();
        const { name, value } = event.target;
        setInputs(inputs => ({
            ...inputs,
            [name]: value
        }));
    };
    if (redirect) return (<Redirect to="/resources"/>);

    return (
        <Container className="my-5">
            <header>
                <h1>New Diary</h1>
                
            </header>
            <hr/>
           <div>
             <Form onSubmit={handleSubmit}>
                 <Form.Group>
                     <Form.Label>Title</Form.Label>
                     <Form.Control 
                     name="title"
                     onChange = {handleInputChange}
                     value={inputs.title}
                     />
                 </Form.Group>
                 <Form.Group>
                     <Form.Label>Content</Form.Label>
                     <Form.Control 
                     as="textarea"
                     name="content"

                     onChange = {handleInputChange}
                     value={inputs.content}
                     />
                 </Form.Group>
                 <Form.Group>
                     <Form.Label>Status</Form.Label>
                     <Form.Control 
                     as="select"
                     name="status"
                     onChange = {handleInputChange}
                     defaultValue={inputs.status || 'Happy'}
                     />
                     <option value="Happy">Happy</option>
                     <option value="Average">Average</option>
                     <option value="Sad">Sad</option>
                 </Form.Group>
                 </Form>
                  </div> 
        </Container>
    )
};
export default New;