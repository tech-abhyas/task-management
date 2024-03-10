import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { authService } from '../../service/authService'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

// import { emailVerify } from '../../../../backend/controllers/userController'

function EmailVerify() {
    const params = useParams()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(null)


    const emailVerifyHandler = useMemo(() => params, [params])


    const emailVerification = useCallback(
        () => {
            if (params?.token) {
                setLoading(true)
                authService.emailVerify(params?.token)
                    .then(resp => {
                        toast.success("Your email has been verified. Kindly login to your account")
                        setLoading(false)
                        navigate("/login")
                    })
                    .catch(err => {
                        toast.error("Error : " + err.response.data.message)
                        setLoading(false)
                    })
            }
        },
        [emailVerifyHandler],
    )

    useEffect(() => {
        emailVerification()
    }, [emailVerifyHandler])



    return (
        <div className="col-lg-8 my-3">
            <div className="card p-4">
                <h3>Email Verification : {loading === null && "Loading..."} {loading === true && "Done"} {loading === false && "Failed"}</h3>
                <Link to="/login">Back to login</Link>
            </div>
        </div>
    )
}

export default EmailVerify