"use client";

import { useState, useEffect useRef, } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
//test
const verbs = [
  { base: "arise", past: "arose", participle: "arisen", translation: "powstawać" },
  { base: "awake", past: "awoke", participle: "awoken", translation: "budzić się" },
  { base: "be", past: "was/were", participle: "been", translation: "być" },
  { base: "bear", past: "bore", participle: "born/borne", translation: "znosić" },
  { base: "beat", past: "beat", participle: "beaten", translation: "bić" },
  { base: "become", past: "became", participle: "become", translation: "stawać się" },
  { base: "begin", past: "began", participle: "begun", translation: "zaczynać" },
  { base: "bend", past: "bent", participle: "bent", translation: "zginać" },
  { base: "bet", past: "bet", participle: "bet", translation: "zakładać się" },
  { base: "bind", past: "bound", participle: "bound", translation: "wiązać" },
  { base: "bite", past: "bit", participle: "bitten", translation: "gryźć" },
  { base: "bleed", past: "bled", participle: "bled", translation: "krwawić" },
  { base: "blow", past: "blew", participle: "blown", translation: "wiać" },
  { base: "break", past: "broke", participle: "broken", translation: "łamać" },
  { base: "bring", past: "brought", participle: "brought", translation: "przynosić" },
  { base: "build", past: "built", participle: "built", translation: "budować" },
  { base: "burn", past: "burnt/burned", participle: "burnt/burned", translation: "palić się" },
  { base: "buy", past: "bought", participle: "bought", translation: "kupować" },
  { base: "catch", past: "caught", participle: "caught", translation: "łapać" },
  { base: "choose", past: "chose", participle: "chosen", translation: "wybierać" },
  { base: "come", past: "came", participle: "come", translation: "przychodzić" },
  { base: "cost", past: "cost", participle: "cost", translation: "kosztować" },
  { base: "cut", past: "cut", participle: "cut", translation: "ciąć" },
  { base: "deal", past: "dealt", participle: "dealt", translation: "radzić sobie" },
  { base: "dig", past: "dug", participle: "dug", translation: "kopać" },
  { base: "do", past: "did", participle: "done", translation: "robić" },
  { base: "draw", past: "drew", participle: "drawn", translation: "rysować" },
  { base: "drink", past: "drank", participle: "drunk", translation: "pić" },
  { base: "drive", past: "drove", participle: "driven", translation: "prowadzić (samochód)" },
  { base: "eat", past: "ate", participle: "eaten", translation: "jeść" },
  { base: "fall", past: "fell", participle: "fallen", translation: "upadać" },
  { base: "feed", past: "fed", participle: "fed", translation: "karmić" },
  { base: "feel", past: "felt", participle: "felt", translation: "czuć" },
  { base: "fight", past: "fought", participle: "fought", translation: "walczyć" },
  { base: "find", past: "found", participle: "found", translation: "znajdować" },
  { base: "fly", past: "flew", participle: "flown", translation: "latać" },
  { base: "forget", past: "forgot", participle: "forgotten", translation: "zapominać" },
  { base: "forgive", past: "forgave", participle: "forgiven", translation: "wybaczać" },
  { base: "freeze", past: "froze", participle: "frozen", translation: "zamarzać" },
  { base: "get", past: "got", participle: "got/gotten", translation: "dostawać" },
  { base: "give", past: "gave", participle: "given", translation: "dawać" },
  { base: "go", past: "went", participle: "gone", translation: "iść" },
  { base: "grow", past: "grew", participle: "grown", translation: "rosnąć" },
  { base: "hang", past: "hung", participle: "hung", translation: "wieszać" },
  { base: "have", past: "had", participle: "had", translation: "mieć" },
  { base: "hear", past: "heard", participle: "heard", translation: "słyszeć" },
  { base: "hide", past: "hid", participle: "hidden", translation: "chować" },
  { base: "hit", past: "hit", participle: "hit", translation: "uderzać" },
  { base: "hold", past: "held", participle: "held", translation: "trzymać" },
  { base: "hurt", past: "hurt", participle: "hurt", translation: "ranić" },
  { base: "keep", past: "kept", participle: "kept", translation: "trzymać" },
  { base: "know", past: "knew", participle: "known", translation: "wiedzieć" },
  { base: "lay", past: "laid", participle: "laid", translation: "kłaść" },
  { base: "lead", past: "led", participle: "led", translation: "prowadzić" },
  { base: "leave", past: "left", participle: "left", translation: "opuszczać" },
  { base: "lend", past: "lent", participle: "lent", translation: "pożyczać" },
  { base: "let", past: "let", participle: "let", translation: "pozwalać" },
  { base: "lie", past: "lay", participle: "lain", translation: "leżeć" },
  { base: "lose", past: "lost", participle: "lost", translation: "gubić" },
  { base: "make", past: "made", participle: "made", translation: "robić, tworzyć" },
  { base: "mean", past: "meant", participle: "meant", translation: "znaczyć" },
  { base: "meet", past: "met", participle: "met", translation: "spotykać" },
  { base: "pay", past: "paid", participle: "paid", translation: "płacić" },
  { base: "put", past: "put", participle: "put", translation: "kłaść" },
  { base: "read", past: "read", participle: "read", translation: "czytać" },
  { base: "ride", past: "rode", participle: "ridden", translation: "jeździć" },
  { base: "ring", past: "rang", participle: "rung", translation: "dzwonić" },
  { base: "rise", past: "rose", participle: "risen", translation: "wschodzić" },
  { base: "run", past: "ran", participle: "run", translation: "biegać" },
  { base: "say", past: "said", participle: "said", translation: "mówić" },
  { base: "see", past: "saw", participle: "seen", translation: "widzieć" },
  { base: "sell", past: "sold", participle: "sold", translation: "sprzedawać" },
  { base: "send", past: "sent", participle: "sent", translation: "wysyłać" },
  { base: "set", past: "set", participle: "set", translation: "ustawiać" },
  { base: "shake", past: "shook", participle: "shaken", translation: "trząść" },
  { base: "shine", past: "shone", participle: "shone", translation: "świecić" },
  { base: "shoot", past: "shot", participle: "shot", translation: "strzelać" },
  { base: "show", past: "showed", participle: "shown", translation: "pokazywać" },
  { base: "shut", past: "shut", participle: "shut", translation: "zamykać" },
  { base: "sing", past: "sang", participle: "sung", translation: "śpiewać" },
  { base: "sit", past: "sat", participle: "sat", translation: "siedzieć" },
  { base: "sleep", past: "slept", participle: "slept", translation: "spać" },
  { base: "speak", past: "spoke", participle: "spoken", translation: "mówić" },
  { base: "spend", past: "spent", participle: "spent", translation: "wydawać" },
  { base: "stand", past: "stood", participle: "stood", translation: "stać" },
  { base: "steal", past: "stole", participle: "stolen", translation: "kraść" },
  { base: "swim", past: "swam", participle: "swum", translation: "pływać" },
  { base: "take", past: "took", participle: "taken", translation: "brać" },
  { base: "teach", past: "taught", participle: "taught", translation: "uczyć (kogoś)" },
  { base: "tell", past: "told", participle: "told", translation: "mówić (komuś)" },
  { base: "think", past: "thought", participle: "thought", translation: "myśleć" },
  { base: "throw", past: "threw", participle: "thrown", translation: "rzucać" },
  { base: "understand", past: "understood", participle: "understood", translation: "rozumieć" },
  { base: "wake", past: "woke", participle: "woken", translation: "budzić się" },
  { base: "wear", past: "wore", participle: "worn", translation: "nosić (ubranie)" },
  { base: "win", past: "won", participle: "won", translation: "wygrywać" },
  { base: "write", past: "wrote", participle: "written", translation: "pisać" }
];

export default function IrregularVerbsTrainer() {
  const [currentVerb, setCurrentVerb] = useState(verbs[0]);
  const [timeSpent, setTimeSpent] = useState(0);
  const [inputBase, setInputBase] = useState("");
  const [inputPast, setInputPast] = useState("");
  const baseInputRef = useRef<HTMLInputElement>(null);
  const [inputParticiple, setInputParticiple] = useState("");
  const [result, setResult] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const [answeredCorrectly, setAnsweredCorrectly] = useState(false);
  const [totalAnswers, setTotalAnswers] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setTimeSpent(prev => prev + 1);
  }, 1000);
  return () => clearInterval(interval); // czyścimy po odmontowaniu
}, []);

  const checkAnswers = () => {
    const isBaseCorrect = inputBase.trim().toLowerCase() === currentVerb.base;
    const isPastCorrect = inputPast.trim().toLowerCase() === currentVerb.past;
    const isParticipleCorrect = inputParticiple.trim().toLowerCase() === currentVerb.participle;

    setTotalAnswers(prev => prev + 1);

    if (isBaseCorrect && isPastCorrect && isParticipleCorrect) {
      setResult("✅ Wszystko poprawnie!");
      setCorrectAnswers(prev => prev + 1);
      setAnsweredCorrectly(true);
    } else {
      setResult("❌ Błąd. Spróbuj ponownie lub pokaż odpowiedź.");
    }
  };

const nextVerb = () => {
  const randomIndex = Math.floor(Math.random() * verbs.length);
  setCurrentVerb(verbs[randomIndex]);
  setInputBase("");
  setInputPast("");
  setInputParticiple("");
  setResult("");
  setShowAnswer(false);
  setAnsweredCorrectly(false);
  // ustaw focus po renderze
  setTimeout(() => {
    baseInputRef.current?.focus();
  }, 0);
};

const formatTime = (totalSeconds: number) => {
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
};

const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
  if (e.key === "Enter") {
    if (showAnswer || answeredCorrectly) {
      nextVerb();
    } else {
      checkAnswers();
    }
  } else if (e.key === " ") {
    e.preventDefault();
    setShowAnswer(true);
  }
};

  const getAccuracy = () => {
    if (totalAnswers === 0) return 0;
    return Math.round((correctAnswers / totalAnswers) * 100);
  };

  const accuracy = getAccuracy();
  const accuracyColor = accuracy >= 80 ? "text-green-600" : "text-red-600";

  
return (
  <div
    className="max-w-3xl mx-auto mt-10 p-4 bg-gray-900 text-white rounded shadow-md"
    onKeyDown={handleKeyDown}
    tabIndex={0}
  >
    <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-2 md:gap-0">
      <h1 className="text-2xl font-bold text-center md:text-left">
        Trener czasowników nieregularnych
      </h1>
<div className={`text-center md:text-right text-sm md:text-base ${accuracyColor}`}>
  <p>Odpowiedzi: <strong>{correctAnswers}/{totalAnswers}</strong></p>
  <p>Skuteczność: <strong>{accuracy}%</strong></p>
  <p>Czas: <strong>{formatTime(timeSpent)}</strong></p>
</div>
    </div>

    <Card className="bg-gray-800 text-white shadow-xl">
      <CardContent className="space-y-4">
        <h2 className="text-xl font-semibold text-center md:text-left">
          Tłumaczenie: <span className="text-blue-400">{currentVerb.translation}</span>
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block mb-1 text-gray-300">Base:</label>
            <input
              ref={baseInputRef}
              value={inputBase}
              onChange={(e) => setInputBase(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded px-2 py-1 text-white"
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-300">Past Simple:</label>
            <Input
              value={inputPast}
              onChange={(e) => setInputPast(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 text-white"
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-300">Past Participle:</label>
            <Input
              value={inputParticiple}
              onChange={(e) => setInputParticiple(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 text-white"
            />
          </div>
        </div>

<div className="flex flex-col sm:flex-row sm:justify-start sm:gap-2 gap-2">
  <Button
    onClick={() => {
      if (showAnswer || answeredCorrectly) {
        nextVerb();
      } else {
        checkAnswers();
      }
    }}
    className="w-full sm:w-auto"
  >
    Sprawdź
  </Button>

  <Button
    variant="secondary"
    onClick={() => {
      // Jeżeli nie było poprawnej odpowiedzi ani nie pokazano odpowiedzi, traktuj jako błąd
      if (!answeredCorrectly && !showAnswer) {
        setTotalAnswers(prev => prev + 1);
      }
      nextVerb();
    }}
    className="w-full sm:w-auto"
  >
    Następne
  </Button>

  <Button
    variant="outline"
    onClick={() => {
      if (!showAnswer && !answeredCorrectly) {
        setTotalAnswers(prev => prev + 1);
      }
      setShowAnswer(true);
    }}
    className="w-full sm:w-auto"
  >
    Pokaż odpowiedź
  </Button>
</div>


        {result && (
          <p className="text-lg font-medium text-center md:text-left text-green-400">
            {result}
          </p>
        )}

        {showAnswer && (
          <div className="text-sm text-gray-300 text-center md:text-left">
            <p>Base: <strong>{currentVerb.base}</strong></p>
            <p>Past: <strong>{currentVerb.past}</strong></p>
            <p>Participle: <strong>{currentVerb.participle}</strong></p>
          </div>
        )}

        <div className="text-xs text-gray-500 pt-4 text-center">
          <p>TAB - Przejdź do następnego pola, Enter — sprawdź / przejdź dalej, Spacja — pokaż odpowiedź</p>
        </div>
      </CardContent>
    </Card>
  </div>
);}
