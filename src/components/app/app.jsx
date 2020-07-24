import * as React from "react";
import {Switch, Route, Router} from "react-router-dom";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer/game/game";
import WelcomeScreen from "../welcome-screen/welcome-screen";
import ArtistQuestionScreen from "../artist-question-screen/artist-question-screen";
import {GameType} from "../../const";
import GenreQuestionScreen from "../genre-question-screen/genre-question-screen";
import GameScreen from "../game-screen/game-screen";
import withActivePlayer from "../../hocs/with-active-player/with-active-player";
import withUserAnswer from "../../hocs/with-user-answer/with-user-answer";
import GameOverScreen from "../game-over-screen/game-over-screen";
import WinScreen from "../win-screen/win-screen.js";
import {getStep, getMistakes, getMaxMistakes} from "../../reducer/game/selectors";
import {getQuestions} from "../../reducer/data/selectors";
import {AuthorizationStatus} from "../../reducer/user/user";
import {getAuthorizationStatus} from "../../reducer/user/selectors";
import {Operation as UserOperation} from "../../reducer/user/user";
import AuthScreen from "../auth-screen/auth-screen";
import history from "../../history";
import {AppRoute} from "../../const";
import PrivateRoute from "../private-route/private-route";

const GenreQuestionScreenWrapped = withActivePlayer(withUserAnswer(GenreQuestionScreen));
const ArtistQuestionScreenWrapped = withActivePlayer(ArtistQuestionScreen);

class App extends React.PureComponent {
  _renderGameScreen() {
    const {authorizationStatus, maxMistakes, mistakes, questions, onUserAnswer, onWelcomeButtonClick, step} = this.props;
    const question = questions[step];

    if (step === -1) {
      return (
        <WelcomeScreen errorsCount={maxMistakes}
                       onWelcomeButtonCLick={onWelcomeButtonClick}/>
      );
    }

    if (mistakes >= maxMistakes) {
      return history.push(AppRoute.LOSE);
    }
    // Если удалось дойти до конаца вопросов и нас не выкинуло не выкинуло на экран проигрыша (при проверке количества ошибок), то показываем экран победы)_
    if (step >= questions.length) {
      if (authorizationStatus === AuthorizationStatus.AUTH) {
        return history.push(AppRoute.RESULT);
      } else if (authorizationStatus === AuthorizationStatus.NO_AUTH) {
        return history.push(AppRoute.LOGIN);
      }
      return null;
    }

    if (question) {
      switch (question.type) {
        case GameType.ARTIST:
          return (
            <GameScreen type={question.type}> <ArtistQuestionScreenWrapped question={question}
                                                                           onAnswer={onUserAnswer}/> </GameScreen>
          );
        case GameType.GENRE:
          return (
            <GameScreen type={question.type}> <GenreQuestionScreenWrapped question={question}
                                                                          onAnswer={onUserAnswer}/> </GameScreen>
          );
      }
    }
    return null;
  }

  render() {
    const {questions, mistakes, resetGame, login} = this.props;

    return (
      <Router history={history}> <Switch> <Route exact
                                                 path={AppRoute.ROOT}>
        {this._renderGameScreen()}
      </Route> <Route exact
                      path={AppRoute.LOGIN}> <AuthScreen onReplayButtonClick={resetGame}
                                                         onSubmit={login}/> </Route> <Route exact
                                                                                            path={AppRoute.LOSE}>
        <GameOverScreen onReplayButtonClick={resetGame}/> </Route> <PrivateRoute exact
                                                                                 path={AppRoute.RESULT}
                                                                                 render={() => {
                                                                                   return (
                                                                                     <WinScreen questionsCount={questions.length}
                                                                                                mistakesCount={mistakes}
                                                                                                onReplayButtonClick={resetGame}/>
                                                                                   );
                                                                                 }}/> </Switch> </Router>
    );
  }
}

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  step: getStep(state),
  maxMistakes: getMaxMistakes(state),
  questions: getQuestions(state),
  mistakes: getMistakes(state),
});

const mapDispatchToProps = (dispatch) => ({
  login(authData) {
    dispatch(UserOperation.login(authData));
  },
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
