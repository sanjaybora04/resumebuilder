import Editor from "@/components/editor";
import TakeTour from "@/components/taketour";
import { Button } from "@/components/ui/button";
import Viewer from "@/components/viewer";
import { FileCode2, Github, Linkedin, Twitter } from "lucide-react";

export default function Home() {
  return (
    <div>
      <div>
        <div className="h-20 border-b border-black w-full flex justify-between px-5 sm:px-10 items-center">
          <h1 className="text-xl sm:text-2xl font-semibold flex gap-2 items-center"><FileCode2 className="w-10 h-10"/>Resume Builder</h1>
          <div className="flex gap-2">
          <Button asChild><a href="https://sanjaybora.in/contact" target="_blank">Contact Me</a></Button>
          <TakeTour />
          </div>
        </div>
        <div className="md:flex sticky top-0">
          <Editor />
          <Viewer />
        </div>
      </div>
      <div className="border-t border-black h-20 flex flex-col gap-2 justify-center items-center">
        <div>
        Made By Sanjay Bora:- <a href="https://sanjaybora.in" className="text-blue-700 hover:underline">{" "}https://sanjaybora.in</a>
        </div>
        <div className="flex gap-2 justify-center">
          <a href="https://linkedin.com/in/sanjaybora04" target="_blank"><Linkedin className="bg-black text-white p-1 rounded-lg cursor-pointer hover:scale-110 duration-300 w-8 h-8"/></a>
          <a href="https://github.com/sanjaybora04" target="_blank"><Github className="bg-black text-white p-1 rounded-lg cursor-pointer hover:scale-110 duration-300 w-8 h-8"/></a>
          <a href="https://x.com/sanjaybora04" target="_blank"><Twitter className="bg-black text-white p-1 rounded-lg cursor-pointer hover:scale-110 duration-300 w-8 h-8"/></a>

        </div>
        </div>
    </div>
  );
}
