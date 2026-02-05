// src/components/Layout.tsx

/*
  [import 문]
  다른 파일에서 만들어진 '부품'이나 '도구'를 가져오는 명령어입니다.
  - Outlet: 리액트 라우터(react-router-dom)에서 제공하는 '빈 칸' 같은 도구입니다.
  - NavBar: 같은 폴더(./)에 있는 NavBar.tsx 파일에서 만든 메뉴 부품을 가져옵니다.
*/
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

/*
  [컴포넌트 함수 정의]
  'Layout'이라는 이름의 함수를 만듭니다. 
  리액트에서는 이 함수가 곧 하나의 '화면 조각(컴포넌트)'이 됩니다.
  'export default': 이 함수를 다른 파일에서도 가져다 쓸 수 있게 내보낸다는 뜻입니다.
*/
export default function Layout() {
    /*
      [return 문]
      이 컴포넌트가 화면에 무엇을 그릴지 결정합니다.
      HTML과 비슷해 보이지만 'JSX'라고 부르는 리액트 전용 문법입니다.
    */
    return (
        /* 
          [스타일 속성 (style={{ ... }})]
          HTML에서는 style="color: red;" 처럼 쓰지만,
          리액트에서는 자바스크립트 객체로 스타일을 지정합니다.
          그래서 중괄호가 두 개({{ }}) 필요합니다.
          
          - display: 'flex': 내부 요소들을 자유롭게 배치하기 위한 마법의 상자 설정
          - flexDirection: 'column': 내용물들을 가로(row)가 아닌 세로(column)로 쌓음
          - minHeight: '100vh': 최소 높이를 화면 전체 높이(100vh)로 설정
        */
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>

            {/* 
                [헤더 (Header)]
                웹사이트의 머리글 부분입니다.
                position: 'sticky'를 주어 스크롤을 내려도 화면 상단에 찰싹 붙어있게 했습니다.
            */}
            <header
                style={{
                    position: 'sticky',     // 스크롤 시 고정됨
                    top: '0',               // 화면 맨 꼭대기에 위치
                    zIndex: 100,            // 다른 요소들보다 위에 떠있도록 순서를 높임
                    backgroundColor: 'rgba(255, 255, 255, 0.8)', // 흰색 배경인데 투명도 0.8
                    backdropFilter: 'blur(10px)', // 배경 뒤를 흐릿하게 처리 (유리 효과)
                    borderBottom: 'var(--border-clean)', // CSS 변수 사용
                    padding: '0 2rem',      // 위아래 0, 좌우 2rem 안쪽 여백
                    display: 'flex',        // 로고와 메뉴를 가로로 배치하기 위해 flex 사용
                    justifyContent: 'space-between', // 양쪽 끝으로 요소들을 밀어냄 (로고 <-> 메뉴)
                    alignItems: 'center',   // 세로 기준 중앙 정렬
                    height: 'var(--header-height)' // 미리 정해둔 헤더 높이값 사용
                }}
            >
                {/* 왼쪽: 로고 영역 */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '1.2rem' }}>🌼</span>
                    <h1 style={{ fontSize: '1.2rem', margin: 0, fontWeight: 700 }}>클랩 캠퍼스</h1>
                </div>

                {/* 오른쪽: 네비게이션 메뉴 (NavBar 컴포넌트 사용) */}
                <NavBar />
            </header>

            {/* 
                [메인 (Main)]
                실제 페이지의 알맹이 내용이 들어가는 곳입니다.
                - flexGrow: 1 : 남는 공간을 모두 차지하라는 뜻입니다.
                  헤더와 푸터를 제외한 가운데 공간을 꽉 채워서 푸터를 바닥으로 밀어냅니다.
            */}
            <main className="max-w-container animate-fade" style={{ flexGrow: 1, width: '100%', marginTop: '3rem' }}>

                {/* 
                    [Outlet (아울렛)]
                    '콘센트'처럼 무언가를 꽂는 곳입니다.
                    주소(URL)에 따라서 <HomePage />가 꽂히기도 하고, <TeamPage />가 꽂히기도 합니다.
                */}
                <Outlet />
            </main>

            {/* 
                [푸터 (Footer)]
                웹사이트의 바닥글입니다.
            */}
            <footer style={{
                textAlign: 'center',    // 글자 가운데 정렬
                padding: '4rem 2rem',   // 넉넉한 여백
                color: 'var(--text-sub)', // 연한 회색 글자
                fontSize: '0.9rem'      // 글자 크기를 조금 작게
            }}>
                <p>© 2026 클랩 캠퍼스. 봄처럼 따뜻한 리액트 공부 시간. 🌱</p>
            </footer>
        </div>
    );
}
