import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styled, { keyframes } from 'styled-components'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from '../Firebase';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const fadeInAnimation = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

const RegisterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  justify-content: center;
  width: 30%;
  margin: 0 auto;
    animation: ${fadeInAnimation} 0.6s ease;


  @media (max-width: 768px) {
    width: 100%;
  }
`;

const InputField = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box; /* Ensure padding and border are included in the width */
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #3067ff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const Title = styled.h1`
  color: #3067ff;
  margin-bottom: 20px;
`;

const Span = styled.span`
  color: black;
`;

const Label = styled.label`
  margin-bottom: 5px;
`;

const Agreement = styled.div`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button2 = styled.button`
  padding: 8px;
  font-size: 14px;
  background-color: transparent;
  border: 1px solid #ccc;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s ease;
    
  &:hover {
    background-color: #2660ff;
    color: white;
  }
`;

const validationSchema = Yup.object({
  username: Yup.string().required('Username is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
  phone: Yup.string(),
  resume: Yup.mixed().notRequired(),
});

const RegisterPage = () => {
  const [file, setFile] = useState(null);
  const [click, setClick] = useState(false);
  const Api_Url = "http://localhost:8080";
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const filename = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, filename);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      },
      (error) => {
        console.error('Error uploading file:', error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          console.log('File available at', downloadURL);
          try {
            const jobData = { ...values, resume: downloadURL };

            await axios.post(`${Api_Url}/auth/register`, jobData).then((res) => {
              alert(res.data.username + "Registered")
              toast.success(`${res.data.username} Registered Successfully`, {
                autoClose: 3000
              });
              setSubmitting(false);
              resetForm();
            })
            setTimeout(() => {
              navigate('/');
            }, 3000); // Redirect after 5 seconds

            

          } catch (error) {
            console.log(error);
          }



         

        });
      }
    );
  };

  return (
    <RegisterContainer>

      <ToastContainer />
      <Title>
        <Span>Register </Span>Now
      </Title>

      

      <Formik
        initialValues={{
          username: '',
          email: '',
          password: '',
          phoneNumber: '',
          resume: null,
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <Field name="username" type="text" placeholder="Username" as={InputField} />
          <ErrorMessage name="username" component="div" />
          <Field name="email" type="email" placeholder="Email" as={InputField} />
          <ErrorMessage name="email" component="div" />
          <Field name="password" type="password" placeholder="Password" as={InputField} />
          <ErrorMessage name="password" component="div" />
          <Field name="phone" type="tel" placeholder="Phone Number" as={InputField} />
          <ErrorMessage name="phone" component="div" />
          <Label htmlFor="resume">Attach Resume: <br /></Label>
          {click ? (
            <input type="file" id="file" onChange={(e) => setFile(e.target.files[0])} />
          ) : (
            <Button2 onClick={() => setClick(!click)}>Choose File!</Button2>
          )}
          <Agreement>
            By creating an account, I consent to the processing of my personal data in accordance with the{' '}
            <b>PRIVACY POLICY.</b>
          </Agreement>
          <SubmitButton type="submit">Register</SubmitButton>
        </Form>
      </Formik>
    </RegisterContainer>
  );
};

export default RegisterPage;
