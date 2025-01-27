import { NavBar } from "components";
import { useHistory } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export const Home = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  const history = useHistory();
  return (
    <div className="home">
      <NavBar />
      <>
        <div className="vector" />
        <div className="globel-container">
          <div className="home-contents">
            <div className="call-to">
              <h1
                data-aos="fade-left"
                data-aos-offset="200"
                data-aos-duration="1000"
                data-aos-easing="ease-out"
                data-aos-mirror="true"
                data-aos-once="false"
                className="call-Header"
              >
                Speak<span> Freely</span>
              </h1>
              <p
                data-aos="fade-left"
                data-aos-offset="200"
                data-aos-duration="1500"
                data-aos-easing="linear"
                data-aos-mirror="true"
                data-aos-once="false"
                data-aos-anchor-placement="bottom-bottom"
                className="call-parag"
              >
                {" "}
                With AtlasChat, you'll get fast, simple, secure messaging and
                simple .Secure.Reliable messaging.{" "}
              </p>
              <button
                data-aos="fade-left"
                data-aos-offset="200"
                data-aos-duration="2000"
                data-aos-easing="linear"
                data-aos-mirror="true"
                data-aos-once="false"
                onClick={() => {
                  history.push("/signup");
                }}
                className="call-btn"
              >
                Singup
              </button>
            </div>
          </div>
          <div
            data-aos="fade-right"
            data-aos-offset="200"
            data-aos-duration="1500"
            data-aos-easing="ease-out"
            data-aos-mirror="true"
            data-aos-once="false"
            className="home-hero"
          ></div>
        </div>
      </>
    </div>
  );
};
