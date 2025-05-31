import axios from "axios";
import { useEffect, useState } from "react";
import { usefetchDetailData } from "./useFetchDetailData";
export const useTMDBTV = (apiurl: string) => {
  const [tvList, setTVList] = useState<any[]>([]);
  const [tvDetailData, setTvDetailData] = useState<any[]>([]);
  useEffect(() => {
    const fetchTV = async () => {
      try {
        if (!apiurl) return;
        const result = await axios.get(apiurl, {
          params: {
            include_abult: false,
            language: "ko-KR",
            page: 1,
            sort_by: "vote_average.desc",
            "vote_count.gte": 200,
            with_genres: 18,
          },
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
          },
        });
        setTVList(result.data.results.slice(0, 6));
      } catch (err) {
        console.log("드라마목록불러오가실패", err);
      }
    };
    fetchTV();
  }, [apiurl]);

  useEffect(() => {
    const fetchDetail = async () => {
      const detail = await usefetchDetailData(tvList, "tv");
      setTvDetailData(detail ?? []);
    };
    fetchDetail();
  }, [tvList]);

  return { tvList, tvDetailData };
};
