import { useContext, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import LocalContext from "../contexts/LocalContext";
import axios from "axios";

export default function Nav() {
    const { authUser, setAuthUser } = useContext(LocalContext)
    const navigate = useNavigate()
    const [isLogoutSuccess,setIsLogoutSuccess] = useState(false)

    const onLogoutHandler = async () => {
        try {
          const fetch = await axios.post(`http://localhost:8000/api/v1/auth/logout?token=${localStorage.getItem('token')}`)
          setIsLogoutSuccess(true)
          localStorage.removeItem('token')
          setTimeout(() => {
              setAuthUser(null)
              setIsLogoutSuccess(false)
              navigate('/')
          }, 2000);
    
        } catch (error) {
          console.log(error.response);
        }
      }

    return (
        <div>
            <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-primary">
                <div class="container">
                    <a class="navbar-brand" href="#">Vaccination Platform</a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="collapse navbar-collapse" id="navbarsExampleDefault">
                        <ul class="navbar-nav ml-auto">
                            <li class="nav-item">
                                {
                                    authUser !== null ?
                                        <button className="btn btn-danger" onClick={onLogoutHandler} >Logout</button>
                                        :
                                    <Link class="btn btn-primary" to='/' >Login</Link>
                                }
                            </li>
                        </ul>
                    </div>
                </div>
        </nav>
        {
            isLogoutSuccess &&
            <div className="alert alert-warning">
                <p>logout success</p>
            </div>
        }
            <Outlet />
        </div>
    )
}