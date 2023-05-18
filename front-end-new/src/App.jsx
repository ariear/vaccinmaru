import { useEffect, useMemo } from "react"
import { useState } from "react"
import LocaleContext from "./contexts/LocaleContext"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Nav from "./components/Nav"
import Dashboard from "./views/Dashboard"
import VaccinationSpot from "./views/VaccinationSpot"
import RequestConsultation from "./views/RequestConsultation"
import DetailVaccinationSpot from "./views/DetailVaccinationSpot"
import Login from "./views/auth/Login"

function App() {
    const [authUser, setAuthUser] = useState(null)
    const [initialize, setInitialize] = useState(true)

    const onAuthUser = () => {
      if (localStorage.getItem('token')) {
        setAuthUser(localStorage.getItem('token'))
      }else {
        setAuthUser(null)
      }
      setInitialize(false)      
    }
    
    useEffect(() => {
      onAuthUser()
    }, [])

    const LocalContextValue = useMemo(() => {
      return {
        onAuthUser,
        authUser
      }
    }, [authUser])

    if (initialize) {
      return null
    }

    if (authUser !== null) {
      return (
        <LocaleContext.Provider value={LocalContextValue}>
          <BrowserRouter>
            <Routes>
              <Route element={<Nav />} >
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/register-vaccination/:type" element={<VaccinationSpot />} />
                  <Route path="/register-vaccination-detail/:id" element={<DetailVaccinationSpot />} />
                  <Route path="/request-consultation" element={<RequestConsultation />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </LocaleContext.Provider>
      )
    }

    return (
      <LocaleContext.Provider value={LocalContextValue} >
        <BrowserRouter>
          <Routes>
            <Route element={<Nav />}>
              <Route path="*" element={<Login />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </LocaleContext.Provider>
    )

}

export default App