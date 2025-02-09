"use client";
import { Accordion, AccordionItem } from "@heroui/react";
import {Button} from "@heroui/react";

export default function FAQ() {
  return (
    <div className="dark:bg-gray-900 dark:text-white p-6 bg-white text-black min-h-screen">
        
    
      <h1 className="text-2xl sm:text-5xl font-bold text-center text-neutral-800 dark:text-neutral-200 ">
      FAQs
      </h1>
      <p className="text-[15px] pr-[20px] pl-[20px] sm:pr-0 sm:pl-0 sm:text-lg text-center text-neutral-600 dark:text-neutral-400 mt-4 mb-12 sm:mb-24">
      Find answers to common questions about our tools and services.vity.
      </p>
      <Accordion variant="splitted">
        <AccordionItem
          key="1"
          aria-label="Accordion 1"
          title={<span className="dark:text-white font-bold text-black">What is AI Professor?</span>}
        >
          AI Professor is an intelligent tool designed to provide subject-specific query resolution, helping students get instant answers and boost their understanding.
        </AccordionItem>
        <AccordionItem
          key="2"
          aria-label="Accordion 2"
          title={<span className="dark:text-white font-bold text-black">What is Roadmap Generator?</span>}
        >
          The Roadmap Generator creates chapter-wise study plans tailored to individual learning needs.
        </AccordionItem>
        <AccordionItem
          key="3"
          aria-label="Accordion 3"
          title={<span className="dark:text-white font-bold text-black">Is there a cost?</span>}
        >
          Our basic tools are available for free, while premium features may have associated costs.
        </AccordionItem>
        <AccordionItem
          key="4"
          aria-label="Accordion 4"
          title={<span className="dark:text-white font-bold text-black">Can I get support?</span>}
        >
          Yes, we offer comprehensive support for all users. You can reach out via our contact page for assistance.
        </AccordionItem>
        <AccordionItem
          key="5"
          aria-label="Accordion 5"
          title={<span className="dark:text-white font-bold text-black">How does AI Professor work?</span>}
        >
          AI Professor uses advanced machine learning algorithms to analyze questions and provide accurate, subject-specific answers in real-time.
        </AccordionItem>
        <AccordionItem
          key="6"
          aria-label="Accordion 6"
          title={<span className="dark:text-white font-bold text-black">How accurate are the generated roadmaps?</span>}
        >
          The Roadmap Generator is designed to provide highly relevant study plans based on user input, but we recommend users review and adjust based on personal preferences.
        </AccordionItem>
      </Accordion>
      <div className="mt-[100px] p-4 border-t border-gray-300 dark:border-gray-600 text-center">
        <h2 className="text-xl pt-4 font-semibold dark:text-white text-black">Need Help? Get in Touch!</h2>
        <p className="dark:text-gray-300 text-gray-700 mb-4">Our team is here to support you.</p>
        <Button asChild  className="text-white bg-blue-600 dark:bg-blue-400 hover:bg-blue-700 dark:hover:bg-blue-500 px-4 py-2 rounded-full font-medium">
Contact Us
        </Button>
      </div>
    </div>
  );
}
