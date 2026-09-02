import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from './Header';
import Footer from './Footer';
import PageMeta from './PageMeta';
import Breadcrumbs from './Breadcrumbs';
import BackButton from './BackButton';

export default function AccountLayout({
  children,
  pageTitle,
  breadcrumbs,
  allowAnonymous = false,
  fillHeight = false,
}) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    if (allowAnonymous) return;
    const token = localStorage.getItem('access_token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate, allowAnonymous]);

  const hasCrumbs = breadcrumbs && breadcrumbs.length > 0;

  return (
    <div
      className={
        fillHeight
          ? 'account-layout-fill flex-1 min-h-0 bg-gray-50 font-sans flex flex-col overflow-hidden'
          : 'min-h-screen bg-gray-50 font-sans flex flex-col'
      }
      style={fillHeight ? { height: 'calc(100dvh - 72px)', maxHeight: 'calc(100dvh - 72px)' } : undefined}
    >
      <PageMeta
        title={pageTitle ? `${pageTitle} | Oatmeal Farm Network` : t('account_layout.meta_title')}
        description={t('account_layout.meta_desc')}
        noIndex
      />
      <Header />

      <div
        className={
          fillHeight
            ? 'grow p-6 flex flex-col min-h-0 overflow-hidden'
            : 'grow p-6'
        }
      >
        <div className="shrink-0">
          {hasCrumbs ? (
            <Breadcrumbs items={breadcrumbs} />
          ) : (
            <div className="mb-3" data-ofn-breadcrumbs>
              <BackButton showLabel label="Back" />
            </div>
          )}
        </div>
        {fillHeight ? (
          <div className="flex-1 min-h-0 flex flex-col">{children}</div>
        ) : (
          children
        )}
      </div>

      <Footer />
      {fillHeight && (
        <style>{`
          .account-layout-fill footer { margin-top: 0 !important; }
        `}</style>
      )}
    </div>
  );
}
