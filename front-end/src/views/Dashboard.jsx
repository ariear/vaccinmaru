import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export default function Dashboard() {
    const [consultations, setConsultations] = useState({})
    const [isConsultationsNotFound, setIsConsultationsNotFound] = useState(false)

    const [doctorName, setDoctorName] = useState('')

    const [firstVaccinations, setFirstVaccination] = useState({})
    const [isVaccinationNotFound, setIsVaccinationNotFound] = useState(false)
    const [secondVaccinations, setSecondVaccination] = useState({})

    const onGetConsultationsHandle = async () => {
        try {
            const fetch = await axios.get(`http://localhost:8000/api/v1/consultations?token=${localStorage.getItem('token')}`)
            if (fetch.status === 200) {
                setDoctorName(fetch.data.consultation.doctor.name)
                setConsultations(fetch.data.consultation)
            }
            console.log(fetch.data.consultation);
        } catch (error) {
            if (error.response.status === 404) {
                setIsConsultationsNotFound(true)
            }
            console.log(error);
        }
    }
    const onGetVaccinationsHandle = async () => {
        try {
            const fetch = await axios.get(`http://localhost:8000/api/v1/vaccinations?token=${localStorage.getItem('token')}`)
            if (fetch.status === 200) {
                console.log(fetch.data.vaccinations);
                setFirstVaccination(fetch.data.vaccinations.first)
                setSecondVaccination(fetch.data.vaccinations.second)
            }
        } catch (error) {
            if (error.response.status === 422) {
                setIsVaccinationNotFound(true)
            }
            console.log(error.response);
        }
    }

    useEffect(() => {
        onGetConsultationsHandle()
        onGetVaccinationsHandle()
    }, [])

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
                                        <td class="text-muted">{consultations.doctor_notes}</td>
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
                                    <a href="">+ Register vaccination</a>
                                </div>
                            </div>
                        </div>
                    }

                    {
                        firstVaccinations.length !== 0 || !isVaccinationNotFound &&
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
                                        {/* <td class="text-muted">{firstVaccinations.spot.name}</td> */}
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
                                    <a href="">+ Register vaccination</a>
                                </div>
                            </div>
                        </div>
                    }
                    
                    {
                        secondVaccinations !== null || !isVaccinationNotFound &&
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
                                        {/* <td class="text-muted">{firstVaccinations.spot.name}</td> */}
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