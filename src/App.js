import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'
import GameTableScreen from './screens/GameTableScreen'
import MainScreen from './screens/MainScreen'


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <MainScreen />
        </Route>

        <Route path='/game'>
          <GameTableScreen />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
