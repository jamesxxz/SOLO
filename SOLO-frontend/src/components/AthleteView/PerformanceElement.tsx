import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonIcon,
} from "@ionic/react";
import { chevronForwardOutline } from "ionicons/icons";
import "./PerformanceElement.css";

interface PerformanceElementProps {
  perfElem: any;
}

export default function PerformanceElement({
  perfElem,
}: PerformanceElementProps) {
  return (
    <IonCard
      style={{
        background:
          "linear-gradient(to right, #3499CD 0%, #3485CD 29%, #354DCD 59%, #26256C 100%)",
        height: "11vh",
      }}
    >
      <IonCardContent
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <IonCardTitle>{perfElem.factor}</IonCardTitle>
        <IonCardSubtitle style={{ alignItems: "start" }}>
          {perfElem.data}
        </IonCardSubtitle>
        <IonIcon icon={chevronForwardOutline} />
      </IonCardContent>
    </IonCard>
  );
}
