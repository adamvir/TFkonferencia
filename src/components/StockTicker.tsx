import { TrendingUp, TrendingDown } from "lucide-react";

interface StockData {
  symbol: string;
  name: string;
  price: string;
  change: string;
  changePercent: string;
  isPositive: boolean;
}

const stockData: StockData[] = [
  { symbol: "BUX", name: "BUX Index", price: "74,256", change: "+425", changePercent: "+0.58%", isPositive: true },
  { symbol: "OTP", name: "OTP Bank", price: "18,740", change: "-120", changePercent: "-0.64%", isPositive: false },
  { symbol: "MOL", name: "MOL Magyar", price: "2,856", change: "+42", changePercent: "+1.49%", isPositive: true },
  { symbol: "MTEL", name: "Magyar Telekom", price: "428", change: "-8", changePercent: "-1.83%", isPositive: false },
  { symbol: "RICHTER", name: "Richter Gedeon", price: "9,240", change: "+180", changePercent: "+1.99%", isPositive: true },
  { symbol: "ZWACK", name: "Zwack Unicum", price: "15,400", change: "-200", changePercent: "-1.28%", isPositive: false },
  { symbol: "AUTOWALLIS", name: "AutoWallis", price: "124", change: "+6", changePercent: "+5.08%", isPositive: true },
  { symbol: "APPENINN", name: "Appeninn", price: "86", change: "-2", changePercent: "-2.27%", isPositive: false },
  { symbol: "EUR/HUF", name: "EUR/HUF", price: "409.85", change: "+1.24", changePercent: "+0.30%", isPositive: false },
  { symbol: "USD/HUF", name: "USD/HUF", price: "395.22", change: "-0.85", changePercent: "-0.21%", isPositive: true },
];

export function StockTicker() {
  return (
    <section className="bg-primary text-primary-foreground py-3 overflow-hidden rounded-lg mx-4">
      <div className="relative">
        {/* Ticker content */}
        <div className="flex animate-scroll whitespace-nowrap">
          {/* First set of stocks */}
          {stockData.map((stock, index) => (
            <div key={`first-${index}`} className="flex items-center space-x-2 mx-8 flex-shrink-0">
              <span className="text-sm opacity-90">{stock.symbol}</span>
              <span className="text-sm">{stock.price}</span>
              <div className={`flex items-center space-x-1 text-xs ${
                stock.isPositive ? 'text-green-400' : 'text-red-400'
              }`}>
                {stock.isPositive ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
                <span>{stock.change}</span>
                <span>({stock.changePercent})</span>
              </div>
            </div>
          ))}
          
          {/* Second set for seamless loop */}
          {stockData.map((stock, index) => (
            <div key={`second-${index}`} className="flex items-center space-x-2 mx-8 flex-shrink-0">
              <span className="text-sm opacity-90">{stock.symbol}</span>
              <span className="text-sm">{stock.price}</span>
              <div className={`flex items-center space-x-1 text-xs ${
                stock.isPositive ? 'text-green-400' : 'text-red-400'
              }`}>
                {stock.isPositive ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
                <span>{stock.change}</span>
                <span>({stock.changePercent})</span>
              </div>
            </div>
          ))}
        </div>
        
        {/* Gradient overlays for smooth edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-primary to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-primary to-transparent pointer-events-none" />
      </div>
    </section>
  );
}