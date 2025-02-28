<template>
  <div class="body">
    <!-- prettier-ignore -->
    <div class="terms">
        <h1>Terms of Service</h1>
        <h2>1. Introduction</h2>
        <p>Welcome to HARTECHO LLC. By accessing our website, using our services, or purchasing our products (including custom-coded e-commerce store solutions), you agree to be bound by these Terms of Service ("Terms"). If you do not agree with any part of these Terms, please do not use our services or access our website.</p>
        
        <h2>2. Services</h2>
        <p>HARTECHO LLC provides custom-coded e-commerce store solutions, tailored to meet the specific needs of businesses. Our services include designing, developing, and implementing e-commerce platforms, as well as related support and maintenance as outlined in your service agreement or contract. Detailed descriptions of our services are available on our website or upon request.</p>
        
        <h2>3. User Obligations</h2>
        <p>As a user or client of our services, you agree to:</p>
        <ul>
            <li>Provide accurate, complete, and up-to-date information about your business needs and requirements.</li>
            <li>Cooperate fully with our team to ensure the successful delivery of our services.</li>
            <li>Use our services in accordance with all applicable laws and regulations.</li>
            <li>Not misuse our services, interfere with their operation, or attempt to access them in unauthorized ways.</li>
        </ul>
        
        <h2>4. Payment Terms</h2>
        <p>Payment terms will be outlined in individual service agreements, contracts, or invoices. All payments are due as per the agreed-upon schedule. Late payments may result in a suspension of services, and you may be subject to late fees or other penalties as specified in your agreement. We accept payments via the methods outlined in your contract or on our website.</p>
        
        <h2>5. Intellectual Property Rights</h2>
        <p>All materials, designs, code, and intellectual property produced by HARTECHO LLC in connection with our services remain our property until full payment is received. Upon full payment, you will receive a limited, non-exclusive, non-transferable license to use the deliverables for your e-commerce store, as specified in your service agreement. Failure to pay for services will result in the revocation of access to materials and intellectual property, and we reserve the right to disable or remove any delivered solutions until payment is made in full.</p>
        
        <h2>6. Confidentiality</h2>
        <p>HARTECHO LLC respects the privacy of its clients and will maintain the confidentiality of any information disclosed during the course of service, except as required by law or with your explicit consent. This includes business data, project details, and personal information, which will be handled in accordance with our Privacy Policy.</p>
        
        <h2>7. Limitation of Liability</h2>
        <p>HARTECHO LLC shall not be liable for any indirect, special, incidental, consequential, or punitive damages arising out of or related to the use of our services, including but not limited to loss of profits, revenue, or data. Our total liability for any claim shall not exceed the amount paid by you for the services giving rise to the claim, unless otherwise required by law.</p>
        
        <h2>8. Termination</h2>
        <p>Either party may terminate our services with written notice, subject to the terms of your individual service agreement or contract. In the event of termination by you, you are obligated to pay for all services rendered and expenses incurred up to the date of termination. If we terminate the services due to your breach of these Terms, you may also be responsible for additional fees or damages as outlined in your agreement. Upon termination, we may disable access to any deliverables or materials until all obligations are fulfilled.</p>
        
        <h2>9. Governing Law and Dispute Resolution</h2>
        <p>These Terms shall be governed by and construed in accordance with the laws of the State of Utah, without regard to its conflict of law provisions. Any disputes arising from or related to these Terms or our services shall be resolved through mediation or, if necessary, binding arbitration in Utah, unless otherwise required by law. You agree to waive any right to a jury trial in connection with any such disputes.</p>
        
        <h2>10. Amendments to Terms</h2>
        <p>HARTECHO LLC reserves the right to modify these Terms at any time. We will notify you of any significant changes via email, on our website, or through other communication methods. Your continued use of our services after such changes constitutes your acceptance of the new Terms. If you do not agree with the updated Terms, you may terminate your use of our services.</p>
        
        <h2>11. Contact Information</h2>
        <p>For any questions, concerns, or to report issues regarding these Terms, please contact us at sales@hartecho.com or +1-801-793-5456.</p>
    </div>
  </div>
</template>

<script setup>
useSeoMeta({
  title: "Terms of Service || HARTECHO",
  ogTitle: "Terms of Service || HARTECHO",
  description:
    "Read HARTECHO's Terms of Service to understand the rules, conditions, and responsibilities for using our website and custom-coded e-commerce store services.",
  ogDescription:
    "Read HARTECHO's Terms of Service to understand the rules, conditions, and responsibilities for using our website and custom-coded e-commerce store services.",
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
          "HARTECHO's Terms of Service outline the rules and conditions for using our website and custom-coded e-commerce store services, ensuring clarity and transparency for all users.",
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
            "Review the rules, conditions, and responsibilities for using HARTECHO's website and custom-coded e-commerce store services.",
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