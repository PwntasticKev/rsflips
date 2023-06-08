export default {
  filteredItems(filter, search, getItemSetProfit) {
    switch (filter) {
      case 'Venator':
        return getItemSetProfit(27612, [27614], 0, { id: 27614, qty: 5 });
      case 'Justicar':
        return getItemSetProfit(22438, [22326, 22327, 22328]);
      case 'Voidwaker':
        return getItemSetProfit(27690, [27681, 27687, 27684], 500000);
      case 'Lance':
        return getItemSetProfit(22978, [22966, 11889]);
      case 'Kodai Wand':
        return getItemSetProfit(21006, [21043, 6914]);
      case 'Inquisitor':
        return getItemSetProfit(24488, [24419, 24420, 24421]);
      case 'Ancestral':
        return getItemSetProfit(21049, [21018, 21021, 21024]);
      case 'Malediction Ward':
        return getItemSetProfit(11924, [11931, 11932, 11933]);
      case 'Dragonfire Ward':
        return getItemSetProfit(22003, [22006, 1540]);
      case 'Dragonfire shield':
        return getItemSetProfit(22003, [11286, 1540]);
      case 'Abyssal Dagger':
        return getItemSetProfit(13271, [13265, 5940]);
      case 'Toxic Staff':
        return getItemSetProfit(12902, [11791, 12932]);
      case 'Serpentine Helm':
        return getItemSetProfit(12929, [12927]);
      case 'Blowpipe':
        return getItemSetProfit(12924, [12922]);
      case 'Zaryte Crossbow':
        return getItemSetProfit(26374, [11785, 26372, 26231], null, {
          id: 26231,
          qty: 250
        });
      case 'Ursine Chainmace':
        return getItemSetProfit(27657, [22542, 27667]);
      case 'Webweaver Bow':
        return getItemSetProfit(27652, [22547, 27670]);
      case 'Elysian spirit shield':
        return getItemSetProfit(12817, [12819, 12831]);
      case 'Arcane spirit shield':
        return getItemSetProfit(12825, [12827, 12831]);
      case 'Spectral spirit shield':
        return getItemSetProfit(12821, [12823, 12831]);
      case 'Ancient godsword':
        return getItemSetProfit(26233, [26370, 11798]);
      case 'Bandos godsword':
        return getItemSetProfit(11804, [11812, 11798]);
      case 'Armadyl godsword':
        return getItemSetProfit(11802, [11810, 11798]);
      case 'Saradomin godsword':
        return getItemSetProfit(11806, [11814, 11798]);
      case 'Zamorak godsword':
        return getItemSetProfit(11808, [11816, 11798]);
      case 'Primordial boots':
        return getItemSetProfit(13239, [13231, 11840]);
      case 'Masori Set (f)':
        return getItemSetProfit(27355, [27235, 27238, 27241]);
      case 'Gilded SK (set)':
        return getItemSetProfit(13038, [3486, 3481, 3485]);
      case 'Gilded LG (set)':
        return getItemSetProfit(13036, [3486, 3481, 3483]);
      case 'Obsidian (set)':
        return getItemSetProfit(21279, [21298, 21301, 21304]);
      default:
        return [];
    }
  },
  filterOptions: [
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
    'Masori Set (f)',
    'Gilded SK (set)',
    'Gilded LG (set)',
    'Obsidian (set)'
  ]
};
