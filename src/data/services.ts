import { ServiceItem } from "@/types";

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "web-saas",
    category: "web",
    title: "Custom Web & SaaS Platforms",
    subtitle: "Enterprise-grade distributed web architectures",
    badge: "High-Concurrency Web Systems",
    description:
      "We design and build multi-tenant cloud SaaS platforms engineered for sub-second responses, horizontal auto-scaling, and mission-critical reliability.",
    features: [
      "Multi-tenant data isolation & RBAC models",
      "Real-time event streaming via WebSockets & gRPC",
      "Zero-downtime micro-frontend architectures",
      "Automated CI/CD pipelines with comprehensive test suites",
    ],
    metrics: {
      label: "Average System Availability",
      value: "99.99%",
    },
    technologies: ["Next.js", "TypeScript", "Node.js", "Go", "PostgreSQL", "Redis", "Kafka", "Docker"],
  },
  {
    id: "ai-agents",
    category: "ai",
    title: "AI Agents & Autonomous Automation",
    subtitle: "Production-ready LLM agents and neuro-symbolic pipelines",
    badge: "Autonomous Intelligence",
    description:
      "Transform business operations with goal-oriented AI agent swarms, fine-tuned domain models, RAG vector architectures, and automated reasoning pipelines.",
    features: [
      "Multi-agent tool orchestration (LangGraph / CrewAI)",
      "Hybrid RAG with dense vector search & re-ranking",
      "Enterprise data privacy & air-gapped LLM deployment",
      "Self-healing workflows with deterministic fallback checks",
    ],
    metrics: {
      label: "Operational Efficiency Boost",
      value: "4.8x",
    },
    technologies: ["Python", "FastAPI", "LangChain", "LlamaIndex", "pgvector", "vLLM", "OpenAI", "Anthropic"],
  },
  {
    id: "mobile-apps",
    category: "mobile",
    title: "Mobile App Development",
    subtitle: "Fluid, native performance across iOS and Android",
    badge: "Edge-Ready Mobile",
    description:
      "High-performance native and cross-platform mobile apps engineered with offline-first synchronization, local on-device ML inference, and 120 FPS animations.",
    features: [
      "Offline-first synchronization with conflict resolution",
      "On-device neural inference (CoreML & TensorFlow Lite)",
      "Secure biometric authentication & hardware encryption",
      "Micro-interaction UI with smooth gesture navigation",
    ],
    metrics: {
      label: "App Launch Cold Start",
      value: "<180ms",
    },
    technologies: ["React Native", "Flutter", "Swift", "Kotlin", "SQLite", "CoreML", "Firebase"],
  },
  {
    id: "ui-ux",
    category: "design",
    title: "UI/UX Product Engineering",
    subtitle: "Mathematical design systems & data-dense interfaces",
    badge: "Human-Centric Design",
    description:
      "We bridge the gap between Figma designs and production code with bespoke token-based design systems, responsive dark-mode layouts, and WCAG AAA compliance.",
    features: [
      "Full design system creation with token synchronization",
      "High-density data visualization & canvas rendering",
      "Strict WCAG 2.1 AA/AAA accessibility compliance",
      "Interactive micro-interactions with Framer Motion",
    ],
    metrics: {
      label: "User Task Completion Rate",
      value: "+42%",
    },
    technologies: ["Tailwind CSS", "Framer Motion", "Figma", "Radix UI", "D3.js", "Storybook"],
  },
];
