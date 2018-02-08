import React, { Component } from 'react'
import PropTypes from 'prop-types'
import InfoWindow from '../InfoWindow'

class Marker extends Component {
  static propTypes = {
    google: PropTypes.object.isRequired,
    locationInfo: PropTypes.object.isRequired,
    map: PropTypes.object.isRequired,
    bounds: PropTypes.object.isRequired,
    wikiApi: PropTypes.object, // can be null
    streetViewApi: PropTypes.object.isRequired,
    onToggleInfoWindowOpened: PropTypes.func.isRequired,
  }
  state = {
    marker: null,
  }
  timeoutId = 0
  componentWillMount() {
    const { locationInfo, google, map, onToggleInfoWindowOpened } = this.props
    const marker = new google.maps.Marker({
      map: map,
      position: locationInfo.location.latLng,
    })
    marker.addListener('click', () => {
      onToggleInfoWindowOpened(locationInfo.location)
    })
    this.setState({ marker })
  }
  componentWillUnmount() {
    const { marker } = this.state
    window.clearTimeout(this.timeoutId);
    marker.setMap(null)
  }
  render() {
    const { marker } = this.state
    const { locationInfo, google, map, bounds, wikiApi, streetViewApi, onToggleInfoWindowOpened } = this.props
    bounds.extend(marker.position)
    if (locationInfo.isInfoWindowOpened) {
      marker.setAnimation(google.maps.Animation.BOUNCE);
      this.timeoutId = window.setTimeout(() => marker.setAnimation(null), 750);
      return (
        <InfoWindow
        location={locationInfo.location}
        google={google}
        map={map}
        marker={marker}
        wikiApi={wikiApi}
        streetViewApi={streetViewApi}
        onClose={() => onToggleInfoWindowOpened(locationInfo.location)}
      />)
    }
    return null // nothing to render
  }
}

export default Marker

