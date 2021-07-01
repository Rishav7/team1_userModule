import React, { Component } from 'react';
import Message from '../components/Message'
import { Link } from 'react-router-dom';
const PasswordSuccessScreen =()=>{
   
        return (
            <div>
               <Message variant='success'>PASSWORD CHANGED SUCCESSFULLY</Message>
               <center>
                   <h1>Click here to <Link to="/login">LOGIN</Link></h1>
               </center>
            </div>
        );
    
}

export default PasswordSuccessScreen
