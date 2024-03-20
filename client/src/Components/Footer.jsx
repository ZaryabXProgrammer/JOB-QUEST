
import styled from 'styled-components';

// Social icons (replace the placeholder URLs with actual URLs for each social platform)
const socialIcons = [
  { name: 'Facebook', url: 'https://www.facebook.com/' },
  { name: 'Twitter', url: 'https://twitter.com/' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/' },
  { name: 'Instagram', url: 'https://www.instagram.com/' },
];

// Job categories
const jobCategories = ['Software Development', 'Web Development', 'HR', 'Dance'];

const FooterContainer = styled.div`
    background-color: #062038;
    color: white;
    padding: 50px 0;
    height: 50vh;
   
  `;

const FooterWrapper = styled.div`

    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 30px;
    max-width: 1200px;
    margin: 60px auto; /* Center horizontally */
    /* Center the content inside each column */

  `;

const Column = styled.div`
    display: flex;
    flex-direction: column;
  `;

const LogoContainer = styled.div`
    display: flex;

    margin-bottom: 20px;
  `;

const SocialIcon = styled.a`
    color: white;
    font-size: 13px;
    margin-right: 10px;
    text-decoration: none;

    &:hover {
      color: #ffc107; /* Change the color on hover */
    }
  `;

const Title = styled.h3`
    font-size: 20px;
    margin-bottom: 10px;
  `;

const List = styled.ul`
    list-style-type: none;
    padding: 0;
  `;

const ListItem = styled.li`
    margin-bottom: 5px;
  `;

const Span = styled.span`
    color: #1d59ff;
  `;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterWrapper>
        <Column>
          <LogoContainer>
            <h2>Job<Span>Quest</Span></h2>
          </LogoContainer>
          <div>
            {socialIcons.map((icon, index) => (
              <SocialIcon key={index} href={icon.url} target="_blank" rel="noopener noreferrer">
                {icon.name}
              </SocialIcon>
            ))}
          </div>
        </Column>
        <Column>
          <Title>Job Categories</Title>
          <List>
            {jobCategories.map((category, index) => (
              <ListItem key={index}>{category}</ListItem>
            ))}
          </List>
        </Column>
        <Column>
          <Title>Community</Title>
          <List>
            <ListItem>Invite a Friend</ListItem>
            <ListItem>Affiliate Blog</ListItem>
            <ListItem>Forums</ListItem>
          </List>
        </Column>
        <Column>
          <Title>Resources</Title>
          <List>
            <ListItem>Browse Jobs</ListItem>
            <ListItem>Career Advice</ListItem>
          </List>
        </Column>
        <Column>
          <Title>Contact</Title>
          <List>
            <ListItem>Phone: +123456789</ListItem>
            <ListItem>Email: info@jobquest.com</ListItem>
            <ListItem>Location: 123 Job Street, City, Country</ListItem>
          </List>
        </Column>
      </FooterWrapper>
    </FooterContainer>
  );
};

export default Footer;
