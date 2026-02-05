// src/pages/HomePage.tsx
import WeatherWidget from '../components/WeatherWidget';


/*
  [홈 페이지 컴포넌트]
  이곳은 웹사이트의 대문 역할을 하는 페이지입니다.
*/
export default function HomePage() {
    return (
        /* 
           가장 바깥쪽을 감싸는 박스입니다.
           위아래로 2rem(약 32px) 만큼의 여백을 주어 답답하지 않게 했습니다.
        */
        <div style={{ padding: '2rem 0' }}>

            {/* 
                [semantic tag: section]
                기능적으로는 div와 똑같지만, "여기는 하나의 독립적인 구역이야"라고 
                사람과 검색엔진에게 알려주는 의미 있는 태그입니다.
            */}
            <section style={{
                textAlign: 'center',      // 글자들을 가운데로 모음
                marginBottom: '6rem',     // 아래쪽 요소와 거리를 둠
                padding: '4rem 1rem'      // 안쪽으로 여백을 둠
            }}>
                {/* 메인 타이틀 (h1) */}
                <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', fontWeight: 700 }}>
                    {/* 
                        [span 태그]
                        문장 중간에 특정 단어만 스타일을 바꾸고 싶을 때 감싸는 태그입니다.
                        여기서는 '미래형 웹'이라는 글자 뒤에 형광펜 칠한 듯한 효과(gradient)를 주었습니다.
                    */}
                    <span style={{
                        background: 'linear-gradient(to bottom, transparent 60%, var(--primary-color) 40%)',
                        padding: '0 4px'
                    }}>미래형 웹</span>에 오신 것을 환영합니다
                </h1>

                {/* 부가 설명 (p: paragraph) */}
                <p style={{
                    fontSize: '1.1rem',
                    color: 'var(--text-sub)',   // index.css에 정의된 변수 사용
                    maxWidth: '550px',          // 글이 너무 옆으로 퍼지지 않게 폭 제한
                    margin: '0 auto 2.5rem auto', // 좌우 auto: 화면 중앙에 배치
                    lineHeight: '1.8'           // 줄 간격을 넓게 
                }}>
                    차세대 웹 디자인을 경험해보세요. <br /> {/* br: 줄바꿈 태그 */}
                    리액트와 미니멀리즘, 그리고 디자인에 대한 열정으로 만들어졌습니다.
                </p>

                {/* 버튼들을 감싸는 박스 */}
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <button>시작하기</button>
                    <button style={{
                        background: 'transparent',
                        border: 'var(--border-clean)',
                        padding: '0.8rem 1.6rem'
                    }}>
                        더 알아보기
                    </button>
                </div>
            </section>

            {/* 
                [CSS Grid 레이아웃]
                카드들을 바둑판처럼 배치합니다.
                - repeat(auto-fit, minmax(280px, 1fr)): 
                  화면이 넓으면 가로로 여러 개, 좁으면 세로로 배치하는 아주 똑똑한 반응형 코드입니다.
                  (카드의 최소 너비는 280px로 유지)
            */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '2.5rem'
            }}>
                {/* 
                    [Card 1] 
                    className="clean-card": index.css 파일에 미리 만들어둔 예쁜 카드 디자인을 가져와서 입힙니다.
                */}
                <div className="clean-card" style={{ padding: '2.5rem' }}>
                    <div style={{ fontSize: '1.8rem', marginBottom: '1.2rem' }}>🎨</div>
                    <h3 style={{ fontSize: '1.3rem' }}>프리미엄 디자인</h3>
                    <p style={{ color: 'var(--text-sub)', fontSize: '0.95rem' }}>
                        모든 픽셀에 정성을 담았습니다. 최신 CSS 기법을 사용하여 고급스러운 느낌을 줍니다.
                    </p>
                </div>

                {/* [Card 2] */}
                <div className="clean-card" style={{ padding: '2.5rem' }}>
                    <div style={{ fontSize: '1.8rem', marginBottom: '1.2rem' }}>⚡</div>
                    <h3 style={{ fontSize: '1.3rem' }}>압도적인 속도</h3>
                    <p style={{ color: 'var(--text-sub)', fontSize: '0.95rem' }}>
                        Vite를 사용하여 성능을 최적화했습니다. 기다림 없는 사용자 경험을 제공합니다.
                    </p>
                </div>

                {/* [Card 3] */}
                <div className="clean-card" style={{ padding: '2.5rem' }}>
                    <div style={{ fontSize: '1.8rem', marginBottom: '1.2rem' }}>📱</div>
                    <h3 style={{ fontSize: '1.3rem' }}>완벽한 반응형</h3>
                    <p style={{ color: 'var(--text-sub)', fontSize: '0.95rem' }}>
                        대화면 모니터부터 스마트폰까지, 어떤 기기에서도 아름답게 보입니다.
                    </p>
                </div>
            </div>
            {/* 날씨 위젯 섹션 */}
            <section style={{ marginTop: '6rem', marginBottom: '4rem' }}>
                <h2 style={{
                    textAlign: 'center',
                    fontSize: '2rem',
                    marginBottom: '2rem',
                    color: 'var(--text-main)'
                }}>
                    실시간 날씨
                </h2>
                <WeatherWidget />
            </section>
        </div>
    );
}
