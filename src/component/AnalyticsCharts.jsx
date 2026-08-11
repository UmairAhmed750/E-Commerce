import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TrendingUp,
  BarChart3,
  PieChart,
  ShoppingBag,
  ArrowUpRight,
  DollarSign,
  Calendar,
  Layers,
  Sparkles
} from 'lucide-react';

const AnalyticsCharts = () => {
  const { formatPrice, products } = useContext(ShopContext);

  const [chartType, setChartType] = useState('area'); // 'area' | 'bar'
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Full 12-Month Sales & Revenue Progression Data
  const monthlyData = [
    { month: 'Jan', revenue: 14200, orders: 120, aov: 118, growth: '+12%' },
    { month: 'Feb', revenue: 19800, orders: 155, aov: 127, growth: '+18%' },
    { month: 'Mar', revenue: 24500, orders: 190, aov: 128, growth: '+15%' },
    { month: 'Apr', revenue: 22100, orders: 175, aov: 126, growth: '+8%' },
    { month: 'May', revenue: 31400, orders: 240, aov: 130, growth: '+24%' },
    { month: 'Jun', revenue: 38900, orders: 295, aov: 131, growth: '+31%' },
    { month: 'Jul', revenue: 45200, orders: 340, aov: 132, growth: '+35%' },
    { month: 'Aug', revenue: 52910, orders: 410, aov: 129, growth: '+42%' },
    { month: 'Sep', revenue: 48600, orders: 375, aov: 129, growth: '+38%' },
    { month: 'Oct', revenue: 58400, orders: 445, aov: 131, growth: '+48%' },
    { month: 'Nov', revenue: 64200, orders: 490, aov: 131, growth: '+52%' },
    { month: 'Dec', revenue: 71500, orders: 540, aov: 132, growth: '+60%' },
  ];

  // Category statistics with crash-proof safe array checks
  const safeProducts = Array.isArray(products) ? products : [];
  const menCount = safeProducts.filter((p) => p && p.category === 'Men').length || 18;
  const womenCount = safeProducts.filter((p) => p && p.category === 'Women').length || 24;
  const kidsCount = safeProducts.filter((p) => p && p.category === 'Kids').length || 10;
  const totalCatCount = menCount + womenCount + kidsCount;

  // Chart dimensions & scaling
  const viewBoxWidth = 1000;
  const viewBoxHeight = 260;
  const maxRevenue = 80000;
  const paddingX = 40;
  const usableWidth = viewBoxWidth - paddingX * 2;
  const usableHeight = viewBoxHeight - 50;

  // Generate SVG coordinates spanning full width evenly
  const chartPoints = monthlyData.map((d, index) => {
    const x = paddingX + (index / (monthlyData.length - 1)) * usableWidth;
    const y = usableHeight - (d.revenue / maxRevenue) * usableHeight + 20;
    return { x, y, data: d, index };
  });

  const pathD = `M ${chartPoints.map((p) => `${p.x},${p.y}`).join(' L ')}`;
  const areaD = `M ${chartPoints[0].x},${usableHeight + 20} L ${chartPoints
    .map((p) => `${p.x},${p.y}`)
    .join(' L ')} L ${chartPoints[chartPoints.length - 1].x},${usableHeight + 20} Z`;

  const activePoint = hoveredIndex !== null ? chartPoints[hoveredIndex] : null;

  return (
    <div className="flex flex-col gap-8 mt-6">
      {/* 1. HERO REVENUE GRAPH CARD */}
      <div className="p-6 sm:p-8 rounded-3xl glass-card border border-gray-200/80 dark:border-gray-800/80 bg-white/80 dark:bg-[#0f172a]/90 shadow-2xl relative overflow-hidden">
        {/* Background Ambient Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 dark:bg-orange-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/10 dark:bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Card Header & Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 relative z-10">
          <div>
            <div className="flex items-center gap-3">
              <span className="p-2 rounded-xl bg-orange-500/10 text-orange-600 dark:text-orange-400">
                <Sparkles className="w-5 h-5" />
              </span>
              <h3 className="text-xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                Store Revenue & Growth Analytics
              </h3>
              <span className="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-extrabold text-xs uppercase flex items-center gap-1 border border-emerald-500/30">
                <ArrowUpRight className="w-3.5 h-3.5" /> +42.8% YOY
              </span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 pl-10 font-medium">
              Real-time store performance trajectory & order volumes (12-Month Projection)
            </p>
          </div>

          {/* Chart Type Toggle Switch */}
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-gray-100 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700/80 self-start md:self-auto">
            <button
              onClick={() => setChartType('area')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${chartType === 'area'
                  ? 'bg-orange-500 text-white shadow-md shadow-orange-500/30'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Area Trend</span>
            </button>
            <button
              onClick={() => setChartType('bar')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${chartType === 'bar'
                  ? 'bg-orange-500 text-white shadow-md shadow-orange-500/30'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Volume Bars</span>
            </button>
          </div>
        </div>

        {/* Dynamic Metric Counter Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-gray-50/80 dark:bg-gray-900/60 border border-gray-200/60 dark:border-gray-800/80 mb-6 relative z-10">
          <div>
            <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Total Sales</p>
            <p className="text-lg font-black text-gray-900 dark:text-white mt-0.5">{formatPrice(508510)}</p>
          </div>
          <div>
            <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Avg Monthly</p>
            <p className="text-lg font-black text-orange-600 dark:text-orange-400 mt-0.5">{formatPrice(42375)}</p>
          </div>
          <div>
            <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Peak Month</p>
            <p className="text-lg font-black text-emerald-600 dark:text-emerald-400 mt-0.5">Dec ({formatPrice(71500)})</p>
          </div>
          <div>
            <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Total Orders</p>
            <p className="text-lg font-black text-blue-600 dark:text-blue-400 mt-0.5">3,885 Orders</p>
          </div>
        </div>

        {/* RESPONSIVE SVG CANVAS */}
        <div className="relative w-full overflow-hidden pt-2 pb-2 z-10">
          <div className="w-full relative h-[240px] sm:h-[280px]">
            <svg
              className="w-full h-full overflow-visible"
              viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
              preserveAspectRatio="none"
            >
              <defs>
                {/* Smooth Area Multi-stop Gradient */}
                <linearGradient id="glowAreaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f97316" stopOpacity="0.45" />
                  <stop offset="50%" stopColor="#fb923c" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#f97316" stopOpacity="0.0" />
                </linearGradient>

                {/* Bar Multi-stop Gradient */}
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ea580c" />
                  <stop offset="100%" stopColor="#f97316" />
                </linearGradient>

                {/* Drop shadow filter for line */}
                <filter id="lineGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#ea580c" floodOpacity="0.5" />
                </filter>
              </defs>

              {/* Background Grid Lines */}
              {[0, 0.25, 0.5, 0.75, 1].map((ratio) => (
                <line
                  key={ratio}
                  x1={paddingX}
                  y1={20 + usableHeight * ratio}
                  x2={viewBoxWidth - paddingX}
                  y2={20 + usableHeight * ratio}
                  stroke="currentColor"
                  className="text-gray-200 dark:text-gray-800/80"
                  strokeDasharray="4 4"
                  strokeWidth="1"
                />
              ))}

              {/* AREA CHART MODE */}
              {chartType === 'area' && (
                <>
                  {/* Filled Area */}
                  <motion.path
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    d={areaD}
                    fill="url(#glowAreaGradient)"
                  />

                  {/* Trend Stroke Line */}
                  <motion.path
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    d={pathD}
                    fill="none"
                    stroke="#f97316"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    filter="url(#lineGlow)"
                  />
                </>
              )}

              {/* BAR CHART MODE */}
              {chartType === 'bar' && (
                <g>
                  {chartPoints.map((p) => {
                    const barWidth = 36;
                    const barHeight = usableHeight + 20 - p.y;
                    const isHovered = hoveredIndex === p.index;

                    return (
                      <rect
                        key={p.index}
                        x={p.x - barWidth / 2}
                        y={p.y}
                        width={barWidth}
                        height={barHeight}
                        rx="10"
                        fill="url(#barGradient)"
                        opacity={isHovered ? 1 : 0.85}
                        className="transition-all duration-200 cursor-pointer"
                        onMouseEnter={() => setHoveredIndex(p.index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                      />
                    );
                  })}
                </g>
              )}

              {/* Active Hover Crosshair Line */}
              {activePoint && (
                <line
                  x1={activePoint.x}
                  y1={20}
                  x2={activePoint.x}
                  y2={usableHeight + 20}
                  stroke="#f97316"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                  className="animate-pulse"
                />
              )}

              {/* Data Point Dots & Invisible Touch Anchors */}
              {chartPoints.map((p) => {
                const isHovered = hoveredIndex === p.index;
                return (
                  <g
                    key={p.index}
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredIndex(p.index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    {chartType === 'area' && (
                      <circle
                        cx={p.x}
                        cy={p.y}
                        r={isHovered ? 8 : 5}
                        className={`transition-all duration-200 ${isHovered
                            ? 'fill-orange-500 stroke-white dark:stroke-gray-900 shadow-xl'
                            : 'fill-orange-500 stroke-white dark:stroke-gray-900'
                          }`}
                        strokeWidth={isHovered ? '3' : '2'}
                      />
                    )}
                    {/* Invisible hit box for smooth hovering */}
                    <rect
                      x={p.x - 30}
                      y={0}
                      width={60}
                      height={viewBoxHeight}
                      fill="transparent"
                    />
                  </g>
                );
              })}
            </svg>
          </div>

          {/* X-AXIS MONTH LABELS (Spans 100% width evenly) */}
          <div className="flex justify-between text-xs font-bold text-gray-400 dark:text-gray-500 px-4 mt-2">
            {monthlyData.map((d, idx) => (
              <button
                key={d.month}
                type="button"
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`transition-all duration-200 cursor-pointer ${hoveredIndex === idx
                    ? 'text-orange-600 dark:text-orange-400 scale-125 font-black'
                    : 'hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
              >
                {d.month}
              </button>
            ))}
          </div>

          {/* FLOATING GLASS TOOLTIP CARD */}
          <AnimatePresence>
            {activePoint && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.15 }}
                className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-gray-900/95 dark:bg-white/95 text-white dark:text-gray-900 rounded-2xl p-4 shadow-2xl z-30 backdrop-blur-md border border-white/20 dark:border-gray-800 flex items-center gap-5 min-w-[260px]"
              >
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-orange-400 dark:text-orange-600">
                    {activePoint.data.month} Sales Performance
                  </p>
                  <p className="text-xl font-black mt-0.5">
                    {formatPrice(activePoint.data.revenue)}
                  </p>
                  <span className="text-[10px] font-extrabold text-emerald-400 dark:text-emerald-600">
                    {activePoint.data.growth} growth YoY
                  </span>
                </div>

                <div className="border-l border-gray-700 dark:border-gray-200 pl-4 flex flex-col gap-0.5">
                  <p className="text-[11px] font-semibold text-gray-300 dark:text-gray-700">
                    📦 <span className="font-bold">{activePoint.data.orders} Orders</span>
                  </p>
                  <p className="text-[11px] font-semibold text-gray-300 dark:text-gray-700">
                    💳 Avg Value: <span className="font-bold">${activePoint.data.aov}</span>
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* 2. SECONDARY METRICS & DISTRIBUTION CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Category Revenue Distribution Card */}
        <div className="p-6 rounded-3xl glass-card border border-gray-200/80 dark:border-gray-800/80 bg-white/70 dark:bg-gray-900/70 shadow-lg flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-orange-500" />
              <h4 className="text-sm font-bold text-gray-900 dark:text-white">Category Sales Distribution</h4>
            </div>
            <span className="text-xs text-orange-500 font-bold">Catalog Breakdown</span>
          </div>

          <div className="flex flex-col gap-4 mt-2">
            {[
              { category: 'Women Collection', count: womenCount, percent: Math.round((womenCount / totalCatCount) * 100), color: 'from-orange-500 to-amber-500', rev: 245000 },
              { category: 'Men Collection', count: menCount, percent: Math.round((menCount / totalCatCount) * 100), color: 'from-blue-500 to-cyan-500', rev: 198000 },
              { category: 'Kids Collection', count: kidsCount, percent: Math.round((kidsCount / totalCatCount) * 100), color: 'from-purple-500 to-pink-500', rev: 125910 }
            ].map((cat) => (
              <div key={cat.category} className="flex flex-col gap-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-gray-800 dark:text-gray-200">{cat.category} ({cat.count} items)</span>
                  <span className="text-orange-600 dark:text-orange-400">{formatPrice(cat.rev)}</span>
                </div>
                <div className="w-full h-3 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden shadow-inner">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${cat.percent}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className={`h-full rounded-full bg-gradient-to-r ${cat.color}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Status Fulfillment Metrics Card */}
        <div className="p-6 rounded-3xl glass-card border border-gray-200/80 dark:border-gray-800/80 bg-white/70 dark:bg-gray-900/70 shadow-lg flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <PieChart className="w-5 h-5 text-orange-500" />
              <h4 className="text-sm font-bold text-gray-900 dark:text-white">Order Status & Fulfillment</h4>
            </div>
            <span className="text-xs text-emerald-500 font-bold">Live Status</span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50">
              <p className="text-gray-500 dark:text-gray-400 text-[10px] font-semibold">Delivered Orders</p>
              <p className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">94.2%</p>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">3,660 completed</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/50">
              <p className="text-gray-500 dark:text-gray-400 text-[10px] font-semibold">In Transit / Shipped</p>
              <p className="text-xl font-extrabold text-blue-600 dark:text-blue-400 mt-1">4.1%</p>
              <span className="text-[10px] text-blue-600 dark:text-blue-400 font-medium">160 active</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50">
              <p className="text-gray-500 dark:text-gray-400 text-[10px] font-semibold">Processing & Packed</p>
              <p className="text-xl font-extrabold text-amber-600 dark:text-amber-400 mt-1">1.2%</p>
              <span className="text-[10px] text-amber-600 dark:text-amber-400 font-medium">45 pending</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-900/50">
              <p className="text-gray-500 dark:text-gray-400 text-[10px] font-semibold">New Orders Placed</p>
              <p className="text-xl font-extrabold text-orange-600 dark:text-orange-400 mt-1">0.5%</p>
              <span className="text-[10px] text-orange-600 dark:text-orange-400 font-medium">20 new</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsCharts;
