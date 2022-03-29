import React, { useState, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./components/Home"
import Profile from "./components/Profile"
import { usePosts } from "./context/PostsContext"
import NavbarBottom from "./components/NavbarBottom"
import UploadPhoto from "./components/UploadPhoto"
import EditUsernameModal from "./components/EditUsernameModal"
import UserSettings from "./components/UserSettings"
import LoginWUserPass from "./components/LoginWUserPass"
import Explore from "./components/Explore"
import Rell from "./components/Rell"
import Tags from "./components/Tags"
import Notifications from "./components/Notifications"
import Inbox from "./components/Inbox"


function App() {
  const { darkTheme, setDarkTheme } = usePosts()


  const [isReadyForInstall, setIsReadyForInstall] = React.useState(false);

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (event) => {
      // Prevent the mini-infobar from appearing on mobile.
      event.preventDefault();
      console.log("👍", "beforeinstallprompt", event);
      // Stash the event so it can be triggered later.
      window.deferredPrompt = event;
      // Remove the 'hidden' class from the install button container.
      setIsReadyForInstall(true);
    });
  }, []);

  async function downloadApp() {
    console.log("👍", "butInstall-clicked");
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
      // The deferred prompt isn't available.
      console.log("oops, no prompt event guardado en window");
      return;
    }
    // Show the install prompt.
    promptEvent.prompt();
    // Log the result
    const result = await promptEvent.userChoice;
    console.log("👍", "userChoice", result);
    // Reset the deferred prompt variable, since
    // prompt() can only be called once.
    window.deferredPrompt = null;
    // Hide the install button.
    setIsReadyForInstall(false);
  }


  return (
    <div className={darkTheme ? "dark" : ""}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route exact path={`/profile/:iduser`} element={<Profile />} />
            <Route path="/explore" element={<Explore />} />
            <Route path={`/explore/tags/:tags`} element={<Tags />} />
            <Route path={`/direct/inbox`} element={<Inbox />} />
            <Route path="/rell" element={<Rell />} />
          </Routes>
          <NavbarBottom />
        </Router>
        <UploadPhoto />
        <EditUsernameModal />
        <Notifications />
        <UserSettings />
        <LoginWUserPass />
    </div>
  )
}

export default App
