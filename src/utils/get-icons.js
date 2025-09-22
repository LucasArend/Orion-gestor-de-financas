import {
  CircleDollarSign,
  FileClock,
  HeartHandshake,
  Landmark,
  PiggyBank,
  ShoppingCart,
  TrendingDown,
  TrendingUp,
  Wallet,
} from 'lucide-react';

const iconMap = {
  circleDollarSign: CircleDollarSign,
  shoppingCart: ShoppingCart,
  fileClock: FileClock,
  piggyBank: PiggyBank,
  wallet: Wallet,
  trendingUp: TrendingUp,
  trendingDown: TrendingDown,
  heartHandshake: HeartHandshake,
};

export function getIcons(title) {
  return iconMap[title] ?? Landmark;
}
