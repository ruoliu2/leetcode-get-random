import { create } from 'zustand';
import amazonQuestions from '../../../public/data/amazon.json';

import { Filter, QuestionSelection, initFilter, AmazonState } from '../components/constants';

const useAmazonStore = create<AmazonState>((set) => ({
  filter: initFilter,
  questionSelection: (() => {
    const defaultSelection: { [key: string]: boolean } = {};
    amazonQuestions.forEach((question) => {
      defaultSelection[question.number] = true;
    });
    return defaultSelection;
  })(),
  setFilter: (newFilter: Filter) => set({ filter: newFilter }),
  setQuestionSelection: (newSelection: QuestionSelection) => set({ questionSelection: newSelection }),
  toggleQuestionSelection: (name) =>
    set((state) => ({
      questionSelection: { ...state.questionSelection, [name]: !state.questionSelection[name] },
    })),
  resetQuestionSelection: () =>
    set((state) => {
      const newSelection: { [key: string]: boolean } = {};
      Object.keys(state.questionSelection).forEach((name) => {
        newSelection[name] = true;
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

export default useAmazonStore;
