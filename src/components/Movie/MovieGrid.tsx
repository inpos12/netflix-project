import { Row } from "../Container";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
// Import Swiper styles

type Movie = {
  id: number;
  poster_paty: string;
  title: string;
};
type DetailData = {
  runtime: number;
  vote_average: number;
  number_of_episodes?: number;
  genres: [];
};
type MovieProps = {
  movieList: Movie[];
  detailData: DetailData[];
  maintitle: string;
  videokey: string[];
};

export const MovieGrid: React.FC<MovieProps> = (props) => {
  return (
    <>
      <Row className="relative flex-col px-4">
        <h1 className="py-5 text-fluid-lg text-white">{props.maintitle}</h1>
        {props.movieList ? (
          <>
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              slidesPerView={6.5}
              spaceBetween={20}
              navigation
              slidesPerGroup={3}
              className="w-full"
              breakpoints={{
                320: {
                  slidesPerView: 1.5,
                  spaceBetween: 10,
                  slidesPerGroup: 1,
                },
                640: {
                  slidesPerView: 2.5,
                  spaceBetween: 12,
                  slidesPerGroup: 2,
                },
                768: {
                  slidesPerView: 3.5,
                },
                1024: {
                  slidesPerView: 4.5,
                },
                1280: {
                  slidesPerView: 5.5,
                },
                1536: {
                  slidesPerView: 6.5,
                },
              }}
            >
              {props.movieList.map((list: any, index: number) => {
                const detail = props.detailData.find(
                  (item: any) => item.id === list.id,
                );
                const videoKey = props.videokey[index]; // 🎯 인덱스 기준으로 매칭
                return (
                  <SwiperSlide
                    className="group relative cursor-pointer"
                    key={index}
                  >
                    <div className="h-[400px] w-full">
                      <img
                        className="h-full w-full object-cover"
                        src={
                          list.poster_path
                            ? `https://image.tmdb.org/t/p/w500/${list.poster_path}`
                            : ""
                        }
                      />
                    </div>
                    {/* Hover 카드보이기 */}

                    <div className="absolute top-0 z-10 hidden h-full w-full bg-[#181818] shadow-hover-card transition-all duration-500 group-hover:block">
                      {videoKey ? (
                        <>
                          <iframe
                            className="max-h-[calc(100%-100px)] w-full"
                            width="100%"
                            height="1080"
                            src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&mute=1&rel=0&controls=0&modestbranding=0`}
                            title="YouTube video"
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                          />
                        </>
                      ) : (
                        <img
                          className="max-h-[calc(100%-100px)] w-full object-cover object-center"
                          src={
                            list.poster_path
                              ? `https://image.tmdb.org/t/p/w500/${list.poster_path}`
                              : ""
                          }
                        />
                      )}

                      {detail ? (
                        <div className="h-[calc(100% - 100px)] grid gap-2 px-2 py-4">
                          <h2 className="text-fluid-xxs text-white">
                            {list.title ? list.title : list.name}
                          </h2>
                          <div className="flex justify-between">
                            <span className="text-fluid-sm text-darkgray">
                              {detail.runtime
                                ? `${detail.runtime}분`
                                : `${detail.number_of_episodes}부작`}
                            </span>
                            <span className="text-fluid-sm text-darkgray">
                              {Math.round(detail.vote_average * 10) / 10}점
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-1">
                            {detail.genres.map((genres: any, index: any) => (
                              <span
                                className="text-nowrap text-fluid-xxs font-semibold text-darkgray"
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
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </>
        ) : (
          <h1>MovieList 데이터없음</h1>
        )}
      </Row>
    </>
  );
};

export default MovieGrid;
