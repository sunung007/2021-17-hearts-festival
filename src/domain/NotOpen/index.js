import "./style.css";
import {useCallback, useEffect, useState} from "react";

import Page from "../../components/Page";

import mainTitle from "../../assets/backgrounds/not-open-banner-logo.svg";
import mainTitleMobile from "../../assets/backgrounds/not-open-banner-logo-mobile.svg";

export default function NotOpen() {
  const [dday, setDday] = useState({});
  const fetchDday = useCallback(() => {
    const gap = new Date("2021-12-6 00:00") - new Date();
    setDday({
      day: Math.floor(gap / (1000 * 60 * 60 * 24)),
      hours: Math.floor((gap % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((gap % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((gap % (1000 * 60)) / 1000),
    });
  }, []);

  useEffect(() => {
    const tick = setInterval(fetchDday, 1000);
    return () => clearInterval(tick);
  }, [fetchDday]);

  return (
    <div className={"not-open"}>
      <Page
        parentClassName={"main-banner-item-poster"}
        className={"page-header"}
      >
        <img
          className={"main-header-logo"}
          src={window.innerWidth > 700 ? mainTitle : mainTitleMobile}
          alt={""}
        />
      </Page>

      <div className={"inner-padding"}>
        <center className={"font-light"}>
          행사 시작 전입니다.
          <br />본 사이트는 <b>12월 6일</b>부터 공개됩니다.
          <ul className={"dday"}>
            <li>{dday?.day}</li>:<li>{dday?.hours}</li>:<li>{dday?.minutes}</li>
            :<li>{dday?.seconds}</li>
          </ul>
        </center>
      </div>
    </div>
  );
}
