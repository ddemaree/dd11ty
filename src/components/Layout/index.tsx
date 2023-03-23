import clsx, { ClassValue } from "clsx";
import { PropsWithChildren, DOMAttributes } from "react";

type GenericProps = PropsWithChildren<{
  className?: ClassValue;
  as?: "div" | "section" | "article" | "main";
}>;

function createFancyTag(defaultClassValue: ClassValue) {
  return ({ children, className, as: AsTag = "div" }: GenericProps) => (
    <AsTag className={clsx(defaultClassValue, className)}>{children}</AsTag>
  );
}

export const HStack = createFancyTag("flex flex-row gap-2 items-center");
export const VStack = createFancyTag("flex flex-col gap-2 items-center");
