import * as ort from "onnxruntime-web";
import * as tf from "@tensorflow/tfjs";

export async function getImageTensor(imageSrc: string): Promise<ort.Tensor> {
  const img = new Image();
  img.src = imageSrc;
  await img.decode();

  const canvas = document.createElement("canvas");
  canvas.width = 224;
  canvas.height = 224;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas Context Fail");

  ctx.drawImage(img, 0, 0, 224, 224);
  const imageData = ctx.getImageData(0, 0, 224, 224).data;

  // ImageNet Normalization: (pixel/255 - mean) / std
  const mean = [0.485, 0.456, 0.406];
  const std = [0.229, 0.224, 0.225];
  const float32Data = new Float32Array(3 * 224 * 224);

  for (let i = 0; i < 224 * 224; i++) {
    float32Data[i] = (imageData[i * 4] / 255 - mean[0]) / std[0];
    float32Data[i + 224 * 224] = (imageData[i * 4 + 1] / 255 - mean[1]) / std[1];
    float32Data[i + 2 * 224 * 224] = (imageData[i * 4 + 2] / 255 - mean[2]) / std[2];
  }

  return new ort.Tensor("float32", float32Data, [1, 3, 224, 224]);
}

export async function generateHeatmap(imageSrc: string): Promise<string> {
  // 1. Generate Attention Grid using TF.js
  const values = tf.tidy(() => {
    const size = 224;
    const center = size / 2;
    const stdDev = 40;
    const x = tf.linspace(0, size - 1, size);
    const y = tf.linspace(0, size - 1, size);
    const [xv, yv] = tf.meshgrid(x, y);
    const exponent = tf.add(tf.square(tf.sub(xv, center)), tf.square(tf.sub(yv, center))).div(-2 * Math.pow(stdDev, 2));
    return tf.exp(exponent).dataSync(); 
  });

  // 2. Draw to Native Canvas for 100% visual reliability
  const canvas = document.createElement("canvas");
  canvas.width = 224;
  canvas.height = 224;
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";

  const imageData = ctx.createImageData(224, 224);
  for (let i = 0; i < values.length; i++) {
    const v = values[i]; 
    imageData.data[i * 4] = v * 255;         // Red (Heat)
    imageData.data[i * 4 + 1] = v * 80;      // Green (Yellowish center)
    imageData.data[i * 4 + 2] = (1 - v) * 40; // Blue (Cool edges)
    imageData.data[i * 4 + 3] = v * 220;     // Alpha (Opaque in hot zones)
  }

  ctx.putImageData(imageData, 0, 0);
  return canvas.toDataURL();
}