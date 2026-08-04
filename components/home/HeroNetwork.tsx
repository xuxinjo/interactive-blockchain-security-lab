"use client";

import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";

const BlockchainNetworkCanvas = dynamic(
  () => import("@/components/home/BlockchainNetworkCanvas").then((module) => module.BlockchainNetworkCanvas),
  {
    ssr: false,
    loading: () => (
      <div className="hero-visual-stage hero-webgl-loading" aria-label="Loading interactive blockchain network">
        <span className="hero-loading-core" aria-hidden="true" />
        <p>Preparing 3D network...</p>
      </div>
    )
  }
);

export function HeroNetwork() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="hero-experience" aria-labelledby="hero-title">
      <BlockchainNetworkCanvas />

      <motion.article
        className="hero-crystal-copy"
        whileHover={reduceMotion ? undefined : { y: -3, scale: 1.002 }}
        transition={{ duration: 0.28, ease: "easeOut" }}
      >
        <div className="hero-crystal-content">
          <span className="badge">Protocol | Network | Application</span>
          <h2 id="hero-title" className="text-3xl font-bold tracking-tight text-white md:text-5xl">
            Visualising Trust in Blockchain Security
          </h2>
          <div className="grid gap-3 text-base leading-relaxed text-slate-200 md:grid-cols-2 md:gap-8">
            <p>
              Blockchain security is not only about cryptography. It also depends on protocol rules, network behaviour,
              and application logic.
            </p>
            <p className="text-slate-300">
              Incidents happen when trust assumptions fail. Explore where those assumptions live and how layered
              defences reduce systemic risk.
            </p>
          </div>
        </div>
      </motion.article>
    </section>
  );
}
