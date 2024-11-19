"use client";

import React, { useState } from "react";

const commands: any = {
  help: `
Available commands:
- about: Learn more about me
- skills: See my technical skills
- projects: Explore my projects
- clear: Clear the terminal
  `,
  about: `
Matthew is a backend-focused developer with expertise in .NET, Node.js, and Golang. 
He has experience in frontend technologies like React and Next.js and has worked on 
several impactful projects including financial APIs, document similarity systems, 
and health metric platforms. Matthew enjoys teaching and mentoring, always aiming 
to inspire others to be curious and creative.
  `,
  skills: `
Technologies:
- Backend: Node.js, .NET, Golang, Python
- Frontend: React, Next.js, TailwindCSS
- Databases: MySQL, PostgreSQL, Redis
- DevOps: Azure, GCP, CI/CD Pipelines, Docker
- Tools: Prisma, Entity Framework Core, HTMX, Templ
  `,
  projects: `
Notable Projects:
1. Financial Management API
2. Document Similarity System
3. Notify - GitHub Notification App (Golang)
4. Health Metrics Platform (TCC)
5. CanSat Hackathon Winner Project
  `,
};
const Terminal = () => {
  const [history, setHistory] = useState<string[]>([]);
  const [input, setInput] = useState<string>("");
  const [commandIndex, setCommandIndex] = useState<number>(-1);
  const [commandsHistory, _] = useState<string[]>([])

  const handleCommand = (cmd: string) => {
    if (cmd === "clear") {
      setHistory([]);
      commandsHistory.push(cmd)
      setCommandIndex(-1);
      return;
    }

    if (cmd === "cv") {
      downloadCV();
      commandsHistory.push(cmd);
      setHistory([...history, `$ ${cmd}`, "Downloading CV..."]);
      setCommandIndex(-1);
      return;
    }

    const response = commands[cmd] || `Unknown command: ${cmd}`;
    setHistory([...history, `$ ${cmd}`, response]);
    commandsHistory.push(cmd);
    setCommandIndex(-1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCommand(input.trim());
    setInput("");
  };

  const downloadCV = () => {
    const cvUrl = "https://docs.google.com/uc?export=download&id=1won0L_XevpSLJSYbFzKzR1EL3kaEbUmgPi6iR2USKRI";
    const link = document.createElement("a");
    link.href = cvUrl;
    link.download = "Matthew-CV.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  const handleKeyUp = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      if (commandIndex + 1 < commandsHistory.length) {
        const newIndex = commandIndex + 1;
        setCommandIndex(newIndex);
        setInput(commandsHistory[commandsHistory.length - newIndex - 1]);
      }
    } else if (e.key === "ArrowDown") {
      if (commandIndex > 0) {
        const newIndex = commandIndex - 1;
        setCommandIndex(newIndex);
        setInput(commandsHistory[commandsHistory.length - newIndex - 1]);
      } else {
        setCommandIndex(-1);
        setInput("");
      }
    }
  };

  return (
    <div className="terminal">
      <div className="terminal-history mb-4">
        {history.map((line, index) => (
          <pre key={index} className="whitespace-pre-wrap">
            {line}
          </pre>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex">
        <span className="mr-2 text-green-400">$</span>
        <input
          type="text"
          className="bg-black text-green-500 flex-1 focus:outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyUp={handleKeyUp}
          autoFocus
        />
      </form>
    </div>
  );
};

export default Terminal;
