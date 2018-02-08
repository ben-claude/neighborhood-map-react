import './styles.css'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

class LocationRemove extends Component {
  static propTypes = {
    onRemoveLocation: PropTypes.func.isRequired,
  }
  state = {
    label: '',
  }
  render() {
    const { onRemoveLocation } = this.props
    const { label } = this.state
    const onSubmit = e => {
      e.preventDefault()
      onRemoveLocation(label)
    }
    return (
      <form className='LocationRemove' onSubmit={onSubmit}>
        <label className='LocationRemove-label' htmlFor='label'>Label</label>
        <input id='label' className='LocationRemove-input' type='text' value={label} onChange={e => this.setState({ label: e.target.value })} />
        <button className='LocationRemove-button' type='submit'>Remove Location</button>
      </form>
    )
  }
}

export default LocationRemove

