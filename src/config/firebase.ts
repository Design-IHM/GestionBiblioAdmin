// src/config/firebase.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
	// Your Firebase config
	apiKey: "AIzaSyAycPH0e54OEuQKZHJlJVBzrl8PJwE5eEw",
	authDomain: "test-b1637.firebaseapp.com",
	databaseURL: "https://test-b1637-default-rtdb.europe-west1.firebasedatabase.app",
	projectId: "test-b1637",
	storageBucket: "test-b1637.appspot.com",
	messagingSenderId: "912702084020",
	appId: "1:912702084020:web:7c4470b95d458da35558e1",
	measurementId: "G-PWEJXF3Q4M"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
