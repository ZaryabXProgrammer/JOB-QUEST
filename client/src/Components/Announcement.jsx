import styled from "styled-components"

const Container = styled.div`
    height: 30px;
    background-color: black;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: bold;
    @media (max-width: 768px) { /* Adjust styles for tablet */
        height: 50px;
        font-size: 12px;
    }

    @media (max-width: 480px) { /* Adjust styles for mobile */
        height: 70px;
        font-size: 10px;
    }
`





const Announcement = () => {
  return (
    <Container>
      
         JOB QUEST - YOUR ULTIMATE JOB SEARCH PLATFORM


    </Container>
  )
}

export default Announcement
