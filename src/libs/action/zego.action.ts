"use server"

import { auth } from "../auth/auth"
import { generateToken04 } from "../zegocloud/server-assistant.zegocloud";

export async function generateZegoCloudInstance() {
    const userID = auth.session.id;
    const appID = Number(process.env.ZEGOCLOUD_APPID) || 0;
    const serverSecret = process.env.ZEGOCLOUD_SERVER_SECRET || "";
    const effectiveTimeInSeconds = 3600;
    const payload = '';

    const token = generateToken04(appID, userID, serverSecret, effectiveTimeInSeconds, payload);

    return token;
}