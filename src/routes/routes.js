import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Signin from "../core/Signin";
import Signup from "../core/Signup";
import UserDashboard from '../users/UserDashBoard';
import PrivateRoutes from '../auth/privateRoutes';
import DoctorDashboard from '../users/DoctorDashboard';
import UploadDoc from '../users/UploadDoc';
const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Signin}></Route>
        <Route path="/signin" exact component={Signin}></Route>
        <Route path="/signup" exact component={Signup}></Route>
        <PrivateRoutes path="/user/dashboard" exact component={UserDashboard}></PrivateRoutes>
        <PrivateRoutes path="/doctor/dashboard" exact component={DoctorDashboard}></PrivateRoutes>
        <PrivateRoutes path="/patient/dashboard" exact component={UploadDoc}></PrivateRoutes>
        {/*
                // <Route path="/shop" exact component={Shop}></Route>
                // <Route path="/product/:productId" exact component={ViewProduct}></Route>
                // <Route path="/cart" exact component={Cart}></Route> */}
        {/* <PrivateRoutes path="/profile/:userId" exact component={Profile}></PrivateRoutes>
                <PrivateRoutes path="/user/dashboard" exact component={UserDashboard}></PrivateRoutes>
                <AdminRoutes path="/admin/dashboard" exact component={AdminDashboard}></AdminRoutes>
                <AdminRoutes path="/create/category" exact component={AddCategories}></AdminRoutes>
                <AdminRoutes path="/create/product" exact component={AddProducts}></AdminRoutes>
                <AdminRoutes path="/admin/orders" exact component={Orders}></AdminRoutes>
                <AdminRoutes path="/admin/products" exact component={UpdateProducts}></AdminRoutes>
                <AdminRoutes path="/admin/product/update/:productId" exact component={ManageProducts}></AdminRoutes> */}
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
