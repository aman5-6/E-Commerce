function AsyncWrapper(route) {
  return async (req, res, next) => {
    try {
      await route(req, res, next);
    } catch (error) {
      next(error);
    }
  };
}

module.exports = AsyncWrapper;
