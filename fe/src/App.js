import logo from "./logo.svg";
import "./App.css";
import Canvas from './Canvas'


import React, { useCallback, useEffect, useState } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import {
  Alert,
  Button,
  LinkButton,
  Card,
  Col,
  Input,
  List,
  Menu,
  Row,
  Slider,
} from "antd";
import { Web3Storage, getFilesFromPath } from "web3.storage";
const axios = require("axios").default;


var token = process.env.REACT_APP_KEY;

const storage = new Web3Storage({ token });


function Custom() {

  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files);
    // setIsSelected(true);
  }

  function getFiles() {
    const fileInput = document.querySelector('input[type="file"]')
    return fileInput.files
  }

  function getAddress() {
    const polyAddress = document.querySelector('#polyAddress')
    console.log(polyAddress.value);
    return polyAddress.value;
  }

  async function handleSubmission() {
    console.log(selectedFile);

    var filename = selectedFile[0].name;

    var files = getFiles();
    var polyAddress = getAddress();

    const cid = await storage.put(files);
    console.log("Content added with CID:", cid);

    var ipfs_url = `${cid}.ipfs.dweb.link`;
    console.log(ipfs_url);
    var file_url = `${ipfs_url}/${filename}`

    alert("File successfully uploaded to...")
    alert(file_url);
    // document.getSelection("#fileLink").value = file_url;

    console.log(file_url);
    // console.log(process.env.REACT_APP_NFT_PORT_KEY)

    axios.post("https://api.nftport.xyz/v0/mints/easy/urls", {
        chain: "polygon",
        name: "3ARTH",
        description: "Chul",
        file_url: "https://bafybeicmqgxjpmkudvij6bxavkkrhar3jnnmztjvlq2ckngn4jue43epgm.ipfs.dweb.link/4js94kg7c4p91.webp",
        mint_to_address: "0x4Fbf38eFCDeb381F753BAAA22233cA40dF3123Ac"
    }, {
        headers: {
            "Authorization": process.env.REACT_APP_NFT_PORT_KEY,
            "Content-Type": "application/json"
        }
    }, {timeout: 15000}).then(function(response) {
      var link2 = `https://polygonscan.com/tx/${response.data.transaction_hash})`
      console.log(link2);
      alert("View transaction at...");
      alert(link2);
      // document.getSelection("#transaction").textContent = link2;
    }).catch(function(error) {
        console.log(error);
    });

  }
  return <div className="mainDiv">
    <h1>3ARTH</h1>
  Hello, submit a file you want to create a world from.<br/>
    <input type="file" name="file" onChange={changeHandler} /><br/>
    Address to send NFT to: <input type="text" id="polyAddress" placeholder="Polygon Address" /><br/>
    <br/>
    <div>
      <button onClick={handleSubmission}>Submit</button>
    </div>
    <div>
      {/* File Link: <input type="text" id="fileLink"></input><br/>
      Transaction: <span id="transaction"></span><br/> */}
    </div>
    {/* <Canvas/> */}
  </div>;
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Custom/>}>
          </Route>

          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
