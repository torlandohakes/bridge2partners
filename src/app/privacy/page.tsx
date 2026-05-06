import SubpageHero from "@/components/SubpageHero";

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#000d0a] text-white">
      <SubpageHero 
        title="Privacy Policy" 
        subtitle="Bridge2Partners is committed to protecting your privacy and providing you with a positive experience while using our websites, products, or services." 
      />

      <div className="max-w-4xl mx-auto px-6 py-24 relative z-10 space-y-16">
        
        {/* Intro */}
        <section className="bg-white/[0.03] border border-[#98cc67]/20 rounded-2xl p-8 md:p-10 shadow-xl backdrop-blur-sm">
          <p className="text-white/80 font-sans text-lg leading-relaxed">
            Bridge2Partners, Inc., a Delaware corporation (collectively "Bridge 2 Partners", "B2P", "us", "we" or "our") is committed to protecting your privacy and providing you with a positive experience while using our websites, products or services ("Platform"). We take the privacy of Personal Data very seriously and therefore have set out this Privacy Policy (or "Policy"), in compliance with relevant data protection regulations and laws, which describe how we gather and process your personal information when using our Platform or via email.
          </p>
        </section>

        {/* Section 1 */}
        <section>
          <h2 className="text-3xl font-display font-bold text-[#98cc67] mb-6 border-b border-white/10 pb-4">
            Information We Collect
          </h2>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm space-y-6">
            <p className="text-white/70 font-sans text-lg leading-relaxed">
              We process your personal information to communicate with you regarding, and to provide our products and services, and to meet our legal, statutory and contractual obligations. We do not collect unnecessary personal data from you and do not process your information in any way other than as specified in this Policy.
            </p>
            <div>
              <h4 className="text-xl font-display font-bold text-white mb-4">Personal Data We Collect:</h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-white/70 font-sans text-lg">
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#98cc67]" /> Full Name</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#98cc67]" /> Email Address</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#98cc67]" /> Cell Phone Number</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#98cc67]" /> Home Address</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#98cc67]" /> Gender</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#98cc67]" /> Ethnicity</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#98cc67]" /> Veteran Status</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#98cc67]" /> IP Address</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#98cc67]" /> Web Browser & User Agent</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#98cc67]" /> Information about how you use our Platform</li>
              </ul>
            </div>
            <div className="pt-4 border-t border-white/10">
              <h4 className="text-xl font-display font-bold text-white mb-4">Methods for Collecting Personal Data:</h4>
              <ul className="space-y-4 text-white/70 font-sans text-lg">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#98cc67] mt-2 shrink-0" />
                  <span><strong>The Online Contact Form:</strong> Located across our website, which includes First Name, Last Name, Email, Phone and Company Name.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#98cc67] mt-2 shrink-0" />
                  <span><strong>Cookies:</strong> Data files that are placed on your device or computer and often include an anonymous unique identifier. For more information about cookies, and how to disable cookies, visit <a href="http://www.allaboutcookies.org" className="text-[#98cc67] hover:underline" target="_blank" rel="noopener noreferrer">allaboutcookies.org</a>.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#98cc67] mt-2 shrink-0" />
                  <span><strong>Log Files:</strong> Track actions occurring on the Site, and collect data including your IP address, browser type, Internet service provider, referring/exit pages, and date/time stamps.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#98cc67] mt-2 shrink-0" />
                  <span><strong>Web Beacons, Tags, and Tracking Pixels:</strong> Electronic files used to record information about how you browse the Site.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 2 */}
        <section>
          <h2 className="text-3xl font-display font-bold text-[#98cc67] mb-6 border-b border-white/10 pb-4">
            How We Use Your Personal Data
          </h2>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm space-y-6">
            <p className="text-white/70 font-sans text-lg leading-relaxed">
              We take your privacy very seriously and will never disclose, share or sell your data without your consent; unless required to do so by law. We only retain your data for as long as is necessary and for the purpose(s) specified in this Policy. Where you have consented to us providing you with promotional offers and marketing, you are free to withdraw this consent at any time.
            </p>
            <div className="pt-2">
              <h4 className="text-xl font-display font-bold text-white mb-4">Purpose and Use of Personal Data:</h4>
              <p className="text-white/70 font-sans text-lg leading-relaxed mb-4">
                B2P may use your personal information for operational, legal, administrative or other legitimate purposes permitted by applicable law and/or regulation. Some of the ways we may use your personal data include:
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-white/70 font-sans text-lg">
                <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#98cc67] mt-2 shrink-0" /> Providing you with information about or access to our Platform</li>
                <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#98cc67] mt-2 shrink-0" /> Analyzing and monitoring extent of use</li>
                <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#98cc67] mt-2 shrink-0" /> Inviting you to participate voluntarily in events or promotions</li>
                <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#98cc67] mt-2 shrink-0" /> Providing Platform updates, information and/or alerts</li>
                <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#98cc67] mt-2 shrink-0" /> Sending communications, including for marketing or customer satisfaction purposes</li>
                <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#98cc67] mt-2 shrink-0" /> To contact you for information verification purposes</li>
                <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#98cc67] mt-2 shrink-0" /> To review your application for employment</li>
                <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#98cc67] mt-2 shrink-0" /> To ensure employment non-discrimination as required by law</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section>
          <h2 className="text-3xl font-display font-bold text-[#98cc67] mb-6 border-b border-white/10 pb-4">
            Your Rights
          </h2>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm space-y-6">
            <p className="text-white/70 font-sans text-lg leading-relaxed">
              You have the right to access any personal data that we process about you and to request information about:
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-white/70 font-sans text-lg ml-2">
              <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-white/30" /> What personal data we hold about you</li>
              <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-white/30" /> The purposes of the processing</li>
              <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-white/30" /> The categories of personal data concerned</li>
              <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-white/30" /> The recipients to whom the personal data has/will be disclosed</li>
              <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-white/30" /> How long we intend to store your personal data</li>
              <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-white/30" /> Information about the source if not collected directly</li>
            </ul>
            <p className="text-white/70 font-sans text-lg leading-relaxed">
              If you believe that we hold any incomplete or inaccurate data about you, you have the right to ask us to correct and/or complete the information and we will strive to do so as quickly as possible; unless there is a valid reason for not doing so, at which point you will be notified.
            </p>
            <p className="text-white/70 font-sans text-lg leading-relaxed">
              You also have the right to request erasure of your personal data or to restrict processing (where applicable) in accordance with the data protection laws; as well as to object to any direct marketing from us. Where applicable, you have the right to data portability of your information and the right to be informed about any automated decision-making we may use.
            </p>
          </div>
        </section>

        {/* Section 4 */}
        <section>
          <h2 className="text-3xl font-display font-bold text-[#98cc67] mb-6 border-b border-white/10 pb-4">
            Processing & Safeguarding Your Data
          </h2>
          <div className="space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
              <h4 className="text-xl font-display font-bold text-white mb-4">Processing Your Personal Data</h4>
              <p className="text-white/70 font-sans text-lg leading-relaxed">
                We do not share or disclose any of your personal data without your consent, other than for the purposes specified in this Policy or where there is a legal requirement. We use third-parties to provide processing services and business functions; however, all processors acting on our behalf only process your data in accordance with instructions from us and comply fully with this Privacy Policy, the data protection laws and any other appropriate confidentiality and security measures. Relationships with third-parties have been reviewed for the adequacy of their data privacy and information security policies and controls.
              </p>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
              <h4 className="text-xl font-display font-bold text-white mb-4">Safeguarding Measures</h4>
              <p className="text-white/70 font-sans text-lg leading-relaxed">
                We use commercially-reasonable measures to secure this website to protect against unauthorized disclosure, use, alteration or destruction of personal data in our possession. We have comprehensive, regularly-updated, and internally-published Information Security Policies that apply to all B2P employees, contractors, vendors, service providers and clients. Unfortunately, no measures can be guaranteed to provide 100% security. Accordingly, we cannot guarantee the security of your information.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
              <h4 className="text-xl font-display font-bold text-white mb-4">Data Retention</h4>
              <p className="text-white/70 font-sans text-lg leading-relaxed mb-4">
                B2P will retain personal data we process for as long as needed to provide access to the Platform, subject to our compliance with this Policy, or as required or permitted under the applicable law. We may further retain and use personal data as necessary to comply with our legal obligations; maintain accurate accounting, financial, and other operational records; resolve disputes; and enforce our agreements. 
              </p>
              <p className="text-white/70 font-sans text-lg leading-relaxed">
                Where you have consented to us using your details for direct marketing, we will keep such data until you notify us otherwise and/or withdraw your consent.
              </p>
            </div>
          </div>
        </section>

        {/* Section 5 */}
        <section>
          <h2 className="text-3xl font-display font-bold text-[#98cc67] mb-6 border-b border-white/10 pb-4">
            Additional Information
          </h2>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm space-y-8">
            <div>
              <h4 className="text-xl font-display font-bold text-white mb-2">Special Categories of Data</h4>
              <p className="text-white/70 font-sans text-lg leading-relaxed">
                We only collect and process special categories of data (Ethnicity, Veteran Status) for employment non-discrimination verification purposes. Where we collect such information, we will only request and process the minimum necessary for the specified purpose and have a legal basis for doing so. When possible, we may retain special categories of data in anonymized format without personally identifying information.
              </p>
            </div>
            
            <div>
              <h4 className="text-xl font-display font-bold text-white mb-2">Children's Information</h4>
              <p className="text-white/70 font-sans text-lg leading-relaxed">
                B2P wants to help guard children's privacy and our site is not directed to anyone under the age of 18. If you learn that your minor child has provided us with personal information without your consent, please contact us. By accessing and using our site, you hereby represent that you are at least 18 years of age.
              </p>
            </div>

            <div>
              <h4 className="text-xl font-display font-bold text-white mb-2">International Data Transfers</h4>
              <p className="text-white/70 font-sans text-lg leading-relaxed">
                B2P is a Delaware Corporation with employees across the United States of America. Our Platform is hosted on servers and networks located and secured within the United States of America. If you are a resident of a country within the European Union or are otherwise accessing our site from outside the United States of America, by using this site and providing us your personal data, you hereby explicitly acknowledge and agree to (i) the transfer of such information to the United States and (ii) the collection, use and disclosure of your personal data in accordance with this Privacy Policy.
              </p>
            </div>

            <div>
              <h4 className="text-xl font-display font-bold text-white mb-2">Privacy Shield</h4>
              <p className="text-white/70 font-sans text-lg leading-relaxed">
                B2P complies with the EU-U.S. Privacy Shield Framework as set forth by the U.S. Department of Commerce regarding the collection, use, and retention of personal information from European Union member countries. To learn more about the Privacy Shield program, please visit <a href="https://www.privacyshield.gov/" className="text-[#98cc67] hover:underline" target="_blank" rel="noopener noreferrer">privacyshield.gov</a>.
              </p>
            </div>

            <div>
              <h4 className="text-xl font-display font-bold text-white mb-2">Links to Other Sites</h4>
              <p className="text-white/70 font-sans text-lg leading-relaxed">
                We may provide links to other websites for your convenience and information. These sites operate independently from our Platform and are not under our control. These sites may have their own privacy notices in place, which we strongly suggest you review if you visit any linked websites. We are not responsible for the privacy practices or policies of such third parties.
              </p>
            </div>

            <div>
              <h4 className="text-xl font-display font-bold text-white mb-2">Changes to this Privacy Policy</h4>
              <p className="text-white/70 font-sans text-lg leading-relaxed">
                We may update or change this Privacy Policy from time to time and without prior notice to you, and any and all such modified versions of our Privacy Policy will be effective upon posting on our site. If you do not agree to changes to this Policy, you must discontinue your use of the Platform. Your access or use of the Platform after such Policy changes constitutes your acceptance of such Policy changes.
              </p>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="bg-[#001b15]/50 border border-[#98cc67]/30 rounded-2xl p-10 shadow-xl text-center">
          <h2 className="text-3xl font-display font-bold text-white mb-4">
            Contact Us
          </h2>
          <p className="text-white/80 font-sans text-lg leading-relaxed max-w-2xl mx-auto mb-8">
            It is your responsibility to ensure the personal information we have on file for you is accurate, complete and up to date. If you would like us to inquire about the information we have for you in our records, update your personal data, or if you have any questions about our information practices, please contact us by:
          </p>
          <a href="mailto:info@bridge2partners.com" className="inline-block bg-[#98cc67] text-[#000d0a] font-bold px-8 py-4 rounded-lg hover:bg-[#85b85a] transition-colors shadow-[0_0_20px_rgba(152,204,103,0.3)]">
            Email: info@bridge2partners.com
          </a>
        </section>

      </div>
    </main>
  );
}
