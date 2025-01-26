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
import ColorPicker from "@/components/ui/colorpicker";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
const DEFAULT_COLORS = ["#bc6800", "#2ca500", "#004cbf", "#8200b6", "#b4005d"];

export default function Home() {
  const [details, setDetails] = useAtom(detailsAtom)

  const [primaryColours, setPrimaryColours] = useState<string[]>([
    ...DEFAULT_COLORS,
  ]);

  return (
    <div className="md:flex">
      <div className="md:w-1/2 space-y-2 p-5">
        <div className="flex gap-[0.5rem] md:gap-[0.5vw] my-[0.5rem] md:mt-[0.5vw]">

          <ColorPicker
            value={details.primaryColor}
            onChange={(color: string) => setDetails(prev => ({ ...prev, primaryColor: color }))}
            handleAdd={(color: string) => {
              setPrimaryColours((prev: string[]) => [...prev, color]);
            }}
          />
          {primaryColours.map((color, index) => (
            <TooltipProvider key={index}>
              <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    onClick={() => setDetails(prev => ({ ...prev, primaryColor: color }))}
                    className={`rounded-full items-center justify-center aspect-square h-fit w-fit p-[0.2rem] md:p-[0.2vw] bg-white/10`}
                  >
                    <div
                      style={{ backgroundColor: color }}
                      className={`h-[2rem] md:h-[2vw] aspect-square rounded-full flex items-center justify-center `}
                    >
                      {details.primaryColor?.includes(color) && (
                        <Check className="text-white h-4" />
                      )}
                    </div>
                  </button>
                </TooltipTrigger>
                <TooltipContent className="uppercase">{color}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
        <div>
          <div className="font-semibold">Name</div>
          <Input value={details.name} onChange={(e) => setDetails(prev => ({ ...prev, name: e.target.value }))} placeholder="Enter your name" />
        </div>
        <div>
          <div className="font-semibold">Profession</div>
          <Input value={details.profession} onChange={(e) => setDetails(prev => ({ ...prev, profession: e.target.value }))} placeholder="Enter your profession" />
        </div>
        <div>
          <div className="font-semibold">Location</div>
          <Input value={details.location} onChange={(e) => setDetails(prev => ({ ...prev, location: e.target.value }))} placeholder="Enter your location" />
        </div>
        <div>
          <div className="font-semibold">Email</div>
          <Input value={details.email} onChange={(e) => setDetails(prev => ({ ...prev, email: e.target.value }))} placeholder="Enter your email" />
        </div>
        <div>

          <div className="font-semibold">Links</div>
          <div className="space-y-2">
          {
            details.links.map((link, index) => (
              <div key={index} className="flex gap-2">
                <Input value={link.name} onChange={(e) => {
                  setDetails(prev => {
                    const links = [...prev.links];
                    links[index].name = e.target.value;
                    return { ...prev, links };
                  });
                }} placeholder="Enter link name" />
                <Input value={link.url} onChange={(e) => {
                  setDetails(prev => {
                    const links = [...prev.links];
                    links[index].url = e.target.value;
                    return { ...prev, links };
                  });
                }} placeholder="Enter link url" />
                <Button onClick={() => {
                  setDetails(prev => {
                    const links = [...prev.links];
                    links.splice(index, 1);
                    return { ...prev, links };
                  });
                }}>Remove</Button>
              </div>
            ))
          }
          <Button onClick={() => {
            setDetails(prev => {
              const links = [...prev.links];
              links.push({ name: "", url: "" });
              return { ...prev, links };
            });
          }}>Add Link</Button>
          </div>
        </div>
        <Textarea value={details.summary} onChange={(e) => setDetails(prev => ({ ...prev, summary: e.target.value }))} placeholder="Enter your summary" className="h-24" />

        {/* <div className="flex gap-2 flex-wrap justify-around my-5">

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

        </div> */}

      </div>

      {/* <Drawer>
        <DrawerTrigger asChild>
          <Button variant="outline" className="md:hidden">View</Button>
        </DrawerTrigger>
        <DrawerContent className="className='w-full h-[80vh] flex flex-col gap-2 overflow-auto'">
          <PdfViewer Resume={TheClassicResume} main />
        </DrawerContent>
      </Drawer> */}
      <div className="sticky top-0 hidden md:flex md:w-1/2 max-w-2xl mx-auto h-screen overflow-auto border flex-col xl:items-center">
        <PdfViewer Resume={TheClassicResume} main />
      </div>
      {/* <iframe src={instance.url!} className="w-full md:w-1/2 h-screen"/> */}
    </div>
  );
}
