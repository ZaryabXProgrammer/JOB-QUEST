import styled from 'styled-components';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { IoMdMenu } from 'react-icons/io';

const Container = styled.div`
  color: ${({ isNavbar }) => (isNavbar ? 'white' : 'black')};
  background: ${({ isNavbar }) =>
    isNavbar
      ? 'linear-gradient(90deg, rgba(26,41,189,1) 24%, rgba(0,0,0,1) 100%, rgba(9,9,133,1) 100%, rgba(0,212,255,1) 100%)'
      : 'white'};
  height: ${({ isNavbar }) => (isNavbar ? '60px' : 'auto')};
`;

const Wrapper = styled.div`
  position: relative; /* Ensure proper positioning for MobileMenu */
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
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

`;

const Logo = styled.h1`
  cursor: pointer;
  font-weight: bold;
  @media (max-width: 768px) {
    font-size: 24px;
  }
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

  @media (max-width: 768px) {
    display: none; /* Hide on smaller screens */
  }
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

const MobileMenuButton = styled.button`
  background: transparent;
  border: none;
  display: none; /* Initially hide on larger screens */
  cursor: pointer;
  
  @media (max-width: 768px) {
    display: flex; /* Show on smaller screens */
    align-items: center;
    justify-content: center;
    z-index: 1000; /* Ensure the button appears above other content */
  }
`;

const MobileMenuIcon = styled(IoMdMenu)`
  color: ${({ isNavbar }) => (isNavbar ? 'white' : 'black')};
  font-size: 24px;
`;

const MobileMenu = styled.div`
  display: none; /* Initially hide on larger screens */
  position: absolute; /* Ensure proper positioning */
  top: 60px;
  right: 0;
  width: 100%;
  padding: 20px;
  z-index: 999; /* Ensure the menu appears above other content */
  
  @media (max-width: 768px) {
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')}; /* Show when isOpen is true */
    flex-direction: column;
    background-color: ${({ isNavbar }) => (isNavbar ? 'rgba(26,41,189,1)' : 'white')};
  }
`;

const useIsHomepage = () => {
  const location = useLocation();
  return location.pathname === '/';
};

const Navbar = () => {
  const isHomePage = useIsHomepage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
          <StyledLink isHomePage={isHomePage} to="/login">
            <MenuItem>Sign In</MenuItem>
          </StyledLink>
        </Right>
        <MobileMenuButton onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <MobileMenuIcon isNavbar={isHomePage} />
        </MobileMenuButton>
        <MobileMenu isOpen={isMobileMenuOpen} isNavbar={isHomePage}>
          <MenuItem>
            <StyledLink isHomePage={isHomePage} to="/">Home</StyledLink>
          </MenuItem>
          <MenuItem>
            <StyledLink isHomePage={isHomePage} to="/jobs">Jobs</StyledLink>
          </MenuItem>
          <MenuItem>
            <StyledLink isHomePage={isHomePage} to="/createJob">Create a Job</StyledLink>
          </MenuItem>
          <MenuItem>
            <StyledLink isHomePage={isHomePage} to="/register">Register</StyledLink>
          </MenuItem>
          <MenuItem>
            <StyledLink isHomePage={isHomePage} to="/login">Sign In</StyledLink>
          </MenuItem>
        </MobileMenu>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
