const requestedTopic = new URLSearchParams(location.search).get('topic');
const topicSelect = document.querySelector('#topic');
if (Array.from(topicSelect.options).some(option => option.value === requestedTopic)) {
  topicSelect.value = requestedTopic;
}

const hint = document.querySelector('#hint');
const genericHint = hint.textContent;
const prompts = {
  Seller: 'Tell us the general area, what needs repair and when you hope to sell.',
  Buyer: 'Tell us the area, layout and features you want in a renovated home.',
  Renter: 'Tell us the area, space you need and your preferred move-in timing.'
};
function showTopicHint() {
  hint.textContent = prompts[topicSelect.value]
    ? prompts[topicSelect.value] + ' Leave out exact addresses and financial details.'
    : genericHint;
}
topicSelect.addEventListener('change', showTopicHint);
showTopicHint();

const form = topicSelect.form;
if (form.hasAttribute('action') && window.fetch && window.AbortController) {
  const button = form.querySelector('button[type="submit"]');
  const status = document.querySelector('#delivery-status');
  const fields = form.querySelector('fieldset');
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (fields.disabled) return;
    const data = new FormData(form);
    fields.disabled = true;
    button.textContent = 'Sending...';
    status.textContent = 'Sending your inquiry...';
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);
    try {
      const response = await fetch(form.action, {
        method: 'POST', body: data, headers: { Accept: 'application/json' }, signal: controller.signal
      });
      const result = await response.json().catch(() => null);
      if (!response.ok || result?.ok !== true) throw new Error('Unconfirmed');
      button.textContent = 'Inquiry received';
      status.textContent = 'Thank you. Your inquiry was received for AM.';
      document.querySelector('#delivery-home').hidden = false;
    } catch {
      fields.disabled = false;
      status.textContent = 'We could not confirm receipt. Your message is still here. Check your connection before trying again.';
      button.textContent = 'Try sending again';
      button.focus();
    } finally {
      clearTimeout(timeout);
    }
  });
}
