/**
 * ==========================================
 * 🌤️ useWeather : 날씨와 AI 조언을 관리하는 맞춤형 훅(Custom Hook)
 * ==========================================
 * 
 * [훅(Hook)이란?]
 * 리액트에서 반복되는 "비즈니스 로직(데이터 처리, 상태 관리)"을 
 * 화면(UI)과 분리하여 따로 떼어놓은 똑똑한 도구함입니다.
 * 
 * 이 훅을 사용하면 어떤 컴포넌트든 '날씨 정보'와 'AI 추천' 기능을 
 * 아주 쉽게 가져다 쓸 수 있습니다.
 */

import { useState } from 'react';
import axios from 'axios';
import { getWeatherAdvice } from '../lib/gemini';

export default function useWeather() {
    /**
     * 1. 상태(State) 정의
     * '상태'는 화면에 직접적으로 영향을 주는 변수들입니다.
     * 이 값이 바뀌면 리액트가 화면을 자동으로 다시 그려줍니다.
     */

    // 현재 온도 (숫자이거나 아직 없으면 null)
    const [currentTemp, setCurrentTemp] = useState<number | null>(null);

    // 시간대별 온도 리스트 (숫자 배열)
    const [hourlyTemps, setHourlyTemps] = useState<number[]>([]);

    // Gemini AI가 들려주는 코디 조언 문구
    const [aiAdvice, setAiAdvice] = useState<string>('');

    // 데이터를 가져오는 중인지 알려주는 스위치 (true/false)
    const [loading, setLoading] = useState(false);

    // 에러 발생 시 메시지를 담는 바구니
    const [error, setError] = useState<string | null>(null);

    /**
     * [함수 A] getWeatherData (데이터 심부름꾼)
     * 역할: 순수하게 API를 호출해서 원본 데이터를 가져오는 일만 합니다.
     * async/await: 인터넷 너머에서 데이터를 가져올 때까지 '기다려!'라고 명령하는 방식입니다.
     */
    const getWeatherData = async () => {
        // Open-Meteo라는 무료 날씨 서비스의 위도/경도(서울) 주소입니다.
        const url = "https://api.open-meteo.com/v1/forecast?latitude=37.5&longitude=126.9&current_weather=true&hourly=temperature_2m";
        const response = await axios.get(url);
        return response.data; // 가져온 날씨 데이터 뭉치를 리턴합니다.
    };

    /**
     * [함수 B] fetchWeather (총괄 관리자)
     * 역할: 로딩을 켜고, 데이터를 가져와서, AI에게 물어보고, 모든 결과를 상태에 담습니다.
     * 컴포넌트에서 버튼을 누를 때 주로 이 함수를 실행하게 됩니다.
     */
    const fetchWeather = async () => {
        try {
            // 0. 준비 단계 (기존 데이터 초기화 및 로딩 시작)
            setLoading(true);
            setError(null);
            setCurrentTemp(null);
            setAiAdvice('');

            // 1. 날씨 데이터 가져오기 (심부름꾼 시키기)
            const data = await getWeatherData();

            // 2. 받아온 데이터를 우리 바구니(State)에 정리하기
            const temp = data.current_weather.temperature;
            setCurrentTemp(temp); // 현재 온도 저장
            setHourlyTemps(data.hourly.temperature_2m); // 시간별 온도 목록 저장

            // 3. ✨ Gemini AI에게 조언 구하기
            // 온도를 알려주며 "이 온도에 뭐 입을까?"라고 물어보고 답변을 받습니다.
            const advice = await getWeatherAdvice(temp);
            setAiAdvice(advice || ''); // AI 조언 저장

        } catch (err) {
            // 실패했을 경우 에러 메시지 표시
            console.error("날씨 정보 획득 실패:", err);
            setError("날씨 데이터를 가져오는 중 문제가 생겼습니다.");
        } finally {
            // 성공하든 실패하든 마지막에는 로딩 스위치를 끕니다.
            setLoading(false);
        }
    };

    /**
     * 이 훅(도구함)을 사용하는 쪽으로 데이터와 함수를 전달합니다.
     * 밖에서는 이 이름들을 가지고 화면을 그릴 수 있습니다.
     */
    return {
        currentTemp,    // 현재 온도
        hourlyTemps,    // 시간별 온도
        aiAdvice,       // AI 조언
        loading,        // 로딩 여부
        error,          // 에러 메시지
        fetchWeather    // 날씨 불러오기 실행 버튼용 함수
    };
}
