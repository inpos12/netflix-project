import { useEffect, useState } from "react";
import axios from "axios";

//  1개의 데이터만 불러오는 훅
export const useFetchTMDBOneData = (apiurl: string | null) => {
  const [data, setData] = useState<any>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!apiurl) return; // apiurl이 null이면 요청하지 않음
        const result = await axios.get(apiurl, {
          params: {
            language: "ko-KR",
          },
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
          },
        });
        setData(result.data);
      } catch (err) {
        console.error("TMDB One 데이터 가져오기 실패:", err);
      }
    };
    fetchData();
  }, [apiurl]);

  return data;
};
