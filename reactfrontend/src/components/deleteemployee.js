import React,{useEffect,useState} from "react";
import axios from "axios";
import Swal from 'sweetalert2';
export default function DeleteEmployee(){
    const [employee,setEmployee]=useState(null)
    useEffect(()=>{
        axios.get('http://127.0.0.1:8000/viewEmployee/')
        .then((response)=>{
            // setAttendance(response.data.attenance)
            setEmployee(response.data.EmpSerializer)
        })
    },[employee])
    function deletion(id){
        const req=localStorage.getItem('reqdata')
        const token=JSON.parse(req).token
        const formdata=new FormData()
        formdata.append('token',token)
        axios.post(`http://127.0.0.1:8000/DeleteView/${id}/`,formdata)
        .then((response)=>
        {
            Swal.fire({
                icon: 'success',
                title: 'Operation Successful',
                text: 'Employee Details Deleted',
              })
        }).catch((e)=>{
            Swal.fire({
                icon: 'error',
                title: 'Operation Incomplete',
                text: 'Something went wrong',
              })
        })
    }
        return(
            <div className="container">
                <h2 className="btn btn-danger mb-2 container-fluid">Delete Employee Info</h2>
                <div className="row">
                    {employee?employee.map((person) => (
                        <div className="card col-sm-12 col-md-4 col-lg-4 mx-auto my-2" key={person.id}>
                            <a className="text-center mx-auto" target='_blank' rel="noreferrer" href={`http://127.0.0.1:8000/static/images/${(person.image).toString().split('images').toString().substring(5)}`}>
                            <img
                            className="rounded-circle img-responsive img-thumbnail mx-auto"
                            src={`http://127.0.0.1:8000/static/images/${(person.image).toString().split('images').toString().substring(5)}`}
                            alt='halal' 
                            width='50%'
                            height='20vh'
                            />
                            </a>
                    <h2 className="text-center">
                        <b>{person.name}</b>
                    </h2>
                    <button onClick={()=>deletion(person.id)} className="btn btn-danger my-2 col-sm-12 col-md-7 col-lg-7 mx-auto">Delete {person.name}'s Info</button>
                    </div>
                    )):''}
                </div>
            </div>
        );
}