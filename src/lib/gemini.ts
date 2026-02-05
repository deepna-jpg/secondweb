import { GoogleGenerativeAI } from "@google/generative-ai";

// Vite는 환경 변수를 import.meta.env 로 가져옵니다.
const apiKey = import.meta.env.VITE_GEMINI_KEY;

// 클라이언트 초기화
const genAI = new GoogleGenerativeAI(apiKey);

/**
 * 날씨 데이터를 바탕으로 AI 조언을 가져옵니다.
 */
export async function getWeatherAdvice(temp: number) {
    try {
        // 모델명 수정: Flash 버전 명시 (v1beta 대응)
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const prompt = `현재 서울의 기온은 ${temp}도입니다. 
이 날씨에 어울리는 옷차림과 짧은 인사말을 친절하게 추천해주세요. 
3문장 이내로 답변해주세요.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        return text;
    } catch (error) {
        console.error("Gemini Weather Advice Error:", error);
        return "AI 조언을 가져오는 중 오류가 발생했습니다. (API 키나 모델 설정을 확인해주세요)";
    }
}

/**
 * 날씨, 스타일, 성별을 고려하여 구체적인 패션 추천을 제공합니다.
 */
export async function getFashionRecommendation(temp: number, location: string, style: string, gender: string) {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const prompt = `당신은 전문 패션 에디터입니다. 다음 정보를 바탕으로 오늘을 위한 완벽한 코디를 제안해주세요.
- 장소: ${location} (현재 기온 ${temp}°C)
- 선호 스타일: ${style}
- 성별: ${gender}

[요청 사항]
1. 패션 매거진 기사처럼 세련되고 전문적인 어조로 말해주세요.
2. 상의, 하의, 신발, 액세서리(선택)를 포함한 구체적인 코디 아이템을 추천해주세요.
3. 현재 기온을 고려하여 활동하기에 적절한지 설명해주세요.
4. 전체적인 룩의 포인트가 무엇인지 요약해주세요.
5. 답변은 정중하면서도 스타일리시하게 4-5문장 정도로 작성해주세요.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("Gemini Fashion Recommendation Error:", error);
        return "패션 조언을 생성하는 중 오류가 발생했습니다.";
    }
}

/**
 * 단순 테스트 함수
 */
export async function testGemini() {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        const result = await model.generateContent("Explain how AI works in a few words");
        const response = await result.response;
        console.log("Gemini Response:", response.text());
        return response.text();
    } catch (error) {
        console.error("Gemini Error:", error);
        throw error;
    }
}
