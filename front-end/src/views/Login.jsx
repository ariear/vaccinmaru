import axios from "axios"
import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import LocalContext from "../contexts/LocalContext"

export default function Login() {
    const [forms, setForms] = useState({
        id_card_number: '',
        password: ''
    })
    const [errors, setErrors] = useState({})
    const [isWrong, setIsWrong] = useState(false)

    const navigate = useNavigate()
    const { onAuthUser } = useContext(LocalContext)

    const onSubmitHandler = async (e) => {
        e.preventDefault()

        setErrors({})
        setIsWrong(false)
        try {
            const fetchstore = await axios.post('http://localhost:8000/api/v1/auth/login', forms)
            if (fetchstore.status === 200) {
                localStorage.setItem('token', fetchstore.data.token)
                onAuthUser()
                navigate('/dashboard')
            }
        } catch (error) {
            if (error.response.status === 422) {
                setErrors(error.response.data)
            }
            if (error.response.status === 401) {
                setIsWrong(true)
            }
        }
    }

    return (
        <main>
    <header class="jumbotron">
        <div class="container text-center">
            <h1 class="display-4">Vaccination Platform</h1>
        </div>
    </header>

    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <form onSubmit={onSubmitHandler} class="card card-default">
                    <div class="card-header">
                        <h4 class="mb-0">Login</h4>
                    </div>
                    <forms class="card-body">
                        <div class="form-group row align-items-center">
                            <div class="col-4 text-right">ID Card Number</div>
                            <div class="col-8">
                                <input type="text" class="form-control" value={forms.id_card_number} onChange={(e) => setForms({...forms, id_card_number: e.target.value})} />
                                {errors['id_card_number'] && <p className="text-danger text-sm">{errors['id_card_number']}</p> }
                            </div>
                        </div>
                        <div class="form-group row align-items-center">
                            <div class="col-4 text-right">Password</div>
                            <div class="col-8">
                                <input type="password" class="form-control" value={forms.password} onChange={(e) => setForms({...forms, password: e.target.value})} />
                                {errors['password'] && <p className="text-danger text-sm">{errors['password']}</p> }
                            </div>
                        </div>
                        <div class="form-group row align-items-center mt-4">
                            <div class="col-4"></div>
                            <div class="col-8"><button class="btn btn-primary" type="submit">Login</button></div>
                        </div>
                    </forms>
                </form>
                {
                    isWrong &&
                    <div className="alert alert-danger">
                        <p>ID Card Number or Password incorrect</p>
                    </div>
                }
            </div>
        </div>
    </div>
</main>
    )
}