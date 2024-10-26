// playerStore.js
import { create } from 'zustand';

class Player {
    constructor(id, name, role, money, totalMoney, profit, energy, rank, benefit) {
        this.id = id;
        this.name = name;
        this.role = role;
        this.money = money;
        this.totalMoney = totalMoney;
        this.profit = profit;
        this.energy = energy;
        this.rank = rank;
        this.benefit = benefit;
    }
}

export const usePlayerStore = create((set) => ({
    player: new Player(1, 'Guest', 'CEO', 0, 0, 0, 1000, 0, 0),
    setPlayer: (newPlayer) => set({ player: newPlayer }),
    updatePlayer: (updates) =>
        set((state) => ({
            player: { ...state.player, ...updates },
        })),
    updateEnergy: (energy) =>
        set((state) => ({
            player: { ...state.player, energy },
        })),
    updateMoney: (money) =>
        set((state) => ({
            player: { ...state.player, money },
        })),
}));
