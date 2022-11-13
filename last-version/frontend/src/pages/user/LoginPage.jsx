import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { login, clearErrors } from "../../redux/user/userActions";

import Loading from '../../components/layout/Loading'
import Header from "../../components/layout/Header";

import './LoginPage.scss'

const LoginPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()
  const dispatch = useDispatch();

  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/")
    }

    if (error) {
      dispatch(clearErrors());
    }
  }, [dispatch, alert, isAuthenticated, error, history])

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password))
  }

  return (
    <React.Fragment>
      <Header />
      {loading ? (
        <Loading />
      ) : (
        <section className="background-radial-gradient overflow-hidden" style={{ marginTop: '20px', paddingTop: '15vh', height: '100vh' }}>
          <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
            <div className="row gx-lg-5 align-items-center mb-5">
              <div className="col-lg-3 mb-5 mb-lg-0">
              </div>

              <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
                <div className="shadow bg-glass">
                  <div className="card-body px-4 py-5 px-md-5">
                    <form onSubmit={submitHandler}>
                        <div className="form-outline mb-4">
                        <input 
                          type="email" 
                          className="form-control" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <label className="form-label">
                          Email address
                        </label>
                      </div>

                      <div className="form-outline mb-4">
                        <input 
                          type="password" 
                          className="form-control" 
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <label className="form-label">
                          Password
                        </label>
                      </div>

                      <button type="submit" className="btn btn-block mb-4" style={{ backgroundColor: 'pink' }}>
                        Sign up
                      </button>

                      <Link to="/register" className="ms-5 mt-2" style={{ color: 'pink', textDecoration: 'none' }}>
                        New User?
                      </Link>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-3 mb-5 mb-lg-0">
          </div>

          {/* <div className="container row wrapper">
            <div className="col-10 col-lg-5">
              <form className="shadow-lg" onSubmit={submitHandler}>
                <h1 className="mb-3">Login</h1>
                <div className="form-group">
                  <label htmlFor="email_field">Email</label>
                  <input
                    type="email"
                    id="email_field"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password_field">Password</label>
                  <input
                    type="password"
                    id="password_field"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <Link to="/password/forgot" className="float-right mb-4">
                  Forgot Password?
                </Link>

                <button
                  id="login_button"
                  type="submit"
                  className="btn btn-block py-3"
                >
                  LOGIN
                </button>

                <Link to="/register" className="float-right mt-3">
                  New User?
                </Link>
              </form>
            </div>
          </div> */}
        </section>
      )}
    </React.Fragment>
  );
};

export default LoginPage;
