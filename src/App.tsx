import React from 'react'
import {
  Router,
  Switch,
  Route,
} from 'react-router-dom'
import ROUTES from './constants/routes'
import history from './helpers/history'

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
    <Router history={history}>
      <Layout>
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
      </Layout>
    </Router>
  )
}

export default App
