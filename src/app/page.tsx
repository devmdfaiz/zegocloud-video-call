"use client";

import { generateZegoCloudInstance } from "@/libs/action/zego.action";
import { auth } from "@/libs/auth/auth";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();

  const roomID =
    searchParams.get("room-id") || Math.floor(Math.random() * 10000) + "";

  useEffect(() => {
    (async () => {
      if (containerRef.current) {
        const { token, userID } = await generateZegoCloudInstance();

        const { ZegoUIKitPrebuilt } = await import(
          "@zegocloud/zego-uikit-prebuilt"
        );

        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForProduction(
          Number(process.env.NEXT_PUBLIC_ZEGOCLOUD_APPID || 0),
          token,
          roomID,
          userID,
          auth.session.username
        );

        const zp = ZegoUIKitPrebuilt.create(kitToken);

        zp.joinRoom({
          container: containerRef.current!,
          sharedLinks: [
            {
              name: "Personal link",
              url:
                window.location.protocol +
                "//" +
                window.location.host +
                window.location.pathname +
                "?room-id=" +
                roomID,
            },
          ],
          scenario: {
            mode: ZegoUIKitPrebuilt.VideoConference,
          },

          turnOnMicrophoneWhenJoining: true,
          turnOnCameraWhenJoining: true,
          showMyCameraToggleButton: true,
          showMyMicrophoneToggleButton: true,
          showAudioVideoSettingsButton: true,
          showScreenSharingButton: true,
          showTextChat: true,
          showUserList: true,
          maxUsers: 50,
          layout: "Auto",
          showLayoutButton: true,
        });
      }
      setLoading(false);
    })();
  }, []);

  const Loader = () => (
    <div className="flex items-center justify-center w-full h-screen">
      Loading...
    </div>
  );

  return (
    <>
      {loading && <Loader />}
      <div
        ref={containerRef}
        className="flex items-center justify-center w-full h-screen"
      />
    </>
  );
}
