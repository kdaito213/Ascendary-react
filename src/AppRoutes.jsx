import { Routes, Route } from 'react-router-dom'
import AddTraining from './AddTraining.jsx'
import AddCompetition from './AddCompetition.jsx'
import GraphTraining from "./GraphTraining.jsx"
import GraphCompetition from './GraphCompetition.jsx'
import DashboardTraining from './DashboardTraining.jsx'
import DashboardCompetition from './DashboardCompetition.jsx'
import RecordsTraining from './RecordsTraining.jsx'
import RecordsCompetition from './RecordsCompetition.jsx'
import Team from './Team.jsx'
import Profile from './Profile.jsx'

function AppRoutes({user, mode, record, skills, recordTraining, recordCompetition}) {
    return (
        <Routes>
            <Route 
                path="/profile" 
                element={<Profile user={user} />} 
            />

            <Route
                path="/"
                element={
                    mode === "training"
                        ? <DashboardTraining record={record} mode={mode} />
                        : <DashboardCompetition record={record} mode={mode} />
                }
            />

            <Route
                path="/add"
                element={
                    mode === "training"
                        ? <AddTraining user={user} skills={skills} />
                        : <AddCompetition user={user} skills={skills} />
                }
            />

            <Route
                path="/records"
                element={
                    mode === "training"
                        ? <RecordsTraining record={record} user={user} />
                        : <RecordsCompetition record={record} user={user} />
                }
            />


            <Route
                path="/graph"
                element={
                    mode === "training"
                        ? <GraphTraining record={recordTraining} />
                        : <GraphCompetition record={recordCompetition} />
                }
            />

            <Route
                path="/team"
                element={<Team user={user} />}
            />

        </Routes>
    )
}

export default AppRoutes