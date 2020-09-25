import React, { useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import { toast } from 'react-toastify'
import './styles/index.scss'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Shop from './components/Shop'
import History from './components/History'

toast.configure()

const App = () => {

  return (
    <div className="container">
      <Navbar />
      <Switch>
        <Route path="/shop" component={Shop} />
        <Route path="/history" component={History} />
        <Route path="/" component={Home} />
      </Switch>
    </div>
  )
}
export default App