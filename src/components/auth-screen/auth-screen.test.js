import React from "react";
import renderer from "react-test-renderer";
import AuthScreen from "./auth-screen";


it(`AuthScreen component renders correctly`, () => {
  const tree = renderer.create(
    <AuthScreen onReplayButtonClick={() => {}}
                onSubmit={() => {}}/>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
