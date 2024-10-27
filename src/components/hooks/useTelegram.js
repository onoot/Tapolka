import { retrieveLaunchParams } from '@telegram-apps/sdk';

const tg = window.Telegram.WebApp;
export function useTelegram() {

    const onClose = () => {
        tg.close()
    }
    const {initDataRaw } = retrieveLaunchParams();

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
        user: tg.initDataUnsafe?.user,
        queryId: tg.initDataUnsafe?.query_id,
    }
}