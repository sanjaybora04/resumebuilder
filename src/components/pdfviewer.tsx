"use client"

import { detailsAtom } from "@/lib/atoms"
import { usePDF } from "@react-pdf/renderer"
import { useAtomValue } from "jotai"
import { useEffect, useState } from "react"
import { Document, Page, pdfjs } from "react-pdf"
import 'react-pdf/dist/esm/Page/TextLayer.css'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import { Download } from "lucide-react"

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
).toString();

export default function PdfViewer({ Resume, width, main = false }: { Resume: any, width?: any, main?: boolean }) {
    const details = useAtomValue(detailsAtom)
    const [instance, update] = usePDF({ document: Resume({ details }) })
    const [pageCount, setPageCount] = useState(0)

    function onPdfLoad({ numPages }: { numPages: number }): void {
        setPageCount(numPages);
    }
    
    useEffect(() => { update(Resume({ details })) }, [details])
    return (
        <Document file={instance.url} onLoadSuccess={onPdfLoad} className='relative w-full h-full flex flex-col gap-2 overflow-auto'>
            {main && <div className="sticky top-0 left-0 z-[999] w-full p-2 bg-gray-800 text-white flex justify-end">
                <a href={instance?.url!} target="_blank" >
                    <Download />
                </a>
            </div>}
            {Array.from({ length: pageCount }, (_, i) => i + 1).map((pageNumber) => (
                <Page key={pageNumber} pageNumber={pageNumber} className='shadow-lg' width={width} />
            ))}
        </Document>
    )
}