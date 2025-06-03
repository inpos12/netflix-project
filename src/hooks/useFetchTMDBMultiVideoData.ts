import axios from "axios";

export const fetchTMDBVideoList = async (type: string, movieIds: number[]) => {
  try {
    if (!movieIds || movieIds.length === 0) return [];

    const videoResults = await Promise.all(
      movieIds.map((id) =>
        axios.get(`https://api.themoviedb.org/3/${type}/${id}/videos`, {
          params: {
            language: "ko-KR",
          },
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
          },
        }),
      ),
    );

    return videoResults;
  } catch (error) {
    console.error("TMDB 비디오 목록 가져오기 실패:", error);
    return [];
  }
};
