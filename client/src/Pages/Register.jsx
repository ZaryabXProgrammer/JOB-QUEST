import styled from 'styled-components';

const RegisterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  justify-content: center;
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

const Label = styled.label`
  margin-bottom: 5px;
`

const RegisterPage = () => {
    return (
        <RegisterContainer>
            <Title> <Span>Register </Span>Now</Title>
            <InputField type="text" placeholder="Username" />
            <InputField type="email" placeholder="Email" />
            <InputField type="password" placeholder="Password" />
            <InputField type="tel" placeholder="Phone Number" />
            <Label htmlFor="resume">Attach Resume:</Label>
            <InputField id="resume" type="file" accept=".pdf,.doc,.docx" placeholder="Attach Resume" />
            <SubmitButton>Register</SubmitButton>
        </RegisterContainer>
    );
};

export default RegisterPage;
