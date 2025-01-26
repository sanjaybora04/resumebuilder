'use client'

import { Input } from "@/components/ui/input";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAtom, useAtomValue } from "jotai";
import dynamic from "next/dynamic";
const PdfViewer = dynamic(() => import("@/components/pdfviewer"), {
  ssr: false, // Disable SSR
});
import { detailsAtom, selectedTemplateAtom } from "@/lib/atoms";
import ColorPicker from "@/components/ui/colorpicker";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Check, ChevronDown, ChevronUp, Fullscreen, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import templates from "@/lib/templates";
const DEFAULT_COLORS = ["#004cbf","#bc6800", "#00956e", "#93009e", "#b4005d"];

export default function Home() {
  const [details, setDetails] = useAtom(detailsAtom)
  const [selectedTemplate,setSelectedTemplate] = useAtom(selectedTemplateAtom)

  const [primaryColours, setPrimaryColours] = useState<string[]>([
    ...DEFAULT_COLORS,
  ]);

  return (
    <div>
    <div>
      {/* <div className="h-20 bg-gray-500 w-full">Header</div> */}
    <div className="md:flex sticky top-0">
      <div className="md:w-1/2 space-y-5 p-5">
        <div className="flex gap-[0.5rem] md:gap-[0.5vw] my-[0.5rem] md:mt-[0.5vw]">

          <ColorPicker
            value={details.primaryColor}
            onChange={(color: string) => setDetails(prev => ({ ...prev, primaryColor: color }))}
            handleAdd={(color: string) => {
              setPrimaryColours((prev: string[]) => [...prev, color]);
            }}
          />
          {primaryColours.map((color, index) => (
            <TooltipProvider key={index}>
              <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    onClick={() => setDetails(prev => ({ ...prev, primaryColor: color }))}
                    className={`rounded-full items-center justify-center aspect-square h-fit w-fit p-[0.2rem] md:p-[0.2vw] bg-white/10`}
                  >
                    <div
                      style={{ backgroundColor: color }}
                      className={`h-[2rem] md:h-[2vw] aspect-square rounded-full flex items-center justify-center `}
                    >
                      {details.primaryColor?.includes(color) && (
                        <Check className="text-white h-4" />
                      )}
                    </div>
                  </button>
                </TooltipTrigger>
                <TooltipContent className="uppercase">{color}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
        <div>
          <div className="font-semibold">Name</div>
          <Input value={details.name} onChange={(e) => setDetails(prev => ({ ...prev, name: e.target.value }))} placeholder="Enter your name" />
        </div>
        <div>
          <div className="font-semibold">Profession</div>
          <Input value={details.profession} onChange={(e) => setDetails(prev => ({ ...prev, profession: e.target.value }))} placeholder="Enter your profession" />
        </div>
        <div>
          <div className="font-semibold">Location</div>
          <Input value={details.location} onChange={(e) => setDetails(prev => ({ ...prev, location: e.target.value }))} placeholder="Enter your location" />
        </div>
        <div>
          <div className="font-semibold">Email</div>
          <Input value={details.email} onChange={(e) => setDetails(prev => ({ ...prev, email: e.target.value }))} placeholder="Enter your email" />
        </div>
        <div>

          <div className="font-semibold">Links</div>
          <div className="space-y-3">
            {
              details.links.map((link, index) => (
                <div key={index} className="flex flex-wrap gap-2 border p-2 rounded-lg shadow">
                  <Input value={link.name} onChange={(e) => {
                    setDetails(prev => {
                      const links = [...prev.links];
                      links[index].name = e.target.value;
                      return { ...prev, links };
                    });
                  }} className="max-w-80" placeholder="Enter link name" />
                  <Input value={link.url} onChange={(e) => {
                    setDetails(prev => {
                      const links = [...prev.links];
                      links[index].url = e.target.value;
                      return { ...prev, links };
                    });
                  }} className="max-w-80" placeholder="Enter link url" />
                  <div className="flex gap-2">
                    <Button variant='destructive' size='icon' className="flex-none" onClick={() => {
                      setDetails(prev => {
                        const links = [...prev.links];
                        links.splice(index, 1);
                        return { ...prev, links };
                      });
                    }}><Trash2 /></Button>
                    <Button size='icon' onClick={() => {
                      setDetails((prev) => {
                        const links = [...prev.links];
                        if (index > 0) {
                          // Swap the current item with the one above it
                          [links[index], links[index - 1]] = [links[index - 1], links[index]];
                        }
                        return { ...prev, links };
                      });
                    }}><ChevronUp /></Button>
                    <Button size='icon' onClick={() => {
                      setDetails((prev) => {
                        const links = [...prev.links];
                        if (index < links.length - 1) {
                          // Move item down
                          [links[index], links[index + 1]] = [links[index + 1], links[index]];
                        }
                        return { ...prev, links };
                      });
                    }}><ChevronDown /></Button>
                  </div>
                </div>
              ))
            }
            <Button onClick={() => {
              setDetails(prev => {
                const links = [...prev.links];
                links.push({ name: "", url: "" });
                return { ...prev, links };
              });
            }}><Plus/>Add Link</Button>
          </div>
        </div>
        <div>
          <div className="font-semibold">Skills and Expertise</div>
          <div className="space-y-3">
            {
              details.skills.map((skill, index) => (
                <div key={index} className="flex flex-wrap gap-2 border p-2 rounded-lg shadow">
                  <Input value={skill} onChange={(e) => {
                    setDetails(prev => {{
                      const skills = [...prev.skills];
                      skills[index] = e.target.value;
                      return { ...prev, skills };
                    }});
                  }} placeholder="Enter skill" />
                  <div className="flex gap-2">
                    <Button variant='destructive' size='icon' className="flex-none" onClick={() => {
                      setDetails(prev => {
                        const skills = [...prev.skills];
                        skills.splice(index, 1);
                        return { ...prev, skills };
                      });
                    }}><Trash2 /></Button>
                    <Button size='icon' onClick={() => {
                      setDetails((prev) => {
                        const skills = [...prev.skills];
                        if (index > 0) {
                          // Swap the current item with the one above it
                          [skills[index], skills[index - 1]] = [skills[index - 1], skills[index]];
                        }
                        return { ...prev, skills };
                      });
                    }}><ChevronUp /></Button>
                    <Button size='icon' onClick={() => {
                      setDetails((prev) => {
                        const skills = [...prev.skills];
                        if (index < skills.length - 1) {
                          // Move item down
                          [skills[index], skills[index + 1]] = [skills[index + 1], skills[index]];
                        }
                        return { ...prev, skills };
                      });
                    }}><ChevronDown /></Button>
                  </div>
                </div>
              ))
            }
            <Button onClick={() => {
              setDetails(prev => {
                const skills = [...prev.skills];
                skills.push("");
                return { ...prev, skills };
              });
            }}><Plus/>Add Skill</Button>
          </div>
        </div>
        <div>
          <div className="font-semibold">Summary</div>
          <Textarea value={details.summary} onChange={(e) => setDetails(prev => ({ ...prev, summary: e.target.value }))} placeholder="Enter your summary" className="h-24" />
        </div>

        <div>
          <div className="font-semibold">Work Experience</div>
          <div className="space-y-2">
            {
              details.experience.map((exp, index) => (
                <div key={index} className=" space-y-2 p-2 border rounded-lg shadow">
                  <Input value={exp.title} onChange={(e) => {
                    setDetails(prev => {
                      const exp = [...prev.experience];
                      exp[index].title = e.target.value;
                      return { ...prev, experience: exp };
                    });
                  }} placeholder="Enter your title" />
                  <Input value={exp.company} onChange={(e) => {
                    setDetails(prev => {
                      const experience = [...prev.experience];
                      experience[index].company = e.target.value;
                      return { ...prev, experience };
                    });
                  }} placeholder="Enter company name" />
                  <Input value={exp.startDate} onChange={(e) => {
                    setDetails(prev => {
                      const experience = [...prev.experience];
                      experience[index].startDate = e.target.value;
                      return { ...prev, experience };
                    });
                  }} placeholder="Enter start date" />
                  <Input value={exp.endDate} onChange={(e) => {
                    setDetails(prev => {
                      const experience = [...prev.experience];
                      experience[index].endDate = e.target.value;
                      return { ...prev, experience };
                    });
                  }} placeholder="Enter end date" />
                  <Textarea value={exp.description} onChange={(e) => {
                    setDetails(prev => {
                      const experience = [...prev.experience];
                      experience[index].description = e.target.value;
                      return { ...prev, experience }
                    })
                  }} placeholder="Enter your experience"
                    className="h-24"
                  />
                  <div className="flex gap-2">
                  <Button variant='destructive' size='icon' onClick={() => {
                    setDetails(prev => {
                      const experience = [...prev.experience];
                      experience.splice(index, 1);
                      return { ...prev, experience };
                    });
                  }}><Trash2/></Button>
                  <Button size='icon' onClick={() => {
                      setDetails((prev) => {
                        const experience = [...prev.experience];
                        if (index > 0) {
                          // Swap the current item with the one above it
                          [experience[index], experience[index - 1]] = [experience[index - 1], experience[index]];
                        }
                        return { ...prev, experience };
                      });
                    }}><ChevronUp /></Button>
                    <Button size='icon' onClick={() => {
                      setDetails((prev) => {
                        const experience = [...prev.experience];
                        if (index < experience.length - 1) {
                          // Move item down
                          [experience[index], experience[index + 1]] = [experience[index + 1], experience[index]];
                        }
                        return { ...prev, experience };
                      });
                    }}><ChevronDown /></Button>
                  </div>
                </div>
              ))
            }
            <Button onClick={() => {
              setDetails(prev => {
                const experience = [...prev.experience];
                experience.push({title:'',company:'',startDate:'',endDate:'',description:''});
                return { ...prev, experience };
              });
            }}><Plus/>Add Experience</Button>
          </div>
        </div>

        <div>
          <div className="font-semibold">Education</div>
          <div className="space-y-2">
            {
              details.education.map((edu, index) => (
                <div key={index} className=" space-y-2 p-2 border rounded-lg shadow">
                  <Input value={edu.title} onChange={(e) => {
                    setDetails(prev => {
                      const education = [...prev.education];
                      education[index].title = e.target.value;
                      return { ...prev, education };
                    });
                  }} placeholder="Enter your title" />
                  <Input value={edu.school} onChange={(e) => {
                    setDetails(prev => {
                      const education = [...prev.education];
                      education[index].school = e.target.value;
                      return { ...prev, education };
                    });
                  }} placeholder="Enter company name" />
                  <Input value={edu.startDate} onChange={(e) => {
                    setDetails(prev => {
                      const education = [...prev.education];
                      education[index].startDate = e.target.value;
                      return { ...prev, education };
                    });
                  }} placeholder="Enter start date" />
                  <Input value={edu.endDate} onChange={(e) => {
                    setDetails(prev => {
                      const education = [...prev.education];
                      education[index].endDate = e.target.value;
                      return { ...prev, education };
                    });
                  }} placeholder="Enter end date" />
                  <Textarea value={edu.description} onChange={(e) => {
                    setDetails(prev => {
                      const education = [...prev.education];
                      education[index].description = e.target.value;
                      return { ...prev, education }
                    })
                  }} placeholder="Enter description"
                    className="h-24"
                  />
                  <div className="flex gap-2">
                  <Button variant='destructive' size='icon' onClick={() => {
                    setDetails(prev => {
                      const links = [...prev.links];
                      links.splice(index, 1);
                      return { ...prev, links };
                    });
                  }}><Trash2/></Button>
                  <Button size='icon' onClick={() => {
                      setDetails((prev) => {
                        const education = [...prev.education];
                        if (index > 0) {
                          // Swap the current item with the one above it
                          [education[index], education[index - 1]] = [education[index - 1], education[index]];
                        }
                        return { ...prev, education };
                      });
                    }}><ChevronUp /></Button>
                    <Button size='icon' onClick={() => {
                      setDetails((prev) => {
                        const education = [...prev.education];
                        if (index < education.length - 1) {
                          // Move item down
                          [education[index], education[index + 1]] = [education[index + 1], education[index]];
                        }
                        return { ...prev, education };
                      });
                    }}><ChevronDown /></Button>
                    </div>
                </div>
              ))
            }
            <Button onClick={() => {
              setDetails(prev => {
                const education = [...prev.education];
                education.push({title:'',school:'',startDate:'',endDate:'',description:''});
                return { ...prev, education };
              });
            }}><Plus/>Add Education</Button>
          </div>
        </div>

            <div className="font-semibold">Templates</div>
        <div className="flex gap-2 flex-wrap justify-around my-5">
          {templates.map((t,index)=>
          <div onClick={()=>{setSelectedTemplate(index),console.log(index)}} className="w-80 aspect-[3/4] shadow-lg overflow-auto">
            <PdfViewer key={details.links.length+details.skills.length+details.experience.length+details.education.length+selectedTemplate} Resume={t.component} width={300} />
          </div>
          )}
        </div>

      </div>

      <Drawer>
        <DrawerTrigger asChild>
          <Button className="md:hidden fixed bottom-5 right-5">View <Fullscreen className="w-14 h-14"/></Button>
        </DrawerTrigger>
        <DrawerContent className="className='w-full h-[80vh] flex flex-col gap-2 overflow-auto'">
          <PdfViewer main key={details.links.length+details.skills.length+details.experience.length+details.education.length+selectedTemplate} Resume={templates[selectedTemplate].component} />
        </DrawerContent>
      </Drawer>
      <div className="sticky top-0 hidden md:flex md:w-1/2 h-screen border">
        <PdfViewer main key={details.links.length+details.skills.length+details.experience.length+details.education.length+selectedTemplate} Resume={templates[selectedTemplate].component} />
      </div>
    </div>
    </div>
    {/* <div className="bg-gray-500 h-28">footer</div> */}
    </div>
  );
}
