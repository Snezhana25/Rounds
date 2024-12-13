export interface IRound {
    dateTime: number;
    roundId: string;
    items: string;
}

export interface ISelectedRound extends IRound {
    id: string;
    height: string;
}

export interface IRoundDetailsProps {
    round: ISelectedRound | null;
    onRefresh: () => void;
}
