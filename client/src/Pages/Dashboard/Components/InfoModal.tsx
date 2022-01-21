import Modal from "../../../Components/Modal";
import {
  useInfoRepoContext,
  useToggleInfoRepoContext,
} from "../../../Contexts/DashboardContexts";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { ToastNotification } from "../../../Components/ToastNotification";

function InfoModal() {
  const infoRepo = useInfoRepoContext();
  const toggleInfoRepo = useToggleInfoRepoContext();
  return (
    <Modal
      title={infoRepo ? infoRepo.repository_name : ""}
      onCancel={() => toggleInfoRepo(false)}
      isVisible={infoRepo ? true : false}
    >
      <label className="label" style={{ textAlign: "left" }}>
        http
      </label>
      <div className="field has-addons">
        <div className="control is-expanded">
          <input
            className="input is-fullwidth is-primary"
            type="text"
            value={`git clone ${infoRepo?.download.http}`}
            placeholder="Find a repository"
          />
        </div>
        <div className="control">
          <CopyToClipboard text={`git clone ${infoRepo?.download.http}`} onCopy={()=>ToastNotification({
            type:"success",
            message:`${infoRepo?.repository_name} copied to your clipboard`
          })}>
            <a className="button is-primary">Copy To Clipboard</a>
          </CopyToClipboard>
        </div>
      </div>

      <label className="label" style={{ textAlign: "left" }}>
        ssh
      </label>
      <div className="field has-addons">
        <div className="control is-expanded">
          <input
            className="input is-fullwidth is-primary"
            type="text"
            value={`git clone ${infoRepo?.download.ssh}`}
            placeholder="Find a repository"
          />
        </div>
        <div className="control">
          <CopyToClipboard text={"git clone "+infoRepo?.download.ssh} onCopy={()=>ToastNotification({
            type:"warn",
            message:`there are problems with ssh, use http instead`
          })}>
            <a className="button is-primary">Copy To Clipboard</a>
          </CopyToClipboard>
        </div>
      </div>
    </Modal>
  );
}

export default InfoModal;
