import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
  IonCard,
  IonCardTitle,
  IonCardSubtitle,
} from "@ionic/react";
import TabBar2 from "./TabBar2";
import CompResElem from "../../components/AthleteView/CompResElem";
import { useState } from "react";

export default function CompetitionResult() {
  const [compResElems, setCompResElem] = useState<any>([
    { "UCI Track Invitational": "Oct 15, 2024" },
    { "CA State Championships": "Oct 8, 2024" },
    { "SoCal Regional Meet": "Oct 1, 2024" },
  ]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <header className="gradient-header">
            <div className="logo">Competetion Results</div>
          </header>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <h1
          style={{
            fontSize: "3vh",
            fontWeight: "bold",
            marginTop: "20px",
            marginBottom: "20px",
            marginLeft: "20px",
            border: "None",
          }}
        >
          Recent Track Meets
        </h1>
        {compResElems.map((compResElem: Object) => (
          <CompResElem compResElem={compResElem}></CompResElem>
        ))}
      </IonContent>
      <TabBar2 />
    </IonPage>
  );
}
