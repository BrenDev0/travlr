import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies();
  const [userName, setUsername] = useState("");
  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate("/login");
      }
      const { data } = await axios.post(
        "http://localhost:5000/api/auth",
        {},
        { withCredentials: true }
      );
      const { status, user } = data;
      setUsername(user);
      return status;
    };
    verifyCookie();
  }, [cookies, navigate, removeCookie]);

  return <div>home</div>;
};

export default Home;
