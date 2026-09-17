export interface ChecklistItem {
  id: string;
  title: string;
  category: 'Foundation' | 'Core AI' | 'Applied Engineering' | 'Career & Proof';
  description: string;
  associatedTrackId?: string;
  associatedProjectId?: string;
  autoCriteria?: string; // description of auto-completion requirement
}

export const PORTFOLIO_CHECKLIST_ITEMS: ChecklistItem[] = [
  {
    id: 'chk-python',
    title: 'Strong Python Mastery',
    category: 'Foundation',
    description: 'Type safety, async concurrency, OOP protocols, generators, context managers, and packaging with UV.',
    associatedTrackId: 'software-engineering',
    autoCriteria: 'Complete >= 75% of Software Engineering skills'
  },
  {
    id: 'chk-swe',
    title: 'Software Engineering Best Practices',
    category: 'Foundation',
    description: 'Pytest test suites, clean architecture, SOLID principles, structured logging, and robust exception hierarchies.',
    associatedTrackId: 'software-engineering',
    autoCriteria: 'Complete >= 75% of Software Engineering skills'
  },
  {
    id: 'chk-dsa',
    title: 'Data Structures & Algorithms',
    category: 'Foundation',
    description: 'Trees, graphs, BFS/DFS, binary search, heaps, hash tables, dynamic programming, and Big-O trade-offs.',
    associatedTrackId: 'dsa',
    autoCriteria: 'Complete >= 75% of DSA skills'
  },
  {
    id: 'chk-backend',
    title: 'Production Backend Architecture',
    category: 'Foundation',
    description: 'FastAPI, Pydantic V2, PostgreSQL, relational schema design, indexing, transactions, and Redis caching.',
    associatedTrackId: 'databases-backend',
    autoCriteria: 'Complete >= 75% of Databases & Backend skills'
  },
  {
    id: 'chk-math',
    title: 'Mathematics for AI',
    category: 'Core AI',
    description: 'Vectors, matrix factorization (SVD), probability distributions, multivariate gradients, and convex optimization.',
    associatedTrackId: 'math-for-ai',
    autoCriteria: 'Complete >= 75% of Math for AI skills'
  },
  {
    id: 'chk-ml',
    title: 'Classical Machine Learning',
    category: 'Core AI',
    description: 'Supervised/unsupervised models, XGBoost, cross-validation, feature engineering, and ROC-AUC metrics.',
    associatedTrackId: 'machine-learning',
    autoCriteria: 'Complete >= 75% of Machine Learning skills'
  },
  {
    id: 'chk-dl',
    title: 'Deep Learning & PyTorch',
    category: 'Core AI',
    description: 'Neural networks, computational autograd graphs, Datasets/DataLoaders, CNNs, and Transformer self-attention.',
    associatedTrackId: 'deep-learning',
    autoCriteria: 'Complete >= 75% of Deep Learning skills'
  },
  {
    id: 'chk-llm',
    title: 'LLM Engineering',
    category: 'Applied Engineering',
    description: 'BPE tokenization, context windows, structured JSON outputs, native function calling, and token streaming.',
    associatedTrackId: 'llm-engineering',
    autoCriteria: 'Complete >= 75% of LLM Engineering skills'
  },
  {
    id: 'chk-rag',
    title: 'Production RAG (Retrieval-Augmented Gen)',
    category: 'Applied Engineering',
    description: 'Chunking, dense/sparse retrieval, hybrid search (RRF), cross-encoder reranking, and citation attribution.',
    associatedTrackId: 'rag',
    autoCriteria: 'Complete >= 75% of RAG skills'
  },
  {
    id: 'chk-agents',
    title: 'Autonomous AI Agents',
    category: 'Applied Engineering',
    description: 'ReAct reasoning loops, state machines, LangGraph orchestration, long-term memory, and tool sandboxing.',
    associatedTrackId: 'ai-agents',
    autoCriteria: 'Complete >= 75% of AI Agents skills'
  },
  {
    id: 'chk-eval',
    title: 'AI Evaluation & Observability',
    category: 'Applied Engineering',
    description: 'Golden datasets, LLM-as-a-judge, faithfulness/relevance metrics, regression CI testing, and Ragas.',
    associatedTrackId: 'ai-evaluation',
    autoCriteria: 'Complete >= 75% of AI Evaluation skills'
  },
  {
    id: 'chk-docker',
    title: 'Docker & Containerization',
    category: 'Applied Engineering',
    description: 'Multi-stage Dockerfiles, slim base images, non-root users, and Docker Compose local stacks.',
    associatedTrackId: 'production-ai',
    autoCriteria: 'Complete Docker skills in Production AI'
  },
  {
    id: 'chk-cloud',
    title: 'Cloud Infrastructure & CI/CD',
    category: 'Applied Engineering',
    description: 'AWS/GCP VMs, S3 object storage, managed RDS, least-privilege IAM, and GitHub Actions automation.',
    associatedTrackId: 'production-ai',
    autoCriteria: 'Complete >= 75% of Production AI skills'
  },
  {
    id: 'chk-mlops',
    title: 'MLOps & Reproducibility',
    category: 'Applied Engineering',
    description: 'Weights & Biases tracking, DVC dataset versioning, model registries, drift detection, and automated pipelines.',
    associatedTrackId: 'mlops',
    autoCriteria: 'Complete >= 75% of MLOps skills'
  },
  {
    id: 'chk-security',
    title: 'AI Security & Red Teaming',
    category: 'Applied Engineering',
    description: 'Prompt injection mitigation, jailbreak defense, PII redaction (Presidio), and automated red teaming (PyRIT).',
    associatedTrackId: 'ai-security',
    autoCriteria: 'Complete >= 75% of AI Security skills'
  },
  {
    id: 'chk-adv-llm',
    title: 'Advanced LLM & Fine-Tuning',
    category: 'Applied Engineering',
    description: 'KV cache dynamics, quantization (AWQ/GPTQ), LoRA/QLoRA 4-bit fine-tuning, and DPO alignment.',
    associatedTrackId: 'advanced-llm-engineering',
    autoCriteria: 'Complete >= 75% of Advanced LLM skills'
  },
  {
    id: 'chk-infra',
    title: 'AI Infrastructure & High-Throughput Serving',
    category: 'Applied Engineering',
    description: 'GPU memory hierarchy, CUDA profiling, vLLM serving, PagedAttention, and distributed inference.',
    associatedTrackId: 'ai-infrastructure',
    autoCriteria: 'Complete >= 75% of AI Infrastructure skills'
  },
  {
    id: 'chk-system-design',
    title: 'Large-Scale AI System Design',
    category: 'Applied Engineering',
    description: 'High-availability architectures, horizontal scaling, caching strategies, and 45-minute interview framework.',
    associatedTrackId: 'system-design',
    autoCriteria: 'Complete >= 75% of System Design skills'
  },
  {
    id: 'chk-multiple-deployments',
    title: 'Multiple Deployed Live Systems',
    category: 'Career & Proof',
    description: 'At least 3 distinct projects with live public deployment URLs accessible to users and hiring managers.',
    autoCriteria: 'At least 3 projects with live demo URLs attached'
  },
  {
    id: 'chk-strong-github',
    title: 'Strong Professional GitHub Portfolio',
    category: 'Career & Proof',
    description: 'Public repositories featuring clean code, detailed READMEs, architecture diagrams, and commit histories.',
    autoCriteria: 'At least 5 projects with valid GitHub URLs attached'
  },
  {
    id: 'chk-portfolio-website',
    title: 'Personal Portfolio & Technical Blog',
    category: 'Career & Proof',
    description: 'Personal domain showcasing project deep dives, postmortems, architecture breakdowns, and live demos.'
  },
  {
    id: 'chk-resume-interviews',
    title: 'Resume & Technical Interview Preparation',
    category: 'Career & Proof',
    description: 'ATS-tailored engineering resume highlighting metrics (e.g. reduced latency 60%, 200 QPS) and mock interviews completed.'
  },
  {
    id: 'chk-capstone',
    title: 'Flagship AI Engineer Capstone Project',
    category: 'Career & Proof',
    description: 'Complete end-to-end production AI platform verified across code, live URL, tests, eval suite, and docs.',
    associatedProjectId: 'proj-ai-engineer-capstone',
    autoCriteria: 'Complete Capstone Project with all Proof items verified'
  }
];
