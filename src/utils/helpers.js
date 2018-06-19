export function formatQuestion(question, author, authedUser) {
  const { id, timestamp, optionOne, optionTwo } = question
  const { name, avatarURL } = author
  return {
    id,
    timestamp, 
    optionOne, 
    optionTwo,
    name,
    avatar: avatarURL,
    hasVoted: optionOne.votes.includes(authedUser.id) || optionTwo.votes.includes(authedUser.id)
  }
}