import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const Privacy = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-muted-foreground mb-12">Last updated: February 24, 2026</p>

            <div className="prose prose-invert max-w-none space-y-8 text-muted-foreground [&_h2]:text-foreground [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:mb-3 [&_h2]:mt-8 [&_strong]:text-foreground">

              <p>This Privacy Policy ("Policy") governs the collection, use, processing, storage, and disclosure of information by AI bloop ("Company," "we," "us," or "our") through our website, applications, services, and any related platforms (collectively, the "Services"). By accessing or using the Services, you ("User," "you," or "your") acknowledge that you have read, understood, and agree to be bound by this Policy in its entirety. If you do not agree, you must immediately discontinue use of the Services.</p>

              <h2>1. Information Collection</h2>
              <p>We may collect information that you voluntarily provide, including but not limited to your name, email address, company name, billing information, and any other data submitted through forms, communications, or account registration. We also automatically collect technical data including, without limitation, IP addresses, browser type, device identifiers, operating system, referring URLs, access timestamps, pages viewed, and interaction patterns through cookies, web beacons, pixels, and analogous tracking technologies. <strong>We expressly disclaim any obligation to collect only the minimum data necessary</strong> and reserve the right to collect any information reasonably related to the operation, improvement, or monetization of our Services.</p>

              <h2>2. Use of Information</h2>
              <p>Information collected may be used for any lawful purpose, including but not limited to: (a) providing, maintaining, and improving the Services; (b) processing transactions and sending related communications; (c) sending promotional materials, newsletters, and marketing communications; (d) conducting analytics, research, and product development; (e) detecting, preventing, and addressing fraud, security breaches, or technical issues; (f) complying with legal obligations and enforcing our rights; and (g) any other purpose disclosed at the time of collection or to which you subsequently consent. We reserve the unilateral right to modify the purposes for which data is used without prior notice, to the fullest extent permitted by applicable law.</p>

              <h2>3. Data Sharing and Disclosure</h2>
              <p>We may share your information with third-party service providers, business partners, affiliates, subsidiaries, and successors-in-interest who assist in operating, analyzing, or improving our Services. We may also disclose information: (a) in response to lawful requests by public authorities, including to meet national security or law enforcement requirements; (b) to protect our rights, property, or safety, or that of our users or the public; (c) in connection with any merger, acquisition, reorganization, asset sale, or bankruptcy proceeding; or (d) with your consent. <strong>We shall bear no liability for the privacy practices of any third party to whom data is disclosed.</strong></p>

              <h2>4. Data Retention</h2>
              <p>We retain personal information for as long as reasonably necessary to fulfill the purposes for which it was collected, comply with our legal and contractual obligations, resolve disputes, and enforce our agreements. Upon termination of your account, we reserve the right to retain de-identified, aggregated, or anonymized data indefinitely without restriction. <strong>We disclaim any obligation to delete data upon request except where expressly required by mandatory applicable law.</strong></p>

              <h2>5. Cookies and Tracking Technologies</h2>
              <p>The Services employ cookies, local storage objects, web beacons, and similar technologies for functional, analytical, and advertising purposes. By continuing to use the Services, you consent to the deployment of such technologies on your device. You may configure your browser settings to reject cookies; however, doing so may impair the functionality and accessibility of certain features of the Services, for which we bear no responsibility.</p>

              <h2>6. Security</h2>
              <p>We implement commercially reasonable administrative, technical, and physical safeguards designed to protect information against unauthorized access, alteration, disclosure, or destruction. <strong>Notwithstanding the foregoing, no method of electronic transmission or storage is absolutely secure, and we expressly disclaim any warranty, guarantee, or representation that your information will remain inviolate.</strong> You acknowledge and accept the inherent risks of transmitting information over the internet and agree that we shall not be liable for any unauthorized access, data breach, or security incident except to the extent directly caused by our gross negligence or willful misconduct.</p>

              <h2>7. Children's Privacy</h2>
              <p>The Services are not directed to individuals under the age of 18. We do not knowingly collect personal information from minors. If we become aware that a minor has provided personal information without verifiable parental consent, we will take commercially reasonable steps to delete such information.</p>

              <h2>8. International Data Transfers</h2>
              <p>Your information may be transferred to, stored, and processed in jurisdictions other than your country of residence, including jurisdictions that may not provide equivalent data protection standards. By using the Services, you expressly consent to such transfers. <strong>We disclaim all liability arising from or related to the data protection laws or practices of any foreign jurisdiction.</strong></p>

              <h2>9. Your Rights</h2>
              <p>Depending on your jurisdiction, you may have certain rights regarding your personal information, including the right to access, rectify, delete, restrict processing, or port your data. To exercise such rights, contact us at the address below. We reserve the right to verify your identity before processing any request and may charge a reasonable fee for manifestly unfounded or excessive requests. <strong>We shall respond to verified requests within the timeframes required by applicable law, but disclaim liability for any delay caused by factors beyond our reasonable control.</strong></p>

              <h2>10. Modifications</h2>
              <p>We reserve the right to amend, modify, or replace this Policy at any time, in our sole and absolute discretion. Changes become effective immediately upon posting to the Services. Your continued use of the Services following any modification constitutes your binding acceptance of the revised Policy. It is your sole responsibility to review this Policy periodically.</p>

              <h2>11. Limitation of Liability</h2>
              <p><strong>TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL THE COMPANY, ITS OFFICERS, DIRECTORS, EMPLOYEES, AGENTS, AFFILIATES, OR LICENSORS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, PUNITIVE, OR EXEMPLARY DAMAGES ARISING OUT OF OR RELATING TO THIS POLICY OR ANY BREACH THEREOF, INCLUDING BUT NOT LIMITED TO DAMAGES FOR LOSS OF DATA, LOSS OF PROFITS, BUSINESS INTERRUPTION, OR ANY OTHER COMMERCIAL DAMAGES OR LOSSES, REGARDLESS OF THE THEORY OF LIABILITY AND EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. OUR AGGREGATE LIABILITY SHALL NOT EXCEED THE GREATER OF FIFTY U.S. DOLLARS (USD $50.00) OR THE AMOUNTS PAID BY YOU TO THE COMPANY IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM.</strong></p>

              <h2>12. Contact</h2>
              <p>For inquiries regarding this Policy, please contact us at: <a href="mailto:privacy@aibloop.com" className="text-primary hover:underline">privacy@aibloop.com</a></p>
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default Privacy;
