import './styles.css'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

class LocationAdd extends Component {
  static propTypes = {
    onAddLocation: PropTypes.func.isRequired,
  }
  state = {
    label: '',
    lat: 0,
    lng: 0,
  }
  render() {
    const { onAddLocation } = this.props
    const { label, lat, lng } = this.state
    const onSubmit = e => {
      e.preventDefault()
      const location = {
        label,
        latLng: {
          lat: Number(this.state.lat),
          lng: Number(this.state.lng),
        },
      }
      onAddLocation(location)
    }
    return (
      <form className='LocationAdd' onSubmit={onSubmit}>
        <label className='LocationAdd-label' htmlFor='label'>Label</label>
        <input id='label' className='LocationAdd-input' type='text' value={label} onChange={e => this.setState({ label: e.target.value })} />
        <label className='LocationAdd-label' htmlFor='lat'>Latitutde</label>
        <input id='lat' className='LocationAdd-input' type='number' value={lat} onChange={e => this.setState({ lat: e.target.value })} />
        <label className='LocationAdd-label' htmlFor='lng'>Longitude</label>
        <input id='lng' className='LocationAdd-input' type='number' value={lng} onChange={e => this.setState({ lng: e.target.value })} />
        <button className='LocationAdd-button' type='submit'>Add Location</button>
      </form>
    )
  }
}

export default LocationAdd

