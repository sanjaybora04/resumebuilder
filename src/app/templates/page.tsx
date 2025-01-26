'use client'

import PdfViewer from "@/components/pdfviewer";
import MinimalGridResume from "@/components/templates/minimal";
import SidebarResume from "@/components/templates/sidebar";
import TheClassic from "@/components/templates/theClassic";
import CenteredTimelineResume from "@/components/templates/timeline";
import { detailsAtom } from "@/lib/atoms";
import { useAtomValue } from "jotai";

export default function Page(){
    const details = useAtomValue(detailsAtom)
    return (
        <div className="flex gap-2 flex-wrap justify-around my-5">

          <div className="w-80 aspect-[3/4] shadow-lg overflow-auto">
            <PdfViewer key={JSON.stringify(details)} Resume={TheClassic} width={300} />
          </div>
          <div className="w-80 aspect-[3/4] shadow-lg overflow-auto">
            <PdfViewer key={JSON.stringify(details)} Resume={SidebarResume} width={300} />
          </div>
          <div className="w-80 aspect-[3/4] shadow-lg overflow-auto">
            <PdfViewer key={JSON.stringify(details)} Resume={CenteredTimelineResume} width={300} />
          </div>
          <div className="w-80 aspect-[3/4] shadow-lg overflow-auto">
            <PdfViewer key={JSON.stringify(details)} Resume={MinimalGridResume} width={300} />
          </div>

        </div>
    )
}