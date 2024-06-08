// JobsContext.js
import { createContext, useState } from "react";

const JobsContext = createContext();

const JobsProvider = ({ children }) => {
    const [newJobs, setnewJobs] = useState([]);
  const [page1JobsActive, setPage1JobsActive] = useState(false);
  const [jobDescription, setjobDescription] = useState(null)
  const [jobDetails, setjobDetails] = useState({})
  const [globalResume, setglobalResume] = useState(null);
  const [resumeTextContent, setresumeTextContent] = useState(null);
  

  return (
    <JobsContext.Provider value={{ newJobs, setnewJobs, page1JobsActive, setPage1JobsActive, setjobDescription, jobDescription, setjobDetails, jobDetails, setglobalResume, globalResume, setresumeTextContent, resumeTextContent }}>
      {children}
    </JobsContext.Provider>
  );
};

export { JobsContext, JobsProvider };
