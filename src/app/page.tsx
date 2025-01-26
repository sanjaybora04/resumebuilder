'use client'
import TheClassicResume from "@/components/templates/theClassic";
import SidebarResume from "@/components/templates/sidebar";
import TimelineResume from "@/components/templates/timeline";
import MinimalResume from "@/components/templates/minimal";

import { Input } from "@/components/ui/input";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAtom } from "jotai";
// import PdfViewer from "@/components/pdfviewer";
import dynamic from "next/dynamic";
const PdfViewer = dynamic(() => import("@/components/pdfviewer"), {
  ssr: false, // Disable SSR
});
import { detailsAtom } from "@/lib/atoms";

export default function Home() {
  const [details, setDetails] = useAtom(detailsAtom)

  return (
    <div className="md:flex">
      <div className="md:w-1/2 space-y-2 p-5">
        <Input value={details.name} onChange={(e) => setDetails(prev => ({ ...prev, name: e.target.value }))} placeholder="Enter your name" />
        <Input value={details.profession} onChange={(e) => setDetails(prev => ({ ...prev, profession: e.target.value }))} placeholder="Enter your profession" />
        <Input value={details.location} onChange={(e) => setDetails(prev => ({ ...prev, location: e.target.value }))} placeholder="Enter your location" />
        <Input value={details.email} onChange={(e) => setDetails(prev => ({ ...prev, email: e.target.value }))} placeholder="Enter your email" />
        <Textarea value={details.summary} onChange={(e) => setDetails(prev => ({ ...prev, summary: e.target.value }))} placeholder="Enter your summary" className="h-24" />

        <div className="flex gap-2 flex-wrap">

          <div className="w-80 aspect-[3/4] shadow-lg overflow-auto">
            <PdfViewer Resume={TheClassicResume} width={300} />
          </div>
          <div className="w-80 aspect-[3/4] shadow-lg overflow-auto">
            <PdfViewer Resume={SidebarResume} width={300} />
          </div>
          <div className="w-80 aspect-[3/4] shadow-lg overflow-auto">
            <PdfViewer Resume={TimelineResume} width={300} />
          </div>
          <div className="w-80 aspect-[3/4] shadow-lg overflow-auto">
            <PdfViewer Resume={MinimalResume} width={300} />
          </div>

        </div>

      </div>

      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="outline" className="md:hidden">View</Button>
        </DrawerTrigger>
        <DrawerContent className="className='w-full h-[80vh] flex flex-col gap-2 overflow-auto'">
          <PdfViewer Resume={TheClassicResume} />
        </DrawerContent>
      </Drawer>
      <div className="sticky top-0 hidden md:flex md:w-1/2 max-w-2xl mx-auto h-screen overflow-auto border flex-col gap-2 xl:items-center">
        <PdfViewer Resume={TheClassicResume} />
      </div>
      {/* <iframe src={instance.url!} className="w-full md:w-1/2 h-screen"/> */}
    </div>
  );
}
