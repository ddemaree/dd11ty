"use client";

import useTextBalancer from "@lib/hooks/useTextBalancer";

export default function BalanceText({ selector = ".balance-text" }) {
  useTextBalancer(selector);
  return null;
}
