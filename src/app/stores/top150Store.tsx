import { create } from 'zustand';
import topics from '../../../public/data/top150.json';

type Filter = {
  [key: string]: boolean;
};

type QuestionSelection = {
  [key: string]: boolean;
};

interface Top150State {
  filter: Filter;
  questionSelection: QuestionSelection;
  setFilter: (newFilter: Filter) => void;
  setQuestionSelection: (newSelection: QuestionSelection) => void;
  toggleQuestionSelection: (name: string) => void;
  resetQuestionSelection: () => void;
  clearSelection: () => void;
}

const difficulties = ['Easy', 'Medium', 'Hard'];
const initFilter: Filter = {
  Easy: true,
  Medium: true,
  Hard: true,
};

const useTop150Store = create<Top150State>((set) => ({
  filter: initFilter,
  questionSelection: (() => {
    const defaultSelection: { [key: string]: boolean } = {};
    Object.entries(topics).forEach(([topic, questions]) => {
      questions.forEach(([name, link, difficulty]) => {
        defaultSelection[name] = true;
      });
    });
    return defaultSelection;
  })(),
  setFilter: (newFilter) => set({ filter: newFilter }),
  setQuestionSelection: (newSelection) => set({ questionSelection: newSelection }),
  toggleQuestionSelection: (name) =>
    set((state) => ({
      questionSelection: { ...state.questionSelection, [name]: !state.questionSelection[name] },
    })),
  resetQuestionSelection: () =>
    set((state) => {
      const newSelection: { [key: string]: boolean } = {};
      Object.entries(topics).forEach(([topic, questions]) => {
        questions.forEach(([name, link, difficulty]) => {
          newSelection[name] = true;
        });
      });
      return { questionSelection: newSelection };
    }),
  clearSelection: () =>
    set((state) => {
      const newSelection: { [key: string]: boolean } = {};
      Object.keys(state.questionSelection).forEach((name) => {
        newSelection[name] = false;
      });
      return { questionSelection: newSelection };
    }),
}));

export default useTop150Store;
