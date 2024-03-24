
import styled from 'styled-components';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useState } from 'react';

const ParentContainer = styled.div`
  background-image: url('./newjobs.jpg'); /* Directly specify a placeholder image */
  background-size: cover;
  background-position: center;
  height: 100vh; /* Adjust the height as needed */
  display: flex;
  justify-content: center;
  align-items: center;
`;


const CreateJobContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; /* Center the content vertically */
  padding: 20px;
  background-image: url('path_to_your_background_image.jpg'); /* Add the background image */
  background-size: cover; /* Cover the entire container */
  background-repeat: no-repeat; /* Do not repeat the background image */

  @media (min-width: 768px) {
    width: 70%;
    margin: 0 auto;
  }
`;

const InputFieldContainer = styled.div`
  width: 100%; /* Fixed width for the input field container */
  max-width: 400px; /* Maximum width for better responsiveness */
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
  margin-top: 10px;
`;

const Title = styled.h1`

  margin-bottom: 20px;
`;

const Span = styled.span`
  color: #3067ff;
`

const StyledLabel = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
  margin-right: 10px;
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
    background-color:#2660ff;

    color: white;
    
  
  }
`


const CreateJob = () => {

  const [click, setclick] = useState(false)

  const validationSchema = Yup.object({
    title: Yup.string().min(5).max(30).required('Job Title is required'),
    description: Yup.string().min(5).max(50).required('Job Description is required'),
    company: Yup.string().required('Company name is required'),
    applicants: Yup.number().min(0),
    jobType: Yup.string().required('Job type is required'),
    workLocation: Yup.string().required('Work location is required'),
    experience: Yup.string().required('Experience level is required'),
    salary: Yup.number().min(0).required('Salary is required'),
    jobLocation: Yup.string().required('Job location is required'),
    skills: Yup.string().required('Skills are required'),
    jobLogo: Yup.string(),
  });

  const Api_Url = "http://localhost:8080";

  const handleSubmit = async (values) => {

    try {
      await axios.post(`${Api_Url}/jobs`, values).then(() => alert("Job Created"))

    } catch (error) {
      console.error('Error saving job listing:', error);
      throw error;
    }
  };

  const initialValues = {
    title: '',
    description: '',
    company: '',
    applicants: 0, // Default value from mongoose schema
    jobType: '',
    workLocation: '',
    experience: '',
    salary: 0, // Default value from mongoose schema
    jobLocation: '',
    skills: '',
    jobLogo: ''// Default value from mongoose schema
  };
  return (


    <ParentContainer>
      <CreateJobContainer>
        <Title>Create New <Span>Job</Span> </Title>
        <InputFieldContainer>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>

              <Field as={InputField} type="text" name="title" placeholder="Job Title" />
              <ErrorMessage name="title" component="div" />

              <Field as={InputField} type="text" name="description" placeholder="Job Description" />
              <ErrorMessage name="description" component="div" />

              <Field as={InputField} type="text" name="company" placeholder="Company" />
              <ErrorMessage name="company" component="div" />

              <Field as={InputField} type="number" name="applicants" placeholder="Number of Applicants" />
              <ErrorMessage name="applicants" component="div" />

              <Field as={InputField} type="text" name="jobType" placeholder="Job Type (Full-Time, Internship ..)" />
              <ErrorMessage name="jobType" component="div" />

              <Field as={InputField} type="text" name="workLocation" placeholder="Work Location (OnSite, Remote, Hybrid)" />
              <ErrorMessage name="workLocation" component="div" />

              <Field as={InputField} type="text" name="experience" placeholder="Experience Level (Fresher, Beginner, Intermediate, Expert)" />
              <ErrorMessage name="experience" component="div" />

              <Field as={InputField} type="number" name="salary" placeholder="Salary" />
              <ErrorMessage name="salary" component="div" />

              <Field as={InputField} type="text" name="jobLocation" placeholder="Job Location" />
              <ErrorMessage name="jobLocation" component="div" />
              {/* 
                    <Label htmlFor="jobSkills">Skills Required:</Label> */}
              <Field as={InputField}
                id="jobSkills"
                type="text"
                name="skills"
                placeholder="Enter skills separated by commas"

              />

              <ErrorMessage name="skills" component="div" />

              <StyledLabel htmlFor="jobLogo">Company Logo:</StyledLabel>



              {/* <ErrorMessage name="jobLogo" component="div" />
              {click ? (
                <Field as={InputField} type="file" name="jobLogo" id="jobLogo" accept="image/*" />
              ) : (
                <Button2 onClick={() => setclick(!click)}>Choose File!</Button2>
              )} */}

              <SubmitButton type="submit">Create Job</SubmitButton>
            </Form>
          </Formik>
        </InputFieldContainer>
      </CreateJobContainer>
    </ParentContainer>
  );
};

export default CreateJob;
