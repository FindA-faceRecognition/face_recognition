import React,{useState,useEffect} from 'react'
import axios from 'axios'
// import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
export default function UpdateEmployee() {
  const nav = useNavigate()
    const [username,setUsername] = useState('')
    // const nav=useNavigate()
    const [date_of_birth,setDate_of_birth] = useState('')
    const [image,setImage] = useState('')
    const { id }=useParams()
    useEffect(()=>{
        axios.get(`http://127.0.0.1:8000/detailpage/${id}`)
        .then((response)=>{
            setUsername(response.data.name)
            console.log(username)
           })
    },[])

    function onChange(e){
        setImage(e.target.files[0])
    }

    const senda=(e)=>{
        e.preventDefault() 
        const token=JSON.parse(localStorage.getItem('reqdata')).token
        const formdata=new FormData()
        formdata.append('name',username)
        formdata.append('date_of_birth',date_of_birth)
        formdata.append('image',image)
        formdata.append('token',token)
  
        axios.post(`http://localhost:8000/UpdateView/${id}/`,formdata,{ 
          Headers: { 
            'Content- Type': 'multipart/ form-data',
          },})
        .then((response)=>{
          if(!response.data.error){
            Swal.fire({
              icon:'success',
              title:'Employee info',
              text:'Update successful'
            })
            nav('/Employeepage')
          }else{
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Login time Expired Please Login',
            })
            nav('/Attendance')
          }
        }).catch((e)=>{
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'An Error Occured',
                })
                nav('/')
        })
    }
  return (
    <div className='container'>
        <div className='row'>
        <div className='my-5 col-sm-12 col-md-6 col-lg-4 d-flex  mx-auto card'>
      <form onSubmit={senda} encType='multipart/form-data' className='p-2 form-group'>
        <input autoComplete='new-password'  required value={username}   onChange={((e)=>setUsername(e.target.value))} className='my-2 form-control' placeholder='username'/>
        <input autoComplete='new-password'  type='datetime-local'   value={date_of_birth}   onChange={((e)=>setDate_of_birth(e.target.value))}  className='my-2 form-control' placeholder='password'/>
        <input autoComplete='new-password'   type='file' onChange={onChange} className='my-2 form-control' placeholder='Upload Image'/>
        <button className='btn btn-primary container-fluid my-2'>Send</button>
      </form>
      </div>
      </div>
    </div>
  )
}
