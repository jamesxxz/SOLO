import React, { useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonButton,
  IonIcon,
  IonToolbar,
} from "@ionic/react";
import { menu } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import NewTabBar from "./AthleteView/NewTabBar";
import Sidebar from "./AthleteView/Sidebar";

import "../components/NewHome.css";

const NewHome: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const history = useHistory();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <div className="hero-section">
            <div className="hero-background-wrapper">
              <div className="hero-background"></div>
            </div>
            <div className="menu-icon-container">
              <IonIcon
                icon={menu}
                className="menu-icon"
                onClick={toggleSidebar}
              />
            </div>
            <div className="hero-content-wrapper">
              <div className="hero-content">
                <h1>Samantha</h1>
                <p>Los Angeles, CA</p>
              </div>
            </div>
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <p>Recent Media</p>
        <div className="photo-gallery">
          <div className="photo-item">
            <img
              src="/7fc50ca6aac7bfdb5d06b56fe0839e4b.png"
              alt="Gallery Image 1"
              className="photo"
            />
          </div>
          <div className="photo-item">
            <img
              src="/42f11a4a635ef1a10449411ad5d1661a.png"
              alt="Gallery Image 2"
              className="photo"
            />
          </div>
          <div className="photo-item">
            <img
              src="/e5e0942b2ca723a358ade691f11d8e12.png"
              alt="Gallery Image 3"
              className="photo"
            />
          </div>
          <div className="photo-item">
            <img
              src="/f3fd66ee5b7318e7c7fa1e81e9238e7f.png"
              alt="Gallery Image 4"
              className="photo"
            />
          </div>
        </div>
        <p>View all</p>
        <div className="main-content">
          <IonButton
            expand="block"
            onClick={() => history.push("/another-page")}
          >
            Upload Media
          </IonButton>
          <IonButton
            expand="block"
            onClick={() => history.push("/another-page")}
          >
            Performance Diagnostic
          </IonButton>
        </div>
      </IonContent>
      <NewTabBar />
      <Sidebar isOpen={sidebarOpen} onClose={toggleSidebar} />
    </IonPage>
  );
};

export default NewHome;
