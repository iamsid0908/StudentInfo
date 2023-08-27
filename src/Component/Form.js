import React, { useState } from 'react'
import "./Form.css"
import axios from 'axios';

function Form({popup,setpopup}) {

    // const[data,setData]=useState({});
    const[name,setName] = useState("");
    const[phoneNo,setphone] = useState("");
    const[email,setEmail]=useState("");
    const[hobbies,setHobbie] = useState("");

    const data={
        name,phoneNo,email,hobbies
    }
    
    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
            console.log(data)
            await axios.post("https://student-siddharth.onrender.com/v1/user/createUser",data)
            setpopup(!popup)
            alert("sumitted")
        }catch(e){
            console.log(e)
            alert(e);
        }
    }
    const handleClose=()=>{
        setpopup(!popup)
    }
  return (
    <div className='model'>
        <div className='overlay' >
            <form className = 'form'>
                <label className='name-label label'>Name</label>
                <input type='text' placeholder='name' className='name-input input' onChange={(e)=>{
                    setName(e.target.value);
                }}/>

                <label className='phone-label label'>PhoneNo</label>
                <input type='number' placeholder='Phone No' className='phone-input input' onChange={(e)=>{
                    setphone(e.target.value);
                }}/>

                <label className='email-label label'>Email</label>
                <input type='email' placeholder='email' className='email-input input' onChange={(e)=>{
                    setEmail(e.target.value);
                }}/>

                <label className='label-hobbies label'>Hobbies</label>
                <input type='text' placeholder='Hobbies' className='hobbies-input input' onChange={(e)=>{
                    setHobbie(e.target.value);
                }}/>

                <button className='sub-btn' onClick={handleSubmit}>Submit</button>
                <p onClick={handleClose} className='close-btn'>X</p>

            </form>
        </div>
    </div>
  )
}

export default Form