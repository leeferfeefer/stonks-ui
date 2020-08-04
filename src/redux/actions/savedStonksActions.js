
export const SAVE_STONK = 'SAVE_STONK';
export const DELETE_STONK = 'DELETE_STONK';

export const saveStonk = (stonk) => {
    return {type: SAVE_STONK, stonk}
};

export const deleteStonk = (stonk) => {
    return {type: DELETE_STONK, stonk};
};