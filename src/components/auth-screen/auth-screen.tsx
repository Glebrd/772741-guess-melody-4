import * as React from "react";

interface Props {
  onSubmit: ({login, passweord}: { login: string; passweord: string }) => void;
  onReplayButtonClick: () => void;
}

class AuthScreen extends React.PureComponent<Props, {}> {
  private loginRef: React.RefObject<HTMLInputElement>;
  private passwordRef: React.RefObject<HTMLInputElement>;

  constructor(props) {
    super(props);

    this.loginRef = React.createRef();
    this.passwordRef = React.createRef();

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(evt) {
    const {onSubmit} = this.props;

    evt.preventDefault();

    onSubmit({
      login: this.loginRef.current.value,
      passweord: this.passwordRef.current.value,
    });
  }

  render() {
    const {onReplayButtonClick} = this.props;

    return (
      <section className="login">
        <div className="login__logo"><img src="img/melody-logo.png"
          alt="Угадай мелодию"
          width="186"
          height="83"/></div>
        <h2 className="login__title">Вы настоящий меломан!</h2>
        <p className="login__text">Хотите узнать свой результат? Представтесь!</p>
        <form
          onSubmit={this.handleSubmit}
          className="login__form" action=""
        >
          <p className="login__field">
            <label className="login__label"
              htmlFor="name">Логин</label>
            <input
              ref={this.loginRef}
              className="login__input" type="text" name="name" id="name"
            />
          </p>
          <p className="login__field">
            <label className="login__label"
              htmlFor="password">Пароль</label>
            <input
              ref={this.passwordRef}
              className="login__input" type="password" name="password" id="password"/>
            <span className="login__error">Неверный пароль</span>
          </p>
          <button className="login__button button" type="submit">Войти
          </button>
        </form>
        <button
          onClick={onReplayButtonClick}
          className="replay" type="button">Сыграть ещё раз
        </button>
      </section>
    );
  }
}

export default AuthScreen;
