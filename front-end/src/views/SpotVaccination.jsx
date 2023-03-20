import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import LocalContext from "../contexts/LocalContext"

export default function SpotVaccination() {
    const [spots, setSpots] = useState([])
    const [loading, setLoading] = useState(true)
    const [title, setTitle] = useState('')

    const navigate = useNavigate()

    const { type } = useParams()
    const { authUser } = useContext(LocalContext)

    const onGetSpotVaccinationHandle = async () => {
        setLoading(true)
        try {
            const fetch = await axios.get(`http://localhost:8000/api/v1/spots?token=${localStorage.getItem('token')}`)
            if (fetch.status === 200) {
                setSpots(fetch.data.spots)
                setLoading(false)
            }
        } catch (error) {
            console.log(error.response);
        }
    }

    useEffect(() => {
        if (type == 'first-vaccination') {
            setTitle('First Vaccination')
        }else if (type == 'second-vaccination') {
            setTitle('Second Vaccination')
        }else {
            navigate('/dashboard')
        }

        onGetSpotVaccinationHandle()
    }, [])

    return (
        <main>
    <header class="jumbotron">
        <div class="container">
            <h1 class="display-4">{title}</h1>
        </div>
    </header>

    <div class="container mb-5">

        <div class="section-header mb-4">
            <h4 class="section-title text-muted font-weight-normal">List Vaccination Spots in {authUser && authUser.regional && ( authUser.regional.district )}</h4>
        </div>

        <div class="section-body">

        {
            loading ?
                <p>Loading....</p>
                    :
                spots.map(spot => 
                    <Link key={spot.id} to={`/spot-vaccination/${spot.id}/detail`} >
                        <article className={`spot ${type == 'first-vaccination' && spot.serve === 2 ? 'unavailable' : ''} ${type == 'second-vaccination' && spot.serve === 1 ? 'unavailable' : ''}`}>
                            <div class="row">
                                <div class="col-5">
                                    <h5 class="text-primary">{spot.name}</h5>
                                    <span class="text-muted">{spot.address}</span>
                                </div>
                                <div class="col-4">
                                    <h5>Available vaccines</h5>
                                    <span class="text-muted">
                                        {Object.keys(spot.available_vaccines)
                                            .filter((vaccine) => spot.available_vaccines[vaccine])
                                            .map((vaccine) => (
                                                <o class="mr-2" key={vaccine}>{vaccine} ,</o>
                                        ))}
                                    </span>
                                </div>
                                <div class="col-3">
                                    <h5>Serve</h5>
                                    <span class="text-muted">
                                    { spot.serve === 1 && 'only first vaccination'}
                                    { spot.serve === 2 && 'only second vaccination'}
                                    { spot.serve === 3 && 'both vaccination'}
                                </span>
                                </div>
                            </div>
                        </article>                
                    </Link>
                    )
        }

        </div>

    </div>

</main>
    )
}