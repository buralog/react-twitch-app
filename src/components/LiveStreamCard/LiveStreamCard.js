import React from "react";
import { Link } from "react-router-dom";
import "./LiveStreamCard.scss";
import PropTypes from "prop-types";

const numberWithCommas = num =>
  num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const LiveStreamCard = ({
  viewers,
  url,
  imgURL,
  routeParam,
  logoURL,
  status,
  name,
  gameName,
  startedAt
}) => (
  <div className="live-card">
    <p className="live-viewers">
      <i className="material-icons">person</i>
      {numberWithCommas(viewers)}
    </p>
    <a href={url} target="_blank" rel="noopener noreferrer">
      <img src={imgURL} alt="streamImage" />
    </a>
    <div className="live-streamerLogo">
      <Link to={"/channel/" + routeParam}>
        <img src={logoURL} alt="" />
      </Link>
    </div>
    <div className="live-infoPart">
      <p className="live-status" title={status}>
        {status}
      </p>
      <Link to={"/channel/" + routeParam}>
        <p className="live-streamerName">{name}</p>
      </Link>
      <Link
        to={{
          pathname: `/game/${gameName}`
        }}
      >
        <p className="live-gameName">{gameName}</p>
      </Link>
      <p className="live-startedAt">{startedAt}</p>
    </div>
  </div>
);

LiveStreamCard.propTypes = {
  viewers: PropTypes.number,
  url: PropTypes.string,
  imgURL: PropTypes.string,
  routeParam: PropTypes.number,
  logoURL: PropTypes.string,
  status: PropTypes.string,
  name: PropTypes.string,
  gameName: PropTypes.string,
  startedAt: PropTypes.string
};

export default LiveStreamCard;
