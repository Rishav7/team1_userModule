import React, { Fragment, useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'

// import MetaData from '../layout/MetaData'

//import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { forgotPassword, clearErrors } from '../actions/userActions'

const ForgotPasswordScreen = () => {

    const [email, setEmail] = useState('')

    // const alert = useAlert();
    const dispatch = useDispatch();

    const { error, message } = useSelector(state => state.forgotPassword)

    useEffect(() => {

        if (error) {
            // alert.error(error);
            dispatch(clearErrors());
        }

        if (message) {
            // alert.success(message)
        }

    }, [dispatch, error, message])

    const submitHandler = (e) => {
        e.preventDefault();
        // const formData = new FormData();
        // console.log("Email without set",email)
        // formData.set('email', email);
        // console.log("Form Data",formData.get('email'))
        dispatch(forgotPassword(email))
    }

    return (
        <Fragment>




            <form onSubmit={submitHandler}>
                <h1 className="mb-3">Forgot Password</h1>
                <div className="form-group">
                    <label htmlFor="email_field">Enter Email</label>
                    <input
                        type="email"
                        id="email_field"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <br />
                <Button type='submit' variant='primary'>
                    Sign In
                </Button>

            </form>



        </Fragment>
    )
}

export default ForgotPasswordScreen
