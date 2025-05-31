import { Row } from "../Container";
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
};

export const MovieGrid: React.FC<MovieProps> = (props) => {
  return (
    <>
      <Row className="flex-col relative px-4">
        {props.movieList ? (
          <>
            <h1 className="text-fluid-lg text-white py-5">{props.maintitle}</h1>
            <div className="relative cursor-pointer grid grid-cols-2 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-6 gap-2 w-full ">
              {props.movieList.map((list: any, index: number) => {
                const detail = props.detailData.find(
                  (item: any) => item.id === list.id
                );
                return (
                  <div className="group relative" key={index}>
                    <img
                      src={
                        list.poster_path
                          ? `https://image.tmdb.org/t/p/w500/${list.poster_path}`
                          : ""
                      }
                    />
                    {/* Hover 카드보이기 */}
                    <div className="shadow-hover-card rounded-xl absolute z-50 top-0 w-full group-hover:scale-105 bg-[#181818] hidden group-hover:block transition-all duration-500">
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
                          <h2 className="text-fluid-xxs text-white">
                            {list.title ? list.title : list.name}
                          </h2>
                          <div className=" flex justify-between">
                            <span className="text-fluid-sm text-darkgray">
                              {detail.runtime
                                ? `${detail.runtime}분`
                                : `${detail.number_of_episodes}부작`}
                            </span>
                            <span className="text-fluid-sm text-darkgray">
                              {Math.round(detail.vote_average * 10) / 10}점
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            {detail.genres.map((genres: any, index: any) => (
                              <span
                                className="text-darkgray font-semibold text-fluid-xxs text-nowrap"
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
          </>
        ) : (
          <h1>MovieList 데이터없음</h1>
        )}
      </Row>
    </>
  );
};

export default MovieGrid;
