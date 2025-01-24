import { RANKS } from '../../constants/ranks.js';

export class convertData {
    constructor() {
        const language = localStorage.getItem('language') || 'en';
        
        this.rankRanges = {
            Bronze: [0, 999],
            Silver: [1000, 1999],
            Gold: [2000, 2999],
            Platinum: [3000, 3999],
            Diamond: [4000, 4999],
            Master: [5000, 5999],
            Grandmaster: [6000, 6999],
            Challenger: [7000, 7999],
            Legend: [8000, 8999],
            Mythical: [9000, Infinity]
        };
        
        this.maxRankPoints = 9000;
        this.language = language;
    }

    convertRank(rank) {
        try {
            if (typeof rank !== 'number' || rank < 0) {
                return { 
                    rank: RANKS[this.language].Unknown, 
                    index: 0, 
                    progress: 0 
                };
            }

            let index = 0;
            for (const [key, range] of Object.entries(this.rankRanges)) {
                const [min, max] = range;
                index++;
                if (rank >= min && rank <= max) {
                    const progress = Math.min((rank / this.maxRankPoints) * 100, 100).toFixed(2); 
                    return { 
                        rank: RANKS[this.language][key], 
                        index: index, 
                        progress: parseFloat(progress) 
                    }; 
                }
            }

            return { 
                rank: RANKS[this.language].Unknown, 
                index: 0, 
                progress: 0 
            };
        } catch (e) {
            console.error("Error in convertRank:", e.message);
            return { 
                rank: RANKS[this.language].Unknown, 
                index: 0, 
                progress: 0 
            };
        }
    }
}
