export default {
  filteredItems(filter, search, getItemSetProfit) {
    const venator = getItemSetProfit(27612, [27614], 0, { id: 27614, qty: 5 });
    const justicar = getItemSetProfit(22438, [22326, 22327, 22328]);
    const voidwaker = getItemSetProfit(27690, [27681, 27687, 27684], 500000);
    const lance = getItemSetProfit(22978, [22966, 11889]);
    const kodaiWand = getItemSetProfit(21006, [21043, 6914]);
    const inquisitor = getItemSetProfit(24488, [24419, 24420, 24421]);
    const ancestral = getItemSetProfit(21049, [21018, 21021, 21024]);
    const maledictionWard = getItemSetProfit(11924, [11931, 11932, 11933]);
    const dragonfireWard = getItemSetProfit(22003, [22006, 1540]);
    const dragonfireShield = getItemSetProfit(22003, [11286, 1540]);
    const abyssalDagger = getItemSetProfit(13271, [13265, 5940]);
    const toxicStaff = getItemSetProfit(12902, [11791, 12932]);
    const zaryteCrossbow = getItemSetProfit(
      26374,
      [11785, 26372, 26231],
      null,
      { id: 26231, qty: 250 }
    );
    const ursineChainmace = getItemSetProfit(27657, [22542, 27667]);
    const webweaverBow = getItemSetProfit(27652, [22547, 27670]);
    const elysianSpiritShield = getItemSetProfit(12817, [12819, 12831]);
    const arcaneSpiritShield = getItemSetProfit(12825, [12827, 12831]);
    const spectralSpiritShield = getItemSetProfit(12821, [12823, 12831]);
    const ancientGodsword = getItemSetProfit(26233, [26370, 11798]);
    const bandosGodsword = getItemSetProfit(11804, [11812, 11798]);
    const armadylGodsword = getItemSetProfit(11802, [11810, 11798]);
    const saradominGodsword = getItemSetProfit(11806, [11814, 11798]);
    const zamorakGodsword = getItemSetProfit(11808, [11816, 11798]);
    const primordialBoots = getItemSetProfit(13239, [13231, 11840]);
    const masoriSetF = getItemSetProfit(27355, [27235, 27238, 27241]);
    const masoriHelmF = getItemSetProfit(27226, [27226, 27269]);
    const masoriPlateF = getItemSetProfit(27229, [27229, 27269]);
    const masoriChapsF = getItemSetProfit(27232, [27232, 27269]);

    const mergedResults = [
      ...venator,
      ...justicar,
      ...voidwaker,
      ...lance,
      ...kodaiWand,
      ...inquisitor,
      ...ancestral,
      ...maledictionWard,
      ...dragonfireWard,
      ...dragonfireShield,
      ...abyssalDagger,
      ...toxicStaff,
      ...zaryteCrossbow,
      ...ursineChainmace,
      ...webweaverBow,
      ...elysianSpiritShield,
      ...arcaneSpiritShield,
      ...spectralSpiritShield,
      ...ancientGodsword,
      ...bandosGodsword,
      ...armadylGodsword,
      ...saradominGodsword,
      ...zamorakGodsword,
      ...primordialBoots,
      ...masoriSetF,
      ...masoriHelmF,
      ...masoriPlateF,
      ...masoriChapsF
    ];

    return mergedResults;
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
    'Masori Set'
  ]
};
