export const changeNavbarAndMine = (setPosition, nameItem) => {
    setPosition((prevState) => {
        return prevState.map((item) => {
            if (item.name === nameItem) {
                return { ...item, isActive: true };
            } else {
                return {...item, isActive: false};
            }
        });
    });
}