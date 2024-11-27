export const getRepselKey = (repselGroup: number): string => {
  switch (repselGroup) {
    case 7:
      return process.env.REPSEL_ALIANZA_KEY;

    case 5:
      return process.env.REPSEL_FG_KEY;

    default:
      return '';
  }
};