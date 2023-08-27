import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import "./Home.css"
import Form from './Form';
import Updateform from './Updateform';

function Home() {

  // all importtant states
  const [data,setData] = useState([]);
  const [popup,setpopup] = useState(false);
  const [Updateformm,setUpdateformm] = useState(false);
  const [userIds,setUserIds] = useState([]);
  const[userId,setoneUserIds]=useState("");
  const [name,setName]=useState("")
  const [phoneNo,setPhoneno]=useState("")
  const [email,setEmail]=useState("");
  const [hobbies,setHobbie]=useState("");

  // useEffect hooks call
  useEffect(() => {
    fetchData();
  }, [data])
  
  // fetching all the user data
  const fetchData = async () => {
    try {
      const response = await axios.get('https://student-siddharth.onrender.com/v1/user/getAllUsers');
      setData(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      return;
    }
  };

  
  const toggle=()=>{
    setpopup(!popup);
  }
    const handleUpdate = (name,phoneNo,email,hobbies,id)=>{
    setName(name)
    setPhoneno(phoneNo)
    setEmail(email)
    setHobbie(hobbies)
    setoneUserIds(id)
    // console.log(name + phoneNo+ email+ hobbies)
    setUpdateformm(!Updateformm);
    
  }

  // this function help you send emails
   const handleEmail = async()=>{
    try{
      if(userIds.length===0){
        alert("plese add some element")
        return;
      }
      const response = await axios.post("https://student-siddharth.onrender.com/v1/user/sendemail",userIds,{
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (response.status === 200) {
      console.log('Email sent successfully!');
      alert("Email sent successfully!!")
      window.location.reload(true);

    } else {
      console.error('Failed to send email.');
    }
    }catch(error){
      alert(error)
      console.error('An error occurred while sending the email:', error);

    }
  }

  const handleUserDelete = async(id)=>{
    try{
      const response = await axios.delete(`https://student-siddharth.onrender.com/v1/user/deleteUsers/${id}`)
      console.log(response);
      alert("deleted")
      // window.location.reload(true);
    }catch(e){
      console.log(e);
      alert("something went wrong")
      window.location.reload(true);
    }
  }
 
  return (
    <div className ='container'>
    <table className='table'>
      
      <div className='header'>
        <div className='head'>Select</div>
        <div className='head'>ID</div>
        <div className='head'>Name</div>
        <div className='head1'>phone NO.</div>
        <div className='head1'>Email</div>
        <div className='head'>Hobbies</div>
        <div className='head'>Update</div>
        <div className='head'>Delete</div>
       
      </div>
      
      <div className='rows'>
        {data.map((item,index) => (
          
            <div key = {item._id} className='singlerow'>
              <div className='fetchData'>
              <input type="checkbox" className='head check' name="check" onClick={(e)=>{
                setUserIds(prevUserIds => [...prevUserIds, item._id]);
              }}/>
                <div className='head'>{index+1}</div>
                <div className='head'>{item.name}</div>
                <div className='head1'>{item.phoneNo}</div>
                <div className='head1'>{item.email}</div>
                <div className='head'>{item.hobbies}</div>
                <button className='update-btn ' onClick={()=>handleUpdate(item.name,item.phoneNo,item.email,item.hobbies,item._id)} >Update</button>
                <button className='delete-btn ' onClick={()=>handleUserDelete(item._id)}>Delete</button>
              </div>
            </div>
        ))}
      </div>
    </table>
    <div>
    <button className ="add-btn" onClick={toggle}>ADD</button>
    <button className='send-btn' onClick={handleEmail}>SEND</button>
    </div>
    

  {Updateformm &&(
    <div>
    <Updateform name={name} phoneNo={phoneNo} email={email} hobbies={hobbies}userId={userId}  Updateformm= {Updateformm} setUpdateformm = {setUpdateformm}/>
    </div>
  )}
    
  
    


    {popup &&(
    <div>
      <Form popup={popup} setpopup={setpopup} />
    </div>
    )}
  </div>
  )
}

export default Home