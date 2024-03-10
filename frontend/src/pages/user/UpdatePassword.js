import React from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { authService } from '../../service/authService'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'



function UpdatePassword() {

    const params = useParams()
    const navigate = useNavigate()




    const initialValues = {
        password: "",
        confirmPassword: ""
    }

    const validationSchema = Yup.object({
        password: Yup.string().min(8, "Password length between 8 to 20 character").max(20, "Password length between 8 to 20 character").required("Required"),
        confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match')
    })


    const onSubmit = (val) => {

        const data = { token: params.token, ...val }

        // call reset password request api and handle response / error
        authService.updatePassword(data).then(resp => {
            // console.log(resp)
            toast.success(resp.data.message)
            navigate("/login")
        }).catch(err => {
            toast.error("Error : " + err.response.data.message)
        })

    }

    return (
        <div className="form-component col-lg-6 col-md-12 col-sm-12 ">
            <h4 className="d-flex justify-content-center m-4 ">Update Password </h4>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(onSubmit)}
            >
                {formik => (
                    <Form>
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <Field type="password" name="password" className="form-control" />
                            <ErrorMessage name={"password"}>{msg => <p >{msg}</p>}</ErrorMessage>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Confirm Password</label>
                            <Field type="password" name="confirmPassword" className="form-control" />
                            <ErrorMessage name={"confirmPassword"}>{msg => <p >{msg}</p>}</ErrorMessage>
                        </div>
                        <button type="submit" className="btn secondary-color btn-sm">Submit</button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default UpdatePassword