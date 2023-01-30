import React from 'react'
import { Link } from 'react-router-dom'
export default function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container-fluid ">
    <Link className="navbar-brand" to="/">
        <img src={require('../assets/180309-OWXP1U-827.jpg')}
        alt='imgfile'
        width='50'
        height='50'
        className='img-responsive rounded-circle'
        />
    </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="mx-5 collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav">
        <Link className="nav-link active mx-5" aria-current="page" to="/">Home</Link>
        <Link className="nav-link mx-5" to='/Attendance' >Attendance</Link>
        {/* <Link className="nav-link mx-5">Finda</Link> */}
      </div>
    </div>
  </div>
</nav>
    </div>
  )
}
