import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { detailsAtom } from "@/lib/atoms";
import { cn } from "@/lib/utils";
import { useAtom } from "jotai";
import { ChevronDown, ChevronRight, ChevronUp, Cog, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

export default function SkillsInput() {
    const [details,setDetails] = useAtom(detailsAtom)
        const [skillsOpen, setSkillsOpen] = useState(false)
    return (
        <div>
            <div onClick={() => setSkillsOpen(!skillsOpen)} className="sticky top-8 font-semibold h-7 z-9 border-b mb-2 bg-white flex gap-2"><Cog/>Skills and Expertise<ChevronRight className={cn('duration-300', skillsOpen ? 'rotate-90' : 'rotate-0')} /></div>
            <div className={cn("duration-300 transition-all overflow-clip space-y-3", skillsOpen ? 'max-h-full' : 'max-h-0')}>
                {
                    details.skills.map((skill, index) => (
                        <div key={index} className="flex flex-wrap gap-2 border p-2 rounded-lg shadow">
                            <Input value={skill} onChange={(e) => {
                                setDetails(prev => {
                                    {
                                        const skills = [...prev.skills];
                                        skills[index] = e.target.value;
                                        return { ...prev, skills };
                                    }
                                });
                            }} placeholder="Enter skill" />
                            <div className="flex gap-2">
                                <Button variant='destructive' size='icon' className="flex-none" onClick={() => {
                                    setDetails(prev => {
                                        const skills = [...prev.skills];
                                        skills.splice(index, 1);
                                        return { ...prev, skills };
                                    });
                                }}><Trash2 /></Button>
                                <Button size='icon' onClick={() => {
                                    setDetails((prev) => {
                                        const skills = [...prev.skills];
                                        if (index > 0) {
                                            // Swap the current item with the one above it
                                            [skills[index], skills[index - 1]] = [skills[index - 1], skills[index]];
                                        }
                                        return { ...prev, skills };
                                    });
                                }}><ChevronUp /></Button>
                                <Button size='icon' onClick={() => {
                                    setDetails((prev) => {
                                        const skills = [...prev.skills];
                                        if (index < skills.length - 1) {
                                            // Move item down
                                            [skills[index], skills[index + 1]] = [skills[index + 1], skills[index]];
                                        }
                                        return { ...prev, skills };
                                    });
                                }}><ChevronDown /></Button>
                            </div>
                        </div>
                    ))
                }
                <Button onClick={() => {
                    setDetails(prev => {
                        const skills = [...prev.skills];
                        skills.push("");
                        return { ...prev, skills };
                    });
                }}><Plus />Add Skill</Button>
            </div>
        </div>
    )
}