import { RocketIcon, ComponentIcon } from "lucide-react";
// for page navigation & to sort on leftbar
export const ROUTES = [
    {
        title: "Getting Started",
        href: "getting-started",
        icon: RocketIcon,
        items: [
            { title: "Installation", href: "/installation", description: "Learn how to install Zyflo in your project." },
            { title: "CLI", href: "/command-line-interface", description: "Learn how to use the Zyflo CLI to create a new project." }
        ],
        description: "Learn how to get started with Zyflo and implement it in your project, within a few minutes.",
    },
    {
        title: "Components",
        href: "components",
        icon: ComponentIcon,
        items: [
            { title: "Navbar", href: "/navbar", description: "Learn how to use the Zyflo Navbar component to create a responsive and customizable navigation bar.", new: true },
            { title: "Alert", href: "/alert", description: "Learn how to use the Zyflo Alert component to create a visually appealing and informative alert box.", new: true },
            { title: "Badge", href: "/badge", description: "Learn how to use the Zyflo Badge component to create a customizable badge.", new: true },
            { title: "Link Embed", href: "/link-embed", description: "Learn how to use the Zyflo Link Embed component to create a customizable link embed.", new: true },
            { title: "Liquid Button", href: "/liquid-button", description: "Learn how to use the Zyflo Liquid Button component to create a customizable liquid button.", new: true },
            { title: "Animated Background", href: "/animated-background", description: "Learn how to use the Zyflo Animated Background component to create a customizable animated background.", new: true },
            { title: "Animate On Scroll", href: "/animate-on-scroll", description: "Learn how to use the Zyflo Animate On Scroll component to create a customizable animated background.", new: true },
            { title: "Cursor Follow", href: "/cursor-follow", description: "Learn how to use the Zyflo Cursor Follow component to create a customizable cursor.", new: true },
            { title: "Glitch Text", href: "/glitch-text", description: "Learn how to use the Zyflo Glitch Text component to create a customizable glitch text.", new: true },
            { title: "Progress", href: "/progress", description: "Learn how to use the Zyflo Progress component to create a customizable progress bar.", new: true },
        ],
        description: "Explore the various components available in Zyflo and learn how to use them in your project.",
    }
];

export const page_routes = ROUTES.map(({ href, items }) => {
    return items.map((link) => {
        return {
            title: link.title,
            href: href + link.href,
            descritpion: link.description,
            new: link.new,
        };
    });
}).flat();