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
  AboutUsDesigns,
  ContactFormDesigns,
  FaqDesigns,
} from '../../components/WebPageComponents/designs';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

import FeaturesSection from '../../components/WebPageComponents/FeaturesComponent';

import AboutUsSection from '../../components/WebPageComponents/AboutUsComponent';

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

  const features_points = [
    {
      name: 'Automated Job Matching',
      description:
        'Effortlessly match job seekers with relevant opportunities based on their skills and experience. Save time and find the perfect fit.',
      icon: 'mdiAccountSearch',
    },
    {
      name: 'Real-Time Notifications',
      description:
        'Stay informed with instant alerts when your CV is viewed or when job offers are made. Never miss an opportunity.',
      icon: 'mdiBell',
    },
    {
      name: 'Multi-Tenant Management',
      description:
        'Manage multiple companies under one platform, ensuring data separation and easy oversight for administrators.',
      icon: 'mdiDomain',
    },
  ];

  const faqs = [
    {
      question: 'How does ${projectName} match job seekers with jobs?',
      answer:
        "${projectName} uses advanced algorithms to analyze job seekers' skills and experience, automatically matching them with relevant job openings. This ensures a higher chance of finding the perfect job fit.",
    },
    {
      question: 'Can business owners contact job seekers directly?',
      answer:
        'Yes, business owners can send job offers directly to job seekers through the platform, facilitating seamless communication and quick hiring decisions.',
    },
    {
      question: 'Is there a cost to use ${projectName}?',
      answer:
        '${projectName} offers various pricing plans to suit different needs. While job seekers can use basic features for free, premium features may require a subscription.',
    },
    {
      question: 'How secure is my data on ${projectName}?',
      answer:
        'We prioritize data security and use industry-standard encryption to protect your information. Your data is safe with us, and we comply with all relevant data protection regulations.',
    },
    {
      question: 'Can I manage multiple companies with one account?',
      answer:
        'Yes, ${projectName} supports multi-tenant management, allowing you to oversee multiple companies from a single account, ensuring efficient data management.',
    },
    {
      question: 'What kind of notifications will I receive?',
      answer:
        'Users receive real-time notifications for important events, such as when a CV is viewed or a job offer is made, ensuring you stay informed and responsive.',
    },
    {
      question: 'How can I contact support if I need help?',
      answer:
        'Our support team is available via the contact form on our website. We strive to respond promptly to all inquiries and provide the assistance you need.',
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`CRM Application for Job Seekers and Business Owners`}</title>
        <meta
          name='description'
          content={`Discover our CRM application designed for job seekers and business owners. Upload CVs, review candidates, and manage job offers seamlessly.`}
        />
      </Head>
      <WebSiteHeader projectName={'256Sarfa'} pages={pages} />
      <main className={`flex-grow  ${bgColor}    rounded-none  `}>
        <HeroSection
          projectName={'256Sarfa'}
          image={['Job seekers and business owners connecting']}
          mainText={`Empower Your Career with ${projectName}`}
          subTitle={`Connect job seekers with business owners effortlessly. Upload CVs, receive offers, and manage applications seamlessly with ${projectName}.`}
          design={HeroDesigns.IMAGE_RIGHT || ''}
          buttonText={`Get Started Now`}
        />

        <FeaturesSection
          projectName={'256Sarfa'}
          image={['Dashboard showcasing application features']}
          withBg={1}
          features={features_points}
          mainText={`Discover Key Features of ${projectName}`}
          subTitle={`Explore how ${projectName} simplifies job seeking and hiring processes with innovative features.`}
          design={FeaturesDesigns.CARDS_GRID_WITH_ICONS || ''}
        />

        <AboutUsSection
          projectName={'256Sarfa'}
          image={['Team collaborating on innovative solutions']}
          mainText={`Transforming Careers with ${projectName}`}
          subTitle={`At ${projectName}, we bridge the gap between job seekers and business owners, fostering connections and opportunities. Our mission is to streamline the hiring process and empower individuals to achieve their career goals.`}
          design={AboutUsDesigns.IMAGE_LEFT || ''}
          buttonText={`Learn More About Us`}
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
          mainText={`Get in Touch with ${projectName} `}
          subTitle={`Reach out to us anytime. Our team at ${projectName} is here to assist you with any inquiries or support you need. Expect a prompt response.`}
        />
      </main>
      <WebSiteFooter projectName={'256Sarfa'} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
