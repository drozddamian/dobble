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
import Footer from './components/Footer'

import GameTableScreen from './screens/GameTableScreen'
import MainScreen from './screens/MainScreen'
import RoomScreen from './screens/RoomScreen'
import AllRoomsScreen from './screens/AllRoomsScreen'
import PlayerScreen from './screens/PlayerScreen'
import Layout from "./components/Layout";

const {
  MAIN, GAME, ROOM, ROOMS, PLAYER,
} = ROUTES

const App = () => {
  return (
    <Layout>
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
    </Layout>
  )
}

export default App
