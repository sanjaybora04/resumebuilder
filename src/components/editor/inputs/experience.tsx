import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { detailsAtom } from "@/lib/atoms";
import { cn } from "@/lib/utils";
import { useAtom } from "jotai";
import { BriefcaseBusiness, ChevronDown, ChevronRight, ChevronUp, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

export default function Experience() {
    const [details, setDetails] = useAtom(detailsAtom)
    const [expOpen, setExpOpen] = useState(false)
    return (
        <div>
            <div onClick={() => setExpOpen(!expOpen)} className="sticky top-8 font-semibold h-7 z-9 border-b mb-2 bg-white flex gap-2"><BriefcaseBusiness />Work Experience<ChevronRight className={cn('duration-300', expOpen ? 'rotate-90' : 'rotate-0')} /></div>
            <div className={cn("duration-300 transition-all overflow-clip space-y-3", expOpen ? 'max-h-full' : 'max-h-0')}>
                {
                    details.experience.map((exp, index) => (
                        <div key={index} className=" space-y-2 p-2 border rounded-lg shadow">
                            <Input value={exp.title} onChange={(e) => {
                                setDetails(prev => {
                                    const exp = [...prev.experience];
                                    exp[index].title = e.target.value;
                                    return { ...prev, experience: exp };
                                });
                            }} placeholder="Enter your title" />
                            <Input value={exp.company} onChange={(e) => {
                                setDetails(prev => {
                                    const experience = [...prev.experience];
                                    experience[index].company = e.target.value;
                                    return { ...prev, experience };
                                });
                            }} placeholder="Enter company name" />
                            <Input value={exp.startDate} onChange={(e) => {
                                setDetails(prev => {
                                    const experience = [...prev.experience];
                                    experience[index].startDate = e.target.value;
                                    return { ...prev, experience };
                                });
                            }} placeholder="Enter start date" />
                            <Input value={exp.endDate} onChange={(e) => {
                                setDetails(prev => {
                                    const experience = [...prev.experience];
                                    experience[index].endDate = e.target.value;
                                    return { ...prev, experience };
                                });
                            }} placeholder="Enter end date" />
                            <Textarea value={exp.description} onChange={(e) => {
                                setDetails(prev => {
                                    const experience = [...prev.experience];
                                    experience[index].description = e.target.value;
                                    return { ...prev, experience }
                                })
                            }} placeholder="Enter your experience"
                                className="h-24"
                            />
                            <div className="flex gap-2">
                                <Button variant='destructive' size='icon' onClick={() => {
                                    setDetails(prev => {
                                        const experience = [...prev.experience];
                                        experience.splice(index, 1);
                                        return { ...prev, experience };
                                    });
                                }}><Trash2 /></Button>
                                <Button size='icon' onClick={() => {
                                    setDetails((prev) => {
                                        const experience = [...prev.experience];
                                        if (index > 0) {
                                            // Swap the current item with the one above it
                                            [experience[index], experience[index - 1]] = [experience[index - 1], experience[index]];
                                        }
                                        return { ...prev, experience };
                                    });
                                }}><ChevronUp /></Button>
                                <Button size='icon' onClick={() => {
                                    setDetails((prev) => {
                                        const experience = [...prev.experience];
                                        if (index < experience.length - 1) {
                                            // Move item down
                                            [experience[index], experience[index + 1]] = [experience[index + 1], experience[index]];
                                        }
                                        return { ...prev, experience };
                                    });
                                }}><ChevronDown /></Button>
                            </div>
                        </div>
                    ))
                }
                <Button onClick={() => {
                    setDetails(prev => {
                        const experience = [...prev.experience];
                        experience.push({ title: '', company: '', startDate: '', endDate: '', description: '' });
                        return { ...prev, experience };
                    });
                }}><Plus />Add Experience</Button>
            </div>
        </div>
    )
}