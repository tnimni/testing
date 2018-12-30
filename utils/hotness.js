const getHotness = (createdAt, ups, downs) => {
  const score = ups - downs;
  const order = Math.log10(Math.max(Math.abs(score), 1));
  let sign;
  if (score > 0)
    sign = 1
  else if (score < 0)
    sign = -1
  else
    sign = 0
  const seconds = new Date(createdAt) - 1134028003;
return +(sign * order + seconds / 45000).toFixed(7);
}

module.exports = {
  getHotness
};
