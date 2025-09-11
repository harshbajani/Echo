import {
  CreditCard,
  Inbox,
  LayoutDashboard,
  LibraryBig,
  Mic,
  Palette,
} from "lucide-react";

export const STATUS_FILTER_KEY = "echo-status-filter";

export const customerSupportItems = [
  {
    title: "Conversations",
    url: "/conversations",
    icon: Inbox,
  },
  {
    title: "Knowledge Base",
    url: "/files",
    icon: LibraryBig,
  },
];

export const configurationItems = [
  {
    title: "Widget Customization",
    url: "/customization",
    icon: Palette,
  },
  {
    title: "Integrations",
    url: "/integrations",
    icon: LayoutDashboard,
  },
  {
    title: "Voice Assistant",
    url: "/plugins/vapi",
    icon: Mic,
  },
];

export const accountItems = [
  {
    title: "Plans and Billing",
    url: "/billing",
    icon: CreditCard,
  },
];

export const integrations = [
  {
    id: "html",
    title: "HTML",
    icon: "/languages/html5.svg",
  },
  {
    id: "react",
    title: "React",
    icon: "/languages/react.svg",
  },
  {
    id: "nextjs",
    title: "Next.js",
    icon: "/languages/nextjs.svg",
  },
  {
    id: "javascript",
    title: "JavaScript",
    icon: "/languages/javascript.svg",
  },
];

export type IntegrationId = (typeof integrations)[number]["id"];

export const HTML_SCRIPT = `<script src="http://localhost:3001/widget.js" data-organization-id="{{ORGANIZATION_ID}}"></script>`;
export const REACT_SCRIPT = `<script src="http://localhost:3001/widget.js" data-organization-id="{{ORGANIZATION_ID}}"></script>`;
export const NEXTJS_SCRIPT = `<script src="http://localhost:3001/widget.js" data-organization-id="{{ORGANIZATION_ID}}"></script>`;
export const JAVASCRIPT_SCRIPT = `<script src="http://localhost:3001/widget.js" data-organization-id="{{ORGANIZATION_ID}}"></script>`;
