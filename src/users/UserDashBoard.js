import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth/index";
import { Link, Redirect } from "react-router-dom";
import { getDoctors } from "./apis";
import moment from "moment";
import InputGroup from "react-bootstrap/InputGroup";
import { Button } from "react-bootstrap";
import axios from "axios";
import { Alert } from "react-bootstrap";
import  ChatBot  from "../chatBot/ChatBot";
import { StarOutlined, StarFilled, StarTwoTone } from '@ant-design/icons';

const UserDashboard = () => {
  const [history, setHistory] = useState([]);
  const [doc, setDoc] = useState([]);
  const [showsuc, setshowsuc] = useState(false);
  const {
    user: { _id, name, email, role },
    token,
  } = isAuthenticated();

  const loadPurchaseHistory = () => {
    getDoctors()
      .then((data) => {
        if (data.success === false) {
          console.log("error");
        } else {
          setHistory(data.doctors);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    loadPurchaseHistory();
  }, []);

  const showAlert = (msg) => {
    return <Alert variant="success">{msg}</Alert>;
  };

  const userLinks = () => {
    return (
      <div className="card">
        <h3 className="card-header">User Links</h3>
        <ul className="list-group">
          <li className="list-group-item">
            <Link className="nav-link" to="/patient/dashboard">
              upload documents
            </Link>
          </li>
          <li className="list-group-item">
            <a className="nav-link" href={`https://sheltered-fjord-94062.herokuapp.com/`}>
              Online Video Chat Link
            </a>
          </li>
        </ul>
      </div>
    );
  };

  const userInfo = () => {
    return (
      <div className="card mb-5">
        <h3 className="card-header">User Information</h3>
        <ul className="list-group">
          <li className="list-group-item">{name}</li>
          <li className="list-group-item">{email}</li>
          {/* <li className="list-group-item">{role === 1
                            ? `Admin`
                            : `Registered User`}</li> */}
        </ul>
      </div>
    );
  };
  const provideAccess = () => {
    axios
      .post(
        `http://localhost:8000/access`,
        { doctors: doc, id: _id },
        {
          // receive two parameter endpoint url ,form data
        }
      )
      .then((res) => {
        // then print response status
        console.log(res, "res");
        if (res.data.success === true) {
          setshowsuc(true);
        }
      });
  };
  const addAccess = (id, e) => {
    console.log(e.target.checked);
    let dc = doc;
    if (e.target.checked) {
      let k = dc.indexOf(id) // -1
      if(k === -1) {
        dc.push(id);
        setDoc(dc);
      }
      
    } else {
      console.log("daoc");
      let p = [];
        for(let i = 0; i < doc.length; i++) {
          if(doc[i] !== id) {
            console.log("test");
            p.push(doc[i]);
          }
        }
        console.log("test", p);
        setDoc(p);
        console.log("test", doc);
    }

    console.log(doc, "doc");
  };

  const purchaseHistory = (history) => {
    return (
      <div className="card mb-5">
        <h3 className="card-header">All doctors</h3>
        <ul className="list-group">
          <li className="list-group-item">
            {history &&
              history.length > 0 &&
              history.map((h, i) => {
                return (
                  <li key={i} className="list-group-item">
                    <span style={{ marginRight: "20px" }}>name:</span>
                    <span style={{ marginRight: "20px" }}>{h.name}</span>
                    <span style={{ marginRight: "20px" }}>id:</span>
                    <span>{h._id}</span>
                    <span>
                      <InputGroup.Checkbox
                        aria-label="Checkbox for following text input"
                        onClick={(e) => {
                          addAccess(h._id, e);
                        }}
                      />
                    </span>
                  </li>
                );
              })}
          </li>
        </ul>
      </div>
    );
  };

  return (
    <Layout
      title="Dashboard"
      description={`Hello, ${name}!`}
      className="container-fluid"
    >
      <div className="row">
        <div className="col-3">{userLinks()}</div>
        <div className="col-9">
        {showsuc && showAlert("Doctors added for access")}

          {userInfo()}
          {purchaseHistory(history)}
          <Button style={{ marginBottom: "10px" }} onClick={provideAccess}>
            Provide Access
          </Button>
          {ChatBot()}
        </div>
      </div>
    </Layout>
  );
};

export default UserDashboard;
