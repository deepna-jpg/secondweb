// src/hooks/useWeather.ts
import { useState } from 'react';
import axios from 'axios';

export default function useWeather() {
    // 1. 상태(State) 바구니들
    const [currentTemp, setCurrentTemp] = useState<number | null>(null);
    const [hourlyTemps, setHourlyTemps] = useState<number[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // ============================================================
    // 함수 A: 데이터 심부름꾼 (getWeatherData)
    // 역할: 오직 Axios로 데이터를 가져와서 리턴만 함 (State 모름)
    // ============================================================
    const getWeatherData = async () => {
        const url = "https://api.open-meteo.com/v1/forecast?latitude=37.5&longitude=126.9&current_weather=true&hourly=temperature_2m";
        const response = await axios.get(url);
        return response.data; // 데이터를 밖으로 던져줍니다.
    };

    // ============================================================
    // 함수 B: 화면 관리자 (fetchWeather)
    // 역할: 로딩 켜고, 심부름꾼(A) 시키고, 받아온 걸 State에 담음
    // ============================================================
    const fetchWeather = async () => {
        try {
            setLoading(true);
            setError(null);
            setCurrentTemp(null);
            setHourlyTemps([]);

            // 1. 심부름꾼에게 다녀오라고 시킴
            const data = await getWeatherData();

            // 2. 받아온 데이터를 State에 예쁘게 정리
            setCurrentTemp(data.current_weather.temperature);
            setHourlyTemps(data.hourly.temperature_2m);

        } catch (err) {
            setError("날씨 데이터를 가져오는데 실패했습니다.");
        } finally {
            setLoading(false);
        }
    };

    // 컴포넌트는 심부름꾼(getWeatherData)은 몰라도 되고, 
    // 관리자(fetchWeather)와 결과값들만 알면 됩니다.
    return { currentTemp, hourlyTemps, loading, error, fetchWeather };
}