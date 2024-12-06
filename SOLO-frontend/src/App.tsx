import React from "react";
import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Home from "./pages/Home";
import AccountQuestion1 from "./pages/CreateAccountQuestions/AccountQuestion1";
import AccountQuestion2 from "./pages/CreateAccountQuestions/AccountQuestion2";
import AccountQuestion3 from "./pages/CreateAccountQuestions/AccountQuestion3";
import AccountQuestion4 from "./pages/CreateAccountQuestions/AccountQuestion4";
import AccountQuestion5 from "./pages/CreateAccountQuestions/AccountQuestion5";
import AccountQuestion6 from "./pages/CreateAccountQuestions/AccountQuestion6";
import Login from "./pages/LogIn/Login";
import AddAthleteView from "../src/pages/CoachView/AddAthleteView";
import CoachHome from "./pages/CoachView/CoachHome";
import AAQuestion1 from "./pages/AthleteAccount/AAQuestion1";
import CAQuestion1 from "./pages/CoachAccount/CAQuestion1";
import SECoach from "./pages/Start Exploring/SECoach";
import SEAthlete from "./pages/Start Exploring/SEAthlete";
import TabBar from "./pages/CoachView/TabBar";
import TabBar2 from "./pages/AthleteView/TabBar2";
import AthleteViewAccount from "./pages/AthleteView/AthleteViewAccount";
import AthleteViewMedia from "./pages/AthleteView/AthleteViewMedia";
import AthleteCurrentMedia from "./pages/AthleteView/AthleteCurrentMedia";
import AthletePastMedia from "./pages/AthleteView/AthletePastMedia";
import AthleteEditProfile from "./pages/AthleteView/AthleteEditProfile";
import AthleteProfile from "./pages/AthleteView/AthleteProfile";
import CoachProfileView from "./pages/CoachView/CoachProfileView";
import AddAthlete from "./components/GradientHeader/AddAthlete";
import CurrentAthleteView from "./pages/CoachView/AthleteProfile";
import { AuthProvider } from "./contexts/AuthContext";
import NewHome from "./pages/NewHome";
import MediaGallery from "./pages/AthleteView/MediaGallery";

import "@ionic/react/css/core.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
import "./theme/variables.css";
setupIonicReact();

const App: React.FC = () => {
  const handleNextClick = () => {
    console.log("Next button clicked!");
    // Add any additional logic you need for the next click here
  };

  const handleBackClick = () => {
    console.log("Back button clicked!");
    // Add any additional logic you need for the back click here
  };

  return (
    <IonApp>
      <AuthProvider>
        <IonReactRouter>
          <IonRouterOutlet>
            <Route exact path="/home">
              <NewHome />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/account-question-1">
              <AccountQuestion1 onNextClick={handleNextClick} />
            </Route>
            <Route exact path="/account-question-2">
              <AccountQuestion2
                onNextClick={handleNextClick}
                onBackClick={handleBackClick}
              />
            </Route>
            <Route exact path="/account-question-3">
              <AccountQuestion3
                onNextClick={handleNextClick}
                onBackClick={handleBackClick}
              />
            </Route>
            <Route exact path="/account-question-4">
              <AccountQuestion4
                onNextClick={handleNextClick}
                onBackClick={handleBackClick}
              />
            </Route>
            <Route exact path="/account-question-5">
              <AccountQuestion5
                onNextClick={handleNextClick}
                onBackClick={handleBackClick}
              />
            </Route>
            <Route exact path="/account-question-6">
              <AccountQuestion6
                onNextClick={handleNextClick}
                onBackClick={handleBackClick}
              />
            </Route>
            <Route exact path="/coach-account-question-1">
              <CAQuestion1 />
            </Route>
            <Route exact path="/athlete-account-question-1">
              <AAQuestion1 />
            </Route>
            <Route exact path="/start-exploring-coach">
              <SECoach />
            </Route>
            <Route exact path="/start-exploring-athlete">
              <SEAthlete />
            </Route>
            <Route exact path="/add-athlete-view">
              <AddAthleteView />
            </Route>
            <Route exact path="/coach-home">
              <CoachHome />
            </Route>
            <Route exact path="/tab-bar">
              <TabBar />
            </Route>
            <Route exact path="/tab-bar2">
              <TabBar2 />
            </Route>
            <Route exact path="/add-athlete">
              <AddAthlete />
            </Route>
            <Route exact path="/coach-profile-view">
              <CoachProfileView />
            </Route>
            <Route exact path="/athlete-view-account">
              <AthleteViewAccount />
            </Route>
            <Route exact path="/athlete-view-media">
              <AthleteViewMedia />
            </Route>
            <Route exact path="/athlete-current-media">
              <AthleteCurrentMedia />
            </Route>
            <Route exact path="/athlete-past-media">
              <AthletePastMedia />
            </Route>
            <Route exact path="/athlete-edit-profile">
              <AthleteEditProfile onNextClick={handleNextClick} />
            </Route>
            <Route exact path="/athlete-profile">
              <AthleteProfile />
            </Route>
            <Route exact path="/current-athlete-view">
              <CurrentAthleteView />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/media-gallery">
              <MediaGallery />
            </Route>
          </IonRouterOutlet>
        </IonReactRouter>
      </AuthProvider>
    </IonApp>
  );
};

export default App;
