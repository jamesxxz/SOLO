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
import { Key, useState } from "react";
import PerformanceElement from "../../components/AthleteView/PerformanceElement";

export default function PerformanceSummary() {
  const [perfomElems, setPerformElems] = useState<any>([
    { factor: "Average Speed", data: "13.5 m/s" },
    { factor: "Reaction Time", data: ".18 sec" },
    { factor: "Acceleration", data: "2.5 m/s²" },
    { factor: "Deceleration", data: "-2 m/s²" },
    { factor: "Form Efficiency", data: "85%" },
    { factor: "Cadence", data: "180 SPM" },
    { factor: "Heart Rate", data: "165 BPM" },
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
          Overview
        </h1>
        {perfomElems.map((elem: Object, idx: Key) => (
          <PerformanceElement perfElem={elem} key={idx}></PerformanceElement>
        ))}
      </IonContent>
      <TabBar2 />
    </IonPage>
  );
}
