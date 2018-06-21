import { saveQuestion, saveQuestionAnswer } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const ADD_QUESTION_ANSWER = 'ADD_QUESTION_ANSWER'

function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question
  }
}

export function handleAddQuestion(question) {
  return (dispatch, getState) => {
    const { authedUser } = getState()

    dispatch(showLoading())

    return saveQuestion({
      optionOneText: question.optionOneText,
      optionTwoText: question.optionTwoText,
      author: authedUser
    })
    .then((question) => dispatch(addQuestion(question)))
    .then(() => dispatch(hideLoading()))
  }
}

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  }
}

function addQuestionAnswer({ qid, authedUser, answer }) {
  return {
    type: ADD_QUESTION_ANSWER,
    qid,
    authedUser,
    answer
  }
}

export function handleAddQuestionAnswer(info) {
  return (dispatch) => {

    dispatch(showLoading())
    dispatch(addQuestionAnswer(info))

    return saveQuestionAnswer(info)
    .catch((e) => {
      console.warn('error handling add answer')
    })
    .then(() => dispatch(hideLoading()))
  }
}