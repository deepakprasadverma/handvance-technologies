"use client";

import React, { useState, useEffect } from "react";
import { Play, CheckCircle2, RefreshCw, Terminal, Activity, Layers, Sparkles, Server } from "lucide-react";
import { Badge } from "./Badge";

export const TerminalCard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"agent" | "telemetry" | "deploy">("agent");
  const [isRunning, setIsRunning] = useState(false);
  const [executionLog, setExecutionLog] = useState<string[]>([]);
  const [latency, setLatency] = useState(14);
  const [throughput, setThroughput] = useState(48200);

  // Periodic subtle metric jitter to simulate live telemetry
  useEffect(() => {
    const interval = setInterval(() => {
      setLatency(Math.floor(12 + Math.random() * 5));
      setThroughput(Math.floor(47000 + Math.random() * 2500));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSimulateRun = () => {
    if (isRunning) return;
    setIsRunning(true);
    setExecutionLog(["Initiating Handvance Swarm Consensus Protocol..."]);

    const steps = [
      "Vector embeddings retrieved from pgvector cluster (2.4ms)",
      "Multi-agent reasoning graph compiled: [Researcher → Architect → Validator]",
      "Synthesizing low-latency REST endpoints & PostgreSQL migration schemas...",
      "Executing automated integration tests: 142/142 passed (100% coverage)",
      "Continuous blue/green canary rollout deployed to Kubernetes us-east cluster",
      "System verification complete: Zero regression, latency 13.8ms.",
    ];

    steps.forEach((step, idx) => {
      setTimeout(() => {
        setExecutionLog(prev => [...prev, step]);
        if (idx === steps.length - 1) {
          setIsRunning(false);
        }
      }, (idx + 1) * 650);
    });
  };

  return (
    <div className="relative w-full rounded-2xl bg-[#0E1017] border border-[#1E2230] shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(6,182,212,0.15)] overflow-hidden font-mono-tag">
      {/* Top Window Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#090A0F] border-b border-[#1E2230]">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block shadow-[0_0_6px_rgba(244,63,94,0.4)]" />
          <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block shadow-[0_0_6px_rgba(245,158,11,0.4)]" />
          <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block shadow-[0_0_6px_rgba(16,185,129,0.4)]" />
          <span className="ml-2 text-xs text-[#94A3B8] font-mono-tag hidden sm:inline-block">
            handvance-core@v4.2.0
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="cyan" size="xs" dot>
            ONLINE
          </Badge>
          <span className="text-[11px] text-cyan-400 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-800/40">
            {latency}ms
          </span>
        </div>
      </div>

      {/* Terminal Tabs */}
      <div className="flex items-center bg-[#0B0D13] border-b border-[#1E2230] px-2 text-xs overflow-x-auto">
        <button
          onClick={() => setActiveTab("agent")}
          className={`flex items-center gap-1.5 px-3 py-2.5 border-b-2 font-medium transition-colors whitespace-nowrap ${
            activeTab === "agent"
              ? "border-cyan-400 text-cyan-300 bg-[#0E1017]"
              : "border-transparent text-[#94A3B8] hover:text-[#F8FAFC]"
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          agent_orchestrator.ts
        </button>

        <button
          onClick={() => setActiveTab("telemetry")}
          className={`flex items-center gap-1.5 px-3 py-2.5 border-b-2 font-medium transition-colors whitespace-nowrap ${
            activeTab === "telemetry"
              ? "border-cyan-400 text-cyan-300 bg-[#0E1017]"
              : "border-transparent text-[#94A3B8] hover:text-[#F8FAFC]"
          }`}
        >
          <Activity className="w-3.5 h-3.5 text-indigo-400" />
          cluster_metrics.json
        </button>

        <button
          onClick={() => setActiveTab("deploy")}
          className={`flex items-center gap-1.5 px-3 py-2.5 border-b-2 font-medium transition-colors whitespace-nowrap ${
            activeTab === "deploy"
              ? "border-cyan-400 text-cyan-300 bg-[#0E1017]"
              : "border-transparent text-[#94A3B8] hover:text-[#F8FAFC]"
          }`}
        >
          <Terminal className="w-3.5 h-3.5 text-emerald-400" />
          deploy_pipeline.sh
        </button>
      </div>

      {/* Terminal Code / Execution Body */}
      <div className="p-4 sm:p-5 text-xs text-[#94A3B8] leading-relaxed min-h-[290px] max-h-[360px] overflow-y-auto selection:bg-cyan-500/30">
        {activeTab === "agent" && (
          <div className="space-y-2">
            <div className="text-slate-500 font-mono-tag">
              {/* Handvance Autonomous Swarm Pipeline */}
              <span>{"// Handvance Autonomous Swarm Pipeline"}</span>
            </div>
            <p className="text-indigo-300">
              <span className="text-cyan-400">import</span> &#123; SwarmCoordinator, VectorRAG &#125;{" "}
              <span className="text-cyan-400">from</span>{" "}
              <span className="text-emerald-300">&quot;@handvance/ai-core&quot;</span>;
            </p>
            <p className="text-slate-300 mt-2">
              <span className="text-cyan-400">export const</span>{" "}
              <span className="text-yellow-300">enterpriseSwarm</span> ={" "}
              <span className="text-cyan-400">new</span>{" "}
              <span className="text-yellow-300">SwarmCoordinator</span>(&#123;
            </p>
            <div className="pl-4 space-y-1 text-slate-300">
              <p>
                model: <span className="text-emerald-300">&quot;claude-3-5-sonnet&quot;</span>,
              </p>
              <p>
                consensusThreshold: <span className="text-amber-400">0.994</span>,
              </p>
              <p>
                vectorStore: <span className="text-cyan-300">VectorRAG.connect(&quot;pgvector-mesh&quot;)</span>,
              </p>
              <p>
                agents: [
                <span className="text-purple-300">&quot;SecurityAuditor&quot;</span>,{" "}
                <span className="text-purple-300">&quot;CodeSynthesizer&quot;</span>,{" "}
                <span className="text-purple-300">&quot;LoadOptimizer&quot;</span>
                ],
              </p>
            </div>
            <p className="text-slate-300">&#125;);</p>

            <div className="mt-4 pt-3 border-t border-[#1E2230]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] text-cyan-400 font-semibold uppercase tracking-wider flex items-center gap-1.5">
                  <Activity className="w-3 h-3 animate-pulse" /> Live Execution Stream
                </span>
                <button
                  onClick={handleSimulateRun}
                  disabled={isRunning}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-cyan-950/60 hover:bg-cyan-900/60 text-cyan-300 border border-cyan-800/60 transition-colors disabled:opacity-50 text-[11px] cursor-pointer"
                >
                  {isRunning ? (
                    <>
                      <RefreshCw className="w-3 h-3 animate-spin" /> Running...
                    </>
                  ) : (
                    <>
                      <Play className="w-3 h-3 fill-cyan-300" /> Execute Swarm
                    </>
                  )}
                </button>
              </div>

              {executionLog.length === 0 ? (
                <p className="text-slate-500 italic text-[11px]">
                  Click &apos;Execute Swarm&apos; to simulate multi-agent orchestration and deployment...
                </p>
              ) : (
                <div className="space-y-1.5 text-[11px]">
                  {executionLog.map((log, index) => (
                    <div key={index} className="flex items-start gap-1.5 text-slate-300 animate-fadeIn">
                      <span className="text-cyan-400 mt-0.5">❯</span>
                      <span className={index === executionLog.length - 1 ? "text-cyan-300 font-semibold" : ""}>
                        {log}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "telemetry" && (
          <div className="space-y-2 text-slate-300">
            <div className="text-slate-500 font-mono-tag">
              <span>{"// Handvance Distributed Cluster Telemetry"}</span>
            </div>
            <pre className="text-[11px] text-cyan-300 bg-[#08090E] p-3 rounded-lg border border-[#1E2230] overflow-x-auto">
{`{
  "cluster_id": "us-east-hadv-k8s-prod",
  "sla_uptime": "99.999%",
  "active_nodes": 48,
  "p99_latency": "${latency}ms",
  "rps_throughput": "${throughput.toLocaleString()}/sec",
  "active_agent_workers": 64,
  "vector_index_size": "12.4M embeddings",
  "zero_trust_status": "ENFORCED_OK",
  "cache_hit_ratio": "98.7%"
}`}
            </pre>
            <div className="grid grid-cols-2 gap-2 pt-2">
              <div className="p-2.5 rounded bg-[#090A0F] border border-[#1E2230]">
                <div className="text-[10px] text-[#94A3B8]">Memory Pressure</div>
                <div className="text-sm font-semibold text-emerald-400 mt-0.5">34.2% Nominal</div>
              </div>
              <div className="p-2.5 rounded bg-[#090A0F] border border-[#1E2230]">
                <div className="text-[10px] text-[#94A3B8]">Failover Tolerance</div>
                <div className="text-sm font-semibold text-cyan-400 mt-0.5">3-Region Multi-Master</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "deploy" && (
          <div className="space-y-2 text-[11px]">
            <div className="text-slate-500 font-mono-tag">
              <span>{"// Automated Canary Pipeline via GitHub Actions & ArgoCD"}</span>
            </div>
            <div className="text-emerald-400 font-semibold">
              ✔ git push origin release/v4.2.0 [SIGNED]
            </div>
            <div className="text-slate-300">
              ✔ Build container image: <span className="text-cyan-300">docker.io/handvance/api:v4.2.0</span> (Digest: sha256:7f9e8a...)
            </div>
            <div className="text-slate-300">
              ✔ Running Trivy security scan: <span className="text-emerald-400">0 vulnerabilities found</span>
            </div>
            <div className="text-slate-300">
              ✔ Canary rollout step 1 (10% traffic) → P99 latency: 13.9ms → Error rate: 0.00%
            </div>
            <div className="text-slate-300">
              ✔ Canary rollout step 2 (50% traffic) → Health metrics OK
            </div>
            <div className="text-cyan-300 font-semibold">
              ✔ Canary promoted to 100% production traffic. Zero downtime achieved.
            </div>
            <div className="text-slate-400 pt-2 border-t border-[#1E2230] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Pipeline runtime: 1m 24s. Rollback snapshot tagged.</span>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Live Hardware / Cluster Status Footer */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 bg-[#090A0F] border-t border-[#1E2230] text-[11px]">
        <div className="flex items-center gap-4 text-[#94A3B8]">
          <span className="flex items-center gap-1.5">
            <Server className="w-3 h-3 text-cyan-400" />
            <strong className="text-[#F8FAFC]">48</strong> Nodes
          </span>
          <span className="flex items-center gap-1.5">
            <Layers className="w-3 h-3 text-indigo-400" />
            <strong className="text-[#F8FAFC]">99.999%</strong> SLA
          </span>
        </div>
        <div className="text-emerald-400 flex items-center gap-1.5 font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Production Healthy
        </div>
      </div>
    </div>
  );
};
