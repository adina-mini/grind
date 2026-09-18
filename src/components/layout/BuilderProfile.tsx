import React, { useState } from 'react';
import { Mail, Check, Copy, ExternalLink } from 'lucide-react';
import { GithubIcon, LinkedinIcon, XTwitterIcon } from '../common/Icons';

export const BuilderProfile: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const email = 'adinarehman018@gmail.com';
  const githubUrl = 'https://github.com/adina-mini';
  const linkedinUrl = 'https://linkedin.com';
  const xUrl = 'https://x.com';

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl bg-zinc-900/90 border border-zinc-800/90 p-3 shadow-sm hover:border-zinc-700/80 transition-all duration-200">
      {/* Top row: Avatar + Name & Subtitle */}
      <div className="flex items-center gap-2.5">
        <div className="relative flex-shrink-0">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500/20 via-zinc-800 to-zinc-900 border border-emerald-500/30 flex items-center justify-center text-xs font-bold text-emerald-400 font-mono shadow-inner">
            AR
          </div>
          {/* Active indicator dot */}
          <span
            className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-zinc-900 animate-pulse"
            title="Building in public"
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-100 truncate">
              Adina
            </span>
            <span className="text-[10px] font-mono text-emerald-400/90 bg-emerald-950/40 border border-emerald-500/20 px-1.5 py-0.2 rounded">
              Builder
            </span>
          </div>
          <p className="text-[11px] text-zinc-400 truncate">
            AI Engineer in Training
          </p>
        </div>
      </div>

      {/* Handles & Contact Toolbar */}
      <div className="mt-2.5 pt-2 border-t border-zinc-800/60 flex items-center justify-between">
        {/* Social Link Icons */}
        <div className="flex items-center gap-1">
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub: adina-mini"
            className="p-1.5 rounded-md text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/80 transition-colors"
            aria-label="GitHub Profile"
          >
            <GithubIcon size={14} />
          </a>

          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn Profile"
            className="p-1.5 rounded-md text-zinc-400 hover:text-sky-400 hover:bg-zinc-800/80 transition-colors"
            aria-label="LinkedIn Profile"
          >
            <LinkedinIcon size={14} />
          </a>

          <a
            href={xUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="X / Twitter"
            className="p-1.5 rounded-md text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/80 transition-colors"
            aria-label="X Profile"
          >
            <XTwitterIcon size={13} />
          </a>
        </div>

        {/* Email with 1-Click Copy */}
        <div className="flex items-center gap-1">
          <a
            href={`mailto:${email}`}
            title={`Email: ${email}`}
            className="p-1.5 rounded-md text-zinc-400 hover:text-emerald-400 hover:bg-zinc-800/80 transition-colors"
            aria-label="Send Email"
          >
            <Mail size={14} />
          </a>

          <button
            onClick={handleCopyEmail}
            title={copied ? 'Email copied!' : `Copy ${email}`}
            className={`flex items-center gap-1 px-1.5 py-1 rounded text-[10px] font-mono transition-all ${
              copied
                ? 'bg-emerald-950/70 text-emerald-400 border border-emerald-500/40'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/80'
            }`}
            aria-label="Copy email to clipboard"
          >
            {copied ? (
              <>
                <Check size={11} className="text-emerald-400" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy size={11} />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
