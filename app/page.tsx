import Image from "next/image";
import logo from "../public/next.svg";


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

export default function Home() {
  const positions = [];
  for (let row = 1; row <= 3; row++) {
    for (let col = 1; col <= 3; col++) {
      const index = (row - 1) * 3 + col - 1;
      if (index < 8) {
        positions.push({ row, col, index });
      }
    }
  }

  return (
    <main>
      <div className="grid-container">
        {positions.map((pos, index) => (
          <div key={index} className={`cell grid-item-${index +1}`} style={{ gridRowStart: pos.row, gridColumnStart: pos.col, backgroundColor: colors[index] }}>
            {pos.index + 1}
          </div>
        ))}
      </div>
    </main>
  );
}
