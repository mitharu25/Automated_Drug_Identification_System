from ultralytics import YOLO

model = YOLO("app/ml_models/my_model.pt")

def detect_objects(image):

    results = model(image)

    detections = []
    box_id = 1

    for r in results:
        for box in r.boxes:

            class_id = int(box.cls[0])
            label = model.names[class_id]
            confidence = float(box.conf[0])

            x1, y1, x2, y2 = box.xyxy[0].tolist()

            detections.append({
                "id": f"id_{box_id}",
                "name": label,
                "confidence": confidence,
                "bbox": box.xyxy[0].tolist()
            })
            box_id += 1

    return detections