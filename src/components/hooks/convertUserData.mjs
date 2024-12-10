export class convertData {
    constructor() {
        // Объект с диапазонами рангов
        this.rankRanges = {
            "Bronze": [0, 999],
            "Silver": [1000, 1999],
            "Gold": [2000, 2999],
            "Platinum": [3000, 3999],
            "Diamond": [4000, 4999],
            "Master": [5000, 5999],
            "Grandmaster": [6000, 6999],
            "Challenger": [7000, 7999],
            "Legend": [8000, 8999],
            "Mythical": [9000, Infinity]
        };
        
        // Максимальное значение для прогресса
        this.maxRankPoints = 9000;
    }

    // Метод для проверки ранга по диапазону
    convertRank(rank) {
        try {
            if (typeof rank !== 'number' || rank < 0) {
                return { rank: "Unknown", index: 0, progress: 0 };
            }

            // Перебираем объект с диапазонами
            let index = 0;
            for (const [key, range] of Object.entries(this.rankRanges)) {
                const [min, max] = range;
                index++;
                if (rank >= min && rank <= max) {
                    const progress = Math.min((rank / this.maxRankPoints) * 100, 100).toFixed(2); 
                    return { rank: key, index: index, progress: parseFloat(progress) }; 
                }
            }

            // Если ранг не попал в диапазоны
            return { rank: "Unknown", index: 0, progress: 0 };
        } catch (e) {
            console.error("Ошибка в convertRank:", e.message);
            return { rank: "Unknown", index: 0, progress: 0 };
        }
    }
}
