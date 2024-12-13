import {useEffect, useState} from "react";
import { IRoundDetailsProps} from "../models/rounds";

function RoundDetails({ round, onRefresh }: IRoundDetailsProps) {
    const [gameField, setGameField] = useState<string[][]>([]);

    useEffect(() => {
        if (round !== null) {
            generateField(round.height, round.items);
        }
    }, [round]);

    const generateField = (height: string, items: any) => {
        const itemArray = items.split(',');
        // Conversion of height from a string to a number
        const convertHeight = parseInt(height, 10);
        //The number of columns is calculated by dividing
        // the number of elements in the array by the height
        const columns = Math.ceil(itemArray.length / convertHeight);

        const fields: string[][] = [];

        for (let i = 0; i < columns; i++) {
            // A two-dimensional array is formed where each
            // subarray contains a group of elements corresponding to a column
            fields.push(itemArray.slice(i * convertHeight, (i + 1) * convertHeight));
        }

        setGameField(fields);
    };

    return (
        <div>
            <div className="game-field">
                {gameField.map((column, colIndex) => (

                    <div key={colIndex} className="game-field__column">
                        {column.map((item, rowIdx) => (
                            <img
                                key={rowIdx}
                                src={`/images/${item}.png`}
                                alt={`Item ${item}`}
                                className="game-field__item"
                                onError={(e) => e.currentTarget.src = '/images/default.png'}
                            />
                        ))}
                    </div>
                ))}
            </div>
            <button className="rounds-list__refresh-button" onClick={onRefresh}>
                Refresh
            </button>
        </div>
    );
}

export default RoundDetails;
