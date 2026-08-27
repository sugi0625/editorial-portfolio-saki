import { Experience } from "@/components/experience";
import { BusinessNoteOpening } from "@/components/business-note-opening";
import { BusinessNoteWireframe } from "@/components/business-note-wireframe";
import { BusinessNoteFoundation } from "@/components/business-note-foundation";
import { HowIWork } from "@/components/how-i-work";
import { Hero } from "@/components/hero";
import { PointOfView } from "@/components/point-of-view";
import { SeoDaeguOpening } from "@/components/seo-daegu-opening";
import { SeoDaeguFinal } from "@/components/seo-daegu-final";
import { SeoDaeguRefine } from "@/components/seo-daegu-refine";
import { SeoDaeguStructure } from "@/components/seo-daegu-structure";
import { BusinessNotePractice } from "@/components/business-note-practice";
import { WellOpening } from "@/components/well-opening";
import { WellVisualDirection } from "@/components/well-visual-direction";
import { WellDigitalExperience } from "@/components/well-digital-experience";
import { RealRecipe } from "@/components/real-recipe";
import { Closing } from "@/components/closing";
import { SmileFarm } from "@/components/smile-farm";

export default function Home() {
  return (
    <main id="main-content">
      <Hero />
      <PointOfView />
      <Experience />
      <HowIWork />
      <SeoDaeguOpening />
      <SeoDaeguStructure />
      <SeoDaeguRefine />
      <SeoDaeguFinal />
      <BusinessNoteOpening />
      <BusinessNoteWireframe />
      <BusinessNoteFoundation />
      <BusinessNotePractice />
      <WellOpening />
      <WellVisualDirection />
      <WellDigitalExperience />
      <RealRecipe />
      <SmileFarm />
      <Closing />
    </main>
  );
}
