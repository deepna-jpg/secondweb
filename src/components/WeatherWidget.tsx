// src/components/WeatherWidget.tsx
import useWeather from '../hooks/useWeather';

export default function WeatherWidget() {
    // 훅에서 로직을 빌려옵니다.
    const { currentTemp, hourlyTemps, loading, error, fetchWeather } = useWeather();

    return (
        <div className="clean-card" style={{
            padding: '2rem',
            textAlign: 'center',
            maxWidth: '350px',
            margin: '0 auto'
        }}>
            <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>🌤️ 서울 날씨</h3>

            {/* 로딩 & 에러 처리 */}
            {loading && <p style={{ color: 'var(--text-sub)' }}>데이터 배달 중... 🚚</p>}
            {error && <p style={{ color: '#ff6b6b' }}>{error}</p>}

            {/* 데이터가 있을 때만 화면 표시 */}
            {currentTemp !== null && (
                <div className="animate-fade">
                    <h2 style={{
                        fontSize: '3.5rem',
                        fontWeight: '700',
                        color: 'var(--text-main)',
                        margin: '1.5rem 0'
                    }}>{currentTemp}°C</h2>

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

            <button
                onClick={fetchWeather}
                style={{ marginTop: '1.5rem', width: '100%' }}
            >
                {currentTemp ? '🔄 새로고침' : '날씨 불러오기'}
            </button>
        </div>
    );
}