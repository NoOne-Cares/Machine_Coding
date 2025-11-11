import React, { useRef, useState, useEffect } from "react";

const ScreenCapture: React.FC = () => {
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isSelecting, setIsSelecting] = useState(false);
    const [startPos, setStartPos] = useState<{ x: number; y: number } | null>(
        null
    );
    const [endPos, setEndPos] = useState<{ x: number; y: number } | null>(null);
    const [cropped, setCropped] = useState<string | null>(null);
    const [imageDims, setImageDims] = useState<{ w: number; h: number } | null>(
        null
    );

    const captureScreenOnce = async () => {
        try {
            const stream = await navigator.mediaDevices.getDisplayMedia({
                video: true,
            });
            const track = stream.getVideoTracks()[0];
            const imageCapture = new (window as any).ImageCapture(track);
            const bitmap = await imageCapture.grabFrame();

            const canvas = document.createElement("canvas");
            canvas.width = bitmap.width;
            canvas.height = bitmap.height;
            const ctx = canvas.getContext("2d");
            if (!ctx) return;
            ctx.drawImage(bitmap, 0, 0);
            setImageSrc(canvas.toDataURL("image/png"));
            setImageDims({ w: bitmap.width, h: bitmap.height });

            track.stop();
        } catch (err) {
            console.error("Screen capture failed:", err);
        }
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        if (!canvasRef.current) return;
        const rect = canvasRef.current.getBoundingClientRect();
        setStartPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        setEndPos(null);
        setIsSelecting(true);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isSelecting || !canvasRef.current) return;
        const rect = canvasRef.current.getBoundingClientRect();
        setEndPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleMouseUp = () => {
        setIsSelecting(false);
        cropSelectedArea();
    };

    const cropSelectedArea = () => {
        if (
            !imageSrc ||
            !startPos ||
            !endPos ||
            !canvasRef.current ||
            !imageDims
        )
            return;
        const img = new Image();
        img.src = imageSrc;
        img.onload = () => {
            const canvas = document.createElement("canvas");
            const x1 = Math.min(startPos.x, endPos.x);
            const y1 = Math.min(startPos.y, endPos.y);
            const width = Math.abs(endPos.x - startPos.x);
            const height = Math.abs(endPos.y - startPos.y);

            // Scale the selection to match real resolution
            const scaleX = img.width / canvasRef.current!.width;
            const scaleY = img.height / canvasRef.current!.height;

            canvas.width = width * scaleX;
            canvas.height = height * scaleY;
            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            ctx.drawImage(
                img,
                x1 * scaleX,
                y1 * scaleY,
                width * scaleX,
                height * scaleY,
                0,
                0,
                width * scaleX,
                height * scaleY
            );
            setCropped(canvas.toDataURL("image/png"));
        };
    };

    useEffect(() => {
        if (!canvasRef.current || !imageSrc) return;
        const ctx = canvasRef.current.getContext("2d");
        if (!ctx) return;

        const img = new Image();
        img.src = imageSrc;
        img.onload = () => {
            ctx.clearRect(
                0,
                0,
                canvasRef.current!.width,
                canvasRef.current!.height
            );
            ctx.drawImage(
                img,
                0,
                0,
                canvasRef.current!.width,
                canvasRef.current!.height
            );

            if (startPos && endPos) {
                const x = Math.min(startPos.x, endPos.x);
                const y = Math.min(startPos.y, endPos.y);
                const width = Math.abs(endPos.x - startPos.x);
                const height = Math.abs(endPos.y - startPos.y);

                ctx.strokeStyle = "red";
                ctx.lineWidth = 2;
                ctx.strokeRect(x, y, width, height);
                ctx.fillStyle = "rgba(255, 0, 0, 0.2)";
                ctx.fillRect(x, y, width, height);
            }
        };
    }, [startPos, endPos, imageSrc]);

    return (
        <div className="flex flex-col items-center gap-4">
            <button
                onClick={captureScreenOnce}
                className="rounded bg-blue-600 px-4 py-2 text-white"
            >
                📸 Capture Screen
            </button>

            {imageSrc && imageDims && (
                <canvas
                    ref={canvasRef}
                    width={imageDims.w}
                    height={imageDims.h}
                    style={{
                        width: "80vw", // display smaller, but keep full resolution
                        maxWidth: "1200px",
                        border: "1px solid #ccc",
                        cursor: "crosshair",
                    }}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                />
            )}

            {cropped && (
                <div className="mt-4 text-center">
                    <h3 className="mb-2 font-semibold">Selected Area:</h3>
                    <img
                        src={cropped}
                        alt="Cropped Screenshot"
                        style={{
                            border: "1px solid #ccc",
                            borderRadius: 4,
                            maxWidth: "100%",
                        }}
                    />
                </div>
            )}
        </div>
    );
};

export default ScreenCapture;
