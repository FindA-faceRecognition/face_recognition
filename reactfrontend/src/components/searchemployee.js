import React,{useState,useRef,useEffect} from 'react'
import axios from 'axios'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
export default function SearchEmployee(){
    const [image,setImage]=useState(null)
    const [show,setShow]=useState('none')
    const nav=useNavigate()
    const [fila,setFile]=useState(null)
    const [newimage,setNewimage]=useState(null)
    const PhotoRef=useRef(null)
    const VideoRef=useRef(null)
    useEffect(()=>{
    },[image])
    function sendimag(){
        setShow('block')
        setTimeout(() => {
            setShow('none')
            Swal.fire({
                icon: 'info',
                title: 'Please wait',
                text: 'Loading... \n',
              })
        if(image){
        var token=''
        const req=localStorage.getItem('reqdata')
        token=JSON.parse(req).token
        const formdata=new FormData()
        formdata.append('image',image)
        formdata.append('token',token)
        axios.post('http://localhost:8000/searchemployee/',formdata)
        .then((response)=>{
            var ima=`http://localhost:8000/static/images/${response.data.message[1]}`
            setNewimage(ima)
            if((response.data.message).length >2){
                Swal.fire({
                    icon: 'success',
                    title: 'Match Found',
                    text: `${response.data.message[0]} \n
                    Log in successful \n ${response.data.message[2]} \n  ${response.data.message[3]}
                    `,
                  })
                  
                //   nav('/')localStorage.setItem('reqdata',JSON.stringify(response.data))
            }else{Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `${response.data.message[0]}`,
              })
              nav('/Attendance')
            }

        })
    }
}, 2000);


    }
    const getUserCamera = ()=>{
        const show=document.getElementById('show')
        if(show.innerHTML==='Take a picture'){
            show.innerHTML='Capture Image'
        navigator.mediaDevices.getUserMedia({
            video:true
        })
        .then((stream) => {
            let video = VideoRef.current
            video.srcObject = stream
            video.play()
            const vica=document.getElementById('video')
            vica.style.display='block'
        })
        .catch((error)=>{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `An error occured unable to access webcam`,
              })
        })
    }else{
        show.innerHTML='Take a picture'
        navigator.mediaDevices.getUserMedia({
            video:true
        }).then(async(stream)=>{
            const videocut=VideoRef.current
            videocut.pause()
            const vic=document.getElementById('video')
            vic.style.display='none'
            const canva=document.getElementById('canvas')
            let width = 800
            let height = width/(16/9)
            let photo = PhotoRef.current
            photo.width = width
            photo.height = height
            let ctx = photo.getContext('2d')
            ctx.drawImage(videocut,0,0,photo.width,photo.height)
            let image_data_url = canva.toDataURL('image/jpeg', 1.0);
            const result=await fetch(image_data_url)
            const myblob = await result.blob()
            var file = new File([myblob],`image.${myblob.type.split('/')[1]}`, {type:'image/jpeg'})
            setImage(file)
            setFile(URL.createObjectURL(file))

        })
    }
    }
    return(
        <div className='container'>
            <h3 className='btn btn-primary mb-3 container-fluid'>
                Facial Recognition With Django & React
                </h3>
            <h2 className='text-center text-primary my-2 mx-auto'>
                Search for Employee 
                </h2>
                <div style={{display:show}} className='container-fluid'>

                <div className='mx-auto col-sm-1 col-md-1 col-lg-1'>
                <img 
                src={require('../assets/retry-icon.png')}
                className='img-responsive mx-auto'
                width='50'
                height='50'
                id='retry'
                alt='loader'
                />
                </div>

                </div>
            <div className='row'>
            <div className='col-sm-12 col-md-5 col-lg-5 mx-auto'>

            <button 
            className='container-fluid btn btn-warning my-3 mx-auto'
             id='show' 
             style={{flexDirection:'row',color:'#fff9'}}
             onClick={getUserCamera}>
                Take a picture
                </button>


            <div>
            <input
            accept='image/*'
             onChange={((e)=>{
                setImage(e.target.files[0])
                setFile(URL.createObjectURL(e.target.files[0]))
            })}
             style={{display:'none'}} 
             type='file' 
             id='file' />
            <label className='container-fluid 
            text-center
             card bg-warning
             mx-auto
              my-auto' htmlFor='file' style={{
                padding:2,
                color:'#fff',
                cursor:'pointer',
            }}>
                <div className='row'>
                <div className='col-sm-5 col-md-5 col-lg-5 mx-auto'>
                <img 
                src={require('../assets/imageicon.png')}
                alt='img'
                width='70'
                height='50'
                className='img-responsive'
                />
                </div>
                <div className='col-sm-5 col-md-5 col-lg-5 mx-auto'>
                    <h3>Gallery</h3>
                </div>
                </div>
                </label>
            </div>
            <div 
            className='container-fluid my-3 mx-3'
            style={{
                flexDirection:'row'
            }}>


            {
            fila && 
            <img src={fila}
            width='200'
            height='200'
            className='my-2
            col-sm-6 col-md-12 col-lg-5 mx-5
             img-responsive'
            alt='haha'/>
            }
           <button className='btn btn-primary container-fluid' onClick={sendimag}>send</button>
           <video 
           className='container-fluid my-2'
           id='video'
           ref={VideoRef}
            style={{
                width:'50',
                height:'50',
               
            }}
            >
           </video>
           <canvas style={{display:'none'}} id='canvas' ref={PhotoRef}></canvas>
            </div>
            </div>
            <div className='text-center col-sm-12 col-md-5 col-lg-5 mx-auto'>
                <h2 className='container-fluid'>Results</h2>
                {newimage?<img 
                src={newimage}
                alt='Not available'
                // width='200'
                height='200'
                className='rounded-circle img-responsive'
                />:<h2 className='text-center text-danger'><strong>No Image Available</strong></h2>
            }
            </div>
            </div>
        </div>
    );
}