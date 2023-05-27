// itemFilter.js
// eslint-disable-next-line import/prefer-default-export
const filteredItems = (filter, search, getItemSetProfit) => {
  if (filter === 'Venator') return getItemSetProfit(27612, [27614], 0, 5);

  if (filter === 'Justicar')
    return getItemSetProfit(22438, [22327, 22326, 22328]);

  if (filter === 'Voidwaker')
    return getItemSetProfit(27690, [27681, 27687, 27684], 500000);

  if (filter === 'Lance') return getItemSetProfit(22978, [22966, 11889]);

  if (filter === 'Kodai Wand') return getItemSetProfit(21006, [21043, 6914]);

  if (filter === 'Inquisitor')
    return getItemSetProfit(24488, [24419, 24420, 24421]);

  if (filter === 'Ancestral')
    return getItemSetProfit(21049, [21018, 21021, 21024]);

  // if (filter === 'Odium Ward')
  //   return getItemSetProfit(11926, [11928, 11929, 21030]);

  if (filter === 'Malediction Ward')
    return getItemSetProfit(11924, [11931, 11932, 11933]);

  if (filter === 'Dragonfire Ward')
    return getItemSetProfit(22003, [22006, 1540]);

  if (filter === 'Dragonfire shield')
    return getItemSetProfit(22003, [11286, 1540]);

  if (filter === 'Abyssal Dagger')
    return getItemSetProfit(13271, [13265, 5940]);

  if (filter === 'Toxic Staff') return getItemSetProfit(12902, [11791, 12932]);

  if (filter === 'Zaryte Crossbow')
    return getItemSetProfit(26374, [11785, 26372, 26231], null, 250);

  if (filter === 'Ursine Chainmace')
    return getItemSetProfit(27657, [22542, 27667]);

  if (filter === 'Webweaver Bow')
    return getItemSetProfit(27652, [22547, 27670]);

  if (filter === 'Elysian spirit shield')
    return getItemSetProfit(12817, [12819, 12831]);

  if (filter === 'Arcane spirit shield')
    return getItemSetProfit(12825, [12827, 12831]);

  if (filter === 'Spectral spirit shield')
    return getItemSetProfit(12821, [12823, 12831]);

  if (filter === 'Ancient godsword')
    return getItemSetProfit(26233, [26370, 11798]);

  if (filter === 'Bandos godsword')
    return getItemSetProfit(11804, [11812, 11798]);

  if (filter === 'Armadyl godsword')
    return getItemSetProfit(11802, [11810, 11798]);

  if (filter === 'Saradomin godsword')
    return getItemSetProfit(11806, [11814, 11798]);

  if (filter === 'Zamorak godsword')
    return getItemSetProfit(11808, [11816, 11798]);

  if (filter === 'Primordial boots')
    return getItemSetProfit(13239, [13231, 11840]);

  if (filter === 'Masori Set (f)')
    return getItemSetProfit(27355, [27235, 27238, 27241]);

  if (filter === 'Masori Helm (f)')
    return getItemSetProfit(27226, [27226, 27269]);
  if (filter === 'Masori Plate (f)')
    return getItemSetProfit(27229, [27229, 27269]);
  if (filter === 'Masori Chaps (f)')
    return getItemSetProfit(27232, [27232, 27269]);

  return [];
};

const filterOptions = [
  'All',
  'Venator',
  'Justicar',
  'Voidwaker',
  'Lance',
  'Inquisitor',
  'Kodai Wand',
  'Ancestral',
  'Odium Ward',
  'Malediction Ward',
  'Abyssal Dagger',
  'Toxic Staff',
  'Zaryte Crossbow',
  'Ursine Chainmace',
  'Webweaver Bow',
  'Elysian spirit shield',
  'Arcane spirit shield',
  'Spectral spirit shield',
  'Ancient godsword',
  'Bandos godsword',
  'Armadyl godsword',
  'Saradomin godsword',
  'Zamorak godsword',
  'Primordial boots',
  'Masori Set'
];

export { filteredItems, filterOptions };
