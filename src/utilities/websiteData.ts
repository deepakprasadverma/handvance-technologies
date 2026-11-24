import { 
  ServiceDefinition, 
  PortfolioProject, 
  TeamMember, 
  JobOpening, 
  Testimonial, 
  ProcessStep 
} from "@/types";

/**
 * 12 Core Services of Handvance Technologies
 */
export const SERVICES_DATA: ServiceDefinition[] = [
  {
    id: "website-development",
    slug: "website-development",
    title: "Website Development",
    shortDescription: "High-performance, ultra-responsive corporate websites engineered for conversion, speed, and brand authority.",
    fullDescription: "We engineer modern, responsive, and SEO-optimized corporate websites tailored to elevate brand authority and drive customer conversions. Built using modern static generation, edge caching, and semantic standards, our websites achieve 95+ Google Lighthouse scores across performance and accessibility.",
    iconName: "Globe",
    category: "Web & Applications",
    features: [
      "Modern Next.js & React static generation with edge caching",
      "Pixel-perfect responsive design across mobile, tablet, and desktop",
      "Headless CMS integration (Sanity, Contentful, Strapi)",
      "High-speed Core Web Vitals optimization (sub-second load times)",
      "Accessible, WCAG 2.1 AA compliant markup and interactive components"
    ],
    deliverables: ["Custom Design System", "Production-Ready Source Code", "CMS Integration", "Speed & Security Audit Report"],
    techStack: ["Next.js", "React", "Tailwind CSS", "TypeScript", "Vercel", "Headless CMS"]
  },
  {
    id: "web-application-development",
    slug: "web-application-development",
    title: "Web Application Development",
    shortDescription: "Complex, scalable SaaS platforms and web portals with high-concurrency architectures and intuitive UX.",
    fullDescription: "From dynamic B2B SaaS platforms to high-throughput client portals, we build mission-critical web applications with robust state management, resilient backend APIs, and enterprise authentication. Our applications are engineered to handle millions of transactions securely.",
    iconName: "Layout",
    category: "Web & Applications",
    features: [
      "Single-page & server-rendered interactive SaaS architectures",
      "Role-based access control (RBAC), SSO, and OAuth2 security",
      "Real-time data synchronization with WebSockets and event streams",
      "Automated CI/CD deployment pipelines and comprehensive test suites",
      "Microservices and modular frontend component architectures"
    ],
    deliverables: ["Full-Stack SaaS Platform", "RESTful & GraphQL APIs", "Database Schemas", "System Architecture Diagrams"],
    techStack: ["React", "Next.js", "Node.js", "PostgreSQL", "Redis", "Docker", "GraphQL"]
  },
  {
    id: "mobile-app-development",
    slug: "mobile-app-development",
    title: "Mobile App Development",
    shortDescription: "Native and cross-platform iOS & Android mobile applications with fluid 60 FPS performance and offline sync.",
    fullDescription: "We craft high-performance mobile applications for iOS and Android that users love. Leveraging React Native, Flutter, and native toolchains, we deliver buttery 60 FPS UI experiences, biometric security, push notifications, and resilient offline-first data synchronization.",
    iconName: "Smartphone",
    category: "Mobile & Software",
    features: [
      "Cross-platform efficiency with React Native and Flutter",
      "Biometric security (FaceID/Fingerprint) and device hardware integration",
      "Offline-first synchronization with local SQLite/WatermelonDB storage",
      "Native push notification workflows and real-time alerts",
      "End-to-end App Store and Google Play deployment management"
    ],
    deliverables: ["iOS & Android Production Binaries", "App Store Compliance Check", "API Gateway Integration", "Mobile Analytics Setup"],
    techStack: ["React Native", "Flutter", "TypeScript", "Swift", "Kotlin", "Firebase"]
  },
  {
    id: "software-development",
    slug: "software-development",
    title: "Software Development",
    shortDescription: "Enterprise-grade backend architectures, distributed microservices, and high-throughput computational engines.",
    fullDescription: "We architect, build, and modernize custom enterprise software solutions designed for high reliability, fault tolerance, and computational throughput. Our engineering practices follow domain-driven design, clean architecture, and automated test-driven development.",
    iconName: "Code",
    category: "Mobile & Software",
    features: [
      "Distributed microservices and event-driven architectures",
      "High-throughput transactional databases and distributed caching",
      "Legacy system modernization and zero-downtime cloud migration",
      "Enterprise security compliance and comprehensive data governance",
      "Automated unit, integration, and load testing suites"
    ],
    deliverables: ["Microservices Architecture", "Dockerized Containers", "Database Migration Scripts", "Technical Documentation"],
    techStack: ["Node.js", "Python", "Go", "PostgreSQL", "Kafka", "Docker", "Kubernetes"]
  },
  {
    id: "ui-ux-design",
    slug: "ui-ux-design",
    title: "UI/UX Design",
    shortDescription: "Human-centered digital product design, interactive wireframing, and scalable design systems.",
    fullDescription: "We bridge customer psychology and interface design to craft intuitive, beautiful digital experiences. Our design practice covers user research, wireframing, interactive prototyping, usability testing, and complete component design systems that accelerate development.",
    iconName: "Palette",
    category: "Design & Creative",
    features: [
      "User research, persona mapping, and customer journey orchestration",
      "Low-fidelity wireframing and high-fidelity interactive Figma prototypes",
      "Comprehensive multi-platform design systems and token libraries",
      "Micro-interaction and motion design for heightened engagement",
      "Usability testing, heuristic evaluations, and accessibility checks"
    ],
    deliverables: ["Figma Design System", "Interactive Prototypes", "Design Token Specs", "User Research Insights"],
    techStack: ["Figma", "FigJam", "Tailwind Tokens", "Framer", "Adobe Creative Suite"]
  },
  {
    id: "ecommerce-development",
    slug: "ecommerce-development",
    title: "E-commerce Development",
    shortDescription: "High-converting headless digital storefronts, custom checkout funnels, and unified multi-channel inventory.",
    fullDescription: "We build scalable, high-converting e-commerce platforms using headless architectures like Shopify Plus, Medusa, and custom Next.js storefronts. With sub-second load times, one-click checkout flows, and automated ERP/inventory integrations, we maximize merchant revenue.",
    iconName: "ShoppingBag",
    category: "Web & Applications",
    features: [
      "Headless storefronts with Shopify Plus, MedusaJS, and Stripe",
      "Custom checkout pipelines, coupon logic, and multi-currency support",
      "Real-time inventory synchronization with ERP and logistics providers",
      "Search personalization and AI-assisted product recommendation",
      "Conversion rate optimization (CRO) and cart abandonment recovery"
    ],
    deliverables: ["Production Storefront", "Payment Gateway Integration", "Inventory Sync Pipeline", "Analytics & Conversion Dashboard"],
    techStack: ["Shopify Plus", "Next.js", "Stripe API", "MedusaJS", "Tailwind CSS", "Algolia"]
  },
  {
    id: "digital-marketing",
    slug: "digital-marketing",
    title: "Digital Marketing",
    shortDescription: "Data-driven growth strategies, targeted multichannel acquisition, and conversion funnel optimization.",
    fullDescription: "Accelerate your customer acquisition with our data-driven digital marketing programs. We combine technical performance tracking, targeted multi-channel ad campaigns (Google, Meta, LinkedIn), and conversion rate experiments to yield measurable ROI for tech brands.",
    iconName: "TrendingUp",
    category: "Growth & Marketing",
    features: [
      "Precision multi-channel paid acquisition (Google Ads, LinkedIn, Meta)",
      "Full-funnel analytics setup with Google Analytics 4 and custom attribution",
      "Conversion Rate Optimization (CRO) with A/B and multivariate tests",
      "Automated lifecycle email nurturing and retention campaigns",
      "Real-time ROI, CPA, and LTV reporting dashboards"
    ],
    deliverables: ["Growth Strategy Roadmap", "Paid Ad Campaigns", "GA4 Attribution Setup", "Monthly Performance Reports"],
    techStack: ["Google Analytics 4", "Google Ads", "Meta Ads Manager", "Mixpanel", "HubSpot"]
  },
  {
    id: "seo-optimization",
    slug: "seo-optimization",
    title: "SEO Optimization",
    shortDescription: "Technical search engine optimization, content strategy, and authoritative organic visibility.",
    fullDescription: "Dominate search engine rankings with our deep technical SEO and search authority strategies. We diagnose crawl errors, optimize Core Web Vitals, implement structured schema data, and execute keyword targeting to systematically grow high-intent organic traffic.",
    iconName: "Search",
    category: "Growth & Marketing",
    features: [
      "Deep technical crawl audits, indexation fixes, and schema markup",
      "Core Web Vitals remediation (LCP, INP, CLS optimization)",
      "High-intent keyword research and competitor topical mapping",
      "Content optimization for AI search overviews and search generative engines",
      "Ethical backlink acquisition and domain authority enhancement"
    ],
    deliverables: ["Comprehensive SEO Audit", "Schema Architecture", "Keyword Strategy Matrix", "Rank Tracking Dashboard"],
    techStack: ["Ahrefs", "SEMrush", "Google Search Console", "Screaming Frog", "Schema.org"]
  },
  {
    id: "branding-graphic-design",
    slug: "branding-graphic-design",
    title: "Branding and Graphic Design",
    shortDescription: "Memorable corporate brand identities, visual language guidelines, vector iconography, and marketing collateral.",
    fullDescription: "Build a lasting emotional connection with your audience through an unforgettable visual identity. We craft complete brand ecosystems—including logo design, color theory, typography hierarchy, marketing decks, and collateral that command respect in your market.",
    iconName: "Sparkles",
    category: "Design & Creative",
    features: [
      "Distinctive vector logo suites (primary, secondary, favicon, monograms)",
      "Comprehensive brand style guide with strict color, font, and spacing rules",
      "Custom vector iconography and 3D illustration assets",
      "Investor pitch deck, one-pager, and corporate stationery templates",
      "Social media asset kits and banner templates for all platforms"
    ],
    deliverables: ["Brand Identity Book", "Vector Logo Package", "Pitch Deck Template", "Social Media Asset Kit"],
    techStack: ["Figma", "Adobe Illustrator", "Photoshop", "After Effects", "Blender"]
  },
  {
    id: "it-consulting",
    slug: "it-consulting",
    title: "IT Consulting",
    shortDescription: "Strategic technology roadmapping, cloud architecture reviews, security posture audits, and digital transformation.",
    fullDescription: "Make strategic, high-confidence technology investments with guidance from our seasoned architects. We evaluate your current systems, define cloud modernization roadmaps, audit cybersecurity compliance, and help leadership select the optimal tech stack for scalability.",
    iconName: "Compass",
    category: "Enterprise & Advisory",
    features: [
      "Technology stack audit, scalability assessments, and vendor evaluations",
      "Multi-year cloud migration and digital transformation roadmapping",
      "Cybersecurity risk posture, SOC2 readiness, and compliance reviews",
      "Engineering team process optimization and agile velocity audits",
      "Fractional CTO and executive advisory services"
    ],
    deliverables: ["Technology Roadmap", "Cloud Architecture Blueprint", "Security Gap Analysis", "Executive Presentation"],
    techStack: ["AWS", "Google Cloud", "Azure", "Terraform", "Enterprise Architecture Patterns"]
  },
  {
    id: "website-maintenance",
    slug: "website-maintenance",
    title: "Website Maintenance",
    shortDescription: "Proactive uptime monitoring, security patching, dependency updates, automated backups, and 24/7 technical support.",
    fullDescription: "Ensure your digital assets remain secure, fast, and constantly available with our managed website maintenance plans. We provide 24/7 uptime monitoring, weekly security vulnerability patching, automated off-site backups, and guaranteed emergency SLA response times.",
    iconName: "ShieldCheck",
    category: "Enterprise & Advisory",
    features: [
      "24/7 synthetic uptime monitoring and instant incident notification",
      "Continuous dependency updates and critical zero-day vulnerability patching",
      "Daily encrypted cloud backups with one-click disaster recovery",
      "Performance regression testing and speed score maintenance",
      "Dedicated monthly engineering support hours for feature enhancements"
    ],
    deliverables: ["24/7 Monitoring Dashboard", "Monthly Health Report", "Disaster Recovery Runbook", "Dedicated Slack Channel"],
    techStack: ["Datadog", "Sentry", "GitHub Actions", "Vercel", "AWS S3 Backup"]
  },
  {
    id: "custom-it-solutions",
    slug: "custom-it-solutions",
    title: "Custom IT Solutions",
    shortDescription: "Bespoke automation pipelines, legacy system integrations, proprietary algorithms, and intelligent AI agents.",
    fullDescription: "When off-the-shelf software falls short, we engineer custom IT solutions tailored to your exact operational workflows. From autonomous AI agent pipelines and custom ERP connectors to proprietary data ingest engines, we solve complex enterprise challenges cleanly.",
    iconName: "Cpu",
    category: "Enterprise & Advisory",
    features: [
      "Autonomous AI agents and LLM orchestration (RAG, vector embeddings)",
      "Bespoke ERP, CRM, and legacy database bidirectional connectors",
      "High-speed data ingestion and event stream processing",
      "Automated document parsing, extraction, and validation workflows",
      "Custom hardware-software bridges and IoT telemetry ingestion"
    ],
    deliverables: ["Custom Software System", "API Connectors & Webhooks", "Deployment Automation Scripts", "Admin Console"],
    techStack: ["Python", "LangChain", "Node.js", "Docker", "PostgreSQL", "Kafka", "AWS"]
  }
];

/**
 * Flagship Portfolio Projects
 */
export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: "apexflow-fintech",
    slug: "apexflow-fintech",
    title: "ApexFlow Financial Engine",
    clientIndustry: "Financial Technology & Banking",
    category: "Web & SaaS",
    tagline: "High-throughput cloud ledger and automated payment orchestration platform.",
    summary: "ApexFlow required a resilient, sub-100ms payment routing engine capable of reconciling millions of multi-currency cross-border transactions while adhering to strict PCI-DSS Level 1 compliance.",
    challenge: "The client's existing monolithic ledger suffered from database lock contention during peak settlement windows, leading to delayed payment settlements and high infrastructure expenses.",
    solution: "We re-architected the core system into an event-driven microservices architecture using Go, Kafka, and PostgreSQL with partition sharding. We delivered a real-time reactive dashboard for treasury analysts in Next.js and Tailwind CSS.",
    keyFeatures: [
      "Sub-100ms automated transaction clearing and multi-currency exchange",
      "Event-driven Kafka message queue preventing lock contention",
      "PCI-DSS Level 1 audit trail with immutable SHA-256 ledger logging",
      "Reactive treasury management dashboard with live WebSocket telemetry"
    ],
    results: [
      "99.999% platform uptime achieved across continuous operation",
      "78% reduction in cross-border transaction settlement latency",
      "Processed over $450M in simulated transaction volume seamlessly"
    ],
    metrics: [
      { label: "Settlement Latency", value: "<85ms" },
      { label: "System Uptime", value: "99.999%" },
      { label: "Throughput", value: "12,000 TPS" },
      { label: "Cost Reduction", value: "42%" }
    ],
    technologies: ["Next.js", "TypeScript", "Node.js", "Kafka", "PostgreSQL", "Docker", "AWS"],
    featured: true,
    liveDemoUrl: "/portfolio/apexflow-fintech",
    accentColor: "#13CDEB"
  },
  {
    id: "omnicare-health-ai",
    slug: "omnicare-health-ai",
    title: "OmniCare AI Clinical Assistant",
    clientIndustry: "Healthcare & Digital Health",
    category: "AI & Systems",
    tagline: "HIPAA-compliant autonomous clinical notes synthesis and triage copilot.",
    summary: "OmniCare partners with health networks to eliminate clinician documentation burnout through intelligent audio transcription, clinical entity extraction, and automated EHR integration.",
    challenge: "Physicians spent upwards of 2.5 hours per shift writing documentation, leading to provider fatigue and transcription errors in patient records.",
    solution: "Handvance Technologies designed and implemented a secure, HIPAA-compliant AI pipeline utilizing local fine-tuned LLMs with RAG retrieval. Doctors review structured SOAP notes synthesized within seconds of a consultation.",
    keyFeatures: [
      "HIPAA-compliant end-to-end encrypted voice-to-text pipeline",
      "Automated SOAP note generation and FHIR medical record mapping",
      "Doctor-in-the-loop validation interface with one-click EHR sync",
      "Zero-data-retention AI inference endpoints with hardware security modules"
    ],
    results: [
      "2.2 hours saved per clinician per shift on administrative charting",
      "94% physician adoption rate across pilot hospital departments",
      "Zero compliance infractions or unencrypted data leaks"
    ],
    metrics: [
      { label: "Hours Saved / Day", value: "2.2 hrs" },
      { label: "Documentation Speed", value: "4x Faster" },
      { label: "Compliance", value: "HIPAA Certified" },
      { label: "Provider Satisfaction", value: "96%" }
    ],
    technologies: ["Python", "FastAPI", "React", "Tailwind CSS", "LangChain", "PostgreSQL", "AWS Bedrock"],
    featured: true,
    liveDemoUrl: "/portfolio/omnicare-health-ai",
    accentColor: "#3B82F6"
  },
  {
    id: "hyperretail-headless",
    slug: "hyperretail-headless",
    title: "HyperRetail Headless Commerce",
    clientIndustry: "E-Commerce & Global Retail",
    category: "E-Commerce",
    tagline: "Ultra-fast headless omnichannel storefront with localized international checkout.",
    summary: "HyperRetail operates premium apparel brands worldwide and required a unified, high-speed digital storefront capable of sub-second load times and global currency localization.",
    challenge: "Their previous legacy platform took 4.8 seconds to load on mobile, resulting in high shopping cart abandonment and poor international search visibility.",
    solution: "We engineered a headless e-commerce platform using Next.js App Router, MedusaJS, and Stripe Connect. Global edge distribution and incremental static regeneration reduced page loads to under 600ms worldwide.",
    keyFeatures: [
      "Sub-600ms mobile page load times powered by Vercel Edge caching",
      "Multi-currency localization with dynamic tax calculation in 38 countries",
      "One-click Apple Pay, Google Pay, and Klarna checkout integration",
      "Unified inventory sync across 14 global fulfillment warehouses"
    ],
    results: [
      "34% lift in mobile checkout conversion rate within 90 days",
      "87% faster average initial page load across global regions",
      "Zero downtime recorded during peak Black Friday flash sales"
    ],
    metrics: [
      { label: "Page Load Time", value: "540ms" },
      { label: "Mobile Conversion", value: "+34%" },
      { label: "Global Regions", value: "38 Countries" },
      { label: "Cart Abandonment", value: "-22%" }
    ],
    technologies: ["Next.js", "React", "MedusaJS", "Stripe API", "Tailwind CSS", "Redis", "Vercel"],
    featured: true,
    liveDemoUrl: "/portfolio/hyperretail-headless",
    accentColor: "#101D36"
  },
  {
    id: "syncpulse-mobile-field",
    slug: "syncpulse-mobile-field",
    title: "SyncPulse Field Operations App",
    clientIndustry: "Renewable Energy & Utilities",
    category: "Mobile Apps",
    tagline: "Offline-first cross-platform mobile suite for remote turbine inspection engineers.",
    summary: "SyncPulse provides field telemetry and inspection management for industrial wind turbine technicians operating in remote offshore and desert environments without reliable cellular connectivity.",
    challenge: "Field engineers regularly lost inspection logs and sensor calibrations when network signals dropped, resulting in costly repeat site inspections.",
    solution: "We engineered an offline-first React Native mobile application utilizing SQLite local storage with dynamic conflict-resolution algorithms that seamlessly sync once network connection resumes.",
    keyFeatures: [
      "100% offline data entry with automated biometric device security",
      "Deterministic CRDT conflict resolution engine on network sync",
      "High-resolution image compression with geolocation metadata tagging",
      "Interactive 3D turbine component diagnostics viewer"
    ],
    results: [
      "Eliminated 100% of field data loss incidents during remote operations",
      "Reduced routine inspection reporting cycle from 4 days to 15 minutes",
      "Deployed to 1,200+ technicians across North America and Europe"
    ],
    metrics: [
      { label: "Data Loss Incidents", value: "0%" },
      { label: "Reporting Velocity", value: "16x Faster" },
      { label: "Offline Availability", value: "100%" },
      { label: "Active Field Users", value: "1,200+" }
    ],
    technologies: ["React Native", "TypeScript", "SQLite", "Node.js", "AWS S3", "GraphQL"],
    featured: false,
    liveDemoUrl: "/portfolio/syncpulse-mobile-field",
    accentColor: "#06B6D4"
  },
  {
    id: "neurologistics-supply-chain",
    slug: "neurologistics-supply-chain",
    title: "NeuroLogistics Predictive Routing",
    clientIndustry: "Logistics & Supply Chain",
    category: "AI & Systems",
    tagline: "Real-time fleet telemetry and AI-driven dynamic freight dispatch system.",
    summary: "A global logistics provider needed an automated dispatch engine capable of routing 4,000+ freight haulers while factoring in weather disruptions, fuel prices, and driver rest mandates.",
    challenge: "Manual dispatching caused dispatch bottlenecks, empty backhauls, and excessive fuel consumption across interstate transit routes.",
    solution: "Handvance built an automated optimization microservice pairing GPS stream ingestion with mathematical constraint solvers to generate optimal route plans dynamically.",
    keyFeatures: [
      "Real-time GPS telemetry ingestion processing 50,000 updates/sec",
      "Constraint-based routing engine optimizing for fuel and driving regulations",
      "Interactive driver companion app with turn-by-turn dispatch alerts",
      "Predictive delay forecasting alerting depot managers 3 hours in advance"
    ],
    results: [
      "19% reduction in monthly diesel fuel expenditure across fleet",
      "Decreased empty backhaul miles by 28%",
      "Increased on-time freight deliveries to 97.4%"
    ],
    metrics: [
      { label: "Fuel Cost Saved", value: "19%" },
      { label: "Telemetry Stream", value: "50k/sec" },
      { label: "On-Time Deliveries", value: "97.4%" },
      { label: "Empty Miles Cut", value: "-28%" }
    ],
    technologies: ["Python", "FastAPI", "React", "Mapbox GL", "PostGIS", "Redis", "Docker"],
    featured: false,
    liveDemoUrl: "/portfolio/neurologistics-supply-chain",
    accentColor: "#101D36"
  },
  {
    id: "securevault-identity",
    slug: "securevault-identity",
    title: "SecureVault Zero-Trust Gateway",
    clientIndustry: "Cybersecurity & Enterprise IT",
    category: "Custom Software",
    tagline: "Enterprise single sign-on, conditional access, and automated compliance auditing.",
    summary: "SecureVault delivers zero-trust network access and identity governance for enterprise teams managing confidential data across multi-cloud environments.",
    challenge: "A fast-growing enterprise needed to centralize access control across 60+ internal cloud apps while preparing for strict SOC2 Type II and ISO 27001 audits.",
    solution: "We engineered a centralized identity gateway supporting SAML 2.0, OpenID Connect, and hardware token FIDO2 authentication with automated least-privilege role assignment.",
    keyFeatures: [
      "Universal SAML/OIDC single sign-on and SCIM user provisioning",
      "Hardware-enforced FIDO2 / WebAuthn biometric security standards",
      "Continuous behavioral anomaly detection flagging high-risk sessions",
      "Automated compliance log generation for SOC2 and ISO 27001 auditors"
    ],
    results: [
      "Successfully passed SOC2 Type II audit with zero non-conformities",
      "Cut employee onboarding access provisioning time from 3 days to 4 minutes",
      "Secured access for 8,500 enterprise users across 12 countries"
    ],
    metrics: [
      { label: "Audit Result", value: "100% Clean" },
      { label: "Provisioning Speed", value: "4 Minutes" },
      { label: "Active Identities", value: "8,500+" },
      { label: "Security Incidents", value: "0" }
    ],
    technologies: ["Go", "Node.js", "React", "Tailwind CSS", "Redis", "PostgreSQL", "HashiCorp Vault"],
    featured: false,
    liveDemoUrl: "/portfolio/securevault-identity",
    accentColor: "#13CDEB"
  }
];

/**
 * Handvance Technologies Team Data
 */
export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "alex-chen",
    name: "Alex Chen",
    role: "Chief Technology Officer & Co-Founder",
    department: "Leadership",
    bio: "Former Principal Distributed Systems Architect with 14+ years architecting high-scale cloud platforms, event-driven engines, and resilient enterprise applications.",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    skills: ["Cloud Architecture", "Distributed Systems", "Kubernetes", "Strategic Roadmaps"],
    socialLinks: {
      linkedin: "https://linkedin.com",
      github: "https://github.com",
      twitter: "https://twitter.com"
    }
  },
  {
    id: "elena-rostova",
    name: "Elena Rostova",
    role: "VP of Product Engineering",
    department: "Engineering",
    bio: "Specializes in high-velocity full-stack engineering, frontend performance, and micro-frontend architectures for enterprise SaaS solutions.",
    avatarUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80",
    skills: ["React / Next.js", "TypeScript", "Design Systems", "Engineering Management"],
    socialLinks: {
      linkedin: "https://linkedin.com",
      github: "https://github.com"
    }
  },
  {
    id: "marcus-vance",
    name: "Marcus Vance",
    role: "Head of AI & Machine Learning",
    department: "AI & Cloud",
    bio: "Ph.D. in Computer Science with a focus on natural language understanding, RAG retrieval architectures, and autonomous multi-agent pipelines.",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    skills: ["LLM Orchestration", "Python", "Vector Databases", "Model Fine-Tuning"],
    socialLinks: {
      linkedin: "https://linkedin.com",
      github: "https://github.com",
      twitter: "https://twitter.com"
    }
  },
  {
    id: "sophia-martinez",
    name: "Sophia Martinez",
    role: "Director of UI/UX & Design Systems",
    department: "Product & Design",
    bio: "Passionate about human-centered design, micro-interactions, and creating cohesive multi-platform design tokens that scale gracefully.",
    avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
    skills: ["UI/UX Architecture", "Figma Design Systems", "User Research", "Interaction Design"],
    socialLinks: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com"
    }
  },
  {
    id: "devon-brooks",
    name: "Devon Brooks",
    role: "Principal Cloud & DevOps Architect",
    department: "AI & Cloud",
    bio: "Veteran Infrastructure Engineer focused on zero-trust security postures, Terraform infrastructure-as-code, and resilient automated CI/CD pipelines.",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
    skills: ["AWS / GCP", "Terraform", "Docker", "Zero-Trust Security"],
    socialLinks: {
      linkedin: "https://linkedin.com",
      github: "https://github.com"
    }
  },
  {
    id: "priya-patel",
    name: "Priya Patel",
    role: "Lead Mobile Solutions Architect",
    department: "Engineering",
    bio: "Pioneering cross-platform mobile experiences with React Native and native iOS/Android modules, delivering buttery smooth offline-first apps.",
    avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80",
    skills: ["React Native", "Flutter", "Offline Sync", "App Store Operations"],
    socialLinks: {
      linkedin: "https://linkedin.com",
      github: "https://github.com"
    }
  }
];

/**
 * Open Job Roles for /careers
 */
export const CAREERS_DATA: JobOpening[] = [
  {
    id: "senior-fullstack-engineer",
    slug: "senior-fullstack-engineer",
    title: "Senior Full-Stack Engineer (Next.js & Node.js)",
    department: "Engineering",
    location: "Remote (Global) / San Francisco Hybrid",
    type: "Full-Time",
    experience: "Senior",
    summary: "Join our core product delivery team to architect, develop, and deploy scalable SaaS platforms and high-throughput web applications for enterprise clients.",
    responsibilities: [
      "Architect and build responsive, accessible web applications using Next.js App Router and TypeScript",
      "Design clean RESTful and GraphQL APIs with Node.js and PostgreSQL backends",
      "Write comprehensive automated unit and end-to-end test suites",
      "Collaborate directly with product designers, AI specialists, and client stakeholders"
    ],
    requirements: [
      "5+ years of production experience with TypeScript, React, and modern Node.js",
      "Demonstrated experience with relational databases (PostgreSQL) and caching (Redis)",
      "Strong understanding of web performance, Core Web Vitals, and accessibility",
      "Excellent communication and asynchronous collaboration skills"
    ],
    benefits: [
      "Competitive compensation package with equity options",
      "100% remote-first flexibility with home office equipment stipend",
      "Comprehensive medical, dental, and vision insurance",
      "Annual $2,500 learning & development stipend"
    ]
  },
  {
    id: "lead-ai-engineer",
    slug: "lead-ai-engineer",
    title: "Lead AI & Intelligent Systems Engineer",
    department: "AI & Machine Learning",
    location: "Remote (Global)",
    type: "Full-Time",
    experience: "Lead / Staff",
    summary: "Lead the design and implementation of production AI solutions, retrieval-augmented generation (RAG) systems, and autonomous agent orchestration pipelines.",
    responsibilities: [
      "Design enterprise-grade RAG retrieval pipelines and agentic reasoning workflows",
      "Implement vector embeddings, semantic search, and prompt optimization layers",
      "Benchmark model accuracy, latency, and token cost economics across leading foundation models",
      "Ensure robust security, privacy compliance, and guardrails for client data"
    ],
    requirements: [
      "4+ years building production machine learning or NLP systems in Python",
      "Deep working knowledge of modern LLM APIs, LangChain, LlamaIndex, and Vector DBs",
      "Experience optimizing inference latency and dockerized model deployments",
      "Track record of shipping customer-facing AI features with high reliability"
    ],
    benefits: [
      "Competitive compensation package with equity options",
      "Access to state-of-the-art GPU compute and modern toolchains",
      "Comprehensive health and wellness benefits",
      "Flexible PTO policy"
    ]
  },
  {
    id: "senior-ui-ux-designer",
    slug: "senior-ui-ux-designer",
    title: "Senior UI/UX Product Designer",
    department: "Product & Design",
    location: "Remote (Global)",
    type: "Full-Time",
    experience: "Senior",
    summary: "Craft world-class digital product experiences, interactive design systems, and intuitive user workflows for complex enterprise and consumer software.",
    responsibilities: [
      "Lead end-to-end design from user research and wireframing to high-fidelity Figma prototypes",
      "Maintain and scale our reusable multi-brand design tokens and Figma component libraries",
      "Work closely with frontend engineers to ensure pixel-perfect fidelity in production",
      "Conduct user interviews and synthesize feedback into actionable product enhancements"
    ],
    requirements: [
      "4+ years designing production web and mobile software with a strong portfolio",
      "Mastery of Figma, component variants, auto-layout, and interactive prototyping",
      "Understanding of HTML/CSS capabilities and design system tokens",
      "Strong aesthetic sensibility coupled with analytical problem-solving"
    ],
    benefits: [
      "Competitive salary and top-tier benefits",
      "Latest Apple M-series hardware and software tooling of your choice",
      "Generous conference and continuous education budget",
      "Flexible global hours"
    ]
  },
  {
    id: "cloud-devops-architect",
    slug: "cloud-devops-architect",
    title: "Cloud & DevOps Infrastructure Architect",
    department: "DevOps & Cloud",
    location: "Remote (Global)",
    type: "Full-Time",
    experience: "Senior",
    summary: "Own our multi-cloud deployment topologies, infrastructure-as-code automation, Kubernetes clusters, and zero-trust security postures.",
    responsibilities: [
      "Author reproducible Terraform configurations for AWS and GCP environments",
      "Maintain automated CI/CD deployment pipelines with zero-downtime rollouts",
      "Establish observability, distributed tracing, and automated alert runbooks",
      "Conduct security posture assessments and compliance audit preparations (SOC2, ISO 27001)"
    ],
    requirements: [
      "5+ years administering cloud infrastructure (AWS/GCP) using Terraform or OpenTofu",
      "Expertise with container orchestration (Docker, Kubernetes) and CI/CD tools (GitHub Actions)",
      "Deep familiarity with networking, DNS, load balancers, and TLS encryption",
      "Strong scripting abilities in Bash, Python, or Go"
    ],
    benefits: [
      "Top-tier compensation and performance bonuses",
      "Remote-first autonomy and flexible schedule",
      "Full health, dental, and wellness coverage",
      "Dedicated continuous learning budget"
    ]
  }
];

/**
 * 4-Step Engineering Work Process
 */
export const WORK_PROCESS: ProcessStep[] = [
  {
    step: "01",
    title: "Discovery & Strategy",
    subtitle: "Aligning Business Goals with Technical Viability",
    description: "We conduct deep technical discovery workshops to dissect your business requirements, define user personas, map core data flows, and establish measurable project milestones.",
    keyDeliverables: ["Technical Requirements Specification (TRS)", "System Architecture Blueprint", "Scope & Budget Milestone Plan", "Security & Compliance Checklist"],
    iconName: "Search"
  },
  {
    step: "02",
    title: "Architecture & Design",
    subtitle: "High-Fidelity Wireframes & Cloud Blueprints",
    description: "Our architects and designers produce interactive Figma prototypes and scalable database schemas. We validate user journeys and test architectural assumptions prior to writing code.",
    keyDeliverables: ["Interactive Figma Prototype", "Design System Component Tokens", "Entity Relationship Diagrams (ERD)", "API Contract Specifications"],
    iconName: "Layout"
  },
  {
    step: "03",
    title: "Agile Engineering",
    subtitle: "Sprint Velocity with Test-Driven Rigor",
    description: "We execute in bi-weekly agile sprints with continuous integration, automated test suites, and transparent demo cadences. You receive active staging deployments at each sprint conclusion.",
    keyDeliverables: ["Bi-Weekly Staging Releases", "Automated CI/CD Pipeline", "Comprehensive Unit & E2E Tests", "Transparent Sprint Burn-Down Reports"],
    iconName: "Code"
  },
  {
    step: "04",
    title: "Deployment & Scaled Evolution",
    subtitle: "Zero-Downtime Rollout & Continuous SLA",
    description: "We orchestrate zero-downtime production launches with synthetic load testing, distributed telemetry, and 24/7 post-launch monitoring to ensure uninterrupted operational excellence.",
    keyDeliverables: ["Production Release Checklist", "Infrastructure-as-Code Runbook", "24/7 Monitoring & Alert Setup", "Dedicated Maintenance SLA"],
    iconName: "Rocket"
  }
];

/**
 * Why Choose Handvance Technologies Pillars
 */
export const WHY_CHOOSE_US = [
  {
    id: "engineering-rigor",
    title: "Enterprise Engineering Rigor",
    description: "We don't take shortcuts. Every line of code adheres to clean architecture principles, strict TypeScript typing, and automated testing suites.",
    iconName: "ShieldCheck",
    metric: "99.9%+",
    metricLabel: "System Uptime Track Record"
  },
  {
    id: "rapid-velocity",
    title: "High-Velocity Agile Delivery",
    description: "Bi-weekly sprint iterations, transparent burndown reporting, and live staging previews ensure your product ships to market ahead of schedule.",
    iconName: "Zap",
    metric: "2x",
    metricLabel: "Faster Time-to-Market"
  },
  {
    id: "security-first",
    title: "Security & Compliance By Design",
    description: "Built-in encryption, SOC2 readiness, HIPAA compliance, and least-privilege security postures protect your proprietary data from day one.",
    iconName: "Lock",
    metric: "100%",
    metricLabel: "Clean Compliance Audits"
  },
  {
    id: "future-proof",
    title: "Future-Proof Cloud Architecture",
    description: "Engineered with modular microservices, edge-native caching, and scalable serverless patterns ready to support millions of concurrent users.",
    iconName: "Layers",
    metric: "10M+",
    metricLabel: "Concurrent Requests Supported"
  }
];

/**
 * Client Testimonials
 */
export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    quote: "Handvance Technologies transformed our fragmented backend into an event-driven masterpiece. Their team delivered two weeks ahead of schedule and our transaction latency dropped by over 70%.",
    author: "David Sterling",
    role: "Chief Technology Officer",
    company: "ApexFlow Financial Systems",
    projectScope: "FinTech Cloud Platform"
  },
  {
    id: "2",
    quote: "The clinical AI assistant built by Handvance was adopted by our hospital staff with zero resistance. The attention to detail in medical privacy, HIPAA guardrails, and UX was exceptional.",
    author: "Dr. Rachel Thorne",
    role: "VP of Digital Health & Innovation",
    company: "OmniCare Health Network",
    projectScope: "Healthcare AI Assistant"
  },
  {
    id: "3",
    quote: "From headless Shopify integration to custom checkout orchestration, Handvance built a platform that handled our Black Friday traffic surge without a single hitch. Our conversion rate jumped 34%.",
    author: "Julian Morales",
    role: "Head of Digital Commerce",
    company: "HyperRetail Global Brands",
    projectScope: "Omnichannel Headless Commerce"
  }
];

/**
 * Modern Tech Stack Grid
 */
export const TECH_STACK_CATEGORIES = [
  {
    category: "Frontend & Mobile",
    technologies: [
      { name: "Next.js 14", icon: "Code", tag: "App Router" },
      { name: "React", icon: "Layers", tag: "Components" },
      { name: "TypeScript", icon: "FileCode", tag: "Strict Types" },
      { name: "Tailwind CSS", icon: "Palette", tag: "Utility CSS" },
      { name: "React Native", icon: "Smartphone", tag: "Cross-Platform" },
      { name: "Flutter", icon: "Smartphone", tag: "Native UI" }
    ]
  },
  {
    category: "Backend & Systems",
    technologies: [
      { name: "Node.js", icon: "Server", tag: "Runtime" },
      { name: "Python", icon: "Terminal", tag: "AI / Microservices" },
      { name: "Go", icon: "Cpu", tag: "High Concurrency" },
      { name: "PostgreSQL", icon: "Database", tag: "Relational DB" },
      { name: "Redis", icon: "Zap", tag: "In-Memory Cache" },
      { name: "Kafka", icon: "Activity", tag: "Event Streaming" }
    ]
  },
  {
    category: "Cloud, AI & DevOps",
    technologies: [
      { name: "AWS Cloud", icon: "Cloud", tag: "Infrastructure" },
      { name: "Docker", icon: "Box", tag: "Containers" },
      { name: "Kubernetes", icon: "Compass", tag: "Orchestration" },
      { name: "Terraform", icon: "Sliders", tag: "IaC" },
      { name: "LangChain", icon: "Cpu", tag: "AI Orchestration" },
      { name: "Vercel", icon: "Globe", tag: "Edge Network" }
    ]
  }
];
