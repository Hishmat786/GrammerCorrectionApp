import React, { useState } from "react";


function GrammarChecker() {
    
    const API_KEY = import.meta.env.VITE_API_KEY
    console.log(API_KEY)
    const [text, setText] = useState("");
    const [highlightedText, setHighlightedText] = useState("");
    const [loading, setLoading] = useState(false);

    const checkGrammar = async () => {
        if (!text.trim()) {
            alert("Please enter some text.");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch("https://api.openai.com/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${API_KEY}`, 
                },
                body: JSON.stringify({
                    model: "gpt-3.5-turbo",
                    messages: [
                        {
                            role: "user",
                            content: `Analyze the following text and return a JSON object with an array of incorrect words:
                            
                            Text: "${text}"
                            
                            Response format:
                            {
                              "incorrect_words": ["wrongWord1", "wrongWord2"]
                            }`
                        },
                    ],
                    max_tokens: 150,
                    temperature: 0.2,
                }),
            });

            const data = await response.json();
            const incorrectWords = data.choices[0].message.content;
            console.log(incorrectWords)
            if (data.choices && data.choices.length > 0) {
                const responseText = data.choices[0].message.content.trim();
                const jsonData = JSON.parse(responseText);
                highlightErrors(text, jsonData.incorrect_words || []);
            } else {
                setHighlightedText(text);
            }
        } catch (error) {
            console.error("Error checking grammar:", error);
            setHighlightedText(text);
        }

        setLoading(false);
    };

    const highlightErrors = (originalText, incorrectWords) => {
        let words = originalText.split(" ");
        let formattedText = words
            .map((word) =>
                incorrectWords.includes(word)
                    ? `<span class="text-red-500 font-bold">${word}</span>`
                    : word
            )
            .join(" ");

        setHighlightedText(formattedText);
    };

    return (
        <div className="text-center p-5">
            <h2 className="text-2xl text-blue-500 font-bold mb-4">Live Grammar Checker</h2>

            <div
                className="border p-4 w-3/4 mx-auto min-h-[50px] bg-gray-100 rounded text-left"
                dangerouslySetInnerHTML={{ __html: highlightedText || "Start typing..." }}
            ></div>

            <textarea
                className="w-3/4 h-40 p-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 mt-3"
                placeholder="Enter text..."
                value={text}
                onChange={(e) => setText(e.target.value)}
            ></textarea>

            <br />

            <button
                onClick={checkGrammar}
                className="mt-3 px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200"
                disabled={loading}
            >
                {loading ? "Checking..." : "Check Grammar"}
            </button>
        </div>
    );
}

export default GrammarChecker;
