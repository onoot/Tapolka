// playerStore.mjs
import { create } from 'zustand';

class Player {
    constructor(id, name, role, money, totalMoney, profit, energy, rank, benefit, daily, reward, wallet, boost, max_energy, combo_count) {
        this.id = id;
        this.name = name;
        this.role = role;
        this.money = money;
        this.totalMoney = totalMoney;
        this.profit = profit;
        this.energy = energy;
        this.max_energy = max_energy||500;
        this.rank = rank;
        this.benefit = benefit;
        this.daily = daily;
        this.reward = reward;
        this.wallet = wallet;
        this.boost = boost;
        this.combo_count = combo_count;
    }
}
export const usePlayerStore = create((set) => ({
    // player: new Player(1, '...', '...', 0, 0, 0, 500, 0, 0), 
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
