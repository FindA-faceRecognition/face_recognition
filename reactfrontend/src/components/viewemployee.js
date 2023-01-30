import React,{useEffect,useRef,useState} from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import { Link, useNavigate } from "react-router-dom";
export default function ViewEmployee(){
    const [employee,setEmployee]=useState(null)
    const [attenance,setAttenance]=useState(null)
    var naerous=useRef('no time recorded')
    const lista=[]
    var count=0
    const nav=useNavigate()
    useEffect(()=>{
        axios.get('http://127.0.0.1:8000/viewEmployee/')
        .then((response)=>{
            // console.log(response.data.attenanceserials)
            setEmployee(response.data.EmpSerializer)
            setAttenance(response.data.attenanceserials)
            console.log(response.data.attenanceserials)
        })
    },[])
        return(
            <div className="container">
                <Link className="btn btn-primary container-fluid" to='/viewALL'>View all Employee Sign ins</Link>
                <div className="row">
                    {
                    attenance?
                    attenance.map((number) =>
                      <div className="card col-sm-12 col-md-5 col-lg-4 mx-auto my-2" key={number.id}>
                            <p style={{display:'none'}}>{count=0}</p>
                        {employee?employee.map((items)=>(
                            <div key={items.id}>
                                {(((((number.name)
                            .toString()).
                            split(' '))
                            .slice(1,number.length))
                            .join(' '))===items.name?
                            <div>
                                <p style={{display:'none'}}>{count+=1}</p>
                                {count>0?
                                    <div key={items.id}>
                            <a className="text-center mx-5" target='_blank' rel="noreferrer" href={`http://127.0.0.1:8000/static/images/${(items.image).toString().split('images').toString().substring(5)}`}>
                            <img
                            className="rounded-circle img-responsive img-thumbnail mx-5 my-2"
                            src={`http://127.0.0.1:8000/static/images/${(items.image).toString().split('images').toString().substring(5)}`}
                            alt={`${number.name}`}
                            width='50%'
                            height='20vh'
                            />
                            </a>
                    <h2 className="text-center">
                        <b>{items.name}</b>
                    </h2>
                    <div className="my-2 mx-auto" style={{flexDirection:'row'}}>
                    <div  style={{display:'block',marginInline:20}}>
                    <div className="text-center">
                                
                                <img 
                    src={require('../assets/greendot.jpg')}
                    className="rounded-circle img-responsive"
                    alt='active'
                    width='20'
                    />
                    <p style={{display:'inline',marginInline:20}}>Present</p>
                            <p>
                               Time recorded: {number.Time}
                                </p>
                                </div>
                        </div>
                        </div>
                                </div>
                                :''}
                            </div>
                            :''}
                            </div>
                        )):''}
                        </div>
                      ):''
                    }
                </div>
            </div>
        );
}