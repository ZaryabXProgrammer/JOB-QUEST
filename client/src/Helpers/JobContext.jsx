// JobsContext.js
import { createContext, useState } from "react";

const JobsContext = createContext();

const JobsProvider = ({ children }) => {
    const [newJobs, setnewJobs] = useState([]);
    const [page1JobsActive, setPage1JobsActive] = useState(false);

  return (
    <JobsContext.Provider value={{ newJobs, setnewJobs, page1JobsActive, setPage1JobsActive }}>
      {children}
    </JobsContext.Provider>
  );
};

export { JobsContext, JobsProvider };
