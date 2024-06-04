import { useState } from "react"
import axios from 'axios'
import {toast} from 'react-hot-toast'
import { useNavigate } from "react-router-dom"
import './style.css'


export default function Register() {
  const navigate = useNavigate()
  const [data, setData] =useState({
    name: '',
    email: '',
    password: '',
  })

  const registerUser = async (e) => {
    e.preventDefault()
    const {name, email, password} = data
    try {
      const {data} = await axios.post('/register', {
        name, email, password
      })
      if (data.error) {
        toast.error(data.error)
      } else {
        setData({})
        toast.success('Login Successful. Welcome !')
        navigate('/')
      }
    } catch (error) {
      console.log(error)
    }
  }
  
  return (
    <div>
        <form >
        <div className={'mainContainer'}>
        <div className={'titleContainer'}>
        <div>Register</div>
        </div>
        <br />
        <div className={'inputContainer'}>
            <input type='text' placeholder='Enter your name here' value={data.name} onChange={(e) => setData({...data, name: e.target.value})} className={'inputBox'} />
            </div>
            <br />
            <div className={'inputContainer'}>
            <input type='email' placeholder='Enter your email here' value={data.email} onChange={(e) => setData({...data, email: e.target.value})} className={'inputBox'} />
            </div>
            <br />
            <div className={'inputContainer'}>
            <input type='password' placeholder='Enter your password here' value={data.password} onChange={(e) => setData({...data, password: e.target.value})} className={'inputBox'} />
            </div>
            <br />
            <div className={'inputContainer'}>
            <input className={'inputButton'} type="button" value={'Register'} onClick={registerUser} />
            </div>
        </div>
        </form>
    </div>
  )
}
