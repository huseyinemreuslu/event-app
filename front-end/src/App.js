// src/App.js
import React from "react";
import HomePage from "./pages/HomePage";
import PlacesPage from "./pages/PlacesPage";
import EventDetailPage from "./pages/EventDetailPage";
import PlaceDetailPage from "./pages/PlaceDetailPage";
import NotFoundPage from "./pages/NotFoundPage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import ArchivedPage from "./pages/ArchivedEventsPage";
function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/archived" exact component={ArchivedPage} />
        <Route path="/places" exact component={PlacesPage} />
        <Route path="/places/:placeId" exact component={PlaceDetailPage} />
        <Route path="/events/:eventId" exact component={EventDetailPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </Router>
  );
}

export default App;
