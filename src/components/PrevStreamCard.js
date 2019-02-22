import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import "./PrevStreamCard.scss";
import PropTypes from "prop-types";

const numberWithCommas = num =>
  num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const PrevStreamCard = ({
  isLive,
  streamLength,
  liveViewers,
  startedAt,
  url,
  imgURL,
  title,
  gameName,
  routeParam,
  views,
  streamRecordTime
}) => (
  <div className="prev-card">
    {isLive ? <p className="liveTag">LIVE</p> : ""}
    {streamLength ? (
      <p className="prev-durationTime">
        {new Date(streamLength * 1000).toISOString().substr(11, 8)}
      </p>
    ) : liveViewers ? (
      <p className="prev-viewers">
        <i className="material-icons">person</i>
        {numberWithCommas(liveViewers)}
      </p>
    ) : (
      0
    )}
    <a href={url} target="_blank" rel="noopener noreferrer">
      <img src={imgURL} alt="streamImage" />
    </a>
    <div className="prev-infoPart">
      <p className="prev-status" title={title}>
        {title}
      </p>
      <Link to={routeParam}>
        <p className="prev-gameName">{gameName}</p>
      </Link>
      {views ? (
        <p className="prev-views">{numberWithCommas(views)} views</p>
      ) : (
        <p className="prev-startedAt">{startedAt}</p>
      )}
      {streamRecordTime ? (
        <p className="prev-recordedAt">
          {moment(streamRecordTime).from(moment())}
        </p>
      ) : (
        ""
      )}
    </div>
  </div>
);

PrevStreamCard.propTypes = {
  isLive: PropTypes.bool,
  liveViewers: PropTypes.number,
  streamLength: PropTypes.number,
  views: PropTypes.number,
  url: PropTypes.string,
  imgURL: PropTypes.string,
  routeParam: PropTypes.string,
  logoURL: PropTypes.string,
  title: PropTypes.string,
  name: PropTypes.string,
  gameName: PropTypes.string,
  startedAt: PropTypes.string,
  streamRecordTime: PropTypes.string
};

export default PrevStreamCard;
