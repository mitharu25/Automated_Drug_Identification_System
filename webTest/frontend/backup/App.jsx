import { useState } from "react";
import WebcamView from "./components/WebcamView";
import DetectionPanel from "./components/DetectionPanel";

function App() {

  const [detections, setDetections] = useState([]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-3xl font-bold mb-6">
        Drug Detection
      </h1>

      <div className="grid grid-cols-2 gap-6">

        <WebcamView
          detections={detections}
          setDetections={setDetections}
        />

        <DetectionPanel detections={detections} />

      </div>

    </div>
  );
}

export default App;