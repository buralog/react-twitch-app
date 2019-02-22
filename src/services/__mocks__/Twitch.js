const mockObject = {
  onlineInfo: {
    stream_type: "live"
  },
  clips: {
    slug: "ClipNameAsASlug"
  },
  recent: {
    broadcast_type: "archive",
  },
  searchOptions: {
    name: "shroud"
  },
  getStreams: {
    broadcast_platform: "live",
    game: "Apex Legends",
  },
  games: {
    channels: 4017,
  }
};

export const GetOnlineInfo = () => {
  return Promise.resolve(mockObject);
};

export const GetUserStreams = () => {
  return Promise.resolve(mockObject);
};

export const GetClips = () => {
  return Promise.resolve(mockObject);
};
export const GetSearchOptions = () => {
  return Promise.resolve(mockObject);
};

export const GetStreams = () => {
  return Promise.resolve(mockObject);
};

export const GetGameStreams = () => {
  return Promise.resolve(mockObject);
};

export const GetGameViewedStreams = () => {
  return Promise.resolve(mockObject);
};

export const GetGames = () => {
  return Promise.resolve(mockObject);
};
