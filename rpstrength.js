/*
 * RP Strength All Apps Unlock
 * Supports: RP Diet, RP Hypertrophy, RP Training
 * Author: lengoctu70
 */

var body = $response.body;
var url = $request.url;

try {
    var obj = JSON.parse(body);

    // Log for debugging
    console.log("RP Strength Script - URL: " + url);
    console.log("RP Strength Script - Original keys: " + Object.keys(obj).join(", "));

    // Premium subscription data for RP Hypertrophy
    var premiumSubscription = {
        "id": 727,
        "key": "training_sub_yearly",
        "name": "Hypertrophy Yearly Sub Regular",
        "priority": 100,
        "referralRequired": false,
        "isPromo": false,
        "startsAt": "2024-01-01T00:00:00.000Z",
        "endsAt": "2099-12-31T23:59:59.000Z",
        "createdAt": "2023-04-21T17:00:23.563Z",
        "updatedAt": "2024-01-01T00:00:00.000Z",
        "deletedAt": null,
        "access": ["training"],
        "matchedReferralCodes": [],
        "inAppPurchases": [
            {
                "id": 929,
                "platformId": "RPHypertrophyYearlySub",
                "platform": "ios",
                "subscriptionGroup": "RP Hypertrophy",
                "isInternal": false,
                "createdAt": "2024-01-01T00:00:00.000Z",
                "updatedAt": "2024-01-01T00:00:00.000Z",
                "deletedAt": null,
                "purchaseType": "subscription",
                "name": "Hypertrophy App Yearly",
                "callout": null,
                "description": null,
                "stripeProductIdLive": null,
                "stripeProductIdTest": null,
                "comparisonName": "Hypertrophy App Yearly",
                "comparisonCallout": null,
                "comparisonDescription": null,
                "productId": 727,
                "inAppPurchaseId": 929,
                "prices": [
                    {
                        "id": 1028,
                        "inAppPurchaseId": 929,
                        "price": 29999,
                        "unit": "year",
                        "billingPeriod": 1,
                        "introPrice": null,
                        "introUnit": null,
                        "introBillingPeriod": null,
                        "introLength": null,
                        "promoPrice": null,
                        "promoUnit": null,
                        "promoBillingPeriod": null,
                        "promoLength": null,
                        "startsAt": "2024-01-01T00:00:00.000Z",
                        "endsAt": "2099-12-31T23:59:59.000Z",
                        "createdAt": "2024-01-01T00:00:00.000Z",
                        "updatedAt": "2024-01-01T00:00:00.000Z",
                        "deletedAt": null,
                        "stripeCouponId": null,
                        "accessStartsAt": "2024-01-01T00:00:00.000Z",
                        "accessEndsAt": "2099-12-31T23:59:59.000Z",
                        "monthlyPrice": 2500
                    }
                ]
            }
        ],
        "purchaseType": "subscription",
        "recommended": true
    };

    // ===== Handle /api/user/profile endpoint =====
    if (url.indexOf("/api/user/profile") !== -1) {
        console.log("RP Strength Script - Handling user profile endpoint");

        // Add or replace activeSubscriptions
        obj.activeSubscriptions = [premiumSubscription];

        // Set premium flags if they exist
        if (obj.isPremium !== undefined) obj.isPremium = true;
        if (obj.isSubscribed !== undefined) obj.isSubscribed = true;
        if (obj.hasActiveSubscription !== undefined) obj.hasActiveSubscription = true;
        if (obj.premium !== undefined) obj.premium = true;

        // Handle user object
        if (obj.user) {
            obj.user.activeSubscriptions = [premiumSubscription];
            if (obj.user.isPremium !== undefined) obj.user.isPremium = true;
            if (obj.user.isSubscribed !== undefined) obj.user.isSubscribed = true;
        }
    }

    // ===== Handle /api/products.json endpoint =====
    if (url.indexOf("/api/products.json") !== -1 || url.indexOf("/products") !== -1) {
        console.log("RP Strength Script - Handling products endpoint");

        // If response is an array of products, mark the yearly as purchased
        if (Array.isArray(obj)) {
            obj.forEach(function (product) {
                if (product.key === "training_sub_yearly" || product.priority === 100) {
                    product.purchased = true;
                    product.isActive = true;
                }
            });
        }
    }

    // ===== Handle activeSubscriptions array (general) =====
    if (obj.activeSubscriptions !== undefined) {
        obj.activeSubscriptions = [premiumSubscription];
    }

    // ===== Handle subscription object =====
    if (obj.subscription !== undefined) {
        obj.subscription = {
            "active": true,
            "status": "active",
            "plan": "premium",
            "type": "yearly",
            "expiresAt": "2099-12-31T23:59:59.000Z",
            "startsAt": "2024-01-01T00:00:00.000Z"
        };
    }

    // ===== Handle isPremium/isSubscribed flags =====
    if (obj.isPremium !== undefined) obj.isPremium = true;
    if (obj.isSubscribed !== undefined) obj.isSubscribed = true;
    if (obj.isPro !== undefined) obj.isPro = true;
    if (obj.hasPremium !== undefined) obj.hasPremium = true;
    if (obj.hasActiveSubscription !== undefined) obj.hasActiveSubscription = true;

    // ===== Handle user.subscription =====
    if (obj.user && obj.user.subscription !== undefined) {
        obj.user.subscription = {
            "active": true,
            "status": "active",
            "plan": "premium",
            "expiresAt": "2099-12-31T23:59:59.000Z"
        };
    }

    // ===== Handle user.isPremium =====
    if (obj.user) {
        if (obj.user.isPremium !== undefined) obj.user.isPremium = true;
        if (obj.user.isSubscribed !== undefined) obj.user.isSubscribed = true;
        if (obj.user.premium !== undefined) obj.user.premium = true;
    }

    // ===== Handle entitlements =====
    if (obj.entitlements !== undefined) {
        obj.entitlements = {
            "premium": true,
            "all": true,
            "diet": true,
            "training": true,
            "hypertrophy": true
        };
    }

    // ===== Handle data wrapper =====
    if (obj.data) {
        if (obj.data.subscription !== undefined) {
            obj.data.subscription = {
                "active": true,
                "status": "active",
                "plan": "premium",
                "expiresAt": "2099-12-31T23:59:59.000Z"
            };
        }
        if (obj.data.isPremium !== undefined) obj.data.isPremium = true;
        if (obj.data.activeSubscriptions !== undefined) {
            obj.data.activeSubscriptions = [premiumSubscription];
        }
    }

    body = JSON.stringify(obj);
    console.log("RP Strength Script - Modified successfully");
    console.log("RP Strength Script - New keys: " + Object.keys(obj).join(", "));

} catch (e) {
    console.log("RP Strength Script - Error: " + e.message);
}

$done({ body: body });
