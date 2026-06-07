"use client";

import React, { useEffect } from "react";
import ReactDOM from "react-dom";

export function AxeDevCheck(): null {
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") {
      return;
    }

    void import("@axe-core/react").then((axe) => {
      void axe.default(React, ReactDOM, 1000);
    });
  }, []);

  return null;
}
