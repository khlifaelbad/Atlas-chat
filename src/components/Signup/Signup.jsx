import { NavBar} from "components";
import { fb } from 'service';
import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FormField } from 'components';
import { defaultValues, validationSchema } from './formikConfig';
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export const Signup = () => {
  useEffect(() => {
    AOS.init();
  }, [])
  const history = useHistory();
  const [serverError, setServerError] = useState('');

  const signUp = ({ email, userName, password }, { setSubmitting }) => {
    fb.auth
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        if (res?.user?.uid) {
          fetch('/api/createUser', {
            method: 'POST',
            body: JSON.stringify({
              userName,
              userId: res.user.uid,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
          }).then(() => {


            fb.firestore
              .collection('chatUsers')
              .doc(res.user.uid)
              .set({ userName, avatar: '' });

              history.push("/chat");
          });

        } else {
          setServerError(
            "We're having trouble signing you up. Please try again.",
          );
        }
      })
      .catch(err => {
        if (err.code === 'auth/email-already-in-use') {
          setServerError('An account with this email already exists');
        } else {
          setServerError(
            "We're having trouble signing you up. Please try again.",
          );
        }
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <div className="singup">

<NavBar />

<div className="sing-container">
        <div className="sing-hero">
          <div className="sing-avatar"></div>
        </div>
    <div   data-aos="fade-up"
          data-aos-offset="200"
          data-aos-duration="1000"
          data-aos-easing="ease-out"
          data-aos-mirror="true"
          data-aos-once="false" className="auth-form">
      <h1>Signup</h1>
      <Formik
        onSubmit={signUp}
        validateOnMount={true}
        initialValues={defaultValues}
        validationSchema={validationSchema}
        >
        {({ isValid, isSubmitting }) => (
          <Form>
            <FormField name="userName" label="User Name"  placeholder='Enter your UserName'/>
            <FormField name="email" label="Email" type="email"  placeholder='Enter your e-mail'/>
            <FormField name="password" label="Password" type="password"  placeholder='Enter your Password'/>
            <FormField
              type="password"
              name="verifyPassword"
              label="Verify Password"
              placeholder='Verify your Password'
              />

            <div className="auth-link-container">
              Already have an account?{' '}
              <span className="auth-link" onClick={() => history.push('login')}>
                Log In!
              </span>
            </div>

            <button disabled={isSubmitting || !isValid} type="submit">
              Sign Up
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
