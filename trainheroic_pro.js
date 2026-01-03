// TrainHeroic Athlete Pro Access Script for Egern
// Tác giả: Script tự động
// Mục đích: Mở khóa Athlete Pro access trong TrainHeroic app

const url = $request.url;
const headers = $request.headers;

// Kiểm tra nếu là API athletePro/access
if (url.includes("api.trainheroic.com/v5/athletePro/access")) {
    
    // Tính toán timestamp hết hạn (1 năm từ bây giờ)
    const currentTime = Math.floor(Date.now() / 1000);
    const oneYearLater = currentTime + (365 * 24 * 60 * 60);
    
    // Tạo response giả lập với Pro access
    const mockResponse = {
        "hasAthleteProAccess": true,
        "expiresAtTimestamp": oneYearLater,
        "athleteTrial": {
            "isInAthleteTrial": false,
            "daysRemainingInAthleteTrial": 365,
            "hasExpiredAthleteTrial": false,
            "expiresAtTimestamp": oneYearLater
        },
        "settings": {
            "isNutritionEnabled": true,
            "shareNutritionWithCoach": false,
            "isStreaksEnabled": true
        }
    };
    
    // Trả về response đã modify
    $done({
        status: 200,
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Cache-Control": "no-cache, private"
        },
        body: JSON.stringify(mockResponse)
    });
    
} else {
    // Nếu không phải API cần modify, cho request đi qua bình thường
    $done({});
}
