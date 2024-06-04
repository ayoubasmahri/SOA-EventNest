import { useState } from "react"
import axios from 'axios'
import {toast} from 'react-hot-toast'
import { useNavigate } from "react-router-dom"
import './style.css'
import { Link } from 'react-router-dom';


export default function Login() {

  const  navigate = useNavigate()
  const [data, setData] = useState({
    email: '',
    password: '',
  })

  const loginUser = async (e) => {
    e.preventDefault()
    const {email, password} = data 
    try {
      const {data} = await axios.post('/login', {
        email, 
        password
      })
      if(data.error){
        toast.error(data.error)
      } else {
        setData({})
        navigate('/Home')
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
        <div>Login</div>
        </div>
       <br />
       <div className={'inputContainer'}>
            <input type='email' placeholder='Enter your email here' value={data.email} onChange={(e) => setData({...data, email: e.target.value})} className={'inputBox'} />
            </div>
            <br />
            <div className={'inputContainer'}>
            <input type='password' placeholder='Enter your password here' value={data.password} onChange={(e) => setData({...data, password: e.target.value})} className={'inputBox'}/>
            </div>
            <br />
            <div className={'inputContainer'}>
            <input className={'inputButton'} type="button" value={'Log in'} onClick={loginUser} />
      </div>
      <div style={{ marginTop: '10px' }}>
          <Link to="/register" style={{ textDecoration: 'none', color: 'blue' }}>
            Don't have an account? Register here.
          </Link>
        </div>
    </div>
        </form>
    </div>
  )
}
