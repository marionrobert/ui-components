"use client";
import Image from "next/image";
import logo from "../public/next.svg";
import { useEffect, useState, useCallback } from "react";
import { useInView } from 'react-intersection-observer';

// Array of colors for grid items
const colors: string[] = [
  '#87CEEB', // Light sky blue
  '#4682B4', // Steel blue
  '#4169E1', // Royal blue
  '#6495ED', // Cornflower blue
  '#1E90FF', // Dodger blue
  '#0000FF', // Blue
  '#0000CD', // Medium blue
  '#00008B', // Dark blue
  "",
];

// Object mapping grid item keys to their positions
const gridReferences: { [key: string]: number[] } = {
  "1": [1, 1],
  "2": [1, 2],
  "3": [1, 3],
  "4": [2, 1],
  "5": [2, 2],
  "6": [2, 3],
  "7": [3, 1],
  "8": [3, 2],
  "9": [3, 3],
};

// Interface for a grid position
interface Position {
  row: number;
  col: number;
  index: number;
}

// Array to hold grid positions
const positions: Position[] = [];

// Initialize positions array with grid coordinates
for (let row = 1; row <= 3; row++) {
  for (let col = 1; col <= 3; col++) {
    const index = (row - 1) * 3 + col - 1;
    if (index < 8){
      positions.push({ row, col, index });
    }
  }
}

// Function to find adjacent cells for a given position
const findAdjacentCells = (row: number, col: number) => {
  // Determine adjacent cells to the empty cell
  const adjacent: { row: number; col: number }[] = [];
  if (row > 1) adjacent.push({ row: row - 1, col });
  if (row < 3) adjacent.push({ row: row + 1, col });
  if (col > 1) adjacent.push({ row, col: col - 1 });
  if (col < 3) adjacent.push({ row, col: col + 1 });
  return adjacent;
};

// Component function
export default function Home() {
  const { ref, inView } = useInView();
  const [emptyCellPos, setEmptyCellPos] = useState<{ row: number; col: number }>({ row: 3, col: 3 });

  // Function to move a cell randomly
  const moveCell = useCallback(() => {
    // Choose a random adjacent cell to move
    const adjacentCells = findAdjacentCells(emptyCellPos.row, emptyCellPos.col);
    const randomIndex = Math.floor(Math.random() * adjacentCells.length);
    const selectedCell = adjacentCells[randomIndex];

    // Find the keys corresponding to the cells to move
    const keyToMove = Object.keys(gridReferences).find(
      (key: string) =>
        gridReferences[key][0] === selectedCell.row &&
        gridReferences[key][1] === selectedCell.col
    );

    const newKey = Object.keys(gridReferences).find(
      (key: string) =>
        gridReferences[key][0] === emptyCellPos.row &&
        gridReferences[key][1] === emptyCellPos.col
    );

    // Find the HTML element corresponding to the cell
    const cellElement = document.querySelector(`.grid-item-${keyToMove}`);

    // Move the cell if HTML element is found
    if (cellElement) {
      cellElement.style.gridRowStart = emptyCellPos.row;
      cellElement.style.gridColumnStart = emptyCellPos.col;
      cellElement.classList.remove(`grid-item-${keyToMove}`);
      cellElement.classList.add(`grid-item-${newKey}`);
      setEmptyCellPos(selectedCell);
    }
  }, [emptyCellPos]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const handleGridContainerInView = () => {
      intervalId = setInterval(moveCell, 2000); // Start the interval
    };

    const handleGridContainerNotInView = () => {
      clearInterval(intervalId); // Stop the interval
    };

    // Check if the grid container is in view
    if (inView) {
      handleGridContainerInView();
    } else {
      handleGridContainerNotInView();
    }

    return () => {
      clearInterval(intervalId); // Clean up the interval on component unmount
    };
  }, [inView, moveCell]);

  // Render the grid items
  return (
    <main>
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
