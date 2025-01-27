'use client'

import { ChevronDown, ChevronRight, ChevronUp, Edit, Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAtom } from "jotai";
import { detailsAtom } from "@/lib/atoms";
import PrimaryColorInput from "./primary-color";
import { useState } from "react";
import { cn } from "@/lib/utils";
import LinksInput from "./links";
import SkillsInput from "./skills";
import Experience from "./experience";
import Education from "./education";

export default function EditorInputs() {
    const [details, setDetails] = useAtom(detailsAtom)
    const [editOpen, setEditOpen] = useState(false)

    function reset(){
        const confirm = window.confirm("Are you sure you want to reset?\n All data will be lost")
        if(confirm){
            localStorage.clear()
            window.location.reload()
        }
    }
    return (
        <>
            <div className="h-8 border-b sticky top-0 flex justify-between gap-2 z-10 bg-white mb-5">
                <button onClick={() => setEditOpen(!editOpen)} className="editbutton flex gap-2 text-lg font-semibold hover:underline"><Edit />Edit<ChevronRight className={cn('duration-300', editOpen ? 'rotate-90' : 'rotate-0')} /></button>
                <button onClick={()=>reset()} className="hover:underline">Reset</button>
            </div>
            <div className={cn("duration-300 transition-all overflow-clip space-y-5", editOpen ? 'max-h-full' : 'max-h-0')}>
                <PrimaryColorInput />
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
                    <div className="font-semibold">Summary</div>
                    <Textarea value={details.summary} onChange={(e) => setDetails(prev => ({ ...prev, summary: e.target.value }))} placeholder="Enter your summary" className="h-24" />
                </div>
                <LinksInput />
                <SkillsInput />
                <Experience />
                <Education />
            </div>
        </>
    )
}