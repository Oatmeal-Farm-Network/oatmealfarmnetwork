import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from './Header';
import Footer from './Footer';
import PageMeta from './PageMeta';
import Breadcrumbs from './Breadcrumbs';
import { isPhase1PublicMode } from './phase1PublicAccess';

const About = () => {
  const { t } = useTranslation();
  const phase1 = isPhase1PublicMode();

  return (
    <div className="min-h-screen font-sans">
      <PageMeta
        title={phase1
          ? t('phase1.about.meta_title', 'About Livestock of America')
          : 'About Oatmeal Farm Network | Our Mission & Vision'}
        description={phase1
          ? t('phase1.about.meta_description', 'Livestock of America connects ranchers, buyers, and livestock professionals through a dedicated marketplace, knowledgebase, and industry directory.')
          : 'Learn how Oatmeal Farm Network connects farmers, ranchers, buyers, and food businesses using Oatmeal AI, comprehensive livestock and plant knowledgebases, and a direct-to-market platform.'}
        keywords={phase1
          ? 'about livestock of america, livestock marketplace, ranch directory, livestock knowledgebase'
          : 'about oatmeal farm network, farming technology, agricultural AI, farm marketplace, farm to table platform'}
        canonical={phase1 ? 'https://livestockofamerica.com/about' : 'https://oatmealfarmnetwork.com/about'}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          name: phase1 ? 'About Livestock of America' : 'About Oatmeal Farm Network',
          url: phase1 ? 'https://livestockofamerica.com/about' : 'https://oatmealfarmnetwork.com/about',
          description: phase1
            ? t('phase1.about.meta_description')
            : 'Learn how Oatmeal Farm Network connects farmers, ranchers, buyers, and food businesses using AI-powered tools.',
        }}
      />
      <Header />

      <div className="container-fluid mx-auto px-4" style={{ maxWidth: '1300px', minHeight: '67px', backgroundColor: 'white' }}>
        <Breadcrumbs items={[{ label: phase1 ? t('phase1.nav.home', 'Home') : 'Home', to: '/' }, { label: phase1 ? t('phase1.about.title') : 'About' }]} />
        <div className="py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-6">
              {phase1 ? t('phase1.about.title') : t('about.title')}
            </h1>

            <div className="flex justify-center mb-4">
              <img
                src="/images/Oatmeal-Farm-Network-logo-horizontal-white.webp"
                style={{ width: '280px', height: 'auto' }}
                alt="Livestock of America Logo"
              />
            </div>

            <p className="text-xl italic mb-8">
              {phase1 ? t('phase1.about.tagline') : t('about.tagline')}
            </p>
          </div>

          <div className="block overflow-hidden">
            <img
              src="/images/AboutUs.webp"
              className="md:float-right m-4 rounded-lg shadow-md max-w-sm w-full"
              alt={phase1 ? 'Livestock of America' : 'About Us'}
            />

            <p className="mb-4">{phase1 ? t('phase1.about.body1') : t('about.body1')}</p>
            <p className="mb-4">{phase1 ? t('phase1.about.body2') : t('about.body2')}</p>

            {phase1 ? (
              <>
                <h2 className="text-2xl font-bold mt-8 mb-4">{t('phase1.about.h2_focus')}</h2>
                <p className="mb-4">{t('phase1.about.focus_body')}</p>

                <h2 className="text-2xl font-bold mt-8 mb-4">{t('phase1.about.h2_ecosystem')}</h2>
                <p className="mb-4">{t('phase1.about.ecosystem_body')}</p>

                <ul className="list-disc ml-8 space-y-2 mb-8">
                  <li>{t('phase1.about.li_marketplace')}</li>
                  <li>{t('phase1.about.li_knowledgebase')}</li>
                  <li>{t('phase1.about.li_directory')}</li>
                </ul>

                <h2 className="text-2xl font-bold mt-8 mb-4">{t('phase1.about.h2_ready')}</h2>
                <p className="mb-4">{t('phase1.about.ready_body1')}</p>
                <p className="font-bold mb-4">{t('phase1.about.ready_body2')}</p>

                <ul className="space-y-2">
                  <li><Link to="/animals" className="text-blue-600 hover:underline">{t('phase1.about.link_marketplace')}</Link></li>
                  <li><Link to="/knowledgebase" className="text-blue-600 hover:underline">{t('phase1.about.link_knowledgebase')}</Link></li>
                  <li><Link to="/directory" className="text-blue-600 hover:underline">{t('phase1.about.link_directory')}</Link></li>
                </ul>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold mt-8 mb-4">{t('about.h2_ai')}</h2>
                <p className="mb-4">{t('about.ai_body')}</p>

                <h2 className="text-2xl font-bold mt-8 mb-4">{t('about.h2_ecosystem')}</h2>
                <p className="mb-4">{t('about.ecosystem_body')}</p>

                <ul className="list-disc ml-8 space-y-2 mb-8">
                  <li>{t('about.li_livestock')}</li>
                  <li>{t('about.li_directory')}</li>
                  <li>{t('about.li_farm2table')}</li>
                </ul>

                <h2 className="text-2xl font-bold mt-8 mb-4">{t('about.h2_ready')}</h2>
                <p className="mb-4">{t('about.ready_body1')}</p>
                <p className="font-bold mb-4">{t('about.ready_body2')}</p>

                <ul className="space-y-2">
                  <li><Link to="/LivestockDB/" className="text-blue-600 hover:underline">{t('about.link_marketplace')}</Link></li>
                  <li><Link to="/Livestockmarketplace/" className="text-blue-600 hover:underline">{t('about.link_livestock_db')}</Link></li>
                  <li><Link to="/directory" className="text-blue-600 hover:underline">{t('about.link_directory')}</Link></li>
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
