import PrevStreamCard from "./PrevStreamCard";
import React from "react";
import { shallow } from "enzyme";

it("renders correctly", () => {
  const wrapper = shallow(
    <PrevStreamCard
      streamLength={47319}
      streamRecordTime="2019-02-20T23:23:38Z"
      views={77705}
      gameName="Apex Legends"
      imgURL="https://static-cdn.jtvnw.net/previews-ttv/live_user_shroud-320x180.jpg"
      isLive={true}
      liveViewers={116503}
      routeParam="/game/Apex Legends"
      startedAt="started 3 hours ago"
      title="APEX NOW  @shroud on socials for updates"
      url="https=//www.twitch.tv/shroud"
    />
  );

  expect(wrapper).toMatchSnapshot();
});
