"use client"

import { Fullscreen } from "lucide-react";
import dynamic from "next/dynamic";
const PdfViewer = dynamic(() => import("@/components/pdfviewer"), {
    ssr: false, // Disable SSR
});
import { Button } from "../ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "../ui/drawer";
import { useAtomValue } from "jotai";
import { detailsAtom, selectedTemplateAtom } from "@/lib/atoms";
import templates from "@/lib/templates";

export default function Viewer() {
    const selectedTemplate = useAtomValue(selectedTemplateAtom)
    const details = useAtomValue(detailsAtom)
    return (
        <>
            <Drawer>
                <DrawerTrigger asChild>
                    <Button className="md:hidden fixed bottom-5 right-5">View <Fullscreen className="w-14 h-14" /></Button>
                </DrawerTrigger>
                <DrawerContent className="className='w-full h-[80vh] flex flex-col gap-2'">
                    <PdfViewer key={details.links.length + details.skills.length + details.experience.length + details.education.length + selectedTemplate} Resume={templates[selectedTemplate].component} />
                </DrawerContent>
            </Drawer>
            <div className="sticky top-0 hidden md:flex md:w-1/2 h-screen border">
                <PdfViewer key={details.links.length + details.skills.length + details.experience.length + details.education.length + selectedTemplate} Resume={templates[selectedTemplate].component} />
            </div>
        </>
    )
}