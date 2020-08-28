import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'
import ROUTES from './constants/routes'
import GameTableScreen from './screens/GameTableScreen'
import MainScreen from './screens/MainScreen'
import RoomScreen from './screens/RoomScreen'


const {
  MAIN, GAME, ROOM,
} = ROUTES

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path={MAIN}>
          <MainScreen />
        </Route>

        <Route path={ROOM}>
          <RoomScreen />
        </Route>

        <Route path={GAME}>
          <GameTableScreen />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
