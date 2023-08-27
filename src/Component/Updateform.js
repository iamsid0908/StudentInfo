import axios from 'axios';
import React,{useState,useEffect} from 'react'

function Updateform({name,phoneNo,email,hobbies,userId,Updateformm,setUpdateformm}) {


    const[namee,setNamee] = useState(name);
    const[phoneNoo,setphonee] = useState(phoneNo);
    const[emaill,setEmaill]=useState(email);
    const[hobbiess,setHobbiee] = useState(hobbies);

    const userData={
        userId,
        data : {
        name:namee,
        phoneNo:phoneNoo,
        email:emaill,
        hobbies:hobbiess
        }
    }
    useEffect(() => {
    }, [])
    const handleUpdateSubmit = async (e)=>{
        
       try{
        await axios.put("https://student-siddharth.onrender.com/v1/user/updateUsers",userData);
        alert("sumitted")
       }catch(e){
        console.log(e)
        alert(e);
       }

    }

   
    const handleX=()=>{
        setUpdateformm(!Updateformm)
    }

  return (
    <div className='model'>
        <div className='overlay' >
            <form className = 'form'>
                <label className='name-label label'>Name</label>
                <input type='text' placeholder={name} className='name-input input' onChange={(e)=>{
                    setNamee(e.target.value);
                }}/>

                <label className='phone-label label'>PhoneNo</label>
                <input type='number' placeholder={phoneNo} className='phone-input input' onChange={(e)=>{
                    setphonee(e.target.value);
                }}/>

                <label className='email-label label'>Email</label>
                <input type='email' placeholder={email} className='email-input input' onChange={(e)=>{
                    setEmaill(e.target.value);
                }}/>

                <label className='label-hobbies label'>Hobbies</label>
                <input type='text' placeholder={hobbies} className='hobbies-input input' onChange={(e)=>{
                    setHobbiee(e.target.value);
                }}/>

                <button className='sub-btn' onClick={(e)=>{handleUpdateSubmit(e)}}>Submit</button>
                <p  className='close-btn' onClick={handleX}>X</p>

            </form>
        </div>
    </div>
  )
}

export default Updateform