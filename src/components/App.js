import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'

class App extends Component {


	componentDidMount () {

	}

  render() {
    return (
      <div>
        Starter Code
      </div>
    )
  }
}

export default connect()(App)