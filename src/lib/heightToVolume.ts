const heightToVolume = (centreMetre: number): number => {
  return Math.round((centreMetre / 100) * Math.PI * (1.625 * 1.625) * 1000);
};

export default heightToVolume;
