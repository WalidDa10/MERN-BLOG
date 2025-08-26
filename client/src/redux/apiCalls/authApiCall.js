import { authActions } from "../slices/authSlice";
//import axios from "axios"

// Login User
export function loginUser(user) {
    return async (dispatch) => {
        try {
            //const response = await axios.post("http://localhost:7070/api/auth/login")
            const response = await fetch("http://localhost:7070/api/auth/login" , {
                method: "POST",
                body: JSON.stringify(user),
                headers:{
                    "Content-Type" : "application/json"
                }
            })
            const data = await response.json();
            dispatch(authActions.login(data))
            localStorage.setItem('userInfo' , JSON.stringify(data))

        } catch (error) {
            console.log(error);   
        }
    }
}
