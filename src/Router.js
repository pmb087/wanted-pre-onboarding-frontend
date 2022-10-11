import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "./Pages/Auth/Auth.js";
import { Redirect } from "./Pages/Auth/Redirect.js";
import ToDo from "./Pages/ToDo/ToDo.js";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Redirect />} />
        <Route path="/:auth" element={<Auth />} />
        <Route path="/todo" element={<ToDo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
