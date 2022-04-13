import { faFile, faFolder } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import RepoSettingsBar from "../../Components/Components/RepoSettingsBar";
import SettingsBar from "../../Components/Components/SettingsBar";
import Matrix from "../../Components/Table/Matrix";
import Table from "../../Components/Table/Table";
import { useDashboardLayout } from "../../Contexts/DashboardContexts";
import { useReposList } from "../../Contexts/UserContexts";
import { ITableCell } from "../../Interfaces/Table/ITableCell";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

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
const files = [
  {
    id: "docs",
    name: "docs",
    icon: faFolder,
    link: `/repo/`,
  },
  {
    id: "Readme.md",
    name: "Readme.md",
    icon: faFile,
    link: `/repo/`,
  },
  {
    id: "index.html",
    name: "index.html",
    icon: faFile,
    link: `/repo/`,
  },
];

const md = `
# H1
## H2
### H3

**bold text** *italic text*
1) list
2) list

| Syntax      | Description |
| ----------- | ----------- |
| Header      | Title       |
| Paragraph   | Text        |
---
code:
\`\`\`sql
SELECT * FROM STUDENTS ORDER BY NAME;
\`\`\`
`;
function Repo() {
  const dashboardLayout = useDashboardLayout();
  const reposList = useReposList();
  return (
    <>
      <div className="notification">
        {/* <InfoModal /> */}
        <nav className="panel">
          <p className="panel-heading">repo123</p>
          <RepoSettingsBar />
          {renderSwitch(dashboardLayout, files)}
        </nav>

        <nav className="panel">
          <p className="panel-heading">Readme.md</p>
          <div className="panel-block">
            <div className="content">
              <ReactMarkdown children={md} remarkPlugins={[gfm]} />
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}

export default Repo;
