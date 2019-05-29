import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Games.scss";
import Loading from "../../components/Loader";
import { GetGames } from "../../services/Twitch";

const numberWithCommas = num =>
  num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

class Games extends Component {
  constructor(props) {
    super(props);

    this.state = {
      games: [],
      error: null
    };
  }

  GetGames = async () => {
    try {
      let games = await GetGames();
      this.setState({ games });
    } catch (error) {
      this.setState({ error: "error" });
      console.log(error);
    }
  };

  componentDidMount() {
    this.GetGames();
  }

  render() {
    const { games, error } = this.state;

    if (error) {
      return (
        <div style={{ margin: "50px", textAlign: "center" }}>
          <h4>Something went wrong.</h4>
        </div>
      );
    }

    const gamesList = games.length ? (
      games.map(item => {
        return (
          <GameCard
            name={item.game.name}
            imgURL={item.game.box.large}
            viewers={item.viewers}
          />
        );
      })
    ) : (
      <div style={{ marginTop: "50px" }}>
        <Loading />
      </div>
    );

    return <div className="games-container">{gamesList}</div>;
  }
}

const GameCard = ({ name, imgURL, viewers }) => (
  <div className="games-card">
    <Link
      to={{
        pathname: `/game/${name}`,
        props: { gameName: name }
      }}
    >
      <img src={imgURL} alt="" />
    </Link>
    <p>{name}</p>
    <p style={{ fontSize: "15px" }}>{numberWithCommas(viewers)} viewers</p>
  </div>
);

export default Games;
