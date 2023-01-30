const getFormattedDateStructure = str => (str.length === 1 ? "0" + str : str);

exports.getSqlDate = obj => {
  const month = (obj.getMonth() + 1).toString();
  const date = obj.getDate().toString();
  const hours = obj.getHours().toString();
  const minutes = obj.getMinutes().toString();
  const seconds = obj.getSeconds().toString();

  const y = obj.getFullYear().toString();
  const m = getFormattedDateStructure(month);
  const d = getFormattedDateStructure(date);
  const h = getFormattedDateStructure(hours);
  const min = getFormattedDateStructure(minutes);
  const s = getFormattedDateStructure(seconds);

  return `${y}-${m}-${d} ${h}:${min}:${s}`;
};
