import { editorData } from "@/data/editor";
import { shared } from "@/data/shared";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Work } from "@/components/sections/Work";
import { Experience } from "@/components/sections/Experience";
import { Contact } from "@/components/sections/Contact";
import { Cursor } from "@/components/ui/Cursor";
import { BackToTop } from "@/components/ui/BackToTop";
import { ModeTransitionOverlay } from "@/components/layout/ModeTransitionOverlay";

export default function EditorPage() {
  return (
    <>
      <ModeTransitionOverlay />
      <Cursor />
      <Navbar data={editorData} shared={shared} />
      <main>
        <Hero data={editorData} shared={shared} />
        <About data={editorData} />
        <Skills data={editorData} />
        <Work data={editorData} />
        <Experience data={editorData} />
        <Contact data={editorData} shared={shared} />
      </main>
      <Footer shared={shared} />
      <BackToTop />
    </>
  );
}
