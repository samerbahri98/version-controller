import {
  faFile,
  faFolder,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import RepoSettingsBar from "../../Components/Components/RepoSettingsBar";
import SettingsBar from "../../Components/Components/SettingsBar";
import Matrix from "../../Components/Table/Matrix";
import Table from "../../Components/Table/Table";
import { useDashboardLayout } from "../../Contexts/DashboardContexts";
import { useReposList } from "../../Contexts/UserContexts";
import { ITableCell } from "../../Interfaces/Table/ITableCell";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import {
  RepoLayoutProvider,
  useFetchRepo,
  useRepo,
} from "../../Contexts/RepoContext";

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
  const repoLayout = useRepo();
  const fetchRepoLayout = useFetchRepo();
  const [folder, setFolder] = useState<ITableCell[]>([]);

  useEffect(() => {
    if (fetchRepoLayout)
      fetchRepoLayout({
        repository_id: "cd0f7591-357a-4ceb-9665-c11809ce73b0",
      });
  }, []);

  useEffect(() => {
    if (repoLayout)
      setFolder([
        ...repoLayout.masterHeadCommit.tree.files.map(
          (f) =>
            ({
              id: f,
              name: f,
              icon: faFolder,
              link: `/repo/`,
            } as ITableCell)
        ),
        ...repoLayout.masterHeadCommit.tree.trees.map(
          (f) =>
            ({
              id: "docs",
              name: "docs",
              icon: faFolder,
              link: `/repo/`,
            } as ITableCell)
        ),
      ]);
  }, [repoLayout]);

  const reposList = useReposList();
  return (
    <div className="notification">
      {/* <InfoModal /> */}
      <nav className="panel">
        <p className="panel-heading">repo123</p>
        <RepoSettingsBar />
        {renderSwitch(dashboardLayout, folder)}
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
  );
}

export default Repo;
