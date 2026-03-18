export default function DetectionPanel({ detections }) {

  return (
    <div className="p-4 bg-white shadow rounded">

      <h2 className="text-xl font-bold mb-3">
        Count Drugs
      </h2>
      <div className="grid grid-cols-2">
        <p>Antangin: {detections.filter(d => d.name === "Antangin").length}</p>
        <p>Betadine: {detections.filter(d => d.name === "Betadine").length}</p>
        <p>Decolsin: {detections.filter(d => d.name === "Decolsin").length}</p>
        <p>Konidin: {detections.filter(d => d.name === "Konidin").length}</p>
        <p>Panadol: {detections.filter(d => d.name === "Panadol").length}</p>
        <p>Promag: {detections.filter(d => d.name === "Promag").length}</p>
        <p>VitaminC: {detections.filter(d => d.name === "VitaminC").length}</p>
      </div>
      <hr className="my-3" />
      <h2 className="text-xl font-bold mb-3">
        Detected Drugs
      </h2>

      {detections.length === 0 && (
        <p>No drug detected</p>
      )}

      {detections.map((d, i) => (
        <div key={i} className="border-b py-2">

          <p className="font-semibold">{i + 1}. {d.name} ({d.id})</p>
          <p>Confidence: {(d.confidence * 100).toFixed(1)}%</p>
          <p>Ingredients: {d.name_generic}</p>
          <p>Category: {d.category}</p>
          <p>Dosage Form: {d.dosage_form}</p>
          <p>Description: {d.description}</p>

        </div>
      ))}

    </div>
  );
}