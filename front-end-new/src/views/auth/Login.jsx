import axios from "axios"
import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import LocaleContext from "../../contexts/LocaleContext"

export default function Login () {
    const [forms, setForms] = useState({
        id_card_number: '',
        password: ''
    })
    const [wrongCredentsial, setWrongCredentsial] = useState(false)

    const { onAuthUser } = useContext(LocaleContext)
    const navigate = useNavigate()

    const onSubmitAuthHandle = async (e) => {
        e.preventDefault()
        
        setWrongCredentsial(false)

        try {
            const fetch = await axios.post('http://localhost:8000/api/v1/auth/login', forms)
            if (fetch.status === 200) {
                localStorage.setItem('token', fetch.data.token)
                localStorage.setItem('user', JSON.stringify(fetch.data))
                onAuthUser()
                navigate('/dashboard')
            }
        } catch (error) {
            if (error.response.status === 401) {
                setWrongCredentsial(true)
            }
        }
    }

    return (
        <main>
    <header className="jumbotron">
        <div className="container text-center">
            <h1 className="display-4">Vaccination Platform</h1>
        </div>
    </header>

    <div className="container">
        <div className="row justify-content-center">
            <div className="col-md-6">
                <form className="card card-default" onSubmit={onSubmitAuthHandle} >
                    <div className="card-header">
                        <h4 className="mb-0">Login</h4>
                    </div>
                    <div className="card-body">
                        <div className="form-group row align-items-center">
                            <div className="col-4 text-right">ID Card Number</div>
                            <div className="col-8"><input type="text" value={forms.id_card_number} onChange={(e) => setForms({...forms, id_card_number: e.target.value})} className="form-control" /></div>
                        </div>
                        <div className="form-group row align-items-center">
                            <div className="col-4 text-right">Password</div>
                            <div className="col-8"><input type="password" value={forms.password} onChange={(e) => setForms({...forms, password: e.target.value})} className="form-control" /></div>
                        </div>
                        <div className="form-group row align-items-center mt-4">
                            <div className="col-4"></div>
                            <div className="col-8"><button className="btn btn-primary" type="submit" >Login</button></div>
                        </div>
                        {
                            wrongCredentsial && <p>ID Card Number or Password incorrect</p>
                        }
                    </div>
                </form>
            </div>
        </div>
    </div>
</main>
    )
}