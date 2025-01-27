import Editor from "@/components/editor";
import TakeTour from "@/components/taketour";
import Viewer from "@/components/viewer";

export default function Home() {
  return (
    <div>
      <div>
        <div className="h-20 border-b border-black w-full flex justify-between px-5 sm:px-10 items-center">
          <h1 className="text-2xl font-semibold">Resume Builder</h1>
          <TakeTour />
        </div>
        <div className="md:flex sticky top-0">
          <Editor />
          <Viewer />
        </div>
      </div>
      <div className="border-t border-black h-20 flex justify-center items-center">Made By Sanjay Bora:- <a href="https://sanjaybora.in" className="text-blue-700 hover:underline">{" "}https://sanjaybora.in</a></div>
    </div>
  );
}
