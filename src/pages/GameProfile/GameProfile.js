import React, { Component } from "react";
import moment from "moment";
import Loading from "../../components/Loader";
import Carousel from "../../components/Carousel";
import LiveStreamCard from "../../components/LiveStreamCard";
import PrevStreamCard from "../../components/PrevStreamCard";
import "./GameProfile.scss";
import { GetGameStreams, GetGameViewedStreams } from "../../services/Twitch";

class GameProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gameName: "",
      gameRawName: "",
      liveStreams: [],
      mostViewedStreams: [],
      waitingForResponse: true,
      error: null
    };
  }

  getGameDataFromTwitch = async () => {
    let waitingForResponse;

    // Gets the raw name of the game
    let gameRawName =
      this.props && this.props.location && this.props.location.props
        ? this.props.location.props.gameName
        : this.props.location.pathname.match(/[^/]+$/)[0];

    // Makes the gameRawName compatible with API search.
    let gameName = gameRawName.replace(/&|\+/g, match => {
      return match == "&" ? "%26" : match == "+" ? "%2B" : "";
    });

    this.setState({ gameName, gameRawName });

    try {
      let liveStreams = await GetGameStreams(gameName);
      liveStreams.length == 0
        ? (waitingForResponse = false)
        : (waitingForResponse = true);

      let mostViewedStreams = await GetGameViewedStreams(gameName);
      this.setState({ liveStreams, mostViewedStreams, waitingForResponse });
    } catch (error) {
      this.setState({ error: "error" });
      console.log(error);
    }
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    this.getGameDataFromTwitch();
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.getGameDataFromTwitch();
    }
  }

  render() {
    const {
      gameName,
      gameRawName,
      liveStreams,
      mostViewedStreams,
      waitingForResponse,
      error
    } = this.state;

    if (error) {
      return (
        <div style={{ margin: "50px", textAlign: "center" }}>
          <h4>Something went wrong.</h4>
        </div>
      );
    }

    let coverArt = `https://static-cdn.jtvnw.net/ttv-boxart/./${gameName}-272x380.jpg`;

    const gameCard = gameName ? (
      <div className="game-topContainer">
        <div className="game-logoContainer">
          <div className="game-gameLogo">
            <img src={coverArt} alt="" />
          </div>
        </div>
        <div className="game-carouselCard">
          <Carousel
            name={gameRawName}
            clipQuery={`clips/top?game=${gameName}`}
          />
        </div>
      </div>
    ) : (
      <Loading />
    );

    const title_liveStreams = (
      <h4 className="game-partTitle" style={{ marginTop: "50px" }}>
        Top Live Streams
      </h4>
    );

    const title_MostViewedStreams = (
      <h4 className="game-partTitle" style={{ marginTop: "20px" }}>
        Most Viewed Streams
      </h4>
    );

    const renderLiveStreams = liveStreams.length ? (
      liveStreams.map(stream => {
        return (
          <LiveStreamCard
            viewers={stream.viewers}
            url={stream.channel.url}
            imgURL={stream.preview.medium}
            routeParam={stream.channel._id}
            logoURL={stream.channel.logo}
            status={stream.channel.status}
            name={stream.channel.display_name}
            startedAt={"started " + moment(stream.created_at).from(moment())}
          />
        );
      })
    ) : waitingForResponse ? (
      <Loading />
    ) : (
      <h4>Seems like nobody is streaming {gameName}</h4>
    );

    const mostViewedVideosList = mostViewedStreams.length ? (
      mostViewedStreams.map(stream => {
        return (
          <PrevStreamCard
            streamLength={stream.length}
            url={stream.url}
            imgURL={stream.preview.medium}
            title={stream.title}
            gameName={stream.channel.display_name}
            routeParam={"/channel/" + stream.channel._id}
            views={stream.views}
            streamRecordTime={stream.recorded_at}
          />
        );
      })
    ) : waitingForResponse ? (
      <Loading />
    ) : (
      <h4>No videos found of {gameName}</h4>
    );

    return (
      <div>
        {gameCard}
        {title_liveStreams}
        <div className="game-streamContainer" style={{ marginTop: "100px" }}>
          {renderLiveStreams}
        </div>

        <div>{title_MostViewedStreams}</div>
        <div
          className="game-streamContainer"
          style={{ marginTop: "100px", marginBottom: "20px" }}
        >
          {mostViewedVideosList}
        </div>
      </div>
    );
  }
}

export default GameProfile;
