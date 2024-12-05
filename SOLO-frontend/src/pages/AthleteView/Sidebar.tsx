import React from "react";
import { IonButton, IonIcon } from "@ionic/react";
import { close, barChart, trophy, list } from "ionicons/icons";
import "./Sidebar.css";

interface SidebarProps {
  onClose: () => void;
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ onClose, isOpen }) => {
  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={onClose}></div>}

      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <h1>Menu</h1>
          <IonIcon icon={close} className="close-icon" onClick={onClose} />
        </div>

        <button className="sidebar-button">
          <IonIcon icon={barChart} slot="start" />
          Performance Summaries
        </button>

        <button className="sidebar-button">
          <IonIcon icon={trophy} slot="start" />
          Competition Results
        </button>

        <button className="sidebar-button">
          <IonIcon icon={list} slot="start" />
          Category Rankings
        </button>
      </div>
    </>
  );
};

export default Sidebar;
