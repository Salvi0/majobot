"use client";

import { Icons } from "@/components/ui/Icons";
import * as Accordion from "@radix-ui/react-accordion";
import Link from "next/link";

export default function Faq() {
 const items = [
  {
   question: "What is Majo.exe",
   answer: "Majo.exe is a multi-purpose Discord bot that offers a wide range of features such as moderation, image manipulation, leveling, auto-moderation, and much more. It's designed to be easy to use and highly customizable - perfect for any server.",
  },
  {
   question: "Do you offer technical support?",
   answer: "Yes! If you have any issues, we're here to help you. Just join our Discord server and ask for help.",
  },
  {
   question: "Is Majo.exe free?",
   answer: "Yes! Majo.exe is free to use and always will be. We are planning to offer premium features in the future, but the core bot will always be free.",
  },
  {
   question: "How do I invite Majo.exe to my server?",
   answer: "You can invite Majo.exe to your server by clicking the 'Add to server' button on our website. You'll need to have the 'Manage Server' permission to add the bot to your server.",
  },
  {
   question: "How do I report a bug?",
   answer: "If you find a bug, please report it on our GitHub repository. We'll do our best to fix it as soon as possible.",
  },
 ];

 return (
  <div className="mx-auto mt-9 w-full max-w-3xl rounded-xl">
   {items.map((item, index) => (
    <Accordion.Root type="single" defaultValue="item-1" collapsible key={`faq-${item.question}`}>
     <Accordion.Item className="border-b border-neutral-800" value={`item-${index + 1}`}>
      <Accordion.Header className="flex">
       <Accordion.Trigger className="font-medium py-4 p-6 [&[data-state=open]>svg]:rotate-180 text-white duration-200 w-full flex items-center justify-between">
        {item.question}
        <Icons.ChevronDown className="size-4 duration-200" />
       </Accordion.Trigger>
      </Accordion.Header>

      <Accordion.Content className=" px-6 transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down pb-3 origin-top text-neutral-400">{item.answer} </Accordion.Content>
     </Accordion.Item>
    </Accordion.Root>
   ))}

   <div className="mt-6 text-neutral-400 text-center text-sm">
    Have more questions?{" "}
    <Link href="/contact" className="underline">
     Contact us.
    </Link>
   </div>
  </div>
 );
}