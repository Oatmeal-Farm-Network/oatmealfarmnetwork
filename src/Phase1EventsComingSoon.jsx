import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from './Header';
import Footer from './Footer';
import PageMeta from './PageMeta';
import Breadcrumbs from './Breadcrumbs';

const CREAM = '#f7f2e8';
const OLIVE = '#3d6b34';
const INK = '#2c2c2c';

export default function Phase1EventsComingSoon() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen font-sans flex flex-col" style={{ backgroundColor: CREAM }}>
      <PageMeta
        title={t('phase1.events.meta_title', 'Events | Livestock of America')}
        description={t('phase1.events.meta_description', 'Livestock of America events — coming soon.')}
        canonical="https://livestockofamerica.com/events"
      />
      <Header />
      <div className="flex-1">
        <div className="container-fluid mx-auto px-4" style={{ maxWidth: '900px' }}>
          <Breadcrumbs items={[{ label: t('phase1.nav.home', 'Home'), to: '/' }, { label: t('phase1.nav.events', 'Events') }]} />
          <div className="py-16 md:py-24 text-center">
            <p className="text-sm uppercase tracking-widest mb-3" style={{ color: OLIVE }}>
              {t('phase1.events.eyebrow', 'Livestock of America')}
            </p>
            <h1
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{ fontFamily: "'Lora', 'Times New Roman', serif", color: INK }}
            >
              {t('phase1.events.title', 'Events')}
            </h1>
            <p className="text-lg mb-8 max-w-lg mx-auto" style={{ color: '#6b6b6b' }}>
              {t('phase1.events.body', 'We are preparing livestock industry events, shows, and gatherings. Check back soon.')}
            </p>
            <Link
              to="/"
              className="inline-block px-6 py-3 rounded text-white no-underline"
              style={{ backgroundColor: OLIVE }}
            >
              {t('phase1.events.back_home', 'Back to Home')}
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
