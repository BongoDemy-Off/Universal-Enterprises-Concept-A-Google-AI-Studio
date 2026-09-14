import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Bike } from '../data/repository';

interface BikeContextType {
  selectedBike: Bike | null;
  setBike: (bike: Bike) => void;
  clearBike: () => void;
}

const BikeContext = createContext<BikeContextType | undefined>(undefined);

export function BikeProvider({ children }: { children: ReactNode }) {
  const [selectedBike, setSelectedBikeState] = useState<Bike | null>(() => {
    const saved = localStorage.getItem('ue_demo_selected_bike');
    return saved ? JSON.parse(saved) : null;
  });

  const setBike = (bike: Bike) => {
    setSelectedBikeState(bike);
    localStorage.setItem('ue_demo_selected_bike', JSON.stringify(bike));
  };

  const clearBike = () => {
    setSelectedBikeState(null);
    localStorage.removeItem('ue_demo_selected_bike');
  };

  return (
    <BikeContext.Provider value={{ selectedBike, setBike, clearBike }}>
      {children}
    </BikeContext.Provider>
  );
}

export function useBike() {
  const context = useContext(BikeContext);
  if (context === undefined) {
    throw new Error('useBike must be used within a BikeProvider');
  }
  return context;
}
