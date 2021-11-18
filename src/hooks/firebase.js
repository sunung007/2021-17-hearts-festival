// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getFirestore, getDoc, setDoc, Timestamp, doc} from "firebase/firestore";
import {collection} from "firebase/firestore";
import {getDocs} from "firebase/firestore";
import {companyList} from "../data/company";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

async function emptyArrayCreate(commentDoc) {
  await setDoc(commentDoc, {comments: []});
  return [];
}

export async function getComments(companyId) {
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

export async function enrollComments(companyId, newComment) {
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
}

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
      banner: "",
      date: "",
      imgs: [],
      intro: "",
      isReady: false,
      movie: "",
      oneline: "",
      qna: [],
      tags: [],
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
