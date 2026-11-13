import { TechCategory } from "@/types";

export const TECH_CATEGORIES: TechCategory[] = [
  {
    title: "Modern Frontend & Client Systems",
    badge: "Interactive & Fluid",
    description: "High-density, type-safe interfaces optimized for 60-120 FPS render loops and sub-second paint times.",
    items: [
      { name: "Next.js (App Router)", level: "Production Standard", iconName: "Globe", color: "#38BDF8" },
      { name: "TypeScript", level: "Strict Type Safety", iconName: "Code2", color: "#3B82F6" },
      { name: "Tailwind CSS", level: "Design Tokens", iconName: "Palette", color: "#06B6D4" },
      { name: "Framer Motion", level: "Hardware Accelerated", iconName: "Sparkles", color: "#818CF8" },
      { name: "React Native & Flutter", level: "Universal Mobile", iconName: "Smartphone", color: "#38BDF8" },
      { name: "WebGL / Three.js", level: "Spatial & GPU 3D", iconName: "Box", color: "#34D399" },
    ],
  },
  {
    title: "AI & Autonomous Agent Orchestration",
    badge: "State of the Art",
    description: "Multi-agent workflows, vector retrieval architectures, and domain-tuned neural inference engines.",
    items: [
      { name: "LangGraph & CrewAI", level: "Multi-Agent Swarms", iconName: "Bot", color: "#06B6D4" },
      { name: "Python / PyTorch", level: "Model Engineering", iconName: "Cpu", color: "#F59E0B" },
      { name: "pgvector & Pinecone", level: "Vector Semantic Store", iconName: "Database", color: "#10B981" },
      { name: "vLLM & Ollama", level: "High-Throughput Inference", iconName: "Zap", color: "#EC4899" },
      { name: "LlamaIndex", level: "Advanced RAG Pipelines", iconName: "Search", color: "#A855F7" },
      { name: "Claude & GPT-4o APIs", level: "Frontier Foundation", iconName: "BrainCircuit", color: "#6366F1" },
    ],
  },
  {
    title: "Distributed Backend & Event Meshes",
    badge: "Zero-Downtime Core",
    description: "Resilient concurrent backends engineered for horizontal scale, distributed transactions, and low latencies.",
    items: [
      { name: "Go (Golang)", level: "Microsecond Latency", iconName: "Terminal", color: "#06B6D4" },
      { name: "FastAPI / Node.js", level: "High Concurrency", iconName: "Server", color: "#34D399" },
      { name: "PostgreSQL & Citus", level: "ACID Relational Core", iconName: "HardDrive", color: "#3B82F6" },
      { name: "Apache Kafka", level: "Distributed Event Mesh", iconName: "Share2", color: "#EF4444" },
      { name: "Redis Cluster", level: "Sub-Millisecond Cache", iconName: "Layers", color: "#F43F5E" },
      { name: "Rust & WebAssembly", level: "Near-Metal Performance", iconName: "Shield", color: "#F97316" },
    ],
  },
  {
    title: "Cloud Infrastructure, Security & DevOps",
    badge: "Multi-Region Cloud",
    description: "Declarative infrastructure as code, zero-trust security perimeter, and comprehensive distributed tracing.",
    items: [
      { name: "Kubernetes (EKS/GKE)", level: "Container Orchestration", iconName: "Boxes", color: "#3B82F6" },
      { name: "Terraform & Pulumi", level: "Declarative IaC", iconName: "FileCode", color: "#8B5CF6" },
      { name: "Docker & OCI", level: "Standard Containerization", iconName: "Box", color: "#0EA5E9" },
      { name: "AWS & GCP Cloud", level: "Multi-Zone Resilience", iconName: "Cloud", color: "#F59E0B" },
      { name: "OpenTelemetry", level: "Distributed Telemetry", iconName: "Activity", color: "#10B981" },
      { name: "GitHub Actions CI/CD", level: "Automated Deployments", iconName: "GitBranch", color: "#94A3B8" },
    ],
  },
];
