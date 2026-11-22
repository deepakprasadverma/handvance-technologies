"use client";

import React, { useState } from "react";
import { 
  Play, 
  RefreshCw, 
  Bot, 
  Database, 
  ShieldCheck, 
  ArrowRight, 
  Cpu, 
  Terminal, 
  Zap, 
  Activity 
} from "lucide-react";
import { WORKFLOW_SIMULATIONS } from "@/data/workflows";
import { Badge } from "@/components/ui/Badge";
import { GlowingButton } from "@/components/ui/GlowingButton";

export const ArchitecturePlayground: React.FC = () => {
  const [selectedWorkflowIndex, setSelectedWorkflowIndex] = useState(0);
  const [activeModel, setActiveModel] = useState("Claude 3.5 Sonnet");
  const [vectorStore, setVectorStore] = useState("pgvector Mesh");
  const [safetyThreshold] = useState(99.4);
  const [isExecuting, setIsExecuting] = useState(false);
  const [activeNodeIndex, setActiveNodeIndex] = useState<number | null>(null);
  const [executionOutput, setExecutionOutput] = useState<{
    status: string;
    actionTaken: string;
    consensusScore: number;
    summary: string;
  } | null>(null);

  const currentWorkflow = WORKFLOW_SIMULATIONS[selectedWorkflowIndex];

  const handleRunSimulation = () => {
    if (isExecuting) return;
    setIsExecuting(true);
    setActiveNodeIndex(0);
    setExecutionOutput(null);

    const totalNodes = currentWorkflow.nodes.length;

    currentWorkflow.nodes.forEach((_, idx) => {
      setTimeout(() => {
        setActiveNodeIndex(idx);
        if (idx === totalNodes - 1) {
          setTimeout(() => {
            setIsExecuting(false);
            setExecutionOutput(currentWorkflow.outputPayload);
          }, 400);
        }
      }, (idx + 1) * 350);
    });
  };

  const getNodeIcon = (type: string) => {
    switch (type) {
      case "input":
        return <Activity className="w-4 h-4 text-cyan-400" />;
      case "storage":
        return <Database className="w-4 h-4 text-emerald-400" />;
      case "agent":
        return <Bot className="w-4 h-4 text-indigo-400" />;
      case "guardrail":
        return <ShieldCheck className="w-4 h-4 text-amber-400" />;
      case "output":
        return <Zap className="w-4 h-4 text-cyan-300" />;
      default:
        return <Cpu className="w-4 h-4 text-cyan-400" />;
    }
  };

  return (
    <section id="playground" className="relative py-28 bg-[#07070B] overflow-hidden border-t border-[#1E2230]/50">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/3 w-[600px] h-[350px] bg-gradient-radial from-blue-700/15 via-cyan-900/5 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <Badge variant="cyan" size="sm" dot>
            INTERACTIVE SIMULATOR
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F8FAFC] tracking-tight">
            AI System Architecture{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              Live Playground
            </span>
          </h2>
          <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed">
            Test how our autonomous multi-agent swarms, vector retrieval pipelines, and deterministic guardrails
            execute in real time with microsecond telemetry.
          </p>
        </div>

        {/* Workflow Domain Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {WORKFLOW_SIMULATIONS.map((wf, idx) => (
            <button
              key={wf.id}
              onClick={() => {
                setSelectedWorkflowIndex(idx);
                setExecutionOutput(null);
                setActiveNodeIndex(null);
              }}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 font-mono-tag cursor-pointer ${
                selectedWorkflowIndex === idx
                  ? "bg-[#0E1017] border border-cyan-400/80 text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.25)]"
                  : "bg-[#0E1017]/60 border border-[#1E2230] text-[#94A3B8] hover:text-[#F8FAFC]"
              }`}
            >
              {wf.domain}
            </button>
          ))}
        </div>

        {/* Simulator Main Board */}
        <div className="rounded-2xl bg-[#0E1017]/90 backdrop-blur-md border border-[#1E2230] p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
          {/* Top Info & Controls Bar */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 mb-8 border-b border-[#1E2230]">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="cyan" size="xs">
                  {currentWorkflow.domain}
                </Badge>
                <span className="text-xs text-slate-500 font-mono-tag">Architecture Graph</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#F8FAFC]">
                {currentWorkflow.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#94A3B8] mt-1 max-w-xl">
                {currentWorkflow.tagline}
              </p>
            </div>

            {/* Tuning Controls */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Model Selector */}
              <div className="bg-[#07070B] border border-[#1E2230] rounded-lg px-3 py-1.5 text-xs font-mono-tag flex items-center gap-2">
                <span className="text-slate-500">Foundation:</span>
                <select
                  value={activeModel}
                  onChange={e => setActiveModel(e.target.value)}
                  className="bg-transparent text-cyan-400 font-semibold focus:outline-none cursor-pointer"
                >
                  <option value="Claude 3.5 Sonnet" className="bg-[#0E1017]">Claude 3.5 Sonnet</option>
                  <option value="GPT-4o Omnimodal" className="bg-[#0E1017]">GPT-4o Omnimodal</option>
                  <option value="Llama 3.3 70B" className="bg-[#0E1017]">Llama 3.3 70B</option>
                  <option value="DeepSeek-V3" className="bg-[#0E1017]">DeepSeek-V3</option>
                </select>
              </div>

              {/* Vector Store */}
              <div className="bg-[#07070B] border border-[#1E2230] rounded-lg px-3 py-1.5 text-xs font-mono-tag flex items-center gap-2">
                <span className="text-slate-500">Vector:</span>
                <select
                  value={vectorStore}
                  onChange={e => setVectorStore(e.target.value)}
                  className="bg-transparent text-emerald-400 font-semibold focus:outline-none cursor-pointer"
                >
                  <option value="pgvector Mesh" className="bg-[#0E1017]">pgvector Mesh</option>
                  <option value="Pinecone Serverless" className="bg-[#0E1017]">Pinecone Serverless</option>
                  <option value="SQLite CRDT Edge" className="bg-[#0E1017]">SQLite CRDT Edge</option>
                </select>
              </div>

              {/* Execute Button */}
              <GlowingButton
                variant="primary"
                size="md"
                onClick={handleRunSimulation}
                disabled={isExecuting}
                icon={isExecuting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4 fill-white" />}
              >
                {isExecuting ? "Executing Graph..." : "Simulate Pipeline"}
              </GlowingButton>
            </div>
          </div>

          {/* Incoming Payload Banner */}
          <div className="p-3.5 rounded-xl bg-[#07070B] border border-[#1E2230] mb-8 font-mono-tag text-xs flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-slate-300 truncate">
              <span className="text-cyan-400 font-bold flex-shrink-0">PROMPT STREAM:</span>
              <span className="truncate text-slate-400">{currentWorkflow.inputPrompt}</span>
            </div>
            <span className="text-[10px] text-cyan-400 bg-cyan-950/50 px-2 py-0.5 rounded border border-cyan-800/40 flex-shrink-0">
              SYNTHETIC TELEMETRY
            </span>
          </div>

          {/* Visual Interactive Node Canvas (5 Connected Nodes) */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative mb-8">
            {currentWorkflow.nodes.map((node, idx) => {
              const isActive = activeNodeIndex === idx;
              const isPast = activeNodeIndex !== null && activeNodeIndex > idx;

              return (
                <div
                  key={node.id}
                  className={`relative p-4 rounded-xl border transition-all duration-300 flex flex-col justify-between ${
                    isActive
                      ? "bg-[#161B28] border-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.35)] scale-102 ring-1 ring-cyan-400/40"
                      : isPast
                      ? "bg-[#090B10] border-emerald-500/50 text-slate-300"
                      : "bg-[#07070B] border-[#1E2230] text-[#94A3B8]"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-2 rounded-lg bg-[#0E1017] border border-[#1E2230]">
                        {getNodeIcon(node.type)}
                      </div>
                      <span className="text-[10px] font-mono-tag font-semibold text-cyan-400">
                        {node.latencyMs}ms
                      </span>
                    </div>

                    <div className="text-xs font-bold text-[#F8FAFC] mb-1">
                      {node.label}
                    </div>
                    <div className="text-[11px] text-slate-400 leading-relaxed mb-3">
                      {node.description}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#1E2230] flex items-center justify-between text-[10px] font-mono-tag">
                    <span className="text-slate-500">Step 0{idx + 1}</span>
                    <span className={isActive ? "text-cyan-400 animate-pulse font-bold" : isPast ? "text-emerald-400" : "text-slate-600"}>
                      {isActive ? "ACTIVE" : isPast ? "COMPLETED" : "READY"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Real-time Telemetry & Output Dashboard */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left: Execution Metrics */}
            <div className="lg:col-span-4 p-5 rounded-xl bg-[#07070B] border border-[#1E2230] font-mono-tag text-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[#1E2230]">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-cyan-400" /> Pipeline Telemetry
                </span>
                <span className="text-emerald-400 font-bold">200 OK</span>
              </div>

              <div className="space-y-2 text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-500">Est. Latency:</span>
                  <span className="text-cyan-300 font-bold">{currentWorkflow.totalLatency}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Cost Per Execution:</span>
                  <span className="text-emerald-400 font-bold">{currentWorkflow.estimatedCostPerRun}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Target Model:</span>
                  <span className="text-[#F8FAFC]">{activeModel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Knowledge Vector:</span>
                  <span className="text-indigo-300">{vectorStore}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Consensus Guardrail:</span>
                  <span className="text-amber-400">{safetyThreshold}%</span>
                </div>
              </div>
            </div>

            {/* Right: Output Payload / Telemetry Log */}
            <div className="lg:col-span-8 p-5 rounded-xl bg-[#07070B] border border-[#1E2230] font-mono-tag text-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#1E2230]">
                  <span className="text-cyan-400 font-semibold flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5" /> Structured Output Envelope
                  </span>
                  <span className="text-[11px] text-slate-500">
                    {executionOutput ? "LIVE RESULT READY" : "IDLE // READY FOR EXECUTION"}
                  </span>
                </div>

                {executionOutput ? (
                  <div className="space-y-2 text-slate-300">
                    <div>
                      <span className="text-slate-500">Status: </span>
                      <span className="text-emerald-400 font-bold">{executionOutput.status}</span>
                    </div>
                    <div>
                      <span className="text-slate-500">Action: </span>
                      <span className="text-cyan-300">{executionOutput.actionTaken}</span>
                    </div>
                    <div>
                      <span className="text-slate-500">Consensus Score: </span>
                      <span className="text-amber-400 font-bold">{(executionOutput.consensusScore * 100).toFixed(1)}%</span>
                    </div>
                    <div className="pt-2 text-slate-300 bg-[#0E1017] p-3 rounded-lg border border-[#1E2230]">
                      <span className="text-slate-500 block text-[10px] uppercase mb-1">Architectural Summary</span>
                      {executionOutput.summary}
                    </div>
                  </div>
                ) : (
                  <div className="text-slate-500 italic py-6 text-center">
                    Click &apos;Simulate Pipeline&apos; to trigger real-time sequential agent reasoning and output generation...
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-[#1E2230] flex items-center justify-between text-[11px] text-slate-500">
                <span>Handvance Autonomous Core v4.2</span>
                <a href="#estimator" className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-semibold">
                  Deploy this pipeline for your team <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
