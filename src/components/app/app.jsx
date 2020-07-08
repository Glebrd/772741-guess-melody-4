import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer";
import WelcomeScreen from "../welcome-screen/welcome-screen.jsx";
import ArtistQuestionScreen from "../artist-question-screen/artist-question-screen.jsx";
import {GameType} from "../../const";
import GenreQuestionScreen from "../genre-question-screen/genre-question-screen.jsx";
import GameScreen from "../game-screen/game-screen.jsx";
import withActivePlayer from "../../hocs/with-active-player/with-active-player";
import withUserAnswer from "../../hocs/with-user-answer/with-user-answer";
import GameOverScreen from "../game-over-screen/game-over-screen.jsx";
import WinScreen from "../win-screen/win-screen.jsx";

const GenreQuestionScreenWrapped = withActivePlayer(withUserAnswer(GenreQuestionScreen));
const ArtistQuestionScreenWrapped = withActivePlayer(ArtistQuestionScreen);

class App extends PureComponent {
  _renderGameScreen() {
    const {maxMistakes, mistakes, questions, onUserAnswer, onWelcomeButtonClick, resetGame, step} = this.props;
    const question = questions[step];

    if (step === -1) {
      return (
        <WelcomeScreen
          errorsCount={maxMistakes}
          onWelcomeButtonCLick = {onWelcomeButtonClick}
        />
      );
    }

    if (mistakes >= maxMistakes) {
      return (
        <GameOverScreen
          onReplayButtonClick={resetGame}
        />
      );
    }
    // Если удалось дойти до конаца вопросов и нас не выкинуло не выкинуло на экран проигрыша (при проверке количества ошибок), то показываем экран победы)_
    if (step >= questions.length) {
      return (
        <WinScreen
          questionsCount={questions.length}
          mistakesCount={mistakes}
          onReplayButtonClick={resetGame}
        />
      );
    }

    if (question) {
      switch (question.type) {
        case GameType.ARTIST:
          return (
            <GameScreen
              type={question.type}
            >
              <ArtistQuestionScreenWrapped
                question={question}
                onAnswer= {onUserAnswer}
              />
            </GameScreen>
          );
        case GameType.GENRE:
          return (
            <GameScreen
              type={question.type}
            >
              <GenreQuestionScreenWrapped
                question={question}
                onAnswer= {onUserAnswer}
              />
            </GameScreen>
          );
      }
    }
    return null;
  }

  render() {
    const {questions} = this.props;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderGameScreen()}
          </Route>
          <Route exact path = "/artist">
            <ArtistQuestionScreenWrapped
              question={questions[1]}
              onAnswer={() => {}}
            />
          </Route>
          <Route exact path = "/genre">
            <GenreQuestionScreenWrapped
              question={questions[0]}
              onAnswer={() => {}}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  maxMistakes: PropTypes.number.isRequired,
  mistakes: PropTypes.number.isRequired,
  questions: PropTypes.array.isRequired,
  onUserAnswer: PropTypes.func.isRequired,
  onWelcomeButtonClick: PropTypes.func.isRequired,
  resetGame: PropTypes.func.isRequired,
  step: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  step: state.step,
  maxMistakes: state.maxMistakes,
  questions: state.questions,
  mistakes: state.mistakes,
});

const mapDispatchToProps = (dispatch) => ({
  onWelcomeButtonClick() {
    dispatch(ActionCreator.incrementStep());
  },
  onUserAnswer(question, answer) {
    dispatch(ActionCreator.incrementMistake(question, answer));
    dispatch(ActionCreator.incrementStep());
  },
  resetGame() {
    dispatch(ActionCreator.resetGame());
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
