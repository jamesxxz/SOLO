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
import PerformanceElement from "../../components/AthleteView/PerformanceElement";
import { useState } from "react";

export default function PerformanceSummary() {
  const [perfomElems, setPerformElems] = useState([
    { "Average Speed": "13.5 m/s" },
    { "Reaction Time": ".18 sec" },
    { Acceleration: "2.5 m/s²" },
    { Deceleration: "-2 m/s²" },
    { "Form Efficiency": "85%" },
    { Cadence: "180 SPM" },
    { "Heart Rate": "165 BPM" },
  ]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <header className="gradient-header">
            <div className="logo">Performance Summaries</div>
          </header>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {perfomElems.map((elem, idx) => (
          <PerformanceElement perfElem={elem} key={idx}></PerformanceElement>
        ))}
      </IonContent>
      <TabBar2 />
    </IonPage>
  );
}
