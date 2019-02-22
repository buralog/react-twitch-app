import axios from "axios";

const client_id = process.env.REACT_APP_TWITCH_KEY;
const acceptLink = "application/vnd.twitchtv.v5+json";

const TwitchAPI = axios.create({
  baseURL: "https://api.twitch.tv/kraken/",
  headers: {
    "Client-ID": client_id,
    Accept: acceptLink
  }
});

export const GetOnlineInfo = async id => {
  const response = await TwitchAPI.get(`streams/${id}`);
  return response.data.stream;
};

export const GetUserStreams = async (id, sort) => {
  const response = await TwitchAPI.get(
    `channels/${id}/videos?sort=${sort}&limit=10`
  );
  return response.data.videos;
};

export const GetClips = async (query, value) => {
  const response = await TwitchAPI.get(`${query}&period=${value}&limit=5`);
  return response.data.clips;
};

export const GetSearchOptions = async (type, value) => {
  const response = await TwitchAPI.get(
    `search/${type}?query=${value}&live=true`
  );
  return response.data;
};

export const GetStreams = async (type = "", limit = 40) => {
  const response = await TwitchAPI.get(`streams/${type}?limit=${limit}`);
  return response.data;
};

export const GetGameStreams = async name => {
  const response = await TwitchAPI.get(`streams/?game=${name}&limit=40`);
  console.log("log response:", response);
  return response.data.streams;
};

export const GetGameViewedStreams = async name => {
  const response = await TwitchAPI.get(
    `videos/top?game=${name}&period=month&limit=12`
  );
  return response.data.vods;
};

export const GetGames = async (limit = 60) => {
  const response = await TwitchAPI.get(`games/top?limit=${limit}`);
  return response.data.top;
};
