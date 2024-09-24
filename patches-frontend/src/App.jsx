import { Navbar } from "./components/NavBar";
import { useState } from "react";
import { ProfileBanner } from "./components/ProfileBanner";
import { PatchGallery } from "./components/PatchGallery";
import "./index.css";

function App() {
  return (
    <>
      <Navbar />
      <ProfileBanner />
      <PatchGallery />
    </>
  );
}

export default App;
