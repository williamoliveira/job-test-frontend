import React, { Component } from "react"
import "./App.css"
import Calendar from './Calendar'
import BulkEdit from './BulkEdit'

class App extends Component {

  render() {
    return (
      <div className="container">
        <div className="m-t-md">
          <BulkEdit />
        </div>
        <Calendar />
      </div>
    )
  }
}

export default App