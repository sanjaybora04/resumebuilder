import dynamic from "next/dynamic";

const MinimalGridResume = dynamic(() => import("@/components/templates/minimal"));
const SidebarResume = dynamic(() => import("@/components/templates/sidebar"));
const TheClassic = dynamic(() => import("@/components/templates/theClassic"));
const CenteredTimelineResume = dynamic(() => import("@/components/templates/timeline"));

const templates = [
    {
        name: "The Classic",
        component: TheClassic,
        image:'/images/templates/theclassic.png',
        tags: []
    },
    {
        name: 'Sidebar',
        component: SidebarResume,
        image:'/images/templates/sidebar.png',
        tags: []
    },
    {
        name: 'Timeline',
        component: CenteredTimelineResume,
        image:'/images/templates/timeline.png',
        tags: []
    },
    {
        name: 'Minimal',
        component: MinimalGridResume,
        image:'/images/templates/minimal.png',
        tags: []
    }
]

export default templates