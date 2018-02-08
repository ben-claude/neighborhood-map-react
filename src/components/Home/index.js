import './styles.css'
import React, { Component } from 'react'
import Locations from '../Locations'
import Map from '../Map'
import PropTypes from 'prop-types'
import MapsNotAvailable from '../MapsNotAvailable'

class Home extends Component {
  static propTypes = {
    locations: PropTypes.array.isRequired,
    onAdminButton: PropTypes.func.isRequired,
    google: PropTypes.object, // can be null
    mapCenter: PropTypes.object.isRequired,
    mapZoom: PropTypes.number.isRequired,
    jQuery: PropTypes.func, // can be null
  }
  state = {
    locationsInfo: [],
    showSidebar: false,
    locationsFilter: '',
  }
  menuSectionElement = null
  componentDidMount() {
    const { locations } = this.props
    this.updateLocationsInfo(locations)
    const showSidebar = window.getComputedStyle(this.menuSectionElement).display === 'none'
    this.setState({ showSidebar })
  }
  componentWillReceiveProps(nextProps) {
    const { locations } = nextProps
    this.updateLocationsInfo(locations)
  }
  updateLocationsInfo(locations) {
    const locationsInfo = locations.map(location => ({
      location,
      isInfoWindowOpened: false,
    }))
    this.setState({ locationsInfo })
  }
  render() {
    const onToggleInfoWindowOpened = (location) => {
      const locationsInfo = this.state.locationsInfo.map(locationInfo => {
        if (locationInfo.location.label === location.label) {
          locationInfo.isInfoWindowOpened = !locationInfo.isInfoWindowOpened
        }
        else {
          locationInfo.isInfoWindowOpened = false // only keep one InfoWindow opened at a given time
        }
        return locationInfo
      })
      this.setState({ locationsInfo })
    }
    const { locationsInfo, showSidebar } = this.state
    const { onAdminButton, google, mapCenter, mapZoom, jQuery } = this.props
    return (
      <div className='Home'>
        <main className='main'>
          <section className='menu' ref={input => this.menuSectionElement = input}>
            <button
              className='Home-menuButton'
              onClick={() => {
                this.setState({ showSidebar: !showSidebar })
              }}
            >Menu</button>
          </section>
          {showSidebar && (
            <aside className='sidebar'>
              <Locations
                locationsInfo={locationsInfo}
                filter={this.state.locationsFilter}
                onFilterChange={locationsFilter => {
                  try {
                    const { locations } = this.props
                    const regexp = new RegExp(locationsFilter);
                    const filteredLocations = locations.filter(location => {
                      return location.label.search(regexp) >= 0
                    })
                    this.setState({ locationsFilter })
                    this.updateLocationsInfo(filteredLocations)
                  }
                  catch (err) {
                    console.log(`Home RegExp ${err}`)
                  }
                }}
                onToggleInfoWindowOpened={onToggleInfoWindowOpened}
              />
              <button className='Home-adminButton' onClick={onAdminButton}>Admin</button>
            </aside>
          )}
          {google ?
            <Map
              locationsInfo={locationsInfo}
              google={google}
              mapCenter={mapCenter}
              mapZoom={mapZoom}
              jQuery={jQuery}
              onToggleInfoWindowOpened={onToggleInfoWindowOpened}
            /> : <MapsNotAvailable />}
        </main>
      </div>
    )
  }
}

export default Home

