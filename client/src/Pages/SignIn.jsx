import styled from 'styled-components';

const SignInContainer = styled.div`
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

const SignIn = () => {
    return (
        <SignInContainer>
            <Title>Sign <Span>In</Span></Title>
            <InputField type="username" placeholder="Username" />
            <InputField type="password" placeholder="Password" />
            <SubmitButton>Sign In</SubmitButton>
        </SignInContainer>
    );
};

export default SignIn;
