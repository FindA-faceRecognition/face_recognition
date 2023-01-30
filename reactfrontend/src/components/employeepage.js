import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function EmployeePage(){
    const nav=useNavigate()
    const employee=()=>{
        nav('/Addemployee')
    }
    return(
        <div className='container-fluid'>
            <div className='row'>
                <div onClick={employee} className='text-center pointer card col-sm-12 col-md-5 col-lg-3  p-3 my-3 mx-1'>
                <img src={require('../assets/add-user.png')}
                    alt='search'
                    width='200'
                    hieght='200'
                    className='img-responsive mx-auto img-thumbnail'
                    />
                    Add Employee
                </div>
                {/* <div classNatext-center me='pointer card col-sm-12 col-md-5 col5 lg-3 my-3 mx-auto'>
                    Add Employee
                </div> */}
                <div onClick={()=>nav('/ViewEmployee')} className='text-center pointer card col-sm-12 col-md-5 col-lg-3  p-3 my-3 mx-1'>
                <img src={require('../assets/profile.png')}
                    alt='search'
                    width='200'
                    hieght='200'
                    className='img-responsive mx-auto img-thumbnail'
                    />
                    View Employee online satus
                </div>
                {/* <div className='text-center pointer card col-sm-12 col-md-5 col-lg-3  p-3 my-3 mx-1'>
                <img src={require('../assets/user.png')}
                    alt='search'
                    width='200'
                    hieght='200'
                    className='img-responsive mx-auto img-thumbnail'
                    />
                    Update Employee
                </div> */}
                <div onClick={()=>nav('/DeleteEmployee')} className='text-center pointer card col-sm-12 col-md-5 col-lg-3  p-3 my-3 mx-1'>
                <img src={require('../assets/remove-user.png')}
                    alt='search'
                    width='200'
                    hieght='200'
                    className='img-responsive mx-auto img-thumbnail'
                    />
                    Remove Employee
                </div>
                <div onClick={()=>nav('/SearchEmployee')} className='text-center pointer card col-sm-12 col-md-5 col-lg-3  p-3 my-3 mx-1'>
                    <img src={require('../assets/search-profile.png')}
                    alt='search'
                    width='200'
                    hieght='200'
                    className='img-responsive mx-auto img-thumbnail'
                    />
                    Search Employee
                </div>
            </div>
        </div>
    );
}