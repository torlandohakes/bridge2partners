export type TeamMemberCategory = "Executive Leadership" | "Business Line Leaders" | "Technical Expertise" | "Business Development";

export type TeamMember = {
  id: string;
  name: string;
  title: string;
  category: TeamMemberCategory | "Strategic Advisor" | "Client Success" | "Practice Leader" | "Executive"; // Keeping legacy types temporarily so TS doesn't yell during migration
  bio: string;
  fullBio: string;
  imageUrl: string;
  linkedinUrl?: string;
  email?: string;
  phone?: string;
  calendarUrl?: string;
  expertise?: string[];
};

export const MOCK_TEAM: TeamMember[] = [
  {
    id: "michael-cordas",
    name: "Michael Cordas",
    title: "Chief Executive Officer (CEO) & Co-Founder",
    category: "Executive Leadership",
    bio: "A strategic banking executive with a track record of driving innovation across financial institutions.",
    fullBio: "A strategic banking executive with a track record of driving innovation across financial institutions. Throughout his career he has held senior leadership roles at City National Bank and Wells Fargo, where he oversaw transformation programs that modernized core platforms, digital channels, and payments systems.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/bridge2partners-staging.firebasestorage.app/o/images%2FMichael%20C.png?alt=media&token=eeda6ac0-0f91-4538-acd9-489a8334a7ea",
    linkedinUrl: "https://www.linkedin.com/in/michael-cordas-executive-leadership",
    email: "michael.cordas@bridge2partners.com"
  },
  {
    id: "chris-caulfield",
    name: "Chris Caulfield",
    title: "Chief Operating Officer (COO)",
    category: "Executive Leadership",
    bio: "Accomplished financial services leader with extensive experience guiding banks through complex transformations.",
    fullBio: "An accomplished financial services leader with extensive experience guiding banks and financial institutions through complex digital and operational transformations. As a former Senior Partner at West Monroe, Chris led the firm's Banking practice, specializing in Commercial Banking, Regulatory and Program Management.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/bridge2partners-staging.firebasestorage.app/o/images%2FChris%20C.png?alt=media&token=69c281e4-e759-4417-a13b-9ae92973daa9",
    linkedinUrl: "https://www.linkedin.com/in/chris-caulfield-022b409/",
    email: "chris.caulfield@bridge2partners.com"
  },
  {
    id: "neil-kjeldsen",
    name: "Neil Kjeldsen",
    title: "Chief Financial Officer (CFO) & Co-Founder",
    category: "Executive Leadership",
    bio: "Seasoned technology and banking leader with over 25 years of experience driving transformation.",
    fullBio: "A seasoned technology and banking leader with over 25 years of experience driving transformation across financial services. At Bridge2Partners, Neil blends deep expertise in banking operations, digital strategy, and enterprise technology to deliver measurable business outcomes.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/bridge2partners-staging.firebasestorage.app/o/images%2FNeil%20K.png?alt=media&token=8315b88c-95de-4ae4-8171-67274ef8a8ac",
    linkedinUrl: "https://www.linkedin.com/in/neilkjeldsen/",
    email: "neil.kjeldsen@bridge2partners.com"
  },
  {
    id: "christopher-summers",
    name: "Chris Summers",
    title: "Chief Business Officer (CBO)",
    category: "Executive Leadership",
    bio: "Specializing in M&A, transaction services, market entry strategy, and large-scale transformation.",
    fullBio: "Chief Business Officer at Bridge2Partners, specializing in mergers and acquisitions, transaction services, market entry strategy, and large-scale business transformation. Christopher is recognized for aligning business and technology to deliver sustainable results in an evolving financial landscape.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/bridge2partners-staging.firebasestorage.app/o/images%2FChris%20S.png?alt=media&token=bc9750bd-8625-4a7b-8538-2a6f78c112f2",
    linkedinUrl: "https://www.linkedin.com/in/christopher-summers-491b02",
    email: "Christopher.Summers@bridge2partners.com"
  },
  {
    id: "kristine-simon",
    name: "Kristine Simon",
    title: "Chief Digital Officer (CDO)",
    category: "Executive Leadership",
    bio: "Banking technology and digital transformation executive with a strong foundation in financial services.",
    fullBio: "A banking technology and digital transformation executive with a strong foundation in financial services, including several years at City National Bank. She brings expertise in digital strategy, customer onboarding, data analytics, and platform modernization. Kristine has led initiatives that increased digital adoption, streamlined digital channels, and aligned technology investments with strategic outcomes — driving improved customer experience, reduced service friction, and better use of data to guide product decisions.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/bridge2partners-staging.firebasestorage.app/o/images%2FUntitled%20(83).png?alt=media&token=0f0a6e3c-37a0-449f-ac10-a8fa6ad78b0b",
    linkedinUrl: "https://www.linkedin.com/in/kristine-esmaili-simon-b419816/",
    email: "kristine.simon@bridge2partners.com"
  },
  {
    id: "dominick-grillas",
    name: "Dominick Grillas",
    title: "Chief Administrative Officer (CAO)",
    category: "Executive Leadership",
    bio: "Hands-on thought leader with 25+ years of successful strategic planning, execution and QA/testing.",
    fullBio: "A hands-on thought leader with 25+ years of successful strategic planning, execution and QA/testing of projects and programs that transform organizations and businesses, improve competitive performance, and help banks and financial institutions compete and differentiate. Dominick has a broad range of experience across banking, lending, insurance, and financial services, and with consulting firms such as CapGemini and Wipro.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/bridge2partners-staging.firebasestorage.app/o/images%2FDom%20G.png?alt=media&token=4b9631b4-9e8e-4567-b4d0-3cb735adcadf",
    linkedinUrl: "https://www.linkedin.com/in/dominickgrillas",
    email: "dom.grillas@bridge2partners.com"
  },
  {
    id: "kimberly-boroyan",
    name: "Kimberly Boroyan",
    title: "Chief Human Resources Officer (CHRO)",
    category: "Executive Leadership",
    bio: "Accomplished Human Resources leader with over 20 years of experience driving people strategy.",
    fullBio: "An accomplished Human Resources leader with over 20 years of experience driving people strategy, organizational development, and cultural transformation. Kimberly has led high-impact initiatives in talent acquisition, leadership development, performance management, employee engagement, and compensation strategy.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/bridge2partners-staging.firebasestorage.app/o/images%2FKimberly%20B.png?alt=media&token=c3a7c6d8-1be3-4573-a1ba-d71e6d975467",
    linkedinUrl: "https://www.linkedin.com/in/kimberly-boroyan-shrm-cp-2867567",
    email: "Kimberly.Boroyan@bridge2partners.com"
  },
  {
    id: "aaron-weissberger",
    name: "Aaron Weissberger",
    title: "Chief Technology Officer (CTO)",
    category: "Executive Leadership",
    bio: "Over 30 years of experience driving technology-enabled transformation and operational excellence.",
    fullBio: "A seasoned executive with over 30 years of experience driving technology-enabled transformation and operational excellence for financial services and technology organizations. With a foundation in Big Four consulting at Ernst & Young and PwC, Aaron has led large-scale initiatives in digital strategy, process optimization, and enterprise technology integration.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/bridge2partners-staging.firebasestorage.app/o/images%2FAaron%20W.png?alt=media&token=53d3590a-fd65-46fc-9ba6-2466c0eba115",
    linkedinUrl: "https://www.linkedin.com/in/aaronweissberger/",
    email: "Aaron.Weissberger@bridge2partners.com"
  },
  {
    id: "john-gustav",
    name: "John Gustav",
    title: "Head of Financial Services; Managing Director, Wealth Management",
    category: "Business Line Leaders",
    bio: "Brings close to 30 years of experience in banking, capital markets, and wealth management strategy.",
    fullBio: "John leads Bridge2Partners' Financial Services practice, bringing close to 30 years of experience in banking, capital markets, wealth management, and asset management strategy and transformation. He was previously a Partner and Head of US Financial Services at Sia Partners, where he also led the Cross Business Strategy and Transformation practice; he joined Sia through its 2019 acquisition of Gartland & Mellina Group (GMG), a financial-services management consulting firm where he was a Managing Partner. His prior work has centered on operational strategy, large-scale program management, middle/back-office outsourcing, and technology-enabled solutions across operational resilience, FinTech, ESG/Climate Risk, LIBOR transition, and Market Data Solutions for retail banks, private banks, brokerages, mutual funds, and asset managers. He also holds the Chartered Financial Analyst (CFA) designation.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/bridge2partners-staging.firebasestorage.app/o/images%2FJohn%20Gustav.png?alt=media&token=34dcdf7d-49b5-45a3-bc50-85a7ae83b798",
    linkedinUrl: "https://www.linkedin.com/in/johngustav/",
    email: "John.Gustav@bridge2partners.com"
  },
  {
    id: "bob-holohan",
    name: "Bob Holohan",
    title: "Managing Director, M&A",
    category: "Business Line Leaders",
    bio: "Seasoned banking and digital solutions leader driving large-scale business transformation programs.",
    fullBio: "A seasoned banking and digital solutions leader with extensive experience driving large-scale business transformation programs across both the Commercial and Retail sides.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/bridge2partners-staging.firebasestorage.app/o/images%2FBob%20Holohan.png?alt=media&token=21c70eb2-4e77-46f6-8fd4-b2878eb15a7e",
    linkedinUrl: "https://www.linkedin.com/in/robertholohan/",
    email: "Robert.Holohan@bridge2partners.com"
  },
  {
    id: "shane-williams",
    name: "Shane Williams",
    title: "Managing Director, Commercial Lending",
    category: "Business Line Leaders",
    bio: "Specializes in navigating complex, large-scale transformation projects in Commercial Lending.",
    fullBio: "Shane brings over 25 years of experience in Investment Banking and Management Consulting to Bridge2Partners. As the lead for our Capital Markets and Commercial Lending practice, Shane specializes in navigating complex, large-scale transformation projects.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/bridge2partners-staging.firebasestorage.app/o/images%2FUntitled%20(81).png?alt=media&token=82b816d1-2b05-4f15-b6c9-d9f41c25a8a6",
    linkedinUrl: "https://www.linkedin.com/in/shanecwilliams/",
    email: "Shane.Williams@bridge2partners.com"
  },
  {
    id: "linda-weber",
    name: "Linda Weber",
    title: "Managing Director, Treasury Management",
    category: "Business Line Leaders",
    bio: "Leads Bridge2Partners' Treasury Management & Payments practice with a 30-year career as a builder.",
    fullBio: "Linda leads Bridge2Partners' Treasury Management & Payments practice, drawing on a 30-year career as a builder and operator at the intersection of banking and technology. She built some of the first consumer online banking platforms in the United States at CoreStates Financial Corp, where she served as SVP, Systems and Technology (1995–1998) and became the youngest woman ever promoted to SVP at the bank — earning a cover feature in American Banker for her internet-banking work. Earlier in her career she was a credit risk manager in the card division at Chase Manhattan, and she has since held leadership roles at Fiserv, American Management Systems, and eCharge Corp, in addition to founding two startups. Her advisory work today focuses on payments modernization and treasury transformation for banks.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/bridge2partners-staging.firebasestorage.app/o/images%2FUntitled%20(82).png?alt=media&token=76a8e68d-54f4-4546-a592-b94aeff51c64",
    linkedinUrl: "https://www.linkedin.com/in/lindaaweber/",
    email: "Linda.Weber@bridge2partners.com"
  },
  {
    id: "krithika-kumar",
    name: "Krithika Kumar",
    title: "Managing Director, QA Testing & Automated Solutions",
    category: "Technical Expertise",
    bio: "Deep expertise in digital transformation, IT solution delivery, and quality engineering.",
    fullBio: "A senior technology and banking leader with deep expertise in digital transformation, IT solution delivery, and quality engineering for financial institutions. Krithika helps banks accelerate digital adoption through an innovative 'Ideation to Adoption' framework, leveraging productized solutions to ensure measurable business outcomes. Her leadership focuses on core banking modernization, DevOps-enabled quality engineering, and customer-centric technology strategies.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/bridge2partners-staging.firebasestorage.app/o/images%2FKrithika%20K.png?alt=media&token=d9b15470-1296-46b4-bdf2-2b04ccf906b2",
    linkedinUrl: "https://www.linkedin.com/in/krithikaakumar/",
    email: "Krithika.Kumar@bridge2partners.com"
  },
  {
    id: "jason-stein",
    name: "Jason Stein",
    title: "Director, Technology Strategy and Transformation",
    category: "Technical Expertise",
    bio: "Data and technology strategist with over two decades of experience.",
    fullBio: "A data and technology strategist with more than two decades of experience helping banks turn information into a competitive asset. As Director of Data Transformation, Architecture & Strategy at Bridge2Partners, Jason designs and modernizes the data foundations that power lending, risk, finance, and customer analytics. His background spans Slalom and Accenture as well as a senior in-house tour at Texas Capital Bank — where he served as Director of IT and SVP of Loan Operations — giving him a rare combination of architect's rigor and banker's intuition. He is a Certified ScrumMaster who has led agile data programs covering everything from data warehouses and lakehouses to real-time analytics and regulatory reporting. Jason is at his best when business strategy, data architecture, and delivery come together to unlock outcomes a bank can actually measure.",
    imageUrl: "/images/silhouette.svg",
    linkedinUrl: "https://www.linkedin.com/in/jason-stein-b9b9581/",
    email: "Jason.Stein@bridge2partners.com"
  },
  {
    id: "tony-lockard",
    name: "Tony Lockard",
    title: "Senior Director, Technology",
    category: "Technical Expertise",
    bio: "Executive technologist with deep experience in application development and systems integration.",
    fullBio: "An executive technologist with deep experience in banking and financial services technology, particularly in application development, systems integration, and digital transformation. Tony has guided banks through modernization of legacy systems, API-enabled architectures, and migration to scalable platforms.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/bridge2partners-staging.firebasestorage.app/o/images%2FAnthony%20L.png?alt=media&token=c8185d06-27f7-49a5-b3b3-a1d3825c25fd",
    linkedinUrl: "https://www.linkedin.com/in/ahlockard/",
    email: "Tony.Lockard@bridge2partners.com"
  },
  {
    id: "ian-mckinney",
    name: "Ian Mckinney",
    title: "Director, Cloud Services and Infrastructure",
    category: "Technical Expertise",
    bio: "Cloud and infrastructure leader helping banks adopt modern, scalable platforms.",
    fullBio: "A cloud and infrastructure leader who helps banks adopt modern, secure, and scalable platforms without disrupting the business. As Director of Cloud Services & Infrastructure at Bridge2Partners, Ian guides clients through cloud strategy, landing-zone design, workload migration, and the operational practices needed to run regulated workloads at scale. His background as a software engineer gives him a builder's perspective — he understands the day-to-day realities of CI/CD pipelines, automation, and the cost and reliability tradeoffs that come with modern infrastructure. Ian focuses on the fundamentals that make cloud transformations succeed: identity, security, observability, and FinOps discipline applied from day one. Bridging engineering practice and enterprise governance, he helps banks treat infrastructure as a competitive advantage rather than a cost center.",
    imageUrl: "/images/silhouette.svg",
    linkedinUrl: "https://www.linkedin.com/in/ian-mckinney1/",
    email: "ian.mckinney@bridge2partners.com"
  },
  {
    id: "raechelle-freeman",
    name: "Raechelle Freeman",
    title: "Senior Practitioner, Testing and QA",
    category: "Technical Expertise",
    bio: "Process transformation specialist who helps banks rethink workflows.",
    fullBio: "A process transformation specialist who helps banks rethink the way work flows across people, systems, and customers. As a Senior Practitioner at Bridge2Partners, Raechelle partners with operations and technology leaders to redesign processes, identify automation opportunities, and translate business requirements into delivery-ready solutions. She comes to consulting from inside the industry — most recently as Vice President, Business Process Analyst at City National Bank, where she led cross-functional teams improving wealth management, consumer and business lending, credit operations, and servicing workflows. Her hallmark is an obsessive focus on the pain points and bottlenecks that erode customer experience, and on the right combination of automation, controls, and change management to remove them for good. Raechelle brings the rigor of an operator and the toolkit of a transformation practitioner to every engagement.",
    imageUrl: "/images/silhouette.svg",
    linkedinUrl: "https://www.linkedin.com/in/raechelle-freeman-17613312a/",
    email: "raechelle.freeman@bridge2partners.com"
  },
  {
    id: "daniel-hsu",
    name: "Daniel Hsu",
    title: "Senior Director, Solutions Engineering",
    category: "Technical Expertise",
    bio: "Full-stack engineer building digital and automation engagements.",
    fullBio: "A full-stack engineer who builds the working software behind Bridge2Partners' digital and automation engagements. With an engineering foundation from UC Berkeley and an earlier career as a mechanical engineer, Daniel brings a builder's discipline to financial services — translating strategy and design into deployable applications, APIs, and integrations. His work spans front-end experiences, back-end services, data-flow integration, and the test-and-release plumbing that keeps banking systems dependable. Daniel takes the edge cases seriously: input validation, error handling, performance under real workloads, and the operational details that determine whether a project ships once or scales for years. He is the kind of hands-on technologist who turns whiteboard architectures into running production code.",
    imageUrl: "/images/silhouette.svg",
    linkedinUrl: "https://www.linkedin.com/in/dhsu28/",
    email: "daniel.hsu@bridge2partners.com"
  },
  {
    id: "liza-anne-dejulio",
    name: "Liza Anne DeJulio",
    title: "Senior Director, National Account Executive",
    category: "Business Development",
    bio: "Seasoned banking and fintech leader with decades of experience.",
    fullBio: "A seasoned banking and fintech leader with decades of experience as both a banking operations executive and a FinTech delivery and enterprise client partner.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/bridge2partners-staging.firebasestorage.app/o/images%2FLiza%20Anne.png?alt=media&token=07bbe10c-96fe-4381-815f-ff6c7e58e1d0",
    linkedinUrl: "https://www.linkedin.com/in/lizaannesdejulio",
    email: "LizaAnne.DeJulio@bridge2partners.com"
  },
  {
    id: "teuta-naghshineh",
    name: "Teuta Naghshineh",
    title: "Senior Director, Strategy",
    category: "Business Development",
    bio: "Leads strategy work with 15+ years of global consulting and technology transformation experience.",
    fullBio: "Teuta leads strategy work at Bridge2Partners with 15+ years of global consulting and technology transformation experience focused on financial services. She was previously a Partner in Capco's US Digital Engineering practice, and before that helped launch Slalom Consulting's Los Angeles fintech practice covering banking, capital markets, and asset management. Earlier in her career she was a Director in PwC's financial advisory practice, with prior roles at Diamond Management & Technology Consultants and in-house at BNY Mellon. Her expertise spans digital strategy, cloud transformation, data architecture, Salesforce implementations, organizational redesign, and regulatory reform — and she has been a public voice on banking-tech topics including cloud migration (e.g., BMO), AWS-enabled digital transformation, and the application of generative AI in financial services.",
    imageUrl: "/images/silhouette.svg",
    linkedinUrl: "https://www.linkedin.com/in/teutadoko",
    email: "teuta.naghshineh@bridge2partners.com"
  }
];
