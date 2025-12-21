import HeroSection from '../components/HeroSection';
import SkillsSection from '../components/SkillsSection';
import ProjectsSection from '../components/ProjectsSection';
import Footer from '../components/Footer';
import MouseEffect from '../components/MouseEffect';

export default function Index() {
  return (
    <>
      <MouseEffect />
      <main className="relative z-10 flex flex-col min-h-screen bg-background text-foreground font-grotesk">
        <HeroSection />
        <SkillsSection />
        <ProjectsSection />
      </main>
      <Footer />
    </>
  );
}
