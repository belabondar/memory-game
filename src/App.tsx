import React, { useEffect, useState } from "react";
import "./App.css";
import MemoryCard from "./Components/MemoryCard";
import { IApp, IStats } from "./types";

let symbols = ["a", "b", "c", "d", "e", "f", "g", "h"];
let activeElements: number[] = [];
let timeout = false;

function App({ length }: IApp) {
  const [active, setActive] = useState<boolean[]>([]);
  const [stats, setStats] = useState<IStats>({ tries: 0, pairs: 0 });
  const [deck, setDeck] = useState<(string | undefined)[]>([]);
  let cards: (string | undefined)[] = [];

  //onload:
  useEffect(() => {
    createDeck(length);
  }, []);

  function createDeck(length: number) {
    for (let i = 0; i < length; i++) {
      cards.push(undefined);
    }
    shuffle();
    setDeck(cards);
    setActive(new Array(16).fill(false));
    setStats({ tries: 0, pairs: 0 });
  }

  function shuffle() {
    symbols.forEach((element) => {
      for (let i = 0; i < 2; i++) {
        let pos = Math.floor(Math.random() * cards.length);
        insert(element, pos);
      }
    });
  }

  function insert(item: string, index: number) {
    if (cards[index] === undefined) {
      cards[index] = item;
    } else {
      let next = index < cards.length - 1 ? index + 1 : 0;
      insert(item, next);
    }
  }

  function onclick(index: number) {
    if (timeout || active[index]) return;
    let newActive = [...active];
    newActive[index] = true;
    setActive(newActive);
    console.log(activeElements);

    if (activeElements.push(index) === 2) {
      validatePicks();
    }
  }

  function validatePicks(): void {
    addTries();
    let values: (string | undefined)[] = [];
    activeElements.forEach((index) => {
      values.push(deck[index]);
    });
    let test = new Set(values);
    if (test.size === 1) {
      console.log("correct");
      activeElements = [];
      addPair();
    } else {
      timeout = true;
      setTimeout(() => {
        let newActive = [...active];
        activeElements.forEach((index) => {
          newActive[index] = false;
        });
        setActive(newActive);
        activeElements = [];
        timeout = false;
      }, 1000);
    }
  }

  function addTries() {
    let newStats = stats;
    newStats.tries++;
    setStats(newStats);
  }

  function addPair() {
    let newStats = stats;
    newStats.pairs++;
    setStats(newStats);
  }

  return (
    <div className="App">
      {/*<MemoryCard item={"Back"} active={active[0]} onclick={() => onclick(0)} />*/}
      <div className="card-wrapper">
        {deck.map((value, index) => (
          <MemoryCard
            key={index}
            item={value}
            active={active[index]}
            onclick={() => onclick(index)}
          />
        ))}
      </div>

      <button onClick={() => createDeck(length)}>Reset</button>
    </div>
  );
}

export default App;
