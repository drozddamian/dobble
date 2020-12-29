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
import HowToPlay from './components/HowToPlay'

import GameTableScreen from './screens/GameTableScreen'
import MainScreen from './screens/MainScreen'
import RoomScreen from './screens/RoomScreen'
import AllRoomsScreen from './screens/AllRoomsScreen'
import PlayerScreen from './screens/PlayerScreen'

const {
  MAIN, GAME, ROOM, ROOMS, PLAYER,
} = ROUTES

const App = () => {
  return (
    <>
      <Notification />

      <HowToPlay />
      <Logout />

      <Router history={history}>
        <Switch>
          <Route exact path={MAIN}>
            <MainScreen />
          </Route>

          <Route exact path={ROOM}>
            <RoomScreen />
          </Route>

          <Route exact path={ROOMS}>
            <AllRoomsScreen />
          </Route>

          <Route exact path={GAME}>
            <GameTableScreen />
          </Route>

          <Route exact path={PLAYER}>
            <PlayerScreen />
          </Route>
        </Switch>
      </Router>
    </>
  )
}

export default App
