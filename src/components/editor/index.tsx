"use client"
import TemplateGrid from "./templates";
import EditorInputs from "./inputs";

export default function Editor(){
    return (
        <div className="md:w-1/2 p-5">
            <EditorInputs/>
            <TemplateGrid/>
          </div>
    )
}