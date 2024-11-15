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
  perfElem: Object;
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
        <IonCardTitle>{Object.keys(perfElem)[0]}</IonCardTitle>
        <IonCardSubtitle>{Object.values(perfElem)[0]}</IonCardSubtitle>
        <IonIcon icon={chevronForwardOutline} />
      </IonCardContent>
    </IonCard>
  );
}
