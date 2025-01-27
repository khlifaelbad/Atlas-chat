import { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import { useHistory } from "react-router-dom";
import { FormField } from "components/FormField/FormField";
import { validationSchema, defaultValues } from "./formikConfig";
import { NavBar } from "components/NavBar/NavBar";
import AOS from "aos";
import "aos/dist/aos.css";
import { loginUser } from "../../api/createUser";

export const Login = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  const history = useHistory();
  const [serverError, setServerError] = useState("");

  const login = ({ email, password }, { setSubmitting }) => {
    loginUser(email, password)
      .then(() => {
        history.push("/chat");
      })
      .catch((err) => {
        const errorMessage =
          err.response?.data?.error ||
          err.message ||
          "Something went wrong :(";
        setServerError(errorMessage);
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <div className="login">
      <NavBar />
      <div className="sing-container">
        <div className="sing-hero">
          <div className="sing-avatar"></div>
        </div>
        <div
          data-aos="fade-up"
          data-aos-offset="200"
          data-aos-duration="1000"
          data-aos-easing="ease-out"
          data-aos-mirror="true"
          data-aos-once="false"
          className="auth-form"
        >
          <h1>Login</h1>
          <Formik
            onSubmit={login}
            validateOnMount={true}
            initialValues={defaultValues}
            validationSchema={validationSchema}
          >
            {({ isValid, isSubmitting }) => (
              <Form>
                <FormField
                  name="email"
                  label="Email"
                  type="email"
                  placeholder="Enter your email"
                />
                <FormField
                  name="password"
                  label="Password"
                  type="password"
                  placeholder="Your Password"
                />

                <div className="auth-link-container">
                  Don't have an account?{" "}
                  <span
                    className="auth-link"
                    onClick={() => history.push("signup")}
                  >
                    Sign Up!
                  </span>
                </div>

                <button type="submit" disabled={isSubmitting || !isValid}>
                  Login
                </button>
              </Form>
            )}
          </Formik>

          {!!serverError && <div className="error">{serverError}</div>}
        </div>
      </div>
    </div>
  );
};
