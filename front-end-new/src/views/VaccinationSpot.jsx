import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function VaccinationSpot() {
    const {type} = useParams()
    const [spots, setIsSpots] = useState([])

    const onGetSpotHandler = async () => {
        try {
            const fetch = await axios.get(`http://localhost:8000/api/v1/spots?token=${localStorage.getItem('token')}`)
            setIsSpots(fetch.data.spots) 
            console.log(fetch.data.spots);           
        } catch (error) {
            console.log(error);       
        }
    }

    useEffect(() => {
        onGetSpotHandler()
    }, [])
    
    return (
            <main>
    <header className="jumbotron">
        <div className="container">
            <h1 className="display-4">{type == 'second' ? 'Second Vaccination' : 'First Vaccination'}</h1>
        </div>
    </header>

    <div className="container mb-5">

        <div className="section-header mb-4">
            <h4 className="section-title text-muted font-weight-normal">List Vaccination Spots in {JSON.parse(localStorage.getItem('user')).regional.district}</h4>
        </div>

        <div className="section-body">

        {
            spots.map((spot, index) => 
                <Link key={index} to={`/register-vaccination-detail/${spot.id}`} >
                    <article className={`spot ${type == 'second' && spot.serve == 1 ? 'unavailable' : ''} ${type == 'first' && spot.serve == 2 ? 'unavailable' : ''}`}>
                        <div className="row">
                            <div className="col-5">
                                <h5 className="text-primary">{spot.name}</h5>
                                <span className="text-muted">{spot.address}</span>
                            </div>
                            <div className="col-4">
                                <h5>Available vaccines</h5>
                                <span className="text-muted">Sinovac, Moderna, Pfizer.</span>
                            </div>
                            <div className="col-3">
                                <h5>Serve</h5>
                                <span className="text-muted">
                                {spot.serve == 1 && 'only first vaccination'} {spot.serve == 2 && 'only second vaccination'} {spot.serve == 3 && 'both'}
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