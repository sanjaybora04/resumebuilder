"use client"

import { detailsAtom } from "@/lib/atoms"
import { usePDF } from "@react-pdf/renderer"
import { useAtomValue } from "jotai"
import { useEffect, useState } from "react"
import { Document, Page, pdfjs } from "react-pdf"
import 'react-pdf/dist/esm/Page/TextLayer.css'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import { ArrowUpRightFromSquare, Download } from "lucide-react"

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
).toString();

export default function PdfViewer({ Resume }: { Resume: any }) {
    const details = useAtomValue(detailsAtom)
    const [instance, update] = usePDF({ document: Resume({ details }) })
    const [pageCount, setPageCount] = useState(0)

    function onPdfLoad({ numPages }: { numPages: number }): void {
        setPageCount(numPages);
    }
    
    useEffect(() => { update(Resume({ details })) }, [details])
    return (
        <Document file={instance.url} onLoadSuccess={onPdfLoad} className='relative w-full h-full flex flex-col gap-2 overflow-auto'>
          <div className="sticky top-0 left-0 z-[999] w-full p-2 bg-primary text-white flex justify-center">
                <a href={instance?.url!} target="_blank"  className="flex gap-2 border border-white rounded-lg p-1">
                    Open / Download
                <ArrowUpRightFromSquare/>
                </a>
            </div>
            {Array.from({ length: pageCount }, (_, i) => i + 1).map((pageNumber) => (
                <Page key={pageNumber} pageNumber={pageNumber} className='shadow-lg mx-auto' />
            ))}
        </Document>
    )
}