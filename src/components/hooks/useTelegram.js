const tg = window.Telegram.WebApp;

export function useTelegram() {
    function onClose() {tg.close()}

    function onToggleButton() {
        if (tg.MainButton.isVisiable) tg.MainButton.hide();
        else tg.MainButton.show();
    }

    return {
        onClose,
        onToggleButton,
        tg,
        user: tg.initDataUnsafe?.user
    }
}