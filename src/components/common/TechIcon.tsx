import React from "react";
import {
  Globe,
  Layout,
  Smartphone,
  Code,
  Palette,
  ShoppingBag,
  TrendingUp,
  Search,
  Sparkles,
  Compass,
  ShieldCheck,
  Cpu,
  Zap,
  Lock,
  Layers,
  Rocket,
  Server,
  Terminal,
  Database,
  Activity,
  Cloud,
  Box,
  Sliders,
  FileCode,
  LucideProps,
  CheckCircle,
  HelpCircle
} from "lucide-react";

interface TechIconProps extends LucideProps {
  name: string;
}

export const TechIcon: React.FC<TechIconProps> = ({ name, ...props }) => {
  switch (name.toLowerCase()) {
    case "globe":
      return <Globe {...props} />;
    case "layout":
      return <Layout {...props} />;
    case "smartphone":
      return <Smartphone {...props} />;
    case "code":
      return <Code {...props} />;
    case "palette":
      return <Palette {...props} />;
    case "shoppingbag":
      return <ShoppingBag {...props} />;
    case "trendingup":
      return <TrendingUp {...props} />;
    case "search":
      return <Search {...props} />;
    case "sparkles":
      return <Sparkles {...props} />;
    case "compass":
      return <Compass {...props} />;
    case "shieldcheck":
      return <ShieldCheck {...props} />;
    case "cpu":
      return <Cpu {...props} />;
    case "zap":
      return <Zap {...props} />;
    case "lock":
      return <Lock {...props} />;
    case "layers":
      return <Layers {...props} />;
    case "rocket":
      return <Rocket {...props} />;
    case "server":
      return <Server {...props} />;
    case "terminal":
      return <Terminal {...props} />;
    case "database":
      return <Database {...props} />;
    case "activity":
      return <Activity {...props} />;
    case "cloud":
      return <Cloud {...props} />;
    case "box":
      return <Box {...props} />;
    case "sliders":
      return <Sliders {...props} />;
    case "filecode":
      return <FileCode {...props} />;
    case "checkcircle":
      return <CheckCircle {...props} />;
    default:
      return <HelpCircle {...props} />;
  }
};
