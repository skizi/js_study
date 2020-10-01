import {useState} from 'react';
import axios from "axios";
import HelloApi from "../../vendor/my-api";

const ApiTest = () => {

  const [message, setMessage] = useState("Loading...");

  const api = new HelloApi();
  api.hello().then( response => {
    setMessage( response.data.data.message + ":" + response.data.data.date );
  }).catch(error=>{
    setMessage( "Failed to fetch time." );
  });

  return (
    <>
      <p>{message}</p>
    </>
  );
};


export default ApiTest;