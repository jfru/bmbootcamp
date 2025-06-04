import axios from "axios";
import React, { useEffect, useState } from "react";
import { MAIN_URL } from "../utils/urls";
import { Button } from "@mui/material";

const Phrase = () => {
	const [verseData, setVerseData] = useState({});
	const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
	const [isUserTurn, setIsUserTurn] = useState(false);
	const [playingWordIndex, setPlayingWordIndex] = useState(null);
	const [audioRefs, setAudioRefs] = useState([]);
	const [userPlayingIndex, setUserPlayingIndex] = useState(null);
	const [playingFullPhraseIndex, setPlayingFullPhraseIndex] = useState(null);

	useEffect(() => {
		axios
			.get(`${MAIN_URL}/torah/1`)
			.then(response => {
				const updatedData = {
					...response.data,
					phrases: response.data.phrases.map(phrase => ({
						...phrase,
						words: phrase.words.map(word => ({
							...word,
							audio: `${MAIN_URL}${word.audio}`, // <- add backend URL prefix
						})),
					})),
				};
				setVerseData(updatedData);
				console.log(updatedData);
			})
			.catch(error => {
				console.error("There was an error fetching the blessing data!", error);
			});
	}, []);

	useEffect(() => {
		if (verseData) {
			const refs = verseData?.phrases?.map(phrase => phrase?.words?.map(word => new Audio(word?.audio)));
			setAudioRefs(refs);
		}
	}, [verseData]);

	const playPhrase = async (phraseIdx, isFullPhrase = false) => {
		const phraseAudios = audioRefs[phraseIdx];
		if (!phraseAudios) return;

		if (isFullPhrase) setPlayingFullPhraseIndex(phraseIdx);

		for (let i = 0; i < phraseAudios.length; i++) {
			setPlayingWordIndex(i);
			await new Promise(resolve => {
				const audio = phraseAudios[i];
				audio.onended = () => {
					resolve();
				};
				audio.play();
			});
		}

		setPlayingWordIndex(null);
		if (isFullPhrase) setPlayingFullPhraseIndex(null);
		else setIsUserTurn(true);
	};

	useEffect(() => {
		if (audioRefs?.length > 0 && currentPhraseIndex !== -1) {
			playPhrase(currentPhraseIndex);
		}
	}, [currentPhraseIndex, audioRefs]);

	const handleNext = () => {
		if (currentPhraseIndex + 1 < verseData?.phrases?.length) {
			setCurrentPhraseIndex(currentPhraseIndex + 1);
			setIsUserTurn(false);
		} else {
			setCurrentPhraseIndex(-1); // Show full verse
			setIsUserTurn(false);
		}
	};

	return (
		<div style={{ fontSize: "24px", direction: "rtl" }}>
			{currentPhraseIndex >= 0 ? (
				<>
					<div>
						{verseData?.phrases &&
							verseData?.phrases[currentPhraseIndex]?.words.map((word, i) => (
								<div
									key={i}
									style={{
										display: "inline-block",
										textAlign: "center",
										cursor: isUserTurn ? "pointer" : "default",
									}}
								>
									<span
										onClick={() => {
											if (isUserTurn) {
												const audio = audioRefs[currentPhraseIndex][i];
												setUserPlayingIndex(i);

												const clearUserHighlight = () => {
													setUserPlayingIndex(null);
													audio.removeEventListener("ended", clearUserHighlight); // clean up
												};

												audio.addEventListener("ended", clearUserHighlight);
												audio.play();
											}
										}}
										style={{
											color:
												!isUserTurn && i === playingWordIndex
													? "rgba(224, 157, 47, 1)"
													: isUserTurn && i === userPlayingIndex
													? "rgba(224, 157, 47, 1)"
													: "#fff",
											padding: "2px 6px",
											borderRadius: "4px",
											fontSize: "64px",
											display: "block",
											marginRight: "10px",
										}}
									>
										{word?.text}
									</span>
									<span
										style={{
											color:
												!isUserTurn && i === playingWordIndex
													? "rgba(224, 157, 47, 1)"
													: isUserTurn && i === userPlayingIndex
													? "rgba(224, 157, 47, 1)"
													: "#fff",

											fontSize: "16px",
											display: "block",
											marginTop: "4px",
										}}
									>
										{word?.english_text ? `(${word.english_text})` : ""}
									</span>
								</div>
							))}
					</div>

					{isUserTurn && (
						<div style={{ marginTop: "20px" }}>
							<p>Your turn: click the words to practice</p>
							<Button size={"large"} variant="contained" onClick={handleNext}>
								Next Phrase
							</Button>
						</div>
					)}
				</>
			) : (
				<>
					<h3>{verseData?.reference}</h3>
					{verseData?.phrases?.map((phrase, pIdx) => (
						<p
							key={pIdx}
							onClick={() => playPhrase(pIdx, true)}
							style={{
								cursor: "pointer",
								color: playingFullPhraseIndex === pIdx ? "rgba(224, 157, 47, 1)" : "#fff", // highlight if playing
								padding: "8px",
								borderRadius: "6px",
								marginBottom: "10px",
								fontSize: "64px",
							}}
						>
							{phrase?.words?.map(w => w?.text).join(" ")}
						</p>
					))}
				</>
			)}
		</div>
	);
};

export default Phrase;
