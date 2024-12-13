import React, { useState, useEffect } from 'react';
import RoundDetails from './RoundDetails';
import './index.css';
import {IRound, ISelectedRound} from "../models/rounds";

function RoundsList() {
    const [rounds, setRounds] = useState<IRound[]>([]);
    const [selectedRound, setSelectedRound] = useState<ISelectedRound | null>(null);

    useEffect(() => {
        fetchData();
    }, []);


    const fetchData = async () => {
        // We retrieve information about all available rounds of a fictional game
        try {
            const response = await fetch('https://api.jsonbin.io/v3/b/675aea4ead19ca34f8d9fa38');
            const data = await response.json();
            console.log('Fetched rounds:', data);
            setRounds(data.record || []);
        } catch (error) {
            setRounds( []);

            console.error('Error fetching rounds:', error);
        }
    };

    const handleRoundClick = async (roundId: string) => {
        // We retrieve the available levels of the selected round
        if (selectedRound && selectedRound.id === roundId) {
            setSelectedRound(null);
        } else {
            try {
                const response = await fetch(`https://api.jsonbin.io/v3/b/675c860bad19ca34f8daa75a`);
                const data = await response.json();
                if (data.record) {
                    const selectedItems = data.record.find((round: { id: string; }) => round.id === roundId);
                    setSelectedRound(selectedItems);
                }
            } catch (error) {
                setSelectedRound(null);
                console.error('Error fetching round details:', error);
            }
        }
    };

    const handleRefresh = async () => {
        // This button would refresh the levels in real-time if we had such functionality currently.
        // At the moment, this is only a simulation that such capability could exist.
        // All data is static and does not change.
        if (selectedRound && selectedRound.id) {
            await handleRoundClick(selectedRound.id);
        } else {
            console.error('Invalid roundId:', selectedRound);
        }
    };

    return (
        <div className="rounds-list">
            <table className="rounds-list__table">
                <thead>
                <tr>
                    <th className="rounds-list__header-cell">Rounds</th>
                    <th className="rounds-list__header-cell">Date</th>
                </tr>
                </thead>
                <tbody>
                {rounds.map((round) => (
                    <React.Fragment key={round.roundId}>
                        <tr
                            onClick={() => handleRoundClick(round.roundId)}
                            className={`rounds-list__row ${selectedRound && selectedRound.id === round.roundId ? 'rounds-list__row--selected' : ''}`}
                        >
                            <td className="rounds-list__cell">{round.roundId}</td>
                            <td className="rounds-list__cell">{new Date(round.dateTime).toLocaleString()}</td>
                        </tr>
                        {selectedRound && selectedRound.id === round.roundId && (
                            <tr>
                                <td colSpan={2} className="rounds-list__details">
                                    <RoundDetails round={selectedRound} onRefresh={handleRefresh} />
                                </td>
                            </tr>
                        )}
                    </React.Fragment>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default RoundsList;
