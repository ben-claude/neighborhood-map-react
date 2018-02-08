import './styles.css'
import React from 'react'
import PropTypes from 'prop-types'

const Admin = ({ onAddLocation, onRemoveLocation, onMapsApi, onWikiApi }) => {
  return (
    <section className='Admin'>
      <button className='Admin-button' onClick={onAddLocation}>Add Location</button>
      <button className='Admin-button' onClick={onRemoveLocation}>Remove Location</button>
      <button className='Admin-button' onClick={onMapsApi}>Maps</button>
      <button className='Admin-button' onClick={onWikiApi}>Wiki</button>
    </section>
  )
}

Admin.propTypes = {
  onAddLocation: PropTypes.func.isRequired,
  onRemoveLocation: PropTypes.func.isRequired,
  onMapsApi: PropTypes.func.isRequired,
  onWikiApi: PropTypes.func.isRequired,
}

export default Admin

