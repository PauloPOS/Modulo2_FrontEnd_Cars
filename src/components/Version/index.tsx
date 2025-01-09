import { useEffect, useState } from 'react';
import axios from 'axios';

const Version: React.FC = () => {
  const API_URL = process.env.REACT_APP_API_URL;
  const [version, setVersion] = useState("");

  useEffect(() => {
    console.log("Calling API...");
    axios
      .get(`${API_URL}/api/version`)
      .then((response) => {
        setVersion(response.data.version);
      })
      .catch((error) => {
        console.error("Error fetching version:", error);
      });
  }, [API_URL]);

  return <p>Version: {version}</p>;
};

export default Version;
