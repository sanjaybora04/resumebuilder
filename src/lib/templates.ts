import dynamic from "next/dynamic";

const MinimalGridResume = dynamic(() => import("@/components/templates/minimal"));
const SidebarResume = dynamic(() => import("@/components/templates/sidebar"));
const TheClassic = dynamic(() => import("@/components/templates/theClassic"));
const CenteredTimelineResume = dynamic(() => import("@/components/templates/timeline"));

const templates = [
    {
        name: "The Classic",
        component: TheClassic,
        image:'/images/theclassic.png',
        tags: []
    },
    {
        name: 'Sidebar',
        component: SidebarResume,
        image:'/images/sidebar.png',
        tags: []
    },
    {
        name: 'Timeline',
        component: CenteredTimelineResume,
        image:'/images/timeline.png',
        tags: []
    },
    {
        name: 'Minimal',
        component: MinimalGridResume,
        image:'/images/minimal.png',
        tags: []
    }
]

export default templates