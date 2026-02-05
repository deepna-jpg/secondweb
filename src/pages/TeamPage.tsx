// src/pages/TeamPage.tsx
import WeatherWidget from '../components/WeatherWidget';
/*
  [데이터 준비 (Array of Objects)]
  팀원 정보를 담고 있는 배열입니다.
  실제 앱에서는 데이터베이스(DB)에서 가져오겠지만, 지금은 연습용으로 직접 적어두었습니다.
  이렇게 데이터를 따로 빼두면 나중에 데이터만 고치면 화면이 알아서 바뀝니다.
*/
const teamMembers = [
    { id: 1, name: 'Alice Johnson', role: '프론트엔드 엔지니어', emoji: '👩‍💻' },
    { id: 2, name: 'Bob Smith', role: '프로덕트 디자이너', emoji: '🎨' },
    { id: 3, name: 'Charlie Lee', role: '백엔드 개발자', emoji: '⚙️' },
    { id: 4, name: 'Diana Prince', role: '프로젝트 매니저', emoji: '🚀' },
];

export default function TeamPage() {
    return (
        <div style={{ padding: '2rem 0' }}>

            {/* 페이지 타이틀 영역 */}
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h1 style={{ fontWeight: 700 }}>함께하는 사람들</h1>
                <p style={{ color: 'var(--text-sub)' }}>따뜻한 마음으로 최고의 결과물을 만듭니다.</p>
            </div>

            {/* 
         [반응형 그리드]
         - repeat(auto-fill, minmax(220px, 1fr)):
           카드의 크기를 최소 220px로 유지하면서, 화면에 들어갈 수 있는 만큼 최대한 채웁니다.
           화면이 좁아지면 자동으로 줄바꿈이 일어납니다.
      */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                gap: '2rem'
            }}>
                {/* 
           [자바스크립트 map 함수]
           배열에 들어있는 데이터 개수만큼 반복하면서 화면을 그려냅니다.
           "teamMembers에 있는 각각의 팀원(member) 하나하나마다 이 HTML 코드로 바꿔줘!" 라는 명령입니다.
           
           * key={member.id} 가 필요한 이유:
             리액트는 수많은 카드 중에 누가 수정되거나 삭제되었는지 빠르게 알기 위해
             각 카드에 주민등록번호 같은 고유한 번호(key)를 요구합니다.
        */}
                {teamMembers.map((member) => (
                    <div
                        key={member.id}
                        className="clean-card"
                        style={{
                            padding: '2.5rem 1.5rem',
                            textAlign: 'center'
                        }}
                    >
                        {/* 데이터(member)에서 이모지를 꺼내서 보여줌 */}
                        <div style={{ fontSize: '3.5rem', marginBottom: '1.2rem' }}>{member.emoji}</div>

                        {/* 데이터에서 이름을 꺼내서 보여줌 */}
                        <h3 style={{ marginBottom: '0.4rem', fontSize: '1.15rem' }}>{member.name}</h3>

                        {/* 직무(role)를 보여주는 알약 모양 태그 */}
                        <span style={{
                            color: 'var(--text-main)',
                            fontWeight: 600,
                            fontSize: '0.85rem',
                            backgroundColor: 'var(--primary-color)',
                            padding: '4px 12px',
                            borderRadius: '20px'
                        }}>
                            {member.role}
                        </span>
                    </div>
                ))}
            </div>
            {/* 
                [구분선 섹션]
                팀원 목록과 날씨 위젯을 시각적으로 분리하기 위해 
                상단에 가는 선(borderTop)과 충분한 여백(marginTop)을 추가했습니다.
            */}
            <section style={{
                marginTop: '8rem',      // 팀원 목록과의 거리
                paddingTop: '6rem',     // 선과의 거리
                borderTop: '1px solid #eee' // 아주 연한 회색 실선
            }}>
                <h2 style={{
                    textAlign: 'center',
                    fontSize: '1.8rem',
                    marginBottom: '3rem',
                    color: 'var(--text-main)'
                }}>
                    멤버들의 현재 지역 날씨
                </h2>
                <WeatherWidget />
            </section>
        </div>
    );
}
