import { useEffect, useState } from "react";
import { useFetchTMDBOneData, useTMDBMovies } from "../hooks/api";
import { Container, Row } from "@/components/Container";

export default function Home() {
  const [video, setVideo] = useState(""); // 비디오키를 담는 상태
  const TMDBApiKey = `Bearer ${import.meta.env.VITE_API_KEY}`; // TMDB API Key
  const TMDBApiurl = "https://api.themoviedb.org/3/movie/popular"; // 인기영화 목록 불러오는 url
  const TMDBVideoUrl = "https://api.themoviedb.org/3/movie/552524/videos"; // 비디오 불러오는 url
  const { detailData, movieList } = useTMDBMovies(TMDBApiurl, TMDBApiKey); // 인기영화 불러오기기
  const LoadVideokey = useFetchTMDBOneData(TMDBVideoUrl, TMDBApiKey); // VideoKey 불러오기기
  useEffect(() => {
    const key = LoadVideokey?.results?.[0]?.key;
    setVideo(key);
  }, [LoadVideokey]);

  return (
    <>
      <Container className="flex justify-center items-center flex-col ">
        <Row>
          {video && (
            <iframe
              className="w-full h-[100vh]"
              width="100%"
              height="1080"
              src={`https://www.youtube.com/embed/${video}?autoplay=1&mute=1&rel=0&controls=0&modestbranding=0`}
              title="YouTube video"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          )}
        </Row>
        <Row className="flex-col relative px-4 ">
          <h1 className="text-fluid-lg text-white py-5">인기영화</h1>
          {movieList ? (
            <div className="relative cursor-pointer grid grid-cols-2 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-6 gap-2 w-full ">
              {movieList.map((list, index) => {
                const detail = detailData.find(
                  (item: any) => item.id === list.id
                );
                return (
                  <div className="group relative " key={index}>
                    <img
                      className="w-full h-full object-cover  "
                      src={
                        list.poster_path
                          ? `https://image.tmdb.org/t/p/w500/${list.poster_path}`
                          : ""
                      }
                    />
                    {/* Hover 카드보이기 */}
                    <div className="shadow-hover-card rounded-xl absolute z-50 top-0 w-full group-hover:scale-105 bg-[#181818] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <img
                        style={{
                          borderTopRightRadius: "0.75rem",
                          borderTopLeftRadius: "0.75rem",
                        }}
                        src={
                          list.poster_path
                            ? `https://image.tmdb.org/t/p/original/${list.poster_path}`
                            : ""
                        }
                        className="text-white text-fluid-xl"
                      />

                      {detail ? (
                        <div className="px-2 py-4 grid gap-2 ">
                          <h2 className="text-fluid-sm text-white">
                            {list.title}
                          </h2>
                          <div className=" flex justify-between">
                            <span className="text-fluid-sm text-darkgray">
                              {detail.runtime}분
                            </span>
                            <span className="text-fluid-sm text-darkgray">
                              {Math.round(detail.vote_average * 10) / 10}점
                            </span>
                          </div>
                          <div className="flex gap-4">
                            {detail.genres.map((genres: any, index: any) => (
                              <span
                                className="text-darkgray font-semibold"
                                key={index}
                              >
                                {genres.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <h1>데이터없음</h1>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <h1>데이터없음</h1>
          )}
        </Row>
      </Container>
    </>
  );
}
