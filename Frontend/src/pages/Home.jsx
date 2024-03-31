import axios from "axios";
import { useGlobalContext } from "../contex/GlobalContex";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { access, loggedin } = useGlobalContext();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("home useEffect");
    if (!loggedin) {
      navigate("/login");
    }
  }, [loggedin]);

  const logOut = async () => {
    await axios.get("http://localhost:5000/api/auth/logout");
    access();
  };
  return (
    <div>
      <p>home</p>
      <button onClick={() => logOut()}>log out</button>
    </div>
  );
};

export default Home;
