"use client";

import _ from "lodash";
import { send } from "process";
import { PropsWithChildren, useEffect, useState } from "react";

export default function RefreshPreview({
  id,
}: PropsWithChildren<{ id: number }>) {
  const [lastModified, setLastModified] = useState(0);
  const TIMEOUT = 2500;

  const sendPing = _.throttle(
    () => {
      const _start = Date.now();
      fetch(`/_preview/refresh?id=${id}`)
        .then((res) => res.json())
        .then(
          ({ lastModified: serverLastModified }: { lastModified: number }) => {
            const _elapsed = Date.now() - _start;
            console.log(
              `Has modified: ${serverLastModified > lastModified} / Ping in ${
                _elapsed / 1000
              }s`
            );
            setLastModified(serverLastModified);
          }
        );
    },
    TIMEOUT,
    { trailing: true }
  );

  useEffect(() => {
    const timer = setInterval(sendPing, TIMEOUT);
    return () => clearInterval(timer);
  }, [id]);

  return null;
}
