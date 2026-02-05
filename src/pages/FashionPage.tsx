import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getFashionRecommendation } from '../lib/gemini';

/**
 * [FashionPage]
 * 패션 매거진 스타일의 오늘의 코디 추천 페이지입니다.
 */

interface Member {
    name: string;
    gender: string;
    style: string;
    location: string;
}

// 간단한 도시별 좌표 라이브러리 (실제로는 Geocoding API를 쓰면 더 좋습니다)
const locationMap: Record<string, { lat: number; lon: number }> = {
    "Seoul": { lat: 37.5, lon: 126.9 },
    "Busan": { lat: 35.1, lon: 129.0 },
    "Incheon": { lat: 37.4, lon: 126.7 }
};

export default function FashionPage() {
    const [memberKeys, setMemberKeys] = useState<string[]>([]);
    const [selectedKey, setSelectedKey] = useState<string>('');
    const [memberDetail, setMemberDetail] = useState<Member | null>(null);
    const [weather, setWeather] = useState<{ temp: number } | null>(null);
    const [recommendation, setRecommendation] = useState<string>('');
    const [loading, setLoading] = useState(false);

    /**
     * 페이지 로드 시 FastAPI 서버에서 팀원 목록을 가져옵니다.
     */
    useEffect(() => {
        const fetchMembers = async () => {
            try {
                // Flask/FastAPI 서버 주소 (CORS 설정이 되어 있어야 합니다)
                const res = await axios.get('http://127.0.0.1:8000/members');
                setMemberKeys(res.data);
            } catch (err) {
                console.error("팀원 목록을 가져오지 못했습니다.", err);
            }
        };
        fetchMembers();
    }, []);

    /**
     * 팀원을 선택했을 때의 복합 로직
     * 1. 팀원 상세 정보 가져오기 (FastAPI)
     * 2. 해당 지역의 실시간 날씨 가져오기 (Open-Meteo)
     * 3. 모든 정보를 합쳐서 AI 패션 추천 받기 (Gemini)
     */
    const handleMemberChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const key = e.target.value;
        setSelectedKey(key);

        if (!key) {
            setMemberDetail(null);
            setWeather(null);
            setRecommendation('');
            return;
        }

        setLoading(true);
        setRecommendation(''); // 이전 결과 초기화

        try {
            // 1. FastAPI에서 상세 정보 획득
            const memberRes = await axios.get(`http://127.0.0.1:8000/members/${key}`);
            const member = memberRes.data;
            setMemberDetail(member);

            // 2. 해당 도시 좌표로 날씨 조회
            const coords = locationMap[member.location] || locationMap["Seoul"];
            const weatherRes = await axios.get(
                `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&current_weather=true`
            );
            const currentTemp = weatherRes.data.current_weather.temperature;
            setWeather({ temp: currentTemp });

            // 3. Gemini AI에게 패션 추천 요청
            const advice = await getFashionRecommendation(
                currentTemp,
                member.location,
                member.style,
                member.gender
            );
            setRecommendation(advice);

        } catch (err) {
            console.error("데이터 처리 중 오류 발생:", err);
            setRecommendation("정보를 가져오는 중 오류가 발생했습니다. 서버 상태를 확인해주세요.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-container animate-fade">
            <header style={{ marginTop: '3rem' }}>
                <span className="fashion-label">Seasonal Editorial</span>
                <h1 className="fashion-title">Today's Look</h1>
                <p style={{ color: 'var(--text-sub)', fontSize: '1.1rem' }}>
                    당신의 팀원과 날씨를 기반으로 제안하는 독점적인 스타일 가이드입니다.
                </p>
            </header>

            <div className="magazine-container">
                {/* 왼쪽 사이드바: 팀원 선택 */}
                <aside className="magazine-sidebar">
                    <div className="clean-card" style={{ padding: '1.5rem', background: '#f8f8f8' }}>
                        <label className="fashion-label">Select Team Member</label>
                        <select
                            className="member-select"
                            value={selectedKey}
                            onChange={handleMemberChange}
                            disabled={loading}
                        >
                            <option value="">팀원을 선택하세요</option>
                            {memberKeys.map(key => (
                                <option key={key} value={key}>{key}</option>
                            ))}
                        </select>

                        {memberDetail && (
                            <div style={{ marginTop: '2rem' }} className="animate-fade">
                                <span className="fashion-label">Member Profile</span>
                                <h3 style={{ margin: '0.5rem 0' }}>{memberDetail.name}</h3>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-sub)' }}>
                                    STYLE: <strong>{memberDetail.style}</strong><br />
                                    LOCATION: <strong>{memberDetail.location}</strong>
                                </p>
                            </div>
                        )}
                    </div>
                </aside>

                {/* 메인 결과 화면 */}
                <main className="magazine-main">
                    {!selectedKey ? (
                        <div style={{ textAlign: 'center', padding: '5rem 0', color: '#ccc' }}>
                            <p style={{ fontSize: '1.5rem', fontStyle: 'italic' }}>
                                왼쪽에서 팀원을 선택하면 맞춤형 추천이 시작됩니다.
                            </p>
                        </div>
                    ) : (
                        <div className="animate-fade">
                            {weather && (
                                <div className="weather-badge">
                                    {memberDetail?.location} • {weather.temp}°C
                                </div>
                            )}

                            <div className="recommendation-box">
                                <span className="fashion-label">Editor's Suggestion</span>

                                {loading ? (
                                    <div style={{ padding: '2rem 0' }}>
                                        <p style={{ fontStyle: 'italic', color: 'var(--text-sub)' }}>
                                            AI 에디터가 오늘의 룩을 분석 중입니다... 🖋️
                                        </p>
                                    </div>
                                ) : (
                                    <div style={{ lineHeight: '1.8', fontSize: '1.1rem', wordBreak: 'keep-all' }}>
                                        {recommendation.split('\n').map((line, i) => (
                                            <p key={i} style={{ marginBottom: '1rem' }}>{line}</p>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div style={{ marginTop: '2rem', textAlign: 'right' }}>
                                <p style={{ fontStyle: 'italic', color: 'var(--text-sub)', fontSize: '0.9rem' }}>
                                    Antigravity Fashion Magazine | Feb 2026 Issue
                                </p>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
