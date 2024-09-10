import { useState } from "react";
import "./index.css";
import axios from 'axios';
function App() {
  const [res, setRes] = useState("");
  useEffect(() => {
    axios.get('https://mern-app-wheat-two.vercel.app/h')
      .then(function (response) {
        console.log(response);
        setRes(response.data);  // Extract the data from the response
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);
  return (
    
    <>
    <div className="w-[100%] h-screen bg-red-200 flex justify-center items-center flex-col">
    <strong>{res ? res : "Loading..."}</strong> 
    <p>I am here</p>
    </div>
    </>
  );
}

export default App;
