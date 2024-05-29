import { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { signOut } from '../Redux/userSlice';

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

const Right = styled.div`
  flex: 2;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  @media (max-width: 480px) {
    display: none; /* Hide Center content on mobile */
  }
`;

const Center = styled.div`
  flex: 2;
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

const HamburgerMenu = styled.div`
  flex: 2;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  @media (min-width: 768px) {
    display: none; /* Hide Center content on mobile */
  }
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
  color: #2a63ff;
  font-weight: bold;
`;

const useIsHomepage = () => {
  const location = useLocation();
  return location.pathname === '/';
};

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false); // State for controlling menu visibility

  const username = useSelector((state) => (state.user.currentUser ? state.user.currentUser.username : null));
  const isHomePage = useIsHomepage();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignOut = () => {
    dispatch(signOut());
    navigate('/'); // Replace '/' with the route you want to navigate to after signing out
  };

  return (
    <Container isNavbar={isHomePage}>
      <Wrapper>
        <Left>
          <SearchContainer>
            <Logo onClick={() => navigate('/')}>
              Talent<Span>Link</Span>
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
          <MenuItem>
            <StyledLink isHomePage={isHomePage} to="/rate">Rate CV</StyledLink>
          </MenuItem>
          <MenuItem>
            <StyledLink isHomePage={isHomePage} to="/jobGraph">Job Insights</StyledLink>
          </MenuItem>
        </Center>
        <Right>

          {!username ?
            <>
              <StyledLink isHomePage={isHomePage} to="/register">
                <MenuItem>Register</MenuItem>
              </StyledLink>

              <StyledLink isHomePage={isHomePage} to="/login">
                <MenuItem>Sign In</MenuItem>
              </StyledLink>

            </>
            :
            <>
              <StyledLink isHomePage={isHomePage} >
                <MenuItem>@{username}</MenuItem>
              </StyledLink>

              <StyledLink onClick={handleSignOut} isHomePage={isHomePage}>
                <MenuItem >Sign Out</MenuItem>
              </StyledLink>
            </>
          }
        </Right>
        <HamburgerMenu>
          <MenuIcon onClick={() => setShowMenu(!showMenu)} isHomePage={isHomePage} showMenu={showMenu} />
          <Menu showMenu={showMenu}>
            {!username ? (
              <>
                <StyledLink isHomePage={isHomePage} to="/register">
                  <MenuItem>Register</MenuItem>
                </StyledLink>
                <StyledLink isHomePage={isHomePage} to="/login">
                  <MenuItem>Sign In</MenuItem>
                </StyledLink>
              </>
            ) : (
              <>
                <StyledLink isHomePage={isHomePage}>
                  <MenuItem>@{username}</MenuItem>
                </StyledLink>
                <StyledLink onClick={handleSignOut} isHomePage={isHomePage}>
                  <MenuItem>Sign Out</MenuItem>
                </StyledLink>
              </>
            )}
            <MenuItem>
              <StyledLink isHomePage={isHomePage} to="/">Home</StyledLink>
            </MenuItem>
            <MenuItem>
              <StyledLink isHomePage={isHomePage} to="/jobs">Jobs</StyledLink>
            </MenuItem>
            <MenuItem>
              <StyledLink isHomePage={isHomePage} to="/createJob">Create a Job</StyledLink>
            </MenuItem>
          </Menu>
        </HamburgerMenu>
      </Wrapper>
    </Container>
  );
};

const MenuIcon = ({ onClick, isHomePage, showMenu }) => (
  <StyledMenuIcon onClick={onClick} isHomePage={isHomePage} showMenu={showMenu}>
    <div />
    <div />
    <div />
  </StyledMenuIcon>
);

const StyledMenuIcon = styled.div`
  cursor: pointer;
  width: 30px;
  height: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (min-width: 481px) {
    display: none;
  }

  div {
    width: 100%;
    height: 5px;
    background-color: ${({ isHomePage }) => (isHomePage ? 'white' : 'black')};
    border-radius: 4px;
    transition: all 0.3s ease;
  }

  div:first-child {
    transform: ${({ showMenu }) => (showMenu ? 'rotate(45deg) translate(5px, 5px)' : 'rotate(0)')};
  }

  div:nth-child(2) {
    opacity: ${({ showMenu }) => (showMenu ? '0' : '1')};
  }

  div:last-child {
    transform: ${({ showMenu }) => (showMenu ? 'rotate(-45deg) translate(5px, -5px)' : 'rotate(0)')};
  }
`;


const Menu = styled.div`
  position: absolute;
  z-index: 999;
  top: 60px; /* Height of the navbar */
  right: 20px;
  // background-color: white; 
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  display: ${({ showMenu }) => (showMenu ? 'block' : 'none')};
`;


export default Navbar;