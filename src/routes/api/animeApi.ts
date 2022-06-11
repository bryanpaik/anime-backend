import express from 'express';
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyB2E9bO32KrB8JO42p_-jdFb_daaStTGHU",
  authDomain: "anime-viewer-71f07.firebaseapp.com",
  databaseURL: "https://anime-viewer-71f07-default-rtdb.firebaseio.com",
  projectId: "anime-viewer-71f07",
  storageBucket: "anime-viewer-71f07.appspot.com",
  messagingSenderId: "1034480792035",
  appId: "1:1034480792035:web:60355161d6a67bad7bb0d6",
  measurementId: "G-JG15Y40B8E"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const router = express.Router();

module.exports = router;