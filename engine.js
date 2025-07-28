// engine.js — Cyber Secrecy Main Engine
let activeTab = 'terminal';
let scriptStore = {};
let chatLog = [];
const terminalOutput = document.getElementById('terminalOutput');

function switchTab(id) {
  document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  activeTab = id;
}

function terminalInput(e) {
  if (e.key === 'Enter') {
    const cmd = e.target.value.trim();
    e.target.value = '';
    logToTerminal(cmd);
    handleCommand(cmd);
  }
}

function logToTerminal(msg) {
  terminalOutput.textContent += `\n> ${msg}`;
  terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

function handleCommand(cmd) {
  if (cmd === 'help') {
    logToTerminal('Commands: help, edit [name], scan, players');
  } else if (cmd.startsWith('edit ')) {
    const name = cmd.split(' ')[1];
    document.getElementById('codeEditor').value = scriptStore[name] || '';
    switchTab('editor');
  } else if (cmd === 'scan') {
    rescanServers();
  } else if (cmd === 'players') {
    logToTerminal('Nil, Hexx, Spectre, GhostBot');
  } else {
    logToTerminal('Unknown command.');
  }
}

function saveScript() {
  const code = document.getElementById('codeEditor').value;
  const name = prompt("Script name?");
  if (name) {
    scriptStore[name] = code;
    logToTerminal(`Saved ${name}.T`);
  }
}

function rescanServers() {
  const map = document.getElementById('serverMap');
  map.innerHTML = '';
  for (let i = 0; i < 10; i++) {
    const srv = document.createElement('div');
    srv.textContent = `Server-${i} | Devices: Computer, Speaker`;
    map.appendChild(srv);
  }
}

function sendMessage() {
  const msg = document.getElementById('msgBox').value;
  chatLog.push(`You: ${msg}`);
  document.getElementById('chatLog').innerHTML += `<p><b>You:</b> ${msg}</p>`;
  document.getElementById('msgBox').value = '';
}

function postMarketItem() {
  const val = document.getElementById('marketInput').value;
  const li = document.createElement('li');
  li.textContent = val;
  document.getElementById('marketList').appendChild(li);
  document.getElementById('marketInput').value = '';
}
