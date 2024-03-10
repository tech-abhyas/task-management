import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Login from './pages/user/Login';
import Register from './pages/user/Register';
import ResetPassword from './pages/user/ResetPassword';
import TaskList from './pages/task/TaskList';
import NotFound from './pages/NotFound';
import EmailVerify from './pages/user/EmailVerify';
import UpdatePassword from './pages/user/UpdatePassword';
import { useSelector } from 'react-redux';
import PrivateRoute from './components/PrivateRoute';


function AllRoute() {
    const navigate = useNavigate()
    const { userData } = useSelector(state => state.authReducer.login)
    const { isValid, user } = userData

    // check user is valid
    useEffect(() => {
        if (isValid === true) {
            navigate('/task-list')
        } else {
            navigate('/login')
        }
    }, [isValid, user])


    return (
        <>
            <Routes>
                <Route path="/" exact element={<Login />} />
            </Routes>
            <Routes>
                <Route path="/login" exact element={<Login />} />
            </Routes>
            <Routes>
                <Route path="/register" exact element={<Register />} />
            </Routes>
            <Routes>
                <Route path="/reset-password" element={<ResetPassword />} />
            </Routes>
            <Routes>
                <Route path="/update-password/:token" element={<UpdatePassword />} />
            </Routes>
            <Routes>
                <Route path="/email/verify/:token" element={<EmailVerify />} />
            </Routes>
            {/* Private route implementation  */}
            <Routes>
                <Route path="/task-list" element={<PrivateRoute Component={TaskList} />} />
            </Routes>
        </>
    )
}

export default AllRoute