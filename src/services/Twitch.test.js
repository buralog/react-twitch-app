import * as TwitchServices from "../services/Twitch";
jest.mock("./Twitch");

it('get online info of the channel', () => {
    TwitchServices.GetOnlineInfo().then(obj => {
       expect(obj.onlineInfo.stream_type).toBe('live');
    });
});

it('gets recent streams of a user', () => {
    TwitchServices.GetUserStreams().then(obj => {
        expect(obj.recent.broadcast_type).toBe('archive');
    })
});

it('gets clips on call', () => {
    TwitchServices.GetClips().then(obj => {
        expect(obj.clips).toHaveProperty('slug');
    });
});

it('gets search options on search', () => {
    TwitchServices.GetSearchOptions().then(obj => {
        expect(obj.searchOptions).toHaveProperty('name');
    });
});

it('gets live streams', () => {
    TwitchServices.GetStreams().then(obj => {
        expect(obj.getStreams.broadcast_platform).toBe('live');
    });
});

it('gets game streams', () => {
    TwitchServices.GetGameStreams().then(obj => {
        expect(obj.getStreams).toHaveProperty('game');
    });
});

it('gets game streams', () => {
    TwitchServices.GetGameViewedStreams().then(obj => {
        expect(obj.getStreams).toHaveProperty('game');
    });
});

it('gets search options on search', () => {
    TwitchServices.GetGames().then(obj => {
        expect(obj.games).toHaveProperty('channels');
    });
});