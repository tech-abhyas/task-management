import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { taskService } from "../service/taskService";

// initiate the state
const InitialState = {
  tasks: [],
  taskCategory: [],
  taskPriority: [],
  isError: false,
  errMessage: ""
}


// crate new tasks
export const createTask = createAsyncThunk(
  "task/createTask",
  async (object, thunkAPI) => {
    try {
      const response = await taskService.createTask(object);
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// update tasks
export const updateTask = createAsyncThunk(
  "task/updateTask",
  async (object, thunkAPI) => {
    try {
      const response = await taskService.updateTask(object);
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);


// delete tasks
export const deleteTask = createAsyncThunk(
  "task/deleteTask",
  async (id, thunkAPI) => {
    try {
      const response = await taskService.deleteTask(id);
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);


// get all tasks
export const getTasks = createAsyncThunk(
  "task/getTasks",
  async (object = {}, thunkAPI) => {
    try {
      const response = await taskService.getTask();
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// get tasks category
export const getTaskCategory = createAsyncThunk(
  "task/getTaskCategory",
  async (data = {}, thunkAPI) => {
    try {
      const response = await taskService.getTaskCategory();
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// get task priority
export const getTaskPriority = createAsyncThunk(
  "task/getTaskPriority",
  async (data = {}, thunkAPI) => {
    try {
      const response = await taskService.getTaskPriority();
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);



const taskSlice = createSlice({
  name: "tasks",
  initialState: InitialState,
  reducers: {
    clearError: (state, action) => {
      state.errMessage = ""
      state.isError = false
    }
  },
  extraReducers: (builder) => {
    builder
      // create tasks
      .addCase(createTask.pending, (state) => {
        state.isError = false
        state.errMessage = ""
      })
      .addCase(createTask.rejected, (state, action) => {
        state.isError = true
        state.errMessage = action.payload
      })

      // category slice
      .addCase(getTaskCategory.pending, (state) => {
        state.isError = false
        state.errMessage = ""
      })
      .addCase(getTaskCategory.fulfilled, (state, action) => {
        state.taskCategory = action.payload
      })
      .addCase(getTaskCategory.rejected, (state, action) => {
        state.isError = true
        state.errMessage = action.payload
      })

      // priority slice
      .addCase(getTaskPriority.pending, (state) => {
        state.isError = false
        state.errMessage = ""
      })
      .addCase(getTaskPriority.fulfilled, (state, action) => {
        state.taskPriority = action.payload
      })
      .addCase(getTaskPriority.rejected, (state, action) => {
        state.isError = true
        state.errMessage = action.payload
      })

      // get tasks
      .addCase(getTasks.pending, (state) => {
        state.isError = false
        state.errMessage = ""
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.tasks = action.payload.result
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.isError = true
        state.errMessage = action.payload
      })


      // update tasks slice
      .addCase(updateTask.pending, (state) => {
        state.isError = false
        state.errMessage = ""
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.tasks = action.payload.result
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.isError = true
        state.errMessage = action.payload
      })

      .addCase(deleteTask.pending, (state) => {
        state.isError = false
        state.errMessage = ""
      })

      .addCase(deleteTask.rejected, (state, action) => {
        state.isError = true
        state.errMessage = action.payload
      })

  }

});


export const { clearError } = taskSlice.actions
const { reducer } = taskSlice;
export default reducer;