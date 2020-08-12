import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'
import GameTableScreen from './screens/GameTableScreen'
import RoomListScreen from './screens/RoomListScreen'


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <RoomListScreen />
        </Route>

        <Route path='/game'>
          <GameTableScreen />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
