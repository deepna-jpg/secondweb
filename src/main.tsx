import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css' // 우리가 만든 CSS 옷장을 여기서 불러와야 앱 전체에 적용됩니다.

/*
  [진입점 (Entry Point)]
  리액트 앱이 가장 먼저 시작되는 곳입니다.
  HTML 파일(index.html)에 있는 빈 깡통(div#root)에 리액트 앱을 집어넣는 작업을 합니다.
*/



// 1. HTML 파일(index.html)에서 id가 'root'인 요소를 찾습니다.
const rootElement = document.getElementById('root');

// 2. 찾아낸 'root' 요소에 리액트를 연결(createRoot)하고, 앱을 그립니다(render).
createRoot(rootElement!).render(
  // StrictMode: 개발 중에 실수를 잡아주는 '안전 벨트' 역할을 합니다.
  // 실제 사용자에게는 보이지 않고, 개발자 화면에서만 경고를 띄워줍니다.
  <StrictMode>
    {/* App 컴포넌트: 우리 웹사이트의 가장 큰 틀, 여기서부터 시작합니다. */}
    <App />
  </StrictMode>,
)
