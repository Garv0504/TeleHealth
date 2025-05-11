import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

/**
 * Generates a ZegoCloud meeting URL for a given roomId and userName
 * @param {string} roomId - Unique identifier for the meeting room
 * @param {string} userName - The name of the user joining
 * @returns {string} - The meeting URL that can be shared and visited
 */
export function generateMeetingUrl(roomId, userName = "Guest") {
	const appId = Number(import.meta.env.VITE_REACT_APP_ZEGOCLOUD_APP_ID);
	const serverSecret = import.meta.env.VITE_REACT_APP_ZEGOCLOUD_SERVER_SECRET;

	if (!appId || !serverSecret) {
		throw new Error("Missing ZegoCloud environment variables");
	}

	const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
		appId,
		serverSecret,
		roomId,
		Date.now().toString(), // userId
		userName
	);

  const zp = ZegoUIKitPrebuilt.create(kitToken);
  
	const meetingUrl = `${roomId}`;
	return meetingUrl;
}
