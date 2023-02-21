import React from 'react'
import { Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import EndReservation from './pages/EndReservation';
import FormReservation from './pages/FormReservation';
import Informations from './pages/Informations';
import Welcome from './pages/welcome';
import AvgDurationVehiculeByParking from './components/AvgDurationVehiculeByParking';
import ParkingsList from './pages/ParkingsList';
import RankParking from './components/RankParking';
import CommuneList from './components/CommuneList';
import RankCommune from './components/RankCommune';
import RankCommunePerWeek from './components/RankCommunePerWeek';
import AdminCards from './pages/AdminCards';
import StationnemetnPerMonth from './components/StationnementPerMonth';
import AvgSpaceAvailablePerParking from './pages/AvgSpaceAvailablePerParking';
import Reservations from './components/Reservations';
import Homepage from './pages/Homepage';
export default function MainRouter() {
  const jwt=localStorage.getItem('jwt');
  const role=localStorage.getItem('role');
  return (
    <div>
      <Routes>

      

        {jwt ?
          
         role === "a" ? <>
            <Route path={"/rank-parking"} element={<RankParking />} />
            <Route path={"/list"} element={<ParkingsList />} />
            <Route path={"/communes"} element={<CommuneList />} />
            <Route path={"/commune/:commune"} element={<RankCommune />} />
            <Route path={"/avg/:num_parking"} element={<AvgDurationVehiculeByParking />} />
            <Route path={"/commune/semaine"} element={<RankCommunePerWeek />} />
            <Route path={"/stationnement"} element={<StationnemetnPerMonth />} />
            <Route path={"/AvailableSpace"} element={<AvgSpaceAvailablePerParking />} />
            <Route path={"/"} element={<AdminCards />} />

          </> :
            <>

              <Route path={"/informations"} element={<Informations />} />
              <Route path={"/reservations"} element={<Reservations />} />
              <Route path={"/"} element={<Welcome />} />
              {!localStorage.getItem("place") ? <Route path={"/reservation"} element={<FormReservation />} />
                : <Route path={"/reservation"} element={<EndReservation />} />}

            </> : 
            <>
            <Route exact path={"/auth"} element={<Auth />}/>
            <Route path={"/"} element={<Homepage/>} />
            </>
        }




        




      </Routes>
    </div>
  )
}
