import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth/index";
import { Link } from "react-router-dom";
import { getPatients } from "./apis";
import moment from "moment";
import InputGroup from "react-bootstrap/InputGroup";
import  Chat  from "../chatBot/ChatBot";

const DoctorDashboard = () => {
  const [history, setHistory] = useState([]);
  const {
    user: { _id, name, email, role },
    token,
  } = isAuthenticated();
  const [showsuc, setshowsuc] = useState(false);
  const loadPurchaseHistory = () => {
    getPatients(_id).then((data)=>{
      if(data.success === true) {
        setHistory(data.patients);
        setshowsuc(true)
      }
    }).catch((err)=>{
      console.log(err);
    })
    // getDoctors().then((data)=>{
    //     if(data.success === false) {
    //         console.log("error");
    //     } else {
    //         setHistory(data.doctors);
    //     }
    // }).catch((err)=>{
    //     console.log(err);
    // })
  };
  useEffect(() => {
    loadPurchaseHistory();
  }, []);
  const userLinks = () => {
    return (
      <div className="card">
        <h3 className="card-header">User Links</h3>
        <ul className="list-group">
          <li className="list-group-item">
            <Link className="nav-link" to="/cart">
              SEE documents
            </Link>
          </li>
          <li className="list-group-item">
            <a
              className="nav-link"
              href={`https://sheltered-fjord-94062.herokuapp.com/`}
            >
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

  const purchaseHistory = (history) => {
    console.log(history, "iiiii")
    return (
      <div className="card mb-5">
        <h3 className="card-header">All Patients Access</h3>
        <ul className="list-group">
          <li className="list-group-item">
            {history &&
              history.length > 0 &&
              history.map((h, i) => {
                return (
                  <Link to = {`/doctor/${h._id}`}>
                    <li key={i} className="list-group-item">
                      <span style={{ marginRight: "20px" }}>name:</span>
                      <span style={{ marginRight: "20px" }}>{h.name}</span>
                      <span style={{ marginRight: "20px" }}>id:</span>
                      <span>{h._id}</span>
                    </li>
                  </Link>
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
          {userInfo()}
          {showsuc && purchaseHistory(history)}
          {/* {Chat()} */}
        </div>
      </div>
    </Layout>
  );
};

export default DoctorDashboard;
