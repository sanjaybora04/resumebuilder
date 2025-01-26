export type ResumeType = {
  primaryColor: string;
  name: string;
  profession: string;
  location: string;
  email: string;
  links: { name: string; url: string }[];
  summary: string;
  skills: string[];
  experience: {
    title: string;
    company: string;
    startDate: string;
    endDate: string;
    description: string;
  }[];
  education: {
    title: string;
    school: string;
    startDate: string;
    endDate: string;
    description: string;
  }[];
}