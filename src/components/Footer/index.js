import "./style.css";

export default function Footer() {
  return (
    <footer>
      <ul className={"footer-logos"}>
        <li>주관</li>
        <li>
          <a
            href={"https://hvc.hanyang.ac.kr"}
            target={"_blank"}
            rel={"noreferrer"}
          >
            <img
              src={require("../../assets/logos/hyu-sic.png").default}
              alt={"한양대 사회혁신센터"}
            />
          </a>
        </li>

        <li>주최</li>
        <li>
          <a
            href={"https://hanyang.ac.kr"}
            target={"_blank"}
            rel={"noreferrer"}
          >
            <img
              src={require("../../assets/logos/hyu.png").default}
              alt={"한양대"}
            />
          </a>
        </li>

        <li>
          <a
            href={"https://lincplus.hanyang.ac.kr/"}
            target={"_blank"}
            rel={"noreferrer"}
          >
            <img
              src={require("../../assets/logos/hyu-linc.png").default}
              alt={"한양대 LINC"}
            />
          </a>
        </li>
      </ul>

      <div>
        <p>Copyright 2021. Hanyang University Social Innovation Center</p>
        <p>
          본 사이트는 한양대학교 사회봉사단 사회혁신센터 주관으로 Seventeen
          Hearts Festival을 위해 제작되었습니다.
        </p>
        <br />
        <p>
          [04763] 서울특별시 왕십리로 222길 한양플라자 2층 사회혁신센터{" "}
          <u>
            <a href="tel:02.2220.1004">02.2220.1004</a>
          </u>
        </p>
        <br />
        <p>
          <a href="mailto:sunung007@hanyang.ac.kr">
            사이트 오류 제보 및 문의 : 한양대학교 사회혁신센터 김선웅{" "}
            <u>sunung007@hanyang.ac.kr</u>
          </a>
        </p>
      </div>
    </footer>
  );
}
