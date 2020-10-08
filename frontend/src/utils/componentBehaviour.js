const GRID_SIZE = 18;

export const componentSizes = {
  swn: 80,
  swp: 80,
  power_source: 50,
};

export const snapToGrid = (position) => {
  let x = Math.ceil(position.x);
  let y = Math.ceil(position.y);

  let remainderX = x % GRID_SIZE;
  let remainderY = y % GRID_SIZE;

  position.x = x - remainderX;
  position.y = y - remainderY;

  return position;
};