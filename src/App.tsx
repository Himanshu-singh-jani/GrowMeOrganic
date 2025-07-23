import { useEffect, useState } from "react";
import type { Artwork } from "./types/artwork";
import { useArtworks } from "./hooks/useArtworks";
import ArtworkTable from "./components/ArtworkTable";
import ArtworkPaginator from "./components/ArtworkPaginator";

const rowsPerPage = 12;

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const { artworks, totalPages } = useArtworks(currentPage, rowsPerPage);

  const [globalSelectionIds, setGlobalSelectionIds] = useState<Set<number>>(
    new Set()
  );
  const [selectedArtworks, setSelectedArtworks] = useState<Artwork[]>([]);
  const [numberToSelect, setNumberToSelect] = useState<number | "">("");

  useEffect(() => {
    const visibleSelected = artworks.filter((a) =>
      globalSelectionIds.has(a.id)
    );
    setSelectedArtworks(visibleSelected);
  }, [artworks, globalSelectionIds]);

  const onPageChange = (e: { page: number }) => {
    setCurrentPage(e.page + 1);
  };

  const onSelectionChange = (e: { value: Artwork[] }) => {
    const currentPageIds = new Set(artworks.map((a) => a.id));
    const selectedNow = new Set(e.value.map((a) => a.id));
    const newSelectedIds = new Set(globalSelectionIds);

    for (const id of currentPageIds) {
      if (selectedNow.has(id)) {
        newSelectedIds.add(id);
      } else {
        newSelectedIds.delete(id);
      }
    }

    setGlobalSelectionIds(newSelectedIds);
  };

  const handleSubmitSelect = async () => {
    if (typeof numberToSelect === "number" && numberToSelect > 0) {
      const pagesNeeded = Math.ceil(numberToSelect / rowsPerPage);
      let allArtworks: Artwork[] = [];

      for (let i = 1; i <= pagesNeeded; i++) {
        const res = await fetch(
          `https://api.artic.edu/api/v1/artworks?page=${i}&limit=${rowsPerPage}&fields=id,title,place_of_origin,artist_display,inscriptions,date_start,date_end`
        );
        const json = await res.json();
        allArtworks = [...allArtworks, ...json.data];
      }

      const selected = allArtworks.slice(0, numberToSelect);
      const selectedIds = new Set(selected.map((item) => item.id));
      setGlobalSelectionIds(selectedIds);
    } else {
      setGlobalSelectionIds(new Set());
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-blue-800">
        Artworks Page: {currentPage}
      </h1>

      <ArtworkTable
        artworks={artworks}
        selectedArtworks={selectedArtworks}
        onSelectionChange={onSelectionChange}
        numberToSelect={numberToSelect}
        setNumberToSelect={setNumberToSelect}
        handleSubmitSelect={handleSubmitSelect}
      />

      <ArtworkPaginator
        currentPage={currentPage}
        totalRecords={totalPages * rowsPerPage}
        rowsPerPage={rowsPerPage}
        onPageChange={onPageChange}
      />
    </div>
  );
}

export default App;
