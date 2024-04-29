"use client";
import Image from "next/image";
import logo from "../public/next.svg";
import { useEffect } from "react";
import { useInView } from 'react-intersection-observer';


const colors: string[] = [
  '#87CEEB', // Bleu ciel clair
  '#4682B4', // Bleu acier
  '#4169E1', // Bleu royal
  '#6495ED', // Bleu cornflower
  '#1E90FF', // Bleu dodger
  '#0000FF', // Bleu pur
  '#0000CD', // Bleu moyen
  '#00008B', // Bleu foncé
];

const gridReferences: { [key: string]: string[] } = {
  "1": ["1", "1"],
  "2": ["1", "2"],
  "3": ["1", "3"],
  "4": ["2", "1"],
  "5": ["2", "2"],
  "6": ["2", "3"],
  "7": ["3", "1"],
  "8": ["3", "2"],
  "9": ["3", "3"],
};


export default function Home() {
  const { ref, inView } = useInView();

  const handleGridContainerInView = () => {
    console.log('Le grid-container est dans la vue.');
  };

  const handleGridContainerNotInView = () => {
    console.log('Le grid-container n\'est plus dans la vue.');
  };

  const positions = [];
  for (let row = 1; row <= 3; row++) {
    for (let col = 1; col <= 3; col++) {
      const index = (row - 1) * 3 + col - 1;
      if (index < 8) {
        positions.push({ row, col, index });
      }
    }
  }

  useEffect(() => {
    if (inView) {
      handleGridContainerInView();
    } else {
      handleGridContainerNotInView();
    }
  }, [inView]);

  return (
    <main>
      <p>lbjld</p>
      <p>lbjld</p>
      <p>lbjld</p>
      <p>lbjld</p>
      <p>lbjld</p>
      <p>lbjld</p>

      <div ref={ref} className="grid-container">
        {positions.map((pos, index) => (
          <div key={index} className={`cell grid-item-${index+1}`} style={{ gridRowStart: pos.row, gridColumnStart: pos.col, backgroundColor: colors[index] }}>
            {pos.index + 1}
          </div>
        ))}
      </div>
    </main>
  );
}
