import { Testimonial } from "@/types";

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "marcus-thorne",
    name: "Dr. Marcus Thorne",
    role: "Chief Technology Officer",
    company: "NexusMesh Cloud Systems",
    industry: "Cloud Infrastructure",
    quote:
      "Handvance didn't just build an AI agent; they architected an autonomous multi-agent swarm that cut our L1/L2 incident escalations by 78%. Their zero-downtime microservice design is the cleanest engineering work we've seen from an agency.",
    metric: {
      label: "Incident MTTR Reduced",
      value: "-78%",
    },
    highlightTech: "LangGraph + pgvector + Kubernetes",
  },
  {
    id: "elena-rostova",
    name: "Elena Rostova",
    role: "VP of Product Engineering",
    company: "Aetheria FinTech Labs",
    industry: "High-Frequency Payments",
    quote:
      "We needed to scale our distributed ledger from 350 TPS to over 20,000 TPS before global market rollout. Handvance delivered the new Go + Kafka event streaming core two weeks ahead of schedule with zero data regressions.",
    metric: {
      label: "Throughput Multiplier",
      value: "70x TPS",
    },
    highlightTech: "Go + Kafka + Partitioned PostgreSQL",
  },
  {
    id: "david-kim",
    name: "David Kim",
    role: "Head of Artificial Intelligence",
    company: "Vanguard Medical Dynamics",
    industry: "HealthTech & Diagnostics",
    quote:
      "Deploying medical neural models that function offline in remote clinics without cell connectivity seemed impossible until Handvance built our CRDT sync engine and edge CoreML runtime. It currently serves 48,000 clinicians daily.",
    metric: {
      label: "Offline Model Latency",
      value: "<45ms",
    },
    highlightTech: "React Native + SQLite CRDT + CoreML",
  },
  {
    id: "sarah-lindqvist",
    name: "Sarah Lindqvist",
    role: "Director of Software Architecture",
    company: "Strata Robotics International",
    industry: "Industrial Automation",
    quote:
      "The architectural discipline at Handvance Technologies is unmatched. Their strict TypeScript typing, automated CI/CD canary rollouts, and SOC2 compliance runbooks gave our board total confidence during our Series B audit.",
    metric: {
      label: "Audit Pass Rate",
      value: "100%",
    },
    highlightTech: "Next.js + GraphQL + Neo4j + Docker",
  },
];
