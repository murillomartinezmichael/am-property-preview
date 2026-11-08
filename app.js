const lists={sell:['General area and type of house','Repairs or renovations you already know about','Your preferred timing and questions about the process'],buy:['General area you are considering','The home features that matter to you','Your preferred timing and questions about future availability'],rent:['General area you are considering','The home features that matter to you','Your preferred move-in timing and questions about future rental requirements']};
document.querySelector('#prepare')?.addEventListener('click',()=>{
 const topic=document.querySelector('#interest');
 const output=document.querySelector('#checklist');
 output.replaceChildren();
 const heading=document.createElement('h3');heading.textContent=topic.options[topic.selectedIndex].text;output.append(heading);
 const list=document.createElement('ul');for(const text of lists[topic.value]){const item=document.createElement('li');item.textContent=text;list.append(item);}output.append(list);
 const note=document.createElement('p');note.textContent='Checklist ready. Nothing was sent or saved. Contact details are pending owner confirmation.';output.append(note);
});
