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
  FaqDesigns,
} from '../../components/WebPageComponents/designs';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

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

  const faqs = [
    {
      question: 'What is ${projectName} and how does it work?',
      answer:
        '${projectName} is a platform that connects job seekers with business owners. Users can upload CVs, receive job alerts, and communicate directly with employers.',
    },
    {
      question: 'How do I sign up for ${projectName}?',
      answer:
        "To sign up, visit our homepage and click on 'Sign Up'. Fill in your details and follow the instructions to create your account.",
    },
    {
      question: 'Can I use ${projectName} for free?',
      answer:
        'Yes, basic features are available for free. However, premium features that offer additional benefits may require a subscription.',
    },
    {
      question: 'How do I update my profile information?',
      answer:
        "Log in to your account, navigate to 'Profile Settings', and make the necessary changes. Ensure you save your updates before exiting.",
    },
    {
      question: 'What should I do if I encounter a problem?',
      answer:
        "If you face any issues, please contact our support team through the 'Contact Us' page. We aim to resolve all queries promptly.",
    },
    {
      question: 'Is my data secure on ${projectName}?',
      answer:
        'We prioritize your privacy and use advanced encryption to protect your data. Your information is safe and only accessible to authorized users.',
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`Frequently Asked Questions - ${projectName}`}</title>
        <meta
          name='description'
          content={`Find answers to common questions about ${projectName}. Learn more about our features, services, and how we can assist you in your job search and hiring process.`}
        />
      </Head>
      <WebSiteHeader projectName={'256Sarfa'} pages={pages} />
      <main className={`flex-grow  ${bgColor}    rounded-none  `}>
        <HeroSection
          projectName={'256Sarfa'}
          image={['Person reading FAQ on laptop']}
          mainText={`Your Questions Answered at ${projectName}`}
          subTitle={`Explore our comprehensive FAQ section to find answers to your most pressing questions about ${projectName}. We're here to help you navigate your job search and hiring journey.`}
          design={HeroDesigns.IMAGE_BG || ''}
          buttonText={`Browse FAQs`}
        />

        <FaqSection
          projectName={'256Sarfa'}
          design={FaqDesigns.TWO_COLUMN || ''}
          faqs={faqs}
          mainText={`Explore ${projectName} FAQs `}
        />
      </main>
      <WebSiteFooter projectName={'256Sarfa'} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
