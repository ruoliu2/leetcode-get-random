'use client';
import React, {useEffect, useState} from 'react';
import {
  Box,
  Checkbox,
  FormControlLabel,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemText,
  Typography
} from '@mui/material';
import topics from '../../public/data/top150.json';
import {Shuffle} from '@mui/icons-material';

const QUESTION_SELECTION = 'questionSelection';
const difficultyColors: { [key: string]: string } = {
  Easy: 'green',
  Medium: 'orange',
  Hard: 'red',
};
type Filter = {
  [key: string]: boolean;
};
type QuestionSelection = {
  [key: string]: boolean;
};
const difficulties = ['Easy', 'Medium', 'Hard'];
const initFilter = {
  Easy: true,
  Medium: true,
  Hard: true,
}
const isBrowser = typeof window !== 'undefined';
const Question = () => {
  // yseStates and useEffects
  const [filter, setFilter] = useState<Filter>(initFilter);
  const [questionSelection, setQuestionSelection] = useState<QuestionSelection>(() => {
    // initialize all questions as selected
    const defaultSelection: { [key: string]: boolean } = {};
    Object.entries(topics).forEach(([topic, questions]) => {
        questions.forEach(([name, link, difficulty]) => {
          defaultSelection[name] = true;
        });
      }
    );
    return defaultSelection;
  });
  useEffect(() => {
    const savedSelection = localStorage.getItem(QUESTION_SELECTION);
    if (savedSelection) {
      setQuestionSelection(JSON.parse(savedSelection));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem(QUESTION_SELECTION, JSON.stringify(questionSelection));
  }, [questionSelection]);

  // custom functions
  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter({...filter, [event.target.name]: event.target.checked});
  };
  const getRandomQuestion = (questions: string[][]) => {
    const filteredQuestions = questions.filter(
      ([name, link, difficulty]) => filter[difficulty] && questionSelection[name]
    );
    if (filteredQuestions.length === 0) {
      return;
    }
    const randomIndex = Math.floor(Math.random() * filteredQuestions.length);
    const [name, link, difficulty] = filteredQuestions[randomIndex];
    // mark question as not selected
    setQuestionSelection({...questionSelection, [name]: false,});
    window.open(link, '_blank');
  };
  const handleSelectionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuestionSelection(prevState => ({...prevState, [event.target.name]: event.target.checked,}))
  }
  const handleOnClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, name: string, link: string) => {
    setQuestionSelection(prevState => ({...prevState, [name]: false,}))
    window.open(link, '_blank');
    event.preventDefault();
  }
  return (
    <Box>
      <Box>
        {difficulties.map((difficulty) => (
          <FormControlLabel
            key={difficulty}
            control={
              <Checkbox
                checked={filter[difficulty]}
                onChange={handleFilterChange}
                name={difficulty}
              />
            }
            label={difficulty}
          />
        ))}
        <IconButton
          onClick={() => getRandomQuestion(Object.values(topics).flat())}
        >
          <Shuffle/>
        </IconButton>
      </Box>

      {/*add some padding*/}
      <Box py={2}/>

      {Object.entries(topics).map(([topic, questions]) => (
        <div key={topic}>
          <Box display="flex" alignItems="center" justifyContent="flex-start">
            <Typography variant="h4" gutterBottom>
              {topic}
            </Typography>
            <IconButton onClick={() => getRandomQuestion(questions)}>
              <Shuffle/>
            </IconButton>
          </Box>
          <List>
            {questions.map(
              ([name, link, difficulty], index) =>
                filter[difficulty] && (
                  <ListItem
                    key={index}
                    divider
                  >
                    <Checkbox
                      key={name}
                      checked={questionSelection[name]}
                      name={name}
                      onChange={handleSelectionChange}
                    />
                    <Link href={link} underline="none" target={'_blank'}
                          onClick={(event) => handleOnClick(event, name, link)}>
                      <ListItemText
                        primary={name}
                        secondary={difficulty}
                        secondaryTypographyProps={{
                          style: {
                            color: difficultyColors[difficulty] || 'black',
                          },
                        }}
                      />
                    </Link>
                  </ListItem>
                )
            )}
          </List>
        </div>
      ))}
    </Box>
  );
};

export default Question;
