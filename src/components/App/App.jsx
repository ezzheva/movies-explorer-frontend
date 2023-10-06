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
  const [loggedIn, setLoggedIn] = useState(false); //!!localStorage.getItem("token")
  const [currentUser, setCurrentUser] = useState({
    name: "",
    email: "",
    _id: "",
  });
  const [isSuccessMessage, setIsSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  //регистрация пользователя
  function handleRegister({ name, email, password }) {
    setIsLoading(true);
    MainApi.register(name, email, password)
      .then(() => {
        handleLogin({ email, password });
      })
      .catch((error) => {
        if (error.status === 409) {
          setIsSuccessMessage("Пользователь с таким email уже существует");
        } else {
          setIsSuccessMessage("При регистрации пользователя произошла ошибка");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleLogin({ email, password }) {
    setIsLoading(true);
    MainApi.authorize(email, password)
      .then((res) => {
        if (res) {
          localStorage.setItem("token", res.token);
          setLoggedIn(true);
          navigate("/movies");
          setCurrentUser(res.user);
        }
      })
      .catch((error) => {
        if (error.status === 400) {
          setIsSuccessMessage("Вы ввели неправильный email или пароль");
        } else {
          setIsSuccessMessage("При авторизации произошла ошибка");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
  /**получение токена */
  function handleTokenCheck() {
    const jwt = localStorage.getItem("token");
    if (jwt) {
      MainApi.getContent(jwt)
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
  }, []);

  function handleBackPage() {
    navigate(-2);
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route path="/" element={<Main loggedIn={loggedIn} />} />
          <Route
            path="/movies"
            element={<ProtectedRoute element={Movies} loggedIn={loggedIn} />}
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute element={SavedMovies} loggedIn={loggedIn} />
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute
                element={Profile}
                loggedIn={loggedIn}
                setLoggedIn={setLoggedIn}
                setCurrentUser={setCurrentUser}
                setIsSuccessMessage={setIsSuccessMessage}
                isSuccessMessage={isSuccessMessage}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
              />
            }
          />
          <Route
            path="/signup"
            element={
              <Register
                loggedIn={loggedIn}
                onRegister={handleRegister}
                setIsSuccessMessage={setIsSuccessMessage}
                isSuccessMessage={isSuccessMessage}
                isLoading={isLoading}
              />
            }
          />
          <Route
            path="/signin"
            element={
              <Login
                loggedIn={loggedIn}
                onLogin={handleLogin}
                setIsSuccessMessage={setIsSuccessMessage}
                isSuccessMessage={isSuccessMessage}
                isLoading={isLoading}
              />
            }
          />

          <Route path="*" element={<NotFound onBackPage={handleBackPage} />} />
        </Routes>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
