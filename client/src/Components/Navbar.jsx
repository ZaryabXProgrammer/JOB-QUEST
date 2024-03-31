import styled from 'styled-components';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Container = styled.div`
  color: ${({ isNavbar }) => (isNavbar ? 'white' : 'black')};
  background: ${({ isNavbar }) =>
    isNavbar
      ? 'linear-gradient(90deg, rgba(26,41,189,1) 24%, rgba(0,0,0,1) 100%, rgba(9,9,133,1) 100%, rgba(0,212,255,1) 100%)'
      : 'white'};
  height: ${({ isNavbar }) => (isNavbar ? '60px' : 'auto')};
`;
const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 480px) {
    padding: 10px;
  }
`;

const Left = styled.div`
  flex: 2;
  display: flex;
  align-items: center;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
  display: flex;
  justify-content: center;

  @media (max-width: 480px) {
    display: none; /* Hide Center content on mobile */
  }
`;

const Logo = styled.h1`
  cursor: pointer;
  font-weight: bold;
`;

const Right = styled.div`
  flex: 2;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
`;

const StyledLink = styled(Link)`
  color: ${({ isHomePage }) => (isHomePage ? 'white' : 'black')};
  text-decoration: none;
  transition: color 0.3s ease;
  font-weight: 590;

  &:hover {
    color: ${({ isHomePage }) => (isHomePage ? 'white' : 'darkgray')};
  }
`;

const Span = styled.span`
  color: #1d59ff;
`;

const useIsHomepage = () => {
  const location = useLocation();
  return location.pathname === '/';
};

const Navbar = () => {

  const isHomePage = useIsHomepage();

  const navigate = useNavigate();

  return (

    <Container isNavbar={isHomePage}>
      <Wrapper>
        <Left>
          <SearchContainer>
            <Logo onClick={() => navigate('/')}>
              Job<Span>Quest</Span>
            </Logo>
          </SearchContainer>
        </Left>
        <Center>
          <MenuItem>
            <StyledLink isHomePage={isHomePage} to="/">Home</StyledLink>
          </MenuItem>
          <MenuItem>
            <StyledLink isHomePage={isHomePage} to="/jobs">Jobs</StyledLink>
          </MenuItem>
      
          <MenuItem>
            <StyledLink isHomePage={isHomePage} to="/createJob">Create a Job</StyledLink>
          </MenuItem>
        </Center>
        <Right>
          <StyledLink isHomePage={isHomePage} to="/register">
            <MenuItem>Register</MenuItem>
          </StyledLink>

          {/* <StyledLink to='/' ><MenuItem>Home</MenuItem></StyledLink>
          <StyledLink to='/jobs'><MenuItem>Find Jobs</MenuItem> </StyledLink>
          <StyledLink to='/createJob'><MenuItem>Create Job</MenuItem> </StyledLink>

        
        </Center>
        <Right>
          <StyledLink to='/register'><MenuItem>Register</MenuItem></StyledLink> */}
          <StyledLink isHomePage={isHomePage} to="/login">
            <MenuItem>Sign In</MenuItem>
          </StyledLink>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
