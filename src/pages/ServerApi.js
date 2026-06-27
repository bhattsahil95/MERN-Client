import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import ProjectPageHeader from "../components/ProjectPageHeader";
import projects from "../assets/projectsData";

const project = projects.find((p) => p.id === "api-server");

export default function ServerApi() {
  const startData = "";
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const [data, setData] = useState(startData);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const url = `${BASE_URL}note/data`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setData(response.data);
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return (
    <div>
      <ProjectPageHeader
        title={project.title}
        description={project.description}
        tech={project.tech}
      />
      <div className="api-server-demo">
        {isLoading && (
          <Box sx={{ width: "100%" }}>
            <LinearProgress />
          </Box>
        )}
        {error && (
          <div className="api-server-demo__error">
            Unable to reach the API server. Make sure the backend is running on{" "}
            <code>{BASE_URL}</code>
          </div>
        )}
        {!isLoading && !error && (
          <div className="api-server-demo__output">
            <div className="api-server-demo__toolbar">
              <span className="api-server-demo__endpoint">GET /note/data</span>
              <span className="api-server-demo__status">200 OK</span>
            </div>
            <pre className="api-server-demo__json">
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
