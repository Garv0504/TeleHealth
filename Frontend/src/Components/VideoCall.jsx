import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

function VideoCall() {
  const { roomId } = useParams();
  const containerRef = useRef(null);

  useEffect(() => {
    const appId = 1987190651;
    const serverSecret = "d096e420dc1af2409e1195bea1f8ddc4";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appId,
      serverSecret,
      roomId,
      Date.now().toString(),
      "Enter Your Name"
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
