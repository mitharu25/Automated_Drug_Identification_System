export default function DetectionPanel({ detections }) {

  return (
    <div className="p-4 bg-white shadow rounded">

      <h2 className="text-xl font-bold mb-3">
        Count Drugs
      </h2>
      <hr />
      <h2 className="text-xl font-bold mb-3">
        Detected Drugs
      </h2>

      {detections.length === 0 && (
        <p>No drug detected</p>
      )}

      {detections.map((d, i) => (
        <div key={i} className="border-b py-2">

          <p className="font-semibold">{d.name}</p>
          <p>Confidence: {(d.confidence * 100).toFixed(1)}%</p>
          <p>Ingredients: {d.name_generic}</p>
          <p>Category: {d.category}</p>
          <p>Dosage Form: {d.dosage_form}</p>
          <p>Description: {d.description}</p>
          <br />

        </div>
      ))}

    </div>
  );
}