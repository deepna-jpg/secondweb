import WeatherWidget from '../components/WeatherWidget';

export default function WeatherPage() {
    return (
        <div style={{ padding: '4rem 1rem', textAlign: 'center' }}>
            <h2 style={{
                fontSize: '2.5rem',
                marginBottom: '1rem',
                color: 'var(--text-main)'
            }}>
                📊 상세 날씨 예보실
            </h2>
            <p style={{
                color: 'var(--text-sub)',
                marginBottom: '3rem',
                fontSize: '1.1rem'
            }}>
                서울 지역의 상세 기상 정보를 확인하는 상황실입니다.
            </p>

            <WeatherWidget />
        </div>
    );
}