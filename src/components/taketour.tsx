'use client'
import { WandSparkles } from "lucide-react";
import { Button } from "./ui/button";
import { Tour, TourArrow, TourContent, TourFooter, TourOverlay, TourStep } from "./ui/tour";
import { useState } from "react";

const steps = [
    {
      target: "templates",
      step: (
        <div className="flex flex-col gap-2">
          <p>
            Select a template
          </p>
        </div>
      ),
    },
    {
      target: "editbutton",
      step: (
        <div>
          <p>Edit the template</p>
        </div>
      ),
    },
    {
      target: "viewer",
      step: (
        <div>
          View your Resume
        </div>
      ),
    },
    {
      target: "download",
      step: (
        <div>
          Download Your Resume
        </div>
      ),
    }
  ]



export default function TakeTour() {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <div>
            <Button className="hidden md:flex" onClick={() => setIsOpen(true)}>
                <span>Start Tour</span>
                <WandSparkles />
            </Button>

            <Tour steps={steps} isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <TourOverlay />
                <TourContent>
                    <TourArrow />
                    <TourStep />
                    <TourFooter />
                </TourContent>
            </Tour>
        </div>
    )
}