import * as React from "react";
import * as renderer from "react-test-renderer";
import Mistakes from "./mistakes";

describe(`Mistakes should render corrrectly`, () => {
  it(`With one zero count`, () => {
    const tree = renderer
      .create(<Mistakes
        count={0}
      />)
        .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Wit one one count`, () => {
    const tree = renderer
      .create(<Mistakes
        count={1}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
