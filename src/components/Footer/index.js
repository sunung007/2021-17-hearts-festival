import "./style.css";

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
              <img
                src={require("../../assets/logos/hyu.png").default}
                alt={"한양대"}
              />
            </a>

            <a
              href={"https://lincplus.hanyang.ac.kr/"}
              target={"_blank"}
              rel={"noreferrer"}
              title={"한양대 LINC 사업단 바로가기"}
            >
              <img
                src={require("../../assets/logos/hyu-linc.png").default}
                alt={"한양대 LINC"}
              />
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
              <img
                src={require("../../assets/logos/hyu-sic.png").default}
                alt={"한양대 사회혁신센터"}
              />
            </a>
          </div>
        </div>
      </div>

      <div>
        <p>POWERED BY. GOFO</p>
        <p>Copyright 2021. Hanyang University Social Innovation Center</p>
        <p>
          본 사이트는 한양대학교 사회봉사단 사회혁신센터 주관으로 Seventeen
          Hearts Festival을 위해 제작되었습니다.
        </p>
        <br />
        <p>
          [04763] 서울특별시 왕십리로 222길 한양플라자 2층 사회혁신센터{" "}
          <b>
            <u>
              <a href="tel:02.2220.1004" title={"한양대 사회혁신센터 전화걸기"}>
                02.2220.1004
              </a>
            </u>
          </b>
        </p>
      </div>
    </footer>
  );
}
