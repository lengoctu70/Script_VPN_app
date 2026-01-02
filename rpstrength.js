// RP Strength Premium Unlock Script
// Unlock Diet & Training Premium Features

let body = $response.body;

try {
    let obj = JSON.parse(body);
    
    // Tạo expiration date 10 năm sau
    let futureDate = new Date();
    futureDate.setFullYear(futureDate.getFullYear() + 10);
    let expirationDate = futureDate.toISOString();
    
    // Unlock activeSubscriptions với cả diet và training
    obj.activeSubscriptions = [
        {
            "platform": "rp",
            "iapId": 701,
            "iapPurchaseType": "access_pass",
            "iapPlatformId": "pass_diet_training_premium",
            "iapName": "Diet & Training Premium Access",
            "isFreeTrial": false,
            "isIntroPriced": false,
            "referralId": null,
            "referralCode": null,
            "referralType": null,
            "purchaseDate": new Date().toISOString(),
            "expirationDate": expirationDate,
            "cancellationDate": null,
            "access": ["diet", "training"],
            "subscriptionId": null
        }
    ];
    
    // Update consumedIaps
    obj.consumedIaps = [
        {
            "platform": "rp",
            "purchaseType": "access_pass",
            "platformId": "pass_diet_training_premium",
            "subscriptionGroupId": null,
            "subscriptionGroupKey": null,
            "access": ["diet", "training"],
            "accessEndsAt": expirationDate
        }
    ];
    
    // Update last access date
    obj.dietLastAccessAddedAt = new Date().toISOString();
    obj.trainingLastAccessAddedAt = new Date().toISOString();
    
    body = JSON.stringify(obj);
    console.log("✅ RP Strength Premium unlocked successfully");
    
} catch (error) {
    console.log("❌ Error: " + error);
}

$done({body});