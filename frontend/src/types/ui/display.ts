export interface TotalDataDisplayProps {
  total: number;
  title?: string;
}

export interface TotalMonthlyEntriesProps {
  type: string;
  total: number;
}

export interface DateDisplayProps {
  weekIndex: number;
  setIndex: (index: number) => void;
}

export interface WeekProps {
  start: Date;
  end: Date;
}
