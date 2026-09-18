import { Challenge } from '../types/challenge';

export const ALL_CHALLENGES: Challenge[] = [
  // BEGINNER CHALLENGES
  {
    id: 'chal-cli-task-manager',
    title: 'Zero-Tutorial CLI Task Manager',
    prompt: 'Build a CLI task manager without looking up tutorial code or copying boilerplate. Use Typer, store data in JSON or SQLite, and write 5 automated tests.',
    context: 'Tests your ability to think independently in Python, design clean schemas, handle file I/O safely, and write deterministic unit tests.',
    difficulty: 'Beginner',
    trackId: 'software-engineering',
    phaseId: 'phase-1',
    xpReward: 35,
    tags: ['python', 'cli', 'independence'],
    rules: [
      'No tutorial code or copy-pasting allowed',
      'Must use Python 3.10+ typing syntax',
      'Must handle missing files and corrupted JSON gracefully'
    ],
    acceptanceCriteria: [
      'Can add, list, complete, and delete tasks via terminal commands',
      'Data persists across runs',
      'Pytest suite passes with 100% test success'
    ]
  },
  {
    id: 'chal-bfs-graph-scratch',
    title: 'Implement BFS Without Looking at an Implementation',
    prompt: 'Given an undirected graph represented as an adjacency dictionary, write a BFS function that finds the shortest path between two nodes from pure memory and logic.',
    context: 'Internalizes graph traversal invariants (visited set, FIFO queue, parent backpointer reconstruction).',
    difficulty: 'Beginner',
    trackId: 'dsa',
    phaseId: 'phase-1',
    xpReward: 35,
    tags: ['dsa', 'bfs', 'shortest-path'],
    rules: [
      'No LeetCode solutions or Google searches during implementation',
      'Must handle disconnected components and self-loops'
    ],
    acceptanceCriteria: [
      'Returns the exact shortest sequence of nodes',
      'Handles unreachable target node returning None or empty list',
      'Time complexity is O(V + E)'
    ]
  },
  {
    id: 'chal-matrix-multiplication-scratch',
    title: 'Matrix Multiplication & Transpose from First Principles',
    prompt: 'Implement 2D matrix multiplication and transpose in pure Python using nested loops without importing NumPy or math libraries.',
    context: 'Solidifies dimensional compatibility rules (M x K times K x N = M x N) and inner dot-product mechanics.',
    difficulty: 'Beginner',
    trackId: 'math-for-ai',
    phaseId: 'phase-2',
    xpReward: 35,
    tags: ['math', 'matrices', 'scratch'],
    rules: [
      'No external libraries allowed (raw Python lists only)',
      'Must validate matrix dimensions and raise informative errors'
    ],
    acceptanceCriteria: [
      'Correctly computes dot products across rows and columns',
      'Raises ValueError if inner dimensions do not match'
    ]
  },
  {
    id: 'chal-fastapi-rate-limiter',
    title: 'In-Memory Sliding Window Rate Limiter Middleware',
    prompt: 'Implement an in-memory sliding window rate limiter as a FastAPI middleware that limits each client IP to 10 requests per minute without Redis.',
    context: 'Requires understanding HTTP headers (X-Forwarded-For), timestamp queues, and middleware lifecycle.',
    difficulty: 'Beginner',
    trackId: 'databases-backend',
    phaseId: 'phase-2',
    xpReward: 40,
    tags: ['fastapi', 'rate-limiting', 'middleware'],
    rules: [
      'No third-party rate-limiting packages',
      'Must clean up expired timestamps to prevent memory leaks'
    ],
    acceptanceCriteria: [
      'Returns HTTP 429 Too Many Requests after 10 requests in 60s',
      'Automatically resets after time window elapses'
    ]
  },

  // INTERMEDIATE CHALLENGES
  {
    id: 'chal-custom-autograd-engine',
    title: 'Mini Autograd Engine with Scalar Operations',
    prompt: 'Implement a Value class with forward and backward passes for addition, multiplication, ReLU, and power. Train a 2-neuron network on XOR.',
    context: 'Proves you truly understand how PyTorch Autograd constructs dynamic computation graphs and propagates gradients.',
    difficulty: 'Intermediate',
    trackId: 'deep-learning',
    phaseId: 'phase-3',
    xpReward: 60,
    tags: ['autograd', 'backprop', 'xor', 'scratch'],
    rules: [
      'No PyTorch or TensorFlow imports for gradient calculation',
      'Must build computational graph DAG dynamically during forward pass'
    ],
    acceptanceCriteria: [
      'Correctly computes analytical gradients matching finite-difference checks',
      'Loss successfully decreases to < 0.05 on XOR dataset'
    ]
  },
  {
    id: 'chal-hybrid-search-rrf-scratch',
    title: 'Reciprocal Rank Fusion (RRF) from Raw Formula',
    prompt: 'Write an algorithm that takes two ranked lists of document IDs (one from keyword search, one from vector search) and fuses them using RRF with constant k=60.',
    context: 'Forces mastery of the rank fusion math that powers modern enterprise RAG systems.',
    difficulty: 'Intermediate',
    trackId: 'rag',
    phaseId: 'phase-5',
    xpReward: 50,
    tags: ['rag', 'rrf', 'hybrid-search'],
    rules: [
      'Follow formula RRF_Score(d) = sum(1 / (k + rank_i(d)))',
      'Handle documents appearing in only one of the input lists'
    ],
    acceptanceCriteria: [
      'Outputs deterministic merged rankings',
      'Includes unit test proving proper tie-breaking'
    ]
  },
  {
    id: 'chal-pydantic-validation-agent',
    title: 'Self-Correcting JSON Output Recovery',
    prompt: 'Build a function that passes an LLM response through a strict Pydantic model. If validation fails, automatically reprompt the model with the exact validation error and recover.',
    context: 'Builds resilience against hallucinated or malformed JSON keys in production agent loops.',
    difficulty: 'Intermediate',
    trackId: 'llm-engineering',
    phaseId: 'phase-4',
    xpReward: 50,
    tags: ['pydantic', 'validation', 'self-correction'],
    rules: [
      'Maximum 3 retry attempts before raising a final exception',
      'Must feed the exact Pydantic ValidationError message back to the LLM'
    ],
    acceptanceCriteria: [
      'Successfully recovers from schema errors within 2 retries',
      'Logs each attempt and validation diff'
    ]
  },
  {
    id: 'chal-docker-slim-challenge',
    title: 'Ultra-Slim Production PyTorch Docker Image (<400MB)',
    prompt: 'Package a FastAPI service that performs PyTorch CPU inference into a Docker image with total size strictly under 400MB.',
    context: 'Teaches advanced Docker multi-stage optimization, torch-cpu wheel selection, and stripping cache bloat.',
    difficulty: 'Intermediate',
    trackId: 'production-ai',
    phaseId: 'phase-6',
    xpReward: 50,
    tags: ['docker', 'optimization', 'pytorch-cpu'],
    rules: [
      'Final image size checked via `docker images` must be < 400MB',
      'Must run as non-root user'
    ],
    acceptanceCriteria: [
      'Container boots and successfully handles inference request',
      'Docker image verification confirms size threshold met'
    ]
  },

  // ADVANCED CHALLENGES
  {
    id: 'chal-agent-state-machine-scratch',
    title: 'Graph-Based Agent State Machine without LangGraph',
    prompt: 'Build an event-driven agent loop with State, Nodes, and Conditional Edges using pure Python without importing LangGraph or LangChain.',
    context: 'Deepens architectural understanding of how state transitions, checkpointing, and routing graphs actually work under the hood.',
    difficulty: 'Advanced',
    trackId: 'ai-agents',
    phaseId: 'phase-5',
    xpReward: 75,
    tags: ['agents', 'state-machine', 'scratch'],
    rules: [
      'No agent framework libraries',
      'Must support asynchronous node execution and state history rolling back'
    ],
    acceptanceCriteria: [
      'Executes a 4-node workflow (Plan -> Research -> Critique -> Finish)',
      'Critique can route back to Research if quality score is below threshold'
    ]
  },
  {
    id: 'chal-rag-eval-suite-blind',
    title: 'Blind Golden Dataset Evaluation Suite',
    prompt: 'Construct an evaluation suite with 25 synthetic questions where 5 questions intentionally contain contradictory premises and 5 have no answer in context. Score hallucination rate.',
    context: 'Teaches how to catch sycophantic hallucinations and ungrounded claims in high-stakes domain RAG systems.',
    difficulty: 'Advanced',
    trackId: 'ai-evaluation',
    phaseId: 'phase-6',
    xpReward: 75,
    tags: ['evaluation', 'golden-dataset', 'hallucinations'],
    rules: [
      'Must use LLM-as-a-judge with structured grading rubric',
      'System must score refusal accuracy on unanswerable questions'
    ],
    acceptanceCriteria: [
      'Identifies whether model hallucinated or properly responded "Insufficient context"',
      'Generates automated Markdown audit table'
    ]
  },
  {
    id: 'chal-adversarial-prompt-jailbreak-test',
    title: 'Craft & Defend 5 Distinct Prompt Injection Vectors',
    prompt: 'Design 5 novel adversarial attack payloads (Base64 encoding, indirect website injection, delimiter smuggling, persona override, multi-turn gaslighting) and write defensive filters.',
    context: 'Puts you in the shoes of both an attacker and security engineer to build hardened AI products.',
    difficulty: 'Advanced',
    trackId: 'ai-security',
    phaseId: 'phase-7',
    xpReward: 80,
    tags: ['security', 'jailbreaks', 'red-teaming'],
    rules: [
      'Payloads must attempt to extract a secret API key placed in the system prompt',
      'Defensive filter must stop all 5 without false-positive blocking of normal queries'
    ],
    acceptanceCriteria: [
      'Test harness proves target model with defenses does not reveal secret key',
      'False-positive test on 10 normal queries maintains 100% pass rate'
    ]
  },
  {
    id: 'chal-kv-cache-calculator',
    title: 'GPU VRAM & KV Cache Memory Estimation Tool',
    prompt: 'Write an interactive calculator that computes required GPU VRAM for model weights, KV cache, and activations given model parameters, precision, context length, and batch size.',
    context: 'Crucial for sizing inference instances on AWS/GCP and avoiding Out of Memory (OOM) crashes in production.',
    difficulty: 'Advanced',
    trackId: 'ai-infrastructure',
    phaseId: 'phase-7',
    xpReward: 70,
    tags: ['kv-cache', 'vram', 'gpu-sizing'],
    rules: [
      'Formulas must account for MHA vs GQA (Grouped Query Attention)',
      'Account for KV cache precision (FP16 vs INT8 vs INT4)'
    ],
    acceptanceCriteria: [
      'Accurately calculates memory for Llama 3 8B and 70B within 5% of vLLM benchmarks',
      'Warns if batch size exceeds VRAM threshold'
    ]
  },

  // EXPERT CHALLENGES
  {
    id: 'chal-multi-agent-consensus-engine',
    title: 'Byzantine Fault-Tolerant Multi-Agent Consensus Protocol',
    prompt: 'Architect a 3-agent deliberation protocol where agents debate a policy question. If one agent is simulated as hallucinating or adversarial, the protocol achieves consensus on the verified answer.',
    context: 'Explores cutting-edge distributed reliability for mission-critical autonomous AI systems.',
    difficulty: 'Expert',
    trackId: 'system-design',
    phaseId: 'phase-8',
    xpReward: 100,
    tags: ['multi-agent', 'consensus', 'fault-tolerance'],
    rules: [
      'Must ground consensus on citation evidence strings',
      'Adversarial agent must not be able to poison majority verdict'
    ],
    acceptanceCriteria: [
      'Correct verified output generated across 10 test trials with 1 faulty agent',
      'Full deliberation logs recorded and visualized'
    ]
  },
  {
    id: 'chal-speculative-decoding-simulation',
    title: 'Speculative Decoding Acceptance Simulation Engine',
    prompt: 'Simulate speculative decoding: a draft model generates gamma=4 tokens, and a target model evaluates them in parallel. Calculate empirical speedup and acceptance rate.',
    context: 'Directly reinforces transformer inference acceleration math used in frontier serving systems.',
    difficulty: 'Expert',
    trackId: 'advanced-llm-engineering',
    phaseId: 'phase-7',
    xpReward: 100,
    tags: ['speculative-decoding', 'inference', 'latency'],
    rules: [
      'Implement rejection sampling probability p_target(x) / p_draft(x)',
      'Ensure output probability distribution matches target model identically'
    ],
    acceptanceCriteria: [
      'Empirical acceptance rate computed accurately across varying prompt domains',
      'Speedup curves plotted against gamma values'
    ]
  }
];

export const CHALLENGES_BY_ID: Record<string, Challenge> = ALL_CHALLENGES.reduce((acc, chal) => {
  acc[chal.id] = chal;
  return acc;
}, {} as Record<string, Challenge>);
