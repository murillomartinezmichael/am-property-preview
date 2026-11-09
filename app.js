const checklists = {
  sell: ['General area and type of house', 'Repairs or renovations you know about', 'Your preferred timing and questions about selling'],
  buy: ['General area you are considering', 'The home features that matter to you', 'Your timing and questions about future availability'],
  rent: ['General area you are considering', 'The home features that matter to you', 'Your move-in timing and questions about rental requirements']
};

const interest = document.querySelector('#interest');
const output = document.querySelector('#checklist');

const inquiryLink = document.querySelector('a[href="inquiry/"]');
const formTopics = { sell: 'Seller', buy: 'Buyer', rent: 'Renter' };
function syncInquiryLink() {
  inquiryLink.href = 'inquiry/?topic=' + formTopics[interest.value];
}
syncInquiryLink();

function showChecklist() {
  syncInquiryLink();
  const heading = document.createElement('h3');
  heading.textContent = interest.selectedOptions[0].textContent;

  const list = document.createElement('ul');
  for (const detail of checklists[interest.value]) {
    const item = document.createElement('li');
    item.textContent = detail;
    list.append(item);
  }

  const note = document.createElement('p');
  note.textContent = 'Nothing was sent or saved.';
  output.replaceChildren(heading, list, note);
}

document.querySelector('#prepare').addEventListener('click', showChecklist);
interest.addEventListener('change', showChecklist);
for (const link of document.querySelectorAll('[data-topic]')) {
  link.addEventListener('click', () => {
    interest.value = link.dataset.topic;
    showChecklist();
  });
}

const exteriorDialog = document.querySelector('#exterior-dialog');
const openExterior = document.querySelector('#open-exterior');
if (typeof exteriorDialog.showModal === 'function') {
  for (const trigger of [openExterior, document.querySelector('.thumb-trigger')]) {
    trigger.hidden = false;
    trigger.addEventListener('click', () => exteriorDialog.showModal());
  }
}
