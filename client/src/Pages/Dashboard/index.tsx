import { faBook, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import SettingsBar from "./Components/SettingsBar";
import Table from "./Components/Table/Table";
import Matrix from "./Components/Table/Matrix";
import InfoModal from "./Components/InfoModal";

export default function Dashboard() {
  return (
    <div className="notification">
      <InfoModal />
      <nav className="panel">
        <p className="panel-heading">Repositories</p>
        <SettingsBar />

        <Table />
        <Matrix />
      </nav>
    </div>
  );
}
