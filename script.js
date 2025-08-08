document.getElementById('year').textContent = new Date().getFullYear();

// Smooth anchor scroll
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{
    const href=a.getAttribute('href');
    if(href.length>1){
      e.preventDefault();
      document.querySelector(href).scrollIntoView({behavior:'smooth'});
    }
  });
});

// WhatsApp lead form
const form = document.getElementById('leadForm');
form.addEventListener('submit', (e)=>{
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const business = document.getElementById('business').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const message = document.getElementById('message').value.trim();
  if(!(name && business && email && phone && message)) return alert('Please fill all fields.');

  // Akmal's number (country code + number, no leading 0)
  const agentNumber = '94775120885';
  const text = encodeURIComponent(
    `New website inquiry:\nName: ${name}\nBusiness: ${business}\nEmail: ${email}\nPhone: ${phone}\nGoal: ${message}`
  );
  const url = `https://wa.me/${agentNumber}?text=${text}`;
  window.open(url, '_blank');
});

// Minimal local "bot" — fallback if Tidio fails
const chatToggle = document.getElementById('chatToggle');
const chatWidget = document.getElementById('chatWidget');
const chatBody = document.getElementById('chatBody');
const chatText = document.getElementById('chatText');
const chatSend = document.getElementById('chatSend');

chatToggle.addEventListener('click', ()=>{
  chatWidget.style.display = chatWidget.style.display === 'flex' ? 'none' : 'flex';
  if(chatWidget.style.display === 'flex'){ chatText.focus(); }
});

function addBubble(text, who='bot'){
  const b = document.createElement('div');
  b.className = `bubble ${who}`;
  b.textContent = text;
  chatBody.appendChild(b);
  chatBody.scrollTop = chatBody.scrollHeight;
}

addBubble('Hi! I can answer questions about these demo listings or book a viewing for you.');

chatSend.addEventListener('click', ()=>{
  const q = chatText.value.trim();
  if(!q) return;
  addBubble(q,'user');
  chatText.value='';

  const replies = [
    ['price','Most demo homes here range between LKR 80M – 250M. Which property are you considering?'],
    ['view','I can book a viewing this week. What day suits you?'],
    ['location','These listings are in Colombo 03, Colombo 05, and Mount Lavinia.'],
    ['contact','Share your WhatsApp number and I will send details instantly.'],
    ['default','Thanks! I’ll pass this to our agent. Want me to send a WhatsApp message now?']
  ];
  const lower = q.toLowerCase();
  const hit = replies.find(([k])=> lower.includes(k));
  addBubble(hit ? hit[1] : replies[replies.length-1][1]);
});

chatText.addEventListener('keydown', (e)=>{ if(e.key==='Enter') chatSend.click(); });
