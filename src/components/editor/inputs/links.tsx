import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { detailsAtom } from "@/lib/atoms";
import { cn } from "@/lib/utils";
import { useAtom } from "jotai";
import { ChevronDown, ChevronRight, ChevronUp, Link, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

export default function LinksInput() {
    const [details, setDetails] = useAtom(detailsAtom)
    const [linksOpen, setLinksOpen] = useState(false)
    return (
        <div>
            <div onClick={() => setLinksOpen(!linksOpen)} className="sticky top-8 font-semibold h-7 z-9 border-b mb-2 bg-white flex gap-2"><Link/>Links<ChevronRight className={cn('duration-300', linksOpen ? 'rotate-90' : 'rotate-0')} /></div>
            <div className={cn("duration-300 transition-all overflow-clip space-y-3", linksOpen ? 'max-h-full' : 'max-h-0')}>
                {
                    details.links.map((link, index) => (
                        <div key={index} className="flex flex-wrap gap-2 border p-2 rounded-lg shadow">
                            <Input value={link.name} onChange={(e) => {
                                setDetails(prev => {
                                    const links = [...prev.links];
                                    links[index].name = e.target.value;
                                    return { ...prev, links };
                                });
                            }} className="max-w-80" placeholder="Enter link name" />
                            <Input value={link.url} onChange={(e) => {
                                setDetails(prev => {
                                    const links = [...prev.links];
                                    links[index].url = e.target.value;
                                    return { ...prev, links };
                                });
                            }} className="max-w-80" placeholder="Enter link url" />
                            <div className="flex gap-2">
                                <Button variant='destructive' size='icon' className="flex-none" onClick={() => {
                                    setDetails(prev => {
                                        const links = [...prev.links];
                                        links.splice(index, 1);
                                        return { ...prev, links };
                                    });
                                }}><Trash2 /></Button>
                                <Button size='icon' onClick={() => {
                                    setDetails((prev) => {
                                        const links = [...prev.links];
                                        if (index > 0) {
                                            // Swap the current item with the one above it
                                            [links[index], links[index - 1]] = [links[index - 1], links[index]];
                                        }
                                        return { ...prev, links };
                                    });
                                }}><ChevronUp /></Button>
                                <Button size='icon' onClick={() => {
                                    setDetails((prev) => {
                                        const links = [...prev.links];
                                        if (index < links.length - 1) {
                                            // Move item down
                                            [links[index], links[index + 1]] = [links[index + 1], links[index]];
                                        }
                                        return { ...prev, links };
                                    });
                                }}><ChevronDown /></Button>
                            </div>
                        </div>
                    ))
                }
                <Button onClick={() => {
                    setDetails(prev => {
                        const links = [...prev.links];
                        links.push({ name: "", url: "" });
                        return { ...prev, links };
                    });
                }}><Plus />Add Link</Button>
            </div>
        </div>
    )
}