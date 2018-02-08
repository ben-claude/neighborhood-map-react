import './styles.css'
import React, { Component } from 'react'
import MapsApi from '../../MapsApi'
import PropTypes from 'prop-types'

class MapsQuery extends Component {
  static propTypes = {
    google: PropTypes.object.isRequired,
  }
  state = {
    address: '',
    lat: 0,
    lng: 0,
  }
  mapsApi = new MapsApi(this.props.google)
  render() {
    const { address, lat, lng } = this.state
    const onGeocode = e => {
      e.preventDefault()
      this.mapsApi.geocodeAddress(this.state.address)
        .then(results => {
          if (!results || !results[0]) {
            console.log('MapsApi invalid response content')
            return
          }
          console.log(results)
          const latLng = results[0].geometry.location
          console.log(`latLng ${latLng.lat()} ${latLng.lng()}`)
          this.setState({
            lat: latLng.lat(),
            lng: latLng.lng(),
          })
        })
        .catch(err => console.log(`MapsApi geocode failed ${err}`))
    }
    return (
      <form className='MapsQuery'>
        <label className='MapsQuery-label' htmlFor='address'>Address</label>
        <input id='label' className='MapsQuery-input' type='text' value={address} onChange={e => this.setState({ address: e.target.value })} />
        <label className='MapsQuery-label' htmlFor='lat'>Latitutde</label>
        <input id='lat' className='MapsQuery-input' type='number' value={lat} disabled />
        <label className='MapsQuery-label' htmlFor='lng'>Longitude</label>
        <input id='lng' className='MapsQuery-input' type='number' value={lng} disabled />
        <button className='MapsQuery-button' onClick={onGeocode}>Geocode address</button>
      </form>
    )
  }
}

export default MapsQuery

