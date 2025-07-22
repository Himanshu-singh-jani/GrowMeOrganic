import { useState, useEffect } from "react";
import type { Artwork, ApiResponse } from "../types/artwork";

export const useArtworks = (page: number, rowsPerPage: number) => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://api.artic.edu/api/v1/artworks?page=${page}&limit=${rowsPerPage}&fields=id,title,place_of_origin,artist_display,inscriptions,date_start,date_end`
        );
        const json: ApiResponse = await res.json();
        setArtworks(json.data);
        setTotalPages(json.pagination.total_pages);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, [page, rowsPerPage]);

  return { artworks, totalPages };
};
