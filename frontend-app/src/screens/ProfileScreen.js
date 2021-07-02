import React, { useState, useEffect } from 'react'
import { Row, Col, Form, Button, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
// eslint-disable-next-line
import axios from 'axios'
import Message from '../components/Message'
import Loader from '../components/Loader'

import {
	getUserDetails,
	updateUserProfile,
	uploadProfilePic,
} from '../actions/userActions'

import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'

const ProfileScreen = ({ history }) => {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [photo, setPhoto] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [message, setMessage] = useState(null)

	const [name_edit, editName] = useState(true)
	const [email_edit, editEmail] = useState(true)
	const [password_edit, editPassword] = useState(true)

	const [selectedFile, setFile] = useState(null)

	const [uploading, setUploading] = useState(false)

	const dispatch = useDispatch()

	const userDetails = useSelector((state) => state.userDetails)
	const { loading, error, user } = userDetails

	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin

	const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
	const { success } = userUpdateProfile

	const userUpdateProfilePic = useSelector(
		(state) => state.userUpdateProfilePic
	)

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
			dispatch(updateUserProfile({ id: user._id, name, email, password }))
			console.log('clicked')
		}
		editName(true)
		editEmail(true)
		editPassword(true)
	}
	const uploadFileHandler = async (event) => {
		setFile(event.target.files[0])
		//const formData = new FormData()
		//formData.append('file', selectedFile)
		//setFile(formData)
	}

	const submitHandlerPic = (e) => {
		e.preventDefault()
		console.log(selectedFile)

		dispatch(uploadProfilePic({ id: user._id, selectedFile }))
		console.log('clicked')
	}

	return (
		<div>
			<Row>
				<Col md={3}>
					<Form onSubmit={submitHandlerPic}>
						<Form.Group controlId='image'>
							<Form.Label>Image</Form.Label>
							<Image
								width={200}
								height={180}
								value={photo}
								rounded
								src='https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909__340.png'
							></Image>
							<br />
							<Form.File
								id='image-file'
								custom
								onChange={uploadFileHandler}
							></Form.File>

							{uploading && <Loader />}
							<Button type='submit' variant='primary'>
								Update Pic
							</Button>
						</Form.Group>

						<br />
					</Form>
				</Col>
				<Col md={3}>
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
							</Row>
						</Form>
					)}
				</Col>
			</Row>
		</div>
	)
}

export default ProfileScreen
