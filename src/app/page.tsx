"use client";

import { colorOptions } from "@/color-options";
import Design1 from "@/components/designs/Design1";
import Design10 from "@/components/designs/Design10";
import Design11 from "@/components/designs/Design11";
import Design12 from "@/components/designs/Design12";
import Design13 from "@/components/designs/Design13";
import Design14 from "@/components/designs/Design14";
import Design15 from "@/components/designs/Design15";
import Design16 from "@/components/designs/Design16";
import Design17 from "@/components/designs/Design17";
import Design18 from "@/components/designs/Design18";
import Design19 from "@/components/designs/Design19";
import Design2 from "@/components/designs/Design2";
import Design20 from "@/components/designs/Design20";
import Design3 from "@/components/designs/Design3";
import Design4 from "@/components/designs/Design4";
import Design5 from "@/components/designs/Design5";
import Design6 from "@/components/designs/Design6";
import Design7 from "@/components/designs/Design7";
import Design8 from "@/components/designs/Design8";
import Design9 from "@/components/designs/Design9";
import { designOptions } from "@/components/designs/design-options";
import Image from "next/image";
import { useState } from "react";

const DESIGN_COMPONENTS = {
  1: Design1,
  2: Design2,
  3: Design3,
  4: Design4,
  5: Design5,
  6: Design6,
  7: Design7,
  8: Design8,
  9: Design9,
  10: Design10,
  11: Design11,
  12: Design12,
  13: Design13,
  14: Design14,
  15: Design15,
  16: Design16,
  17: Design17,
  18: Design18,
  19: Design19,
  20: Design20,
} as const;

export default function Home() {
  const [selectedDesignId, setSelectedDesignId] = useState<number>(
    designOptions[0]?.id ?? 1,
  );
  const [selectedColorIndex, setSelectedColorIndex] = useState<number>(0);

  const selectedDesign =
    designOptions.find((item) => item.id === selectedDesignId) ??
    designOptions[0];
  const selectedColor = colorOptions[selectedColorIndex] ?? colorOptions[0];
  const SelectedDesignComponent =
    DESIGN_COMPONENTS[selectedDesign.id as keyof typeof DESIGN_COMPONENTS] ??
    Design1;

  return (
    <main className="simulator">
      <h1>表札デザインシミュレーター</h1>

      <section className="controls" aria-label="選択パネル">
        <label htmlFor="design">デザイン</label>
        <select
          id="design"
          value={selectedDesign.id}
          onChange={(event) => setSelectedDesignId(Number(event.target.value))}
        >
          {designOptions.map((design) => (
            <option key={design.id} value={design.id}>
              {design.name}
            </option>
          ))}
        </select>

        <label htmlFor="color">カラー</label>
        <select
          id="color"
          value={selectedColorIndex}
          onChange={(event) =>
            setSelectedColorIndex(Number(event.target.value))
          }
        >
          {colorOptions.map((color, index) => (
            <option key={color.alt} value={index}>
              {index + 1}. {color.alt}
            </option>
          ))}
        </select>
      </section>

      <section className="preview" aria-label="プレビュー">
        <div
          className="plate"
          style={{ backgroundColor: selectedColor.backgroundColor }}
        >
          {selectedColor.src ? (
            <Image
              src={selectedColor.src}
              alt={selectedColor.alt}
              fill
              className="plate-bg"
              sizes="(max-width: 768px) 92vw, 640px"
            />
          ) : null}
          <SelectedDesignComponent
            className="plate-design"
            fill={selectedColor.textColor}
          />
        </div>
      </section>
    </main>
  );
}
