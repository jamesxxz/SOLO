import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonIcon,
} from "@ionic/react";
import "./PerformanceElement.css";
import { chevronForwardOutline, flame } from "ionicons/icons";
import "./CompResElem.css";

interface CompResElemProps {
  compResElem: any;
}

export default function CompResElem({ compResElem }: CompResElemProps) {
  return (
    <IonCard
      style={{
        background:
          "linear-gradient(to right, #3499CD 0%, #3485CD 29%, #354DCD 59%, #26256C 100%)",
        height: "11vh",
      }}
    >
      <IonCardContent className="result-info">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
          }}
        >
          <IonCardTitle style={{ fontSize: "25px" }}>
            {compResElem.activity}
          </IonCardTitle>
          <IonCardSubtitle style={{ fontSize: "20px", fontWeight: "normal" }}>
            {compResElem.date}
          </IonCardSubtitle>
        </div>
        <IonIcon icon={chevronForwardOutline} style={{ marginTop: "20px" }} />
      </IonCardContent>
    </IonCard>
  );
}
