import { useState } from "react";
import Navbar from "./components/NavBar";
import WebcamView from "./components/WebcamView";
import DetectionPanel from "./components/DetectionPanel";

function App() {

  const [detections, setDetections] = useState([]);

  return (
    <>
    <div className="bg-gray-100">
      <Navbar />
      <div className="max-w-screen-xl mx-auto mt-25 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">

          {/* Camera Section */}
          <div className="bg-white shadow-lg rounded-xl p-4">
            <WebcamView
              detections={detections}
              setDetections={setDetections} 
            />
          </div>

          {/* Detection Panel Section */}
          <div className="bg-white shadow-lg rounded-xl p-4 h-[520px] overflow-y-auto">
            <DetectionPanel detections={detections} />
          </div>

        </div>
      </div>

      {/* Floating notice */}
      <div className="fixed bottom-4 left-4 bg-yellow-300/30 backdrop-blur-md text-sm text-gray-800 px-4 py-2 rounded-lg shadow-lg border border-white/20">
        ⚠ This web just for test
      </div>

    </div>
    </>
  );
}

export default App;