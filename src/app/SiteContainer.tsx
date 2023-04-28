import { Suspense } from "react";
import FathomAnalytics from "@components/FathomAnalytics";

export default function SiteContainer({
  children,
}: React.PropsWithChildren<{}>) {
  return (
    <div className="flex flex-col items-center">
      <div className="grid grid-cols-1 grid-rows-[auto_1fr_auto] min-h-screen max-w-6xl w-full">
        {children}
      </div>
      <Suspense>
        <FathomAnalytics />
      </Suspense>
    </div>
  );
}
