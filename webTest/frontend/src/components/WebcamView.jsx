import { useEffect, useRef } from "react";
import { detectDrug } from "../services/api";

export default function WebcamView({ detections, setDetections }) {

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // start webcam
  useEffect(() => {

    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        videoRef.current.srcObject = stream;
      });

  }, []);

  // capture frame tiap 500ms
  useEffect(() => {

    const interval = setInterval(captureFrame, 500);

    return () => clearInterval(interval);

  }, []);

  // redraw bbox ketika detections berubah
  useEffect(() => {
    drawBoxes();
  }, [detections]);

  const captureFrame = async () => {

    const video = videoRef.current;

    if (!video.videoWidth) return;

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0);

    canvas.toBlob(async (blob) => {

      const result = await detectDrug(blob);
      setDetections(result.detections || []);
      console.log(result.detections);

    }, "image/jpeg");

  };

  const drawBoxes = () => {

    const canvas = canvasRef.current;
    const video = videoRef.current;

    const ctx = canvas.getContext("2d");

    const displayWidth = video.clientWidth;
    const displayHeight = video.clientHeight;

    canvas.width = displayWidth;
    canvas.height = displayHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const scaleX = displayWidth / video.videoWidth;
    const scaleY = displayHeight / video.videoHeight;

    detections.forEach(d => {
      const [x1,y1,x2,y2] = d.bbox;

      const bx = x1 * scaleX;
      const by = y1 * scaleY;
      const bw = (x2-x1) * scaleX;
      const bh = (y2-y1) * scaleY;

      ctx.strokeStyle = "lime";
      ctx.lineWidth = 3;

      ctx.strokeRect(bx, by, bw, bh);

      ctx.fillStyle = "lime";
      ctx.font = "16px Arial";

      ctx.fillText(
        `${d.name} (${d.id}) ${(d.confidence*100).toFixed(1)}%`,
        bx,
        by - 5
      );
    });
  };

  return (
    <div className="relative inline-block">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="block rounded-lg"
      />

      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 5,
          left: 2,
        }}
        className="pointer-events-none"
      />
    </div>
  );

}