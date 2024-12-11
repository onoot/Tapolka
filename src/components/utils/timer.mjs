export const countdownToMidnight = (unixTimestamp, setRemainingTime) => {
    if (!unixTimestamp) {
        setRemainingTime("00:00:00");
        return null;
    }

    // Преобразуем метку времени в миллисекунды (если она в секундах)
    const timestamp = unixTimestamp < 10000000000 ? unixTimestamp * 1000 : unixTimestamp;

    // Устанавливаем целевую дату
    const targetDate = new Date(timestamp);

    const updateRemainingTime = () => {
        const currentTime = new Date();
        const timeLeft = targetDate.getTime() - currentTime.getTime();

        if (timeLeft <= 0) {
            setRemainingTime("00:00:00");
            clearInterval(intervalId);
            return;
        }

        const hours = Math.floor(timeLeft / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        setRemainingTime(
            `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
        );
    };

    updateRemainingTime(); // Обновляем сразу, чтобы не ждать первый интервал
    const intervalId = setInterval(updateRemainingTime, 1000);
    return intervalId;
};