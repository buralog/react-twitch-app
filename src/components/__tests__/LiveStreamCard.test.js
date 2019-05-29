import LiveStreamCard from "../LiveStreamCard";
import React from "react";
import { shallow } from "enzyme";

it("renders correctly", () => {
  const wrapper = shallow(
    <LiveStreamCard
      gameName="Apex Legends"
      imgURL="https://static-cdn.jtvnw.net/previews-ttv/live_user_shroud-320x180.jpg"
      logoURL="https://static-cdn.jtvnw.net/jtv_user_pictures/7ed5e0c6-0191-4eef-8328-4af6e4ea5318-profile_image-300x300.png"
      name="shroud"
      routeParam={37402112}
      startedAt="started 2 hours ago"
      status="APEX NOW  @shroud on socials for updates"
      url="https=//www.twitch.tv/shroud"
      viewers={120384}
    />
  );

  expect(wrapper).toMatchSnapshot();
});
