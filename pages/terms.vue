<template>
  <div class="body">
    <!-- prettier-ignore -->
    <div class="terms">
        <h1>Terms of Service</h1>
        <h2>1. Introduction</h2>
        <p>Welcome to HARTECHO LLC. By accessing our website, services, or products, you agree to be bound by these Terms of Service ("Terms"). If you do not agree with any part of these Terms, please do not use our services.</p>
        <h2>2. Services</h2>
        <p>HARTECHO LLC provides website design, Facebook/Google advertising, and branding services. Detailed descriptions of each service are available upon request or as described on our website.</p>
        <h2>3. User Obligations</h2>
        <p>As a user of our services, you agree to provide accurate and complete information about your business needs and cooperate fully with our team to achieve the desired results.</p>
        <h2>4. Payment Terms</h2>
        <p>Payment terms will be outlined in individual service agreements or contracts. All payments are due as per the agreed-upon schedule. Late payments may result in a suspension of services.</p>
        <h2>5. Intellectual Property Rights</h2>
        <p>All materials and intellectual property produced by HARTECHO, including but not limited to graphics, text, and website code remain the property of HARTECHO. Failure to pay for the provided services will result in full revokation of materials and intellectual property.</p>
        <h2>6. Confidentiality</h2>
        <p>HARTECHO respects the privacy of its clients and will maintain the confidentiality of any information disclosed during the course of service.</p>
        <h2>7. Limitation of Liability</h2>
        <p>HARTECHO is not liable for any indirect, special, incidental, or consequential damages arising out of the use or inability to use our services.</p>
        <h2>8. Termination</h2>
        <p>Services can be terminated by either party with written notice. In the event of termination, clients are obligated to pay for all services rendered up to the date of termination. Specifics for termination are outlined in individual client agreements.</p>
        <h2>9. Governing Law</h2>
        <p>These Terms shall be governed in accordance with the laws of Utah, without regard to its conflict of law provisions.</p>
        <h2>10. Amendments to Terms</h2>
        <p>HARTECHO reserves the right to modify these Terms at any time. Your continued use of our services after any such changes constitutes your acceptance of the new Terms.</p>
        <h2>11. Contact Information</h2>
        <p>For any questions or concerns about these Terms, please contact us at sales@hartecho.com.</p>
    </div>
    <!-- prettier-ignore -->
    <section class="quote-form-section">
      <WebSectionsQuoteForm backgroundColor="rgba(0,0,0,0.1)"/>
    </section>
  </div>
</template>

<script setup>
useSeoMeta({
  title: "Terms of Service || HARTECHO",
  ogTitle: "Terms of Service || HARTECHO",
  description:
    "Read HARTECHO's Terms of Service to understand the rules, conditions, and responsibilities for using our website and services.",
  ogDescription:
    "Read HARTECHO's Terms of Service to understand the rules, conditions, and responsibilities for using our website and services.",
  ogImage: "/HARTECHOLogo.webp",
  twitterCard: "/HARTECHOLogo.webp",
});

// Structured Data
useHead({
  link: [
    {
      rel: "canonical",
      href: `https://www.hartecho.com/terms`,
    },
  ],
  script: [
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Terms of Service - HARTECHO",
        url: "https://www.hartecho.com/terms",
        description:
          "HARTECHO's Terms of Service outline the rules and conditions for using our website and services, ensuring clarity and transparency for all users.",
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
          "@type": "WebPageElement",
          name: "Terms of Service",
          description:
            "This page provides HARTECHO's Terms of Service, detailing the responsibilities, rules, and conditions for using our services and website.",
        },
        potentialAction: {
          "@type": "ViewAction",
          target: "https://www.hartecho.com/terms",
          name: "View Terms of Service",
          description:
            "Review the rules, conditions, and responsibilities for using HARTECHO's website and services.",
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
              name: "Terms of Service",
              item: "https://www.hartecho.com/terms",
            },
          ],
        },
      }),
    },
  ],
});

const emit = defineEmits(["hide-loading"]);
emit("hide-loading");
</script>

<style scoped>
.body {
  width: 100%;
  min-height: 70rem;
  height: auto;
}

.terms {
  max-width: 1200px;
  margin: 4rem auto;
  width: 100%;
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

h1 {
  font-family: "Poppins";
  font-size: 2rem;
  font-weight: bold;
  font-style: normal !important;
  margin-bottom: 2rem;
}

h2 {
  font-family: "Poppins";
  text-align: left;
  width: 100%;
  font-size: 1.3rem;
  font-weight: bold;
}

p {
  width: 100%;
  font-size: 1.3rem;
  margin-top: 0.5rem;
  margin-bottom: 2rem;
  text-align: left;
}

ul {
  list-style-type: disc;
  padding-left: 3rem;
  margin-bottom: 2rem;
}

li {
  font-size: 1.2rem;
  margin-bottom: 0.75rem;
}
</style>