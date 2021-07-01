import React, { Fragment, useState, useEffect } from 'react'
import { Button,Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, forgotPassword} from '../actions/userActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {Redirect} from 'react-router-dom';
import FormContainer from '../components/FormContainer.js'
const ForgotPasswordScreen = (location,history) => {

    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState(true)
    // const alert = useAlert();
    const dispatch = useDispatch();
    const [redirctTo, setRedirctTo] = useState(false);
    const { loading,error, userInfo,message } = useSelector(state => state.forgotPassword)

    useEffect(() => {
        if (error) {
            // alert.error(error);
            dispatch(clearErrors());
        }
        console.log("MESSAGE",message)
        if(message=="PASSWORD CHANGED")
        {
            window.location.reload();
        }
        if (message=="Mail sent") {
            setRedirctTo(true)
        }
      }, [history, userInfo, message])
      const onEmailChange = (event) => {
        var emailValue = (event.target.value);
        const expression = new RegExp('^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$');
       
        if (!(expression.test(emailValue))) {
          setEmail(emailValue)
          setEmailError(false)
        }
        else {
          setEmail(emailValue)
          setEmailError(true)
        }
      }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(forgotPassword(email))
    }
    if(redirctTo){
        return <Redirect to="/sent" />
      } else {
    return (
        <FormContainer>
            	<h1>Forgot Password</h1>
                {error && <Message variant='danger'>{error}</Message>}
                {loading && <Loader></Loader>}
                <Form onSubmit={submitHandler}>
                <Form.Group controlId='email'>
					<Form.Label>Enter Email</Form.Label>
					<Form.Control
						type='email'
						placeholder='Enter Email Address'
						value={email}
						onChange={onEmailChange}
					></Form.Control>
					{!emailError && (
						<Form.Text className='text-danger'>
							Please Enter Valid Email (test@gmail.com){' '}
						</Form.Text>
					)}
				</Form.Group>
                <br />
                <Button type='submit' variant='primary' >
                SEND EMAIL
				</Button>
                </Form>
            </FormContainer>
            
           
           
        
    )}
}

export default ForgotPasswordScreen
