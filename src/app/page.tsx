import Editor from "@/components/editor";
import Viewer from "@/components/viewer";

export default function Home() {
  return (
    <div>
      <div>
        {/* <div className="h-20 bg-gray-500 w-full">Header</div> */}
        <div className="md:flex sticky top-0">
          <Editor/>
          <Viewer/>
        </div>
      </div>
      {/* <div className="bg-gray-500 h-28">footer</div> */}
    </div>
  );
}
