"use client";

import useTextBalancer from "@lib/hooks/useTextBalancer";

type BalanceTextProps = {
  selector?: string | string[];
  fontDependencies?: string[];
};

export default function BalanceText({
  selector = ".balance-text",
  fontDependencies = [],
}: BalanceTextProps) {
  useTextBalancer(selector, fontDependencies);
  return null;
}
