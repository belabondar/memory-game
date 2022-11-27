import React, { useState } from "react";
import styles from "./MemoryCard.module.css";
import { IMemoryCard } from "../types";

const MemoryCard = ({ item, active, onclick }: IMemoryCard) => {
  return (
    <div
      className={`${styles.card} ${active ? styles.active : ""}`}
      onClick={() => onclick()}
    >
      <div className={styles.front}></div>
      <div className={styles.back}>
        <p>{item === undefined ? "Not defined value" : item}</p>
      </div>
    </div>
  );
};

export default MemoryCard;
