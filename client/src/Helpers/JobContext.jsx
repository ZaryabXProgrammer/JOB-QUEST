// JobsContext.js
import { createContext, useState } from "react";

const JobsContext = createContext();

const JobsProvider = ({ children }) => {
    const [newJobs, setnewJobs] = useState([]);
  const [page1JobsActive, setPage1JobsActive] = useState(false);
  const [jobDescription, setjobDescription] = useState(null)
  const [jobDetails, setjobDetails] = useState({})
  

  return (
    <JobsContext.Provider value={{ newJobs, setnewJobs, page1JobsActive, setPage1JobsActive, setjobDescription, jobDescription, setjobDetails, jobDetails }}>
      {children}
    </JobsContext.Provider>
  );
};

export { JobsContext, JobsProvider };
