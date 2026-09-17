import { Phase } from '../types/timeline';

export const TIMELINE_PHASES: Phase[] = [
  {
    id: 'phase-1',
    number: 1,
    title: 'Foundation & Core Engineering',
    tagline: 'Python Mastery, DSA, Clean Code & Testing',
    startMonth: 1,
    endMonth: 3,
    focusTracks: ['software-engineering', 'dsa'],
    primaryProjectId: 'proj-python-automation-toolkit',
    description: 'Establish rock-solid software engineering foundations: OOP, typing, async programming, testing with Pytest, and core algorithmic problem solving.',
    checkpoints: [
      {
        id: 'cp-month-1',
        monthIndex: 1,
        title: 'Month 1: Modern Python & Clean Code Mastery',
        description: 'Complete core Python execution semantics, OOP protocols, type hinting, decorators, and Pytest test design.',
        phaseId: 'phase-1',
        linkedSkillIds: [
          'swe-python-fundamentals',
          'swe-oop-design',
          'swe-typing-dataclasses',
          'swe-decorators-context-managers',
          'swe-testing-pytest'
        ],
        linkedProjectIds: ['proj-python-automation-toolkit']
      },
      {
        id: 'cp-month-2',
        monthIndex: 2,
        title: 'Month 2: Algorithmic Thinking & Big-O Foundations',
        description: 'Master arrays, hash tables, stacks, queues, binary search, and linked lists with Big-O runtime analysis.',
        phaseId: 'phase-1',
        linkedSkillIds: [
          'dsa-big-o-complexity',
          'dsa-arrays-strings',
          'dsa-hash-maps-sets',
          'dsa-stacks-queues',
          'dsa-binary-search'
        ],
        linkedProjectIds: ['proj-dsa-problem-solver']
      },
      {
        id: 'cp-month-3',
        monthIndex: 3,
        title: 'Month 3: Advanced DSA & Python Packaging',
        description: 'Solve trees, BFS/DFS graphs, topological sorting, and ship the Python Automation CLI tool.',
        phaseId: 'phase-1',
        linkedSkillIds: [
          'dsa-trees-traversals',
          'dsa-bfs',
          'dsa-dfs',
          'swe-packaging-uv',
          'swe-git-workflows'
        ],
        linkedProjectIds: ['proj-python-automation-toolkit', 'proj-dsa-problem-solver']
      }
    ]
  },
  {
    id: 'phase-2',
    number: 2,
    title: 'Backend Systems & Classical ML',
    tagline: 'FastAPI, PostgreSQL, Redis, Scikit-Learn & XGBoost',
    startMonth: 4,
    endMonth: 6,
    focusTracks: ['databases-backend', 'math-for-ai', 'machine-learning'],
    primaryProjectId: 'proj-production-rest-api',
    description: 'Master production web services with FastAPI, PostgreSQL relational modeling, Redis caching, math for machine learning, and tabular ML modeling.',
    checkpoints: [
      {
        id: 'cp-month-4',
        monthIndex: 4,
        title: 'Month 4: Relational Databases & FastAPI Architecture',
        description: 'Design 3NF schemas, indexes, connection pools, and build type-safe async REST APIs with Pydantic V2.',
        phaseId: 'phase-2',
        linkedSkillIds: [
          'db-sql-fundamentals',
          'db-advanced-sql',
          'db-fastapi-fundamentals',
          'db-pydantic-v2',
          'db-postgres-internals'
        ],
        linkedProjectIds: ['proj-fastapi-crud-pydantic']
      },
      {
        id: 'cp-month-5',
        monthIndex: 5,
        title: 'Month 5: Production Backend Caching & Math for AI',
        description: 'Deploy Redis caching, rate limiting, and master linear algebra, matrix decomposition, and probability.',
        phaseId: 'phase-2',
        linkedSkillIds: [
          'db-redis-caching',
          'db-rate-limiting',
          'math-vectors-spaces',
          'math-matrices-operations',
          'math-probability-spaces'
        ],
        linkedProjectIds: ['proj-production-rest-api']
      },
      {
        id: 'cp-month-6',
        monthIndex: 6,
        title: 'Month 6: End-to-End Machine Learning Pipeline',
        description: 'Train XGBoost and Random Forest models with stratified cross-validation, feature engineering, and ROC-AUC metrics.',
        phaseId: 'phase-2',
        linkedSkillIds: [
          'ml-paradigms-overview',
          'ml-logistic-regression',
          'ml-xgboost-lightgbm',
          'ml-feature-engineering',
          'ml-evaluation-metrics'
        ],
        linkedProjectIds: ['proj-ml-prediction-system']
      }
    ]
  },
  {
    id: 'phase-3',
    number: 3,
    title: 'Deep Learning & Neural Networks',
    tagline: 'PyTorch, Autograd, CNNs, Transformers & Attention',
    startMonth: 7,
    endMonth: 9,
    focusTracks: ['deep-learning', 'math-for-ai'],
    primaryProjectId: 'proj-dl-cv-system',
    description: 'Deconstruct neural networks from mathematical autograd up to multi-head self-attention and Transformer architectures.',
    checkpoints: [
      {
        id: 'cp-month-7',
        monthIndex: 7,
        title: 'Month 7: Autograd & PyTorch From First Principles',
        description: 'Implement backpropagation from scratch and build custom PyTorch Datasets and DataLoaders.',
        phaseId: 'phase-3',
        linkedSkillIds: [
          'math-chain-rule-autodiff',
          'dl-perceptrons-mlp',
          'dl-pytorch-tensors-autograd',
          'dl-datasets-dataloaders',
          'dl-backprop-from-scratch'
        ],
        linkedProjectIds: ['proj-pytorch-mnist-autograd']
      },
      {
        id: 'cp-month-8',
        monthIndex: 8,
        title: 'Month 8: Optimization & Computer Vision Systems',
        description: 'Master AdamW, learning rate schedules, dropout, normalization, and train Convolutional Neural Networks.',
        phaseId: 'phase-3',
        linkedSkillIds: [
          'math-advanced-optimizers',
          'dl-optimizers-schedulers',
          'dl-normalization-layers',
          'dl-cnns-computer-vision'
        ],
        linkedProjectIds: ['proj-dl-cv-system']
      },
      {
        id: 'cp-month-9',
        monthIndex: 9,
        title: 'Month 9: The Transformer Architecture',
        description: 'Derive scaled dot-product attention and assemble complete Multi-Head Attention transformer encoder/decoder blocks.',
        phaseId: 'phase-3',
        linkedSkillIds: [
          'dl-seq2seq-encoder-decoder',
          'dl-attention-mechanism',
          'dl-transformer-architecture',
          'dl-positional-encodings'
        ],
        linkedProjectIds: ['proj-dl-cv-system']
      }
    ]
  },
  {
    id: 'phase-4',
    number: 4,
    title: 'LLM Engineering & Application Design',
    tagline: 'Tokens, Function Calling, Structured Outputs & Prompts',
    startMonth: 10,
    endMonth: 12,
    focusTracks: ['llm-engineering'],
    primaryProjectId: 'proj-llm-prompt-harness',
    description: 'Master frontier model APIs, token budget management, structured Pydantic outputs, native tool calling, and local LLM execution.',
    checkpoints: [
      {
        id: 'cp-month-10',
        monthIndex: 10,
        title: 'Month 10: Token Mechanics & Multi-Provider APIs',
        description: 'Understand BPE tokenization, context windows, decoding strategies, and build a unified multi-provider client.',
        phaseId: 'phase-4',
        linkedSkillIds: [
          'llm-tokenization-tiktoken',
          'llm-context-windows-limits',
          'llm-decoding-strategies',
          'llm-provider-apis'
        ],
        linkedProjectIds: ['proj-llm-prompt-harness']
      },
      {
        id: 'cp-month-11',
        monthIndex: 11,
        title: 'Month 11: Structured Outputs & Function Calling',
        description: 'Extract validated JSON using Pydantic V2 schemas and execute multi-tool parallel function calling.',
        phaseId: 'phase-4',
        linkedSkillIds: [
          'llm-structured-outputs-json',
          'llm-tool-calling-apis',
          'llm-streaming-sse'
        ],
        linkedProjectIds: ['proj-structured-extractor']
      },
      {
        id: 'cp-month-12',
        monthIndex: 12,
        title: 'Month 12: Advanced Prompting & Local Inference',
        description: 'Implement Chain-of-Thought prompting, system steering, and run open-source models locally with Ollama and llama.cpp.',
        phaseId: 'phase-4',
        linkedSkillIds: [
          'llm-prompt-engineering-patterns',
          'llm-huggingface-hub',
          'llm-local-execution-ollama',
          'llm-failure-modes-hallucinations'
        ],
        linkedProjectIds: ['proj-local-gguf-runner']
      }
    ]
  },
  {
    id: 'phase-5',
    number: 5,
    title: 'RAG & Autonomous AI Agents',
    tagline: 'Hybrid Search, Vector DBs, LangGraph & Agent Loops',
    startMonth: 13,
    endMonth: 15,
    focusTracks: ['rag', 'ai-agents'],
    primaryProjectId: 'proj-production-rag-platform',
    description: 'Build enterprise-grade RAG systems with hybrid search fusion and architect stateful multi-step autonomous agents with LangGraph.',
    checkpoints: [
      {
        id: 'cp-month-13',
        monthIndex: 13,
        title: 'Month 13: Ingestion, Chunking & Vector Databases',
        description: 'Build document ETL pipelines, semantic chunking, and query Qdrant and pgvector with metadata filters.',
        phaseId: 'phase-5',
        linkedSkillIds: [
          'rag-document-ingestion',
          'rag-chunking-strategies',
          'rag-embedding-generation',
          'rag-vector-databases',
          'rag-dense-retrieval'
        ],
        linkedProjectIds: ['proj-semantic-search-chroma']
      },
      {
        id: 'cp-month-14',
        monthIndex: 14,
        title: 'Month 14: Hybrid Search, Reranking & Citations',
        description: 'Combine BM25 and dense retrieval with Reciprocal Rank Fusion, apply cross-encoder rerankers, and guarantee citations.',
        phaseId: 'phase-5',
        linkedSkillIds: [
          'rag-sparse-bm25',
          'rag-hybrid-search-rrf',
          'rag-cross-encoder-reranking',
          'rag-query-rewriting',
          'rag-source-attribution'
        ],
        linkedProjectIds: ['proj-production-rag-platform']
      },
      {
        id: 'cp-month-15',
        monthIndex: 15,
        title: 'Month 15: ReAct Loops & LangGraph Agent Orchestration',
        description: 'Implement stateful agent graphs with LangGraph, planning decomposition, memory buffers, and reflection loops.',
        phaseId: 'phase-5',
        linkedSkillIds: [
          'agent-react-loops',
          'agent-state-management',
          'agent-planning-decomposition',
          'agent-short-term-memory',
          'agent-langgraph-orchestration'
        ],
        linkedProjectIds: ['proj-autonomous-research-agent']
      }
    ]
  },
  {
    id: 'phase-6',
    number: 6,
    title: 'Production AI, Evaluation & Observability',
    tagline: 'Docker, CI/CD, Cloud, Ragas, Tracing & Multi-Agent Swarms',
    startMonth: 16,
    endMonth: 18,
    focusTracks: ['ai-evaluation', 'production-ai', 'ai-agents'],
    primaryProjectId: 'proj-multi-agent-system',
    description: 'Containerize AI systems, deploy CI/CD regression evaluation with Ragas, configure OpenTelemetry distributed tracing, and build multi-agent teams.',
    checkpoints: [
      {
        id: 'cp-month-16',
        monthIndex: 16,
        title: 'Month 16: Automated AI Evaluation & Ragas',
        description: 'Curate golden test datasets, design LLM-as-a-judge rubrics, and run automated Ragas regression evals in GitHub Actions.',
        phaseId: 'phase-6',
        linkedSkillIds: [
          'eval-golden-dataset-creation',
          'eval-llm-as-judge-design',
          'eval-faithfulness-groundedness',
          'eval-ragas-framework',
          'eval-regression-testing-cicd'
        ],
        linkedProjectIds: ['proj-llm-eval-platform']
      },
      {
        id: 'cp-month-17',
        monthIndex: 17,
        title: 'Month 17: Production Containers & Cloud Infrastructure',
        description: 'Package microservices in multi-stage Docker containers, configure AWS/GCP cloud environments, and set up CI/CD.',
        phaseId: 'phase-6',
        linkedSkillIds: [
          'prod-docker-packaging',
          'prod-multi-stage-docker',
          'prod-github-actions-cicd',
          'prod-cloud-fundamentals',
          'prod-secrets-management'
        ],
        linkedProjectIds: ['proj-cicd-github-actions-ai']
      },
      {
        id: 'cp-month-18',
        monthIndex: 18,
        title: 'Month 18: Multi-Agent Production Systems & MCP',
        description: 'Deploy supervisor-led multi-agent teams with Human-in-the-Loop gates, MCP protocol servers, and OpenTelemetry tracing.',
        phaseId: 'phase-6',
        linkedSkillIds: [
          'agent-multi-agent-architectures',
          'agent-human-in-the-loop',
          'agent-mcp-protocol',
          'eval-langsmith-tracing',
          'prod-circuit-breakers-resilience'
        ],
        linkedProjectIds: ['proj-multi-agent-system']
      }
    ]
  },
  {
    id: 'phase-7',
    number: 7,
    title: 'Advanced AI Engineering & MLOps',
    tagline: 'QLoRA Fine-Tuning, vLLM, AI Security & Red Teaming',
    startMonth: 19,
    endMonth: 21,
    focusTracks: ['advanced-llm-engineering', 'ai-infrastructure', 'ai-security', 'mlops'],
    primaryProjectId: 'proj-fine-tuned-llm',
    description: 'Fine-tune domain LLMs using QLoRA 4-bit, deploy high-throughput vLLM inference with PagedAttention, and conduct automated red-teaming.',
    checkpoints: [
      {
        id: 'cp-month-19',
        monthIndex: 19,
        title: 'Month 19: QLoRA Fine-Tuning & Dataset Curation',
        description: 'Generate synthetic instruction data, train LoRA adapters with Hugging Face TRL, and evaluate against catastrophic forgetting.',
        phaseId: 'phase-7',
        linkedSkillIds: [
          'adv-peft-lora-deep-dive',
          'adv-qlora-4bit-normalfloat',
          'adv-supervised-fine-tuning',
          'adv-synthetic-data-generation',
          'mlops-weights-and-biases'
        ],
        linkedProjectIds: ['proj-fine-tuned-llm']
      },
      {
        id: 'cp-month-20',
        monthIndex: 20,
        title: 'Month 20: High-Throughput Serving & GPU Optimization',
        description: 'Deploy vLLM with continuous batching, PagedAttention KV management, and benchmark tokens-per-second throughput.',
        phaseId: 'phase-7',
        linkedSkillIds: [
          'infra-gpu-architecture-internals',
          'infra-gpu-memory-hierarchy',
          'infra-vllm-high-throughput',
          'infra-paged-attention-kv-management',
          'adv-quantization-awq-gptq'
        ],
        linkedProjectIds: ['proj-distributed-inference-service']
      },
      {
        id: 'cp-month-21',
        monthIndex: 21,
        title: 'Month 21: AI Security, Red Teaming & Guardrails',
        description: 'Conduct automated adversarial testing with PyRIT/Garak, defend against indirect prompt injections, and implement PII scrubbing.',
        phaseId: 'phase-7',
        linkedSkillIds: [
          'sec-owasp-top-10-llm',
          'sec-direct-prompt-injection',
          'sec-indirect-prompt-injection',
          'sec-data-leakage-pii',
          'sec-automated-red-teaming'
        ],
        linkedProjectIds: ['proj-ai-security-platform']
      }
    ]
  },
  {
    id: 'phase-8',
    number: 8,
    title: 'Capstone, System Design & Career Readiness',
    tagline: 'Flagship Capstone, Distributed Scale, Portfolio & Interviews',
    startMonth: 22,
    endMonth: 24,
    focusTracks: ['system-design', 'data-engineering', 'ai-infrastructure'],
    primaryProjectId: 'proj-ai-engineer-capstone',
    description: 'Complete the flagship enterprise AI platform capstone, master large-scale distributed AI system design, and polish the engineering portfolio.',
    checkpoints: [
      {
        id: 'cp-month-22',
        monthIndex: 22,
        title: 'Month 22: High-Scale AI System Design & Kubernetes',
        description: 'Architect distributed high-concurrency RAG and multi-agent platforms on Kubernetes with GPU operators.',
        phaseId: 'phase-8',
        linkedSkillIds: [
          'sys-scalability-availability-sla',
          'sys-high-scale-rag-architecture',
          'sys-autonomous-multi-agent-platform',
          'infra-kubernetes-fundamentals-ai',
          'data-apache-kafka-streaming'
        ],
        linkedProjectIds: ['proj-ai-engineer-capstone']
      },
      {
        id: 'cp-month-23',
        monthIndex: 23,
        title: 'Month 23: Capstone Build & Production Hardening',
        description: 'Ship the flagship autonomous multi-tenant AI platform with automated tests, docs, and live deployment.',
        phaseId: 'phase-8',
        linkedSkillIds: [
          'sys-cost-optimization-at-scale',
          'sys-reliability-non-deterministic',
          'sys-ai-system-interview-prep'
        ],
        linkedProjectIds: ['proj-ai-engineer-capstone']
      },
      {
        id: 'cp-month-24',
        monthIndex: 24,
        title: 'Month 24: Career Readiness, Portfolio & Technical Interview Prep',
        description: 'Complete technical portfolio website, verify all project proof items, rehearse system design interviews, and prepare resume.',
        phaseId: 'phase-8',
        linkedSkillIds: [
          'sys-ai-system-interview-prep'
        ],
        linkedProjectIds: ['proj-ai-engineer-capstone']
      }
    ]
  }
];

export const PHASES_BY_ID: Record<string, Phase> = TIMELINE_PHASES.reduce((acc, phase) => {
  acc[phase.id] = phase;
  return acc;
}, {} as Record<string, Phase>);

export const ALL_CHECKPOINTS = TIMELINE_PHASES.flatMap((p) => p.checkpoints);

export const CHECKPOINTS_BY_ID = ALL_CHECKPOINTS.reduce((acc, cp) => {
  acc[cp.id] = cp;
  return acc;
}, {} as Record<string, (typeof ALL_CHECKPOINTS)[0]>);
