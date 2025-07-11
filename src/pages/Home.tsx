import { useEffect, useState } from "react";
import { useFetchTMDBOneData } from "../hooks/useFetchTMDBOneData";
import { Container, Row } from "@/components/Container";
import MovieGrid from "@/components/Movie/MovieGrid";
import { useTMDBMovies } from "@/hooks/useTMDBMovies";
import { useTMDBTV } from "@/hooks/useTMDBTV";
import { fetchTMDBVideoList } from "@/hooks/useFetchTMDBMultiVideoData";

export default function Home() {
  //
  const [multiVideoKey, setMultiVideoKey] = useState<any[]>([]);
  const [multiTVKey, setMultiTVKey] = useState<any[]>([]);
  const [videoId, setVideoId] = useState("");
  const [videoKey, setVideoKey] = useState(""); // 비디오키를 담는 상태
  // 영화목록 API URL
  const TMDBMovieApiUrl = "https://api.themoviedb.org/3/movie/popular";
  const TMDBTVApiUrl = "https://api.themoviedb.org/3/discover/tv";
  // 영화 목록 6개와 각 영화의 상세정보 가져오기
  const { movieList, movieDetailData } = useTMDBMovies(TMDBMovieApiUrl);
  // TV 드라마 목록 6개와 각 드라마의 상세정보 가져오기
  const { tvList, tvDetailData } = useTMDBTV(TMDBTVApiUrl);
  // Main 비디오용 영화 ID 가져오기
  const LoadVideoId = useFetchTMDBOneData(TMDBMovieApiUrl); // 영화목록 불러오기
  useEffect(() => {
    const VideoId = LoadVideoId?.results[0].id; // VideoID 담는함수수
    setVideoId(VideoId);
  }, [LoadVideoId]);
  // 해당 영화의 비디오 정보 URL 생성
  const TMDBVideoUrl = videoId
    ? `https://api.themoviedb.org/3/movie/${videoId}/videos`
    : null;
  // 영화의 비디오 key 가져오기
  const LoadVideokey = useFetchTMDBOneData(TMDBVideoUrl); // VideoKey 불러오는API
  useEffect(() => {
    const key = LoadVideokey?.results?.[0]?.key;
    setVideoKey(key); //비디오 key 상태에 저장
  }, [LoadVideokey]);
  useEffect(() => {
    const getVideoData = async () => {
      const Movieids = movieDetailData.map((res: any) => res.id);
      const results = await fetchTMDBVideoList("movie", Movieids); // ✅ await 사용

      const data = results.map((res: any) => res?.data?.results?.[0]?.key);
      setMultiVideoKey(data);
    };
    if (movieDetailData?.length > 0) {
      getVideoData();
    }
  }, [movieDetailData]);

  useEffect(() => {
    const getTVData = async () => {
      const TVids = tvDetailData.map((res: any) => res.id);
      const results = await fetchTMDBVideoList("tv", TVids); // ✅ await 사용
      console.log(results);
      const data = results.map((res: any) => res?.data?.results?.[0]?.key);
      setMultiTVKey(data);
    };
    if (movieDetailData?.length > 0) {
      getTVData();
    }
  }, [tvDetailData]);

  return (
    <>
      <Container className="mb-96 flex flex-col items-center justify-center">
        <Row>
          {videoKey && (
            <iframe
              className="h-[85vh] w-full"
              width="100%"
              height="1080"
              src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&mute=1&rel=0&controls=0&modestbranding=0`}
              title="YouTube video"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          )}
        </Row>
        <MovieGrid
          videokey={multiVideoKey}
          movieList={movieList}
          detailData={movieDetailData}
          maintitle="인기영화"
        />
        <MovieGrid
          videokey={multiTVKey}
          movieList={tvList}
          detailData={tvDetailData}
          maintitle="인기드라마"
        />
      </Container>
    </>
  );
}
