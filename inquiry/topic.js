const requestedTopic = new URLSearchParams(location.search).get('topic');
const topicSelect = document.querySelector('#topic');
if (Array.from(topicSelect.options).some(option => option.value === requestedTopic)) {
  topicSelect.value = requestedTopic;
}
