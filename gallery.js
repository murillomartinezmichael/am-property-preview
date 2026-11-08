const comparison = document.querySelector('.kitchen-study');
const reveal = comparison?.querySelector('#kitchen-reveal');

if (reveal) {
  const view = comparison.querySelector('.study-view');

  function updateComparison() {
    const before = reveal.valueAsNumber;
    view.style.setProperty('--before-width', before + '%');
    reveal.setAttribute('aria-valuetext', before + '% before concept, ' + (100 - before) + '% after concept');
  }

  updateComparison();
  comparison.setAttribute('data-enhanced', '');
  reveal.hidden = false;
  comparison.querySelector('.study-divider').hidden = false;
  comparison.querySelector('#kitchen-guide').hidden = false;
  reveal.addEventListener('input', updateComparison);
}
