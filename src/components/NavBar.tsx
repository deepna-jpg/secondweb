
// src/components/NavBar.tsx
import { NavLink } from 'react-router-dom';

/*
  [네비게이션 바 컴포넌트]
  이 컴포넌트는 메뉴 버튼들을 담당합니다.
*/
export default function NavBar() {

  /*
    [CSS-in-JS: 자바스크립트로 스타일 만들기]
    CSS 파일에 따로 적지 않고, 이렇게 자바스크립트 객체(Object) 모양으로 스타일을 만들 수 있습니다.
    - 장점: 스타일을 변수처럼 다룰 수 있습니다.
    - 문법: background-color 대신 backgroundColor 처럼 카멜케이스(camelCase)를 씁니다.
  */
  const navListStyle = {
    display: 'flex',       // 가로로 배치
    gap: '0.5rem',         // 아이템 간의 간격
    listStyle: 'none',     // 목록 앞에 붙는 점(bullet) 제거
    alignItems: 'center',  // 세로 중앙 정렬
    margin: 0,             // 바깥 여백 제거
    padding: 0,            // 안쪽 여백 제거
  };

  /*
    [동적 스타일링 함수]
    NavLink는 특별한 기능을 가지고 있습니다. 
    style 속성에 그냥 객체가 아니라 '함수'를 넣을 수 있게 해줍니다.
    
    이 함수는 리액트로부터 { isActive } 라는 정보를 선물로 받습니다.
    - isActive: "지금 사용자가 이 메뉴에 들어와 있나요?" (true / false)
  */
  const getLinkStyle = ({ isActive }: { isActive: boolean }) => ({
    textDecoration: 'none',         // 밑줄 제거
    // 삼항 연산자: (조건) ? (참일 때 값) : (거짓일 때 값)
    fontWeight: isActive ? 600 : 500,  // 활성 상태면 굵게(600), 아니면 보통(500)
    fontSize: '0.95rem',
    // 활성 상태면 진한 글자색, 아니면 연한 회색
    color: isActive ? 'var(--text-main)' : 'var(--text-sub)',
    padding: '8px 16px',
    // 활성 상태면 노란 배경색, 아니면 투명
    backgroundColor: isActive ? 'var(--primary-color)' : 'transparent',
    borderRadius: '12px',           // 모서리 둥글게
    transition: 'all 0.3s ease',    // 부드럽게 변하는 애니메이션 효과
  });

  return (
    <nav>
      {/* 만든 스타일 객체(navListStyle)를 style 속성에 넣어줍니다. */}
      <ul style={navListStyle}>
        <li>
          {/* 
             [NavLink]
             HTML의 <a> 태그와 비슷하지만, 페이지를 새로고침 하지 않고 
             부드럽게 화면만 바꿔주는 리액트 전용 링크입니다.
             to="/" : 메인 페이지로 이동하라는 뜻
          */}
          <NavLink to="/" style={getLinkStyle}>
            홈
          </NavLink>
        </li>
        <li>
          {/* to="/team" : 팀 소개 페이지로 이동하라는 뜻 */}
          <NavLink to="/team" style={getLinkStyle}>
            팀 소개
          </NavLink>
        </li>
        <li>
          <NavLink to="/weather" style={getLinkStyle}>
            날씨
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
