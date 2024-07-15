const difficultyColors: { [key: string]: string } = {
  Easy: 'green',
  Medium: 'orange',
  Hard: 'red',
};

const difficulties = ['Easy', 'Medium', 'Hard'];
const top150StorageKey = 'top150Selection';


const initFilter: Filter = {
  Easy: true,
  Medium: true,
  Hard: true,
};

type Filter = {
  [key: string]: boolean;
};

type QuestionSelection = {
  [key: string]: boolean;
};

interface top150State {
  filter: Filter;
  questionSelection: QuestionSelection;
  setFilter: (newFilter: Filter) => void;
  setQuestionSelection: (newSelection: QuestionSelection) => void;
  toggleQuestionSelection: (name: string) => void;
  resetQuestionSelection: () => void;
  clearSelection: () => void;
}

interface AmazonState {
  filter: Filter;
  questionSelection: QuestionSelection;
  setFilter: (newFilter: Filter) => void;
  setQuestionSelection: (newSelection: QuestionSelection) => void;
  toggleQuestionSelection: (name: string) => void;
  resetQuestionSelection: () => void;
  clearSelection: () => void;
}

export {
  difficultyColors,
  difficulties,
  top150StorageKey,
  initFilter,
}

export type {
  top150State,
  Filter,
  QuestionSelection,
  AmazonState,
}
