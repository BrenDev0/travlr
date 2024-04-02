import axios from "axios";
import { useGlobalContext } from "../contex/GlobalContex";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Home = () => {
  const {} = useGlobalContext();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyAccess = async () => {
      const res = await axios.get("http://localhost:5000/api/auth");

      if (!res.data.status) {
        navigate("/login");
      }
    };
    verifyAccess();
  }, []);

  return (
    <div>
      <Navbar />
    </div>
  );
};

export default Home;
