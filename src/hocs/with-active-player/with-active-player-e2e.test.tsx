import * as React from "react";
import {configure, shallow} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import withActivePlayer from "./with-active-player";

configure({adapter: new Adapter()});

const MockComponent = () => <div />;
const MockComponentWrapped = withActivePlayer(MockComponent);

it(`Should return 0 at start `, () => {
  const wrapper = shallow(<MockComponentWrapped />);

  expect(wrapper.state().activePlayerId).toEqual(0);
});
