import pam from '../images/pambeesly.jpg'
import michael from '../images/michaelscott.png'
import dwight from '../images/dwightschrute.jpeg'

let users = {
  pambeesly: {
    id: 'pambeesly',
    name: 'Pam Beesly',
    nickname: 'Mrs.Halpert',
    avatarURL: pam,
    answers: {
      "8xf0y6ziyjabvozdd253nd": 'optionOne',
      "6ni6ok3ym7mf1p33lnez": 'optionOne',
      "am8ehyc8byjqgar0jgpub9": 'optionTwo',
      "loxhs1bqm25b708cmbf3g": 'optionTwo'
    },
    questions: ['8xf0y6ziyjabvozdd253nd', 'am8ehyc8byjqgar0jgpub9']
  },
  michaelscott: {
    id: 'michaelscott',
    name: 'Michael Scott',
    nickname: 'Best Boss',
    avatarURL: michael,
    answers: {
      "vthrdm985a262al8qx3do": 'optionOne',
      "xj352vofupe1dqz9emx13r": 'optionTwo',
    },
    questions: ['loxhs1bqm25b708cmbf3g', 'vthrdm985a262al8qx3do'],
  },
  dwightschrute: {
    id: 'dwightschrute',
    name: 'Dwight Schrute',
    nickname: 'Monkey',
    avatarURL: dwight,
    answers: {
      "xj352vofupe1dqz9emx13r": 'optionOne',
      "vthrdm985a262al8qx3do": 'optionTwo',
      "6ni6ok3ym7mf1p33lnez": 'optionOne'
    },
    questions: ['6ni6ok3ym7mf1p33lnez', 'xj352vofupe1dqz9emx13r'],
  }
}

let questions = {
  "8xf0y6ziyjabvozdd253nd": {
    id: '8xf0y6ziyjabvozdd253nd',
    author: 'pambeesly',
    timestamp: 1467166872634,
    optionOne: {
      votes: ['pambeesly'],
      text: 'be alone with Michael for 3 hours',
    },
    optionTwo: {
      votes: [],
      text: 'join the Party Planning Committee'
    }
  },
  "6ni6ok3ym7mf1p33lnez": {
    id: '6ni6ok3ym7mf1p33lnez',
    author: 'dwightschrute',
    timestamp: 1468479767190,
    optionOne: {
      votes: [],
      text: 'work for Dunder Mifflin',
    },
    optionTwo: {
      votes: ['dwightschrute', 'pambeesly'],
      text: 'work for Michael Scott Paper Company'
    }
  },
  "am8ehyc8byjqgar0jgpub9": {
    id: 'am8ehyc8byjqgar0jgpub9',
    author: 'pambeesly',
    timestamp: 1488579767190,
    optionOne: {
      votes: [],
      text: 'live with Kevin',
    },
    optionTwo: {
      votes: ['pambeesly'],
      text: 'live with Toby'
    }
  },
  "loxhs1bqm25b708cmbf3g": {
    id: 'loxhs1bqm25b708cmbf3g',
    author: 'michaelscott',
    timestamp: 1482579767190,
    optionOne: {
      votes: [],
      text: 'hear me sing at Chili\'s',
    },
    optionTwo: {
      votes: ['pambeesly'],
      text: 'see me dance at Chili\'s'
    }
  },
  "vthrdm985a262al8qx3do": {
    id: 'vthrdm985a262al8qx3do',
    author: 'michaelscott',
    timestamp: 1489579767190,
    optionOne: {
      votes: ['michaelscott'],
      text: 'get on a booze cruise',
    },
    optionTwo: {
      votes: ['dwightschrute'],
      text: 'host the office olympics'
    }
  },
  "xj352vofupe1dqz9emx13r": {
    id: 'xj352vofupe1dqz9emx13r',
    author: 'dwightschrute',
    timestamp: 1493579767190,
    optionOne: {
      votes: ['dwightschrute'],
      text: 'do performance reviews all day',
    },
    optionTwo: {
      votes: ['michaelscott'],
      text: 'talk to Angela all day'
    }
  },
}

function generateUID () {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export function _getUsers () {
  return new Promise((res, rej) => {
    setTimeout(() => res({...users}), 1000)
  })
}

export function _getQuestions () {
  return new Promise((res, rej) => {
    setTimeout(() => res({...questions}), 1000)
  })
}

function formatQuestion ({ optionOneText, optionTwoText, author }) {
  return {
    id: generateUID(),
    author,
    timestamp: Date.now(),
    optionOne: {
      votes: [],
      text: optionOneText,
    },
    optionTwo: {
      votes: [],
      text: optionTwoText,
    }
  }
}

export function _saveQuestion (question) {
  return new Promise((res, rej) => {
    const authedUser = question.author;
    const formattedQuestion = formatQuestion(question);

    setTimeout(() => {
      questions = {
        ...questions,
        [formattedQuestion.id]: formattedQuestion
      }
      
      users = {
        ...users,
        [authedUser]: {
          ...users[authedUser],
          questions: users[authedUser].questions.concat([formattedQuestion.id])
        }
      }

      res(formattedQuestion)
    }, 1000)
  })
}

export function _saveQuestionAnswer ({ authedUser, qid, answer }) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      users = {
        ...users,
        [authedUser]: {
          ...users[authedUser],
          answers: {
            ...users[authedUser].answers,
            [qid]: answer
          }
        }
      }

      questions = {
        ...questions,
        [qid]: {
          ...questions[qid],
          [answer]: {
            ...questions[qid][answer],
            votes: questions[qid][answer].votes.concat([authedUser])
          }
        }
      }

      res()
    }, 500)
  })
}