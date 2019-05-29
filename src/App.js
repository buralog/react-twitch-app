import React, { Component } from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Games from "./pages/Games";
import GameProfile from "./pages/GameProfile";
import Search from "./components/Search";
import FeaturedStreams from "./pages/FeaturedStreams";
import TopLiveStreams from "./pages/TopLiveStreams";
import UserProfile from "./pages/UserProfile";
import Homepage from "./pages/Homepage";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <div>
            <Navbar />
            <Search />
          </div>
          <Switch>
            <Route path="/featured" component={FeaturedStreams} />
            <Route path="/top" component={TopLiveStreams} />
            <Route path="/channel/:channel_id" component={UserProfile} />
            <Route path="/game/" component={GameProfile} />
            <Route path="/categories" component={Games} />
            <Route exact path="/" component={Homepage} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
