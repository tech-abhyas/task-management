import React from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { authService } from '../../service/authService'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'



function ResetPassword() {
    const navigate = useNavigate()

    const initialValues = {
        email: ""
    }

    const validationSchema = Yup.object({
        email: Yup.string().required("Required").email("Please enter the valid email")
    })


    const onSubmit = (val) => {


        // call reset password request api and handle response / error
        authService.resetPassword(val).then(resp => {
            toast.success(resp.data.message)
            navigate(`/update-password/${resp.data.data}`)
        }).catch(err => {
            toast.error("Error : " + err.response.data.message)
        })

    }
    // (If we found an eligible account associated with that username, we've sent password reset instructions to the primary email address on the account.)
    return (
        <div className="form-component col-6">
            <h4 className="d-flex justify-content-center m-4 ">Reset Password </h4>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(onSubmit)}
                enableReinitialize={true}
            >
                {formik => (
                    <Form>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <Field type="email" name="email" className="form-control" />
                            <ErrorMessage name={"email"}>{msg => <p>{msg}</p>}</ErrorMessage>
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

export default ResetPassword