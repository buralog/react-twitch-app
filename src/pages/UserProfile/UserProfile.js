import React, { Component } from "react";
import moment from "moment";
import toastr from "toastr";
import Carousel from "../../components/Carousel";
import PrevStreamCard from "../../components/PrevStreamCard";
import Loading from "../../components/Loader";
import { GetOnlineInfo, GetUserStreams } from "../../services/Twitch";
import "./UserProfile.scss";

const numberWithCommas = num =>
  num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

toastr.options = {
  closeButton: false,
  debug: false,
  newestOnTop: false,
  progressBar: false,
  positionClass: "toast-bottom-right",
  preventDuplicates: true,
  showDuration: "1000",
  hideDuration: "1000",
  timeOut: "8000",
  extendedTimeOut: "0",
  showEasing: "swing",
  hideEasing: "linear",
  showMethod: "fadeIn",
  hideMethod: "fadeOut"
};

const defaultTwitchBanner =
  "https://static-cdn.jtvnw.net/jtv_user_pictures/e4f4a217-b958-4641-94c0-773972414665-profile_banner-480.png";

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      channelInfo: [],
      isOnline: null,
      recentStreams: [],
      userName: "",
      userINFO: [],
      mostViewedStreams: [],
      waitingForResponse: true,
      error: null
    };
  }

  getUserDataFromTwitch = async () => {
    let id = this.props.match.params.channel_id;
    let waitingForResponse;

    try {
      let onlineInfo = await GetOnlineInfo(id);
      this.setState({
        isOnline: onlineInfo
      });

      let recentStreams = await GetUserStreams(id, "time");
      if (onlineInfo) {
        recentStreams.shift();
      }

      let mostViewedStreams = await GetUserStreams(id, "views");

      recentStreams.length == 0
        ? (waitingForResponse = false)
        : (waitingForResponse = true);

      this.setState({
        mostViewedStreams,
        recentStreams,
        waitingForResponse,
        userINFO: recentStreams[0]
      });
    } catch (error) {
      this.setState({ error: "error" });
      console.log(error);
    }
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    this.getUserDataFromTwitch();
  }

  componentDidUpdate(prevProps, prevState) {
    const { isOnline, userINFO } = this.state;

    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.getUserDataFromTwitch();
    }

    if (userINFO && userINFO !== prevState.userINFO) {
      setTimeout(() => {
        if (isOnline && isOnline.channel) {
          toastr.success(
            `${isOnline.channel.game} </br>
             started ${moment(isOnline.created_at).from(moment())}`,
            `${isOnline.channel.display_name} is online`
          );
        } else {
          toastr.info(`${userINFO.channel.display_name} is offline`);
        }
      }, 1000);
    }
  }

  componentWillUnmount() {
    toastr.clear();
  }

  render() {
    const {
      isOnline,
      userINFO,
      recentStreams,
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

    const userOnlineCard = isOnline ? (
      <PrevStreamCard
        isLive={true}
        liveViewers={isOnline.viewers}
        url={isOnline.channel.url}
        imgURL={isOnline.preview.medium}
        title={isOnline.channel.status}
        gameName={isOnline.channel.game}
        routeParam={"/game/" + isOnline.channel.game}
        startedAt={"started " + moment(isOnline.created_at).from(moment())}
      />
    ) : null;

    const userCard =
      userINFO && userINFO.channel ? (
        <div className="user-topContainer">
          <UserInfoCard
            url={userINFO.channel.url}
            bannerURL={userINFO.channel.profile_banner}
            logoURL={userINFO.channel.logo}
            name={userINFO.channel.display_name}
            createdAt={userINFO.channel.created_at}
            followers={userINFO.channel.followers}
            views={userINFO.channel.views}
            description={userINFO.channel.description}
          />

          <div className="user-carouselCard">
            <Carousel
              name={userINFO.channel.display_name}
              clipQuery={`clips/top?channel=${userINFO.channel.name}`}
            />
          </div>
        </div>
      ) : waitingForResponse ? (
        <div
          style={{ height: "500px", marginTop: "50px" }}
          className="user-topContainer"
        >
          <Loading />
        </div>
      ) : (
        <div
          style={{ height: "400px", marginTop: "50px" }}
          className="user-topContainer"
        >
          <h4>User doesn't have a profile. </h4>
        </div>
      );

    const title_RecentStreams = (
      <h4 className="user-partTitle">Recent Streams</h4>
    );

    const title_MostViewedStreams = (
      <h4 className="user-partTitle" style={{ marginTop: "20px" }}>
        Most Viewed Streams
      </h4>
    );

    const recentVideosList =
      userOnlineCard || recentStreams.length ? (
        recentStreams.map(stream => {
          return (
            <PrevStreamCard
              streamLength={stream.length}
              url={stream.url}
              imgURL={stream.preview.medium}
              title={stream.title}
              gameName={stream.game}
              routeParam={"/game/" + stream.game}
              views={stream.views}
              streamRecordTime={stream.recorded_at}
            />
          );
        })
      ) : waitingForResponse ? (
        <Loading />
      ) : (
        <h4>No streams found.</h4>
      );

    const mostViewedVideosList = mostViewedStreams.length ? (
      mostViewedStreams.map(stream => {
        return (
          <PrevStreamCard
            streamLength={stream.length}
            url={stream.url}
            imgURL={stream.preview.medium}
            title={stream.title}
            gameName={stream.game}
            routeParam={"/game/" + stream.game}
            views={stream.views}
            streamRecordTime={stream.recorded_at}
          />
        );
      })
    ) : waitingForResponse ? (
      <Loading />
    ) : (
      <h4>No streams found.</h4>
    );

    return (
      <div>
        {userCard}
        {title_RecentStreams}
        <div className="user-streamContainer">
          {userOnlineCard}
          {recentVideosList}
        </div>

        {title_MostViewedStreams}
        <div
          className="user-streamContainer"
          style={{ marginTop: "100px", marginBottom: "20px" }}
        >
          {mostViewedVideosList}
        </div>
      </div>
    );
  }
}

const UserInfoCard = ({
  url,
  bannerURL,
  logoURL,
  name,
  createdAt,
  followers,
  views,
  description
}) => (
  <div className="user-card">
    <div className="user-banner">
      <img src={bannerURL ? bannerURL : defaultTwitchBanner} alt="" />
    </div>
    <div className="user-infoPart">
      <div className="user-logo">
        <a href={url} target="_blank" rel="noopener noreferrer">
          <img src={logoURL} alt="" />
        </a>
      </div>
      <div className="user-infoSection">
        <p>
          <u>Info</u>
        </p>
        <p>{name}</p>
        <p>joined {moment(createdAt).format("D MMM YYYY")}</p>
        <p>{numberWithCommas(followers)} followers</p>
        <p>{numberWithCommas(views)} views</p>
      </div>
      <div className="user-descSection">
        <p className="user-descTitle">
          <u>Description</u>
        </p>
        <p className="user-descText">
          {description ? description : `User doesn't have a description.`}
        </p>
      </div>
    </div>
  </div>
);

export default Profile;
