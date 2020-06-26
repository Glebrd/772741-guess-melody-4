import React from "react";
import renderer from "react-test-renderer";
import WelcomeScreen from "./welcome-screen";

it(`WelcomeScreen should render correctly`, () => {
  const tree = renderer
    .create(
        <WelcomeScreen
          errorsCount={3}
          onWelcomeButtonCLick={() => {}}
        />).toJSON();

  expect(tree).toMatchSnapshot();
});
