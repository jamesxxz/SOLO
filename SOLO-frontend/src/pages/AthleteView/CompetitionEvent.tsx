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
import { useState } from "react";
import CompEventElem from "../../components/AthleteView/CompEventElem";

export default function CompetitionEvent() {
  const [compEventElems, setCompEventElems] = useState<any>([
    { event: "Women's 200m", result: "Time: 25.2 sec", ranking: "3rd" },
    { event: "Women's High Jump", result: "Height: 1.70 m", ranking: "2nd" },
    { event: "Women's 800m", result: "Time: 2:18.0 min", ranking: "5th" },
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
          Events
        </h1>
        {compEventElems.map((elem: any, idx: any) => (
          <CompEventElem compEventElem={elem} key={idx}></CompEventElem>
        ))}
      </IonContent>
      <TabBar2 />
    </IonPage>
  );
}
