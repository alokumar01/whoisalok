"use client";
import React, { useState, useEffect, useRef } from "react";
import { TypeAnimation } from "react-type-animation";


const AutoScrollType = ({ sequence, containerRef }) => {
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (!isTyping) return;

    const interval = setInterval(() => {
      if (containerRef.current) {
        containerRef.current.scrollTo({
          top: containerRef.current.scrollHeight,
          behavior: "smooth",
        });
      }
    }, 100);

    return () => clearInterval(interval);
  }, [isTyping, containerRef]);

  return (
    <TypeAnimation
      sequence={sequence}
      speed={50}
      cursor={false}
      wrapper="span"
      repeat={0}
      onFinishedTyping={() => setIsTyping(false)}
    />
  );
};


const TerminalBox = () => {
  const containerRef = useRef(null);
  const [input, setInput] = useState("");
  const [lines, setLines] = useState([
    {
      command: "$ Welcome: Try 'help'",
      response: (
        <AutoScrollType
          sequence={["To real dev world..."]}
          containerRef={containerRef}
        />
      ),
    },
  ]);


  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [lines]);

  const getResponse = (cmd) => {
    switch (cmd) {
      case "help":
        return "Available: whoami, github, linkedin, help, clear, exit";
      case "whoami":
        return "I’m Alok Kumar, a Full Stack Developer 👨‍💻";
      case "github":
        return {
          html: `<a href="https://github.com/alokumar01" target="_blank" rel="noopener noreferrer" class="underline text-blue-400 hover:text-blue-600">github.com/alokumar01</a>`,
        };
      case "linkedin":
        return {
          html: `<a href="https://www.linkedin.com/in/alokumar01/" target="_blank" rel="noopener noreferrer" class="underline text-blue-400 hover:text-blue-600">linkedin.com/in/alokumar01</a>`,
        };
      case "exit":
        return "Goodbye! Remember: Code is like humor. When you have to explain it, it’s bad. 👋💻";
      default:
        return "Unknown command. Try 'help'";
    }
  };

  const handleCommand = (e) => {
    e.preventDefault();
    const trimmed = input.trim().toLowerCase();

    if (trimmed === "clear") {
      setLines([
        {
          command: "$ Welcome: Try 'help'",
          response: (
            <AutoScrollType
              sequence={["To real dev world..."]}
              containerRef={containerRef}
            />
          ),
        },
      ]);
      setInput("");
      return;
    }

    const rawResponse = getResponse(trimmed);

    const response =
      typeof rawResponse === "string" ? (
        <AutoScrollType sequence={[rawResponse]} containerRef={containerRef} />
      ) : rawResponse?.html ? (
        <p
          className="text-green-400"
          dangerouslySetInnerHTML={{ __html: rawResponse.html }}
        />
      ) : (
        rawResponse
      );

    setLines((prev) => [...prev, { command: `$ ${input}`, response }]);
    setInput("");
  };

  return (
    <div
      ref={containerRef}
      className="bg-black text-green-400 font-mono p-4 rounded-xl w-full max-w-md h-[300px] overflow-y-auto shadow-lg"
    >
      {lines.map((line, idx) => (
        <div key={idx}>
          <p>{line.command}</p>
          <p className="ml-4">{line.response}</p>
        </div>
      ))}
      <form onSubmit={handleCommand} className="mt-2 flex items-center">
        <span className="mr-2">$</span>
        <input
          className="bg-transparent border-none outline-none text-green-300 w-full"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </form>
    </div>
  );
};

export default TerminalBox;
