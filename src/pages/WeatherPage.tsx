import WeatherWidget from '../components/WeatherWidget';

export default function WeatherPage() {
    return (
        <div>
            <h2 className="text-2xl font-bold text-center">📊 상세 날씨 예보실</h2>
            <p className="text-center mb-4">서울 지역의 상세 기상 정보를 확인하는 상황실입니다.</p>

            {/* 여기도 부착! */}
            <WeatherWidget />
        </div>
    );
}