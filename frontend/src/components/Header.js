import React, { useCallback, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { clearAuthError, userLogout } from '../slice/authSlice'
import { toast } from 'react-toastify'


function Header() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { login, isError, errMessage } = useSelector(state => state.authReducer)
    const { userData } = login
    const { isValid, user } = userData


    // display and clear error message 
    useEffect(() => {
        if (isError) {
            toast.error(errMessage)
            dispatch(clearAuthError())
        }
    }, [isError])


    // logout handler
    const logoutHandler = () => {
        dispatch(userLogout())
        navigate("/login")
    }

    return (
        <header className="mb-4">
            <div className='d-flex justify-content-between'>
                <Link to="/"><h3 className="float-md-start mb-0">Task Management</h3></Link>
                <nav className="nav nav-masthead justify-content-center float-md-end">
                    {!isValid &&
                        <Link to="/login" className="nav-link fs-6 py-1 px-0 active" aria-current="page" >Login<i className="bi bi-door-open"></i></Link>}
                    {isValid &&
                        <button className="nav-link fs-6 py-1 px-0 active" onClick={logoutHandler} >{user?.name} <i className="bi bi-door-closed"></i></button>}
                </nav>
            </div>
        </header>

    )
}

export default Header