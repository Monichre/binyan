import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'
import routes from './routes'
import AppDispatcher from './Flux/Dispatcher/AppDispatcher'
import AppStore from './Flux/Store/AppStore'
import { Helmet } from 'react-helmet'
import Footer from './components/footer/Footer'
import {Loader} from './components/loader/Loader'
import './App.scss'

class App extends Component {
  constructor() {
    super()
    this.state = {
      showLoader: true
    }
  }
  componentDidMount() {
    const _this = this
    AppStore.addChangeListener(this._onChange.bind(this))
    window.embedFunction = (w, d) => {
      var id = 'embedly-platform',
        n = 'script'
      if (!d.getElementById(id)) {
        w.embedly =
          w.embedly ||
          function() {
            ;(w.embedly.q = w.embedly.q || []).push(arguments)
          }
        var e = d.createElement(n)
        e.id = id
        e.async = 1
        e.src =
          ('https:' === document.location.protocol ? 'https' : 'http') +
          '://cdn.embedly.com/widgets/platform.js'
        var s = d.getElementsByTagName(n)[0]
        s.parentNode.insertBefore(e, s)
      }
    }
    window.embedFunction(window, document)
  
  }
  componentWillUnmount() {
    AppStore.removeChangeListener(this._onChange.bind(this))
  }
  getStore() {
    AppDispatcher.dispatch({
      action: 'get-cms-data'
    })
  }
  componentWillMount() {
    this.getStore()
  }

  _onChange() {
    this.setState(AppStore)
  }
  render() {
    const { showLoader } = this.state
    const { data } = AppStore
    if (!data.ready) {
      this.getStore()
      return <Loader />
    } else {
      return (
        <BrowserRouter>
          <div style={{position: 'relative'}}>
            <Helmet>
              <script
                defer
                src="https://use.fontawesome.com/releases/v5.0.8/js/all.js"
                integrity="sha384-SlE991lGASHoBfWbelyBPLsUlwY1GwNDJo3jSJO04KZ33K2bwfV9YBauFfnzvynJ"
                crossorigin="anonymous"
              />
            </Helmet>
            <div className="App">
              {routes}
            </div>
            <Footer />
          </div>
        </BrowserRouter>
      )
    }
  }
}

export default App
