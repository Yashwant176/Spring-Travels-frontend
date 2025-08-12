import React, {use, useState} from 'react'
import axios from 'axios'

const RegisterForm = () => {
    const [form, setForm] = useState({
        username:'', email:'', password:''
    })
    const[ message, setMessage] = useState('')

    const handleChange =(e)=>{
        setForm({...form, [e.target.name]: e.target.value})
    }

    const handleSubmit =async(e)=>{
        e.preventDefault()
        try {
            await axios.post('http://localhost:8000/api/register/', form);
            setMessage('Registration successful')
        } catch (error) {
            setMessage("Regestration failed", + (error.response?.data?.username || error.message))
        }
    }

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <div>
                <label>Username</label>
                <input type="text" name='username' value={form.username} onChange={handleChange}/><br/>
                <label>Email</label>
                <input type="email" name='email' value={form.email} onChange={handleChange}/><br/>
                <label>Password</label>
                <input type="password" name='password' value={form.password} onChange={handleChange}/><br/>
                <button type = 'submit'>Register</button>
            {message && <p>{message}</p>}
            </div>
        </form>
      
    </div>
  )
}

export default RegisterForm
