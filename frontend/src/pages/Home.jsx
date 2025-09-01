import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';

const Home = () => {

    const [text, setText] = useState("");
    const [ summary, setSummary] = useState("");
    const [history, setHistory] = useState([]);

    //Summarize function
    const handleSummarize = async () => {
        const response = await fetch("http://localhost:5000/summary/summarize", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({ text }),
        });

        const data = await response.json();
        setSummary(data.summary || "Error generating summary");
        fetchHistory();
    };

    //Fetch history from backend
    const fetchHistory = async () => {
        const response = await fetch("http://localhost:5000/summary/history", {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        });
        const data = await response.json();
        setHistory(data);
    };

    //Load history when app starts
    useEffect(() => {
        fetchHistory();
    }, []);


    return (
        <>
            <Navbar />
            <div className='flex justify-center items-center min-h-screen  bg-rose-200'>
                <div className='w-xl'>
                    <h1 className='mb-4 border border-purple-400 rounded-md text-center text-lg text-purple-950'>AI Summerizer</h1>
                    <textarea
                        value={text}
                        onChange={e => setText(e.target.value)} 
                        placeholder='Enter your text to summerize'
                        className='border border-purple-500 w-xl box-content flex mb-4 rounded-md '
                    />

                    <div className='flex justify-end text-center flex-wrap'>
                        <button onClick={handleSummarize} className=' flex items-center text-center  w-32 border border-purple-500 rounded-md bg-linear-65 from-purple-500 to-pink-500 hover:bg-fuchsia-500 mb-8 text-center' type='submit'>Summarize</button>
                    </div>

                    {/* Summary Result */ }
                    {summary && (
                        <div>
                            <h2><strong>Summary:</strong></h2>
                            <p>{summary}</p>
                        </div>
                    )}

                    {/** History Section */}
                    <hr></hr>
                    <div>
                        <h2> <strong>History (Latest 10)</strong></h2>
                        <ul>
                            {history.map((item) => (
                                <li>
                                    <p><strong>Text : </strong> {item.text.slice(0, 80)}...</p>
                                    <p><strong>Summary : </strong>{item.summary}</p>
                                    <p><strong>Date & Time : </strong> {new Date(item.createdAt).toLocaleString()}</p>
                                    <hr></hr>
                                </li>
                                
                            ))}
                        </ul>
                        
                    </div>
                    
                </div>
            </div>
        </>

    )
}

export default Home
