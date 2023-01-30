import React,{useState} from 'react'
import axios from 'axios'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'
export default function Attendance() {
    const [username,setUsername] = useState('')
    const nav=useNavigate()
    const [password,setPassword] = useState('')
    const senda=(e)=>{
        e.preventDefault()
        const value={
            username:username,
            password:password,
        }
        axios.post('http://localhost:8000/index/',value)
        .then((response)=>{
          if(response.data){
            localStorage.setItem('reqdata',JSON.stringify(response.data))
            if(response.data.message)
            {
            nav('/Employeepage')
          }else{
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: `${response.data.error}`,
            })
            nav('/Attendance')
          }
          }
        })
    }
  return (
    <div className='container'>
        <div className='row'>
        <div className='my-5 col-sm-12 col-md-6 col-lg-4 d-flex  mx-auto card'>
      <form onSubmit={senda} className='p-2 form-group'>
        <input value={username}   onChange={((e)=>setUsername(e.target.value))} className='my-2 form-control' placeholder='username'/>
        <input  value={password}  type='password'  onChange={((e)=>setPassword(e.target.value))}  className='my-2 form-control' placeholder='password'/>
        <button className='btn btn-primary container-fluid my-2'>Send</button>
      </form>
      </div>
      </div>
    </div>
  )
}
