import { detailsAtom } from "@/app/page"
import { usePDF } from "@react-pdf/renderer"
import { useAtom, useAtomValue } from "jotai"
import { useEffect, useState } from "react"
import { Document, Page } from "react-pdf"

export default function PdfViewer({ Resume,width }: { Resume: any,width?:any }) {
    const details = useAtomValue(detailsAtom)
    const [instance, update] = usePDF({ document: Resume({ details }) })
    const [pageCount, setPageCount] = useState(0)

    function onPdfLoad({ numPages }: { numPages: number }): void {
        setPageCount(numPages);
    }

    useEffect(() => { update(Resume({ details })) }, [details])

    return (
        <Document file={instance.url} onLoadSuccess={onPdfLoad} className='w-full h-full flex flex-col gap-2 overflow-auto'>
            {Array.from({ length: pageCount }, (_, i) => i + 1).map((pageNumber) => (
                <Page key={pageNumber} pageNumber={pageNumber} className='shadow-lg' width={width} />
            ))}
        </Document>
    )
}