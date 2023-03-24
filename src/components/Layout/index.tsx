import clsx, { ClassValue } from "clsx";
import { PropsWithChildren } from "react";

type GenericProps = PropsWithChildren<{
  className?: ClassValue;
  as?: "div" | "section" | "article" | "main";
}>;

function createFancyTag(displayName: string, defaultClassValue: ClassValue) {
  const _comp = ({ children, className, as: AsTag = "div" }: GenericProps) => (
    <AsTag className={clsx(defaultClassValue, className)}>{children}</AsTag>
  );
  _comp.displayName = displayName;
  return _comp;
}

export const HStack = createFancyTag(
  "HStack",
  "flex flex-row gap-2 items-center"
);
export const VStack = createFancyTag(
  "VStack",
  "flex flex-col gap-2 items-center"
);
