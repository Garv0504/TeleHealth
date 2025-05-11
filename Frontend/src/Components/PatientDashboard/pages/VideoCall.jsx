import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

function VideoCall() {
  const { roomId } = useParams();
  const containerRef = useRef(null);

  useEffect(() => {
    const appId = Number(import.meta.env.VITE_REACT_APP_ZEGOCLOUD_APP_ID);
    const serverSecret = import.meta.env.VITE_REACT_APP_ZEGOCLOUD_SERVER_SECRET;

    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appId,
      serverSecret,
      roomId,
      Date.now().toString(),
      "Your Name" // Replace with the actual user name
    );

    const zp = ZegoUIKitPrebuilt.create(kitToken);
    zp.joinRoom({
      container: containerRef.current,
      sharedLinks: [
        {
          name: "Copy Link",
          url: `${window.location.origin}/room/${roomId}`,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall,
      },
    });
  }, [roomId]);

  return <div ref={containerRef} style={{ width: "100vw", height: "100vh" }} />;
}

export default VideoCall;
