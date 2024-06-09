import { useContext, useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { signOut } from '../Redux/userSlice';
import { JobsContext } from '../Helpers/JobContext';

const Container = styled.div`
  color: ${({ isNavbar }) => (isNavbar ? 'white' : 'black')};
  background: ${({ isNavbar }) =>
    isNavbar
      ? 'linear-gradient(90deg, rgba(26,41,189,1) 24%, rgba(0,0,0,1) 100%, rgba(9,9,133,1) 100%, rgba(0,212,255,1) 100%)'
      : 'white'};
  height: ${({ isNavbar }) => (isNavbar ? '60px' : 'auto')};
  position: relative;
  z-index: 1000;
  box-shadow: ${({ isNavbar }) => (isNavbar ? '0 2px 10px rgba(0, 0, 0, 0.1)' : 'none')};
  transition: background 0.3s ease, height 0.3s ease;
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
  flex: 1;
  display: flex;
  align-items: center;
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Center = styled.div`
  flex: 2;
  text-align: center;
  display: flex;
  justify-content: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Logo = styled.h1`
  cursor: pointer;
  font-weight: bold;
  font-size: 24px;
  color: ${({ isHomePage }) => (isHomePage ? 'white' : '#2a63ff')};
  transition: color 0.3s ease;
`;

const HamburgerMenu = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    cursor: pointer;
  }
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 15px;
  color: ${({ isHomePage }) => (isHomePage ? 'white' : '#333')};
  transition: color 0.3s ease;

  &:hover {
    color: ${({ isHomePage }) => (isHomePage ? 'lightgray' : '#2a63ff')};
  }
`;

const StyledLink = styled(Link)`
  color: inherit;
  text-decoration: none;
  transition: color 0.3s ease;
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

  const { setresumeTextContent, setglobalResume } = useContext(JobsContext)
  
  const isHomePage = useIsHomepage();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignOut = () => {
    dispatch(signOut());
    navigate('/'); // Replace '/' with the route you want to navigate to after signing out
    setShowMenu(false); // Close menu after sign out
    setresumeTextContent(null)
    setglobalResume(null)

  };

  const handleMenuClick = (path) => {
    navigate(path);
    setShowMenu(false); // Close menu on navigation
  };

  return (
    <Container isNavbar={isHomePage}>
      <Wrapper>
        <Left>
          <Logo isHomePage={isHomePage} onClick={() => handleMenuClick('/')}>
            Talent<Span>Link</Span>
          </Logo>
        </Left>
        <Center>
          <MenuItem isHomePage={isHomePage}>
            <StyledLink to="/">Home</StyledLink>
          </MenuItem>
          <MenuItem isHomePage={isHomePage}>
            <StyledLink to="/jobs">Jobs</StyledLink>
          </MenuItem>
          <MenuItem isHomePage={isHomePage}>
            <StyledLink to="/createJob">Create a Job</StyledLink>
          </MenuItem>
          <MenuItem isHomePage={isHomePage}>
            <StyledLink to="/rate">Rate CV</StyledLink>
          </MenuItem>
          <MenuItem isHomePage={isHomePage}>
            <StyledLink to="/jobGraph">Job Insights</StyledLink>
          </MenuItem>
          <MenuItem isHomePage={isHomePage}>
            <StyledLink to="/postedJobs">Jobs Posted</StyledLink>
          </MenuItem>
        </Center>
        <Right>
          {!username ?
            <>
              <StyledLink to="/register">
                <MenuItem isHomePage={isHomePage}>Register</MenuItem>
              </StyledLink>
              <StyledLink to="/login">
                <MenuItem isHomePage={isHomePage}>Sign In</MenuItem>
              </StyledLink>
            </>
            :
            <>
              <StyledLink to='/profile'>
                <MenuItem isHomePage={isHomePage}>@{username}</MenuItem>
              </StyledLink>
              <MenuItem isHomePage={isHomePage} onClick={handleSignOut}>
                Sign Out
              </MenuItem>
            </>
          }
        </Right>
        <HamburgerMenu onClick={() => setShowMenu(!showMenu)}>
          <MenuIcon isHomePage={isHomePage} showMenu={showMenu} />
        </HamburgerMenu>
      </Wrapper>
      <DropdownMenu showMenu={showMenu}>
        {!username ? (
          <>
            <DropdownMenuItem>
              <StyledLink to="/register" onClick={() => handleMenuClick('/register')}>Register</StyledLink>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <StyledLink to="/login" onClick={() => handleMenuClick('/login')}>Sign In</StyledLink>
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem>
              <StyledLink to="#">@{username}</StyledLink>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleSignOut}>
              <StyledLink to="#">Sign Out</StyledLink>
            </DropdownMenuItem>
          </>
        )}
        <DropdownMenuItem>
          <StyledLink to="/" onClick={() => handleMenuClick('/')}>Home</StyledLink>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <StyledLink to="/jobs" onClick={() => handleMenuClick('/jobs')}>Jobs</StyledLink>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <StyledLink to="/createJob" onClick={() => handleMenuClick('/createJob')}>Create a Job</StyledLink>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <StyledLink to="/rate" onClick={() => handleMenuClick('/rate')}>Rate CV</StyledLink>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <StyledLink to="/jobGraph" onClick={() => handleMenuClick('/jobGraph')}>Job Insights</StyledLink>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <StyledLink to="/PostedJobs" onClick={() => handleMenuClick('/PostedJobs')}>Job Posted</StyledLink>
        </DropdownMenuItem>
      </DropdownMenu>
    </Container>
  );
};

const MenuIcon = ({ isHomePage, showMenu }) => (
  <StyledMenuIcon isHomePage={isHomePage} showMenu={showMenu}>
    <div />
    <div />
    <div />
  </StyledMenuIcon>
);

const StyledMenuIcon = styled.div`
  width: 30px;
  height: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  div {
    width: 100%;
    height: 3px;
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

const DropdownMenu = styled.div`
  position: absolute;
  top: ${({ showMenu }) => (showMenu ? '60px' : '-100%')}; /* Height of the navbar */
  right: 0;
  width: 100%;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  padding: ${({ showMenu }) => (showMenu ? '10px 0' : '0')};
  border-top: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: ${({ showMenu }) => (showMenu ? '0px 4px 8px rgba(0, 0, 0, 0.1)' : 'none')};
  z-index: 999;
  transition: all 0.3s ease;
  overflow: hidden;
  max-height: ${({ showMenu }) => (showMenu ? '500px' : '0')}; /* Adjust as needed */
`;

const DropdownMenuItem = styled.div`
  width: 100%;
  text-align: center;
  padding: 15px 0;
  transition: padding 0.3s ease;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }

  
  a {
    color: #333;
    text-decoration: none;
    transition: color 0.3s ease;
    display: block;
    width: 100%;

    &:hover {
      color: #2a63ff;
    }
  }
`;

export default Navbar;
