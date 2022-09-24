import logo from "./logo.svg";
import "./App.css";

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
    alert(ipfs_url);
    var file_url = `${ipfs_url}/${filename}`
    // console.log(process.env.REACT_APP_NFT_PORT_KEY)

    axios.post("https://api.nftport.xyz/v0/mints/easy/urls", {
        chain: "polygon",
        name: "3ARTH",
        description: "Chul",
        file_url: file_url,
        mint_to_address: polyAddress
    }, {
        headers: {
            "Authorization": process.env.REACT_APP_NFT_PORT_KEY,
            "Content-Type": "application/json"
        }
    }).then(function(response) {
      console.log(`https://polygonscan.com/tx/${response.data.transaction_hash})`);
    }).catch(function(error) {
        console.log(error);
    });

  }
  return <div className="mainDiv">Hello, submit music file.
    <input type="file" name="file" onChange={changeHandler} />
    <input type="text" id="polyAddress" placeholder="Polygon Address" />
    <br/>
    <div>
      <button onClick={handleSubmission}>Submit</button>
    </div>

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
