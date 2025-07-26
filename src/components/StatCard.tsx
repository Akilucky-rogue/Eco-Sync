import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    label: string;
    direction: 'up' | 'down';
  };
  variant?: 'default' | 'success' | 'warning' | 'error';
  className?: string;
}

const StatCard = ({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  trend, 
  variant = 'default',
  className = "" 
}: StatCardProps) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'success':
        return 'border-brand-green/20 bg-gradient-to-br from-brand-green/5 to-brand-green/10';
      case 'warning':
        return 'border-brand-accent/20 bg-gradient-to-br from-brand-accent/5 to-brand-accent/10';
      case 'error':
        return 'border-red-200 bg-gradient-to-br from-red-50 to-red-100';
      default:
        return 'border-brand-primary/20 bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5';
    }
  };

  const getIconColor = () => {
    switch (variant) {
      case 'success':
        return 'text-brand-green';
      case 'warning':
        return 'text-brand-accent';
      case 'error':
        return 'text-red-500';
      default:
        return 'text-brand-primary';
    }
  };

  return (
    <Card className={`${getVariantStyles()} hover:shadow-lg transition-all duration-300 ${className}`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="flex items-baseline space-x-2">
              <h3 className="text-2xl font-bold text-foreground">{value}</h3>
              {subtitle && (
                <span className="text-sm text-muted-foreground">{subtitle}</span>
              )}
            </div>
            {trend && (
              <div className="flex items-center space-x-1">
                {trend.direction === 'up' ? (
                  <TrendingUp className="h-4 w-4 text-brand-green" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-500" />
                )}
                <span className={`text-sm font-medium ${
                  trend.direction === 'up' ? 'text-brand-green' : 'text-red-500'
                }`}>
                  {trend.value}%
                </span>
                <span className="text-sm text-muted-foreground">{trend.label}</span>
              </div>
            )}
          </div>
          <div className={`p-3 rounded-lg bg-background/50 ${getIconColor()}`}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;