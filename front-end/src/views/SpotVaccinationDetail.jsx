import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import moment from "moment/moment"

export default function SpotVaccinationDetail() {
    const [vaccinationDetail, setVaccinationDetail] = useState([])
    const [loading, setLoading] = useState(true)
    const [dateVaccinate, setDateVaccinate] = useState(moment().format('YYYY-MM-DD'))

    const navigate = useNavigate()
    const { id } = useParams()
    
    const getVaccinationDetailHandle = async () => {
        setLoading(true)
        try {
            const fetch = await axios.get(`http://localhost:8000/api/v1/spots/${id}?token=${localStorage.getItem('token')}`)
            setVaccinationDetail(fetch.data.spot)
            setLoading(false)
        } catch (error) {
            console.log(error.response);
        }
    }

    const postVaccinationRegisterHandle = async () => {
        try {
            const fetch = await axios.post(`http://localhost:8000/api/v1/vaccinations?token=${localStorage.getItem('token')}`, { spot_id: id, date: dateVaccinate })
            navigate('/dashboard')
        } catch (error) {
            console.log(error.response);
        }
    }

    useEffect(() => {
        getVaccinationDetailHandle()
        console.log(dateVaccinate);
    },[])

    if (loading) {
        return (
            <p>Loading...</p>
        )
    }

    return (
        <main>
    <header class="jumbotron">
        <div class="container d-flex justify-content-between align-items-center">
            <div>
                <h1 class="display-4">{vaccinationDetail.name}</h1>
                <span class="text-muted">{vaccinationDetail.address}</span>
            </div>
            <button class="btn btn-primary" onClick={postVaccinationRegisterHandle} >Register vaccination</button>
        </div>
    </header>

    <div class="container">

        <div class="row mb-3">
            <div class="col-md-3">
                <div class="form-group">
                    <label for="vaccination-date">Select vaccination date</label>
                    <input type="date" class="form-control" value={moment(dateVaccinate).format('YYYY-MM-DD')} onChange={(e) => setDateVaccinate(moment(e.target.value).format('YYYY-MM-DD'))} id="vaccination-date" />
                </div>
            </div>
        </div>

        <div class="row mb-5">

            <div class="col-md-4">
                <div class="card card-default">
                    <div class="card-body">
                        <div class="d-flex align-items-center justify-content-between mb-3">
                            <h4>Session 1</h4>
                            <span class="text-muted">09:00 - 11:00</span>
                        </div>
                        <div>
                            <div class="row">
                                <div class="col-4 mb-4">
                                    <div class="slot filled"> #1 </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-md-4">
                <div class="card card-default">
                    <div class="card-body">
                        <div class="d-flex align-items-center justify-content-between mb-3">
                            <h4>Session 2</h4>
                            <span class="text-muted">13:00 - 15:00</span>
                        </div>
                        <div>
                            <div class="row">
                                <div class="col-4 mb-4">
                                    <div class="slot filled"> #6 </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-md-4">
                <div class="card card-default">
                    <div class="card-body">
                        <div class="d-flex align-items-center justify-content-between mb-3">
                            <h4>Session 3</h4>
                            <span class="text-muted">15:00 - 17:00</span>
                        </div>
                        <div>
                            <div class="row">
                                <div class="col-4 mb-4">
                                    <div class="slot"> #11 </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    </div>

</main>
    )
}