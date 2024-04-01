import axios from "axios";
import { useGlobalContext } from "../contex/GlobalContex";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Home = () => {
  const { access, loggedin } = useGlobalContext();
  const navigate = useNavigate();

  const logOut = async () => {
    await axios.get("http://localhost:5000/api/auth/logout");
    access();
  };
  return (
    <div>
      <Navbar />
    </div>
  );
};

export default Home;
