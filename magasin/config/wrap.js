export default (fn) => (req, res, next) =>
  Promise.resolve().then(() => fn(req, res)).catch(next)