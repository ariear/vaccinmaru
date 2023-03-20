import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import LocalContext from "./contexts/LocalContext";
import ConsultationRequest from "./views/ConsultationRequest";
import Dashboard from "./views/Dashboard";
import Login from "./views/Login";
import SpotVaccination from "./views/SpotVaccination";
import SpotVaccinationDetail from "./views/SpotVaccinationDetail";

function App() {
  const [authUser, setAuthUser] = useState(null)
  const [initializer, setInitializer] = useState(true)

  const onAuthUser = async () => {
    try {
      const fetch = await axios.get(`http://localhost:8000/api/v1/society?token=${localStorage.getItem('token')}`)
      if (fetch.status === 200) {
        setAuthUser(fetch.data.data)
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
    setInitializer(false)
  }

  useEffect(() => {
      onAuthUser()
  },[])

  const LocalContextValue = useMemo(() => {
    return {
      authUser,
      setAuthUser,
      onAuthUser
    }
  }, [authUser])

  if (initializer) {
    return null
  }

  if (authUser !== null) {
    return (
      <LocalContext.Provider value={LocalContextValue} >
        <BrowserRouter>
          <Routes>
            <Route element={<Nav />} >
              <Route path="/consultation-request" element={<ConsultationRequest />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/spot-vaccination" element={<SpotVaccination />} />
              <Route path="/spot-vaccination/:id" element={<SpotVaccinationDetail />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </LocalContext.Provider>
    )
  }

  return (
    <LocalContext.Provider value={LocalContextValue} >
      <BrowserRouter>
        <Routes>
          <Route element={<Nav />} >
            <Route path="/*" element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </LocalContext.Provider>
  )
}

export default App
