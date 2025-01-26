import { atom } from "jotai";
import { ResumeType } from "./types";

export const detailsAtom = atom<ResumeType>({
  primaryColor: "#004cbf",
  name: "SANJAY BORA",
  profession: "Full Stack Developer",
  location: "Delhi, India",
  email: "sanjaybora380@gmail.com",
  links: [
    { name: "Portfolio", url: "https://sanjaybora.in" },
    { name: "LinkedIn", url: "https://linkedin.com/in/sanjaybora04" }
  ],
  summary: "Full Stack Web Developer experienced in designing, developing, and maintaining robust web applications.Proven expertise in React, Next.js, Node.js, and Express.js. Demonstrated ability in cloud services (AWS), RESTful API integration, responsive design, and database management (MongoDB, SQL, Sequelize, Prisma). Adept at collaborating with cross-functional teams to achieve project goals and enhance user experience.",
  skills: ["Next.js", "Prisma", "Express", "Coolify", "SanityCms", "Strapi"],
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

export const selectedTemplateAtom = atom<number>(0)