import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styled, { keyframes } from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../Firebase";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MyLoader from "../Utils/myLoader";

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
    width: 90%;
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
const GenderFieldWrapper = styled.div`
  margin-bottom: 10px;
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
const AddButton = styled.button`
  width: 45%;
  padding: 10px;
  margin-bottom: 20px;
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
const Title2 = styled.h3`
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

const LoaderContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
  backdrop-filter: blur(8px);
`;
const spinAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const StyledLoader = styled(MyLoader)`
  animation: ${spinAnimation} 1s linear infinite;
`;

const validationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  phone: Yup.string(),
  resume: Yup.mixed().notRequired(),
  linkedIn: Yup.string().url("Invalid URL"),
  gitHub: Yup.string().url("Invalid URL"),
  gender: Yup.string()
    .oneOf(["Male", "Female", "Other"], "Invalid gender")
    .required("Gender is required"),
  address: Yup.string().notRequired(),
  education: Yup.array().of(
    Yup.object().shape({
      university: Yup.string(),
      degree: Yup.string(),
      batch: Yup.string(),
    })
  ),
  workExperience: Yup.array().of(
    Yup.object().shape({
      jobTitle: Yup.string(),
      company: Yup.string(),
      tenure: Yup.string(),
    })
  ),
  skills: Yup.array().of(Yup.string()).notRequired(),
});

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [click, setClick] = useState(false);
  const [workExperience, setWorkExperience] = useState([
    { jobTitle: "", company: "", tenure: "" },
  ]);
  const [education, setEducation] = useState([
    { institutionName: "", university: "", degree: "" },
  ]);
  const [skills, setSkills] = useState([""]);
  const Api_Url = "http://localhost:8080";
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const filename = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, filename);

    setLoading(true);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        console.error("Error uploading file:", error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          console.log("File available at", downloadURL);
          try {
            const jobData = { ...values, resume: downloadURL };

            await axios
              .post(`${Api_Url}/auth/register`, jobData)
              .then((res) => {
                toast.success(`${res.data.username} Registered Successfully`, {
                  autoClose: 3000,
                });
                setSubmitting(false);
                resetForm();
              })
              .finally(() => {
                setLoading(false);
              });

            setTimeout(() => {
              navigate("/");
            }, 3000);
          } catch (error) {
            console.log(error);
          }
        });
      }
    );
  };

  return (
    <>
      {loading ? (
        <LoaderContainer>
          <StyledLoader color="#29b89b" size={150} />
          <h1>Registering....</h1>
        </LoaderContainer>
      ) : (
        <RegisterContainer>
          <ToastContainer />
          <Title>
            <Span>Register </Span>Now
          </Title>

          <Formik
            initialValues={{
              username: "",
              email: "",
              password: "",
              phone: "",
              resume: null,
              linkedIn: "",
              gitHub: "",
              gender: "Other",
              address: "",
              workExperience: [{ jobTitle: "", company: "", tenure: "" }],
              education: [{ university: "", degree: "", batch: "" }],
              skills: [],
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <Field
                name="username"
                type="text"
                placeholder="Username"
                as={InputField}
              />
              <ErrorMessage name="username" component="div" />
              <Field
                name="email"
                type="email"
                placeholder="Email"
                as={InputField}
              />
              <ErrorMessage name="email" component="div" />
              <Field
                name="password"
                type="password"
                placeholder="Password"
                as={InputField}
              />
              <ErrorMessage name="password" component="div" />
              <Field
                name="phone"
                type="tel"
                placeholder="Phone Number"
                as={InputField}
              />
              <ErrorMessage name="phone" component="div" />
              <Field
                name="linkedIn"
                type="url"
                placeholder="LinkedIn Profile"
                as={InputField}
              />
              <ErrorMessage name="linkedIn" component="div" />
              <Field
                name="gitHub"
                type="url"
                placeholder="GitHub Profile"
                as={InputField}
              />
              <ErrorMessage name="gitHub" component="div" />
              <GenderFieldWrapper>
                <Field name="gender" as="select" placeholder="Gender">
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </Field>
              </GenderFieldWrapper>

              <ErrorMessage name="gender" component="div" />
              <Field
                name="address"
                type="text"
                placeholder="Address"
                as={InputField}
              />
              <ErrorMessage name="address" component="div" />
              <Title2>
                <Span>Work Experience </Span>
              </Title2>
              {workExperience.map((exp, index) => (
                <div key={index}>
                  <Field
                    name={`workExperience[${index}].jobTitle`}
                    type="text"
                    placeholder="Job Title"
                    as={InputField}
                  />
                  <ErrorMessage
                    name={`workExperience[${index}].jobTitle`}
                    component="div"
                  />

                  <Field
                    name={`workExperience[${index}].company`}
                    type="text"
                    placeholder="Company"
                    as={InputField}
                  />
                  <ErrorMessage
                    name={`workExperience[${index}].company`}
                    component="div"
                  />

                  <Field
                    name={`workExperience[${index}].tenure`}
                    type="text"
                    placeholder="Tenure"
                    as={InputField}
                  />
                  <ErrorMessage
                    name={`workExperience[${index}].tenure`}
                    component="div"
                  />
                </div>
              ))}
              <AddButton
                type="button"
                onClick={() =>
                  setWorkExperience([
                    ...workExperience,
                    { jobTitle: "", company: "", tenure: "" },
                  ])
                }
              >
                Add Another Work Experience
              </AddButton>

              <Title2>
                <Span>Educational Details</Span>
              </Title2>
              {education.map((edu, index) => (
                <div key={index}>
                  <Field
                    name={`education[${index}].batch`}
                    type="number"
                    placeholder="Batch"
                    as={InputField}
                  />
                  <ErrorMessage
                    name={`education[${index}].batch`}
                    component="div"
                  />

                  <Field
                    name={`education[${index}].university`}
                    type="text"
                    placeholder="University"
                    as={InputField}
                  />
                  <ErrorMessage
                    name={`education[${index}].university`}
                    component="div"
                  />

                  <Field
                    name={`education[${index}].degree`}
                    type="text"
                    placeholder="Degree"
                    as={InputField}
                  />
                  <ErrorMessage
                    name={`education[${index}].degree`}
                    component="div"
                  />
                </div>
              ))}
              <AddButton
                type="button"
                onClick={() =>
                  setEducation([
                    ...education,
                    { institutionName: "", university: "", degree: "" },
                  ])
                }
              >
                Add Another Education
              </AddButton>
              {skills.map((skill, index) => (
                <div key={index}>
                  <Field
                    name={`skills[${index}]`}
                    type="text"
                    placeholder="Skill"
                    as={InputField}
                  />
                  <ErrorMessage name={`skills[${index}]`} component="div" />
                </div>
              ))}
              <AddButton
                type="button"
                onClick={() => setSkills([...skills, ""])}
              >
                Add Another Skill
              </AddButton>
              <div>
                <GenderFieldWrapper>
                  <Label htmlFor="resume">
                    Attach Resume: <br />
                  </Label>
                </GenderFieldWrapper>

                {click ? (
                  <input
                    type="file"
                    id="file"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                ) : (
                  <Button2 onClick={() => setClick(!click)}>
                    Choose File!
                  </Button2>
                )}
              </div>

              <Agreement>
                By creating an account, I consent to the processing of my
                personal data in accordance with the <b>PRIVACY POLICY.</b>
              </Agreement>
              <SubmitButton disabled={loading} type="submit">
                Register
              </SubmitButton>
            </Form>
          </Formik>
        </RegisterContainer>
      )}
    </>
  );
};

export default RegisterPage;
