'use client'
import TheClassicResume from "@/components/templates/theClassic";
import SidebarResume from "@/components/templates/sidebar";
import TimelineResume from "@/components/templates/timeline";
import MinimalResume from "@/components/templates/minimal";

import { Input } from "@/components/ui/input";
import { usePDF } from "@react-pdf/renderer";
import { useEffect, useState } from "react";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Document, Page, pdfjs } from "react-pdf";
import 'react-pdf/dist/esm/Page/TextLayer.css'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import { ResumeType } from "@/lib/types";
import { Textarea } from "@/components/ui/textarea";
import { atom, useAtom } from "jotai";
import PdfViewer from "@/components/pdfviewer";
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

export const detailsAtom = atom<ResumeType>({
  primaryColor: "#bc6800",
  name: "SANJAY BORA",
  profession: "Full Stack Developer",
  location: "Delhi, India",
  email: "sanjaybora380@gmail.com",
  links: [
    { name: "Portfolio", url: "https://sanjaybora.in" },
    { name: "LinkedIn", url: "https://linkedin.com/in/sanjaybora04" }
  ],
  summary: "Full Stack Web Developer experienced in designing, developing, and maintaining robust web applications.Proven expertise in React, Next.js, Node.js, and Express.js. Demonstrated ability in cloud services (AWS), RESTful API integration, responsive design, and database management (MongoDB, SQL, Sequelize, Prisma). Adept at collaborating with cross-functional teams to achieve project goals and enhance user experience.",
  skills: ["Next.js", "React.js"],
  experience: [
    {
      title: "Full Stack Developer",
      company: "Webtoils Development",
      startDate: new Date().toLocaleDateString(),
      endDate: new Date().toLocaleDateString(),
      description: "-> Led development of content websites like zweibay.de, renovlange.de.\n-> Created an online reservation system for coworking space bookings.\n-> Set up WhatsApp API for automated chatbot and Google Sheets integration.\n-> Managed a team of 2 interns building content-based websites. Developed interactive user interfaces and backend services for content projects."
    },
    {
      title: "Freelance Web Developer",
      company: "JoinYourTrip",
      startDate: new Date().toLocaleDateString(),
      endDate: new Date().toLocaleDateString(),
      description: "-> Built with Next.js, Express, Sequelize for full-stack development.\nIntegrated Razorpay for secure payment processing and booking functionality.\n-> Developed responsive, user-friendly travel listings with advanced filtering options.\n-> Admin dashboard for managing listings, bookings, and user details.\n-> Deployed on Vercel and AWS/Heroku for high availability and scalability."
    },
    {
      title: "Computer Vision Intern",
      company: "IOTIOT",
      startDate: new Date().toLocaleDateString(),
      endDate: new Date().toLocaleDateString(),
      description: "-> Created algorithm utilizing deep learning methods to identify and categorize objects in images.\n-> Executed computer vision workflows for real-time object detection, tracking, and identification."
    }
  ],
  education: [
    {
      title: "Bachelor in computer applications",
      school: "Maharaja Surajmal Institute",
      startDate: new Date().toLocaleDateString(),
      endDate: new Date().toLocaleDateString(),
      description: ""
    },

  ]
})

export default function Home() {
  const [details, setDetails] = useAtom(detailsAtom)
  const [instance, update] = usePDF({ document: TheClassicResume({ details }) })
  const [pageCount, setPageCount] = useState(0)

  function onPdfLoad({ numPages }: { numPages: number }): void {
    setPageCount(numPages);
  }

  useEffect(() => { update(TheClassicResume({ details })) }, [details])
  return (
    <div className="md:flex">
      <div className="md:w-1/2 space-y-2 p-5">
        <Input value={details.name} onChange={(e) => setDetails(prev => ({ ...prev, name: e.target.value }))} placeholder="Enter your name" />
        <Input value={details.profession} onChange={(e) => setDetails(prev => ({ ...prev, profession: e.target.value }))} placeholder="Enter your profession" />
        <Input value={details.location} onChange={(e) => setDetails(prev => ({ ...prev, location: e.target.value }))} placeholder="Enter your location" />
        <Input value={details.email} onChange={(e) => setDetails(prev => ({ ...prev, email: e.target.value }))} placeholder="Enter your email" />
        <Textarea value={details.summary} onChange={(e) => setDetails(prev => ({ ...prev, summary: e.target.value }))} placeholder="Enter your summary" className="h-24" />

        <div className="flex gap-2 flex-wrap">

          <div className="w-80 aspect-[3/4] shadow-lg overflow-auto">
            <PdfViewer Resume={TheClassicResume} width={300} />
          </div>
          <div className="w-80 aspect-[3/4] shadow-lg overflow-auto">
            <PdfViewer Resume={SidebarResume} width={300} />
          </div>
          <div className="w-80 aspect-[3/4] shadow-lg overflow-auto">
            <PdfViewer Resume={TimelineResume} width={300} />
          </div>
          <div className="w-80 aspect-[3/4] shadow-lg overflow-auto">
            <PdfViewer Resume={MinimalResume} width={300} />
          </div>

        </div>

      </div>

      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="outline" className="md:hidden">View</Button>
        </DrawerTrigger>
        <DrawerContent className="className='w-full h-[80vh] flex flex-col gap-2 overflow-auto'">
          <PdfViewer Resume={TheClassicResume} />
        </DrawerContent>
      </Drawer>
      <div className="sticky top-0 hidden md:flex md:w-1/2 max-w-2xl mx-auto h-screen overflow-auto border flex-col gap-2 xl:items-center">
        <PdfViewer Resume={TheClassicResume} />
      </div>
      {/* <iframe src={instance.url!} className="w-full md:w-1/2 h-screen"/> */}
    </div>
  );
}
