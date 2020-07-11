import {createSelector} from "reselect";
import NameSpace from "../name-space";

export const getQuestions = (state) => {
  return state[NameSpace.DATA].questions;
};

const randomFilter = () => {
  return Math.random() > 0.5;
};

export const getArtistQuestions = createSelector(getQuestions, randomFilter,
    (resultingQuestions, resultingFilter) => {
      return resultingQuestions.filter((it) => resultingFilter && it.type === `artist`);
    }
);

export const getGenreQuestions = createSelector(getQuestions,
    (questions) => {
      return questions.filter((it)=> it.type === `genre`);
    }
);
