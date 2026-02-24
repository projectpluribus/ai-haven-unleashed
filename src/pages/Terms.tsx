import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const Terms = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms of Service</h1>
            <p className="text-muted-foreground mb-12">Last updated: February 24, 2026</p>

            <div className="prose prose-invert max-w-none space-y-8 text-muted-foreground [&_h2]:text-foreground [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:mb-3 [&_h2]:mt-8 [&_strong]:text-foreground">

              <p>These Terms of Service ("Terms," "Agreement") constitute a legally binding contract between you ("User," "you," or "your") and AI bloop ("Company," "we," "us," or "our") governing your access to and use of our website, platform, software, AI agents, APIs, and all related services (collectively, the "Services"). BY ACCESSING OR USING THE SERVICES, YOU REPRESENT AND WARRANT THAT YOU HAVE THE LEGAL CAPACITY TO ENTER INTO THIS AGREEMENT AND AGREE TO BE BOUND BY THESE TERMS. IF YOU DO NOT AGREE, YOU MUST IMMEDIATELY CEASE ALL USE OF THE SERVICES.</p>

              <h2>1. Acceptance and Modifications</h2>
              <p>Your use of the Services constitutes irrevocable acceptance of these Terms. We reserve the sole and absolute right to modify, amend, supplement, or replace these Terms at any time without prior notice. All modifications become effective immediately upon posting. Your continued use following any changes constitutes your unconditional acceptance. You bear sole responsibility for reviewing these Terms periodically. We expressly disclaim any obligation to notify you of changes beyond posting the revised Terms on our website.</p>

              <h2>2. Description of Services</h2>
              <p>The Company provides AI-powered agent solutions, chatbot platforms, automation tools, and related technology services. The Services are provided on an "as is" and "as available" basis. <strong>We make no representation, warranty, or guarantee that the Services will be uninterrupted, error-free, secure, accurate, reliable, or fit for any particular purpose.</strong> Features, functionality, and availability are subject to change, suspension, or discontinuation at any time without notice or liability.</p>

              <h2>3. User Accounts and Obligations</h2>
              <p>You agree to: (a) provide accurate, current, and complete registration information; (b) maintain the confidentiality of your account credentials; (c) accept full responsibility for all activities occurring under your account; and (d) immediately notify us of any unauthorized use or security breach. <strong>We shall bear no liability for any loss, damage, or harm arising from your failure to comply with these obligations or from unauthorized access to your account, regardless of cause.</strong></p>

              <h2>4. Acceptable Use</h2>
              <p>You shall not use the Services to: (a) violate any applicable law, regulation, or third-party right; (b) transmit malicious code, viruses, or harmful content; (c) engage in unauthorized data mining, scraping, or harvesting; (d) interfere with or disrupt the integrity or performance of the Services; (e) attempt to gain unauthorized access to any systems or networks; (f) use the Services for competitive analysis, benchmarking, or reverse engineering; or (g) engage in any activity that, in our sole discretion, is objectionable or harmful to the Company or its users. Violation of this section may result in immediate termination without notice or refund.</p>

              <h2>5. Intellectual Property</h2>
              <p>All content, software, algorithms, models, designs, trademarks, trade dress, and other intellectual property embodied in or associated with the Services are the exclusive property of the Company or its licensors and are protected by applicable intellectual property laws. No right, title, or interest in any intellectual property is transferred to you. You are granted a limited, non-exclusive, non-transferable, revocable license to use the Services solely in accordance with these Terms. Any unauthorized reproduction, distribution, modification, or derivative use constitutes infringement and may result in civil and criminal liability.</p>

              <h2>6. User Content</h2>
              <p>By submitting, uploading, or transmitting any content through the Services ("User Content"), you grant the Company a worldwide, perpetual, irrevocable, royalty-free, sublicensable, and transferable license to use, reproduce, modify, adapt, publish, distribute, display, and create derivative works from such User Content for any purpose, including but not limited to improving, training, and developing AI models and Services. You represent and warrant that you own or have all necessary rights to grant this license. <strong>We bear no obligation to maintain, store, or return any User Content and disclaim all liability for any loss or corruption thereof.</strong></p>

              <h2>7. Payment and Billing</h2>
              <p>Certain Services require payment of fees as specified on our pricing page or in a separate order form. All fees are quoted in U.S. dollars unless otherwise stated. <strong>All payments are non-refundable except where expressly required by mandatory applicable law.</strong> We reserve the right to modify pricing at any time; changes take effect at the start of the next billing cycle. Failure to pay may result in suspension or termination of access. You are responsible for all applicable taxes, duties, and governmental charges.</p>

              <h2>8. Disclaimer of Warranties</h2>
              <p><strong>TO THE FULLEST EXTENT PERMITTED BY LAW, THE COMPANY EXPRESSLY DISCLAIMS ALL WARRANTIES, WHETHER EXPRESS, IMPLIED, STATUTORY, OR OTHERWISE, INCLUDING WITHOUT LIMITATION ANY WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, NON-INFRINGEMENT, ACCURACY, RELIABILITY, AVAILABILITY, COMPATIBILITY, AND ANY WARRANTIES ARISING FROM COURSE OF DEALING, USAGE, OR TRADE PRACTICE. THE COMPANY DOES NOT WARRANT THAT THE SERVICES WILL MEET YOUR REQUIREMENTS, ACHIEVE ANY INTENDED RESULTS, BE COMPATIBLE WITH ANY OTHER SOFTWARE OR SYSTEMS, OPERATE WITHOUT INTERRUPTION, OR BE ERROR-FREE. NO ORAL OR WRITTEN INFORMATION OR ADVICE GIVEN BY THE COMPANY SHALL CREATE A WARRANTY.</strong></p>

              <h2>9. Limitation of Liability</h2>
              <p><strong>TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL THE COMPANY, ITS OFFICERS, DIRECTORS, EMPLOYEES, AGENTS, AFFILIATES, SUCCESSORS, ASSIGNS, OR LICENSORS (COLLECTIVELY, "COMPANY PARTIES") BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, PUNITIVE, OR EXEMPLARY DAMAGES, INCLUDING BUT NOT LIMITED TO DAMAGES FOR LOSS OF PROFITS, REVENUE, DATA, GOODWILL, BUSINESS OPPORTUNITIES, OR BUSINESS INTERRUPTION, ARISING OUT OF OR IN CONNECTION WITH THESE TERMS OR THE SERVICES, REGARDLESS OF THE THEORY OF LIABILITY (WHETHER IN CONTRACT, TORT, STRICT LIABILITY, OR OTHERWISE) AND EVEN IF THE COMPANY PARTIES HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.</strong></p>
              <p><strong>THE AGGREGATE LIABILITY OF THE COMPANY PARTIES ARISING OUT OF OR RELATING TO THESE TERMS OR THE SERVICES SHALL NOT EXCEED THE GREATER OF: (A) FIFTY UNITED STATES DOLLARS (USD $50.00); OR (B) THE TOTAL AMOUNTS ACTUALLY PAID BY YOU TO THE COMPANY IN THE TWELVE (12) MONTHS IMMEDIATELY PRECEDING THE EVENT GIVING RISE TO THE CLAIM. THIS LIMITATION APPLIES REGARDLESS OF THE NUMBER OF CLAIMS AND CONSTITUTES YOUR SOLE AND EXCLUSIVE REMEDY.</strong></p>

              <h2>10. Indemnification</h2>
              <p>You agree to indemnify, defend, and hold harmless the Company Parties from and against any and all claims, demands, actions, suits, proceedings, losses, damages, liabilities, costs, and expenses (including reasonable attorneys' fees and court costs) arising out of or relating to: (a) your use or misuse of the Services; (b) your violation of these Terms; (c) your violation of any applicable law or third-party right; (d) any User Content you submit; or (e) any dispute between you and any third party. This indemnification obligation shall survive the termination or expiration of these Terms.</p>

              <h2>11. Termination</h2>
              <p>We may suspend or terminate your access to the Services at any time, for any reason or no reason, with or without notice, in our sole discretion. Upon termination: (a) all rights and licenses granted to you shall immediately cease; (b) you must immediately discontinue all use of the Services; (c) we may delete your account and all associated data without obligation to preserve or provide copies; and (d) all accrued obligations, including payment obligations, shall survive. <strong>We shall not be liable to you or any third party for any termination of access to the Services.</strong></p>

              <h2>12. Dispute Resolution and Arbitration</h2>
              <p><strong>ANY DISPUTE, CONTROVERSY, OR CLAIM ARISING OUT OF OR RELATING TO THESE TERMS OR THE SERVICES SHALL BE RESOLVED EXCLUSIVELY THROUGH BINDING INDIVIDUAL ARBITRATION</strong> administered under the rules of the American Arbitration Association. You agree to waive any right to participate in a class action, class arbitration, or representative proceeding. The arbitration shall be conducted in English, and the seat of arbitration shall be in the State of Delaware, United States. The arbitrator's award shall be final, binding, and enforceable in any court of competent jurisdiction. Each party shall bear its own costs; provided, however, that the prevailing party shall be entitled to recover its reasonable attorneys' fees and costs.</p>

              <h2>13. Governing Law</h2>
              <p>These Terms shall be governed by and construed in accordance with the laws of the State of Delaware, United States, without regard to its conflict of laws principles. To the extent any dispute is not subject to arbitration, you irrevocably consent to the exclusive jurisdiction and venue of the state and federal courts located in Wilmington, Delaware.</p>

              <h2>14. Severability</h2>
              <p>If any provision of these Terms is held to be invalid, illegal, or unenforceable by a court of competent jurisdiction, such provision shall be modified to the minimum extent necessary to make it enforceable, or if modification is not possible, severed, and the remaining provisions shall continue in full force and effect.</p>

              <h2>15. Entire Agreement</h2>
              <p>These Terms, together with our Privacy Policy and any additional agreements or order forms, constitute the entire agreement between you and the Company regarding the Services and supersede all prior and contemporaneous understandings, agreements, representations, and warranties, both written and oral.</p>

              <h2>16. Force Majeure</h2>
              <p>The Company shall not be liable for any failure or delay in performing its obligations under these Terms to the extent such failure or delay results from circumstances beyond its reasonable control, including but not limited to acts of God, natural disasters, pandemic, epidemic, war, terrorism, cyberattack, government action, power failure, internet disruption, or third-party service failures.</p>

              <h2>17. Contact</h2>
              <p>For questions regarding these Terms, please contact us at: <a href="mailto:legal@aibloop.com" className="text-primary hover:underline">legal@aibloop.com</a></p>
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default Terms;
