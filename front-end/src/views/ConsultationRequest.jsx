import axios from "axios";
import { useState } from "react"
import { useNavigate } from "react-router-dom";

export default function ConsultationRequest() {
    const [forms, setForms] = useState({
        disease_history: '-',
        current_symptoms: '-'
    })

    const navigate = useNavigate()

    const onRequestConsultationHandle = async (e) => {
        e.preventDefault()

        try {
            const fetch = await axios.post(`http://localhost:8000/api/v1/consultations?token=${localStorage.getItem('token')}`, forms)
            if (fetch.status === 200) {
                navigate('/dashboard')
            }
        } catch (error) {
            console.log(error.response);
        }
    }

    return (
        <main>
    <header class="jumbotron">
        <div class="container">
            <h1 class="display-4">Request Consultation</h1>
        </div>
    </header>

    <div class="container">

        <form onSubmit={onRequestConsultationHandle} >
            <div class="row mb-4">
                <div class="col-md-6">
                    <div class="form-group">
                        <div class="d-flex align-items-center mb-3">
                            <label for="disease-history" class="mr-3 mb-0">Do you have disease history ?</label>
                            <select class="form-control-sm">
                                <option value="yes">Yes, I have</option>
                                <option value="no">No</option>
                            </select>
                        </div>
                        <textarea id="disease-history" class="form-control" cols="30" rows="10" placeholder="Describe your disease history" value={forms.disease_history} onChange={(e) => setForms({...forms, disease_history: e.target.value})} ></textarea>
                    </div>
                </div>
            </div>

            <div class="row mb-4">
                <div class="col-md-6">
                    <div class="form-group">
                        <div class="d-flex align-items-center mb-3">
                            <label for="current-symptoms" class="mr-3 mb-0">Do you have symptoms now ?</label>
                            <select class="form-control-sm">
                                <option value="yes">Yes, I have</option>
                                <option value="no">No</option>
                            </select>
                        </div>
                        <textarea id="current-symptoms" class="form-control" cols="30" rows="10" value={forms.current_symptoms} onChange={(e) => setForms({...forms, current_symptoms: e.target.value})} placeholder="Describe your current symptoms"></textarea>
                    </div>
                </div>
            </div>

            <button class="btn btn-primary mb-4">Send Request</button>
        </form>

    </div>

</main>
    )
}