import React, { useEffect, useState } from 'react';
import type { ReactElement } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useAppSelector } from '../../stores/hooks';
import LayoutGuest from '../../layouts/Guest';
import WebSiteHeader from '../../components/WebPageComponents/Header';
import WebSiteFooter from '../../components/WebPageComponents/Footer';
import {
  HeroDesigns,
  FeaturesDesigns,
  FaqDesigns,
} from '../../components/WebPageComponents/designs';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

import FeaturesSection from '../../components/WebPageComponents/FeaturesComponent';

import FaqSection from '../../components/WebPageComponents/FaqComponent';

export default function WebSite() {
  const cardsStyle = useAppSelector((state) => state.style.cardsStyle);
  const bgColor = useAppSelector((state) => state.style.bgLayoutColor);
  const projectName = '256Sarfa';

  useEffect(() => {
    const darkElement = document.querySelector('body .dark');
    if (darkElement) {
      darkElement.classList.remove('dark');
    }
  }, []);
  const pages = [
    {
      href: '/home',
      label: 'home',
    },

    {
      href: '/about',
      label: 'about',
    },

    {
      href: '/services',
      label: 'services',
    },

    {
      href: '/contact',
      label: 'contact',
    },

    {
      href: '/faq',
      label: 'FAQ',
    },
  ];

  const features_points = [
    {
      name: 'Effortless CV Management',
      description:
        'Easily upload, update, and manage your CVs. Keep your profile current and accessible to potential employers at all times.',
      icon: 'mdiFileDocumentEdit',
    },
    {
      name: 'Instant Job Alerts',
      description:
        'Receive real-time notifications about job opportunities that match your skills and preferences. Stay ahead in your job search.',
      icon: 'mdiBellAlert',
    },
    {
      name: 'Seamless Employer Interaction',
      description:
        'Communicate directly with employers through our platform. Simplify the hiring process with integrated messaging and offer management.',
      icon: 'mdiHandshakeOutline',
    },
  ];

  const faqs = [
    {
      question: 'What services does ${projectName} offer?',
      answer:
        '${projectName} offers a range of services including CV management, job alerts, and direct communication with employers to streamline the job search and hiring process.',
    },
    {
      question: 'How do I receive job alerts?',
      answer:
        'Once you set up your profile, you can opt-in to receive real-time job alerts that match your skills and preferences, ensuring you never miss an opportunity.',
    },
    {
      question: 'Can I communicate with employers directly?',
      answer:
        'Yes, ${projectName} allows you to send and receive messages directly with employers, making the hiring process more efficient and transparent.',
    },
    {
      question: 'Is there a fee for using ${projectName}?',
      answer:
        'While basic features are free, premium services may require a subscription. These offer additional benefits like enhanced visibility and advanced analytics.',
    },
    {
      question: 'How secure is my data on ${projectName}?',
      answer:
        'We prioritize your privacy and use advanced encryption to protect your data. Your information is safe and only accessible to authorized users.',
    },
    {
      question: 'Can I update my CV after uploading?',
      answer:
        'Absolutely! You can update your CV anytime to ensure it reflects your most current skills and experiences, keeping you competitive in the job market.',
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`Services Offered by ${projectName}`}</title>
        <meta
          name='description'
          content={`Explore the range of services provided by ${projectName} to enhance your job search and hiring experience. Discover how we connect talent with opportunity.`}
        />
      </Head>
      <WebSiteHeader projectName={'256Sarfa'} pages={pages} />
      <main className={`flex-grow  ${bgColor}    rounded-none  `}>
        <HeroSection
          projectName={'256Sarfa'}
          image={['Diverse team collaborating effectively']}
          mainText={`Unlock Opportunities with ${projectName} Services`}
          subTitle={`Discover the comprehensive services offered by ${projectName} to streamline your job search and hiring process. From CV uploads to direct communication, we provide the tools you need to succeed.`}
          design={HeroDesigns.IMAGE_LEFT || ''}
          buttonText={`Explore Our Services`}
        />

        <FeaturesSection
          projectName={'256Sarfa'}
          image={['Icons representing various services']}
          withBg={1}
          features={features_points}
          mainText={`Comprehensive Services of ${projectName}`}
          subTitle={`Explore the diverse range of services offered by ${projectName} to enhance your job search and recruitment process.`}
          design={FeaturesDesigns.CARDS_GRID_WITH_ICONS_DIVERSITY || ''}
        />

        <FaqSection
          projectName={'256Sarfa'}
          design={FaqDesigns.SPLIT_LIST || ''}
          faqs={faqs}
          mainText={`Common Questions about ${projectName} Services `}
        />
      </main>
      <WebSiteFooter projectName={'256Sarfa'} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
