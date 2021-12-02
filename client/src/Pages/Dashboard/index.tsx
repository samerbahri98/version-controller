import SettingsBar from "./Components/SettingsBar";
import Table from "./Components/Table/Table";
import Matrix from "./Components/Table/Matrix";
import InfoModal from "./Components/InfoModal";
import { useDashboardLayout } from "../../Contexts/DashboardContexts";

const renderSwitch = (param: string | null) => {
  switch (param) {
    case "Table":
      return <Table />;
    case "Matrix":
      return <Matrix />;
    default:
      return <> </>;
  }
};

export default function Dashboard() {
  const dashboardLayout = useDashboardLayout();

  return (
    <div className="notification">
      <InfoModal />
      <nav className="panel">
        <p className="panel-heading">Repositories</p>
        <SettingsBar />
        {renderSwitch(dashboardLayout)}
      </nav>
    </div>
  );
}
