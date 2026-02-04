import { Hero } from "@/components/Hero/hero";
import { CollectSteps } from "@/components/Infographics/collect-steps";
import { CtaLocations } from "@/components/Infographics/cta-locations";
import { TextileLifecycle2 } from "@/components/Infographics/TextileLifecycle2";
import { TextileWasteVisualization } from "@/components/Infographics/TextileWasteVisualization";
import { WhatCollect } from "@/components/Infographics/what-collect";

export default function Home() {
  return (
    <div className="">
      <Hero />
      <TextileWasteVisualization />
      <TextileLifecycle2 />
      <CollectSteps />
      <WhatCollect />
      <CtaLocations />
    </div>
  );
}
