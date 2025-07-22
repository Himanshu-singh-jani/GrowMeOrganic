import { Paginator } from "primereact/paginator";

interface Props {
  currentPage: number;
  totalRecords: number;
  rowsPerPage: number;
  onPageChange: (e: { page: number }) => void;
}

const ArtworkPaginator: React.FC<Props> = ({
  currentPage,
  totalRecords,
  rowsPerPage,
  onPageChange,
}) => (
  <Paginator
    first={(currentPage - 1) * rowsPerPage}
    rows={rowsPerPage}
    totalRecords={totalRecords}
    onPageChange={onPageChange}
    className="mt-4"
  />
);

export default ArtworkPaginator;
