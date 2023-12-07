import React, { useState, useEffect } from "react";
import "./App.css";
import Card from "./Card";

function App() {
  const [jobboarddata, setJobBoardData] = useState([]);
  const [visibleJobs, setVisibleJobs] = useState(6);
  const [showLoadMore, setShowLoadMore] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const id_url = "https://hacker-news.firebaseio.com/v0/jobstories.json";
      const response = await fetch(id_url);
      const jsondata = await response.json();

      const jobPromises = jsondata.map(async (id) => {
        const base_url = `https://hacker-news.firebaseio.com/v0/item/${id}.json`;
        const response = await fetch(base_url);
        return response.json();
      });

      const jobData = await Promise.all(jobPromises);
      setJobBoardData(jobData);
      setLoading(false); // Data has been loaded, set loading to false
    }

    fetchData();
  }, []);

  const loadMore = () => {
    const currentlyVisible = visibleJobs + 6;
    setVisibleJobs(currentlyVisible);

    if (currentlyVisible >= jobboarddata.length) {
      setShowLoadMore(false);
    }
  };

  return (
    <>
      <div className="main_div">
        <div className="center_div">
          <p>Hacker News Jobs Board</p>
          {loading ? (
            <p>Loading...</p>
          ) : (
            jobboarddata.slice(0, visibleJobs).map((data, index) => (
              <Card key={index} carddata={data} />
            ))
          )}
        </div>
        {showLoadMore && !loading && (
          
      <div className="main_div">
          <div className="center_div">
            <button onClick={loadMore}>Load More</button>
          </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
