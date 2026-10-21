"use client";

import { SetStepNav } from "@payloadcms/ui";
import React from "react";

/**
 * Payload draws the page title in the top band from a step nav the page
 * pushes into a context. The list and the form do it themselves; a custom
 * dashboard view has to do it, or the band is left with no title at all.
 */
export function SetPageTitle({ title }: { title: string }) {
  return <SetStepNav nav={[{ label: title }]} />;
}

export default SetPageTitle;
