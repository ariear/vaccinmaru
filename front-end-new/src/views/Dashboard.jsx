import axios from "axios"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
    const [consultations, setConsultations] = useState([])
    const [isConsultationsNotFound, setIsConsultationsNotFound] = useState(false)
    
    const [firstVaccination, setFirsttVaccination] = useState([])
    const [secondVaccination, setSecondVaccination] = useState([])
    const [isVaccinationNotFound, setIsVaccinationNotFound] = useState(false)
    const [isSecondVaccinationNotFound, setIsSecondVaccinationNotFound] = useState(false)

    const onGetConsultationHandler = async () => {
        try {
            const fetch = await axios.get(`http://localhost:8000/api/v1/consultations?token=${localStorage.getItem('token')}`)
            if (fetch.status === 200) {
                setConsultations(fetch.data.consultation)
            }
        } catch (error) {
            if (error.response.status === 422) {
                setIsConsultationsNotFound(true)
            }
        }
    }

    const onGetVaccinationHandler = async () => {
        try {
            const fetch = await axios.get(`http://localhost:8000/api/v1/vaccinations?token=${localStorage.getItem('token')}`)
            if (fetch.status === 200) {
                if (fetch.data.second) {
                    setFirsttVaccination(fetch.data.first)
                    setSecondVaccination(fetch.data.second)
                }else {
                    setFirsttVaccination(fetch.data.first)
                    setIsSecondVaccinationNotFound(true)
                }
            }
        } catch (error) {
            if (error.response.status === 404) {
                setIsVaccinationNotFound(true)
                setIsSecondVaccinationNotFound(true)
            }
        }
    }

    useEffect(() => {
        onGetConsultationHandler()
        onGetVaccinationHandler()
    },[])

    return (
            <main>
    <header className="jumbotron">
        <div className="container">
            <h1 className="display-4">Dashboard</h1>
        </div>
    </header>

    <div className="container">

        <section className="consultation-section mb-5">
            <div className="section-header mb-3">
                <h4 className="section-title text-muted">My Consultation</h4>
            </div>
            <div className="row">

            {
                isConsultationsNotFound &&
                <div className="col-md-4">
                    <div className="card card-default">
                        <div className="card-header">
                            <h5 className="mb-0">Consultation</h5>
                        </div>
                        <div className="card-body">
                            <Link to='/request-consultation'>+ Request consultation</Link>
                        </div>
                    </div>
                </div>
            }

            {
                !isConsultationsNotFound &&
                <div className="col-md-4">
                    <div className="card card-default">
                        <div className="card-header border-0">
                            <h5 className="mb-0">Consultation</h5>
                        </div>
                        <div className="card-body p-0">
                            <table className="table table-striped mb-0">
                                <tr>
                                    <th>Status</th>
                                    <td><span className="badge badge-info">{consultations.status}</span></td>
                                </tr>
                                <tr>
                                    <th>Disease History</th>
                                    <td className="text-muted">{consultations.disease_history ?? '-'}</td>
                                </tr>
                                <tr>
                                    <th>Current Symptoms</th>
                                    <td className="text-muted">{consultations.current_symptoms ?? '-'}</td>
                                </tr>
                                <tr>
                                    <th>Doctor Name</th>
                                    <td className="text-muted">{consultations.doctor ? (consultations.doctor.name) : ('-')}</td>
                                </tr>
                                <tr>
                                    <th>Doctor Notes</th>
                                    <td className="text-muted">{consultations.doctor_notes ?? '-'}</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            }

            </div>
        </section>

        <section className="consultation-section mb-5">
            <div className="section-header mb-3">
                <h4 className="section-title text-muted">My Vaccinations</h4>
            </div>
            <div className="section-body">
                <div className="row mb-4">

                {
                    isConsultationsNotFound &&
                    <div className="col-md-12">
                        <div className="alert alert-warning">
                            Your consultation must be approved by doctor to get the vaccine.
                        </div>
                    </div>
                }

                {
                    isVaccinationNotFound &&
                    <div className="col-md-4">
                        <div className="card card-default">
                            <div className="card-header border-0">
                                <h5 className="mb-0">First Vaccination</h5>
                            </div>
                            <div className="card-body">
                                <Link to='/register-vaccination/first'>+ Register vaccination</Link>
                            </div>
                        </div>
                    </div>
                }

                {
                    firstVaccination && !isVaccinationNotFound ? (
                    <div className="col-md-4">
                        <div className="card card-default">
                            <div className="card-header border-0">
                                <h5 className="mb-0">First Vaccination</h5>
                            </div>
                            <div className="card-body p-0">
                                <table className="table table-striped mb-0">
                                    <tr>
                                        <th>Status</th>
                                        <td className="text-muted"><span className="badge badge-info">{firstVaccination.spot ? (firstVaccination.spot.status) : '-'}</span></td>
                                    </tr>
                                    <tr>
                                        <th>Date</th>
                                        <td className="text-muted">{firstVaccination.vaccination_date}</td>
                                    </tr>
                                    <tr>
                                        <th>Spot</th>
                                        <td className="text-muted">{firstVaccination.spot ? (firstVaccination.spot.name) : '-'}</td>
                                    </tr>
                                    <tr>
                                        <th>Vaccine</th>
                                        <td className="text-muted">{firstVaccination.vaccine ? (firstVaccination.vaccine.name) : '-'}</td>
                                    </tr>
                                    <tr>
                                        <th>Vaccinator</th>
                                        <td className="text-muted">{firstVaccination.vaccinator ? (firstVaccination.vaccinator.name) : '-'}</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                    ) : (
                        ''
                    )
                }

                </div>

                <div className="row">


                {
                    isSecondVaccinationNotFound &&
                    <div className="col-md-4">
                        <div className="card card-default">
                            <div className="card-header border-0">
                                <h5 className="mb-0">Second Vaccination</h5>
                            </div>
                            <div className="card-body">
                                <Link to='/register-vaccination/second'>+ Register vaccination</Link>
                            </div>
                        </div>
                    </div>
                }

{
                    secondVaccination && !isSecondVaccinationNotFound ? (
                    <div className="col-md-4">
                        <div className="card card-default">
                            <div className="card-header border-0">
                                <h5 className="mb-0">Second Vaccination</h5>
                            </div>
                            <div className="card-body p-0">
                                <table className="table table-striped mb-0">
                                    <tr>
                                        <th>Status</th>
                                        <td className="text-muted"><span className="badge badge-info">{secondVaccination.spot ? (secondVaccination.spot.status) : '-'}</span></td>
                                    </tr>
                                    <tr>
                                        <th>Date</th>
                                        <td className="text-muted">{secondVaccination.vaccination_date}</td>
                                    </tr>
                                    <tr>
                                        <th>Spot</th>
                                        <td className="text-muted">{secondVaccination.spot ? (secondVaccination.spot.name) : '-'}</td>
                                    </tr>
                                    <tr>
                                        <th>Vaccine</th>
                                        <td className="text-muted">{secondVaccination.vaccine ? (secondVaccination.vaccine.name) : '-'}</td>
                                    </tr>
                                    <tr>
                                        <th>Vaccinator</th>
                                        <td className="text-muted">{secondVaccination.vaccinator ? (secondVaccination.vaccinator.name) : '-'}</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                    ) : (
                        ''
                    )
                }

                </div>

            </div>
        </section>

    </div>

</main>
    )
}