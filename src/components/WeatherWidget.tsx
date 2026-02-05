/**
 * ==========================================
 * 🌤️ WeatherWidget : 날씨 표시 카드 컴포넌트
 * ==========================================
 * 
 * [역할]
 * 1. useWeather 훅을 통해 데이터를 가져옵니다.
 * 2. 가져온 데이터(온도, AI 조언)를 예쁜 카드로 보여줍니다.
 * 3. AI가 생각 중일 때는 "고민 중..."이라는 메시지를 띄워줍니다.
 */

import useWeather from '../hooks/useWeather';

export default function WeatherWidget() {
    // 훅에서 필요한 재료들을 꺼내옵니다.
    // aiAdvice: AI의 답변 / loading: 전체 데이터 로딩 중 / aiLoading: AI만 로딩 중(추가 예정)
    const { currentTemp, hourlyTemps, aiAdvice, loading, error, fetchWeather } = useWeather();

    return (
        <div className="clean-card" style={{
            padding: '2rem',
            textAlign: 'center',
            maxWidth: '450px',
            margin: '0 auto'
        }}>
            <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>🌤️ 서울 날씨</h3>

            {/* 1. 로딩 & 에러 처리 영역 */}
            {loading && <p style={{ color: 'var(--text-sub)' }}>데이터 배달 중... 🚚</p>}
            {error && <p style={{ color: '#ff6b6b' }}>{error}</p>}

            {/* 2. 메인 데이터 표시 영역 (온도가 있을 때만 보임) */}
            {currentTemp !== null && (
                <div className="animate-fade">
                    {/* 현재 온도 */}
                    <h2 style={{
                        fontSize: '3.5rem',
                        fontWeight: '700',
                        color: 'var(--text-main)',
                        margin: '1.5rem 0'
                    }}>{currentTemp}°C</h2>

                    {/* 
                      [AI 조언 섹션] ⭐ 업데이트됨
                      AI 답변이 있으면 답변을 보여주고,
                      아직 없으면(빈 문자열이면) "생각 중..." 메시지를 보여줍니다.
                    */}
                    <div style={{
                        background: '#fff9e6', // 봄 테마 배경색
                        padding: '1.2rem',
                        borderRadius: '12px',
                        marginBottom: '1.5rem',
                        fontSize: '0.95rem',
                        lineHeight: '1.6',
                        borderLeft: '4px solid #ffd700', // 골드 포인트
                        textAlign: 'left',
                        color: 'var(--text-main)',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
                    }}>
                        <div style={{ fontWeight: 'bold', marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '1.2rem' }}>🤖</span> AI 코디 추천
                        </div>

                        {/* 3항 연산자: (조건) ? (참일 때) : (거짓일 때) */}
                        {aiAdvice ? (
                            <p style={{ margin: 0, wordBreak: 'keep-all' }}>{aiAdvice}</p>
                        ) : (
                            <p style={{ margin: 0, color: '#b5a150', fontStyle: 'italic' }}>
                                방문자님께 어울리는 옷을 고르는 중이에요... 🤔
                            </p>
                        )}
                    </div>

                    {/* 시간별 예보 (하단 박스) */}
                    <div style={{
                        background: 'var(--bg-color)',
                        padding: '1rem',
                        borderRadius: 'var(--border-radius)',
                        fontSize: '0.9rem',
                        color: 'var(--text-sub)',
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}>
                        <p>🕛 자정: <strong>{hourlyTemps[0]}°C</strong></p>
                        <p>☀️ 점심: <strong>{hourlyTemps[12]}°C</strong></p>
                        <p>🌙 저녁: <strong>{hourlyTemps[18]}°C</strong></p>
                    </div>
                </div>
            )}

            {/* 3. 조작 버튼 */}
            <button
                onClick={fetchWeather}
                disabled={loading}
                style={{
                    marginTop: '1.5rem',
                    width: '100%',
                    background: loading ? '#444' : 'var(--primary-color)'
                }}
            >
                {loading ? '데이터 불러오는 중...' : (currentTemp ? '🔄 새로고침' : '날씨 불러오기')}
            </button>
        </div>
    );
}
