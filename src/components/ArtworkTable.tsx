import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import type { Artwork } from "../types/artwork";
import TitleFilter from "./TitleFilter";
import { useState } from "react";

interface Props {
  artworks: Artwork[];
  selectedArtworks: Artwork[];
  onSelectionChange: (e: { value: Artwork[] }) => void;
  numberToSelect: number | "";
  setNumberToSelect: (val: number | "") => void;
  handleSubmitSelect: () => void;
}

const ArtworkTable: React.FC<Props> = ({
  artworks,
  selectedArtworks,
  onSelectionChange,
  numberToSelect,
  setNumberToSelect,
  handleSubmitSelect,
}) => {
  const [titleFilterVisible, setTitleFilterVisible] = useState(false);

  const titleHeaderTemplate = () => (
    <div className="relative">
      <div className="flex items-center gap-2">
        <i
          className="pi pi-chevron-down cursor-pointer"
          onClick={() => setTitleFilterVisible((prev) => !prev)}
        />
        <span>Title</span>
      </div>

      {titleFilterVisible && (
        <TitleFilter
          value={numberToSelect}
          onChange={setNumberToSelect}
          onSubmit={() => {
            handleSubmitSelect();
            setTitleFilterVisible(false);
          }}
        />
      )}
    </div>
  );

  return (
    <DataTable
      value={artworks}
      selection={selectedArtworks}
      onSelectionChange={onSelectionChange}
      dataKey="id"
      selectionMode="multiple"
      tableStyle={{ minWidth: "80rem" }}
      stripedRows
    >
      <Column selectionMode="multiple" headerStyle={{ width: "3rem" }} />
      <Column field="title" header={titleHeaderTemplate} />
      <Column field="place_of_origin" header="Origin" />
      <Column field="artist_display" header="Artist" />
      <Column field="inscriptions" header="Inscriptions" />
      <Column field="date_start" header="Start Year" />
      <Column field="date_end" header="End Year" />
    </DataTable>
  );
};

export default ArtworkTable;
