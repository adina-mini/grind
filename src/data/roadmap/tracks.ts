export interface TrackMeta {
  id: string;
  title: string;
  description: string;
  iconName: string;
  category: 'Foundation' | 'Core AI' | 'Applied AI' | 'Systems & Scale';
}

export const TRACKS_METADATA: TrackMeta[] = [
  {
    id: 'software-engineering',
    title: 'Software Engineering',
    description: 'Python mastery, clean code, OOP, typing, async concurrency, testing, and modern API architecture.',
    iconName: 'Code2',
    category: 'Foundation'
  },
  {
    id: 'dsa',
    title: 'Data Structures & Algorithms',
    description: 'Algorithmic problem solving, Big-O efficiency, core data structures, trees, graphs, and dynamic programming.',
    iconName: 'Binary',
    category: 'Foundation'
  },
  {
    id: 'databases-backend',
    title: 'Databases & Backend',
    description: 'PostgreSQL, indexing, transactions, FastAPI, Pydantic, Redis caching, and resilient API architecture.',
    iconName: 'Database',
    category: 'Foundation'
  },
  {
    id: 'math-for-ai',
    title: 'Mathematics for AI',
    description: 'Linear algebra, vectors, matrices, probability, multivariate calculus, gradients, and convex optimization.',
    iconName: 'Sigma',
    category: 'Foundation'
  },
  {
    id: 'machine-learning',
    title: 'Machine Learning',
    description: 'Supervised & unsupervised learning, decision trees, XGBoost, regularization, evaluation, and feature engineering.',
    iconName: 'Cpu',
    category: 'Core AI'
  },
  {
    id: 'deep-learning',
    title: 'Deep Learning',
    description: 'PyTorch, neural network backprop, CNNs, LSTMs, attention mechanisms, and transformer architectures.',
    iconName: 'Brain',
    category: 'Core AI'
  },
  {
    id: 'llm-engineering',
    title: 'LLM Engineering',
    description: 'Tokenization, context windows, structured outputs, function calling, embeddings, and prompt architectures.',
    iconName: 'Sparkles',
    category: 'Applied AI'
  },
  {
    id: 'rag',
    title: 'RAG (Retrieval-Augmented Gen)',
    description: 'Chunking, dense/sparse retrieval, hybrid search, cross-encoder reranking, and citation-backed answer generation.',
    iconName: 'Layers',
    category: 'Applied AI'
  },
  {
    id: 'ai-agents',
    title: 'AI Agents',
    description: 'ReAct agent loops, state machines, planning, LangGraph orchestration, memory, tool sandboxing, and MCP.',
    iconName: 'Bot',
    category: 'Applied AI'
  },
  {
    id: 'ai-evaluation',
    title: 'AI Evaluation & Observability',
    description: 'Golden datasets, LLM-as-a-judge, faithfulness/relevance metrics, regression testing, Ragas, and LangSmith.',
    iconName: 'CheckCircle2',
    category: 'Applied AI'
  },
  {
    id: 'production-ai',
    title: 'Production AI',
    description: 'Docker containers, cloud architectures (AWS/GCP), CI/CD, circuit breakers, rate limits, and latency profiling.',
    iconName: 'Server',
    category: 'Systems & Scale'
  },
  {
    id: 'mlops',
    title: 'MLOps',
    description: 'Experiment tracking with W&B, DVC data versioning, model registries, drift detection, and automated pipelines.',
    iconName: 'GitBranch',
    category: 'Systems & Scale'
  },
  {
    id: 'ai-security',
    title: 'AI Security & Red Teaming',
    description: 'Prompt injection defense, jailbreaks, PII scrubbing, RAG poisoning mitigations, and secure agent sandboxing.',
    iconName: 'ShieldAlert',
    category: 'Applied AI'
  },
  {
    id: 'advanced-llm-engineering',
    title: 'Advanced LLM Engineering',
    description: 'KV cache dynamics, quantization (AWQ/GPTQ), LoRA/QLoRA fine-tuning, SFT pipelines, and DPO alignment.',
    iconName: 'Wand2',
    category: 'Core AI'
  },
  {
    id: 'ai-infrastructure',
    title: 'AI Infrastructure',
    description: 'GPU hardware & memory, CUDA fundamentals, high-throughput vLLM serving, PagedAttention, and distributed inference.',
    iconName: 'HardDrive',
    category: 'Systems & Scale'
  },
  {
    id: 'data-engineering',
    title: 'Data Engineering',
    description: 'ETL/ELT pipelines, Polars & Pandas, Apache Spark, Kafka streaming, Airflow orchestration, and Lakehouse storage.',
    iconName: 'Workflow',
    category: 'Systems & Scale'
  },
  {
    id: 'system-design',
    title: 'AI System Design',
    description: 'Large-scale distributed systems, high-concurrency RAG architectures, multi-agent platforms, and cost optimization.',
    iconName: 'Network',
    category: 'Systems & Scale'
  }
];
