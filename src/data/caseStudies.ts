import { CaseStudy } from "@/types";

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "omniagent",
    title: "OmniAgent: Autonomous Enterprise Support Swarm",
    clientIndustry: "Enterprise DevOps & Cloud Infrastructure",
    category: "ai",
    categoryLabel: "AI & Autonomous Agents",
    tagline: "Deploying multi-agent swarms to resolve 82% of L1/L2 cloud incidents autonomously.",
    problem:
      "A global infrastructure company faced an overwhelming surge in tier-1/tier-2 cloud alert escalations, resulting in a 4.5-hour mean time to resolve (MTTR) and engineer burnout.",
    solution:
      "Handvance Technologies engineered an autonomous agent network using LangGraph and hybrid RAG. The agent queries telemetry, inspects logs, generates root-cause hypotheses, and safely executes rollback runbooks.",
    impactMetrics: [
      { label: "Incident MTTR", value: "7.2 min", sublabel: "Down from 4.5 hours" },
      { label: "Autonomous Resolution", value: "82.4%", sublabel: "Without human dispatch" },
      { label: "Queries Handled", value: "2.4M+", sublabel: "Monthly production scale" },
    ],
    techStack: ["Python", "FastAPI", "LangGraph", "pgvector", "Kubernetes", "Next.js"],
    mockupAccent: "cyan",
    architectureType: "Multi-Agent Consensus Network",
  },
  {
    id: "hyperscale",
    title: "HyperScale: Global Multi-Tenant FinTech Core",
    clientIndustry: "Cross-Border Payments & Treasury",
    category: "web",
    categoryLabel: "Custom Web & SaaS",
    tagline: "Ultra-low latency settlement engine processing millions in high-throughput ledger transactions.",
    problem:
      "Legacy monolithic banking infrastructure was bottlenecked at 350 transactions per second (TPS), suffering from locking deadlocks during peak global market openings.",
    solution:
      "Architected an event-driven distributed microservices ledger utilizing Go, Kafka event streams, and partitioned PostgreSQL clusters with zero-downtime blue/green deployment.",
    impactMetrics: [
      { label: "Peak Ledger TPS", value: "24,500", sublabel: "70x performance gain" },
      { label: "Ledger Settlement", value: "18ms", sublabel: "P99 sub-second speed" },
      { label: "Total Volume", value: "$4.8B+", sublabel: "Processed annually" },
    ],
    techStack: ["Next.js", "Go", "Apache Kafka", "PostgreSQL", "Redis", "Docker"],
    mockupAccent: "indigo",
    architectureType: "Distributed Event-Sourced Ledger",
  },
  {
    id: "healthpulse",
    title: "HealthPulse: Offline-First Clinical Edge Assistant",
    clientIndustry: "Healthcare & Emergency Response",
    category: "mobile",
    categoryLabel: "Mobile App Development",
    tagline: "Sub-50ms local on-device neural triage for emergency medical first responders in remote zones.",
    problem:
      "Emergency medical teams operating in remote or disaster zones frequently lost cellular connectivity, paralyzing their digital triage protocols and cloud-dependent records.",
    solution:
      "Built a military-grade offline-first mobile application featuring local SQLite CRDT synchronization and on-device CoreML / TFLite triage vision models running fully disconnected.",
    impactMetrics: [
      { label: "Offline Inference", value: "<45ms", sublabel: "Zero network dependency" },
      { label: "Field Accuracy", value: "99.1%", sublabel: "Validated across 60k trials" },
      { label: "Active Clinicians", value: "48,000+", sublabel: "Deployed worldwide" },
    ],
    techStack: ["React Native", "TypeScript", "CoreML", "SQLite", "Node.js", "AWS"],
    mockupAccent: "emerald",
    architectureType: "Local CRDT Sync + Edge Neural Engine",
  },
  {
    id: "synthflow",
    title: "SynthFlow: Generative 3D CAD Synthesis Platform",
    clientIndustry: "Industrial Robotics & Automation",
    category: "ai",
    categoryLabel: "AI & Distributed Systems",
    tagline: "Natural-language prompt to manufacturable STEP/B-rep CAD models in under 15 seconds.",
    problem:
      "Mechanical engineering teams spent an average of 38 hours modeling repetitive industrial bracket fixtures and parametric tool adapters for robotic arms.",
    solution:
      "Engineered a browser-based generative CAD suite featuring custom-trained geometric diffusion models, WebGL / Three.js real-time inspection, and automated finite element stress analysis.",
    impactMetrics: [
      { label: "Design Cycle Time", value: "-88%", sublabel: "From days to minutes" },
      { label: "Manufacturability", value: "99.6%", sublabel: "Zero FEA mesh errors" },
      { label: "Rendering Rate", value: "120 FPS", sublabel: "WebGL GPU-accelerated" },
    ],
    techStack: ["Next.js", "WebGL", "PyTorch", "Rust", "WebAssembly", "FastAPI"],
    mockupAccent: "violet",
    architectureType: "Hybrid WebAssembly + Neural Diffusion",
  },
  {
    id: "strata-cloud",
    title: "StrataCloud: Observability & Zero-Trust Governance",
    clientIndustry: "Cybersecurity & Regulated SaaS",
    category: "web",
    categoryLabel: "Custom Web & SaaS",
    tagline: "Unified security graph orchestrator mapping over 10M live cloud resource relationships.",
    problem:
      "Enterprise security teams had zero real-time visibility into cross-cloud IAM privilege escalation risks across AWS, GCP, and Azure estates.",
    solution:
      "Created an interactive dark-themed graph intelligence console powered by GraphQL, real-time Neo4j graph traversal, and automated policy-as-code enforcement pipelines.",
    impactMetrics: [
      { label: "Resource Graph", value: "10M+", sublabel: "Live interconnected nodes" },
      { label: "Query Latency", value: "<25ms", sublabel: "Multi-hop graph search" },
      { label: "Compliance Pass", value: "100%", sublabel: "SOC2 & ISO27001 ready" },
    ],
    techStack: ["Next.js", "TypeScript", "GraphQL", "Neo4j", "Golang", "Tailwind CSS"],
    mockupAccent: "indigo",
    architectureType: "Real-time Graph Mesh & Zero-Trust IAM",
  },
  {
    id: "neurotrack",
    title: "NeuroTrack: Edge Biometric Fleet Telematics",
    clientIndustry: "Autonomous Logistics & Transportation",
    category: "mobile",
    categoryLabel: "Mobile & Edge Systems",
    tagline: "Low-latency driver cognitive state detection running on ultra-compact in-cab edge devices.",
    problem:
      "Long-haul freight fleets experienced preventable safety incidents due to micro-sleep episodes and driver fatigue going undetected by legacy cabin cameras.",
    solution:
      "Developed a companion tablet application with infrared computer vision models predicting fatigue onset 12 minutes before physical symptoms manifest.",
    impactMetrics: [
      { label: "Incident Reduction", value: "94.2%", sublabel: "Validated over 12M miles" },
      { label: "Edge Power Draw", value: "<2.5W", sublabel: "Ultra-low thermal profile" },
      { label: "Fleet Vehicles", value: "15,400+", sublabel: "Equipped trucks" },
    ],
    techStack: ["Flutter", "TensorFlow Lite", "Dart", "C++", "MQTT", "AWS IoT Core"],
    mockupAccent: "cyan",
    architectureType: "Edge Computer Vision & Telematics MQTT",
  },
];
