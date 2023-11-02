import { createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";
import { axiosMusic } from "../../utils/configAxios";

const initialState = {
    name: "",
    email: "",
    token: "",
    isLoading: false,
};

const UserSlice = createSlice({

    name: "user",
    initialState: window.localStorage.getItem("userInfo") || initialState,
    reducers: {
        login: (state, action) => {
            const data = action.payload
            const newData = { ...state, ...data }
            window.localStorage.setItem("userInfo", JSON.stringify(newData))
            return newData
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        logOut: () => {
            window.localStorage.removeItem("userInfo");
            return initialState
        }
    }
})

export default UserSlice.reducer

export const { login, setIsLoading, logOut } = UserSlice.actions

export const loginThunk = (data, navigate) => (dispatch) => {
    dispatch(setIsLoading(true))
    axiosMusic
        .post("/api/auth/login", data)
        .then(({ data }) => {

            dispatch(login(data))
            toast.success(
                "Logueado con éxito"
            );
            setTimeout(() => {
                navigate("/")
            }, 1000)

        })
        .catch((err) => {
            console.log(err);
            toast.error(err.response.data.message);
        })
        .finally(() => dispatch(setIsLoading(false)))
}