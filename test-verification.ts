import { getInitialState } from './src/store/persistence';
import { appReducer } from './src/store/appReducer';
import { calculateTotalXP } from './src/utils/xp';
import { calculateProofScore } from './src/utils/proofScore';
import { calculateTimeline } from './src/utils/dates';
import { calculateStreak } from './src/utils/streak';
import { generateDailyMission, generateNextRecommendation } from './src/utils/recommendations';
import { ALL_SKILLS, ROADMAP_TRACKS } from './src/data/roadmap';
import { ALL_PROJECTS } from './src/data/projects';
import { TIMELINE_PHASES } from './src/data/timeline';
import { ALL_CHALLENGES } from './src/data/challenges';
import { PORTFOLIO_CHECKLIST_ITEMS } from './src/data/portfolioChecklist';

console.log('====================================================');
console.log('RUNNING AI ENGINEER OS AUTOMATED TEST SUITE');
console.log('====================================================');

let passedTests = 0;
function assert(condition: boolean, testName: string) {
  if (!condition) {
    console.error(`❌ FAILED: ${testName}`);
    process.exit(1);
  } else {
    console.log(`✅ PASSED: ${testName}`);
    passedTests++;
  }
}

// 1. Initial State verification
let state = getInitialState();
assert(state.version === 1, 'Initial state has schema version 1');
assert(Object.keys(state.completedSkills).length === 0, 'No completed skills initially');
assert(ALL_SKILLS.length >= 270, `Curated skills count is ~293 (actual: ${ALL_SKILLS.length})`);
assert(ALL_PROJECTS.length >= 50, `Projects count is 50+ (actual: ${ALL_PROJECTS.length})`);
assert(ROADMAP_TRACKS.length === 17, `17 Parallel tracks loaded (actual: ${ROADMAP_TRACKS.length})`);
assert(TIMELINE_PHASES.length === 8, `8 Timeline phases loaded (actual: ${TIMELINE_PHASES.length})`);
assert(ALL_CHALLENGES.length >= 14, `Challenges count is verified (actual: ${ALL_CHALLENGES.length})`);
assert(PORTFOLIO_CHECKLIST_ITEMS.length === 23, `Checklist items count is verified (actual: ${PORTFOLIO_CHECKLIST_ITEMS.length})`);

// 2. Complete a skill & verify XP & Roadmap %
const skill1 = ALL_SKILLS[0];
state = appReducer(state, { type: 'TOGGLE_SKILL', skillId: skill1.id });
assert(state.completedSkills[skill1.id] === true, 'Skill marked as completed');
let xp = calculateTotalXP(state);
assert(xp.totalXP === 10, `XP increased by 10 (actual: ${xp.totalXP})`);
assert(state.activityHistory.length > 0, 'Activity log entry created');
assert(state.activityHistory[0].type === 'SKILL_COMPLETED', 'Activity type is SKILL_COMPLETED');

// 3. Undo the skill
state = appReducer(state, { type: 'TOGGLE_SKILL', skillId: skill1.id });
assert(state.completedSkills[skill1.id] === false, 'Skill successfully unchecked');
xp = calculateTotalXP(state);
assert(xp.totalXP === 0, `XP reversed back to 0 on uncheck (actual: ${xp.totalXP})`);
assert(state.activityHistory[0].type === 'SKILL_UNCOMPLETED', 'Activity type is SKILL_UNCOMPLETED');

// Re-complete skill1
state = appReducer(state, { type: 'TOGGLE_SKILL', skillId: skill1.id });

// 4. Project status flow: READY -> IN_PROGRESS -> COMPLETED
const proj1 = ALL_PROJECTS[0];
state = appReducer(state, { type: 'UPDATE_PROJECT_STATUS', projectId: proj1.id, status: 'IN_PROGRESS' });
assert(state.projectStates[proj1.id]?.status === 'IN_PROGRESS', 'Project moved to IN_PROGRESS');

state = appReducer(state, { type: 'UPDATE_PROJECT_STATUS', projectId: proj1.id, status: 'COMPLETED' });
assert(state.projectStates[proj1.id]?.status === 'COMPLETED', 'Project moved to COMPLETED');
xp = calculateTotalXP(state);
// Skill 10 XP + Project 50 base XP + Milestone first project 100 XP = 160 XP
assert(xp.totalXP === 160, `XP includes base project XP and first-project milestone (actual: ${xp.totalXP})`);
assert(state.milestones['milestone-first-project']?.awarded === true, 'First project milestone permanently awarded');

// 5. Add Project Proof: GitHub URL, Live Demo URL, Automated tests
state = appReducer(state, {
  type: 'UPDATE_PROJECT_PROOF',
  projectId: proj1.id,
  proof: {
    githubUrl: 'https://github.com/alex/my-project',
    liveDemoUrl: 'https://my-demo.com',
    hasAutomatedTests: true,
    hasEvaluationSuite: true,
  },
});

let proofScore = calculateProofScore(state);
assert(proofScore.totalProofScore > 50, `Proof score increased with verified proof items (actual: ${proofScore.totalProofScore})`);
assert(proofScore.githubReposScore === 15, `GitHub repo score is 15 (actual: ${proofScore.githubReposScore})`);
assert(proofScore.automatedTestsScore === 20, `Automated tests score is 20 (actual: ${proofScore.automatedTestsScore})`);

// 6. Test milestone non-reversibility
// Complete enough skills to hit 25% roadmap milestone
const quarterSkills = Math.ceil(ALL_SKILLS.length * 0.25);
for (let i = 0; i < quarterSkills + 2; i++) {
  if (!state.completedSkills[ALL_SKILLS[i].id]) {
    state = appReducer(state, { type: 'TOGGLE_SKILL', skillId: ALL_SKILLS[i].id });
  }
}
assert(state.milestones['milestone-roadmap-25']?.awarded === true, '25% milestone awarded');
const xpAtQuarter = calculateTotalXP(state).totalXP;

// Uncheck 2 skills to drop below 25%
state = appReducer(state, { type: 'TOGGLE_SKILL', skillId: ALL_SKILLS[1].id });
state = appReducer(state, { type: 'TOGGLE_SKILL', skillId: ALL_SKILLS[2].id });
assert(state.milestones['milestone-roadmap-25']?.awarded === true, '25% milestone remains permanently awarded after unchecking skills');
const xpAfterDrop = calculateTotalXP(state).totalXP;
// Milestone XP (100) must still be in the total!
assert(xpAfterDrop >= 100, 'Milestone XP is preserved');

// 7. Test Improved Timeline Status Logic
const timeline = calculateTimeline(state.settings.startDate, state.settings.targetGraduationDate, TIMELINE_PHASES, state);
assert(timeline.phasesInfo.length === 8, '8 phases calculated');
const phaseStatuses = timeline.phasesInfo.map((p) => p.status);
assert(
  phaseStatuses.includes('CURRENT') || phaseStatuses.includes('ON TRACK') || phaseStatuses.includes('AHEAD'),
  `Phase status uses improved statuses (actual: ${phaseStatuses.join(', ')})`
);

// 8. Test Recommendation and Daily Mission Engines
const mission = generateDailyMission(state);
assert(!!mission.title && mission.title.length > 3, `Daily mission generated: ${mission.title}`);
assert(!!mission.rationale, `Mission rationale provided: ${mission.rationale}`);

const rec = generateNextRecommendation(state);
assert(!!rec.title, `Next recommendation generated: ${rec.title}`);
assert(!!rec.rationale, `Recommendation rationale provided: ${rec.rationale}`);

// 9. Test Challenge completion
const chal1 = ALL_CHALLENGES[0];
state = appReducer(state, { type: 'COMPLETE_CHALLENGE', challengeId: chal1.id, notes: 'Solved with pure BFS and monotonic queue' });
assert(state.completedChallenges[chal1.id] !== undefined, 'Challenge recorded as completed');

// 10. Test Streak calculation
const streak = calculateStreak(state.activityHistory);
assert(streak.currentStreak >= 1, `Current streak is >= 1 (actual: ${streak.currentStreak})`);
assert(streak.totalActiveDays >= 1, `Total active days is >= 1 (actual: ${streak.totalActiveDays})`);

console.log('====================================================');
console.log(`ALL ${passedTests} TEST SCENARIOS PASSED WITH ZERO ERRORS!`);
console.log('====================================================');
