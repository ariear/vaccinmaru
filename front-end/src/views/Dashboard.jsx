import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export default function Dashboard() {
    const [consultations, setConsultations] = useState({})
    const [isConsultationsNotFound, setIsConsultationsNotFound] = useState(false)

    const [doctorName, setDoctorName] = useState('')

    const [firstVaccinations, setFirstVaccination] = useState({})
    const [secondVaccinations, setSecondVaccination] = useState({})
    const [isVaccinationNotFound, setIsVaccinationNotFound] = useState(false)

    const [loading, setLoading] = useState(true)

    const onGetConsultationsHandle = async () => {
        try {
            const fetch = await axios.get(`http://localhost:8000/api/v1/consultations?token=${localStorage.getItem('token')}`)
            if (fetch.status === 200) {

                if (fetch.data.consultation.doctor === null) {
                    setDoctorName('-')
                }else {
                    setDoctorName(fetch.data.consultation.doctor.name)
                }

                setConsultations(fetch.data.consultation)
            }
        } catch (error) {
            if (error.response.status === 404) {
                setIsConsultationsNotFound(true)
            }
        }
    }
    const onGetVaccinationsHandle = async () => {
        setLoading(true)
        try {
            const fetch = await axios.get(`http://localhost:8000/api/v1/vaccinations?token=${localStorage.getItem('token')}`)
            if (fetch.status === 200) {
                console.log(fetch.data.vaccinations);
                setFirstVaccination(fetch.data.vaccinations.first)
                if (fetch.data.vaccinations.second === null) {
                    setSecondVaccination(null)
                }else {
                    setSecondVaccination(fetch.data.vaccinations.second)
                }
                setLoading(false)
            }
        } catch (error) {
            if (error.response.status === 422) {
                setIsVaccinationNotFound(true)
            }
            // console.log(error.response);
        }
    }

    useEffect(() => {
        onGetConsultationsHandle()
        onGetVaccinationsHandle()
    }, [])

    if (loading) {
        return (
            <p>Loading...</p>
        )
    }

    return (
        <main>
    <header class="jumbotron">
        <div class="container">
            <h1 class="display-4">Dashboard</h1>
        </div>
    </header>

    <div class="container">

        <section class="consultation-section mb-5">
            <div class="section-header mb-3">
                <h4 class="section-title text-muted">My Consultation</h4>
            </div>
            <div class="row">

            {
                isConsultationsNotFound &&
                <div class="col-md-4">
                    <div class="card card-default">
                        <div class="card-header">
                            <h5 class="mb-0">Consultation</h5>
                        </div>
                        <div class="card-body">
                            <Link to='/consultation-request'>+ Request consultation</Link>
                        </div>
                    </div>
                </div>
            }

                {
                    !isConsultationsNotFound ?
                    <div class="col-md-4">
                        <div class="card card-default">
                            <div class="card-header border-0">
                                <h5 class="mb-0">Consultation</h5>
                            </div>
                            <div class="card-body p-0">
                                <table class="table table-striped mb-0">
                                    <tr>
                                        <th>Status</th>
                                        <td><span class="badge badge-info">{consultations.status}</span></td>
                                    </tr>
                                    <tr>
                                        <th>Disease History</th>
                                        <td class="text-muted">{consultations.disease_history == null ? '-' : consultations.disease_history}</td>
                                    </tr>
                                    <tr>
                                        <th>Current Symptoms</th>
                                        <td class="text-muted">{consultations.current_symptoms}</td>
                                    </tr>
                                    <tr>
                                        <th>Doctor Name</th>
                                        <td class="text-muted">{doctorName}</td>
                                    </tr>
                                    <tr>
                                        <th>Doctor Notes</th>
                                        <td class="text-muted">{consultations.doctor_notes == null ? '-' : consultations.doctor_notes}</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                        :
                    <p>Kamu belum konsultasi ke dokter</p>
                }

            </div>
        </section>

        <section class="consultation-section mb-5">
            <div class="section-header mb-3">
                <h4 class="section-title text-muted">My Vaccinations</h4>
            </div>
            <div class="section-body">
                <div class="row mb-4">

                    <div class="col-md-12">
                        <div class="alert alert-warning">
                            Your consultation must be approved by doctor to get the vaccine.
                        </div>
                    </div>

                    {
                        isVaccinationNotFound &&
                        <div class="col-md-4">
                            <div class="card card-default">
                                <div class="card-header border-0">
                                    <h5 class="mb-0">First Vaccination</h5>
                                </div>
                                <div class="card-body">
                                    <Link to='/spot-vaccination/first-vaccination'>+ Register vaccination</Link>
                                </div>
                            </div>
                        </div>
                    }

                    {
                        firstVaccinations.length !== 0 &&
                    <div class="col-md-4">
                        <div class="card card-default">
                            <div class="card-header border-0">
                                <h5 class="mb-0">First Vaccination</h5>
                            </div>
                            <div class="card-body p-0">
                                <table class="table table-striped mb-0">
                                    <tr>
                                        <th>Status</th>
                                        <td class="text-muted"><span class="badge badge-info">{firstVaccinations.status}</span></td>
                                    </tr>
                                    <tr>
                                        <th>Date</th>
                                        <td class="text-muted">{firstVaccinations.vaccination_date}</td>
                                    </tr>
                                    <tr>
                                        <th>Spot</th>
                                        <td class="text-muted">{firstVaccinations.spot.name}</td>
                                    </tr>
                                    <tr>
                                        <th>Vaccine</th>
                                        <td class="text-muted">-</td>
                                    </tr>
                                    <tr>
                                        <th>Vaccinator</th>
                                        <td class="text-muted">-</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                    }

                </div>

                <div class="row">

                    {
                        secondVaccinations == null &&
                        <div class="col-md-4">
                            <div class="card card-default">
                                <div class="card-header border-0">
                                    <h5 class="mb-0">Second Vaccination</h5>
                                </div>
                                <div class="card-body">
                                <Link to='/spot-vaccination/second-vaccination'>+ Register vaccination</Link>
                                </div>
                            </div>
                        </div>
                    }
                    
                    {
                        secondVaccinations !== null &&
                    <div class="col-md-4">
                        <div class="card card-default">
                            <div class="card-header border-0">
                                <h5 class="mb-0">Second Vaccination</h5>
                            </div>
                            <div class="card-body p-0">
                                <table class="table table-striped mb-0">
                                    <tr>
                                        <th>Status</th>
                                        <td class="text-muted"><span class="badge badge-info">{secondVaccinations.status}</span></td>
                                    </tr>
                                    <tr>
                                        <th>Date</th>
                                        <td class="text-muted">{secondVaccinations.vaccination_date}</td>
                                    </tr>
                                    <tr>
                                        <th>Spot</th>
                                        <td class="text-muted">{firstVaccinations.spot.name}</td>
                                    </tr>
                                    <tr>
                                        <th>Vaccine</th>
                                        <td class="text-muted">-</td>
                                    </tr>
                                    <tr>
                                        <th>Vaccinator</th>
                                        <td class="text-muted">-</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                    }

                </div>

            </div>
        </section>

    </div>

</main>
    )
}