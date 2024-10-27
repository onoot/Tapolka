
const tg = window.Telegram.WebApp;
export function useTelegram() {

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

    return {
        onClose,
        onToggleButton,
        tg,
        initData: tg.initDataUnsafe,
        user: tg.initDataUnsafe?.user,
        queryId: tg.initDataUnsafe?.query_id,
    }
}