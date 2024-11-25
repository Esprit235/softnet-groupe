import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Contact from './components/Contact';
import Modal from './components/Modal';
import Footer from './components/Footer';
import Tech from './components/subsidiaries/Tech';
import Agro from './components/subsidiaries/Agro';
import Mobility from './components/subsidiaries/Mobility';
import Energies from './components/subsidiaries/Energies';
import Projects from './components/Projects';
import Investors from './components/Investors';
import LoadingScreen from './components/LoadingScreen';

function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [activeSubsidiary, setActiveSubsidiary] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const subsidiaries = {
    tech: <Tech onContactClick={() => setIsContactOpen(true)} />,
    agro: <Agro onContactClick={() => setIsContactOpen(true)} />,
    mobility: <Mobility onContactClick={() => setIsContactOpen(true)} />,
    energies: <Energies onContactClick={() => setIsContactOpen(true)} />
  };

  const handleSubsidiaryClick = (id: string) => {
    setActiveSubsidiary(id === activeSubsidiary ? null : id);
    setActiveSection(null);
    if (id !== activeSubsidiary) {
      setTimeout(() => {
        document.getElementById('subsidiary-content')?.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }, 100);
    }
  };

  const handleSectionClick = (section: string) => {
    setActiveSection(section);
    setActiveSubsidiary(null);
    setTimeout(() => {
      document.getElementById(section)?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }, 100);
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        onContactClick={() => setIsContactOpen(true)}
        onAboutClick={() => setIsAboutOpen(true)}
        onSubsidiaryClick={handleSubsidiaryClick}
        onSectionClick={handleSectionClick}
        activeSubsidiary={activeSubsidiary}
        activeSection={activeSection}
      />
      
      <main className="pt-16">
        <Hero 
          onContactClick={() => setIsContactOpen(true)}
          onAboutClick={() => setIsAboutOpen(true)}
          onSubsidiaryClick={handleSubsidiaryClick}
        />
        
        {activeSubsidiary && (
          <div id="subsidiary-content" className="scroll-mt-16">
            {subsidiaries[activeSubsidiary as keyof typeof subsidiaries]}
          </div>
        )}

        {activeSection === 'projects' && <Projects />}
        {activeSection === 'investors' && <Investors />}

        <Modal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)}>
          <Contact />
        </Modal>

        <Modal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)}>
          <About onContactClick={() => {
            setIsAboutOpen(false);
            setIsContactOpen(true);
          }} />
        </Modal>
      </main>

      <Footer 
        onContactClick={() => setIsContactOpen(true)}
        onAboutClick={() => setIsAboutOpen(true)}
        onSubsidiaryClick={handleSubsidiaryClick}
        onSectionClick={handleSectionClick}
      />
    </div>
  );
}

export default App;