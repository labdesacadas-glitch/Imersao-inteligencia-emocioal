export interface PDASectionData {
  perception: string;
  decision: string;
  action: string;
}

export interface DayProgress {
  completed: boolean;
  timestamp?: string;
  responses: Record<string, string>;
  pda: PDASectionData;
}

export interface FlowConfig {
  playlistId: string;
  durations: {
    step1: number; // Prepare ambiente (minutos)
    step2: number; // Conecte com corpo (minutos)
    step3: number; // Escolha trilha (minutos)
    step4: number; // Centralize foco (minutos)
    step5: number; // Ancore estado (minutos)
  };
}

export interface ProtocolData {
  protocolType: "frustration" | "skills";
  startDate: string;
  currentDay: number;
  days: Record<number, DayProgress>;
  mandala?: {
    start?: string;
    end?: string;
  };
  activePlaylist?: string;
  flowConfig?: FlowConfig;
}

const STORAGE_KEY = "valor_contido_protocol";

export const getProtocolData = (): ProtocolData | null => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return null;
  return JSON.parse(data);
};

export const initializeProtocol = (type: "frustration" | "skills", flowConfig?: FlowConfig): void => {
  const data: ProtocolData = {
    protocolType: type,
    startDate: new Date().toISOString(),
    currentDay: 1,
    days: {},
    mandala: {},
    flowConfig: flowConfig || {
      playlistId: "flow-state",
      durations: {
        step1: 1,
        step2: 1,
        step3: 0.5,
        step4: 1.5,
        step5: 1,
      }
    }
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const saveProtocolData = (data: ProtocolData): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const getDayProgress = (day: number): DayProgress | null => {
  const protocol = getProtocolData();
  if (!protocol) return null;
  return protocol.days[day] || null;
};

export const saveDayProgress = (day: number, progress: Partial<DayProgress>): void => {
  const protocol = getProtocolData();
  if (!protocol) return;

  const existing = protocol.days[day] || {
    completed: false,
    responses: {},
    pda: { perception: "", decision: "", action: "" }
  };

  protocol.days[day] = { ...existing, ...progress };
  saveProtocolData(protocol);
};

export const completeDay = (day: number): void => {
  const protocol = getProtocolData();
  if (!protocol) return;

  if (!protocol.days[day]) {
    protocol.days[day] = {
      completed: false,
      responses: {},
      pda: { perception: "", decision: "", action: "" }
    };
  }

  protocol.days[day].completed = true;
  protocol.days[day].timestamp = new Date().toISOString();
  
  // Unlock next day
  if (day < 7) {
    protocol.currentDay = day + 1;
  }

  saveProtocolData(protocol);
};

export const isDayLocked = (day: number): { locked: boolean; timeRemaining?: number } => {
  const protocol = getProtocolData();
  if (!protocol) return { locked: true };

  const previousDay = day - 1;
  
  // Day 1 is never locked
  if (day === 1) return { locked: false };
  
  // Check if previous day is completed
  const prevProgress = protocol.days[previousDay];
  if (!prevProgress || !prevProgress.completed || !prevProgress.timestamp) {
    return { locked: true };
  }

  // Check if 24 hours have passed
  const completionTime = new Date(prevProgress.timestamp).getTime();
  const now = Date.now();
  const hoursPassed = (now - completionTime) / (1000 * 60 * 60);

  if (hoursPassed < 24) {
    const timeRemaining = 24 - hoursPassed;
    return { locked: true, timeRemaining };
  }

  return { locked: false };
};

export const saveMandalaPosition = (position: "start" | "end", stage: string): void => {
  const protocol = getProtocolData();
  if (!protocol) return;

  if (!protocol.mandala) {
    protocol.mandala = {};
  }

  protocol.mandala[position] = stage;
  saveProtocolData(protocol);
};

export const saveActivePlaylist = (playlistId: string): void => {
  const protocol = getProtocolData();
  if (!protocol) return;

  protocol.activePlaylist = playlistId;
  saveProtocolData(protocol);
};

export const resetProtocol = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};

export const getAllDaysData = (): Record<number, DayProgress> => {
  const protocol = getProtocolData();
  if (!protocol) return {};
  return protocol.days;
};
