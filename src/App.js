import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'
import GameTableScreen from './screens/GameTableScreen'


function App() {
  return (
    <Router>
      <Switch>
        <Route path='/'>
          <GameTableScreen />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
