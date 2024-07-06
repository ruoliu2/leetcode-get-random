'use client';
import React, {useEffect, useMemo} from 'react';
import {
  Box,
  Checkbox,
  FormControlLabel,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import topics from '../../../public/data/top150.json';
import {Shuffle} from '@mui/icons-material';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import CancelIcon from '@mui/icons-material/Cancel';
import useQuestionStore from "../stores/useQuestionStore";

const difficultyColors: { [key: string]: string } = {
  Easy: 'green',
  Medium: 'orange',
  Hard: 'red',
};

const difficulties = ['Easy', 'Medium', 'Hard'];

const Question = () => {
  const {
    filter,
    questionSelection,
    setFilter,
    toggleQuestionSelection,
    setQuestionSelection,
    resetQuestionSelection,
    clearSelection,
  } = useQuestionStore();

  useEffect(() => {
    const savedSelection = localStorage.getItem('questionSelection');
    if (savedSelection) {
      setQuestionSelection(JSON.parse(savedSelection));
    }
  }, [setQuestionSelection]);

  useEffect(() => {
    localStorage.setItem('questionSelection', JSON.stringify(questionSelection));
  }, [questionSelection]);

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
    toggleQuestionSelection(name);
    window.open(link, '_blank');
  };

  const handleOnClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, name: string, link: string) => {
    toggleQuestionSelection(name);
    window.open(link, '_blank');
    event.preventDefault();
  };

  const filteredQuestions = useMemo(() => {
    return Object.entries(topics).flatMap(([topic, questions]) => {
      return questions.filter(([name, link, difficulty]) => filter[difficulty]);
    });
  }, [filter]);

  const [completedCount, todoCount] = useMemo(() => {
    let completed = 0;
    let todo = 0;
    filteredQuestions.forEach(([name, link, difficulty]) => {
      if (questionSelection[name]) {
        todo += 1;
      } else {
        completed += 1;
      }
    });
    return [completed, todo];
  }, [filteredQuestions, questionSelection]);

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box display={'flex'}>
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

          <IconButton onClick={() => getRandomQuestion(Object.values(topics).flat())}>
            <Shuffle/>
          </IconButton>
        </Box>
        <Box display={'flex'}>
          <IconButton onClick={resetQuestionSelection}>
            <RestartAltIcon/>
          </IconButton>
          <IconButton onClick={clearSelection}>
            <CancelIcon/>
          </IconButton>
        </Box>
      </Box>

      <Box mt={2}>
        <Typography variant="h6">
          Completed: {completedCount}
          <span style={{marginLeft: '1em'}}>Todo: {todoCount}</span>
        </Typography>
      </Box>

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
                  <ListItem key={index} divider>
                    <Checkbox
                      key={name}
                      checked={questionSelection[name]}
                      name={name}
                      onChange={() => toggleQuestionSelection(name)}
                    />
                    <Link
                      href={link}
                      underline="none"
                      target={'_blank'}
                      onClick={(event) => handleOnClick(event, name, link)}
                    >
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
          <Box py={2}/>
        </div>
      ))}
    </Box>
  );
};

export default Question;
