import { useEffect, useState } from "react";
import axios from "axios";

//  인기영화 불러오기,
export const useTMDBMovies = (apiurl: string, apikey: string) => {
  const [movieList, setMovieList] = useState<any[]>([]);
  const [detailData, setDetailData] = useState<any[]>([]);
  // 인기영화목록정보가져오기기
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const result = await axios.get(apiurl, {
          params: {
            language: "ko-KR",
            page: 1,
          },
          headers: {
            Authorization: apikey,
          },
        });
        setMovieList(result.data.results.slice(0, 6));
      } catch (err) {
        console.log(err);
      }
    };
    fetchMovie();
  }, [apiurl, apikey]);

  // 인기영화목록을 불러오면 영화ID를 배열로 가져와서 id를 검색하여 영화의 디테일정보가져옴
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const ids = movieList.map((res: any) => res.id);
        const DetailResult = await Promise.all(
          ids.map((id: number) =>
            axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
              params: {
                language: "ko-KR",
              },
              headers: {
                Authorization: apikey,
              },
            })
          )
        );
        const detailData = DetailResult.map((res) => res.data);
        setDetailData(detailData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchMovie();
  }, [movieList, apikey]);
  return { detailData, movieList };
};
export const useFetchTMDBMultData = (
  ids: number[],
  apiurl: string,
  apikey: string
) => {
  const [data, setData] = useState<any[]>([]);
  useEffect(() => {
    if (ids.length === 0) return;
    const FetchAll = async () => {
      try {
        const result = await Promise.all(
          ids.map((id) =>
            axios.get(`${apiurl}${id}`, {
              params: {
                language: "ko-KR",
              },
              headers: {
                Authorization: apikey,
              },
            })
          )
        );
        console.log(result);
        setData(result.map((res) => res.data));
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };
    FetchAll();
  }, []);
  return data;
};

//  1개의 데이터만 불러오는 훅
export const useFetchTMDBOneData = (apiurl: string, TMDBApiKey: string) => {
  const [data, setData] = useState<any>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(apiurl, {
          params: {
            language: "ko-KR",
          },
          headers: {
            Authorization: TMDBApiKey,
          },
        });
        setData(result.data);
      } catch (err) {
        console.error("TMDB 데이터 가져오기 실패:", err);
      }
    };

    fetchData();
  }, [apiurl, TMDBApiKey]);

  return data;
};
