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
  AboutUsDesigns,
  FeaturesDesigns,
  FaqDesigns,
} from '../../components/WebPageComponents/designs';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

import AboutUsSection from '../../components/WebPageComponents/AboutUsComponent';

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
      name: 'Seamless CV Upload',
      description:
        'Easily upload and manage your CVs with our intuitive interface. Ensure your profile is always up-to-date and ready for potential employers.',
      icon: 'mdiFileUpload',
    },
    {
      name: 'Direct Communication',
      description:
        'Facilitate direct communication between job seekers and business owners. Streamline the hiring process with in-app messaging and notifications.',
      icon: 'mdiMessageText',
    },
    {
      name: 'Advanced Analytics',
      description:
        'Gain insights into job market trends and application statuses. Use data-driven analytics to make informed career decisions.',
      icon: 'mdiChartLine',
    },
  ];

  const faqs = [
    {
      question: 'How do I upload my CV?',
      answer:
        "Uploading your CV is simple. Log in to your account, navigate to the 'Profile' section, and click 'Upload CV'. Follow the prompts to complete the process.",
    },
    {
      question: 'Can I edit my profile after registration?',
      answer:
        "Yes, you can update your profile anytime. Simply log in, go to 'Profile Settings', and make the necessary changes to keep your information current.",
    },
    {
      question: 'What happens after I receive a job offer?',
      answer:
        'Once you receive a job offer, you can view the details and respond directly through the platform. Accept or decline offers with a single click.',
    },
    {
      question: 'Is my personal information secure?',
      answer:
        'We prioritize your privacy and use advanced encryption to protect your data. Rest assured, your information is safe with ${projectName}.',
    },
    {
      question: 'How can I contact support for help?',
      answer:
        "If you need assistance, visit our 'Contact Us' page and fill out the form. Our support team will respond promptly to address your concerns.",
    },
    {
      question: 'Are there any fees for job seekers?',
      answer:
        'Basic features are free for job seekers. However, premium features may require a subscription, offering additional benefits and tools.',
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`About ${projectName} - Our Mission and Vision`}</title>
        <meta
          name='description'
          content={`Learn more about ${projectName}, our mission to connect job seekers with business owners, and the innovative features that make it possible.`}
        />
      </Head>
      <WebSiteHeader projectName={'256Sarfa'} pages={pages} />
      <main className={`flex-grow  ${bgColor}    rounded-none  `}>
        <HeroSection
          projectName={'256Sarfa'}
          image={['Team brainstorming innovative solutions']}
          mainText={`Unveiling the Vision of ${projectName}`}
          subTitle={`Discover the driving force behind ${projectName}. Our mission is to revolutionize the job market by seamlessly connecting job seekers with business owners, fostering growth and opportunity.`}
          design={HeroDesigns.IMAGE_BG || ''}
          buttonText={`Explore Our Journey`}
        />

        <AboutUsSection
          projectName={'256Sarfa'}
          image={['Team collaborating in office']}
          mainText={`The Heartbeat of ${projectName}`}
          subTitle={`At ${projectName}, we are committed to transforming the job market. Our dedicated team works tirelessly to create a platform that bridges the gap between talent and opportunity, fostering a community of growth and success.`}
          design={AboutUsDesigns.IMAGE_LEFT || ''}
          buttonText={`Meet Our Team`}
        />

        <FeaturesSection
          projectName={'256Sarfa'}
          image={['Icons representing key features']}
          withBg={0}
          features={features_points}
          mainText={`Innovative Features of ${projectName}`}
          subTitle={`Explore the cutting-edge features that make ${projectName} a leader in connecting job seekers with business opportunities.`}
          design={FeaturesDesigns.CARDS_GRID_WITH_ICONS || ''}
        />

        <FaqSection
          projectName={'256Sarfa'}
          design={FaqDesigns.TWO_COLUMN || ''}
          faqs={faqs}
          mainText={`Your Questions Answered about ${projectName} `}
        />
      </main>
      <WebSiteFooter projectName={'256Sarfa'} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
