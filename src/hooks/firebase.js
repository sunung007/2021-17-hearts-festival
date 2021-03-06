import {companyList} from "../data/company";

import {initializeApp} from "firebase/app";
import {
  getFirestore,
  getDocs,
  getDoc,
  setDoc,
  Timestamp,
  doc,
  collection,
} from "firebase/firestore";
import {getAnalytics, logEvent} from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const fbApp = initializeApp(firebaseConfig);
const fbDB = getFirestore(fbApp);
const fbAnalytics = getAnalytics(fbApp);

// 댓글
export async function getComments(companyId) {
  async function emptyArrayCreate(commentDoc) {
    await setDoc(commentDoc, {comments: []});
    return [];
  }

  const commentDoc = doc(fbDB, "comments", `${companyId}`);
  const docSnap = await getDoc(commentDoc);

  if (docSnap.exists()) {
    const datas = docSnap.data();
    if (datas.hasOwnProperty("comments")) {
      console.log("댓글을 성공적으로 읽어왔습니다.");
      return datas.comments;
    } else {
      // comment array create
      console.log(`Comment array 생성 : 문서 id ${companyId}`);
      return emptyArrayCreate(commentDoc);
    }
  } else {
    // documment and array create
    console.log(`Documment and array 생성 : 문서 id ${companyId}`);
    return emptyArrayCreate(commentDoc);
  }
}

export async function enrollComment(companyId, newComment) {
  const commentDoc = doc(fbDB, "comments", `${companyId}`);
  const docSnap = await getDoc(commentDoc);
  const datas = docSnap.data();
  const writeDatas = [
    ...datas?.comments,
    {
      ...newComment,
      time: Timestamp.fromDate(new Date()),
    },
  ];

  await setDoc(commentDoc, {comments: writeDatas}, {merge: true});
  logEvent(fbAnalytics, "comment_enroll");
}

export async function deleteComment(companyId, target) {
  const commentDoc = doc(fbDB, "comments", `${companyId}`);
  const docSnap = await getDoc(commentDoc);
  const datas = docSnap.data();

  let comments = datas.comments;
  if (comments === undefined) {
    comments = [];
    await setDoc(commentDoc, {comments: comments}, {merge: true});
    return comments;
  }

  const tmpDate = target.time.split(".");
  const targetDate = new Date("20" + tmpDate[0], tmpDate[1], tmpDate[2]);

  let i = 0;
  for (; i < comments.length; i++) {
    const c = comments[i];
    const postDate = new Date(c.time.seconds * 1000);
    if (
      postDate.getDate() === targetDate.getDate() &&
      c.author_name === target.author_name &&
      c.author_email === target.author_email &&
      c.value === target.value
    )
      break;
  }

  if (i < comments.length) comments.splice(i, 1);
  else throw Error("Delete Error : Index");

  await setDoc(commentDoc, {comments: comments}, {merge: true});
  logEvent(fbAnalytics, "event_comment_delete");

  return comments;
}

// DB
export async function getParticipants() {
  const partCol = collection(fbDB, "participants");
  // const partDoc = doc(fbDB, "participants", `${pid}`);
  const docSnap = await getDocs(partCol);

  let datas = [];
  docSnap.forEach((doc) => datas.push(doc.data()));
  return datas || [];
}

export async function getCompanyInterview(companyId) {
  async function createNewCompanyDoc() {
    const localInfo = companyList.filter((entry) => entry.id === companyId)[0];
    const result = {
      id: localInfo.id,
      name: localInfo.name,
      link: "",

      banner: "",
      movie: "",

      oneline: "",
      intro: "",
      sections: [
        {title: "", content: ""},
        {title: "", content: ""},
        {title: "", content: ""},
      ],

      isReady: true,
    };
    await setDoc(companyDoc, result);
    return result;
  }

  const companyDoc = doc(fbDB, "companies", `${companyId}`);
  const docSnap = await getDoc(companyDoc);

  if (docSnap.exists()) {
    const datas = docSnap.data();
    if (datas.hasOwnProperty("isReady")) {
      console.log("기업 정보를 성공적으로 읽어왔습니다.");
      return datas;
    } else {
      // company array create
      console.log(`Company array 생성 : Company id ${companyId}`);
      return createNewCompanyDoc();
    }
  } else {
    // documment and array create
    console.log(`Documment and array 생성 : Company id ${companyId}`);
    return createNewCompanyDoc();
  }
}

export async function getCompanyOnelines() {
  const companyDoc = doc(fbDB, "companies", "oneline");
  const docSnap = await getDoc(companyDoc);
  if (docSnap.exists()) {
    const datas = docSnap.data();
    return datas;
  }
}

// Anaytics
export function logConnect() {
  logEvent(fbAnalytics, "connect");
  console.log("DB Analytics Connection");
}
export function logScreenView(screenName, screenClass) {
  logEvent(fbAnalytics, "screen_view", {
    firebase_screen: screenName,
    firebase_screen_class: screenClass,
  });
  console.log(`Analytics Event Log : ${screenName}`);
}

// 이벤트 답글
export async function getEventComments() {
  async function emptyArrayCreate(commentDoc) {
    await setDoc(commentDoc, {comments: []});
    return [];
  }

  const commentDoc = doc(fbDB, "eventComments", "event");
  const docSnap = await getDoc(commentDoc);

  if (docSnap.exists()) {
    const datas = docSnap.data();
    if (datas.hasOwnProperty("comments")) {
      console.log("댓글을 성공적으로 읽어왔습니다.");
      return datas.comments;
    } else {
      // comment array create
      console.log(`Event Comment array 생성 : 문서 id event`);
      return emptyArrayCreate(commentDoc);
    }
  } else {
    // documment and array create
    console.log(`Event Documment and array 생성 : 문서 id event`);
    return emptyArrayCreate(commentDoc);
  }
}

export async function enrollEventComment(newComment) {
  const commentDoc = doc(fbDB, "eventComments", "event");
  const docSnap = await getDoc(commentDoc);
  const datas = docSnap.data();
  const writeDatas = [
    ...datas?.comments,
    {
      ...newComment,
      time: Timestamp.fromDate(new Date()),
    },
  ];

  await setDoc(commentDoc, {comments: writeDatas}, {merge: true});
  logEvent(fbAnalytics, "event_comment_enroll");
}

export async function deleteEventComment(target) {
  const commentDoc = doc(fbDB, "eventComments", "event");
  const docSnap = await getDoc(commentDoc);
  const datas = docSnap.data();

  let comments = datas.comments;
  if (comments === undefined) {
    comments = [];
    await setDoc(commentDoc, {comments: comments}, {merge: true});
    return comments;
  }

  const tmpDate = target.time.split(".");
  const targetDate = new Date("20" + tmpDate[0], tmpDate[1], tmpDate[2]);

  let i = 0;
  for (; i < comments.length; i++) {
    const c = comments[i];
    const postDate = new Date(c.time.seconds * 1000);
    if (
      postDate.getDate() === targetDate.getDate() &&
      c.author_name === target.author_name &&
      c.author_email === target.author_email &&
      c.value === target.value &&
      c.type === target.type
    )
      break;
  }

  if (i > -1 && i < comments.length) comments.splice(i, 1);
  else throw Error("Delete Error : Index");

  await setDoc(commentDoc, {comments: comments}, {merge: true});
  logEvent(fbAnalytics, "event_comment_delete");

  return comments;
}

// 당첨자
export async function getNthVisitor() {
  logConnect();

  const commentDoc = doc(fbDB, "eventComments", "visitor");
  const docSnap = await getDoc(commentDoc);

  let visitors = 0;

  if (docSnap.exists()) {
    const datas = docSnap.data();
    if (datas.hasOwnProperty("count")) visitors = datas.count;
  }

  await setDoc(commentDoc, {count: visitors + 1}, {merge: false});
  return visitors;
}

export async function enrollNthComment(newComment) {
  const commentDoc = doc(fbDB, "eventComments", "nthVisitor");
  const docSnap = await getDoc(commentDoc);
  const datas = docSnap.data();
  const writeDatas = [
    ...datas?.comments,
    {
      ...newComment,
      time: Timestamp.fromDate(new Date()),
    },
  ];

  await setDoc(commentDoc, {comments: writeDatas}, {merge: true});
  logEvent(fbAnalytics, "event_nth_comment_enroll");
}
