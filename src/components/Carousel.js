import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Carousel } from "react-bootstrap";
import PropTypes from "prop-types";
import { GetClips } from "../services/Twitch";
import "./Carousel.scss";

class ReactCarousel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "week",
      clips: [],
      name: ""
    };

    this.updateCategory = this.updateCategory.bind(this);
    this.userClips = this.userClips.bind(this);
  }

  updateCategory = async event => {
    let value = event.target.value;
    this.setState({ value });

    let clips = await GetClips(this.props.clipQuery, value);
    this.setState({ clips });
  };

  userClips = async () => {
    let clips = await GetClips(this.props.clipQuery, "week");
    this.setState({ clips, value: "week" });
  };

  componentDidMount() {
    this.userClips();

    const node = ReactDOM.findDOMNode(this);
    const arrows = node.querySelectorAll(".carousel-control");
    const indicator = node.querySelectorAll(".carousel-indicators");

    arrows[0].style.height = "280px";
    arrows[1].style.height = "280px";
    indicator[0].style.marginBottom = "-8px";
  }

  componentDidUpdate(prevProps) {
    if (this.props.clipQuery != prevProps.clipQuery) {
      this.userClips();
    }
  }

  render() {
    const { clips } = this.state;

    const iframeClipDivs = clips.length ? (
      clips.map(item => {
        return (
          <Carousel.Item>
            <iframe
              key={item.broadcast_id}
              src={item.embed_url.concat("&autoplay=false")}
              title={item.slug}
              width="640"
              height="400"
              frameBorder="0"
              scrolling="no"
              allowFullScreen={true}
              sandbox="allow-same-origin allow-scripts"
            />
          </Carousel.Item>
        );
      })
    ) : (
      <p />
    );

    const selectDropdownRange = (
      <form>
        <select
          className="clipTimeRange"
          value={this.state.value}
          onChange={this.updateCategory}
        >
          <option value="week">this week</option>
          <option value="month">this month</option>
          <option value="all">all time</option>
        </select>
      </form>
    );

    return (
      <div>
        <div style={{ width: "100%", height: "40px" }}>
          <div className="clipTitle">
            <h4>Popular Clips of {this.props.name}</h4>
          </div>
          <div className="selectPos">{selectDropdownRange}</div>
        </div>
        <Carousel interval={null}>{iframeClipDivs}</Carousel>
      </div>
    );
  }
}

ReactCarousel.propTypes = {
  clipQuery: PropTypes.string,
  name: PropTypes.string
};

export default ReactCarousel;
