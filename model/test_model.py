from ultralytics import YOLO
import cv2 as cv
import time

model = YOLO("my_model.pt")

cap = cv.VideoCapture(0) # parameter 0 untuk kamera default/laptop, 1 untuk kamera eksternal

if not cap.isOpened():
    print("Gagal membuka kamera")
    exit()

prev_time = 0

while True:
    ret, frame = cap.read()
    if not ret:
        break

    # Hitung FPS
    curr_time = time.time()
    fps = 1 / (curr_time - prev_time) if prev_time != 0 else 0
    prev_time = curr_time

    # Jalankan deteksi YOLO
    results = model(frame)

    # Ambil jumlah objek terdeteksi
    num_objects = len(results[0].boxes)

    # Tampilkan hasil deteksi langsung di frame
    annotated_frame = results[0].plot()  # plot() menampilkan bounding box

    cv.putText(
        annotated_frame,
        f"FPS: {int(fps)}",
        (10, 30),
        cv.FONT_HERSHEY_SIMPLEX,
        1,
        (0, 255, 0),
        2
    )
    cv.putText(
        annotated_frame,
        f"Objek Terdeteksi: {num_objects}",
        (10, 70),
        cv.FONT_HERSHEY_SIMPLEX,
        1,
        (0, 255, 0),
        2
    )

    # Tampilkan frame di window
    cv.imshow("YOLO Webcam Detection", annotated_frame)

    # Tekan 'q' untuk keluar
    if cv.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv.destroyAllWindows()