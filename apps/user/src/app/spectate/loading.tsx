import { Loader } from "lucide-react";

export default function SpectatePageLoading() {
  return (
    <div className="flex-1 w-full flex flex-col items-center justify-center h-screen">
      <div className="animate-spin flex items-center justify-center">
        <Loader />
      </div>
    </div>
  );
}
