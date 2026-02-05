// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import TeamPage from "./pages/TeamPage";
import WeatherPage from './pages/WeatherPage';
import FashionPage from './pages/FashionPage';

/*
  [메인 앱 컴포넌트]
  웹사이트의 '지도'를 그리는 곳입니다.
  어떤 주소로 들어오면 어떤 페이지를 보여줄지 결정합니다.
*/
export default function App() {
  return (
    /* 
      [BrowserRouter]
      웹사이트 전체를 감싸서 "지금부터 페이지 이동 관리를 시작한다!"라고 선언하는 역할입니다.
    */
    <BrowserRouter>
      {/* 
         [Routes]
         여러 가지 경로(Route)들을 묶어주는 목록입니다.
         "이 중에 맞는 주소가 있으면 하나만 골라서 보여줘"라고 말하는 것과 같습니다.
      */}
      <Routes>

        {/* 
           - 자식 Route들(HomePage, TeamPage 등)은 Layout 안의 'Outlet'이라는 구멍에 쏙 들어갑니다.
           - 이렇게 하면 상단바(NavBar)는 고정되고 내용만 바뀝니다.
        */}
        <Route path="/" element={<Layout />}>

          {/* index: 주소 뒤에 아무것도 없을 때 (예: www.mysite.com/) 보여줄 화면 */}
          <Route index element={<HomePage />} />

          {/* path="team": 팀 소개 페이지 */}
          <Route path="team" element={<TeamPage />} />

          {/* path="weather": 날씨 위젯 페이지 */}
          <Route path="weather" element={<WeatherPage />} />

          {/* path="fashion": [NEW] AI 패션 추천 페이지 */}
          <Route path="fashion" element={<FashionPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
