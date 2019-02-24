import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Homepage.scss";
import Loading from "../components/Loading";
import Carousel from "../components/Carousel";
import StreamCard from "../components/LiveStreamCard";
import { GetGames, GetStreams } from "../services/Twitch";

const numberWithCommas = num =>
  num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      topLiveStreams: [],
      games: [],
      featuredStreams: [],
      error: null
    };
  }
  getData = async () => {
    try {
      let games = await GetGames(6);
      let streams = await GetStreams("", 4);
      let topLiveStreams = await streams.streams;

      let featStreams = await GetStreams("featured", 20);
      let featured = await featStreams.featured;
      let featuredStreams = featured
        .sort(() => 0.5 - Math.random())
        .slice(0, 4);

      this.setState({
        topLiveStreams,
        featuredStreams,
        games
      });
    } catch (error) {
      this.setState({ error: "error" });
      console.log(error);
    }
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    this.getData();
  }

  render() {
    const { games, topLiveStreams, featuredStreams, error } = this.state;

    if (error) {
      return (
        <div style={{ margin: "50px", textAlign: "center" }}>
          <h4>Something went wrong.</h4>
        </div>
      );
    }

    const gamesList = games.length
      ? games.map(item => {
          return (
            <GameCard
              key={item.game._id}
              name={item.game.name}
              imgURL={item.game.box.large}
              viewers={item.viewers}
            />
          );
        })
      : null;

    const topContainer = (
      <div className="home-topContainer">
        <div>
          <h4 className="home-categTitle">
            <Link style={{ color: "#333" }} to="/categories">
              Top Categories
            </Link>
          </h4>

          <div className="home-gamesList">{gamesList}</div>
        </div>

        <div className="home-carouselCard">
          <Carousel name="Twitch" clipQuery="clips/top?" />
        </div>
      </div>
    );

    const title_RecentStreams = (
      <h4 className="home-partTitle">
        <Link style={{ color: "#333" }} to="/top-streams">
          Top Streams
        </Link>
      </h4>
    );

    const title_MostViewedStreams = (
      <h4 className="home-partTitle" style={{ marginTop: "20px" }}>
        <Link style={{ color: "#333" }} to="/featured-streams">
          Featured Streams
        </Link>
      </h4>
    );

    const recentVideosList = topLiveStreams.length ? (
      topLiveStreams.map(stream => {
        return (
          <StreamCard
            key={stream.channel._id}
            viewers={stream.viewers}
            url={stream.channel.url}
            imgURL={stream.preview.medium}
            routeParam={stream.channel._id}
            logoURL={stream.channel.logo}
            status={stream.channel.status}
            name={stream.channel.display_name}
            gameName={stream.channel.game}
          />
        );
      })
    ) : (
      <Loading />
    );

    const mostViewedVideosList = featuredStreams.length ? (
      featuredStreams.map(stream => {
        return (
          <StreamCard
            key={stream.stream.channel._id}
            viewers={stream.stream.viewers}
            url={stream.stream.channel.url}
            imgURL={stream.stream.preview.medium}
            routeParam={stream.stream.channel._id}
            logoURL={stream.stream.channel.logo}
            status={stream.stream.channel.status}
            name={stream.stream.channel.display_name}
            gameName={stream.stream.channel.game}
          />
        );
      })
    ) : (
      <Loading />
    );

    return (
      <div>
        {topContainer}
        {title_RecentStreams}
        <div className="home-streamContainer">{recentVideosList}</div>
        {title_MostViewedStreams}
        <div style={{ marginBottom: "20px" }} className="home-streamContainer">
          {mostViewedVideosList}
        </div>
      </div>
    );
  }
}

const GameCard = ({ name, imgURL, viewers }) => (
  <div style={{ height: "270px", width: "201px" }} className="home-gameCard">
    <Link
      to={{
        pathname: `/game/${name}`,
        props: { gameName: name }
      }}
    >
      <img style={{ height: "200px", width: "200px" }} src={imgURL} alt="" />
    </Link>
    <p>{name}</p>
    <p style={{ fontSize: "15px" }}>{numberWithCommas(viewers)} viewers</p>
  </div>
);

export default Profile;
