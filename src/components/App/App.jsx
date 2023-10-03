import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import "./App.css";
import Main from "../Main/Main";
import SavedMovies from "../SavedMovies/SavedMovies";
import Movies from "../Movies/Movies";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import NotFound from "../NotFound/NotFound";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import * as MainApi from "../../utils/MainApi";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  const [isSuccessMessage, setIsSuccessMessage] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  //регистрация пользователя
  function handleRegister({ name, email, password }) {
    MainApi.register(name, email, password)
      .then(() => {
        handleLogin({ email, password });
      })
      .catch((error) => {
        if (error.status === 409) {
          setIsSuccessMessage("При регистрации пользователя произошла ошибка");
        } else {
          setIsSuccessMessage("Пользователь с таким email уже существует");
        }
      });
  }
  /**получение токена */
  function handleLogin(data) {
    MainApi.authorize(data.email, data.password)
      .then((res) => {
        if (res) {
          localStorage.setItem("token", res.token);
          return res;
        }
      })
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          navigate("/movies");
        }
      })
      .catch((error) => {
        if (error.status === 401) {
          setIsSuccessMessage("Вы ввели неправильный email или пароль");
        } else if (error.status === 400) {
          setIsSuccessMessage(
            "При авторизации произошла ошибка. Неверный формат email или пароля"
          );
        } else {
          setIsSuccessMessage("При авторизации произошла ошибка");
        }
      });
  }

  function handleTokenCheck() {
    const jwt = localStorage.getItem("token");
    if (jwt) {
      MainApi.getUserInfo(jwt)
        .then((data) => {
          if (!data) {
            return;
          }
          setLoggedIn(true);
          setCurrentUser(data);
          navigate(location.pathname);
        })
        .catch((err) => {
          console.log("Ошибка:", err);
          setLoggedIn(false);
        });
    }
  }

  useEffect(() => {
    handleTokenCheck();
  }, [loggedIn]);

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route exact path="/" element={<Main loggedIn={loggedIn} />} />
          <Route
            exact
            path="/movies"
            element={<ProtectedRoute element={Movies} loggedIn={loggedIn} />}
          />
          <Route
            exact
            path="/saved-movies"
            element={
              <ProtectedRoute element={SavedMovies} loggedIn={loggedIn} />
            }
          />
          <Route
            exact
            path="/profile"
            element={
              <ProtectedRoute
                element={Profile}
                loggedIn={loggedIn}
                setLoggedIn={setLoggedIn}
                setCurrentUser={setCurrentUser}
                setIsSuccessMessage={setIsSuccessMessage}
                isSuccessMessage={isSuccessMessage}
              />
            }
          />
          <Route
            exact
            path="/signup"
            element={
              <Register
                loggedIn={loggedIn}
                onRegister={handleRegister}
                setIsSuccessMessage={setIsSuccessMessage}
                isSuccessMessage={isSuccessMessage}
              />
            }
          />
          <Route
            exact
            path="/signin"
            element={
              <Login
                loggedIn={loggedIn}
                onLogin={handleLogin}
                setIsSuccessMessage={setIsSuccessMessage}
                isSuccessMessage={isSuccessMessage}
              />
            }
          />

          <Route exact path="*" element={<NotFound />} />
        </Routes>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
