/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-globals */
import { createContext, useContext, useEffect, useState } from "react"
import { collection, doc, documentId, limit, onSnapshot, orderBy, query, setDoc, where } from "firebase/firestore"
import { auth, db, provider } from "../firebase" 
import { signInWithPopup, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import data from "../assets/FakeData/data"

const postsContext = createContext()

export function PostsContext({children}) {
    const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
    const [posts, setPosts] = useState([])
    const [usuarios, setUsuarios]=useState([])
    const [usuario, setUsuario]=useState([])
    const [documentId, setDocumentId]=useState([])
    const [usuarioOn, setUsuarioOn] = useState(isAuth ? auth?.currentUser?.uid : "")
    const [uploadPhMenu, setUploadPhMenu] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const [userSettings, setUserSettings] = useState(false)
    const [darkTheme, setDarkTheme] = useState(false)
    const [loginWUserPass, setLoginWUserPass] = useState(false)
    const [sessionEmailPass, setSessionEmailPass] = useState(false)
    const [isFollowed, setIsFollowed] = useState(false)
    const [followUser, setFollowUser] = useState([])
    const [profileFullPost, setProfileFullPost] = useState(false)
    const [uploadStoriesMenu, setUploadStoriesMenu] = useState(false)
    

    useEffect( ()=>{
        const getPost = async ()=> { onSnapshot(
          query(collection(db, "posts"), orderBy("timestamp", "desc"), limit(10)),
          (snapshot)=>{
            setPosts(snapshot.docs.map((doc)=> ({ ...doc.data(), id: doc.id})))
          }
          )}
          getPost()
        }, [db])

    useEffect( ()=>{
        const getUsuarios = async ()=> { onSnapshot(
          query(collection(db, "usuarios")),
          (snapshot)=>{
            setUsuarios(snapshot.docs.map((doc)=> ({ ...doc.data(), id: doc.id})))
          }
          )}
          getUsuarios()
        }, [db])


      useEffect(()=>{
        const usuarioEmailPass = async ()=> { onSnapshot(
          query(collection(db, "usuarios"), where("iduser", "==", !usuarioOn ? "" : usuarioOn)),
          (snapshot)=>{
            setUsuario(snapshot.docs.map((doc)=> ({ ...doc.data(), id: doc.id})))
          }
        )}
          usuarioEmailPass()
        },[db, auth?.currentUser])

/******************************GOOGLE**************************************/

function signInWithGoogle () {
        signInWithPopup(auth, provider).then((result) => {
            localStorage.setItem("isAuth", true);
            setIsAuth(true);
        })
        /**QUITÉ .then(()=>{location.reload()}) PORQUE AL RECARGAR NO SE GUARDABA EN LA DB**/
        .then( async ()=>{
            const userId = auth.currentUser.uid
            await setDoc(doc(db, "usuarios",userId), {
                iduser: auth.currentUser.uid,
                username: auth.currentUser.displayName,
                photoURL: auth.currentUser.photoURL
            })
        }).catch((error)=> console.log(error))
    };

    const signUserOut = () => {
        signOut(auth).then(()=> {
            localStorage.clear()
            setIsAuth(false)
        }).then(()=>{location.replace("/")})
      }

/********************************************************************/
    
    /***************************EMAIL & PASSWORD *********************************/
    function signUpWEmailPassword(email, password) {
        return createUserWithEmailAndPassword( auth, email, password)
      }
  
      function logInWEmailPassword (email, password) {
        signInWithEmailAndPassword(auth, email, password).then((result) => {
            localStorage.setItem("isAuth", true);
            setIsAuth(true);
        })
          /**QUITÉ PORQUE AL RECARGAR NO SE GUARDABA EN LA DB**/
        .then( async ()=>{
          const docId = auth.currentUser.uid;          
          await setDoc(doc(db, "usuarios",docId), {
                iduser: auth.currentUser.uid,
                username: auth.currentUser.displayName,
                photoURL: auth.currentUser.photoURL
            })
        }).catch((error)=> console.log(error))
        .then(()=>{location.reload()})
    };
    /*****************************************************************************/

    useEffect(async ()=>{
        const documentMap =  usuarios.map((usuario)=>{return usuario.id})
        setDocumentId(documentMap)
    },[db, usuarios])


    /****************UI/UX***************/
    const showUploadPhotoMenu = () => {
      setUploadPhMenu(true)
    }
    const showUserSetting = () => {
      setUserSettings(true)
    }
    /***********************************/

    /*****************SEARCH FILTER*******************/

    const [explorePosts, setExplorePosts]=useState([])
    const [filterPosts, setFilterPosts]=useState([])
    const [palabraSelect, setPalabraSelect]=useState("")

    useEffect(()=>{
      setExplorePosts(data)
    },[])

    const handleFilter =(e)=>{
      const searchWord = e.target.value
      setPalabraSelect(searchWord)
      const newFilter = explorePosts.filter((item)=>{
          return (
            item.username.toLowerCase().includes(searchWord.toLowerCase()) ||
            item.iduser.toLowerCase().includes(searchWord.toLowerCase()) ||
            item.description.toLowerCase().includes(searchWord.toLowerCase()) ||
            item.tags.toLowerCase().includes(searchWord.toLowerCase())
          )
      })
      if(searchWord === ""){
        setFilterPosts([])
      } else {
        setFilterPosts(newFilter)
      }
  }


    /********************************************/

    return (
        <postsContext.Provider value={{
            posts,
            setPosts,
            usuarios,
            setUsuarios,
            usuario,
            setUsuario,
            isAuth,
            setIsAuth,
            signInWithGoogle,
            signUserOut,
            signUpWEmailPassword,
            logInWEmailPassword,
            uploadPhMenu,
            setUploadPhMenu,
            showUploadPhotoMenu,
            editModal,
            setEditModal,
            userSettings,
            setUserSettings,
            showUserSetting,
            darkTheme,
            setDarkTheme,
            loginWUserPass,
            setLoginWUserPass,
            sessionEmailPass,
            setSessionEmailPass,
            isFollowed,
            setIsFollowed,
            followUser,
            setFollowUser,
            profileFullPost, 
            setProfileFullPost,
            uploadStoriesMenu, 
            setUploadStoriesMenu,
            explorePosts,
            filterPosts,
            handleFilter
        }}>
            {children}
        </postsContext.Provider>
    )
}

export function usePosts() {
    return useContext(postsContext)
}