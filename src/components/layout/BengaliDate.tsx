"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => undefined;
const getServerSnapshot = () => "আজকের তারিখ";

function getSnapshot() {
  return new Intl.DateTimeFormat("bn-BD", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  }).format(new Date());
}

export default function BengaliDate() {
  const date = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return <time>{date}</time>;
}
