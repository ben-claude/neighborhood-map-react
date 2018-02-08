import './styles.css'
import React from 'react'
import PropTypes from 'prop-types'
import Filter from '../Filter'

const Locations = ({ locationsInfo, filter, onFilterChange, onToggleInfoWindowOpened }) => {
  return (
    <section className='Locations'>
      <h2>Locations</h2>
      <Filter filter={filter} onFilterChange={onFilterChange} />
      <ul className='Locations-list'>
        {locationsInfo.map(({ location }, index) => (
          <li key={index}>
            <button className='Locations-button' onClick={() => onToggleInfoWindowOpened(location)}>{location.label}</button>
          </li>
        ))}
      </ul>
    </section>
  )
}

Locations.propTypes = {
  locationsInfo: PropTypes.array.isRequired,
  filter: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  onToggleInfoWindowOpened: PropTypes.func.isRequired,
}

export default Locations

