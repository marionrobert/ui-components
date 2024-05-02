"use client";
import Image from "next/image";
import logo from "../public/next.svg";
import { useEffect, useState, useCallback } from "react";
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
  "",
];

const gridReferences: { [key: number]: number[] } = {
  1: [1, 1],
  2: [1, 2],
  3: [1, 3],
  4: [2, 1],
  5: [2, 2],
  6: [2, 3],
  7: [3, 1],
  8: [3, 2],
  9: [3, 3],
};


const positions = [];
for (let row = 1; row <= 3; row++) {
  for (let col = 1; col <= 3; col++) {
    const index = (row - 1) * 3 + col - 1;
    if (index < 8){
      positions.push({ row, col, index });
    }
  }
}



export default function Home() {
  const { ref, inView } = useInView();
  const [emptyCellPos, setEmptyCellPos] = useState<{ row: number; col: number }>({ row: 3, col: 3 });

  const findAdjacentCells = (row: number, col: number) => {
    // Détermine les cellules adjacentes à la cellule vide
    const adjacent: { row: number; col: number }[] = [];
    if (row > 1) adjacent.push({ row: row - 1, col });
    if (row < 3) adjacent.push({ row: row + 1, col });
    if (col > 1) adjacent.push({ row, col: col - 1 });
    if (col < 3) adjacent.push({ row, col: col + 1 });
    return adjacent;
  };

  const moveCell = useCallback(() => {
    // Choix aléatoire d'une cellule adjacente à déplacer
    const adjacentCells = findAdjacentCells(emptyCellPos.row, emptyCellPos.col);
    // console.log("adjacentCells -->", adjacentCells)
    const randomIndex = Math.floor(Math.random() * adjacentCells.length);
    const selectedCell = adjacentCells[randomIndex];
    console.log("selectedCell -->", selectedCell)

    const keyToMove = Object.keys(gridReferences).find(
      key => gridReferences[key][0] === selectedCell.row && gridReferences[key][1] === selectedCell.col
    );

    const newKey = Object.keys(gridReferences).find(
      key => gridReferences[key][0] === emptyCellPos.row && gridReferences[key][1] === emptyCellPos.col
    );


    console.log("keyToMove -->", keyToMove)
    console.log("newKey -->", newKey)

    const cellElement = document.querySelector(`.grid-item-${keyToMove}`);
    console.log("cellElement -->", cellElement)

    // Vérifier si l'élément HTML a été trouvé
    if (cellElement) {
      // Modifier le style de la cellule
      cellElement.style.gridRowStart = emptyCellPos.row;
      cellElement.style.gridColumnStart = emptyCellPos.col;
      cellElement.classList.remove(`grid-item-${keyToMove}`);
      cellElement.classList.add(`grid-item-${newKey}`);
      setEmptyCellPos(selectedCell);
    }
  }, [emptyCellPos, findAdjacentCells]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const handleGridContainerInView = () => {
      console.log('Le grid-container est dans la vue.');
      intervalId = setInterval(moveCell, 2000); // Démarrer l'intervalle
    };

    const handleGridContainerNotInView = () => {
      console.log('Le grid-container n\'est plus dans la vue.');
      clearInterval(intervalId); // Arrêter l'intervalle
    };

    if (inView) {
      handleGridContainerInView();
    } else {
      handleGridContainerNotInView();
    }

    return () => {
      clearInterval(intervalId); // Nettoyer l'intervalle avant le démontage
    };
  }, [inView, moveCell]);

  return (
    <main>
      <p>lbjld</p>
      <p>lbjld</p>
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

      <p>lbjld</p>
      <p>lbjld</p>
      <p>lbjld</p>
      <p>lbjld</p>
      <p>lbjld</p>
      <p>lbjld</p>
      <p>lbjld</p>
      <p>lbjld</p>
    </main>
  );
}
