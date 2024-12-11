export const changeNavbarAndMine = (setPosition, nameItem) => {
    if (typeof setPosition !== "function") {
        console.error("setPosition is not a function");
        return;
    }
    setPosition((prevState) => {
        return prevState.map((item) => {
            if (item.name === nameItem) {
                return { ...item, isActive: true };
            } else {
                return { ...item, isActive: false };
            }
        });
    });
};
