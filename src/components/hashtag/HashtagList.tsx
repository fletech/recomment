import { TrashIcon } from "@radix-ui/react-icons";
import HashtagItem from "./HashtagItem";

type HashtagListProps = {
  companyList: string[];
  setSelectedCompany: (company: string) => void;
  selectedCompany: string;
};
export default function HashtagList({
  companyList,
  setSelectedCompany,
  selectedCompany,
}: HashtagListProps) {
  return (
    <ul className="hashtags">
      {selectedCompany && (
        <li className="clear-filter">
          <button onClick={() => setSelectedCompany("")}>
            <TrashIcon /> Clear
          </button>
        </li>
      )}
      {companyList.map((company) => (
        <HashtagItem
          key={company}
          company={company}
          onSelectCompany={setSelectedCompany}
        />
      ))}
    </ul>
  );
}
