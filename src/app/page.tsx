import Feed from "@/components/Feed";
import News from "@/components/News";
import { Sidebar } from "lucide-react";


export default function Home() {
  return (
    <>
      <div className="pt-20">
        <div className="max-w-6xl mx-auto flex justify-between gap-8">
          {/* Sidebar  */}
          <Sidebar />
          {/* Feed  */}
          <Feed />
          {/* News  */}
          <News />
        </div>
      </div>
    </>
  );
}
