"use client";

/* 

*/
export default function PreviewBar({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="bg-yellow-300 text-center font-semibold text-[1.25rem] py-3">
        Preview Mode
      </div>
      {children}
    </>
  );
}
