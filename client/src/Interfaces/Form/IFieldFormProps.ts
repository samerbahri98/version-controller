import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

interface IFIeldFormProps {
  className: string;
  type: string;
  name: string;
  label: string;
  placeholder: string;
  as?: string;
  value: string;
  icon?:IconDefinition
}

export default IFIeldFormProps;
