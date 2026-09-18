import { AppState, ProofScoreBreakdown } from '../types/state';
import { PROJECTS_BY_ID } from '../data/projects';

export function calculateProofScore(state: AppState): ProofScoreBreakdown {
  let completedProjectsScore = 0;
  let deployedProjectsScore = 0;
  let githubReposScore = 0;
  let liveDemosScore = 0;
  let automatedTestsScore = 0;
  let evaluationSuitesScore = 0;
  let architectureDocsScore = 0;
  let documentationScore = 0;
  let realUsersScore = 0;
  let openSourceScore = 0;
  let capstoneBonus = 0;

  let completedProjectsCount = 0;
  let deployedCount = 0;
  let githubCount = 0;
  let liveDemoCount = 0;
  let testsCount = 0;
  let evalSuiteCount = 0;
  let archDocsCount = 0;
  let docsCount = 0;
  let realUsersCount = 0;
  let openSourceCount = 0;
  let capstoneCompletedCount = 0;

  for (const [projId, projState] of Object.entries(state.projectStates)) {
    const project = PROJECTS_BY_ID[projId];
    if (!project) continue;

    // 1. Completed Project Base Proof Points
    if (projState.status === 'COMPLETED') {
      completedProjectsCount++;
      if (project.difficulty === 'Mini') completedProjectsScore += 10;
      else if (project.difficulty === 'Intermediate') completedProjectsScore += 25;
      else if (project.difficulty === 'Advanced') completedProjectsScore += 60;
      else if (project.difficulty === 'Capstone') {
        completedProjectsScore += 150;
        capstoneCompletedCount++;
        capstoneBonus += 100;
      }
    }

    // 2. Project Proof Evidence Items (Can be accumulated as project is built/completed)
    const proof = projState.proof;
    if (proof) {
      if (proof.githubUrl && proof.githubUrl.trim().length > 5) {
        githubCount++;
        githubReposScore += 15;
      }
      if (proof.liveDemoUrl && proof.liveDemoUrl.trim().length > 5) {
        liveDemoCount++;
        liveDemosScore += 25;
        deployedCount++;
        deployedProjectsScore += 20;
      }
      if (proof.hasAutomatedTests) {
        testsCount++;
        automatedTestsScore += 20;
      }
      if (proof.hasEvaluationSuite) {
        evalSuiteCount++;
        evaluationSuitesScore += 30;
      }
      if (proof.hasArchitectureDoc) {
        archDocsCount++;
        architectureDocsScore += 15;
      }
      if (proof.hasDocumentation) {
        docsCount++;
        documentationScore += 10;
      }
      if (proof.hasRealUsers) {
        realUsersCount++;
        realUsersScore += 35;
      }
      if (proof.hasOpenSourceContribution) {
        openSourceCount++;
        openSourceScore += 30;
      }
    }
  }

  const totalProofScore =
    completedProjectsScore +
    deployedProjectsScore +
    githubReposScore +
    liveDemosScore +
    automatedTestsScore +
    evaluationSuitesScore +
    architectureDocsScore +
    documentationScore +
    realUsersScore +
    openSourceScore +
    capstoneBonus;

  const details = [
    {
      label: 'Completed Projects',
      score: completedProjectsScore,
      count: completedProjectsCount,
      description: 'Base evidence points for successfully building and finishing projects.',
    },
    {
      label: 'Public GitHub Repositories',
      score: githubReposScore,
      count: githubCount,
      description: 'Verifiable public code repositories with clean commit histories.',
    },
    {
      label: 'Live Deployed Applications',
      score: deployedProjectsScore + liveDemosScore,
      count: liveDemoCount,
      description: 'Production services deployed with public accessible URLs.',
    },
    {
      label: 'Automated Test Suites',
      score: automatedTestsScore,
      count: testsCount,
      description: 'Deterministic Pytest unit and integration test suites.',
    },
    {
      label: 'Automated Evaluation Suites',
      score: evaluationSuitesScore,
      count: evalSuiteCount,
      description: 'Ragas / golden dataset evaluation pipelines verifying AI outputs.',
    },
    {
      label: 'Architecture Documentation',
      score: architectureDocsScore,
      count: archDocsCount,
      description: 'System design documents with component & sequence diagrams.',
    },
    {
      label: 'README & Documentation',
      score: documentationScore,
      count: docsCount,
      description: 'Comprehensive setup, architecture, and API documentation.',
    },
    {
      label: 'Real Users Validated',
      score: realUsersScore,
      count: realUsersCount,
      description: 'AI products used by external real users or beta testers.',
    },
    {
      label: 'Open-Source Contributions',
      score: openSourceScore,
      count: openSourceCount,
      description: 'Contributions to public libraries, datasets, or developer tooling.',
    },
    {
      label: 'Capstone Flagship Bonus',
      score: capstoneBonus,
      count: capstoneCompletedCount,
      description: 'Comprehensive multi-tier flagship platform verification bonus.',
    },
  ];

  return {
    totalProofScore,
    completedProjectsScore,
    deployedProjectsScore,
    githubReposScore,
    liveDemosScore,
    automatedTestsScore,
    evaluationSuitesScore,
    architectureDocsScore,
    documentationScore,
    realUsersScore,
    openSourceScore,
    capstoneBonus,
    details,
  };
}
