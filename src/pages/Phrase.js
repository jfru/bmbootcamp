import axios from "axios";
import React, { useEffect, useState } from "react";
import { MAIN_URL } from "../utils/urls";

const Phrase = () => {
	const [verseData, setVerseData] = useState(null);
	const [audioUrls, setAudioUrls] = useState([]);
	const [playingWordIndex, setPlayingWordIndex] = useState(null);
	const [userPlayingIndex, setUserPlayingIndex] = useState(null);
	const [isUserTurn, setIsUserTurn] = useState(false);

	// Fetch phrase 1 on load
	useEffect(() => {
		axios
			.get(`${MAIN_URL}/torah/1`)
			.then(response => {
				const phrase = response.data.phrases[0]; // Only phrase 1
				const updatedWords = phrase.words.map(word => ({
					text: word.text,
					audio: `${MAIN_URL}${word.audio}`,
				}));
				setVerseData({ words: updatedWords });
				setAudioUrls(updatedWords.map(w => w.audio));
			})
			.catch(error => {
				console.error("Error fetching data:", error);
			});
	}, []);

	// Auto-play once audio URLs are loaded
	useEffect(() => {
		if (audioUrls.length > 0) {
			playSequentially();
		}
	}, [audioUrls]);

	// Sequential word-by-word playback
	const playSequentially = async () => {
		setIsUserTurn(false);
		setUserPlayingIndex(null);

		for (let i = 0; i < audioUrls.length; i++) {
			setPlayingWordIndex(i);

			await new Promise(resolve => {
				const audio = new Audio(audioUrls[i]);
				audio.onended = resolve;
				audio.onerror = resolve;
				audio.play();
			});
		}

		setPlayingWordIndex(null);
		setIsUserTurn(true);
	};

	// User plays a word by clicking
	const playUserWord = index => {
		if (!isUserTurn || !audioUrls[index]) return;

		setUserPlayingIndex(index);
		setPlayingWordIndex(null);

		const audio = new Audio(audioUrls[index]);
		audio.onended = () => setUserPlayingIndex(null);
		audio.play();
	};

	return (
		<div style={{ fontSize: "24px", direction: "rtl", padding: "20px" }}>
			{verseData && (
				<div>
					{verseData.words.map((word, idx) => {
						const isHighlighted = idx === playingWordIndex || idx === userPlayingIndex;
						return (
							<span
								key={idx}
								onClick={() => playUserWord(idx)}
								style={{
									color: isHighlighted ? "rgba(224, 157, 47, 1)" : "#fff",
									fontSize: "64px",
									margin: "0 8px",
									cursor: isUserTurn ? "pointer" : "default",
								}}
							>
								{word.text}
							</span>
						);
					})}
				</div>
			)}

			{isUserTurn && (
				<p style={{ color: "#fff", fontSize: "24px", marginTop: "20px" }}>
					Your turn: click the words to practice
				</p>
			)}
		</div>
	);
};

export default Phrase;
