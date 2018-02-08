import './styles.css'
import React, { Component } from 'react'
import Home from '../Home'
import Admin from '../Admin'
import LocationApi from '../../LocationApi'
import LocationAdd from '../LocationAdd'
import LocationRemove from '../LocationRemove'
import NotFound from '../NotFound'
import MapsNotAvailable from '../MapsNotAvailable'
import JQueryNotAvailable from '../JQueryNotAvailable'
import MapsQuery from '../MapsQuery'
import WikiQuery from '../WikiQuery'
import { Switch, Route } from 'react-router-dom'
import PropTypes from 'prop-types'

class App extends Component {
  static propTypes = {
    localStorageKey: PropTypes.string.isRequired,
    googleMapsPromise: PropTypes.object.isRequired,
    mapCenter: PropTypes.object.isRequired,
    mapZoom: PropTypes.number.isRequired,
    jQueryPromise: PropTypes.object.isRequired,
  }
  state = {
    locations: [],
    google: null,
    jQuery: null,
  }
  locationApi = new LocationApi(this.props.localStorageKey)
  componentDidMount() {
    this.loadLocations()
    this.props.googleMapsPromise
      .then(google => this.setState({ google }))
      .catch(() => this.setState({ google: null }))
    this.props.jQueryPromise
      .then(jQuery => this.setState({ jQuery }))
      .catch(() => this.setState({ jQuery: null }))
  }
  loadLocations() {
    return this.locationApi.loadLocations().then(locations => {
      this.setState({ locations })
    })
  }
  render() {
    const { locations, google, jQuery } = this.state
    const { mapCenter, mapZoom } = this.props
    return (
      <Switch>
        <Route exact path='/'
          render={({ history }) => (
            <Home
              locations={locations}
              onAdminButton={() => history.push('/admin')}
              google={google}
              mapCenter={mapCenter}
              mapZoom={mapZoom}
              jQuery={jQuery}
            />
          )}
        />
        <Route path='/admin'
          render={({ history }) => (
            <Admin 
              onAddLocation={() => history.push('/add')}
              onRemoveLocation={() => history.push('/remove')}
              onMapsApi={() => history.push('/maps')}
              onWikiApi={() => history.push('/wiki')}
            />
          )}
        />
        <Route path='/add'
          render={({ history }) => (
            <LocationAdd
              onAddLocation={location => {
                this.locationApi.addLocation(location).then(() => {
                  this.loadLocations()
                })
                history.push('/')
              }}
            />
          )}
        />
        <Route path='/remove'
          render={({ history }) => (
            <LocationRemove
              onRemoveLocation={locationLabel => {
                this.locationApi.removeLocation(locationLabel).then(() => {
                  this.loadLocations()
                })
                history.push('/')
              }}
            />
          )}
        />
        <Route path='/maps'
          render={() => {
            return google ? <MapsQuery google={google} /> : <MapsNotAvailable />
          }}
        />
        <Route path='/wiki'
          render={() => {
            return jQuery ? <WikiQuery jQuery={jQuery} /> : <JQueryNotAvailable />
          }}
        />
        <Route component={NotFound}/>
      </Switch>
    )
  }

}

export default App

