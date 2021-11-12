// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getAnalytics} from "firebase/analytics";
import {getFirestore, getDoc, setDoc, Timestamp, doc} from "firebase/firestore";

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
const fdDB = getFirestore(fbApp);
const analytics = getAnalytics(fbApp);

async function emptyArrayCreate(commentDoc) {
  await setDoc(commentDoc, {comments: []});
  return [];
}

export async function getComments(companyId) {
  const commentDoc = doc(fdDB, "comments", `${companyId}`);
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
  const commentDoc = doc(fdDB, "comments", `${companyId}`);
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
