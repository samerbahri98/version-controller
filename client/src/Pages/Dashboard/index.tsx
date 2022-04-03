import SettingsBar from "../../Components/Components/SettingsBar";
import Table from "../../Components/Table/Table";
import Matrix from "../../Components/Table/Matrix";
import InfoModal from "../../Components/Components/InfoModal";
import {
  useAddRepoContext,
  useDashboardLayout,
} from "../../Contexts/DashboardContexts";
import AddModal from "../../Components/Components/AddModal";
import { useReposList } from "../../Contexts/UserContexts";
import { faBook, faSearch } from "@fortawesome/free-solid-svg-icons";

import { ITableCell } from "../../Interfaces/Table/ITableCell";

const renderSwitch = (param: string | null, records: ITableCell[]) => {
  switch (param) {
    case "Table":
      return <Table records={records} />;
    case "Matrix":
      return <Matrix records={records} />;
    default:
      return <> </>;
  }
};

export default function Dashboard() {
  const dashboardLayout = useDashboardLayout();
  const reposList = useReposList();

  return (
    <div className="notification">
      {/* <InfoModal /> */}
      <AddModal />
      <nav className="panel">
        <p className="panel-heading">Repositories</p>
        <SettingsBar />
        {renderSwitch(
          dashboardLayout,
          reposList.map((repo) => ({
            id: repo.repository_id,
            name: repo.repository_name,
            icon: faBook,
            link:`/repo/${repo.repository_id}`
          }))
        )}
      </nav>
    </div>
  );
}
