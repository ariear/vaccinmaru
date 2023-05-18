import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export default function DetailVaccinationSpot() {
    const { id } = useParams()
    const [spotDetail, setSpotDetail] = useState({})
    const [date, setDate] = useState('')

    const navigate = useNavigate()

    const onGetSpotDetailHandler = async () => {
        const fetch = await axios.get(`http://localhost:8000/api/v1/spots/${id}?token=${localStorage.getItem('token')}`)
        setSpotDetail(fetch.data)
    }

    const onRegisterVaccinationHandler = async () => {
        const fetch = await axios.post(`http://localhost:8000/api/v1/vaccinations?token=${localStorage.getItem('token')}`, {
            date: date,
            society_id: JSON.parse(localStorage.getItem('user')).id,
            spot_id: id
        })
        console.log(fetch.data);
        navigate('/dashboard')
    }

    useEffect(() => {
        onGetSpotDetailHandler()
    }, [])

    return (
            <main>
    <header className="jumbotron">
        <div className="container d-flex justify-content-between align-items-center">
            <div>
                <h1 className="display-4">{spotDetail.spot && (spotDetail.spot.name)}</h1>
                <span className="text-muted">{spotDetail.spot && (spotDetail.spot.address)}</span>
            </div>
            <button onClick={onRegisterVaccinationHandler} className="btn btn-primary">Register vaccination</button>
        </div>
    </header>

    <div className="container">

        <div className="row mb-3">
            <div className="col-md-3">
                <div className="form-group">
                    <label htmlFor="vaccination-date">Select vaccination date</label>
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="form-control" id="vaccination-date" />
                </div>
            </div>
        </div>

        <div className="row mb-5">

            <div className="col-md-4">
                <div className="card card-default">
                    <div className="card-body">
                        <div className="d-flex align-items-center justify-content-between mb-3">
                            <h4>Session 1</h4>
                            <span className="text-muted">09:00 - 11:00</span>
                        </div>
                        <div>
                            <div className="row">
                                <div className="col-4 mb-4">
                                    <div className="slot filled"> #1 </div>
                                </div>
                                <div className="col-4 mb-4">
                                    <div className="slot filled"> #2 </div>
                                </div>
                                <div className="col-4 mb-4">
                                    <div className="slot filled"> #3 </div>
                                </div>
                                <div className="col-4 mb-4">
                                    <div className="slot filled"> #4 </div>
                                </div>
                                <div className="col-4 mb-4">
                                    <div className="slot filled"> #5 </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-md-4">
                <div className="card card-default">
                    <div className="card-body">
                        <div className="d-flex align-items-center justify-content-between mb-3">
                            <h4>Session 2</h4>
                            <span className="text-muted">13:00 - 15:00</span>
                        </div>
                        <div>
                            <div className="row">
                                <div className="col-4 mb-4">
                                    <div className="slot filled"> #6 </div>
                                </div>
                                <div className="col-4 mb-4">
                                    <div className="slot filled"> #7 </div>
                                </div>
                                <div className="col-4 mb-4">
                                    <div className="slot bg-primary text-white"> #8 </div>
                                </div>
                                <div className="col-4 mb-4">
                                    <div className="slot"> #9 </div>
                                </div>
                                <div className="col-4 mb-4">
                                    <div className="slot"> #10 </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-md-4">
                <div className="card card-default">
                    <div className="card-body">
                        <div className="d-flex align-items-center justify-content-between mb-3">
                            <h4>Session 3</h4>
                            <span className="text-muted">15:00 - 17:00</span>
                        </div>
                        <div>
                            <div className="row">
                                <div className="col-4 mb-4">
                                    <div className="slot"> #11 </div>
                                </div>
                                <div className="col-4 mb-4">
                                    <div className="slot"> #12 </div>
                                </div>
                                <div className="col-4 mb-4">
                                    <div className="slot"> #13 </div>
                                </div>
                                <div className="col-4 mb-4">
                                    <div className="slot"> #14 </div>
                                </div>
                                <div className="col-4 mb-4">
                                    <div className="slot"> #15 </div>
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