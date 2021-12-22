import Page from "../components/Page";

export const clubs = [
  {
    id: 0,
    name: "드림",
    logo: require("../assets/logos/sv1.png").default,
    poster: [
      require("../assets/clubs/dream1.jpeg").default,
      require("../assets/clubs/dream2.jpeg").default,
    ],
    inside: (
      <>
        <div className={"text"}>
          <p>
            '드림'은 다양한 사회문제 중 기부 문화에 대해 고민하고, 더 나은
            기부문화 정착을 위해 노력하는 팀입니다.
          </p>
          <br />
          <p>
            드림 어플리케이션을 통해 기부 관련 프로젝트의 기획자와 참여자의
            경계를 허물과 이를 통해 복지 사각지대를 최소화하고자 어플을 개발
            중입니다.
          </p>
          <br />
          <p>
            앞으로 진행될 드림의 보다 다양한 활동을 위해서 사회문제에 대한
            여러분의 의견을 들려주세요. 설문조사에 참여해주신 50분께 추첨을 통해
            아이스 아메리카노 기프티콘을 보내드립니다.
          </p>
          <br />

          <p>여러분의 소중한 의견을 들려주세요!</p>
        </div>
        <br />

        <a
          className={"link dream"}
          href={
            "https://docs.google.com/forms/d/e/1FAIpQLSfQMBTNouaP2Ks-YraWDuPGiJes5KRiOSCwZ_qtJknWeX1muw/viewform?usp=sf_link"
          }
          target={"_blank"}
          rel={"noreferrer"}
        >
          드림 설문조사
          <br />
          참여하기
        </a>
      </>
    ),
  },
  {
    id: 1,
    name: "같이걷개",
    logo: require("../assets/logos/sv2.png").default,
    poster: [
      require("../assets/clubs/dog1.jpeg").default,
      require("../assets/clubs/dog2.jpeg").default,
    ],
    inside: (
      <>
        <div className={"text"}>
          <p>
            안녕하세요. 특별한 강아지의 특별한 발자국을 기록하는 같이걷개입니다.
          </p>
          <br />

          <p>
            여러분은 강아지를 좋아하시나요?
            <br />
            강아지는 귀여운 외모만으로도 사람을 위로할 수 있지만, 그걸 넘어서
            감동도 줄 수 있어요. 저희가 소개해 드릴 강아지는 많이 특별합니다.
            외모는 매력적이고, 직업은 감동적이에요. 그 주견공은 바로 “장애인
            도우미견”이랍니다.
          </p>
          <br />

          <p>
            저희는 장애인 도우미견 인식개선을 위해 노력하고 있어요.
            <br />
            장애인 도우미견에 관심이 있으신 분들! 텀블벅을 통해 도움
            부탁드립니다.
          </p>
        </div>
        <br />

        <a
          className={"link dog"}
          href={"https://tumblbug.com/walktogether_official/story"}
          target={"_blank"}
          rel={"noreferrer"}
        >
          Unsung Hero
          <br />
          펀딩 참여하기
        </a>
      </>
    ),
    outside: (
      <Page
        className={"company-interview-page"}
        style={{backgroundColor: "var(--color-dark-gray)"}}
      >
        <div className={"company-youtube-wrapper"}>
          <iframe
            className={"youtube-player"}
            id="youtube-player"
            title="YouTube video player"
            src={"https://www.youtube.com/embed/s9MLWluWf-0?loop=1"}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscree
          ></iframe>
        </div>
      </Page>
    ),
  },
  {
    id: 2,
    name: "리플",
    logo: require("../assets/logos/sv3.png").default,
    poster: [require("../assets/clubs/reple1.jpeg").default],
    inside: (
      <>
        <div className={"text"}>
          <p>
            RE:PL은 환경분야에서 플라스틱 폐기물 문제를 중심으로 활동하고
            있습니다.
          </p>
          <br />
          <p>
            특히, 폐필름통을 예쁜 티코스터로 바꾸는 프로젝트를 진행하고
            있습니다. 폐플라스틱의 업사이클링으로 기대되는 플라스틱 폐기물의
            감소 효과로 한반도의 사계절을 지키고자 하는 마음을 티코스터에
            담았습니다.
          </p>
          <br />
          <p>펀딩을 같이 진행 중이니 많은 참여 부탁드립니다.</p>
        </div>
        <br />

        <a
          className={"link riple"}
          href={"https://tumblbug.com/skreplastic_repl_project"}
          target={"_blank"}
          rel={"noreferrer"}
        >
          폐필름통의 변신
          <br />
          펀딩 참여하기
        </a>
      </>
    ),
  },
];
