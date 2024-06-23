'use client';
import React, {useState} from 'react';
import {Box, Checkbox, FormControlLabel, IconButton, List, ListItem, ListItemText, Typography,} from '@mui/material';
import topics from '../../public/data/top150.json';
import {Shuffle} from '@mui/icons-material';


const difficultyColors = {
  Easy: 'green',
  Medium: 'orange',
  Hard: 'red',
};

const Question = () => {
  const [filter, setFilter] = useState({
    Easy: true,
    Medium: true,
    Hard: true,
  });

  const handleFilterChange = event => {
    setFilter({...filter, [event.target.name]: event.target.checked});
  };

  const getRandomQuestion = (questions) => {
    const filteredQuestions = questions.filter(([name, link, difficulty]) => filter[difficulty]);
    const randomIndex = Math.floor(Math.random() * filteredQuestions.length);
    const [name, link, difficulty] = filteredQuestions[randomIndex];
    window.open(link, '_blank');
  };

  return (
    <Box>
      <Box>
        <FormControlLabel
          control={
            <Checkbox
              checked={filter.Easy}
              onChange={handleFilterChange}
              name="Easy"
            />
          }
          label="Easy"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={filter.Medium}
              onChange={handleFilterChange}
              name="Medium"
            />
          }
          label="Medium"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={filter.Hard}
              onChange={handleFilterChange}
              name="Hard"
            />
          }
          label="Hard"
        />
        <IconButton onClick={() => getRandomQuestion(Object.values(topics).flat())}>
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
            {questions.map(([name, link, difficulty], index) => (filter[difficulty] && (
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
            )))}
          </List>
        </div>
      ))}
    </Box>
  );
};

export default Question;
