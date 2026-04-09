export type QuizDifficulty = "EASY" | "MEDIUM" | "HARD";

export interface QuizChordItem {
  id: number;
  chordKey: string;
  chordType: string;
  name: string;
  notes: string;
  difficulty: QuizDifficulty;
}

export interface SaveScoreRequest {
  difficulty: QuizDifficulty;
  totalScore: number;
  correctCount: number;
  totalCount: number;
}

export interface ScoreRecord {
  id: number;
  difficulty: QuizDifficulty;
  totalScore: number;
  correctCount: number;
  totalCount: number;
  createdAt: string;
}

export type QuizPhase = "select" | "playing" | "result";

export interface QuizGameState {
  phase: QuizPhase;
  difficulty: QuizDifficulty | null;
  questions: QuizChordItem[];
  currentIndex: number;
  timeLeft: number;
  scores: number[];
  answers: ("correct" | "incorrect" | "timeout")[];
  totalScore: number;
}
