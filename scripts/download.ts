import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

type DesignItem = {
  alt: string;
  src: string;
};

const DESIGN_JSON_PATH = path.resolve(process.cwd(), "scripts/color.json");
const OUTPUT_DIR = path.resolve(process.cwd(), "scripts/images");

function sanitizeFileName(input: string): string {
  return input
    .trim()
    .replace(/[\\/:*?"<>|]/g, "_")
    .replace(/\s+/g, "_")
    .replace(/_+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function extensionFromUrl(imageUrl: string): string {
  try {
    const { pathname } = new URL(imageUrl);
    const ext = path.extname(pathname);
    return ext || ".jpg";
  } catch {
    return ".jpg";
  }
}

async function loadDesignItems(filePath: string): Promise<DesignItem[]> {
  const raw = await readFile(filePath, "utf-8");
  const parsed = JSON.parse(raw) as unknown;

  if (!Array.isArray(parsed)) {
    throw new Error("color.json の形式が不正です。配列である必要があります。");
  }

  return parsed.filter((item): item is DesignItem => {
    return (
      typeof item === "object" &&
      item !== null &&
      typeof (item as { alt?: unknown }).alt === "string" &&
      typeof (item as { src?: unknown }).src === "string"
    );
  });
}

async function downloadImage(url: string): Promise<Buffer> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status} ${response.statusText}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

async function run(): Promise<void> {
  await mkdir(OUTPUT_DIR, { recursive: true });

  const items = await loadDesignItems(DESIGN_JSON_PATH);
  if (items.length === 0) {
    console.log("ダウンロード対象の src URL がありません。");
    return;
  }

  let successCount = 0;

  for (const [index, item] of items.entries()) {
    const baseName = sanitizeFileName(item.alt) || `image_${index + 1}`;
    const ext = extensionFromUrl(item.src);
    const fileName = `${String(index + 1).padStart(2, "0")}_${baseName}${ext}`;
    const filePath = path.join(OUTPUT_DIR, fileName);

    try {
      const data = await downloadImage(item.src);
      await writeFile(filePath, data);
      successCount += 1;
      console.log(`保存: ${fileName}`);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.error(`失敗: ${item.src} (${message})`);
    }
  }

  console.log(`完了: ${successCount}/${items.length} 件を保存しました。`);
}

run().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`エラー: ${message}`);
  process.exitCode = 1;
});