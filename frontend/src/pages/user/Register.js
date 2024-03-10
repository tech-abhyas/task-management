import React from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"

import { toast } from 'react-toastify'
import { authService } from '../../service/authService'
import { Link, useNavigate } from 'react-router-dom'

function Register() {
    const navigate = useNavigate()

    const initialValues = {
        name: "",
        email: "",
        password: ""
    }

    const validationSchema = Yup.object({
        name: Yup.string().required("Required"),
        email: Yup.string().required("Required").email("Please enter the valid email"),
        password: Yup.string().min(8, "password minimun character should be greater then 8").max(20, "max password character limit is 20").required("Required")
    })


    const onSubmit = (val) => {
        // call register api and handle response / error
        authService.register(val).then(resp => {
            toast.success("Kindly verify the email to login")
            navigate("/login")
        }).catch(err => {
            toast.error("Error : " + err.response.data.message)
        })
    }

    return (
        <div className="form-component col-lg-6 col-md-12 col-sm-12 ">
            <h4 className="d-flex justify-content-center m-4 ">Register </h4>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(onSubmit)}
            >
                {formik => (
                    <Form>
                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            <Field type="text" name="name" className="form-control" />
                            <ErrorMessage name={"name"}>{msg => <p >{msg}</p>}</ErrorMessage>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <Field type="email" name="email" className="form-control" />
                            <ErrorMessage name={"email"}>{msg => <p >{msg}</p>}</ErrorMessage>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <Field type="password" name="password" className="form-control" />
                            <ErrorMessage name={"password"}>{msg => <p >{msg}</p>}</ErrorMessage>
                        </div>
                        <div className="d-flex justify-content-between col-lg-12">
                            <button type="submit" className="btn secondary-color btn-sm">Submit</button>
                            <Link to="/login">Back to login</Link>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default Register