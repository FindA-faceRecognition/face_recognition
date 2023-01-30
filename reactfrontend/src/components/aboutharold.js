import React from 'react'

export default function Aboutharold() {
  return (
    <div className='widthsize container-fluid my-3 mx-auto'>
      <div className='row'>
        <div className='card harold  col-sm-12 col-md-5 col-lg-5 mx-auto'>
            <h2 className='container-fluid btn btn-primary'>Inspiration</h2>
            <p> Face Recognition is now a big part of modern day biometric security.
            It is simply faster than other forms of security,like the finger print biometric system.Although faster may not always equal better.
            This site was developed with by combining the powers of python,its framework django,react as well as
            face recognition technologies.</p>
            <hr/>
            <p>As knowledge about artificial intelligence increases, the easier it is to apply some technologies to 
            various aspects of our lives. Be it our day to day mundane activities or more efficiently at our work places.
            Our world is changing and evolving and we as a society must evolve with it.</p>
            <hr/>
            <h2 className='container-fluid btn btn-warning text-secondary'>About Harold Osei Frimpong Kwabena</h2>
            <p>I am a Civil Engineering graduant as of January 2023 from Kwame Nkrumah University of Science and Technology,Kumasi-Ghana.
            My alma mater is Saint Augustine's College Cape Coast,Ghana.Programming languages at my disposal include but not limited to python,django,react.js,javascript,node,html,css,bootstrap.</p>
          
        </div>
        <div className='card inspiration  rounded-circle  col-sm-12 col-md-5 col-lg-5 mx-auto'>
            <img src={require('../assets/harold.jpg')}
            className='rounded-circle img-responsive'
            alt='harold'
            />
        </div>
      </div>
    </div>
  )
}
