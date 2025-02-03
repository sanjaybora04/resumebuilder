import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { detailsAtom } from "@/lib/atoms";
import { cn } from "@/lib/utils";
import { useAtom } from "jotai";
import { ChevronDown, ChevronRight, ChevronUp, GraduationCap, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

export default function Education() {
    const [details,setDetails] = useAtom(detailsAtom)
    const [eduOpen,setEduOpen] = useState(false)
    return (
        <div>
            <div onClick={() => setEduOpen(!eduOpen)} className="sticky top-8 font-semibold h-7 z-9 border-b mb-2 bg-white flex gap-2"><GraduationCap/>Education<ChevronRight className={cn('duration-300', eduOpen ? 'rotate-90' : 'rotate-0')} /></div>
            <div className={cn("duration-300 transition-all overflow-clip space-y-3", eduOpen ? 'max-h-full' : 'max-h-0')}>
                {
                    details.education.map((edu, index) => (
                        <div key={index} className=" space-y-2 p-2 border rounded-lg shadow">
                            <Input value={edu.title} onChange={(e) => {
                                setDetails(prev => {
                                    const education = [...prev.education];
                                    education[index].title = e.target.value;
                                    return { ...prev, education };
                                });
                            }} placeholder="Enter your title" />
                            <Input value={edu.school} onChange={(e) => {
                                setDetails(prev => {
                                    const education = [...prev.education];
                                    education[index].school = e.target.value;
                                    return { ...prev, education };
                                });
                            }} placeholder="Enter company name" />
                            <Input value={edu.startDate} onChange={(e) => {
                                setDetails(prev => {
                                    const education = [...prev.education];
                                    education[index].startDate = e.target.value;
                                    return { ...prev, education };
                                });
                            }} placeholder="Enter start date" />
                            <Input value={edu.endDate} onChange={(e) => {
                                setDetails(prev => {
                                    const education = [...prev.education];
                                    education[index].endDate = e.target.value;
                                    return { ...prev, education };
                                });
                            }} placeholder="Enter end date" />
                            <Textarea value={edu.description} onChange={(e) => {
                                setDetails(prev => {
                                    const education = [...prev.education];
                                    education[index].description = e.target.value;
                                    return { ...prev, education }
                                })
                            }} placeholder="Enter description"
                                className="h-24"
                            />
                            <div className="flex gap-2">
                                <Button variant='destructive' size='icon' onClick={() => {
                                    setDetails(prev => {
                                        const links = [...prev.links];
                                        links.splice(index, 1);
                                        return { ...prev, links };
                                    });
                                }}><Trash2 /></Button>
                                <Button size='icon' onClick={() => {
                                    setDetails((prev) => {
                                        const education = [...prev.education];
                                        if (index > 0) {
                                            // Swap the current item with the one above it
                                            [education[index], education[index - 1]] = [education[index - 1], education[index]];
                                        }
                                        return { ...prev, education };
                                    });
                                }}><ChevronUp /></Button>
                                <Button size='icon' onClick={() => {
                                    setDetails((prev) => {
                                        const education = [...prev.education];
                                        if (index < education.length - 1) {
                                            // Move item down
                                            [education[index], education[index + 1]] = [education[index + 1], education[index]];
                                        }
                                        return { ...prev, education };
                                    });
                                }}><ChevronDown /></Button>
                            </div>
                        </div>
                    ))
                }
                <Button onClick={() => {
                    setDetails(prev => {
                        const education = [...prev.education];
                        education.push({ title: '', school: '', startDate: '', endDate: '', description: '' });
                        return { ...prev, education };
                    });
                }}><Plus />Add Education</Button>
            </div>
        </div>
    )
}