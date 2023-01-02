const distanceToVolume = (centreMetre: number): number => {
  return Math.round(
    (2.6 - centreMetre / 100) * Math.PI * (1.625 * 1.625) * 1000
  );
};

export default distanceToVolume;
