import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import { useContext, useState } from "react";
import LocaleContext from "../contexts/LocaleContext";
import axios from "axios";

export default function Nav() {
    const { authUser, onAuthUser } = useContext(LocaleContext)
    const [isLogoutSuccess, setIsLogoutSuccess] = useState(false)

    const onLogoutHandler = async () => {
        await axios.post(`http://localhost:8000/api/v1/auth/logout?token=${localStorage.getItem('token')}`, {})
        localStorage.removeItem('token')
        onAuthUser()        
        setIsLogoutSuccess(true)
        setTimeout(() => {
            setIsLogoutSuccess(false)
        }, 1000);
    }

    return (
        <div>
            <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-primary">
        <div className="container">
            <a className="navbar-brand" href="#">Vaccination Platform</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarsExampleDefault">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        {
                            authUser !== null ?
                            <button className="btn btn-danger" onClick={onLogoutHandler} >Logout</button> :
                            <a className="nav-link" href="#">Login</a>
                        }
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    {
        isLogoutSuccess &&
        <div className="alert alert-success">
            <p>Logout Success</p>
        </div>
    }
        <Outlet />

        <Footer />
        </div>
    )
}