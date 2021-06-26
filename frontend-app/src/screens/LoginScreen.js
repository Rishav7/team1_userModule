import React, { useState, useEffect } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import Message from '../components/Message'
import Loader from '../components/Loader'

import { login } from '../actions/userActions'
import FormContainer from '../components/FormContainer.js'

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

 
  const [emailError, setEmailError] = useState(true)
  const [passwordError, setPasswordError] = useState(true)

  

  const onEmailChange = (event) => {
    var emailValue = (event.target.value);
    const expression = new RegExp('^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$');
    // console.log(nameValue);
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
    // console.log(nameValue);
    if (!(expression.test(contactValue))) {
      setPassword(contactValue)
      setPasswordError(false)
    }
    else {
      setPassword(contactValue)
      setPasswordError(true)
    }
  }
  //use Dispatch
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)

  //what we need from userInfo we dispatch it with

  const { loading, error, userInfo } = userLogin

  const redirect = location.search ? location.search.split('=')[1] : '/'

  const submitHandler = (e) => {
    e.preventDefault()
    // dipacth login
    console.log('dlskjfkl')
    dispatch(login(email, password))
  }

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [dispatch, userInfo, redirect, history])

  return (
    <FormContainer >
      <h1>Sign In</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader></Loader>}

      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter Email Address'
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
            placeholder='Enter Password'
            value={password}
            onChange={onPasswordChange}
          ></Form.Control>
            {!passwordError && <Form.Text className="text-danger">
            Please Enter Valid password (test@0t) </Form.Text>}
        </Form.Group>
        <br />
        {/*   */}
        <Button type='submit' variant='primary' disabled={!passwordError &&  !emailError}>
          Sign In
        </Button>
      </Form>
      <Row className='py-3'>
        <Col>
          {/* <Link to={redirect ? `/forgotPassword?redirect=${redirect}` : '/forgotPassword'}> */}
          <Link to="/forgotPassword">
          Forgot Password
          </Link>
        </Col>
      </Row>
      <Row className='py-3'>
        <Col>
          NewUser?
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default LoginScreen
