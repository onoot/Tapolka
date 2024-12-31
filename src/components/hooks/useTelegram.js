
const tg = window.Telegram.WebApp;
export function useTelegram() {
    const expand = () => {
        tg.expand();
    }

    const onClose = () => {
        tg.close()
    }
    
    const initData = tg.initData;

    const onToggleButton = () => {
        if(tg.MainButton.isVisible) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
        }
    }
    const shareMessage = (message) => {
        if (!message || typeof message !== 'string') {
            console.error('Сообщение должно быть строкой.');
            return;
        }

        // Открытие ссылки через Telegram WebApp
        tg.openLink(`https://t.me/share/url?url=${encodeURIComponent(message)}`)
            .then(() => console.log('Ссылка успешно отправлена через Telegram.'))
            .catch((error) => console.error('Ошибка при отправке ссылки:', error));
    };
    return {
        onClose,
        onToggleButton,
        tg,
        initData: tg.initDataUnsafe,
        user: tg.initDataUnsafe?.user,
        queryId: tg.initDataUnsafe?.query_id,
        photoUrl: tg.initDataUnsafe?.user?.photo_url,
        expand,
        shareMessage,
        
    }
}