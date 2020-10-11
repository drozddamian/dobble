import React from 'react'
import {
  Router,
  Switch,
  Route,
} from 'react-router-dom'
import ROUTES from './constants/routes'
import history from './helpers/history'
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

      <Router history={history}>
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

          <Route path={GAME}>
            <GameTableScreen />
          </Route>
        </Switch>
      </Router>
    </>
  )
}

export default App
