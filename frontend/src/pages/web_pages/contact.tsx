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
  ContactFormDesigns,
  FaqDesigns,
} from '../../components/WebPageComponents/designs';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

import ContactFormSection from '../../components/WebPageComponents/ContactFormComponent';

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
      question: 'How do I create an account?',
      answer:
        "To create an account, click on the 'Sign Up' button on the homepage. Fill in your details and follow the prompts to complete registration.",
    },
    {
      question: 'What should I do if I forget my password?',
      answer:
        "If you forget your password, click on 'Forgot Password' on the login page. Follow the instructions to reset your password via email.",
    },
    {
      question: 'How can I update my profile information?',
      answer:
        "Log in to your account, navigate to 'Profile Settings', and make the necessary changes. Remember to save your updates before exiting.",
    },
    {
      question: 'Is there a mobile app for ${projectName}?',
      answer:
        'Currently, ${projectName} is accessible via web browsers on mobile devices. A dedicated mobile app is in development and will be available soon.',
    },
    {
      question: 'How do I contact customer support?',
      answer:
        "You can reach our support team through the contact form on the 'Contact Us' page. We aim to respond to all inquiries within 24 hours.",
    },
    {
      question: 'Can I delete my account if needed?',
      answer:
        'Yes, you can delete your account by contacting our support team. They will guide you through the process and ensure your data is removed securely.',
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`Contact Us - ${projectName}`}</title>
        <meta
          name='description'
          content={`Get in touch with ${projectName} for any inquiries or support. Our team is here to assist you with your job search and hiring needs.`}
        />
      </Head>
      <WebSiteHeader projectName={'256Sarfa'} pages={pages} />
      <main className={`flex-grow  ${bgColor}    rounded-none  `}>
        <HeroSection
          projectName={'256Sarfa'}
          image={['Customer support team assisting clients']}
          mainText={`Connect with ${projectName} Today`}
          subTitle={`Have questions or need assistance? Our team at ${projectName} is ready to help you with your job search and hiring needs. Reach out to us anytime.`}
          design={HeroDesigns.TEXT_CENTER || ''}
          buttonText={`Contact Us Now`}
        />

        <FaqSection
          projectName={'256Sarfa'}
          design={FaqDesigns.ACCORDION || ''}
          faqs={faqs}
          mainText={`Frequently Asked Questions about ${projectName} `}
        />

        <ContactFormSection
          projectName={'256Sarfa'}
          design={ContactFormDesigns.WITH_IMAGE || ''}
          image={['Person typing on a laptop']}
          mainText={`Reach Out to ${projectName} Support `}
          subTitle={`We're here to assist you with any questions or concerns. Contact us anytime, and our team will respond promptly to ensure your needs are met.`}
        />
      </main>
      <WebSiteFooter projectName={'256Sarfa'} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
