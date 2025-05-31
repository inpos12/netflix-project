/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        "fluid-xxxs": "clamp(0.5rem, 0.6vw, 0.625rem)", // 8px ~ 10px
        "fluid-xxs": "clamp(0.625rem, 0.75vw, 0.75rem)", // 10px ~ 12px
        "fluid-xs": "clamp(0.75rem, 0.9vw, 0.875rem)", // 12px ~ 14px
        "fluid-sm": "clamp(0.875rem, 1vw, 1rem)", // 14px ~ 16px
        "fluid-md": "clamp(1rem, 1.2vw, 1.25rem)", // 16px ~ 20px
        "fluid-lg": "clamp(1.25rem, 2vw, 1.75rem)", // 20px ~ 28px
        "fluid-xl": "clamp(1.5rem, 3vw, 2.5rem)", // 24px ~ 40px
        "fluid-2xl": "clamp(2rem, 5vw, 3.5rem)", // 32px ~ 56px
        "fluid-3xl": "clamp(3rem, 8vw, 5rem)", // 48px ~ 80px
      },
      boxShadow: {
        "hover-card": "rgba(0,0,0,0.75) 0px 3px 10px",
      },
      colors: {
        darkgray: "#bcbcbc",
        gray: "#fff",
      },
    },
  },
  plugins: [],
};

// // {
//   "adult": false,
//   "backdrop_path": "/7Zx3wDG5bBtcfk8lcnCWDOLM4Y4.jpg",
//   "genre_ids": [
//       10751,
//       35,
//       878
//   ],
//   "id": 552524,
//   "original_language": "en",
//   "original_title": "Lilo & Stitch",
//   "overview": "보송보송한 파란 솜털, 호기심 가득한 큰 눈, 장난기 가득한 웃음을 가졌지만 가장 위험한 실험체 취급을 받던 스티치는 우주에서 도망쳐 지구의 하와이 섬에 불시착하게 된다. 단짝 친구를 원하던 외톨이 소녀 릴로는 별똥별과 함께 나타난 귀여운 파란색 강아지 스티치와 소중한 친구이자, 하나의 가족이 되어가며 외로웠던 일상이 유쾌하게 변하기 시작한다. 그러던 어느 날, 스티치를 잡아 우주로 되돌아가려는 정체불명의 요원들이 등장하고 릴로와 스티치는 예상치 못한 상황을 마주하게 되는데..!",
//   "popularity": 768.0749,
//   "poster_path": "/ww7jn7lv1YzTAGd5m0R6CP1VXAs.jpg",
//   "release_date": "2025-05-17",
//   "title": "릴로 & 스티치",
//   "video": false,
//   "vote_average": 7.1,
//   "vote_count": 290
// }
