import { Routes, Route, Navigate } from "react-router-dom"

import Login from "./Login"
import Signup from "./Signup"
import HowTo from "./HowTo"

function AuthRoutes() {
    return (
        <Routes>
            <Route
                path="/login"
                element={<Login />}
            />

            <Route
                path="/signup"
                element={<Signup />}
            />

            <Route
                path="/howto"
                element={<HowTo />}
            />

            <Route
                path="*"
                element={<Navigate to="/login" />}
            />
        </Routes>
    )
}

export default AuthRoutes