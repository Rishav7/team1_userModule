import React, { useState, useEffect } from 'react'
import { Row, Col, Form, Button, Figure, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import Message from '../components/Message'
import Loader from '../components/Loader'

import { getUserDetails, updateUserProfile } from '../actions/userActions'

import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'

const ProfileScreen = ({ history }) => {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [photo, setPhoto] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [message, setMessage] = useState(null)

	const dispatch = useDispatch()

	const userDetails = useSelector((state) => state.userDetails)
	const { loading, error, user } = userDetails

	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin

	const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
	const { success } = userUpdateProfile

	const [name_edit, editName] = useState(true)
	const [email_edit, editEmail] = useState(true)
	const [password_edit, editPassword] = useState(true)

	useEffect(() => {
		if (!userInfo) {
			history.push('/login')
		} else {
			if (!user || !user.name || success) {
				dispatch({ type: USER_UPDATE_PROFILE_RESET })
				dispatch(getUserDetails('profile'))
			} else {
				setName(user.name)
				setEmail(user.email)
				setPhoto(user.photo)
			}
		}
	}, [dispatch, history, userInfo, user, success])

	const submitHandler = (e) => {
		e.preventDefault()
		if (password !== confirmPassword) {
			setMessage('Passwords do not match')
		} else {
			dispatch(
				updateUserProfile({ id: user._id, name, email, password, photo })
			)
			console.log('clicked')
		}
		editName(true)
		editEmail(true)
		editPassword(true)
	}
	const srcp = 'http://localhost:5000/dp/' + photo
	return (
		<div>
			<h2>User Profile</h2>
			{message && <Message variant='danger'>{message}</Message>}

			{success && <Message variant='success'>{success}</Message>}
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<Form onSubmit={submitHandler}>
					<Row>
						<Col md={3}>
							<Figure>
								{/*<Col xs={6} md={4}>*/}
								{/*<Image
					width={200}
					height={180}
					src="https://cdn.pixabay.com/photo/2017/09/27/20/40/event-2793372_960_720.jpg" roundedCircle />*/}
								<Image
									src='https://cdn.pixabay.com/photo/2017/09/27/20/40/event-2793372_960_720.jpg'
									rounded
									fluid
								/>
								{/*</Col>*/}
							</Figure>
							<br />
						</Col>
						<Col md={5}>
							<Form.Group controlId='name'>
								<Form.Label>Name</Form.Label>
								<Form.Control
									type='name'
									placeholder='Enter name'
									value={name}
									disabled={name_edit}
									onChange={(e) => setName(e.target.value)}
								></Form.Control>
								<Button
									type='button'
									variant='primary'
									size='sm'
									onClick={(e) => editName(false)}
								>
									Edit Name
								</Button>
							</Form.Group>
							<br />
							<Form.Group controlId='email'>
								<Form.Label>Email Address</Form.Label>
								<Form.Control
									type='email'
									placeholder='Enter email'
									value={email}
									disabled={email_edit}
									onChange={(e) => setEmail(e.target.value)}
								></Form.Control>
								<Button
									type='button'
									variant='primary'
									size='sm'
									onClick={(e) => editEmail(false)}
								>
									Edit Email
								</Button>
							</Form.Group>
							<br />
							<Form.Group controlId='password'>
								<Form.Label>Password</Form.Label>
								<Form.Control
									type='password'
									placeholder='Enter password'
									value={password}
									disabled={password_edit}
									onChange={(e) => setPassword(e.target.value)}
								></Form.Control>
							</Form.Group>
							<br />
							<Form.Group controlId='confirmPassword'>
								<Form.Label>Confirm Password</Form.Label>
								<Form.Control
									type='password'
									placeholder='Confirm password'
									value={confirmPassword}
									disabled={password_edit}
									onChange={(e) => setConfirmPassword(e.target.value)}
								></Form.Control>
								<Button
									type='button'
									variant='primary'
									size='sm'
									onClick={(e) => editPassword(false)}
								>
									Edit Password
								</Button>
								<br />
								<br />
								<Button type='submit' variant='primary'>
									Update Profile
								</Button>
							</Form.Group>
						</Col>
					</Row>
				</Form>
			)}
		</div>
	)
}

export default ProfileScreen
