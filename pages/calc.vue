<template>
  <div class="roi-calculator-container">
    <!-- Header / Hero Section -->
    <header class="hero">
      <NuxtImg src="/HARTECHOLogo.webp" alt="HARTECHO Logo" class="logo" />
      <h1>Custom E-Commerce Store ROI Calculator</h1>
      <p class="tagline">
        Trusted, Data-Driven Estimates Based on Research from Google, Akamai,
        Forrester, and eConsultancy
      </p>
    </header>

    <!-- Main Calculator Card -->
    <div class="calculator-card">
      <div class="input-section">
        <h2>Enter Your Store Metrics</h2>
        <div class="input-group">
          <label for="mobileFCP">Mobile First Contentful Paint (sec):</label>
          <input
            id="mobileFCP"
            type="number"
            v-model.number="mobileFCP"
            step="0.1"
            placeholder="e.g., 3.5"
          />
          <small class="description">
            Time until first content is rendered on mobile devices.
          </small>
        </div>
        <div class="input-group">
          <label for="mobileLCP">Mobile Largest Contentful Paint (sec):</label>
          <input
            id="mobileLCP"
            type="number"
            v-model.number="mobileLCP"
            step="0.1"
            placeholder="e.g., 4.8"
          />
          <small class="description">
            Time until the largest element is rendered on mobile.
          </small>
        </div>
        <div class="input-group">
          <label for="desktopFCP">Desktop First Contentful Paint (sec):</label>
          <input
            id="desktopFCP"
            type="number"
            v-model.number="desktopFCP"
            step="0.1"
            placeholder="e.g., 1.2"
          />
          <small class="description">
            Time until first content is rendered on desktop devices.
          </small>
        </div>
        <div class="input-group">
          <label for="desktopLCP"
            >Desktop Largest Contentful Paint (sec):</label
          >
          <input
            id="desktopLCP"
            type="number"
            v-model.number="desktopLCP"
            step="0.1"
            placeholder="e.g., 2.5"
          />
          <small class="description">
            Time until the largest element is rendered on desktop.
          </small>
        </div>
        <div class="input-group">
          <label for="revenue">Current Annual Revenue ($):</label>
          <input
            id="revenue"
            type="number"
            v-model.number="currentRevenue"
            placeholder="e.g., 500000"
          />
          <small class="description">
            This is your total revenue for the past year.
          </small>
        </div>
        <div class="input-group">
          <label for="ongoing">Monthly Ongoing Costs ($):</label>
          <input
            id="ongoing"
            type="number"
            v-model.number="ongoingCosts"
            placeholder="e.g., 500"
          />
          <small class="description">
            Recurring monthly costs (hosting, APIs, etc.) to be subtracted.
          </small>
        </div>
      </div>

      <div v-if="resultsReady" class="results-section">
        <h2>Estimated Results</h2>
        <div class="result-item">
          <strong>Projected Annual Revenue Increase:</strong>
          <span>{{ formatCurrency(annualRevenueIncrease) }}</span>
        </div>
        <div class="result-item">
          <strong>Net Annual Revenue Increase (after ongoing costs):</strong>
          <span>{{ formatCurrency(netAnnualRevenueIncrease) }}</span>
        </div>
        <div class="result-item">
          <strong>Estimated Payback Period:</strong>
          <span v-if="netAnnualRevenueIncrease > 0">
            {{ paybackPeriodMonths }} months
          </span>
          <span v-else>
            Not applicable (Net Revenue Increase is below ongoing costs)
          </span>
        </div>
      </div>
    </div>

    <!-- Full-Width Calculation Details, Methodology & Sources Section -->
    <section class="calculation-details">
      <h2>Calculation Details, Methodology & Sources</h2>
      <p>
        <strong>Speed Metrics:</strong> We use Google Lighthouse metrics,
        including <em>First Contentful Paint (FCP)</em> and
        <em>Largest Contentful Paint (LCP)</em> for both mobile and desktop.
        Ideal targets are set to <em>1.0 second for FCP</em> and
        <em>2.5 seconds for LCP</em>. Research shows that faster FCP/LCP results
        in higher conversion rates.
      </p>
      <p>
        <strong>Speed Conversion Lift:</strong> Based on studies, a full
        improvement in speed can boost conversions by up to <em>30%</em>. We
        weight mobile and desktop contributions (mobile ~55%, desktop ~45%).
      </p>
      <p>
        <strong>UI/UX & SEO Impact:</strong> Enhanced UI/UX can add
        approximately <em>15% conversion uplift</em>, while SEO improvements
        drive an estimated <em>10% increase in traffic</em>, compounding overall
        revenue growth.
      </p>
      <p>
        <strong>Net Revenue Increase & Payback Period:</strong> The extra annual
        revenue is calculated by applying these multipliers to your current
        revenue, then subtracting annualized ongoing costs. The payback period
        divides the $68,000 investment by the net annual revenue increase and
        converts the result to months.
      </p>
      <p class="disclaimer">
        <strong>Disclaimer:</strong> Estimates are based on data from reputable
        sources such as Google, Akamai, Forrester, and eConsultancy. Actual
        results may vary depending on your current performance, market
        conditions, and implementation quality.
      </p>
      <div class="sources">
        <h3>Sources</h3>
        <ul>
          <li>
            <a
              href="https://scoop.market.us/cro-statistics/#:~:text=%2A%20A%20one,for%20websites%20without"
              target="_blank"
              >CRO Statistics 2025 By Best Conversion, Growth, Rate</a
            >
          </li>
          <li>
            <a
              href="https://www.digitalsilk.com/digital-trends/website-speed-statistics/#:~:text=4.%2053,wouldn%E2%80%99t%20wait%20over%205%20seconds"
              target="_blank"
              >Top 40 Website Speed Statistics</a
            >
          </li>
          <li>
            <a
              href="https://blog.hubspot.com/marketing/page-load-time-conversion-rates#:~:text=Vodafone%20recently%20conducted%20an%20A%2FB,more%20sales"
              target="_blank"
              >11 Website Page Load Time Statistics [+ How to Increase
              Conversion Rate]</a
            >
          </li>
          <li>
            <a
              href="https://www.conductor.com/academy/page-speed-resources/"
              target="_blank"
              >Why Page Speed Matters: 10 Case Studies Show How</a
            >
          </li>
          <li>
            <a
              href="https://wp-rocket.me/blog/website-load-time-speed-statistics/#:~:text=4,in%205%20seconds%20or%20less"
              target="_blank"
              >Website Load Time & Speed Statistics: Is Your Site Fast
              Enough?</a
            >
          </li>
          <li>
            <a
              href="https://uxcam.com/blog/ux-statistics/#:~:text=What%E2%80%99s%20the%20ROI%20of%20UX%3F"
              target="_blank"
              >50+ Powerful UX Statistics To Impress Stakeholders 2025</a
            >
          </li>
          <li>
            <a
              href="https://www.usertesting.com/forrester-total-economic-impact-usertesting-form#:~:text=Forrester%E2%80%99s%20analysis%20showed%20that%20a,Human%20Insight%20Platform%20would%20achieve"
              target="_blank"
              >Forrester Study - The Total Economic Impact™ of the UserTesting
              Human Insight Platform</a
            >
          </li>
          <li>
            <a
              href="https://rocketagency.com.au/case-studies/bio-molecular-systems#:~:text=,within%20their%20target%20audience%20globally"
              target="_blank"
              >How BMS Increased Web Traffic Exponentially Using Search</a
            >
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useHead, useSeoMeta } from "#imports";

// User Inputs
const mobileFCP = ref(0);
const mobileLCP = ref(0);
const desktopFCP = ref(0);
const desktopLCP = ref(0);
const currentRevenue = ref(0); // Annual revenue
const ongoingCosts = ref(500); // Monthly ongoing costs

// Benchmarks for performance metrics
const targetFCP = 1.0;
const targetLCP = 2.5;

// Check if all inputs are provided
const resultsReady = computed(() => {
  return (
    mobileFCP.value > 0 &&
    mobileLCP.value > 0 &&
    desktopFCP.value > 0 &&
    desktopLCP.value > 0 &&
    currentRevenue.value > 0
  );
});

// Helper function to calculate improvement fraction
function improvementFraction(input, target) {
  return input > target ? (input - target) / input : 0;
}

// Calculate improvement fractions for each metric
const mobileFCPimp = computed(() =>
  improvementFraction(mobileFCP.value, targetFCP)
);
const mobileLCPimp = computed(() =>
  improvementFraction(mobileLCP.value, targetLCP)
);
const desktopFCPimp = computed(() =>
  improvementFraction(desktopFCP.value, targetFCP)
);
const desktopLCPimp = computed(() =>
  improvementFraction(desktopLCP.value, targetLCP)
);

// Weights: Mobile (55%) and Desktop (45%)
const mobileWeight = 0.55;
const desktopWeight = 0.45;

// Conversion lift from speed improvements (max 30% boost if fully optimized)
const mobileSpeedLift = computed(
  () => ((mobileFCPimp.value + mobileLCPimp.value) / 2) * 0.3
);
const desktopSpeedLift = computed(
  () => ((desktopFCPimp.value + desktopLCPimp.value) / 2) * 0.3
);
const speedConvLift = computed(
  () =>
    mobileSpeedLift.value * mobileWeight +
    desktopSpeedLift.value * desktopWeight
);

// Additional multipliers from UX and SEO
const uxConversionLift = 0.15; // 15% conversion increase from better UI/UX
const seoTrafficLift = 0.1; // 10% traffic increase from improved SEO

// Total revenue multiplier
const totalMultiplier = computed(() => {
  return (
    (1 + speedConvLift.value) * (1 + uxConversionLift) * (1 + seoTrafficLift)
  );
});

// Calculate new annual revenue and extra revenue gained
const newAnnualRevenue = computed(
  () => currentRevenue.value * totalMultiplier.value
);
const annualRevenueIncrease = computed(
  () => newAnnualRevenue.value - currentRevenue.value
);

// Subtract annualized ongoing costs from extra revenue
const annualOngoingCosts = computed(() => ongoingCosts.value * 12);
const netAnnualRevenueIncrease = computed(
  () => annualRevenueIncrease.value - annualOngoingCosts.value
);

// Payback period in months (if net gain is positive)
const paybackPeriodMonths = computed(() => {
  if (netAnnualRevenueIncrease.value <= 0) return "N/A";
  const yearsToPayback = 68000 / netAnnualRevenueIncrease.value;
  return Math.ceil(yearsToPayback * 12);
});

// Utility to format numbers as currency
function formatCurrency(value) {
  if (isNaN(value)) return "$0";
  return `$${value.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
}

// SEO & Head meta configuration
useSeoMeta({
  title: "E-Commerce Revenue Calculator || HARTECHO",
  description:
    "Estimate the ROI for a custom-coded e-commerce store using the latest Google Lighthouse metrics (FCP, LCP) and research from Google, Akamai, Forrester, and eConsultancy.",
  ogTitle: "E-Commerce Revenue Calculator || HARTECHO",
  ogDescription:
    "Discover how faster site speed, improved UI/UX, and better SEO can boost your e-commerce revenue and shorten the payback period for your custom-coded store.",
  ogImage: "https://hartecho.com/HARTECHOLogo.webp",
  ogUrl: "https://hartecho.com/calc",
  ogType: "website",
  twitterTitle: "E-Commerce Revenue Calculator || HARTECHO",
  twitterDescription:
    "See how improvements in site speed, UX, and SEO can increase your e-commerce revenue. Use our calculator to estimate your ROI.",
  twitterImage: "https://hartecho.com/HARTECHOLogo.webp",
  twitterCard: "summary_large_image",
  pinterestRichPin: "true",
});

useHead({
  link: [{ rel: "canonical", href: "https://www.hartecho.com/calc" }],
  script: [
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "E-Commerce Revenue Calculator || HARTECHO",
        url: "https://www.hartecho.com/calc",
        description:
          "Estimate your potential revenue gains by improving your website’s speed, UX, and SEO using our ROI calculator, based on the latest research.",
        publisher: {
          "@type": "Organization",
          name: "HARTECHO",
          url: "https://www.hartecho.com",
          logo: {
            "@type": "ImageObject",
            url: "https://www.hartecho.com/HARTECHOLogo.webp",
            width: 500,
            height: 500,
          },
          contactPoint: {
            "@type": "ContactPoint",
            telephone: "+1-801-793-5456",
            contactType: "Customer Service",
            areaServed: "US",
            availableLanguage: ["English"],
          },
        },
        mainEntity: {
          "@type": "FinancialProduct",
          name: "E-Commerce ROI Calculator",
          description:
            "Calculate the ROI of a custom-coded e-commerce store by inputting your current performance metrics and revenue. Leverage data from Google, Akamai, Forrester, and eConsultancy.",
          provider: { "@type": "Organization", name: "HARTECHO" },
          audience: {
            "@type": "BusinessAudience",
            name: "E-Commerce Business Owners",
          },
          areaServed: "Global",
          category: "Business Services",
          serviceType: "E-Commerce Optimization & Performance Analysis",
        },
        potentialAction: {
          "@type": "Action",
          target: "https://www.hartecho.com/calc",
          name: "Calculate Your E-Commerce ROI",
          description:
            "Enter your current metrics to see how a faster, custom-coded e-commerce store could boost your revenue.",
        },
        image: ["https://www.hartecho.com/HARTECHOLogo.webp"],
        about: {
          "@type": "Thing",
          name: [
            "E-Commerce Performance Optimization",
            "SEO-Optimized E-Commerce",
            "Revenue Growth from Page Speed Improvements",
            "Conversion Rate Optimization",
          ],
        },
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: "https://www.hartecho.com",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "ROI Calculator",
              item: "https://www.hartecho.com/calc",
            },
          ],
        },
      }),
    },
  ],
});
</script>

<style scoped>
/* CSS Variables for consistent color palette */
:root {
  --primary-color: #2c74b3;
  --secondary-color: #555;
  --background-light: #f8f8f8;
  --card-background: #fff;
  --details-background: #f1f1f1;
  --accent-color: #007bff;
  --font-family: "Source Sans Pro", "Helvetica Neue", Arial, sans-serif;
}

.roi-calculator-container {
  width: 100%;
  max-width: 1200px;
  margin: 5rem auto;
  padding: 1em;
  font-family: var(--font-family);
  color: var(--secondary-color);
}

/* Hero Section */
.hero {
  text-align: center;
  padding: 1em 0;
  margin-bottom: 1em;
  background: var(--background-light);
  border-bottom: 2px solid var(--primary-color);
}

.logo {
  height: 5rem;
  width: 5rem;
}

.hero h1 {
  color: var(--primary-color);
  margin-bottom: 0.5em;
}

.hero .tagline {
  font-size: 1.1em;
  color: var(--secondary-color);
}

/* Calculator Card */
.calculator-card {
  background: var(--card-background);
  padding: 1.5em;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 2em;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

.input-section h2 {
  text-align: center;
  margin-bottom: 1em;
  color: var(--primary-color);
}

.input-group {
  margin-bottom: 1.2em;
}

.input-group label {
  display: block;
  font-weight: 600;
  margin-bottom: 0.5em;
}

.input-group input {
  width: 100%;
  padding: 0.6em;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.input-group .description {
  font-size: 0.85em;
  color: var(--secondary-color);
  margin-top: 0.3em;
}

/* Results Section */
.results-section {
  background: var(--background-light);
  padding: 1.2em;
  border-radius: 6px;
  margin-top: 1.5em;
}

.results-section h2 {
  text-align: center;
  color: var(--primary-color);
  margin-bottom: 1em;
}

.result-item {
  margin: 0.8em 0;
  font-size: 1em;
  display: flex;
  justify-content: space-between;
}

/* Calculation Details & Sources Section */
.calculation-details {
  width: 100%;
  background: var(--details-background);
  padding: 1.5em;
  box-sizing: border-box;
  margin-top: 2em;
}

.calculation-details h2 {
  text-align: center;
  margin-bottom: 1em;
  color: var(--primary-color);
}

.calculation-details p {
  max-width: 700px;
  margin: 0.8em auto;
  line-height: 1.6;
  font-size: 1em;
}

.disclaimer {
  font-size: 0.9em;
  font-style: italic;
  color: var(--secondary-color);
  text-align: center;
  margin-top: 1.5em;
}

.sources {
  max-width: 700px;
  margin: 1em auto;
  font-size: 0.9em;
}

.sources ul {
  list-style: none;
  padding: 0;
}

.sources li {
  margin: 0.5em 0;
}

.sources a {
  color: var(--accent-color);
  text-decoration: none;
}
.sources a:hover {
  text-decoration: underline;
}
</style>
