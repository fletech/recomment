export default function HashtagItem({
  company,
  onSelectCompany,
}: {
  company: string;
  onSelectCompany: (company: string) => void;
}) {
  return (
    <li key={company}>
      <button onClick={() => onSelectCompany(company)}>#{company}</button>
    </li>
  );
}
