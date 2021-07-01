import React, { Fragment, useState, useEffect } from 'react'
import { Form,Button } from 'react-bootstrap'
import Message from '../components/Message'
import { useDispatch, useSelector } from 'react-redux'
import { resetPassword,clearErrors} from '../actions/userActions'
import {Redirect} from 'react-router-dom';
import FormContainer from '../components/FormContainer.js'
const NewPasswordScreen = ({ history, match }) => {

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [passwordError, setPasswordError] = useState(true)
    const [confirmPasswordError, setConfirmPasswordError] = useState(true)
    const [redirctTo, setRedirctTo] = useState(false);
    const dispatch = useDispatch();

    const { error, success, userInfo,message} = useSelector(state => state.forgotPassword)
    const onPasswordChange = (event) => {
        var contactValue = (event.target.value);
        const expression = new RegExp('^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$');   
        if (!(expression.test(contactValue))) {
          setPassword(contactValue)
          setPasswordError(false)
        }
        else {
          setPassword(contactValue)
          setPasswordError(true)
        }
      }
      const onConfirmPasswordChange = (event) => {
        var contactValue = (event.target.value);
        const expression = new RegExp('^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$');
        
        if (!(expression.test(contactValue))) {
          setConfirmPassword(contactValue)
          setConfirmPasswordError(false)
        }
        else {
          setConfirmPassword(contactValue)
          setConfirmPasswordError(true)
        }
      }

      useEffect(() => {  
        if (error) {
            // alert.error(error);
            dispatch(clearErrors());
        }
        console.log("MESSAGE SUCCESS",message)
        if (message=="PASSWORD CHANGED") {
            setRedirctTo(true)
        }
      }, [history,userInfo,message])

    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            throw new Error('Passwords do not match')
          } else {
            dispatch(resetPassword(match.params.token,password,confirmPassword))
          }
    }
    if(redirctTo){
        return <Redirect to="/PasswordSuccess" />
      } else {
    return (
        <FormContainer>
              <h1 >New Password</h1>
             {error && <Message variant='danger'>{error}</Message>}
             <Form>
             <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
                type='password'
                placeholder='Enter password'
                value={password}
                onChange={onPasswordChange}
            ></Form.Control>
            {!passwordError && <Form.Text className="text-danger">
                Please Enter password (test@0t) </Form.Text>}
            </Form.Group>
            <Form.Group controlId='confirmPassword'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
                type='password'
                placeholder='Confirm password'
                value={confirmPassword}
                onChange={onConfirmPasswordChange}
            ></Form.Control>
            {!confirmPasswordError && <Form.Text className="text-danger">
                Please match the confirm password (test@0t) </Form.Text>}
            </Form.Group>
            <br />
            <Button type='submit' variant='primary'>
            Set Password
            </Button>
        </Form>
        </FormContainer>
    )}
}
export default NewPasswordScreen