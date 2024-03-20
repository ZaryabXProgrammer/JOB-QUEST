import {
  apple,
  microsoft,
  slack,
  spotfy,
  instagram,
  clients_logo_facebook,
  clients_logo_google,
  clients_logo_linkedin,
  clients_logo_youtube,
  logo_facebook,
  logo_twitter,
  logo_instagram,
  logo_google,
  testimonial_logo_1,
  testimonial_logo_2,
  testimonial_logo_3,
  testimonial_profile_pic_1,
  testimonial_profile_pic_2,
  testimonial_profile_pic_3,
  socials_logo_facebook,
  socials_logo_instagram,
  socials_logo_twitter,
  marketing,
  software,
  web,
  finance,
  hr,
  graphic,
  data,
  customer,
} from "../assets";
import book from "../assets/features/book.png";
import man from "../assets/features/man.png";
import resume from "../assets/features/resume-2169945.svg";
import running from "../assets/features/running.png";

export const navLinks = [
  {
    id: "home",
    title: "Home",
    link: "/",
  },
  {
    id: "about-us",
    title: "About Us",
    link: "/about",
  },
  {
    id: "jobs",
    title: "Jobs",
    link: "/jobs",
  },
];

export const clients = [
  {
    id: "client-1",
    logo: clients_logo_facebook,
  },
  {
    id: "client-2",
    logo: clients_logo_google,
  },
  {
    id: "client-3",
    logo: clients_logo_youtube,
  },
  {
    id: "client-4",
    logo: clients_logo_linkedin,
  },
];

export const featuredCompanies = [
  {
    id: "company-1",
    logo: logo_facebook,
    title: "Facebook",
    type: "Social Network",
  },
  {
    id: "company-2",
    logo: logo_twitter,
    title: "Twitter",
    type: "Social Network",
  },
  {
    id: "company-3",
    logo: logo_instagram,
    title: "Instagram",
    type: "Social Network",
  },
  {
    id: "company-4",
    logo: logo_google,
    title: "Google",
    type: "Technology",
  },
];

export const testimonials = [
  {
    id: "testimonial-1",
    testimonial:
      "We've hired several qualified applicants who report first seeing the position on Jobs. It's been great working with you!",
    logo: testimonial_logo_1,
    picture: testimonial_profile_pic_1,
    name: "Sophie Moore",
    position: "UI Designer at Webflow",
  },
  {
    id: "testimonial-2",
    testimonial:
      "It brings us the highest concentration of quality applicants. It's been great working with you!",
    logo: testimonial_logo_2,
    picture: testimonial_profile_pic_2,
    name: "Mark Norman",
    position: "SEO Lead at Facebook",
  },
  {
    id: "testimonial-3",
    testimonial:
      "Jobs is a wonderful source for highly educated, experienced professionals looking for meaningful, tech work.",
    logo: testimonial_logo_3,
    picture: testimonial_profile_pic_3,
    name: "Edwin Collins",
    position: "Developer at Youtube",
  },
];

export const footerLists = [
  {
    id: "Menu",
    title: "Menu",
    links: ["Home", "About Us", "Jobs"],
  },
  {
    id: "Follow Us",
    title: "Follow Us",
    links: ["Facebook", "Twitter", "Instagram"],
    socialLogo: [
      socials_logo_facebook,
      socials_logo_twitter,
      socials_logo_instagram,
    ],
  },
];

export const footerNav = [
  {
    id: "footer-home",
    title: "Home",
    link: "/",
  },
  {
    id: "footer-about-us",
    title: "About Us",
    link: "/about",
  },
  {
    id: "footer-jobs",
    title: "Jobs",
    link: "/jobs",
  },
];

export const socialNav = [
  {
    id: "social-1",
    title: "Facebook",
    icon: socials_logo_facebook,
    link: "http://facebook.com/",
  },
  {
    id: "social-2",
    title: "Twitter",
    icon: socials_logo_twitter,
    link: "http://twitter.com/",
  },
  {
    id: "social-3",
    title: "Instagram",
    icon: socials_logo_instagram,
    link: "http://instagram.com/",
  },
];

export const cardsData = [
  {
    id: 1,
    image: man,
    title: "Account Management",
    description: "Manage your profile and account settings easily.",
    link: "/account-management",
  },
  {
    id: 2,
    image: book,
    title: "CV/Resume Builder",
    description: "Create and customize your CV or resume for job applications.",
    link: "/cv-resume-builder",
  },
  {
    id: 3,
    image: resume,
    title: "Quick Job Apply",
    description:
      "Apply to jobs quickly and efficiently with just a few clicks.",
    link: "/quick-job-apply",
  },
  {
    id: 4,
    image: running,
    title: "Job Alerts",
    description:
      "Get notified about new job opportunities that match your preferences.",
    link: "/job-alerts",
  },
];

export const popularJobCategoriesData = [
  {
    id: 1,
    title: "Software Development",
    vacancies: 150,
    jobTitle: "OMIY - Software Engineer",
    image: software,
    link: "/software-development",
  },
  {
    id: 2,
    title: "Data Science",
    vacancies: 100,
    jobTitle: "OMIY - Data Scientist",
    image: data,
    link: "/data-science",
  },
  {
    id: 3,
    title: "Digital Marketing",
    vacancies: 80,
    jobTitle: "OMIY - Digital Marketing Specialist",
    image: marketing,
    link: "/digital-marketing",
  },
  {
    id: 4,
    title: "Graphic Design",
    vacancies: 60,
    jobTitle: "OMIY - Graphic Designer",
    image: graphic,
    link: "/graphic-design",
  },
  {
    id: 5,
    title: "Customer Support",
    vacancies: 120,
    jobTitle: "OMIY - Customer Support Representative",
    image: customer,
    link: "/customer-support",
  },
  {
    id: 6,
    title: "Web Development",
    vacancies: 110,
    jobTitle: "OMIY - Web Developer",
    image: web,
    link: "/web-development",
  },
  {
    id: 7,
    title: "Finance",
    vacancies: 90,
    jobTitle: "OMIY - Financial Analyst",
    image: finance,
    link: "/finance",
  },
  {
    id: 8,
    title: "Human Resources",
    vacancies: 70,
    jobTitle: "OMIY - HR Specialist",
    image: hr,
    link: "/human-resources",
  },
];

export const companiesData = [
  {
    id: 1,
    title: "Apple",
    image: apple,
  },
  {
    id: 2,
    title: "Microsoft",
    image: microsoft,
  },
  {
    id: 3,
    title: "Slack",
    image: slack,
  },
  {
    id: 4,
    title: "Instagram",
    image: instagram,
  },
  {
    id: 5,
    title: "Spotify",
    image: spotfy,
  },
];
