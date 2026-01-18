// data/products.ts

export type Category = 
  | "Ebooks" 
  | "AI Prompt Packs" 
  | "Website Templates" 
  | "Lead Magnet Templates" 
  | "Online Courses";

export interface Product {
  id: string;
  title: string;
  category: Category;
  description: string;
  price: string;
  isFree: boolean;
  image: string; // <--- This fixes the error!
  fileUrl?: string;
}

export const products: Product[] = [
  // Ebooks
  {
    id: "eb-1",
    title: "The Solopreneur Handbook",
    category: "Ebooks",
    description: "A complete guide to starting your one-person business in 2024.",
    price: "Free",
    isFree: true,
    image: "/product/The Solopreneur's Success Path.png", // Make sure this file exists in public/products
    fileUrl: "/assets/SOLOPRENUER.Pdf" 
  },
  {
    id: "eb-2",
    title: "Advanced React Patterns",
    category: "Ebooks",
    description: "Master React hooks and performance optimization techniques.",
    price: "$29.00",
    isFree: false,
    image: "/product/Advanced react pattern.png",
  },
  {
    id: "eb-3",
    title: "Marketing Psychology 101",
    category: "Ebooks",
    description: "Understand the trigger points that make customers buy.",
    price: "$19.00",
    isFree: false,
    image: "/product/Marketing Psychology.png",
  },

  // AI Prompt Packs
  {
    id: "ai-1",
    title: "Midjourney Masterclass",
    category: "AI Prompt Packs",
    description: "500+ High-fidelity prompts for generating photorealistic art.",
    price: "$35.00",
    isFree: false,
    image: "/product/Midjourney masterclass.png",
  },
  {
    id: "ai-2",
    title: "SEO Blog Writer Prompts",
    category: "AI Prompt Packs",
    description: "Generate high-ranking blog posts with these ChatGPT prompts.",
    price: "Free",
    isFree: true,
    image: "/product/SEO blog writer.png",
    fileUrl:"/assets/AI SEO Blog Writer Prompt Pack.pdf"
  },
  {
    id: "ai-3",
    title: "Coding Assistant Pack",
    category: "AI Prompt Packs",
    description: "Prompts to debug, refactor, and comment code instantly.",
    price: "$15.00",
    isFree: false,
    image: "/product/Coding Assistant.png",
  },

  // Website Templates
  {
    id: "wt-1",
    title: "SaaS Landing Page",
    category: "Website Templates",
    description: "High-conversion Next.js template for SaaS startups.",
    price: "$49.00",
    isFree: false,
    image: "/product/SaaS landing Page.png",
  },
  {
    id: "wt-2",
    title: "Minimal Portfolio",
    category: "Website Templates",
    description: "Clean, dark-mode portfolio template for designers.",
    price: "Free",
    isFree: true,
    image: "/product/Portfolio.png",
    fileUrl:"/assets/Portfolio.zip/"
  },
  {
    id: "wt-3",
    title: "E-commerce Starter",
    category: "Website Templates",
    description: "Shopify-ready theme with integrated cart logic.",
    price: "$89.00",
    isFree: false,
    image: "/product/Ecommerce.png",
  },

  // Lead Magnet Templates
  {
    id: "lm-1",
    title: "Notion Resource Hub",
    category: "Lead Magnet Templates",
    description: "A clonable Notion template to offer your audience.",
    price: "Free",
    isFree: true,
    image: "/product/Notion.png",
    fileUrl:"/assets/Notion Resource Hub.pdf"
  },
  {
    id: "lm-2",
    title: "Canva Checklist Bundle",
    category: "Lead Magnet Templates",
    description: "10 Beautiful checklist designs editable in Canva.",
    price: "$12.00",
    isFree: false,
    image: "/product/Canva.png",
  },
  {
    id: "lm-3",
    title: "Email Course Sequence",
    category: "Lead Magnet Templates",
    description: "5-Day drip campaign template texts.",
    price: "$25.00",
    isFree: false,
    image: "/product/Email.png",
  },

  // Online Courses
  {
    id: "oc-1",
    title: "Full Stack Next.js Bootcamp",
    category: "Online Courses",
    description: "From zero to hero in 30 days. Project-based learning.",
    price: "$199.00",
    isFree: false,
    image: "/product/Nextjs bootcamp.png",
  },
  {
    id: "oc-2",
    title: "Intro to UI Design",
    category: "Online Courses",
    description: "Learn the basics of Figma and typography.",
    price: "Free",
    isFree: true,
    image: "/product/UX design.png",
  },
  {
    id: "oc-3",
    title: "Digital Marketing Master",
    category: "Online Courses",
    description: "Learn FB Ads, SEO, and Email Marketing.",
    price: "$149.00",
    isFree: false,
    image: "/product/Digital Marketing.png",
  },
];