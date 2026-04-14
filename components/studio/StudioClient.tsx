"use client";

import { NextStudio } from "next-sanity/studio";
import config from "@/sanity.config";

export default function StudioClient() {
  return (
    <div className="fixed inset-0 z-9999">
      <NextStudio config={config} />
    </div>
  );
}
