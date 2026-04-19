
interface SaaSMetrics {
  monthlyRevenue: number;
  activeUsers: number;
  newSignups: number;
  churnRate: number;
}

/**
 * Generates a random value between a min and max range.
 */
function getRandomValue(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Generates sample SaaS metrics data.
 */
function generateSampleMetrics(): SaaSMetrics {
  return {
    monthlyRevenue: getRandomValue(10000, 50000),
    activeUsers: getRandomValue(1000, 5000),
    newSignups: getRandomValue(100, 500),
    churnRate: parseFloat((Math.random() * (5 - 1) + 1).toFixed(2)), // Random churn rate between 1% and 5%
  };
}

// Generate data for the last 6 months
function generateDashboardData(months: number = 6) {
  const data = [];
  const now = new Date();

  for (let i = months - 1; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    data.push({
      month: date.toLocaleString('default', { month: 'long', year: 'numeric' }),
      metrics: generateSampleMetrics(),
    });
  }

  return data;
}

const dashboardData = generateDashboardData();
console.log("--- SaaS Dashboard Sample Metrics ---");
console.table(dashboardData);
