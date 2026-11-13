import { ProcessStep } from "@/types";

export const ENGINEERING_PROCESS: ProcessStep[] = [
  {
    number: "01",
    phase: "PHASE 01 // DISCOVERY",
    title: "Discovery & Technical Feasibility",
    description:
      "We deconstruct your core product requirements, audit legacy bottlenecks, and evaluate architectural feasibility to construct an uncompromising technical roadmap.",
    deliverables: [
      "Technical Feasibility Matrix & Threat Model",
      "API & Schema Prototype Specification",
      "Infrastructure Sizing & Cost Projections",
      "Executive Engineering Milestone Roadmap",
    ],
    duration: "Week 1 - 2",
    icon: "Compass",
  },
  {
    number: "02",
    phase: "PHASE 02 // ARCHITECTURE",
    title: "Architecture & System Blueprinting",
    description:
      "Before writing production code, we model data schemas, design zero-trust security postures, draft interface contracts, and configure high-velocity staging environments.",
    deliverables: [
      "Distributed System Topology Diagram",
      "Interactive Figma Design Tokens & UI Wireframes",
      "Database ERD & Multi-Tenant Partitioning Model",
      "Fully Automated CI/CD Pipeline & Staging Cluster",
    ],
    duration: "Week 2 - 4",
    icon: "Layers",
  },
  {
    number: "03",
    phase: "PHASE 03 // AGILE BUILD",
    title: "High-Velocity Agile Engineering",
    description:
      "Cross-functional squads execute in tight 2-week sprints with automated testing, daily previews, and transparent code reviews directly in your private repositories.",
    deliverables: [
      "Bi-Weekly Production Deployments to Staging",
      "100% Type-Safe TypeScript / Python Codebases",
      "Comprehensive End-to-End & Unit Test Coverage",
      "Continuous Async Demo Videos & Progress Standups",
    ],
    duration: "Sprints (2-Week Iterations)",
    icon: "Cpu",
  },
  {
    number: "04",
    phase: "PHASE 04 // SCALE",
    title: "Deployment, Observability & Scale",
    description:
      "We orchestrate production rollouts with zero-downtime blue/green deployments, deep telemetry, automated load tests, and 24/7 autonomous monitoring swarms.",
    deliverables: [
      "Zero-Downtime Multi-Region Production Launch",
      "Distributed Tracing (OpenTelemetry + Datadog)",
      "High-Concurrency Chaos & Load Simulation Reports",
      "Comprehensive Engineering Runbooks & SLA Guarantee",
    ],
    duration: "Continuous Production Support",
    icon: "TrendingUp",
  },
];
