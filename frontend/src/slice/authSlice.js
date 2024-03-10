import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "../service/authService";



const InitialState = {
    login: {
        isSuccess: false,
        userData: {
            user: JSON.parse(localStorage.getItem('user')),
            tk: localStorage.getItem('tk'),
            isValid: localStorage.getItem('tk') ? true : false
        }
    },
    isError: false,
    errMessage: "",
}



export const userLogin = createAsyncThunk(
    "auth/userLogin",
    async (object, thunkAPI) => {
        try {
            const response = await authService.login(object);
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



const authSlice = createSlice({
    name: "auth",
    initialState: InitialState,
    reducers: {
        userLogout: (state) => {
            state.login.userData = {}
            localStorage.clear()
        },
        clearAuthError: (state) => {
            state.errMessage = ""
            state.isError = false
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(userLogin.pending, (state) => {
                state.login.userData.isValid = false
                state.isError = false
                state.errMessage = ""
            })
            .addCase(userLogin.fulfilled, (state, action) => {
                // set data in local storage
                localStorage.setItem("tk", action.payload.token)
                localStorage.setItem("user", JSON.stringify(action.payload.user))
                state.login.userData.user = action.payload.user
                state.login.userData.tk = action.payload.token
                state.login.userData.isValid = true
            })
            .addCase(userLogin.rejected, (state, action) => {
                state.login.userData.isValid = false
                state.isError = true
                state.errMessage = action.payload
            })
    }

});


export const { userLogout, clearAuthError } = authSlice.actions
const { reducer } = authSlice;
export default reducer;