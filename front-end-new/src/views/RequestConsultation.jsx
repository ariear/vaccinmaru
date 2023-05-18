import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function RequestConsultation() {
    const [isDiseaseHistory, setIsDiseaseHistory] = useState(false)
    const [isSymptomsNow, setisSymptomsNow] = useState(false)
    const [isSubmitSuccess, setisSubmitSuccess] = useState(false)

    const [forms, setForms] = useState({
        disease_history: '',
        current_symptoms: ''
    })

    const navigate = useNavigate()

    const onSubmitHandler = async (e) => {
        e.preventDefault()

        setisSubmitSuccess(false)

        try {
            const fetch = await axios.post(`http://localhost:8000/api/v1/consultations?token=${localStorage.getItem('token')}`, {
                society_id: JSON.parse(localStorage.getItem('user.id')), 
                status: 'pending',
                disease_history: forms.disease_history,
                current_symptoms: forms.current_symptoms
            })
            if (fetch.status === 200) {
                setisSubmitSuccess(true)
                setTimeout(() => {
                    setisSubmitSuccess(false)
                }, 1000);
                navigate('/dashboard')
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
            <main>
    <header className="jumbotron">
        <div className="container">
            <h1 className="display-4">Request Consultation</h1>
        </div>
    </header>

    <div className="container">
        {
            isSubmitSuccess &&
        <div className="alert alert-success">
            <p>“Request consultation successful</p>
        </div>
        }
        <form onSubmit={onSubmitHandler}>
            <div className="row mb-4">
                <div className="col-md-6">
                    <div className="form-group">
                        <div className="d-flex align-items-center mb-3">
                            <label htmlFor="disease-history" className="mr-3 mb-0">Do you have disease history ?</label>
                            <select className="form-control-sm" onChange={() => setIsDiseaseHistory(!isDiseaseHistory)} >
                                <option value={true}>Yes, I have</option>
                                <option value={false} selected>No</option>
                            </select>
                        </div>
                        {
                            isDiseaseHistory &&
                        <textarea id="disease-history" value={forms.disease_history} onChange={(e) => setForms({...forms, disease_history: e.target.value})} className="form-control" cols="30" rows="10" placeholder="Describe your disease history"></textarea>
                        }
                    </div>
                </div>
            </div>

            <div className="row mb-4">
                <div className="col-md-6">
                    <div className="form-group">
                        <div className="d-flex align-items-center mb-3">
                            <label htmlFor="current-symptoms" className="mr-3 mb-0">Do you have symptoms now ?</label>
                            <select className="form-control-sm" onChange={() => setisSymptomsNow(!isSymptomsNow)} >
                                <option value={true}>Yes, I have</option>
                                <option value={false} selected>No</option>
                            </select>
                        </div>
                        {
                            isSymptomsNow &&
                        <textarea id="current-symptoms" value={forms.current_symptoms} onChange={(e) => setForms({...forms, current_symptoms: e.target.value})} className="form-control" cols="30" rows="10" placeholder="Describe your current symptoms"></textarea>
                        }
                    </div>
                </div>
            </div>

            <button className="btn btn-primary">Send Request</button>
        </form>

    </div>

</main>
    )
}