import { useEffect } from "react";
import NetflixLogo from "@/assets/Netflix.png";
import { Container, Row } from "@/components/Container";
import MainImage from "@/assets/main_image.jpg";
import styled from "styled-components";

export const MainContainer = styled.div`
  position: absolute;
  background-image: url(${MainImage});
  width: 100vw;
  height: 100vh;
  top: 0;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  ::before {
    position: absolute;
    content: "";
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.05);
    z-index: 1;
    cursor: auto;
  }
`;

export default function Layout() {
  useEffect(() => {
    const header = document.querySelector("header");
    const handleScroll = () => {
      if (!header) {
        return;
      }
      if (window.scrollY === 0) {
        header.style.position = "static";
      } else {
        header.style.position = "fixed";
        header.style.zIndex = "1000";
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
  }, []);
  return (
    <header className=" fixed w-full bg-[#141414]">
      <Container>
        <Row className="p-4 z-10">
          <div className="w-4/5 justify-start flex">
            <img className="w-44 " src={NetflixLogo} alt="Logo" />
          </div>
          <div className="w-1/5 justify-end items-center flex">
            <button className="p-2 bg-red-700 text-white font-semibold rounded-xl">
              로그인
            </button>
          </div>
        </Row>
      </Container>
    </header>
  );
}
