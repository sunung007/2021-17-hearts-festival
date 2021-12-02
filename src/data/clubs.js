export const clubs = [
  {
    id: 0,
    name: "드림",
    logo: require("../assets/logos/sv1.png").default,
    poster: [
      "https://firebasestorage.googleapis.com/v0/b/hearts-festival.appspot.com/o/%EB%8F%99%EC%95%84%EB%A6%AC%20%ED%8F%AC%EC%8A%A4%ED%84%B0%2F%E1%84%83%E1%85%B3%E1%84%85%E1%85%B5%E1%86%B7.jpg?alt=media&token=68c45c02-0364-4484-afde-c5d91e437ea0",
      "https://firebasestorage.googleapis.com/v0/b/hearts-festival.appspot.com/o/%EB%8F%99%EC%95%84%EB%A6%AC%20%ED%8F%AC%EC%8A%A4%ED%84%B0%2F%E1%84%83%E1%85%B3%E1%84%85%E1%85%B5%E1%86%B7%202.jpg?alt=media&token=9bd17ab4-1e6c-4ea3-af2b-cbf53076c365",
    ],
  },
  {
    id: 1,
    name: "같이걷개",
    logo: require("../assets/logos/sv2.png").default,
    poster: [
      "https://firebasestorage.googleapis.com/v0/b/hearts-festival.appspot.com/o/%EB%8F%99%EC%95%84%EB%A6%AC%20%ED%8F%AC%EC%8A%A4%ED%84%B0%2F%E1%84%80%E1%85%A1%E1%87%80%E1%84%8B%E1%85%B5%E1%84%80%E1%85%A5%E1%86%AE%E1%84%80%E1%85%A2.jpg?alt=media&token=edd4a3bc-eb2d-4d2c-84c7-c0ef930228b5",
      "https://firebasestorage.googleapis.com/v0/b/hearts-festival.appspot.com/o/%EB%8F%99%EC%95%84%EB%A6%AC%20%ED%8F%AC%EC%8A%A4%ED%84%B0%2F%E1%84%80%E1%85%A1%E1%87%80%E1%84%8B%E1%85%B5%E1%84%80%E1%85%A5%E1%86%AE%E1%84%80%E1%85%A2%202.jpg?alt=media&token=2d4f47d6-86e6-47a2-a63b-b043bdae3899",
    ],
  },
  {
    id: 2,
    name: "리플",
    logo: require("../assets/logos/sv3.png").default,
    poster: [
      "https://firebasestorage.googleapis.com/v0/b/hearts-festival.appspot.com/o/%EB%8F%99%EC%95%84%EB%A6%AC%20%ED%8F%AC%EC%8A%A4%ED%84%B0%2F%E1%84%85%E1%85%B5%E1%84%91%E1%85%B3%E1%86%AF.jpg?alt=media&token=8076cf81-2995-4437-ad07-d8fa35e99bf5",
    ],
    other: (
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
          <p>펀팅을 같이 진행 중이니 많은 참여 부탁드립니다.</p>
        </div>
        <br />

        <a
          className={"link"}
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
