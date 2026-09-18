import React from 'react';
import { Award, CheckCircle2 } from 'lucide-react';
import { ProofScoreBreakdown } from '../../types/state';

interface ProofScoreBreakdownCardProps {
  proofScore: ProofScoreBreakdown;
}

export const ProofScoreBreakdownCard: React.FC<ProofScoreBreakdownCardProps> = ({ proofScore }) => {
  return (
    <div className="tech-card p-6 border-dark-border space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-dark-border">
        <div>
          <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
            <Award size={15} />
            <span>Tangible Evidence Metric</span>
          </span>
          <h2 className="text-2xl font-bold text-zinc-100 tracking-tight mt-1">
            Engineering Proof Score: {proofScore.totalProofScore} pts
          </h2>
          <p className="text-xs text-zinc-400 mt-0.5 max-w-xl leading-relaxed">
            Measures demonstrated engineering evidence (code, live deployments, automated tests, eval suites, and real user adoption) rather than passive reading.
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-800/40 text-center px-6">
          <div className="text-[11px] text-emerald-400 font-medium">Total Proof Score</div>
          <div className="text-3xl font-bold text-emerald-400 tracking-tight mt-0.5">{proofScore.totalProofScore}</div>
        </div>
      </div>

      {/* Itemized Breakdown Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-dark-border text-zinc-400 text-xs">
              <th className="pb-3 font-semibold">Evidence Category</th>
              <th className="pb-3 font-semibold">Verified Count</th>
              <th className="pb-3 font-semibold">Accumulated Score</th>
              <th className="pb-3 font-semibold">Criteria</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/60">
            {proofScore.details.map((item, idx) => (
              <tr key={idx} className="hover:bg-zinc-800/30 transition-colors">
                <td className="py-3 font-medium text-zinc-200 flex items-center gap-2">
                  <CheckCircle2
                    size={14}
                    className={item.count > 0 ? 'text-emerald-400' : 'text-zinc-600'}
                  />
                  <span>{item.label}</span>
                </td>
                <td className="py-3 text-zinc-300">{item.count} items</td>
                <td className="py-3 font-semibold text-emerald-400">+{item.score} pts</td>
                <td className="py-3 text-zinc-400 text-xs">{item.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
