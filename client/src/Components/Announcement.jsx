import styled from "styled-components";
import { mobile, tablet } from '../Responsive'; // Import your media query functions from the appropriate file

const Container = styled.div`
    height: 30px;
    background-color: black;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: bold;

    /* Apply responsive font size adjustments */
    // ${mobile`
    //     font-size: 6px;
         
    // `}
    // ${tablet`
    //     font-size: 16px;
    // `}

    @media (max-width: 768px) { /* Adjust styles for tablet */
        height: 25px;
        font-size: 12px;
     }
     @media (max-width: 480px) { /* Adjust styles for mobile */
         height: 20px;
         font-size: 10px;
    }
    
`;

const Announcement = () => {
    return (
        <Container>
            JOB QUEST - YOUR ULTIMATE JOB SEARCH PLATFORM
        </Container>
    );
};

export default Announcement;