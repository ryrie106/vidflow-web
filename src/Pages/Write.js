import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';

const axios = require('axios');

class Write extends Component {
    render() {
        return (
            <div>
                <Link to="/"> X </Link>
                <Formik
                    onSubmit={(values, actions) => {
                        axios.post('/posts/write', values).then(response => {
                            console.log(response);
                        })
                    }}
                    render={({ errors, status, touched, isSubmitting }) => (
                    <Form>
                        writer : <Field type="test" name="writer" /><br/>
                        videosrc : <Field type="text" name="videosrc" /><br/>
                        content : <Field type="text" name="content" /><br/>
                        <button type="submit" disabled={isSubmitting}>
                        Submit
                        </button>
                    </Form>
                    )}
                />
            </div>
        );
    }
}

export default Write;