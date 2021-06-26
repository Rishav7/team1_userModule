import React, { useState, useEffect } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import Message from '../components/Message'
import Loader from '../components/Loader'

import { register } from '../actions/userActions'
import FormContainer from '../components/FormContainer.js'

const RegisterScreen = ({ location, history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)


  const [emailError, setEmailError] = useState(true)
  const [passwordError, setPasswordError] = useState(true)
  const [nameError, setNameError] = useState(true)
  const [confirmPasswordError, setConfirmPasswordError] = useState(true)



  const onNameChange = (event) => {
    var nameValue = (event.target.value)
    const expression = new RegExp('^[a-zA-Z]{1}[a-zA-Z0-9\\s]{2,30}$');
  
    if (!(expression.test(nameValue))) {
        setName(nameValue)
        setNameError(false)
    }
    else {
        setName(nameValue)
        setNameError(true)
    }
}
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

  //use Dispatch
  const dispatch = useDispatch()
  const userRegister = useSelector((state) => state.userRegister)

  //what we need from userInfo we dispatch it with

  const { loading, error, userInfo } = userRegister

  const redirect = location.search ? location.search.split('=')[1] : '/'

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(register(name, email, password))
    }
  }

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {message && <Message variant='danger'>{message}</Message>}

      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader></Loader>}

      <Form onSubmit={submitHandler}>
         <Form.Group controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter name'
            value={name}
            onChange={onNameChange}
          ></Form.Control>
            {!nameError && <Form.Text className="text-danger">
            Please Enter Valid Name (min char:3) </Form.Text>}
        </Form.Group>


        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={onEmailChange}
          ></Form.Control>
            {!emailError && <Form.Text className="text-danger">
            Please Enter Valid Email (test@gmail.com)  </Form.Text>}
        </Form.Group>

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
          Register
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
        Have an Account?{' '}
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default RegisterScreen
