import React from "react";
import {
  IonPage,
  IonHeader,
  IonContent,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
} from "@ionic/react";
import NewTabBar from "./NewTabBar";
import "../../components/AthleteView/MediaGallery.css";

const MediaGallery: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar
          className="media-header"
          style={{
            "--background": "linear-gradient(to right, #0e78ac, #150a8c)",
          }}
        >
          {" "}
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" style={{ color: "white" }} />
          </IonButtons>
          <IonTitle className="ion-text-center">Media</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <p className="media-text">Media</p>
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
      </IonContent>
      <NewTabBar />
    </IonPage>
  );
};

export default MediaGallery;
