import * as React from "react";
import * as renderer from "react-test-renderer";
import WinScreen from "./win-screen";
import {Router} from "react-router-dom";
import history from "../../history";
import {noop} from "../../utils";

describe(`Shhould WinScreen render correctly`, () => {
  describe(`With 3 questions`, () => {
    it(`With 0 mistake`, () => {
      const tree = renderer
        .create(
            <Router history={history}>
              <WinScreen
                questionsCount={3}
                mistakesCount={0}
                onReplayButtonClick={noop}
              />
            </Router>
        )
        .toJSON();

      expect(tree).toMatchSnapshot();
    });

    it(`With 1 mistake`, () => {
      const tree = renderer
          .create(
              <Router history={history}>
                <WinScreen
                  questionsCount={3}
                  mistakesCount={1}
                  onReplayButtonClick={noop}
                />
              </Router>
          )
            .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe(`With 2 questions`, () => {
    it(`With 0 mistakes`, () => {
      const tree = renderer
            .create(
                <Router history={history}>
                  <WinScreen
                    questionsCount={2}
                    mistakesCount={0}
                    onReplayButtonClick={noop}
                  />
                </Router>
            )
            .toJSON();

      expect(tree).toMatchSnapshot();
    });

    it(`With 1 mistake`, () => {
      const tree = renderer
            .create(
                <Router history={history}>
                  <WinScreen
                    questionsCount={2}
                    mistakesCount={1}
                    onReplayButtonClick={noop}
                  />
                </Router>
            )
        .toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});
