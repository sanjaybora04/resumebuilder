import ColorPicker from "@/components/ui/colorpicker";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { detailsAtom } from "@/lib/atoms";
import { useAtom } from "jotai";
import { Check } from "lucide-react";
import { useState } from "react";

const DEFAULT_COLORS = ["#004cbf", "#bc6800", "#00956e", "#93009e", "#b4005d"];

export default function PrimaryColorInput(){
    const [details,setDetails] = useAtom(detailsAtom)
    const [primaryColours, setPrimaryColours] = useState<string[]>([
        ...DEFAULT_COLORS,
    ]);
    return(
        <div>
                <div className="font-semibold">Primary Color</div>
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
            </div>
    )
}