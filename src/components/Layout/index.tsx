import clsx, { ClassValue } from "clsx";
import { PropsWithChildren } from "react";

type LayoutTagName = "div" | "section" | "article" | "main" | "header";

type GenericProps = PropsWithChildren<{
  className?: ClassValue;
  as?: LayoutTagName;
}>;

function createFancyTag(
  displayName: string,
  defaultClassValue: ClassValue,
  defaultAsTag: LayoutTagName = "div"
) {
  const _comp = ({
    children,
    className,
    as: AsTag = defaultAsTag,
  }: GenericProps) => (
    <AsTag className={clsx(defaultClassValue, className)}>{children}</AsTag>
  );
  _comp.displayName = displayName;
  return _comp;
}

export const Header = createFancyTag(
  "Header",
  "flex flex-col items-center text-center py-8 desc:w-full desc:max-w-content",
  "header"
);

export const HStack = createFancyTag(
  "HStack",
  "flex flex-row gap-2 items-center"
);
export const VStack = createFancyTag(
  "VStack",
  "flex flex-col gap-2 items-center"
);
