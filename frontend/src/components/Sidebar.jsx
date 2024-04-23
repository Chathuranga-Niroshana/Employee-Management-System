import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <ul>
        <Link to="/department">
          <li>Departments</li>
        </Link>
        <Link to="/project">
          <li>Projects</li>
        </Link>
        <Link to="/employee">
          <li>Employee List</li>
        </Link>
      </ul>
    </div>
  )
}

export default Sidebar