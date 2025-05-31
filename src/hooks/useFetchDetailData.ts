import axios from "axios";

export const usefetchDetailData = async (list: any[] | null, type: string) => {
  try {
    if (!list) return;
    const ids = list.map((res: any) => res.id);
    const DetailResult = await Promise.all(
      ids.map((id: number) =>
        axios.get(`https://api.themoviedb.org/3/${type}/${id}`, {
          params: {
            language: "ko-KR",
          },
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
          },
        })
      )
    );
    return DetailResult.map((res) => res.data);
  } catch (err) {
    console.log("Detail데이터 가져오기 실패", err);
    return [];
  }
};
