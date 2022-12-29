"use client";

export default function Prose({ content }: { content: string }) {
  return (
    <div className="prose" dangerouslySetInnerHTML={{ __html: content }} />
  );
}
