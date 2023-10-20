import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCGnRX8s-qtyaqLCNI0tEPaeurwpY8x2fc",
  authDomain: "rn-instagram-clone-live-d263d.firebaseapp.com",
  projectId: "rn-instagram-clone-live-d263d",
  storageBucket: "rn-instagram-clone-live-d263d.appspot.com",
  messagingSenderId: "1018956789009",
  appId: "1:1018956789009:web:50d4077ad49c57776a88b0",
};

const firebaseInit = initializeApp(firebaseConfig);

const firestore = getFirestore(firebaseInit);

export { firebaseInit, firestore };
