"use client";

import React, { useState } from "react";

type EventSnapshot = {
  type: string;
  timeStamp: number;
  targetHTML: string;
  currentTargetHTML: string;
  altKey: boolean;
  ctrlKey: boolean;
  shiftKey: boolean;
  metaKey: boolean;
  clientX: number;
  clientY: number;
};

export default function EventObject() {
  const [event, setEvent] = useState<EventSnapshot | null>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setEvent({
      type: e.type,
      timeStamp: e.timeStamp,
      targetHTML: (e.target as HTMLElement).outerHTML,
      currentTargetHTML: (e.currentTarget as HTMLElement).outerHTML,
      altKey: e.altKey,
      ctrlKey: e.ctrlKey,
      shiftKey: e.shiftKey,
      metaKey: e.metaKey,
      clientX: e.clientX,
      clientY: e.clientY,
    });
  };

  return (
    <div>
      <h2>Event Object</h2>
      <button
        onClick={handleClick}
        className="btn btn-primary"
        id="wd-display-event-obj-click"
      >
        Display Event Object
      </button>
      {event && <pre>{JSON.stringify(event, null, 2)}</pre>}
      <hr />
    </div>
  );
}
