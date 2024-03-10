import React, { useEffect, useState } from 'react'
import CreateTask from '../../components/tasks/CreateTask'
import { useDispatch, useSelector } from 'react-redux'
import { clearError, deleteTask, getTasks } from '../../slice/taskSlice'
import moment from 'moment'
import { toast } from 'react-toastify'


function TaskList() {
    const dispatch = useDispatch()
    const { tasks, isError, errMessage } = useSelector(state => state.taskReducer)
    const [openModal, setOpenModal] = useState(false)
    const [editData, setEditData] = useState({})


    useEffect(() => {
        dispatch(getTasks())
    }, [])


    useEffect(() => {
        if (isError) {
            toast.error(errMessage)
            dispatch(clearError())
        }
    }, [isError])


    // set state of the form data
    const taskHandler = (data) => {
        if (data) {
            setEditData(data)
        }
        else {
            setEditData()
        }
        setOpenModal(true)
    }

    // delete task handler
    const deleteHandler = async (id) => {
        try {
            await dispatch(deleteTask(id))
            await dispatch(getTasks())
        } catch (error) {
            console.log("error", error)
        }
    }

    // date format
    const dateFormat = (date) => {
        return moment(date).format('YYYY-MM-DD');
    }


    function checkIsBefore(date) {
        let todayDate = moment().format("YYYY-MM-DD")
        // from date / today date
        return moment(date).isBefore(todayDate);
    }



    return (
        <div className="col-lg-12">
            <div className="d-flex justify-content-end my-3">
                <button className="btn secondary-color" aria-label="Add new task" onClick={() => taskHandler()}><i className="bi bi-plus" /></button>
            </div>
            <table className="table table-hover primary-color">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Category</th>
                        <th scope="col">Priority</th>
                        <th scope="col">Start / End Date</th>
                        <th scope="col"><></></th>

                    </tr>
                </thead>
                <tbody>
                    {tasks?.map((item, i) => (
                        <tr>
                            <th scope="row">{i + 1}</th>
                            <td>{item.task_name}</td>
                            <td>{item.task_description}</td>
                            <td><div className="text-center p-1" style={{ backgroundColor: item.category[0].color }}>{item.category[0].name.toUpperCase()}</div></td>
                            <td>{item.priority[0].name.toUpperCase()}</td>
                            <td>{dateFormat(item.start_date)} - {dateFormat(item.end_date)}
                                <p className="text-danger">{checkIsBefore(dateFormat(item.end_date)) && 'Task Deadline Passed'}</p>
                            </td>
                            <td>
                                <div className="d-flex justify-content-around">
                                    <button className="btn  secondary-color btn-sm m-1" aria-label="Add new task" onClick={() => taskHandler(item)}><i className="bi bi-pencil" /></button>
                                    <button className="btn btn-danger btn-sm m-1" aria-label="Add new task" onClick={() => deleteHandler(item._id)} ><i className="bi bi-trash-fill" /></button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {tasks?.length === 0 && <div className="p-2 m-2 text-center"><h5>Add New Task</h5></div>}


            {/* open / close form modal  */}
            {openModal && <CreateTask setOpenModal={setOpenModal} editData={editData} />}
        </div>
    )
}

export default TaskList