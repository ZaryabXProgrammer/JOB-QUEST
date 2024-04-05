import { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux"
import { loginFailture, loginStart, loginSuccess } from '../Redux/userSlice';


const fadeInAnimation = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

const SignInContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  justify-content: center;
      animation: ${fadeInAnimation} 0.6s ease; /* Apply fade-in animation */
`;

const InputField = styled.input`
  width: 30%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box; /* Ensure padding and border are included in the width */
`;

const SubmitButton = styled.button`
 width: 30%;
  padding: 10px;
  background-color: #3067ff;;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const Title = styled.h1`
 color: #3067ff;
margin-bottom: 20px;
`

const Span = styled.span`
color: black;
`

const SignIn = () => {
  const navigate = useNavigate();

  const Api_Url = "http://localhost:8080";
  const [username, setusername] = useState('')
  const [password, setpassword] = useState('')


  //Redux

  const dispatch = useDispatch()


  const handleClick = async (e) => {

    e.preventDefault();
    dispatch(loginStart())
    try {
      const res = await axios.post(`${Api_Url}/auth/login`, { username, password })
      dispatch(loginSuccess(res.data));
      toast.success(`${res.data.username} Logged In Successfully`, {
        autoClose: 3000
      });
      setTimeout(() => {
        navigate('/');
      }, 3000); // Redirect after 5 seconds



    } catch (error) {
      console.log(error)
      dispatch(loginFailture());
      toast.error('Wrong Username or Password');
    }
  }

  return (
    <SignInContainer>
      <ToastContainer />
      <Title>Sign <Span>In</Span></Title>
      <InputField type="username" name='username' placeholder="Username" onChange={(e) => setusername(e.target.value)} />
      <InputField type="password" name='password' placeholder="Password" onChange={(e) => setpassword(e.target.value)} />
      <SubmitButton onClick={handleClick} >Sign In</SubmitButton>
    </SignInContainer>
  );
};

export default SignIn;
