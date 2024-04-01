import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
    import { useSelector } from 'react-redux'


const Container = styled.div`
    min-height: 100vh;
    display: flex;
    align-items: center;

    flex-direction: column;
`;

const Wrapper = styled.div`
    width: 90%;
    display: flex;
    justify-content: center;

    height: 90vh;
`;

const CardContainer = styled.div`
    background-color: rgb(248, 248, 248);
    display: flex;
    flex-direction: column;
    width: 50vw; /* Adjust width as needed */
    height: 100%; /* Take full height */
   
    align-items: center;
    margin: 20px;
    overflow: hidden;
    transition: transform 0.3s ease, background-color 0.32s ease;

      @media screen and (max-width: 480px) {
    width: 100vw;
     margin: 0px;
  }

`;

const ImageContainer = styled.div`
    padding: 10px;
    height: 85px;
    width: 85px;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background-color: #ffffff;
    margin-top: 40px; /* Adjust margin */
`;

const CardImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 50%; /* Ensure circular shape */
`;

const CardContent = styled.div`
    padding: 20px;
    text-align: center; /* Center align content */
`;

const CardTitle = styled.h3`
    font-size: 50px; /* Decrease font size */
    margin: 5px 0;
`;

const CardDescription = styled.p`
    font-size: 20px; /* Decrease font size */
    margin: 30px 0;
`;
const Company = styled.h4`
    font-size: 30px; /* Decrease font size */
   
    font-weight: bold;
    color: #0536bd;;
`;
const Skills = styled.p`
    font-size: 15px; /* Decrease font size */
    margin: 5px 0;
    margin-top: 20px;
`;


const Button2 = styled.button`

    background-color: white;
    
  color:  #1d59ff;

  padding: 6px;
  font-size: 14px;
 width: 30%;
  padding: 15px 3px; /* Add padding to the button */
  margin: 50px 10px 0 10px;
  border: 1px solid #1d59ff;;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s ease;
  
  &:hover {
      background-color:  #1d59ff;
  color: white;
  }
`;


const JobApply = () => {

    const Api_Url = "http://localhost:8080";
    const location = useLocation();
    const id = location.pathname.split('/')[2];
    const navigate = useNavigate();

    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isApplying, setIsApplying] = useState(false);

    //Redux

    const userId = useSelector((state) => (state.user.currentUser ? state.user.currentUser._id : null))


    useEffect(() => {
        const getJob = async () => {
            try {
                const response = await axios.get(`${Api_Url}/jobs/job/${id}`);
                setJob(response.data);
                // Set loading to false after data is fetched

                setLoading(false);
            } catch (error) {
                console.error('Error fetching job data:', error);
            }
        }

        getJob();
    }, [id]);

    if (loading) {
        return <p>Loading...</p>; // Display a loading message while fetching data
    }

    if (!job) {
        return <p>No job data available</p>; // Handle case when job data is null or empty
    }





    const handleApply = async () => {
        if (isApplying) return; // Prevent multiple clicks while application is in progress
        setIsApplying(true); // Set isApplying to true to disable the button

        const applyData = { userId: userId, jobId: id };

        try {
            await axios.post(`${Api_Url}/applied`, applyData);
            toast.success('Congratulations! Your Job Application Was Successful!');

            setTimeout(() => {
                navigate('/jobs');
            }, 6000); // Redirect after 5 seconds

        } catch (error) {
            console.log(error);
            toast.error('Failed to submit your application. Please try again.');
        } finally {
            setIsApplying(false); // Reset isApplying to enable the button after submission or error
        }
    };

    return (
        <Container>
            <ToastContainer />
            <Wrapper>

                <CardContainer>

                    <ImageContainer>
                        <CardImage src={job.jobLogo} alt={job.title} />
                    </ImageContainer>

                    <CardContent>
                        <CardTitle>{job.title}</CardTitle>
                        <Company>{job.company}</Company>

                        <CardDescription>{`$${job.salary}/m`}</CardDescription>
                        <Skills>
                            <b>Skills Required </b><br />
                            {job.skills.map(skill => skill).join(',')}

                        </Skills>

                        <Button2 onClick={handleApply} disabled={isApplying}>
                           Apply
                        </Button2>



                    </CardContent>
                </CardContainer>
            </Wrapper>
        </Container>
    );
}

export default JobApply;
