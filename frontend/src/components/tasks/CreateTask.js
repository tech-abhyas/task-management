import React, { useEffect, useMemo, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { useDispatch, useSelector } from 'react-redux'
import { clearError, createTask, getTaskCategory, getTaskPriority, getTasks, updateTask } from '../../slice/taskSlice'
import moment from 'moment';
import { toast } from 'react-toastify'

function CreateTask({ setOpenModal, editData }) {

    const dispatch = useDispatch()
    const taskReducer = useSelector(state => state.taskReducer)
    const { isError, errMessage } = taskReducer

    const modalClose = (state) => {
        setOpenModal(state)
    }

    useEffect(() => {
        dispatch(getTaskCategory())
        dispatch(getTaskPriority())
    }, [])

    const taskData = useMemo(() => editData, [editData])

    const start_date = moment(taskData?.start_date).format('YYYY-MM-DD');
    const end_date = moment(taskData?.end_date).format('YYYY-MM-DD');


    const initialValues = {
        task_name: taskData?.task_name ?? "",
        task_description: taskData?.task_description ?? "",
        category_id: taskData?.category_id ?? "",
        priority_id: taskData?.priority_id ?? "",
        start_date: start_date ?? "",
        end_date: end_date ?? ""
    }


    const validationSchema = Yup.object({
        task_name: Yup.string().required("Required"),
        task_description: Yup.string().required("Required"),
        category_id: Yup.string().required("Required"),
        priority_id: Yup.string().required("Required"),
        start_date: Yup.date().required("Required"),
        end_date: Yup.date().min(
            Yup.ref('start_date'),
            "End date can't be before Start date"
        ).required("Required")
    })

    const onSubmit = async (val) => {

        try {
            if (taskData?.task_name && taskData?._id) {
                const updateObj = {
                    task_id: taskData?._id,
                    ...val
                }
                console.timeLog()
                await dispatch(updateTask(updateObj)).unwrap()
                console.timeLog()
            } else {
                console.timeLog()
                await dispatch(createTask(val)).unwrap()
                console.timeLog()
            }
        } catch (error) {
            console.log("error", error)
        }

        dispatch(getTasks())
        toast.success("Date submitted successfully")
        modalClose(false)
    }


    useEffect(() => {
        if (isError) {
            toast.error(errMessage)
            dispatch(clearError())
        }
    }, [isError])





    return (
        <div className="modal fade show d-block" style={{ "background": "#000000b3" }} id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Task</h5>
                        <button type="button" className="close btn btn-dark" data-dismiss="modal" aria-label="Close" onClick={() => modalClose(false)}>
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div className="modal-body">

                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={(onSubmit)}
                            enableReinitialize={true}
                        >
                            {formik => (
                                <Form className="row g-3">
                                    <div className="col-lg-12 col-md-12 col-sm-12 ">
                                        <label className="form-label">Task Name</label>
                                        <Field type="text" name="task_name" className="form-control" />
                                        <ErrorMessage name={"task_name"}>{msg => <p className="text-danger">{msg}</p>}</ErrorMessage>
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12 ">
                                        <label className="form-label">Task Description</label>
                                        <Field type="text" name="task_description" className="form-control" />
                                        <ErrorMessage name={"task_description"}>{msg => <p className="text-danger">{msg}</p>}</ErrorMessage>
                                    </div>

                                    <div className="col-lg-6 col-md-12 col-sm-12 ">
                                        <label className="form-label">Category</label>
                                        <Field
                                            as="select"
                                            className="form-control form-select"
                                            name={"category_id"}
                                        >
                                            <option>Select</option>
                                            {taskReducer?.taskCategory?.map((option, i) => {
                                                return (
                                                    <option
                                                        key={i}
                                                        value={option._id}
                                                        style={{ backgroundColor: option.color }}
                                                    >{option?.name.toUpperCase()}
                                                    </option>
                                                );
                                            })}
                                        </Field>
                                        <ErrorMessage name={"category_id"}>{msg => <p className="text-danger">{msg}</p>}</ErrorMessage>
                                    </div>
                                    <div className="col-lg-6 col-md-12 col-sm-12 ">
                                        <label className="form-label">Priority</label>
                                        <Field
                                            as="select"
                                            className="form-control form-select"
                                            name={"priority_id"}
                                        >
                                            <option>Select</option>
                                            {taskReducer?.taskPriority?.map((option, i) => {
                                                return (
                                                    <option
                                                        key={i}
                                                        value={option._id}
                                                    >
                                                        {option?.name.toUpperCase()}
                                                    </option>
                                                );
                                            })}
                                        </Field>
                                        <ErrorMessage name={"priority_id"}>{msg => <p className="text-danger">{msg}</p>}</ErrorMessage>
                                    </div>

                                    <div className="col-lg-6 col-md-12 col-sm-12 ">
                                        <label className="form-label">Start Date</label>
                                        <Field type="date" name="start_date" className="form-control" />

                                        <ErrorMessage name={"start_date"}>{msg => <p className="text-danger">{msg}</p>}</ErrorMessage>
                                    </div>

                                    <div className="col-lg-6 col-md-12 col-sm-12 ">
                                        <label className="form-label">End Date</label>
                                        <Field type="date" name="end_date" className="form-control" />
                                        <ErrorMessage name={"end_date"}>{msg => <p className="text-danger">{msg}</p>}</ErrorMessage>
                                    </div>

                                    <div className="col-lg-12 col-md-12 col-sm-12 ">
                                        <button type="submit" className="btn secondary-color btn-sm">Submit</button>
                                    </div>
                                </Form>
                            )}
                        </Formik>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default CreateTask