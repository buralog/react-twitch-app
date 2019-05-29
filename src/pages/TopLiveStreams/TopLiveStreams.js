import React, { Component } from "react";
import Loading from "../../components/Loader";
import LiveStreamCard from "../../components/LiveStreamCard";
import { GetStreams } from "../../services/Twitch";

const style = {
  display: "flex",
  flexFlow: "wrap",
  justifyContent: "center",
  marginTop: "0px",
  marginBottom: "20px"
};

class topLiveStreams extends Component {
  state = {
    streams: [],
    error: null
  };

  GetStreams = async () => {
    try {
      let streams = await GetStreams();
      let topStreams = await streams.streams;
      this.setState({ streams: topStreams });
    } catch (error) {
      this.setState({ error: "error" });
      console.log(error);
    }
  };

  componentDidMount() {
    this.GetStreams();
  }

  render() {
    const { streams, error } = this.state;

    if (error) {
      return (
        <div style={{ margin: "50px", textAlign: "center" }}>
          <h4>Something went wrong.</h4>
        </div>
      );
    }

    const renderStreams = streams.length ? (
      streams.map(stream => {
        return (
          <LiveStreamCard
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
      <div style={{ marginTop: "50px" }}>
        <Loading />
      </div>
    );

    return (
      <div>
        <div style={style}>{renderStreams}</div>
      </div>
    );
  }
}

export default topLiveStreams;
