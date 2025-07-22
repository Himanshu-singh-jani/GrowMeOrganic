// import { useState, useEffect } from "react";
// import { DataTable } from "primereact/datatable";
// import { Column } from "primereact/column";
// import { Paginator } from "primereact/paginator";

// import "primereact/resources/themes/lara-light-indigo/theme.css";
// import "primereact/resources/primereact.min.css";
// import "primeicons/primeicons.css";

// interface Artwork {
//   id: number;
//   title: string;
//   place_of_origin: string;
//   artist_display: string;
//   inscriptions: string;
//   date_start: number;
//   date_end: number;
// }

// interface ApiResponse {
//   data: Artwork[];
//   pagination: {
//     total_pages: number;
//   };
// }

// function App() {
//   const [artworks, setArtworks] = useState<Artwork[]>([]);
//   const [selectedArtworks, setSelectedArtworks] = useState<Artwork[]>([]);
//   const [globalSelectionIds, setGlobalSelectionIds] = useState<Set<number>>(
//     new Set()
//   );

//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(0);
//   const [titleFilterVisible, setTitleFilterVisible] = useState(false);
//   const [numberToSelect, setNumberToSelect] = useState<number | "">("");

//   const rowsPerPage = 12;

//   const fetchArtworks = async (page: number) => {
//     try {
//       const res = await fetch(
//         `https://api.artic.edu/api/v1/artworks?page=${page}&limit=${rowsPerPage}&fields=id,title,place_of_origin,artist_display,inscriptions,date_start,date_end`
//       );
//       const json: ApiResponse = await res.json();
//       setArtworks(json.data);
//       setTotalPages(json.pagination.total_pages);
//     } catch (err) {
//       console.error("Error fetching data:", err);
//     }
//   };

//   useEffect(() => {
//     fetchArtworks(currentPage);
//   }, [currentPage]);

//   useEffect(() => {
//     const visibleSelected = artworks.filter((a) =>
//       globalSelectionIds.has(a.id)
//     );
//     setSelectedArtworks(visibleSelected);
//   }, [artworks, globalSelectionIds]);

//   const onPageChange = (e: { page: number }) => {
//     setCurrentPage(e.page + 1);
//   };

//   const onSelectionChange = (e: { value: Artwork[] }) => {
//     const currentPageIds = new Set(artworks.map((a) => a.id));
//     const selectedNow = new Set(e.value.map((a) => a.id));

//     const newSelectedIds = new Set(globalSelectionIds);

//     for (const id of currentPageIds) {
//       if (selectedNow.has(id)) {
//         newSelectedIds.add(id);
//       } else {
//         newSelectedIds.delete(id);
//       }
//     }

//     setGlobalSelectionIds(newSelectedIds);
//   };

//   const handleSubmitSelect = async () => {
//     if (typeof numberToSelect === "number" && numberToSelect > 0) {
//       const pagesNeeded = Math.ceil(numberToSelect / rowsPerPage);
//       let allArtworks: Artwork[] = [];

//       for (let i = 1; i <= pagesNeeded; i++) {
//         const res = await fetch(
//           `https://api.artic.edu/api/v1/artworks?page=${i}&limit=${rowsPerPage}&fields=id,title,place_of_origin,artist_display,inscriptions,date_start,date_end`
//         );
//         const json: ApiResponse = await res.json();
//         allArtworks = [...allArtworks, ...json.data];
//       }

//       const selected = allArtworks.slice(0, numberToSelect);
//       const selectedIds = new Set(selected.map((item) => item.id));
//       setGlobalSelectionIds(selectedIds);
//     } else {
//       setGlobalSelectionIds(new Set());
//     }

//     setTitleFilterVisible(false);
//   };

//   const titleHeaderTemplate = () => (
//     <div className="relative">
//       <div className="flex items-center gap-2">
//         <i
//           className="pi pi-chevron-down cursor-pointer"
//           onClick={() => setTitleFilterVisible((prev) => !prev)}
//         />
//         <span>Title</span>
//       </div>

//       {titleFilterVisible && (
//         <div className="absolute bg-white border rounded shadow-md p-2 mt-1 z-10 w-56">
//           <input
//             type="number"
//             value={numberToSelect}
//             onChange={(e) =>
//               setNumberToSelect(e.target.value ? parseInt(e.target.value) : "")
//             }
//             className="border p-1 rounded mb-2 w-full"
//             placeholder="Enter number"
//             min={1}
//             max={rowsPerPage * totalPages}
//           />
//           <button
//             className="border px-4 py-1 rounded w-full bg-gray-100 hover:bg-gray-200"
//             onClick={handleSubmitSelect}
//           >
//             Submit
//           </button>
//         </div>
//       )}
//     </div>
//   );

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4 text-blue-800">
//         Artworks Page: {currentPage}
//       </h1>

//       <DataTable
//         value={artworks}
//         selection={selectedArtworks}
//         onSelectionChange={onSelectionChange}
//         dataKey="id"
//         selectionMode="multiple"
//         tableStyle={{ minWidth: "80rem" }}
//         stripedRows
//       >
//         <Column selectionMode="multiple" headerStyle={{ width: "3rem" }} />
//         <Column field="title" header={titleHeaderTemplate} />
//         <Column field="place_of_origin" header="Origin" />
//         <Column field="artist_display" header="Artist" />
//         <Column field="inscriptions" header="Inscriptions" />
//         <Column field="date_start" header="Start Year" />
//         <Column field="date_end" header="End Year" />
//       </DataTable>

//       <Paginator
//         first={(currentPage - 1) * rowsPerPage}
//         rows={rowsPerPage}
//         totalRecords={totalPages * rowsPerPage}
//         onPageChange={onPageChange}
//         className="mt-4"
//       />
//     </div>
//   );
// }

// export default App;
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
