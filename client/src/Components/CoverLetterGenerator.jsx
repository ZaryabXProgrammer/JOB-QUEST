import { useContext, useEffect, useState } from 'react';
import htmlToPdfmake from 'html-to-pdfmake';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';
import { JobsContext } from '../Helpers/JobContext';
import Lottie from 'lottie-react';
import loadingScreen from '../assets/Lottie Icons/loadingScreen.json'

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const Container = styled.div`
    margin: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;

    
`;

const Wrapper = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
    height: 100vh;
    width: 100vw;
    margin: 10px;
    padding: 10px;
`;

const Left = styled.div`
width: 100%;
    flex: 1;
    padding: 20px;
   
`;

const Right = styled.div`
    flex: 1;
    padding: 20px;
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 600px;
    margin: 0 auto; /* Center the form horizontally */
`;

const Label = styled.label`
    margin-bottom: 5px; /* Adjust margin to create space below the label */
    font-weight: bold;
    margin-right: 1px;
    flex: 1;
    text-align: center;
`;

const Input = styled.input`
    padding: 10px;
    margin-bottom: 15px; /* Increase bottom margin for spacing between fields */
    border: 2px solid #007bff;
    border-radius: 5px;
    font-size: 16px;
    flex: 2;
    &:focus {
        outline: none;
        border-color: #0056b3;
    }
`;

const InputBox = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 15px; /* Add bottom margin for spacing between input boxes */
`;

const MessageBox = styled.div`
    display: flex;
    align-items: flex-start;
    margin-bottom: 15px; /* Add bottom margin for spacing between input boxes */
`;

const Textarea = styled.textarea`
    padding: 10px;
    border: 2px solid #007bff;
    border-radius: 5px;
    font-size: 16px;
    resize: vertical; /* Allow vertical resizing of textarea */
    min-height: 200px; /* Set a minimum height for the textarea */
    flex: 2;
    &:focus {
        outline: none;
        border-color: #0056b3;
    }
`;

const Button = styled.button`
    padding: 10px 20px;
    margin-top: 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    &:hover {
        background-color: #0056b3;
    }
`;
const coverLetterAnimation = keyframes`
    from { opacity: 0; }
    to { opacity: 1; }
`;

const CoverLetterPreview = styled.div`
    border: 2px solid #007bff;
    padding: 20px;
    max-width: 800px;
    margin: 1px auto;
    font-family: Arial, sans-serif;
    animation: ${coverLetterAnimation} 2s ease-in-out;
`;


const SocialIcon = styled(Lottie)`
  width: 410px;
  height: 410px;
  margin-top: 20px;
  border-radius: 50%;
  margin: 0 auto;

  @media (max-width: 768px) {
    width: 200px;
    height: 200px;
    margin-right: 0;
  }

  @media (max-width: 480px) {
    width: 150px;
    height: 150px;
  }
`;

const CoverLetterGenerator = () => {

    const { jobDescription, resumeTextContent, jobDetails } = useContext(JobsContext)

    const baseUrl = import.meta.env.VITE_baseUrl

    const [coverLetter, setcoverLetter] = useState(null)

    const [loading, setloading] = useState(false)

    useEffect(() => {

        setloading(true)
        const getCoverLetter = async () => {


        try {
           
                const response = await axios.post(`${baseUrl}/coverLetter/generateCoverLetter`, {
                    jobDescription: jobDescription,
                    resume: resumeTextContent
                })
                setcoverLetter(response.data.coverLetter)

            if (response.data.coverLetter) {
                setloading(false)
            }
         


       


            } catch (error) {
                console.log(error)
            }
       
            
        }

        getCoverLetter();

        

    }, [jobDescription, resumeTextContent])
    

    const [formData, setFormData] = useState({
        name: '',
        address: '',
        email: '',
        company: '',
        jobTitle: '',
        coverLetter: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const generatePDF = () => {
        const coverLetterHTML = `
            <div style="border: 2px solid #007bff; padding: 20px; max-width: 800px; margin: auto;">
                <h1 style="text-align: center; font-weight: bold; text-decoration: underline; color: #007bff;">Cover Letter</h1>
                <p>${new Date().toLocaleDateString()}</p>
                <p>${formData.name}</p>
                <p>${formData.address}</p>
                <p>${formData.email}</p>
                <br />
                <p>${jobDetails.company}</p>
                <p>${jobDetails.jobTitle}</p>
                <br />
                <p>${coverLetter}</p>
                <br />
                <p>Sincerely,</p>
                <p>${formData.name}</p>
            </div>
        `;

        const pdfContent = htmlToPdfmake(coverLetterHTML);

        const docDefinition = {
            pageSize: 'A4',
            content: pdfContent,
            defaultStyle: {
                font: 'Roboto'
            },
            styles: {
                header: {
                    fontSize: 22,
                    bold: true,
                    margin: [0, 8, 0, 8],
                    alignment: 'center'
                },
                subheader: {
                    fontSize: 18,
                    bold: true,
                    margin: [0, 8, 0, 5]
                },
                normalText: {
                    fontSize: 12,
                    margin: [0, 5, 0, 5]
                },
                pageBackground: {
                    fillColor: '#23c8ff' // Light blue background color
                }
            }
        };

        pdfMake.createPdf(docDefinition).download('cover_letter.pdf');
    };

    console.log(coverLetter)

    return (
        <Container>


            <h1>Generate Cover Letter</h1>

            <Wrapper>

                <Left>
                    <Form>
                        <InputBox>
                            <Label >Name:</Label>
                            <Input type="text" name="name" value={formData.name} onChange={handleChange} />
                        </InputBox>
                        <InputBox>
                            <Label>Address:</Label>
                            <Input type="text" name="address" value={formData.address} onChange={handleChange} />
                        </InputBox>
                        <InputBox>
                            <Label>Email:</Label>
                            <Input type="email" name="email" value={formData.email} onChange={handleChange} />
                        </InputBox>
                        <InputBox>
                            <Label>Company:</Label>
                            <Input type="text" name="company" value={jobDetails.company} onChange={handleChange} />
                        </InputBox>
                        <InputBox>
                            <Label>Job Title:</Label>
                            <Input type="text" name="jobTitle" value={jobDetails.jobTitle} onChange={handleChange} />
                        </InputBox>
                        <MessageBox>
                            <Label>Cover Letter:</Label>
                            <Textarea name="coverLetter" value={coverLetter} onChange={(e) => setcoverLetter(e.target.value)}></Textarea>
                        </MessageBox>
                        <Button type="button" onClick={generatePDF}>Download PDF</Button>
                    </Form>
                </Left>

                <Right>

                     
                    {loading ? <SocialIcon animationData={loadingScreen} /> : (<CoverLetterPreview>
                        <h1 style={{ textAlign: 'center' }}>Cover Letter Preview</h1>
                        <p>{new Date().toLocaleDateString()}</p>
                        <p>{formData.name}</p>
                        <p>{formData.address}</p>
                        <p>{formData.email}</p>
                        <br />
                        <p>{jobDetails.company}</p>
                        <p>{jobDetails.jobTitle}</p>
                        <br />
                        <p>{coverLetter}</p>
                        <br />
                        <p>Sincerely,</p>
                        <p>{formData.name}</p>
                    </CoverLetterPreview>)}

                   

                </Right>


            </Wrapper>

        </Container>
    );
};

export default CoverLetterGenerator;
