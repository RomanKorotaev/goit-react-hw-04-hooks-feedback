import './App.css';
import React, { Component } from 'react';
import Statistics from './components/Statistics'
import FeedbackOptions from './components/FeedbackOptions'
import Section from './components/Section'
import Notification from './components/Notification'

class App extends Component {

  state = {
    good: 0,
    neutral: 0,
    bad: 0
}


// Общий обработчик для нескольких разных кнопок (функция использовалась до выноса кнопок в отдельный компонент)
  onLeaveFeedback = (e) => {
    const { name } = e.currentTarget;
    this.setState(prevState => ({
      [name]: prevState[name] + 1,
    }));
  };
  
    increment = (value) => () => {
    this.setState((prevState) => ({
      [value]: prevState[value] + 1,
    }));
  };

  // Подсчитываем общую сумму
  totalFeedback = () => {
    console.log('Подсчитываем общую сумму...')
    const { good, neutral, bad } = this.state;
    return (good + neutral + bad);
  };


// Высчитываем пропрорцию (процент) позитивных откликов
  positiveFeedbackPercentage = () => {
    return Math.round(this.state.good * 100 / this.totalFeedback());
  }



  render() {

    console.log (" goit-react-hw-04-hooks-feedback")

    const { good, neutral, bad } = this.state;
    const { onLeaveFeedback, totalFeedback, positiveFeedbackPercentage } = this;
    
    const options = Object.keys(this.state); //Назначаем каждой кнопке уникальный идентификатор (индекс массива)
    // заносим свойства объекта this.state  в отдельный массив опций через функцию Object.keys(this.state)
       
    // console.log('options = Object.keys(this.state)', options)
    
    return (
      <div className="containerApp">
       
        <Section title={'Please leave feedback'}>
          <FeedbackOptions options={options} onLeaveFeedback={this.increment} />
        </Section>
                  
          {/* <FeedbackOptions options={options} onLeaveFeedback={this.onLeaveFeedback} /> */}
        {/* <div>
            <button type="button" name="good" onClick={this.onLeaveFeedback}> Good </button>
            <button type="button"  name="neutral" onClick={this.onLeaveFeedback}> Neutral </button>
            <button type="button"  name="bad" onClick={this.onLeaveFeedback}> Bad </button>
          </div> */}

        {/* Вынесли кнопки с типом отзыва в отдельный компонент. Идентификация кнопок теперь не по имени, а по индексув массиве
        В связи с этим использкем не функцию this.onLeaveFeedback c name, a  функцию this.increment  c value */}
          

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
  }
}


export default App;
