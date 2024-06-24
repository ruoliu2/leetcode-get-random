'use client';
import React, {useState} from 'react';
import {Box, Checkbox, FormControlLabel, IconButton, List, ListItem, ListItemText, Typography,} from '@mui/material';
import topics from '../../public/data/top150.json';
import {Shuffle} from '@mui/icons-material';

const difficultyColors: { [key: string]: string } = {
  Easy: 'green',
  Medium: 'orange',
  Hard: 'red',
};

const Question = () => {
  type Filter = {
    [key: string]: boolean;
  };
  const [filter, setFilter] = useState<Filter>({
    Easy: true,
    Medium: true,
    Hard: true,
  });

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter({...filter, [event.target.name]: event.target.checked});
  };

  const getRandomQuestion = (questions: string[][]) => {
    const filteredQuestions = questions.filter(
      ([name, link, difficulty]) => filter[difficulty]
    );
    const randomIndex = Math.floor(Math.random() * filteredQuestions.length);
    const [name, link, difficulty] = filteredQuestions[randomIndex];
    window.open(link, '_blank');
  };

  const difficulties = ['Easy', 'Medium', 'Hard'];

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
                  <ListItem key={index} component="a" href={link} divider>
                    <ListItemText
                      primary={name}
                      secondary={difficulty}
                      secondaryTypographyProps={{
                        style: {
                          color: difficultyColors[difficulty] || 'black',
                        },
                      }}
                    />
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
