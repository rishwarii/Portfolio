#!/usr/bin/env node

/* eslint-disable no-console */
import path from "node:path";
import process from "node:process";
import sharp from "sharp";

const ORNAMENT_DIR = path.join(process.cwd(), "public", "images", "ornaments");

const JOBS = [
  {
    input: "vine-corner-floral-frame.webp",
    output: "vine-corner-floral-frame-alpha.png",
    trim: true
  },
  {
    input: "vine-sprig-pattern.jpg",
    output: "vine-sprig-pattern-alpha.png",
    trim: true
  },
  {
    input: "vine-sprig-flourish.png",
    output: "vine-sprig-flourish-alpha.png",
    trim: true
  }
];

function luminance(r, g, b) {
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function chroma(r, g, b) {
  return Math.max(r, g, b) - Math.min(r, g, b);
}

function colorKey(r, g, b) {
  return `${Math.round(r / 12) * 12},${Math.round(g / 12) * 12},${Math.round(b / 12) * 12}`;
}

function sampleBackgroundColors(data, width, height) {
  const counts = new Map();
  const patch = Math.min(24, Math.floor(Math.min(width, height) / 4));
  const origins = [
    [0, 0],
    [width - patch, 0],
    [0, height - patch],
    [width - patch, height - patch]
  ];

  for (const [ox, oy] of origins) {
    for (let y = oy; y < oy + patch; y += 1) {
      for (let x = ox; x < ox + patch; x += 1) {
        const i = (y * width + x) * 4;
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        if (chroma(r, g, b) > 28) {
          continue;
        }
        const key = colorKey(r, g, b);
        counts.set(key, (counts.get(key) ?? 0) + 1);
      }
    }
  }

  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([key]) => key.split(",").map(Number));
}

function nearColor(r, g, b, target, tolerance) {
  const dr = r - target[0];
  const dg = g - target[1];
  const db = b - target[2];
  return Math.sqrt(dr * dr + dg * dg + db * db) <= tolerance;
}

function knockout(data, width, height) {
  const backgrounds = sampleBackgroundColors(data, width, height);
  const out = Buffer.from(data);

  for (let i = 0; i < out.length; i += 4) {
    const r = out[i];
    const g = out[i + 1];
    const b = out[i + 2];
    const lum = luminance(r, g, b);
    const gray = chroma(r, g, b) < 26;
    const matchesBg = backgrounds.some((target) => nearColor(r, g, b, target, 28));

    let alpha;
    if (lum >= 238 || (gray && matchesBg && lum >= 168)) {
      alpha = 0;
    } else if (lum <= 70) {
      alpha = 255;
    } else {
      alpha = Math.round(Math.min(255, Math.max(0, ((210 - lum) / 90) * 255)));
      if (gray && matchesBg && lum >= 155) {
        alpha = Math.round(alpha * 0.15);
      }
    }

    out[i] = 0;
    out[i + 1] = 0;
    out[i + 2] = 0;
    out[i + 3] = alpha;
  }

  return out;
}

async function processJob(job) {
  const inputPath = path.join(ORNAMENT_DIR, job.input);
  const outputPath = path.join(ORNAMENT_DIR, job.output);
  let image = sharp(inputPath).ensureAlpha();
  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
  const knocked = knockout(data, info.width, info.height);

  let result = sharp(knocked, {
    raw: {
      width: info.width,
      height: info.height,
      channels: 4
    }
  });

  if (job.trim) {
    result = result.trim({
      background: { r: 0, g: 0, b: 0, alpha: 0 },
      threshold: 8
    });
  }

  await result.png({ compressionLevel: 9 }).toFile(outputPath);
  const meta = await sharp(outputPath).metadata();
  console.log(
    `${job.output} ${meta.width}x${meta.height} (${meta.size ?? "?"} bytes)`
  );
}

async function main() {
  for (const job of JOBS) {
    await processJob(job);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
