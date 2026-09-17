import { Project } from '../types/project';

export const ALL_PROJECTS: Project[] = [
  // ====================================================
  // MINI PROJECTS (50 XP) - 15 Projects
  // ====================================================
  {
    id: 'proj-python-automation-toolkit',
    title: 'Python Automation & Developer CLI Toolkit',
    description: 'Build a modular CLI utility in Python 3.12 with Typer, rich terminal formatting, file hashing, log parsing, and Pytest coverage.',
    difficulty: 'Mini',
    trackId: 'software-engineering',
    phaseId: 'phase-1',
    baseXP: 50,
    estimatedHours: 15,
    requiredSkills: ['swe-python-fundamentals', 'swe-oop-design', 'swe-cli-development', 'swe-testing-pytest'],
    prerequisites: [],
    tags: ['python', 'cli', 'automation', 'pytest'],
    deliverables: ['Executable CLI package with Typer', 'Automated unit test suite with 85%+ coverage', 'Full README documentation']
  },
  {
    id: 'proj-dsa-problem-solver',
    title: 'Algorithmic Problem Engine & Benchmark Runner',
    description: 'Implement a suite of 30 classic data structures and algorithms from scratch with timing benchmarks and memory profilers.',
    difficulty: 'Mini',
    trackId: 'dsa',
    phaseId: 'phase-1',
    baseXP: 50,
    estimatedHours: 20,
    requiredSkills: ['dsa-big-o-complexity', 'dsa-arrays-strings', 'dsa-hash-maps-sets', 'dsa-bfs', 'dsa-dfs'],
    prerequisites: [],
    tags: ['dsa', 'algorithms', 'benchmarks'],
    deliverables: ['Clean implementation of trees, graphs, heaps, and DP', 'Performance comparison report across inputs']
  },
  {
    id: 'proj-vector-search-scratch',
    title: 'Vector Similarity Search from Scratch (NumPy)',
    description: 'Implement cosine similarity, Euclidean L2 distance, and dot product search using raw NumPy without vector database libraries.',
    difficulty: 'Mini',
    trackId: 'math-for-ai',
    phaseId: 'phase-2',
    baseXP: 50,
    estimatedHours: 12,
    requiredSkills: ['math-vectors-spaces', 'math-matrices-operations'],
    prerequisites: [],
    tags: ['math', 'numpy', 'vector-search'],
    deliverables: ['Matrix math vector retrieval module', 'Accuracy verification against scikit-learn metrics']
  },
  {
    id: 'proj-fastapi-crud-pydantic',
    title: 'FastAPI CRUD Service with Pydantic V2 & SQLite',
    description: 'Construct a lightweight CRUD REST microservice with request validation, dependency injection, and automatic OpenAPI documentation.',
    difficulty: 'Mini',
    trackId: 'databases-backend',
    phaseId: 'phase-2',
    baseXP: 50,
    estimatedHours: 14,
    requiredSkills: ['db-fastapi-fundamentals', 'db-pydantic-v2', 'swe-rest-http-protocols'],
    prerequisites: [],
    tags: ['fastapi', 'pydantic', 'rest-api'],
    deliverables: ['Type-safe API endpoints', 'Pydantic schemas with custom field validators', 'Interactive Swagger UI docs']
  },
  {
    id: 'proj-scikit-churn-predictor',
    title: 'Customer Churn Prediction Model (Scikit-Learn)',
    description: 'Train and evaluate Logistic Regression, Random Forest, and XGBoost models on tabular data with cross-validation and ROC-AUC curves.',
    difficulty: 'Mini',
    trackId: 'machine-learning',
    phaseId: 'phase-2',
    baseXP: 50,
    estimatedHours: 16,
    requiredSkills: ['ml-logistic-regression', 'ml-random-forests', 'ml-train-val-test-splits', 'ml-evaluation-metrics'],
    prerequisites: [],
    tags: ['ml', 'scikit-learn', 'classification', 'evaluation'],
    deliverables: ['Scikit-learn training pipeline', 'Confusion matrix & ROC-AUC comparison report']
  },
  {
    id: 'proj-pytorch-mnist-autograd',
    title: 'PyTorch Image Classifier & Micrograd Engine',
    description: 'Build a multi-layer neural network from scratch using automatic differentiation, followed by training an MLP on MNIST in PyTorch.',
    difficulty: 'Mini',
    trackId: 'deep-learning',
    phaseId: 'phase-3',
    baseXP: 50,
    estimatedHours: 18,
    requiredSkills: ['dl-perceptrons-mlp', 'dl-pytorch-tensors-autograd', 'dl-backprop-from-scratch'],
    prerequisites: [],
    tags: ['pytorch', 'deep-learning', 'autograd', 'mnist'],
    deliverables: ['Custom autograd scalar engine', 'PyTorch training loop reaching 97%+ accuracy on MNIST']
  },
  {
    id: 'proj-llm-prompt-harness',
    title: 'Multi-Model Prompt Testing & Benchmark Harness',
    description: 'Create a CLI tool to execute identical prompts across OpenAI, Anthropic, and Gemini with cost calculations and latency metrics.',
    difficulty: 'Mini',
    trackId: 'llm-engineering',
    phaseId: 'phase-4',
    baseXP: 50,
    estimatedHours: 14,
    requiredSkills: ['llm-tokenization-tiktoken', 'llm-provider-apis', 'llm-decoding-strategies'],
    prerequisites: [],
    tags: ['llm', 'prompting', 'benchmarking', 'apis'],
    deliverables: ['Multi-provider client with structured response timing', 'Comparative markdown generation report']
  },
  {
    id: 'proj-structured-extractor',
    title: 'Structured Invoice & Receipt Extractor with JSON Mode',
    description: 'Extract structured line-item data and financial totals from unstructured OCR text using Pydantic V2 and OpenAI structured outputs.',
    difficulty: 'Mini',
    trackId: 'llm-engineering',
    phaseId: 'phase-4',
    baseXP: 50,
    estimatedHours: 14,
    requiredSkills: ['llm-structured-outputs-json', 'db-pydantic-v2'],
    prerequisites: [],
    tags: ['structured-outputs', 'pydantic', 'json-mode'],
    deliverables: ['Validated JSON invoice schema', 'Handling edge-case missing fields gracefully']
  },
  {
    id: 'proj-semantic-search-chroma',
    title: 'Local Semantic Document Search with ChromaDB',
    description: 'Ingest local Markdown and PDF technical notes, generate embeddings, and provide sub-second semantic search in terminal.',
    difficulty: 'Mini',
    trackId: 'rag',
    phaseId: 'phase-5',
    baseXP: 50,
    estimatedHours: 12,
    requiredSkills: ['llm-embeddings-similarity', 'rag-vector-databases', 'rag-dense-retrieval'],
    prerequisites: [],
    tags: ['chromadb', 'embeddings', 'semantic-search'],
    deliverables: ['Local ChromaDB collection indexer', 'Interactive terminal query interface']
  },
  {
    id: 'proj-simple-calculator-agent',
    title: 'Single-Turn ReAct Agent with Custom Python Tools',
    description: 'Implement a minimal ReAct loop from first principles supporting calculator and Wikipedia lookup tools with loop bounds.',
    difficulty: 'Mini',
    trackId: 'ai-agents',
    phaseId: 'phase-5',
    baseXP: 50,
    estimatedHours: 14,
    requiredSkills: ['llm-tool-calling-apis', 'agent-react-loops'],
    prerequisites: [],
    tags: ['react-loop', 'agents', 'tools'],
    deliverables: ['Handcrafted reasoning loop', 'Safe tool execution sandbox']
  },
  {
    id: 'proj-eval-assertion-suite',
    title: 'Deterministic Assertion Suite for LLM Responses',
    description: 'Build a pytest test suite verifying LLM outputs against required keys, length constraints, regex patterns, and banned words.',
    difficulty: 'Mini',
    trackId: 'ai-evaluation',
    phaseId: 'phase-6',
    baseXP: 50,
    estimatedHours: 10,
    requiredSkills: ['eval-programmatic-assertions', 'swe-testing-pytest'],
    prerequisites: [],
    tags: ['evaluation', 'assertions', 'pytest'],
    deliverables: ['Automated test harness for CI', 'Pass/fail report generation']
  },
  {
    id: 'proj-dockerized-llm-service',
    title: 'Dockerized Microservice with Health Probes',
    description: 'Package a FastAPI service into an optimized multi-stage Docker container with non-root user and /healthz and /readyz endpoints.',
    difficulty: 'Mini',
    trackId: 'production-ai',
    phaseId: 'phase-6',
    baseXP: 50,
    estimatedHours: 10,
    requiredSkills: ['prod-docker-packaging', 'prod-health-checks-graceful-shutdown'],
    prerequisites: [],
    tags: ['docker', 'health-checks', 'production'],
    deliverables: ['Optimized Dockerfile (<150MB)', 'Health check verification scripts']
  },
  {
    id: 'proj-pii-scrubber-proxy',
    title: 'Real-Time PII Scrubber Middleware (Presidio)',
    description: 'Build an HTTP proxy middleware that scrubs emails, credit cards, and names from prompts before relaying to third-party LLMs.',
    difficulty: 'Mini',
    trackId: 'ai-security',
    phaseId: 'phase-7',
    baseXP: 50,
    estimatedHours: 14,
    requiredSkills: ['sec-data-leakage-pii', 'db-fastapi-fundamentals'],
    prerequisites: [],
    tags: ['pii', 'security', 'presidio'],
    deliverables: ['FastAPI anonymization middleware', 'Verification test suite on synthetic sensitive documents']
  },
  {
    id: 'proj-data-pipeline-polars',
    title: 'High-Speed Log Processing Pipeline with Polars',
    description: 'Process 5GB of web server access logs in seconds using Polars lazy evaluation, calculating hourly error rates and IP percentiles.',
    difficulty: 'Mini',
    trackId: 'data-engineering',
    phaseId: 'phase-8',
    baseXP: 50,
    estimatedHours: 12,
    requiredSkills: ['data-polars-high-performance', 'data-parquet-columnar-storage'],
    prerequisites: [],
    tags: ['polars', 'data-engineering', 'parquet'],
    deliverables: ['Polars processing script outputting Parquet files', 'Memory and runtime benchmark report']
  },
  {
    id: 'proj-local-gguf-runner',
    title: 'Local Llama 3 GGUF Runner with llama.cpp Python',
    description: 'Configure and run quantized Llama 3 8B locally on CPU/GPU, optimizing context length and thread concurrency.',
    difficulty: 'Mini',
    trackId: 'llm-engineering',
    phaseId: 'phase-4',
    baseXP: 50,
    estimatedHours: 10,
    requiredSkills: ['llm-local-execution-ollama'],
    prerequisites: [],
    tags: ['llama-cpp', 'gguf', 'local-llm'],
    deliverables: ['Automated setup script', 'Benchmark showing tokens/second across thread counts']
  },

  // ====================================================
  // INTERMEDIATE PROJECTS (100 XP) - 20 Projects
  // ====================================================
  {
    id: 'proj-production-rest-api',
    title: 'Production REST API with PostgreSQL, Redis & JWT Auth',
    description: 'Architect a production FastAPI backend with PostgreSQL, Alembic migrations, Redis caching, JWT auth, and Docker Compose.',
    difficulty: 'Intermediate',
    trackId: 'databases-backend',
    phaseId: 'phase-2',
    baseXP: 100,
    estimatedHours: 35,
    requiredSkills: [
      'db-fastapi-fundamentals',
      'db-postgres-internals',
      'db-schema-migrations',
      'db-redis-caching',
      'swe-auth-security',
      'db-rate-limiting'
    ],
    prerequisites: ['proj-fastapi-crud-pydantic'],
    tags: ['fastapi', 'postgresql', 'redis', 'jwt', 'docker'],
    deliverables: ['Dockerized multi-container backend', 'Alembic migration history', 'Rate limited authenticated endpoints', 'Postman/OpenAPI collection']
  },
  {
    id: 'proj-ml-prediction-system',
    title: 'End-to-End ML Pipeline & Model Serving Service',
    description: 'Build an end-to-end churn or risk scoring pipeline with feature engineering, XGBoost training, MLflow tracking, and API serving.',
    difficulty: 'Intermediate',
    trackId: 'machine-learning',
    phaseId: 'phase-2',
    baseXP: 100,
    estimatedHours: 30,
    requiredSkills: [
      'ml-xgboost-lightgbm',
      'ml-feature-engineering',
      'ml-preventing-data-leakage',
      'ml-probability-calibration',
      'mlops-experiment-tracking-principles'
    ],
    prerequisites: ['proj-scikit-churn-predictor'],
    tags: ['ml', 'xgboost', 'mlflow', 'feature-engineering'],
    deliverables: ['Reproducible ML pipeline', 'MLflow experiment runs with metrics', 'REST inference endpoint returning calibrated probabilities']
  },
  {
    id: 'proj-dl-cv-system',
    title: 'Deep Learning Vision Classifier with PyTorch & Transfer Learning',
    description: 'Fine-tune a pretrained ResNet or Vision Transformer (ViT) on a custom image classification dataset with data augmentations.',
    difficulty: 'Intermediate',
    trackId: 'deep-learning',
    phaseId: 'phase-3',
    baseXP: 100,
    estimatedHours: 35,
    requiredSkills: [
      'dl-pytorch-tensors-autograd',
      'dl-datasets-dataloaders',
      'dl-cnns-computer-vision',
      'dl-optimizers-schedulers',
      'dl-vision-transformers'
    ],
    prerequisites: ['proj-pytorch-mnist-autograd'],
    tags: ['pytorch', 'vision-transformer', 'transfer-learning', 'cv'],
    deliverables: ['Modular PyTorch training pipeline', 'W&B loss and validation accuracy curves', 'Exported ONNX model artifact']
  },
  {
    id: 'proj-production-rag-platform',
    title: 'Production RAG Platform with Hybrid Search & Reranking',
    description: 'Build a full RAG system indexing 50+ technical documents using Qdrant, BM25 + dense hybrid search, Reciprocal Rank Fusion, and Cohere reranking.',
    difficulty: 'Intermediate',
    trackId: 'rag',
    phaseId: 'phase-5',
    baseXP: 100,
    estimatedHours: 40,
    requiredSkills: [
      'rag-chunking-strategies',
      'rag-vector-databases',
      'rag-hybrid-search-rrf',
      'rag-cross-encoder-reranking',
      'rag-source-attribution'
    ],
    prerequisites: ['proj-semantic-search-chroma'],
    tags: ['rag', 'qdrant', 'hybrid-search', 'reranking', 'citations'],
    deliverables: ['Hybrid retrieval engine with RRF', 'Cross-encoder reranker', 'Citation-linked responses', 'Comprehensive README']
  },
  {
    id: 'proj-autonomous-research-agent',
    title: 'Autonomous Web Research Agent with LangGraph',
    description: 'Build a multi-step research agent using LangGraph that breaks down questions, queries search APIs, reads pages, and drafts a markdown report.',
    difficulty: 'Intermediate',
    trackId: 'ai-agents',
    phaseId: 'phase-5',
    baseXP: 100,
    estimatedHours: 40,
    requiredSkills: [
      'agent-react-loops',
      'agent-state-management',
      'agent-planning-decomposition',
      'agent-langgraph-orchestration',
      'agent-reflection-self-correction'
    ],
    prerequisites: ['proj-simple-calculator-agent'],
    tags: ['langgraph', 'agents', 'research', 'planning'],
    deliverables: ['Compiled LangGraph state machine', 'Web search & parsing tool integrations', 'Self-reflection correction step']
  },
  {
    id: 'proj-llm-eval-platform',
    title: 'Automated Evaluation Suite with Golden Datasets & Ragas',
    description: 'Curate a 50-item golden test set and build an automated evaluation runner testing faithfulness, answer relevance, and context recall.',
    difficulty: 'Intermediate',
    trackId: 'ai-evaluation',
    phaseId: 'phase-6',
    baseXP: 100,
    estimatedHours: 30,
    requiredSkills: [
      'eval-golden-dataset-creation',
      'eval-llm-as-judge-design',
      'eval-faithfulness-groundedness',
      'eval-ragas-framework',
      'eval-regression-testing-cicd'
    ],
    prerequisites: ['proj-eval-assertion-suite'],
    tags: ['evaluation', 'ragas', 'golden-dataset', 'llm-judge'],
    deliverables: ['Curated ground-truth dataset in JSONL', 'Ragas automated scoring pipeline', 'CI/CD workflow running regressions']
  },
  {
    id: 'proj-async-redis-task-queue',
    title: 'Distributed Background Inference Worker with ARQ & Redis',
    description: 'Implement an asynchronous job queue for long-running batch LLM calls with priority queues, retries, and job status polling.',
    difficulty: 'Intermediate',
    trackId: 'databases-backend',
    phaseId: 'phase-2',
    baseXP: 100,
    estimatedHours: 25,
    requiredSkills: ['db-background-tasks', 'db-redis-caching', 'swe-asyncio-concurrency'],
    prerequisites: ['proj-fastapi-crud-pydantic'],
    tags: ['redis', 'arq', 'background-worker', 'async'],
    deliverables: ['Worker service with job concurrency control', 'REST endpoints to enqueue and poll job results']
  },
  {
    id: 'proj-semantic-router-gateway',
    title: 'Intelligent Semantic Query Router & Model Dispatcher',
    description: 'Embed incoming user queries and route simple queries to small cheap models and complex reasoning queries to frontier models.',
    difficulty: 'Intermediate',
    trackId: 'llm-engineering',
    phaseId: 'phase-4',
    baseXP: 100,
    estimatedHours: 25,
    requiredSkills: ['llm-embeddings-similarity', 'llm-model-selection-benchmarking', 'prod-cost-monitoring-budgeting'],
    prerequisites: ['proj-llm-prompt-harness'],
    tags: ['semantic-router', 'cost-optimization', 'gateway'],
    deliverables: ['Embedding-based intent classifier router', 'Cost savings analysis log against 1,000 queries']
  },
  {
    id: 'proj-rag-hyde-rewriter',
    title: 'HyDE & Multi-Query Retrieval Engine for Complex Questions',
    description: 'Implement Hypothetical Document Embeddings (HyDE) and query decomposition to answer multi-hop questions over technical docs.',
    difficulty: 'Intermediate',
    trackId: 'rag',
    phaseId: 'phase-5',
    baseXP: 100,
    estimatedHours: 30,
    requiredSkills: ['rag-query-rewriting', 'rag-multi-query-retrieval', 'rag-dense-retrieval'],
    prerequisites: ['proj-semantic-search-chroma'],
    tags: ['hyde', 'rag', 'query-rewriting', 'multi-hop'],
    deliverables: ['HyDE generator and multi-query pipeline', 'Before-and-after Hit Rate benchmark comparison']
  },
  {
    id: 'proj-mcp-github-server',
    title: 'Custom Model Context Protocol (MCP) Server for Git/GitHub',
    description: 'Author an Anthropic MCP server in Python exposing tools to inspect commits, list issues, search code, and generate PR summaries.',
    difficulty: 'Intermediate',
    trackId: 'ai-agents',
    phaseId: 'phase-6',
    baseXP: 100,
    estimatedHours: 30,
    requiredSkills: ['agent-mcp-protocol', 'agent-tool-execution-sandboxing'],
    prerequisites: ['proj-simple-calculator-agent'],
    tags: ['mcp', 'github', 'model-context-protocol'],
    deliverables: ['Standard compliant MCP server', 'Client test harness verifying Claude Desktop compatibility']
  },
  {
    id: 'proj-cicd-github-actions-ai',
    title: 'End-to-End AI Service CI/CD Pipeline on GitHub Actions',
    description: 'Build a production CI/CD pipeline that tests, builds Docker images, scans security vulnerabilities with Trivy, and tests deployments.',
    difficulty: 'Intermediate',
    trackId: 'production-ai',
    phaseId: 'phase-6',
    baseXP: 100,
    estimatedHours: 25,
    requiredSkills: ['prod-github-actions-cicd', 'prod-multi-stage-docker', 'prod-secrets-management'],
    prerequisites: ['proj-dockerized-llm-service'],
    tags: ['ci-cd', 'github-actions', 'trivy', 'docker'],
    deliverables: ['Complete .github/workflows YAML suite', 'Green build badge and container registry deployment']
  },
  {
    id: 'proj-wandb-sweeps-pipeline',
    title: 'Automated Hyperparameter Sweep Pipeline with W&B',
    description: 'Run Bayesian hyperparameter sweeps across learning rates, batch sizes, and optimizer schedules for neural network training.',
    difficulty: 'Intermediate',
    trackId: 'mlops',
    phaseId: 'phase-7',
    baseXP: 100,
    estimatedHours: 25,
    requiredSkills: ['mlops-weights-and-biases', 'ml-hyperparameter-optimization'],
    prerequisites: ['proj-pytorch-mnist-autograd'],
    tags: ['wandb', 'hyperparameters', 'sweeps'],
    deliverables: ['W&B sweep configuration YAML', 'Parallel coordinate plot comparing 50+ runs']
  },
  {
    id: 'proj-dvc-reproducible-pipeline',
    title: 'Data & Model Versioning Pipeline with DVC & S3',
    description: 'Construct a reproducible dvc.yaml data pipeline tracking dataset hashing, preprocessing, training, and evaluation artifacts.',
    difficulty: 'Intermediate',
    trackId: 'mlops',
    phaseId: 'phase-7',
    baseXP: 100,
    estimatedHours: 25,
    requiredSkills: ['mlops-data-versioning-dvc', 'prod-s3-object-storage'],
    prerequisites: ['proj-scikit-churn-predictor'],
    tags: ['dvc', 'reproducibility', 's3', 'mlops'],
    deliverables: ['dvc.yaml multi-stage pipeline', 'Git repo demonstrating reproduction of results on new machine']
  },
  {
    id: 'proj-prompt-injection-detector',
    title: 'Dual-Layer Prompt Injection Classifier & Guardrail',
    description: 'Build an input classification guardrail combining fast regex delimiters and a fine-tuned DeBERTa classifier to stop jailbreaks.',
    difficulty: 'Intermediate',
    trackId: 'ai-security',
    phaseId: 'phase-7',
    baseXP: 100,
    estimatedHours: 30,
    requiredSkills: ['sec-direct-prompt-injection', 'sec-jailbreaks-adversarial', 'agent-guardrails-input-output'],
    prerequisites: ['proj-pii-scrubber-proxy'],
    tags: ['prompt-injection', 'guardrails', 'security', 'deberta'],
    deliverables: ['High-speed guardrail middleware (<50ms latency)', 'Benchmark over 200 adversarial jailbreak prompts']
  },
  {
    id: 'proj-evidently-drift-monitor',
    title: 'Automated Model Drift Monitoring Dashboard (Evidently AI)',
    description: 'Set up automated drift detection comparing production feature distributions against baseline data and generating HTML reports.',
    difficulty: 'Intermediate',
    trackId: 'mlops',
    phaseId: 'phase-7',
    baseXP: 100,
    estimatedHours: 25,
    requiredSkills: ['mlops-data-drift-detection', 'mlops-production-model-monitoring'],
    prerequisites: ['proj-ml-prediction-system'],
    tags: ['data-drift', 'evidently', 'monitoring'],
    deliverables: ['Automated drift evaluation script', 'Sample HTML report identifying corrupted feature columns']
  },
  {
    id: 'proj-opentelemetry-tracing-service',
    title: 'Distributed Tracing for Multi-Step AI Pipelines',
    description: 'Instrument an agent and RAG pipeline with OpenTelemetry spans to visualize retrieval latency, LLM TTFT, and tool call timelines.',
    difficulty: 'Intermediate',
    trackId: 'production-ai',
    phaseId: 'phase-6',
    baseXP: 100,
    estimatedHours: 25,
    requiredSkills: ['prod-opentelemetry-distributed-tracing', 'prod-latency-profiling'],
    prerequisites: ['proj-production-rest-api'],
    tags: ['opentelemetry', 'tracing', 'jaeger', 'observability'],
    deliverables: ['Trace-instrumented pipeline code', 'Jaeger dashboard screenshot identifying the primary latency bottleneck']
  },
  {
    id: 'proj-streaming-data-pipeline',
    title: 'Batch & Stream Processing Pipeline with Spark & Parquet',
    description: 'Build a data transformation pipeline with PySpark reading from JSON streams, validating schemas with Pandera, and writing to Parquet.',
    difficulty: 'Intermediate',
    trackId: 'data-engineering',
    phaseId: 'phase-8',
    baseXP: 100,
    estimatedHours: 30,
    requiredSkills: ['data-spark-dataframes-catalyst', 'data-validation-pandera', 'data-parquet-columnar-storage'],
    prerequisites: ['proj-data-pipeline-polars'],
    tags: ['spark', 'pyspark', 'data-engineering', 'parquet'],
    deliverables: ['PySpark ETL job script', 'Data validation checks rejecting malformed rows']
  },
  {
    id: 'proj-sft-dataset-curator',
    title: 'Synthetic SFT Instruction Dataset Generator with Quality Filtering',
    description: 'Generate 1,000 high-diversity domain instruction-tuning examples using seed tasks, self-instruct prompts, and deduplication.',
    difficulty: 'Intermediate',
    trackId: 'advanced-llm-engineering',
    phaseId: 'phase-7',
    baseXP: 100,
    estimatedHours: 30,
    requiredSkills: ['adv-dataset-preparation-filtering', 'adv-synthetic-data-generation'],
    prerequisites: ['proj-structured-extractor'],
    tags: ['synthetic-data', 'sft', 'dataset-curation'],
    deliverables: ['Cleaned JSONL dataset adhering to ChatML format', 'MinHash deduplication script and summary metrics']
  },
  {
    id: 'proj-token-budget-limiter',
    title: 'Multi-Tenant Token Quota & Cost Enforcer',
    description: 'Implement a middleware tracking per-user and per-organization token consumption with hard budget stops and Redis rate limiting.',
    difficulty: 'Intermediate',
    trackId: 'production-ai',
    phaseId: 'phase-6',
    baseXP: 100,
    estimatedHours: 25,
    requiredSkills: ['prod-cost-monitoring-budgeting', 'db-rate-limiting'],
    prerequisites: ['proj-production-rest-api'],
    tags: ['cost-tracking', 'quotas', 'multi-tenant'],
    deliverables: ['FastAPI token metering dependency', 'Database schema for usage audit logs']
  },
  {
    id: 'proj-vector-indexer-benchmarker',
    title: 'HNSW vs IVFFlat Vector Index Performance Benchmarker',
    description: 'Benchmark query latency, recall@10, and index build times between HNSW and IVFFlat across 100k vectors in Qdrant and pgvector.',
    difficulty: 'Intermediate',
    trackId: 'databases-backend',
    phaseId: 'phase-2',
    baseXP: 100,
    estimatedHours: 25,
    requiredSkills: ['db-vector-storage-overview', 'rag-vector-databases'],
    prerequisites: ['proj-vector-search-scratch'],
    tags: ['hnsw', 'ivfflat', 'vector-benchmarks', 'pgvector'],
    deliverables: ['Automated benchmarking script', 'Markdown report analyzing recall vs QPS tradeoffs']
  },

  // ====================================================
  // ADVANCED PROJECTS (200 XP) - 12 Projects
  // ====================================================
  {
    id: 'proj-multi-agent-system',
    title: 'Multi-Agent Production System (Supervisor + Swarm)',
    description: 'Architect an enterprise multi-agent team with LangGraph: Supervisor delegates to Researcher, Coder, and Critic agents with HITL approval gates.',
    difficulty: 'Advanced',
    trackId: 'ai-agents',
    phaseId: 'phase-6',
    baseXP: 200,
    estimatedHours: 60,
    requiredSkills: [
      'agent-multi-agent-architectures',
      'agent-human-in-the-loop',
      'agent-langgraph-orchestration',
      'agent-mcp-protocol',
      'eval-agent-trajectory-accuracy',
      'prod-circuit-breakers-resilience'
    ],
    prerequisites: ['proj-autonomous-research-agent', 'proj-production-rag-platform'],
    tags: ['multi-agent', 'langgraph', 'swarm', 'hitl', 'enterprise'],
    deliverables: ['Full multi-agent graph with persistent state', 'Human-in-the-loop web UI or CLI review mechanism', 'Comprehensive unit and trajectory test suite']
  },
  {
    id: 'proj-fine-tuned-llm',
    title: 'Fine-Tuned Open Source Domain LLM with QLoRA & SFT',
    description: 'Fine-tune a Llama 3 8B or Mistral model on a domain dataset using QLoRA 4-bit, Hugging Face TRL, W&B tracking, and merge weights.',
    difficulty: 'Advanced',
    trackId: 'advanced-llm-engineering',
    phaseId: 'phase-7',
    baseXP: 200,
    estimatedHours: 50,
    requiredSkills: [
      'adv-qlora-4bit-normalfloat',
      'adv-peft-lora-deep-dive',
      'adv-supervised-fine-tuning',
      'adv-catastrophic-forgetting-eval',
      'mlops-weights-and-biases'
    ],
    prerequisites: ['proj-sft-dataset-curator'],
    tags: ['qlora', 'fine-tuning', 'llama-3', 'peft', 'trl'],
    deliverables: ['Fine-tuning training script and config', 'Evaluation benchmark comparing base vs fine-tuned on test split', 'Exported LoRA adapter on Hugging Face']
  },
  {
    id: 'proj-distributed-inference-service',
    title: 'High-Throughput Distributed Inference Service with vLLM & Ray',
    description: 'Deploy an auto-scaling LLM inference cluster using vLLM, continuous batching, PagedAttention, and Ray Serve on multiple GPUs.',
    difficulty: 'Advanced',
    trackId: 'ai-infrastructure',
    phaseId: 'phase-7',
    baseXP: 200,
    estimatedHours: 50,
    requiredSkills: [
      'infra-vllm-high-throughput',
      'infra-paged-attention-kv-management',
      'infra-continuous-batching',
      'infra-ray-serve-model-composition',
      'prod-latency-profiling'
    ],
    prerequisites: ['proj-dockerized-llm-service'],
    tags: ['vllm', 'ray-serve', 'inference', 'distributed-systems'],
    deliverables: ['Ray Serve deployment manifest', 'Locust load testing report demonstrating sustained 200+ tokens/sec']
  },
  {
    id: 'proj-ai-security-platform',
    title: 'AI Security Testing & Automated Red Teaming Platform',
    description: 'Build an automated adversarial testing platform using PyRIT/Garak that probes target LLMs for prompt injection, jailbreaks, and PII leakage.',
    difficulty: 'Advanced',
    trackId: 'ai-security',
    phaseId: 'phase-7',
    baseXP: 200,
    estimatedHours: 50,
    requiredSkills: [
      'sec-automated-red-teaming',
      'sec-indirect-prompt-injection',
      'sec-jailbreaks-adversarial',
      'sec-audit-logging-tamper-evident',
      'agent-guardrails-input-output'
    ],
    prerequisites: ['proj-prompt-injection-detector'],
    tags: ['security', 'red-teaming', 'pyrit', 'garak', 'vulnerabilities'],
    deliverables: ['Automated probing harness executing 500+ attack vectors', 'Security vulnerability audit report with remediation guide']
  },
  {
    id: 'proj-dpo-alignment-pipeline',
    title: 'Direct Preference Optimization (DPO) Model Alignment',
    description: 'Align a language model to human preferences using pairwise comparison data, implementing DPO loss in Hugging Face TRL.',
    difficulty: 'Advanced',
    trackId: 'advanced-llm-engineering',
    phaseId: 'phase-7',
    baseXP: 200,
    estimatedHours: 45,
    requiredSkills: [
      'adv-dpo-direct-preference',
      'adv-supervised-fine-tuning',
      'math-information-theory'
    ],
    prerequisites: ['proj-fine-tuned-llm'],
    tags: ['dpo', 'alignment', 'trl', 'preferences'],
    deliverables: ['DPO training script with chosen/rejected validation loss', 'Win-rate comparison evaluation script against baseline SFT']
  },
  {
    id: 'proj-graphrag-system',
    title: 'GraphRAG: Knowledge Graph Extraction & Global Search',
    description: 'Build a GraphRAG system that extracts entity-relation graphs from text, creates community clusters, and summarizes global themes.',
    difficulty: 'Advanced',
    trackId: 'rag',
    phaseId: 'phase-5',
    baseXP: 200,
    estimatedHours: 55,
    requiredSkills: [
      'rag-graph-rag-concepts',
      'rag-generation-evaluation-ragas',
      'dsa-graph-representations'
    ],
    prerequisites: ['proj-production-rag-platform'],
    tags: ['graphrag', 'knowledge-graph', 'summarization'],
    deliverables: ['Graph extraction pipeline storing nodes/edges', 'Global community query answering engine']
  },
  {
    id: 'proj-k8s-ai-cluster',
    title: 'Production Kubernetes AI Cluster with GPU Operator',
    description: 'Deploy an automated Kubernetes cluster hosting vLLM, Qdrant, and an API gateway with GPU resource scheduling and autoscaling.',
    difficulty: 'Advanced',
    trackId: 'ai-infrastructure',
    phaseId: 'phase-8',
    baseXP: 200,
    estimatedHours: 45,
    requiredSkills: [
      'infra-kubernetes-fundamentals-ai',
      'infra-gpu-operator-k8s',
      'prod-multi-stage-docker'
    ],
    prerequisites: ['proj-distributed-inference-service'],
    tags: ['kubernetes', 'k8s', 'gpu-operator', 'infrastructure'],
    deliverables: ['K8s manifests (Helm charts or Kustomize)', 'Horizontal Pod Autoscaler (HPA) configured on custom metrics']
  },
  {
    id: 'proj-realtime-voice-agent',
    title: 'Sub-300ms Real-Time Voice Agent with WebSockets',
    description: 'Build a full-duplex voice assistant streaming audio over WebSockets, with Whisper speech-to-text, fast LLM, and ElevenLabs/Bark TTS.',
    difficulty: 'Advanced',
    trackId: 'system-design',
    phaseId: 'phase-8',
    baseXP: 200,
    estimatedHours: 50,
    requiredSkills: [
      'sys-realtime-voice-multimodal',
      'db-websockets-streaming',
      'swe-asyncio-concurrency'
    ],
    prerequisites: ['proj-production-rest-api'],
    tags: ['voice-agent', 'websockets', 'low-latency', 'streaming'],
    deliverables: ['Low-latency asynchronous audio streaming pipeline', 'Browser audio client with visualizer']
  },
  {
    id: 'proj-enterprise-llm-gateway',
    title: 'Enterprise LLM Gateway & Dynamic Semantic Router',
    description: 'Design a centralized gateway offering rate limiting, prompt caching, PII redaction, token budgets, and fallback providers.',
    difficulty: 'Advanced',
    trackId: 'system-design',
    phaseId: 'phase-8',
    baseXP: 200,
    estimatedHours: 45,
    requiredSkills: [
      'sys-llm-gateway-smart-routing',
      'sys-cost-optimization-at-scale',
      'llm-semantic-caching',
      'prod-circuit-breakers-resilience'
    ],
    prerequisites: ['proj-semantic-router-gateway', 'proj-token-budget-limiter'],
    tags: ['llm-gateway', 'routing', 'caching', 'resilience'],
    deliverables: ['Unified reverse-proxy gateway', 'Admin analytics dashboard visualizing token spend and latency']
  },
  {
    id: 'proj-lakehouse-etl-iceberg',
    title: 'Lakehouse Data Pipeline with Apache Iceberg & Spark',
    description: 'Implement an incremental ELT pipeline loading parquet data into Apache Iceberg tables with partition evolution and time-travel.',
    difficulty: 'Advanced',
    trackId: 'data-engineering',
    phaseId: 'phase-8',
    baseXP: 200,
    estimatedHours: 45,
    requiredSkills: [
      'data-lakehouse-iceberg',
      'data-spark-dataframes-catalyst',
      'data-apache-airflow-orchestration'
    ],
    prerequisites: ['proj-streaming-data-pipeline'],
    tags: ['lakehouse', 'iceberg', 'spark', 'airflow'],
    deliverables: ['Airflow DAG orchestrating Spark jobs', 'Demonstration of Iceberg snapshot time-travel queries']
  },
  {
    id: 'proj-red-team-benchmark-dataset',
    title: 'Public Open-Source Adversarial Benchmark Dataset',
    description: 'Author and publish an open-source evaluation dataset of 300 novel multimodal or text jailbreak attack prompts on Hugging Face.',
    difficulty: 'Advanced',
    trackId: 'ai-security',
    phaseId: 'phase-7',
    baseXP: 200,
    estimatedHours: 40,
    requiredSkills: [
      'sec-automated-red-teaming',
      'sec-owasp-top-10-llm',
      'eval-golden-dataset-creation'
    ],
    prerequisites: ['proj-ai-security-platform'],
    tags: ['open-source', 'dataset', 'red-team', 'security'],
    deliverables: ['Published dataset with documentation on Hugging Face', 'Technical methodology report']
  },
  {
    id: 'proj-distributed-crawler-vectorizer',
    title: 'High-Concurrency Web Crawler & Vectorization Engine',
    description: 'Build an async distributed web crawler with Playwright/httpx and Redis queues, parsing and vectorizing 10,000 pages concurrently.',
    difficulty: 'Advanced',
    trackId: 'data-engineering',
    phaseId: 'phase-8',
    baseXP: 200,
    estimatedHours: 45,
    requiredSkills: [
      'swe-asyncio-concurrency',
      'data-apache-kafka-streaming',
      'rag-embedding-generation'
    ],
    prerequisites: ['proj-production-rag-platform'],
    tags: ['crawler', 'distributed', 'embeddings', 'kafka'],
    deliverables: ['Async crawler with politeness limits & backpressure', 'Vector embedding bulk upsert pipeline']
  },

  // ====================================================
  // CAPSTONE PROJECTS (500 XP) - 3 Flagship Projects
  // ====================================================
  {
    id: 'proj-ai-engineer-capstone',
    title: 'AI Engineer Capstone: Autonomous Multi-Tenant AI Platform',
    description: 'The definitive capstone: an autonomous, multi-tenant enterprise AI platform combining LangGraph multi-agent orchestration, hybrid RAG with pgvector/Qdrant, continuous evaluation with Ragas, automated red-teaming guardrails, and full observability deployed via Docker & Kubernetes.',
    difficulty: 'Capstone',
    trackId: 'system-design',
    phaseId: 'phase-8',
    baseXP: 500,
    estimatedHours: 120,
    requiredSkills: [
      'sys-autonomous-multi-agent-platform',
      'sys-high-scale-rag-architecture',
      'agent-multi-agent-architectures',
      'rag-hybrid-search-rrf',
      'eval-ragas-framework',
      'sec-automated-red-teaming',
      'prod-github-actions-cicd',
      'infra-kubernetes-fundamentals-ai'
    ],
    prerequisites: ['proj-multi-agent-system', 'proj-production-rag-platform', 'proj-ai-security-platform'],
    tags: ['capstone', 'enterprise-ai', 'multi-agent', 'rag', 'production', 'flagship'],
    deliverables: [
      'Production-grade Git repository with full test coverage',
      'Live deployed application with public URL',
      'System Architecture Design Document with interactive Mermaid diagrams',
      'Automated regression evaluation suite in CI/CD',
      'Detailed video walkthrough showcasing real-world problem solving'
    ]
  },
  {
    id: 'proj-capstone-local-cluster',
    title: 'Local AI Supercluster: Bare-Metal vLLM & Quantized Cluster',
    description: 'Build and benchmark a self-hosted local AI infrastructure cluster running vLLM, fine-tuned domain models, and Ray distributed inference with local privacy.',
    difficulty: 'Capstone',
    trackId: 'ai-infrastructure',
    phaseId: 'phase-8',
    baseXP: 500,
    estimatedHours: 100,
    requiredSkills: [
      'infra-vllm-high-throughput',
      'infra-tensor-parallelism-megatron',
      'adv-quantization-awq-gptq',
      'sys-cost-optimization-at-scale'
    ],
    prerequisites: ['proj-distributed-inference-service', 'proj-fine-tuned-llm'],
    tags: ['capstone', 'infrastructure', 'bare-metal', 'vllm'],
    deliverables: [
      'Infrastructure as Code (IaC) provisioning scripts',
      'Comprehensive benchmark comparing local throughput to commercial APIs',
      'Live local web client with sub-second streaming'
    ]
  },
  {
    id: 'proj-capstone-eval-harness',
    title: 'Open-Source AI Safety & Evaluation Framework',
    description: 'Develop and publish a standalone open-source evaluation library on PyPI and GitHub that tests hallucinations, prompt injections, and tool trajectory accuracy.',
    difficulty: 'Capstone',
    trackId: 'ai-evaluation',
    phaseId: 'phase-8',
    baseXP: 500,
    estimatedHours: 90,
    requiredSkills: [
      'eval-ragas-framework',
      'eval-agent-trajectory-accuracy',
      'sec-automated-red-teaming',
      'swe-packaging-uv'
    ],
    prerequisites: ['proj-llm-eval-platform', 'proj-ai-security-platform'],
    tags: ['capstone', 'open-source', 'pypi', 'eval-framework'],
    deliverables: [
      'Published PyPI package with 90%+ test coverage',
      'Documentation website hosted on GitHub Pages',
      '100+ GitHub stars or community adoption proof'
    ]
  }
];

export const PROJECTS_BY_ID: Record<string, Project> = ALL_PROJECTS.reduce((acc, proj) => {
  acc[proj.id] = proj;
  return acc;
}, {} as Record<string, Project>);

export const PROJECTS_BY_PHASE: Record<string, Project[]> = ALL_PROJECTS.reduce((acc, proj) => {
  if (!acc[proj.phaseId]) {
    acc[proj.phaseId] = [];
  }
  acc[proj.phaseId].push(proj);
  return acc;
}, {} as Record<string, Project[]>);

export const TOTAL_PROJECTS_COUNT = ALL_PROJECTS.length;
