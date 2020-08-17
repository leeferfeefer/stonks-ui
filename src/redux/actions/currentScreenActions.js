
export const UPDATE_CURRENT_SCREEN = 'UPDATE_CURRENT_SCREEN';

export const updateCurrentScreenIndex = (currentScreenIndex) => {
    return {type: UPDATE_CURRENT_SCREEN, currentScreenIndex};
};