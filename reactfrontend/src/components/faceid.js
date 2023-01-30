import React from 'react'

export default function FaceID() {
  return (
    <div className='widthsize container-fluid my-5 mx-auto'>
      <div className='row'>
      <div className='card harold col-sm-12 col-md-5 col-lg-5 mx-auto'>
            <img src={require('../assets/56384.jpg')}
            className='img-responsive'
            alt='harold'
            />
        </div>
        <div className='card inspiration col-sm-12 col-md-5 col-lg-5 mx-auto'>
            <h2 className='container-fluid btn btn-primary'>Facial Recognition</h2>
        </div>

      </div>
    </div>
  )
}
