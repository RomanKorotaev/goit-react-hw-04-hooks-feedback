import './App.css';
import React, { Component } from 'react';
import { useState } from 'react';
import Statistics from './components/Statistics'
import FeedbackOptions from './components/FeedbackOptions'
import Section from './components/Section'
import Notification from './components/Notification'


export default function  AppHook2 () {
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    const feedbackBtn = { good, neutral, bad };

// // Общий обработчик для нескольких разных кнопок (функция использовалась до выноса кнопок в отдельный компонент)
// const onLeaveFeedback = (e) => {
//     const { name } = e.currentTarget;

//     switch (name) {

//         case "good" :
//         setGood ((prevState) => prevState + 1);
//         break;

//         case "neutral" :
//             setNeutral ((prevState) => prevState + 1);
//         break;

//         case "bad" :
//             setBad ((prevState) => prevState + 1);
//         break;

//         default:
//             return;
//     }   
//   };

  const increment = (value) => {

    console.log ('Сработала функция increment  .... ');

    switch (value) {

        case "good" :
        setGood ((prevState) => prevState + 1);
        break;

        case "neutral" :
            setNeutral ((prevState) => prevState + 1);
        break;

        case "bad" :
            setBad ((prevState) => prevState + 1);
        break;

        default:
            return;
    }   
  };



  const totalFeedback = () => {
        console.log ('Сработала функция totalFeedback = ....');
        return good + neutral + bad;
  }

// Высчитываем пропрорцию (процент) позитивных откликов
const positiveFeedbackPercentage = () => {
    console.log ('Сработала функция positiveFeedbackPercentage ....');
    return Math.round(good * 100 / totalFeedback());
  }


    return (
        <div className="containerApp">
         
          <Section title={'Please leave feedback'}>
            
            <FeedbackOptions
                 options={Object.keys(feedbackBtn)}
                 onLeaveFeedback={increment} />

            </Section> 
                  
                {totalFeedback() > 0 ? (
                <Section title="Statistics">
              <Statistics
              good={good}
              neutral={neutral}
              bad={bad}
              totalFeedback={totalFeedback()}
                positiveFeedbackPercentage={positiveFeedbackPercentage()} />
               </Section>
               ) : (
              <Notification message="No feedback given" />
                )}
           
        </div>
      )
};