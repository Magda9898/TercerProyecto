import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword  } from "firebase/auth";
import { collection, Collections, doc, getDoc, getDocs, getFirestore, setDoc, deleteDoc } from "firebase/firestore";
import { async } from "@firebase/util";
import { uuid } from 'uuidv4';

export function firebaseconfig(){
  const Config = {
    apiKey: "AIzaSyCBJZ7TtnCB3dS5o7fFdzKyTbTasOCQ9jA",
    authDomain: "sistema-7f3e8.firebaseapp.com",
    projectId: "sistema-7f3e8",
    storageBucket: "sistema-7f3e8.appspot.com",
    messagingSenderId: "999722902765",
    appId: "1:999722902765:web:f7d0f941fb1a75d89e18e4",
    measurementId: "G-9YRE5J7T6K"
  };

  // Initialize Firebase
  const app = initializeApp(Config);
  const analytics = getAnalytics(app);
}

export function firebaseRegisterUsuario(email, password){
  createUserWithEmailAndPassword(getAuth(), email, password)
  .then(credenciales => {
    // credenciales.user.
  })
}

export async function firebaseIniciarSesion(email, password) {
  try {
    let credenciales = await signInWithEmailAndPassword(getAuth(), email, 
    password);
    //credenciales.user
  } catch(e) {
    return false;
  } 
  return true;
}

export async function firebaseBuscar (coleccionABuscar) {
let listado = [];
let consulta =  collection(getFirestore(), coleccionABuscar);
let resultado = await getDocs(consulta);
resultado.forEach(documento => {
  let objeto = documento.data();
  objeto.id = documento.id;
  listado.push(objeto);
});
return listado;
}

export function firebaseCrear(coleccion, objeto) {
  objeto.id = uuid();
  let referencia = doc(getFirestore(), coleccion, objeto.id);
  setDoc(referencia, objeto);
}

export async function firebaseEliminar(coleccion, id) {
  await deleteDoc(doc(getFirestore(), coleccion, id));
}
