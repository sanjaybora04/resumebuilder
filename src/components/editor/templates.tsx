"use client"

import templates from "@/lib/templates"
import { useAtom } from "jotai"
import { selectedTemplateAtom } from "@/lib/atoms"

export default function TemplateGrid() {
    const [selectedTemplate,setSelectedTemplate] = useAtom(selectedTemplateAtom)
    return (
        <>
            <div className="font-semibold text-xl text-center mt-5">Select Template</div>
            <div className="templates flex gap-2 flex-wrap justify-around my-5">
                {templates.map((t, index) =>
                <div key={index} className="relative">
                    <div className="p-2 text-center bg-black text-white">{t.name}</div>
                    <div className="w-80 aspect-[3/4] shadow-lg">
                        <img src={t.image} className="object-cover"/>
                    </div>
                    <button onClick={() => { setSelectedTemplate(index), console.log(index) }} className="absolute top-0 left-0 w-full h-full z-5 hover:bg-black hover:bg-opacity-50 text-transparent hover:text-white text-2xl flex items-center justify-center duration-300">
                        {selectedTemplate==index?"Selected":"Select"}
                        </button>
                </div>
                )}
            </div>
        </>
    )
}