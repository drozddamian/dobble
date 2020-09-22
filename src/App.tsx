import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'
import ROUTES from './constants/routes'
import Notification from './components/Notification'
import Logout from './components/Logout'

import GameTableScreen from './screens/GameTableScreen'
import MainScreen from './screens/MainScreen'
import RoomScreen from './screens/RoomScreen'
import AllRoomsScreen from './screens/AllRoomsScreen'

const {
  MAIN, GAME, ROOM, ROOMS,
} = ROUTES

const App = () => {
  return (
    <>
      <Notification />
      <Logout />

      <Router>
        <Switch>
          <Route exact path={MAIN}>
            <MainScreen />
          </Route>

          <Route path={ROOM}>
            <RoomScreen />
          </Route>

          <Route path={ROOMS}>
            <AllRoomsScreen />
          </Route>
        </Switch>
      </Router>
    </>
  )
}

export default App
