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

    // ===== Handle activeSubscriptions array =====
    if (obj.activeSubscriptions !== undefined) {
        obj.activeSubscriptions = [
            {
                "id": 999,
                "key": "rpstrengthlifetime",
                "name": "Lifetime Premium",
                "priority": 100,
                "referralRequired": false,
                "isPromo": false,
                "startsAt": "2020-01-01T00:00:00.000Z",
                "endsAt": "2099-12-31T23:59:59.000Z",
                "createdAt": "2020-01-01T00:00:00.000Z",
                "updatedAt": "2024-01-01T00:00:00.000Z",
                "deletedAt": null,
                "access": ["diet", "training", "hypertrophy", "all"],
                "matchedReferralCodes": [],
                "inAppPurchases": [],
                "purchaseType": "lifetime",
                "recommended": true
            }
        ];
    }

    // ===== Handle subscription object =====
    if (obj.subscription !== undefined) {
        obj.subscription = {
            "active": true,
            "status": "active",
            "plan": "premium",
            "type": "lifetime",
            "expiresAt": "2099-12-31T23:59:59.000Z",
            "startsAt": "2020-01-01T00:00:00.000Z"
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
            obj.data.activeSubscriptions = obj.activeSubscriptions || [{
                "active": true,
                "plan": "premium",
                "expiresAt": "2099-12-31T23:59:59.000Z"
            }];
        }
    }

    body = JSON.stringify(obj);
    console.log("RP Strength Script - Modified successfully");

} catch (e) {
    console.log("RP Strength Script - Error: " + e.message);
}

$done({ body: body });
