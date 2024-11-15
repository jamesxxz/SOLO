import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonIcon,
} from "@ionic/react";
import "./CompEventElem.css";

interface CompEventElemProps {
  compEventElem: any;
}

export default function CompEventElem({ compEventElem }: CompEventElemProps) {
  return (
    <IonCard
      style={{
        background:
          "linear-gradient(to right, #3499CD 0%, #3485CD 29%, #354DCD 59%, #26256C 100%)",
        height: "15vh",
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
          <IonCardTitle style={{ fontSize: "25px" }} className="title">
            {compEventElem.event}
          </IonCardTitle>
          <IonCardSubtitle style={{ fontSize: "20px", fontWeight: "normal" }}>
            {compEventElem.result}
          </IonCardSubtitle>
        </div>
        <IonCardHeader
          style={{
            color: "white",
            fontSize: "40px",
            fontWeight: "bold",
          }}
          className="rankingTitle"
        >
          {compEventElem.ranking}
        </IonCardHeader>
      </IonCardContent>
    </IonCard>
  );
}
