import { useEffect, useState } from "react";
import axios from "axios";
import { usefetchDetailData } from "./useFetchDetailData";
//  인기영화 불러오기,
export const useTMDBMovies = (apiurl: string) => {
  const [movieList, setMovieList] = useState<any[]>([]);
  const [movieDetailData, setMovieDetailData] = useState<any[]>([]);
  // 인기영화목록정보가져오기
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        if (!apiurl) return;
        const result = await axios.get(apiurl, {
          params: {
            language: "ko-KR",
            page: 1,
          },
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
          },
        });
        setMovieList(result.data.results.slice(0, 6));
      } catch (err) {
        console.log(err);
      }
    };
    fetchMovie();
  }, [apiurl]);

  useEffect(() => {
    if (!movieList) return;
    const fetchDetail = async () => {
      const detail = await usefetchDetailData(movieList, "movie");
      setMovieDetailData(detail ?? []);
    };
    fetchDetail();
  }, [movieList]);
  return { movieDetailData, movieList };
};
