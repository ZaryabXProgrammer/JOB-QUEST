import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'

import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux'
import styled, { keyframes } from 'styled-components';

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

const fadeInAnimation = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
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
    animation: ${fadeInAnimation} 1.5s ease; /* Apply fade-in animation */
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
   &:disabled {
        opacity: 0.7; /* Optionally reduce opacity for disabled button */
        cursor: not-allowed;
            background-color:  #1d59ff;
  color: white;
    }
`;

const DisbButton = styled.button`
    padding: 6px;
  font-size: 14px;
 width: 30%;
  padding: 15px 3px; /* Add padding to the button */
  margin: 50px 10px 0 10px;
  border: 1px solid #1d59ff;;
  font-weight: bold;
  cursor: pointer;

  background-color:  #1d59ff;
  color: white;

     &:disabled {
        opacity: 0.7; /* Optionally reduce opacity for disabled button */
        cursor: not-allowed;
            background-color:  #1d59ff;
  color: white;
    }

`


const JobApply = () => {
   
    const Api_Url = "http://localhost:8080";
    const location = useLocation();
    const id = location.pathname.split('/')[2];
    const navigate = useNavigate();

    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);

    const [hasApplied, setHasApplied] = useState(false);

    //Redux

    const userId = useSelector((state) => (state.user.currentUser ? state.user.currentUser._id : null))
    const accessToken = useSelector((state) => (state.user.currentUser ? state.user.currentUser.accessToken : null));

    // const checkApplied = async () => {
    //     try {
    //         const res = await axios.get(`${Api_Url}/applied/find/${userId}/${id}`, {
    //             headers: {
    //                 token: accessToken
    //             },
    //             data: {
    //                 userId
    //             }
    //         });

    //         if (res.data.status === 'applied') {
    //             setHasApplied(true);
    //         } else {
    //             setHasApplied(false); // Reset hasApplied if not applied
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };


    useEffect(() => {



        
        const getJob = async () => {
            try {
                const response = await axios.get(`${Api_Url}/jobs/job/${id}`, {
                    headers: {
                        token: accessToken
                    }
                });
                setJob(response.data);
                setLoading(false);



                try {
                    const res = await axios.get(`${Api_Url}/applied/find/${userId}/${id}`, {
                        headers: { token: accessToken }

                    });

                    if (res.data.status === 'applied') {
                        setHasApplied(true);
                    } else {
                        setHasApplied(false);
                    }
                } catch (error) {
                    console.error('Error checking applied status:', error);
                }


            } catch (error) {
                console.error('Error fetching job data:', error);
            }
        };

        getJob();

    }, [id, userId, accessToken]);



    if (loading) {
        return <p>Loading...</p>; // Display a loading message while fetching data
    }

    if (!job) {
        return <p>No job data available</p>; // Handle case when job data is null or empty
    }




    const handleApply = async () => {


        const applyData = { userId: userId, jobId: id };

        try {
            await axios.post(`${Api_Url}/applied`, applyData, {

                headers: {
                    token: accessToken
                },

            });
            toast.success('Congratulations! Your Job Application Was Successful!');
            setHasApplied(true)

            setTimeout(() => {
                navigate('/jobs');
            }, 6000); // Redirect after 5 seconds

        } catch (error) {
            console.log(error);
            toast.error(`Failed .${toast.error(error.response.data.message)}`);
        }
    };

    return (
        <Container >
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

                        {hasApplied ? <DisbButton disabled >Applied</DisbButton> : <Button2 onClick={handleApply} >
                            Apply
                        </Button2>
                        }



                    </CardContent>
                </CardContainer>
            </Wrapper>
        </Container>
    );
}

export default JobApply;
