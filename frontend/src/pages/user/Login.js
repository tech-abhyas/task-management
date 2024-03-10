import React, { useCallback, useEffect, useMemo } from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { Link, useMatch, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { userLogin } from '../../slice/authSlice'


function Login() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    // const { authReducer } = useSelector(state => state)
    const { userData } = useSelector(state => state.authReducer.login)
    const { isValid, user } = userData

    const initialValues = {
        email: "",
        password: ""
    }

    const validationSchema = Yup.object({
        email: Yup.string().required("Required").email("Please enter the valid email"),
        password: Yup.string().min(8, "password minimun character should be greater then 8").max(20, "max password character limit is 20").required("Required")
    })


    const onSubmit = async (val) => {
        await dispatch(userLogin(val))
    }

    useEffect(() => {
        if (isValid === true) {
            navigate('/task-list')
        } else {
            navigate('/login')
        }
    }, [isValid, user])



    return (
        <div className="form-component col-6">
            <h4 className="d-flex justify-content-center m-4 ">Login </h4>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(onSubmit)}
            >
                {formik => (
                    <Form>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <Field type="email" name="email" className="form-control" />
                            <ErrorMessage name={"email"}>{msg => <p >{msg}</p>}</ErrorMessage>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <Field type="password" name="password" className="form-control" />
                            <ErrorMessage name={"password"}>{msg => <p >{msg}</p>}</ErrorMessage>
                            <Link to="/reset-password" >Forgot Password</Link>
                        </div>


                        <div className="d-flex justify-content-between col-lg-12">
                            <button type="submit" className="btn secondary-color btn-sm">Submit</button>
                            <Link to="/register">Create an account</Link>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>

    )
}

export default Login