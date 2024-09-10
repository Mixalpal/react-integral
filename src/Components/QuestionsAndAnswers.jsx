import React, { useState, useEffect } from 'react';

const QuestionsAndAnswersPage = () => {
    const [questions, setQuestions] = useState([]);
    const [userAnswers, setUserAnswers] = useState({});
    const [showAlert, setShowAlert] = useState(false);
  
    useEffect(() => {
      // Функция для получения вопросов и ответов с сервера
      const fetchData = async () => {
        try {
          // Получение вопросов
          const questionsResponse = await fetch('http://localhost:5000/QnA/get-questions'); // http://localhost:8080
          const questionsData = await questionsResponse.json();
          setQuestions(questionsData);
          console.log(questionsResponse);
  
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      // Вызов функции для получения вопросов и ответов при загрузке компонента
      fetchData();
    }, []);
  
    // Обработчик изменения выбранных ответов пользователя
    const handleAnswerChange = (index, answerId) => {
      setUserAnswers((prevAnswers) => ({
        ...prevAnswers,
        [index]: answerId,
      }));
      console.log(userAnswers)
    };
  
    // Обработчик кнопки "Ответить"
    const handleAnswerSubmit = () => {
      console.log(userAnswers)
      // Отправка выбранных ответов на сервер (замените на свой URL)
      fetch(`http://localhost:5000/QnA/check-answers?userAnswers=${userAnswers[0]}&userAnswers=${userAnswers[1]}&userAnswers=${userAnswers[2]}`, { //http://localhost:8080
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(Object.values(userAnswers)),
      })
        .then((response) => response.json())
        .then((correctCount) => {
          // Вывод сообщения с количеством правильных ответов
          alert(`Количество правильных ответов: ${correctCount}`);
        })
        .catch((error) => {
          console.error('Error submitting answers:', error);
        });
    };
  
    return (
      <div>
        {questions.map((question) => (
          <div key={question.id}>
            <p>{question.text}</p>
            <ul>
              {question.answers.map((answer) => (
                <li key={answer.id}>
                  <label>
                    <input
                      type="radio"
                      name={`question_${question.id}`}
                      value={answer.id}
                      onChange={() => handleAnswerChange(questions.indexOf(question), answer.id)}
                      checked={userAnswers[questions.indexOf(question)] === answer.id}
                    />
                    {answer.text}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <button onClick={handleAnswerSubmit}>Ответить</button>
      </div>
    );
};

export default QuestionsAndAnswersPage;
