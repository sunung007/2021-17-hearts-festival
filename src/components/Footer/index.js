import "./style.css";

import logoHYU from "../../assets/logos/hyu.png";
import logoLinc from "../../assets/logos/hyu-linc.png";
import logoHVC from "../../assets/logos/hyu-sic.png";

export default function Footer() {
  return (
    <footer>
      <div className={"footer-logos"}>
        <div className={"footer-logos-wrapper"}>
          <div className={"footer-logos-label"}>주최</div>
          <div className={"footer-logos-items"}>
            <a
              href={"https://www.hanyang.ac.kr/"}
              target={"_blank"}
              rel={"noreferrer"}
              title={"한양대 홈페이지 바로가기"}
            >
              <img src={logoHYU} alt={"한양대"} />
            </a>

            <a
              href={"https://lincplus.hanyang.ac.kr/"}
              target={"_blank"}
              rel={"noreferrer"}
              title={"한양대 LINC 사업단 바로가기"}
            >
              <img src={logoLinc} alt={"한양대 LINC"} />
            </a>
          </div>
        </div>

        <div className={"footer-logos-wrapper"}>
          <div className={"footer-logos-label"}>주관</div>
          <div className={"footer-logos-items"}>
            <a
              href={"https://hvc.hanyang.ac.kr"}
              target={"_blank"}
              rel={"noreferrer"}
              title={"한양대 사회혁신센터 바로가기"}
            >
              <img src={logoHVC} alt={"한양대 사회혁신센터"} />
            </a>
          </div>
        </div>
      </div>

      <div>
        <p>
          [04763] 서울특별시 성동구 왕십리로 222 한양플라자 2층 사회혁신센터{" "}
          <b>
            <u>
              <a href="tel:02.2220.1004" title={"한양대 사회혁신센터 전화걸기"}>
                02.2220.1004
              </a>
            </u>
          </b>
        </p>
        <br />

        <p>
          본 사이트는 한양대학교 사회봉사단 사회혁신센터 주관으로 Seventeen
          Hearts Festival을 위해 제작되었습니다.
        </p>
        <p>Copyright 2021. Hanyang University Social Innovation Center</p>
        <br />

        <p>
          <u>
            <a
              href={"https://github.com/sunung007"}
              target={"_blank"}
              rel={"noreferrer"}
              title={"GITHUB"}
            >
              {" "}
              POWERED BY. GOFO(Sunwoong Kim)
            </a>
          </u>
        </p>
      </div>
    </footer>
  );
}
