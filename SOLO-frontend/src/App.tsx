import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import AccountQuestion1 from './pages/CreateAccountQuestions/AccountQuestion1';
import AccountQuestion2 from './pages/CreateAccountQuestions/AccountQuestion2';
import AccountQuestion3 from './pages/CreateAccountQuestions/AccountQuestion3';
import AccountQuestion4 from './pages/CreateAccountQuestions/AccountQuestion4';

import AthleteViewAccount from './pages/AthleteView/AthleteViewAccount';
import AthleteViewMedia from './pages/AthleteView/AthleteViewMedia';
import AthleteCurrentMedia from './pages/AthleteView/AthleteCurrentMedia';
import AthletePastMedia from './pages/AthleteView/AthletePastMedia';
import AthleteEditProfile from './pages/AthleteView/AthleteEditProfile';
import AthleteProfile from './pages/AthleteView/AthleteProfile';
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/account-question-1">
          <AccountQuestion1 />
        </Route>
        <Route exact path="/account-question-2">
          <AccountQuestion2 />
        </Route>
        <Route exact path="/account-question-3">
          <AccountQuestion3 />
        </Route>
        <Route exact path="/account-question-4">
          <AccountQuestion4 />
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
          <AthleteEditProfile />
        </Route>
        <Route exact path="/athlete-profile">
          <AthleteProfile />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
