import './styles.css'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Marker from '../Marker'
import WikiApi from '../../WikiApi'
import StreetViewApi from '../../StreetViewApi'

class Map extends Component {
  static propTypes = {
    locationsInfo: PropTypes.array.isRequired,
    google: PropTypes.object.isRequired,
    mapCenter: PropTypes.object.isRequired,
    mapZoom: PropTypes.number.isRequired,
    jQuery: PropTypes.func, // can be null
    onToggleInfoWindowOpened: PropTypes.func.isRequired,
  }
  state = {
    map: null,
    bounds: null,
    wikiApi: null,
  }
  mapDivElement = null
  streetViewApi = new StreetViewApi(this.props.google)
  bounds = null
  componentDidMount() {
    const { google, mapCenter, mapZoom } = this.props
    const map = new google.maps.Map(this.mapDivElement, {
      center: mapCenter,
      zoom: mapZoom,
    })
    this.setState({ map })
  }
  componentWillReceiveProps(nextProps) {
    const { jQuery } = nextProps
    if (jQuery && !this.state.wikiApi) {
      this.setState({ wikiApi: new WikiApi(jQuery) })
    }
  }
  componentDidUpdate() {
    const { map } = this.state
    if (map) {
      map.fitBounds(this.bounds)
    }
  }
  render() {
    const { locationsInfo, google, onToggleInfoWindowOpened } = this.props
    const { map, wikiApi } = this.state
    if (map) {
      this.bounds = new google.maps.LatLngBounds(); // need to be created each time the locations change
      google.maps.event.addDomListener(window, 'resize', () => {
        map.fitBounds(this.bounds)
      })
    }
    return (
      <section className='Map'>
        {/*aria 'role' attribute*/}
        <div id='Map-map' role='application' ref={input => this.mapDivElement = input}>
          {locationsInfo.map(locationInfo => (
            (map) ? // null on first render() because componentDidMount() has not been called yet
            <Marker
              key={locationInfo.location.label /* do not use 'array index': the key need to remain the same when the 'location search regexp' changes */}
              locationInfo={locationInfo}
              google={google}
              map={map}
              bounds={this.bounds}
              wikiApi={wikiApi}
              streetViewApi={this.streetViewApi}
              onToggleInfoWindowOpened={onToggleInfoWindowOpened}
            />
            : null // nothing to render
          ))}
        </div>
      </section>
    )
  }
}

export default Map;

