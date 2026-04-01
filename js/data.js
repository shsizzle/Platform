// ============================================
// AdvisorHub — Sample Data
// ============================================

const MANAGERS = [
  {
    id: 'blackrock',
    name: 'BlackRock',
    initials: 'BR',
    color: '#1a1a2e',
    category: 'multi-asset',
    description: 'Global investment management, risk management and advisory services.',
    aum: '$9.4T',
    founded: '1988',
    strategies: ['Equity', 'Fixed Income', 'Alternatives', 'Multi-Asset'],
  },
  {
    id: 'vanguard',
    name: 'Vanguard',
    initials: 'VG',
    color: '#8b1a1a',
    category: 'equity',
    description: 'Index fund pioneer offering low-cost investment solutions.',
    aum: '$7.7T',
    founded: '1975',
    strategies: ['Index Funds', 'ETFs', 'Fixed Income'],
  },
  {
    id: 'fidelity',
    name: 'Fidelity',
    initials: 'FI',
    color: '#2d6a2e',
    category: 'equity',
    description: 'Diversified financial services and investment management company.',
    aum: '$4.5T',
    founded: '1946',
    strategies: ['Active Equity', 'Fixed Income', 'Sector Funds'],
  },
  {
    id: 'pimco',
    name: 'PIMCO',
    initials: 'PM',
    color: '#1d4ed8',
    category: 'fixed-income',
    description: 'Leading global fixed income investment manager.',
    aum: '$1.8T',
    founded: '1971',
    strategies: ['Fixed Income', 'Credit', 'Macro'],
  },
  {
    id: 'bridgewater',
    name: 'Bridgewater',
    initials: 'BW',
    color: '#7c3aed',
    category: 'alternatives',
    description: 'Largest hedge fund in the world, known for macro strategies.',
    aum: '$124B',
    founded: '1975',
    strategies: ['Global Macro', 'Risk Parity', 'Alternatives'],
  },
  {
    id: 'jpmorgan-am',
    name: 'JPMorgan AM',
    initials: 'JP',
    color: '#0c4a6e',
    category: 'multi-asset',
    description: 'Global asset management with deep research capabilities.',
    aum: '$3.0T',
    founded: '1871',
    strategies: ['Equity', 'Fixed Income', 'Alternatives', 'Liquidity'],
  },
  {
    id: 'goldman-am',
    name: 'Goldman Sachs AM',
    initials: 'GS',
    color: '#1e3a5f',
    category: 'alternatives',
    description: 'Investment management division of Goldman Sachs.',
    aum: '$2.7T',
    founded: '1988',
    strategies: ['Equity', 'Fixed Income', 'Alternatives'],
  },
  {
    id: 'schroders',
    name: 'Schroders',
    initials: 'SC',
    color: '#0e7490',
    category: 'esg',
    description: 'Global asset manager with a strong focus on sustainability.',
    aum: '$923B',
    founded: '1804',
    strategies: ['ESG', 'Equity', 'Fixed Income', 'Multi-Asset'],
  },
  {
    id: 'aqr',
    name: 'AQR Capital',
    initials: 'AQ',
    color: '#dc2626',
    category: 'alternatives',
    description: 'Quantitative investment management firm.',
    aum: '$98B',
    founded: '1998',
    strategies: ['Quant Equity', 'Managed Futures', 'Alternative Risk'],
  },
  {
    id: 'capital-group',
    name: 'Capital Group',
    initials: 'CG',
    color: '#0369a1',
    category: 'equity',
    description: 'Home of American Funds, one of the largest active managers.',
    aum: '$2.6T',
    founded: '1931',
    strategies: ['Active Equity', 'Fixed Income', 'Balanced'],
  },
  {
    id: 'wellington',
    name: 'Wellington Mgmt',
    initials: 'WM',
    color: '#4338ca',
    category: 'multi-asset',
    description: 'Private, independent investment management firm.',
    aum: '$1.1T',
    founded: '1928',
    strategies: ['Equity', 'Fixed Income', 'Multi-Asset'],
  },
  {
    id: 'calvert',
    name: 'Calvert Research',
    initials: 'CR',
    color: '#15803d',
    category: 'esg',
    description: 'Pioneer in responsible investing and ESG integration.',
    aum: '$35B',
    founded: '1976',
    strategies: ['ESG Equity', 'ESG Fixed Income', 'Impact'],
  },
  {
    id: 'doubleline',
    name: 'DoubleLine',
    initials: 'DL',
    color: '#b45309',
    category: 'fixed-income',
    description: 'Fixed income specialist founded by Jeffrey Gundlach.',
    aum: '$96B',
    founded: '2009',
    strategies: ['Total Return', 'Core Fixed Income', 'Mortgage-Backed'],
  },
  {
    id: 'franklin',
    name: 'Franklin Templeton',
    initials: 'FT',
    color: '#0f766e',
    category: 'fixed-income',
    description: 'Global investment management with fixed income expertise.',
    aum: '$1.5T',
    founded: '1947',
    strategies: ['Fixed Income', 'Equity', 'Alternatives', 'Multi-Asset'],
  },
  {
    id: 'man-group',
    name: 'Man Group',
    initials: 'MG',
    color: '#6d28d9',
    category: 'alternatives',
    description: 'Active investment management firm with quant and discretionary strategies.',
    aum: '$151B',
    founded: '1783',
    strategies: ['Quant', 'Discretionary', 'Managed Futures'],
  },
  {
    id: 'nuveen',
    name: 'Nuveen',
    initials: 'NV',
    color: '#1e40af',
    category: 'esg',
    description: 'Responsible investing with expertise in real assets and fixed income.',
    aum: '$1.1T',
    founded: '1898',
    strategies: ['Responsible Investing', 'Real Assets', 'Fixed Income'],
  },
];

const SAMPLE_POSTS = [
  {
    id: 1,
    managerId: 'blackrock',
    author: 'BlackRock Investment Institute',
    content: 'Our latest weekly commentary: We see the AI buildout as a mega force reshaping economies and markets. We stay overweight U.S. equities on this structural theme, even as near-term macro uncertainty persists.\n\nKey takeaway: Selectivity matters more than ever in 2026.',
    category: 'research',
    timestamp: Date.now() - 1800000,
    likes: 42,
    comments: 8,
  },
  {
    id: 2,
    managerId: 'pimco',
    author: 'PIMCO Global Research',
    content: 'Fed holds rates steady at April meeting as expected. Our view: The next move remains a cut, but timing has shifted to H2 2026. Duration positioning should remain modestly long, with a focus on high-quality spread product.',
    category: 'market-news',
    timestamp: Date.now() - 7200000,
    likes: 35,
    comments: 12,
  },
  {
    id: 3,
    managerId: 'bridgewater',
    author: 'Bridgewater Daily Observations',
    content: 'Global deleveraging dynamics are shifting. China\'s credit impulse has turned positive for the first time in 18 months, which historically leads global industrial production by 6-9 months. We are adjusting EM exposure accordingly.',
    category: 'analysis',
    timestamp: Date.now() - 14400000,
    likes: 67,
    comments: 15,
  },
  {
    id: 4,
    managerId: 'schroders',
    author: 'Schroders Sustainability Team',
    content: 'New SEC climate disclosure rules take effect Q3 2026. We\'ve published our compliance roadmap and updated our ESG scoring methodology. Advisors can access the full framework in our data room.\n\nThis will impact reporting for ~4,000 public companies.',
    category: 'regulatory',
    timestamp: Date.now() - 28800000,
    likes: 28,
    comments: 6,
  },
  {
    id: 5,
    managerId: 'vanguard',
    author: 'Vanguard Research',
    content: 'Our updated Capital Markets Model projects 10-year annualized returns of 4.5-6.5% for U.S. equities and 4.8-5.8% for U.S. bonds. The case for balanced portfolios remains compelling at these valuations.',
    category: 'research',
    timestamp: Date.now() - 43200000,
    likes: 53,
    comments: 19,
  },
  {
    id: 6,
    managerId: 'aqr',
    author: 'AQR Research Team',
    content: 'Our latest paper examines the value factor\'s resurgence since 2022. After a decade of underperformance, the value spread remains historically wide, suggesting further runway. Managed futures continue to provide diversification benefits in multi-asset portfolios.',
    category: 'research',
    timestamp: Date.now() - 57600000,
    likes: 31,
    comments: 7,
  },
  {
    id: 7,
    managerId: 'jpmorgan-am',
    author: 'JPMorgan Market Insights',
    content: 'Earnings season update: With 65% of S&P 500 companies reporting, blended EPS growth is tracking at +9.2% YoY, ahead of the +7.1% consensus estimate. Tech and healthcare are leading, while energy remains a headwind.',
    category: 'market-news',
    timestamp: Date.now() - 72000000,
    likes: 44,
    comments: 11,
  },
  {
    id: 8,
    managerId: 'goldman-am',
    author: 'Goldman Sachs Asset Management',
    content: 'Private credit market update: Direct lending continues to capture share from traditional bank lending. We see attractive risk-adjusted returns in senior secured middle-market loans, particularly in defensive sectors.',
    category: 'analysis',
    timestamp: Date.now() - 86400000,
    likes: 38,
    comments: 9,
  },
];

const DATA_ROOM_FILES = {
  'blackrock': {
    name: 'BlackRock',
    children: [
      {
        name: 'Fund Factsheets',
        type: 'folder',
        children: [
          { name: 'Global Allocation Fund.pdf', type: 'pdf', size: '2.4 MB', date: '2026-03-15', description: 'Monthly factsheet for the BlackRock Global Allocation Fund, including performance attribution, top holdings, and sector allocation breakdown.' },
          { name: 'Strategic Income Fund.pdf', type: 'pdf', size: '1.8 MB', date: '2026-03-15', description: 'Monthly factsheet for the Strategic Income Opportunities Fund with yield analysis and duration positioning.' },
          { name: 'Technology Opportunities.pdf', type: 'pdf', size: '2.1 MB', date: '2026-03-15', description: 'Quarterly factsheet covering the Technology Opportunities Fund performance and AI/semiconductor holdings.' },
        ]
      },
      {
        name: 'Research & Commentary',
        type: 'folder',
        children: [
          { name: 'Weekly Commentary - Mar 2026.pdf', type: 'pdf', size: '890 KB', date: '2026-03-28', description: 'BlackRock Investment Institute weekly market commentary discussing Fed policy, AI capex trends, and portfolio positioning.' },
          { name: 'Global Outlook Q2 2026.pdf', type: 'pdf', size: '4.2 MB', date: '2026-03-20', description: 'Comprehensive quarterly outlook covering macro themes, asset class views, and risk scenarios for Q2 2026.' },
          { name: 'Mega Forces Report.pdf', type: 'pdf', size: '5.6 MB', date: '2026-02-15', description: 'Annual report on structural mega forces: AI, geopolitical fragmentation, demographic shifts, low-carbon transition, and future of finance.' },
        ]
      },
      {
        name: 'Performance Reports',
        type: 'folder',
        children: [
          { name: 'Q1 2026 Performance.xlsx', type: 'sheet', size: '1.2 MB', date: '2026-03-31', description: 'Comprehensive quarterly performance report across all fund strategies, including benchmark comparisons and risk metrics.' },
          { name: 'Attribution Analysis Q4 2025.xlsx', type: 'sheet', size: '980 KB', date: '2026-01-15', description: 'Detailed return attribution analysis breaking down alpha sources by factor, sector, and geography.' },
        ]
      },
      {
        name: 'Compliance & Legal',
        type: 'folder',
        children: [
          { name: 'Prospectus 2026.pdf', type: 'pdf', size: '12.3 MB', date: '2026-01-01', description: 'Fund prospectus with complete legal disclosures, fee schedules, and investment policies.' },
          { name: 'ADV Part 2A.pdf', type: 'pdf', size: '3.4 MB', date: '2026-03-01', description: 'Form ADV Part 2A firm brochure with advisory business description, fees, and conflicts of interest.' },
        ]
      }
    ]
  },
  'vanguard': {
    name: 'Vanguard',
    children: [
      {
        name: 'Index Fund Reports',
        type: 'folder',
        children: [
          { name: 'Total Stock Market Index.pdf', type: 'pdf', size: '1.5 MB', date: '2026-03-31', description: 'Factsheet for the Vanguard Total Stock Market Index Fund covering all U.S. equity market segments.' },
          { name: 'Total Bond Market Index.pdf', type: 'pdf', size: '1.3 MB', date: '2026-03-31', description: 'Monthly factsheet for the Total Bond Market Index Fund with duration, credit quality, and sector allocation.' },
          { name: 'International Growth.pdf', type: 'pdf', size: '1.7 MB', date: '2026-03-15', description: 'Quarterly report for International Growth Fund with country allocation and top holdings analysis.' },
        ]
      },
      {
        name: 'Capital Markets Research',
        type: 'folder',
        children: [
          { name: 'VCMM Projections 2026.pdf', type: 'pdf', size: '3.8 MB', date: '2026-03-01', description: 'Vanguard Capital Markets Model 10-year return and volatility projections across asset classes.' },
          { name: 'Advisor Alpha Framework.pdf', type: 'pdf', size: '2.5 MB', date: '2026-02-15', description: 'Research on how advisors add value through behavioral coaching, asset allocation, and tax management.' },
        ]
      },
      {
        name: 'Model Portfolios',
        type: 'folder',
        children: [
          { name: 'Conservative Model.xlsx', type: 'sheet', size: '450 KB', date: '2026-03-31', description: 'Conservative model portfolio allocation (30/70 equity-bond) with historical performance and risk analysis.' },
          { name: 'Moderate Model.xlsx', type: 'sheet', size: '460 KB', date: '2026-03-31', description: 'Moderate model portfolio (60/40) with rebalancing methodology and tax-loss harvesting schedule.' },
          { name: 'Aggressive Model.xlsx', type: 'sheet', size: '470 KB', date: '2026-03-31', description: 'Growth-oriented model portfolio (80/20) with factor tilt analysis and performance benchmarking.' },
        ]
      }
    ]
  },
  'pimco': {
    name: 'PIMCO',
    children: [
      {
        name: 'Fixed Income Research',
        type: 'folder',
        children: [
          { name: 'Cyclical Outlook Q2 2026.pdf', type: 'pdf', size: '3.2 MB', date: '2026-03-25', description: 'PIMCO cyclical outlook analyzing interest rate trajectory, credit conditions, and macro positioning for the next 6-12 months.' },
          { name: 'Secular Outlook - The Aftershock.pdf', type: 'pdf', size: '4.8 MB', date: '2026-01-10', description: 'Long-term secular outlook examining structural shifts in inflation, monetary policy, and global bond markets.' },
          { name: 'Credit Market Monitor.pdf', type: 'pdf', size: '1.9 MB', date: '2026-03-28', description: 'Weekly credit market analysis covering IG/HY spreads, default rates, new issuance, and relative value opportunities.' },
        ]
      },
      {
        name: 'Fund Materials',
        type: 'folder',
        children: [
          { name: 'Income Fund Factsheet.pdf', type: 'pdf', size: '2.0 MB', date: '2026-03-15', description: 'Monthly factsheet for the PIMCO Income Fund with yield, duration, and sector allocation detail.' },
          { name: 'Total Return Fund.pdf', type: 'pdf', size: '1.8 MB', date: '2026-03-15', description: 'Flagship Total Return Fund factsheet with performance history and portfolio characteristics.' },
        ]
      },
      {
        name: 'Economic Data',
        type: 'folder',
        children: [
          { name: 'Macro Dashboard Q1 2026.xlsx', type: 'sheet', size: '2.1 MB', date: '2026-03-31', description: 'Comprehensive economic data dashboard with GDP, inflation, employment, and leading indicator tracking.' },
          { name: 'Yield Curve Analysis.xlsx', type: 'sheet', size: '1.4 MB', date: '2026-03-28', description: 'Real-time yield curve data with historical comparison, term premium decomposition, and scenario analysis.' },
        ]
      }
    ]
  },
  'bridgewater': {
    name: 'Bridgewater',
    children: [
      {
        name: 'Daily Observations',
        type: 'folder',
        children: [
          { name: 'Daily Observations - Mar 28.pdf', type: 'pdf', size: '1.1 MB', date: '2026-03-28', description: 'Daily market analysis covering global macro themes, asset class moves, and positioning signals.' },
          { name: 'Daily Observations - Mar 27.pdf', type: 'pdf', size: '1.0 MB', date: '2026-03-27', description: 'Daily macro commentary focused on China credit impulse data and implications for EM assets.' },
        ]
      },
      {
        name: 'Strategy Papers',
        type: 'folder',
        children: [
          { name: 'All Weather Strategy.pdf', type: 'pdf', size: '5.2 MB', date: '2026-02-01', description: 'Detailed explanation of Bridgewater\'s All Weather strategy including risk parity methodology and historical drawdown analysis.' },
          { name: 'Pure Alpha Overview.pdf', type: 'pdf', size: '4.1 MB', date: '2026-01-15', description: 'Pure Alpha fund overview with strategy description, return drivers, and correlation analysis.' },
        ]
      },
      {
        name: 'Economic Research',
        type: 'folder',
        children: [
          { name: 'Debt Cycle Framework.pdf', type: 'pdf', size: '8.3 MB', date: '2025-12-01', description: 'Research paper on long-term and short-term debt cycles with current positioning in the cycle framework.' },
          { name: 'China Economic Monitor.xlsx', type: 'sheet', size: '3.2 MB', date: '2026-03-25', description: 'Proprietary China economic tracking dashboard with credit, property, and trade indicators.' },
        ]
      }
    ]
  },
};

// Generate default data rooms for managers without specific content
MANAGERS.forEach(m => {
  if (!DATA_ROOM_FILES[m.id]) {
    DATA_ROOM_FILES[m.id] = {
      name: m.name,
      children: [
        {
          name: 'Fund Factsheets',
          type: 'folder',
          children: [
            { name: `${m.name} Core Fund.pdf`, type: 'pdf', size: '1.8 MB', date: '2026-03-15', description: `Monthly factsheet for the ${m.name} Core Fund including performance, top holdings, and portfolio characteristics.` },
            { name: `${m.name} Growth Fund.pdf`, type: 'pdf', size: '2.0 MB', date: '2026-03-15', description: `Quarterly factsheet for the ${m.name} Growth Fund with benchmark comparison and sector analysis.` },
          ]
        },
        {
          name: 'Research',
          type: 'folder',
          children: [
            { name: 'Market Outlook Q2 2026.pdf', type: 'pdf', size: '3.1 MB', date: '2026-03-20', description: `${m.name} market outlook covering macro themes, asset class positioning, and risk assessment for Q2 2026.` },
            { name: 'Investment Strategy Update.pdf', type: 'pdf', size: '2.4 MB', date: '2026-03-10', description: `Monthly investment strategy update with portfolio adjustments and trade rationale.` },
          ]
        },
        {
          name: 'Performance',
          type: 'folder',
          children: [
            { name: 'Q1 2026 Performance.xlsx', type: 'sheet', size: '1.0 MB', date: '2026-03-31', description: `Quarterly performance summary across all ${m.name} strategies with benchmark comparisons.` },
          ]
        },
        {
          name: 'Compliance',
          type: 'folder',
          children: [
            { name: 'ADV Part 2A.pdf', type: 'pdf', size: '3.0 MB', date: '2026-03-01', description: `Form ADV Part 2A firm brochure with business description, fee schedule, and risk disclosures.` },
          ]
        }
      ]
    };
  }
});
