export type TeamMember = {
  id: string;
  name: string;
  title: string;
  category: "Executive" | "Practice Leader" | "Client Success" | "Strategic Advisor";
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
    title: "Executive Leader",
    category: "Executive",
    bio: "Strategic banking executive driving innovation and modernizing core platforms.",
    fullBio: "Michael Cordas is a strategic banking executive with a track record of driving innovation across financial institutions. During his career, he has held senior leadership roles at City National Bank and Wells Fargo, where he oversaw transformation programs that modernized core platforms, digital channels, and payments systems.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/bridge2partners-staging.firebasestorage.app/o/images%2FMichael%20Cordas%20B2P.png?alt=media&token=a733e89a-1323-409e-b8c6-aef101e34019",
    linkedinUrl: "#"
  },
  {
    id: "neil-kjeldsen",
    name: "Neil Kjeldsen",
    title: "Chief Operating Officer",
    category: "Executive",
    bio: "25+ years driving transformation across financial services and banking operations.",
    fullBio: "Neil Kjeldsen is a seasoned technology and banking leader with over 25 years of experience driving transformation across financial services. As Chief Operating Officer and Technology Practice Leader at Bridge2Partners, Neil blends deep expertise in banking operations, digital strategy, and enterprise technology.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/bridge2partners-staging.firebasestorage.app/o/images%2FNeil%20K.png?alt=media&token=8315b88c-95de-4ae4-8171-67274ef8a8ac",
    linkedinUrl: "#"
  },
  {
    id: "christopher-summers",
    name: "Christopher Summers",
    title: "Chief Business Officer",
    category: "Executive",
    bio: "Drives strategic transformation and operational excellence across global banking.",
    fullBio: "Christopher Summers is an accomplished financial services leader with over 20 years of experience driving strategic transformation and operational excellence across global banking and technology. As Chief Business Officer at Bridge2Partners, Christopher specializes in mergers and acquisitions, transaction services, market entry strategy.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/bridge2partners-staging.firebasestorage.app/o/images%2FChris%20S.png?alt=media&token=bc9750bd-8625-4a7b-8538-2a6f78c112f2",
    linkedinUrl: "#"
  },
  {
    id: "kimberly-boroyan",
    name: "Kimberly Boroyan",
    title: "HR Executive Leader",
    category: "Executive",
    bio: "20+ years driving people strategy, organizational development, and cultural transformation.",
    fullBio: "Kimberly Boroyan is an accomplished Human Resources leader with over 20 years of experience driving people strategy, organizational development, and cultural transformation. As a trusted advisor to executives and business leaders, Kimberly has built a reputation for blending strategic vision with hands-on execution.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/bridge2partners-staging.firebasestorage.app/o/images%2FKimberly%20B.png?alt=media&token=c3a7c6d8-1be3-4573-a1ba-d71e6d975467",
    linkedinUrl: "#"
  },
  {
    id: "hope-thomas",
    name: "Hope Thomas",
    title: "Practice Leader",
    category: "Practice Leader",
    bio: "Unites marketing, operations, and technology within regulated industries.",
    fullBio: "Hope Thomas is a seasoned leader in financial services and marketing technology, with deep expertise in uniting marketing, operations, and technology within regulated industries. She has guided major banks through the adoption of advanced CRM and digital engagement solutions.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/bridge2partners-staging.firebasestorage.app/o/images%2FHope%20T.png?alt=media&token=501934d0-5465-461d-befb-7e1a414f6389",
    linkedinUrl: "#"
  },
  {
    id: "dominick-grillas",
    name: "Dominick Grillas",
    title: "Chief Administrative Officer",
    category: "Practice Leader",
    bio: "25+ years driving strategic planning, execution, and QA testing programs.",
    fullBio: "Dominick is a hands-on thought leader with 25+ years of successful strategic planning, execution and QA / testing of project and programs that transform organizations and businesses. Leader and executive coach on technology and digital transformation.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/bridge2partners-staging.firebasestorage.app/o/images%2FDom%20G.png?alt=media&token=4b9631b4-9e8e-4567-b4d0-3cb735adcadf",
    linkedinUrl: "#"
  },
  {
    id: "shane-williams",
    name: "Shane Williams",
    title: "Capital Markets & Lending Lead",
    category: "Practice Leader",
    bio: "Navigates complex transformation projects bridging risk management and IT implementation.",
    fullBio: "Shane brings over 25 years of experience in Investment Banking and Management Consulting to Bridge2Partners. As the lead for our Capital Markets and Commercial Lending practice, Shane specializes in navigating complex, large-scale transformation projects.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/bridge2partners-staging.firebasestorage.app/o/images%2FUntitled%20(81).png?alt=media&token=82b816d1-2b05-4f15-b6c9-d9f41c25a8a6",
    linkedinUrl: "#"
  },
  {
    id: "bob-holohan",
    name: "Bob Holohan",
    title: "M&A Integration Lead",
    category: "Practice Leader",
    bio: "Drives large-scale business transformation and M&A integration programs.",
    fullBio: "Bob Holohan is a seasoned banking and digital solutions leader with extensive experience driving large-scale business transformation programs, both on the Commerical and Retail sides. Across his career he has specialized in delivering innovative, omnichannel solutions.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/bridge2partners-staging.firebasestorage.app/o/images%2FUntitled%20(80).png?alt=media&token=8885978f-5ea2-475e-9863-1d6de58c949a",
    linkedinUrl: "#"
  },
  {
    id: "kristine-simon",
    name: "Kristine Simon",
    title: "Practice Leader",
    category: "Practice Leader",
    bio: "Banking technology and digital transformation executive.",
    fullBio: "Kristine Simon is a banking technology and digital transformation executive with a strong foundation in financial services, including several years at City National Bank. She brings expertise in digital strategy, customer onboarding, data analytics, and platform modernization.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/bridge2partners-staging.firebasestorage.app/o/images%2FUntitled%20(83).png?alt=media&token=0f0a6e3c-37a0-449f-ac10-a8fa6ad78b0b",
    linkedinUrl: "#"
  },
  {
    id: "john-gustav",
    name: "John Gustav",
    title: "Wealth Management Lead",
    category: "Practice Leader",
    bio: "Bridges legacy architectures and modern real-time business outcomes.",
    fullBio: "John brings over 25 years of experience in financial services strategy and operational transformation to Bridge2Partners. As the Head of Financial Services and leader of the Wealth, Investment, and Trust Management practice, he specializes in bridging the gap between complex legacy architectures and modern outcomes.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/bridge2partners-staging.firebasestorage.app/o/images%2FJohn%20G.png?alt=media&token=b86b804e-7e45-4b30-8788-a95dac52635e",
    linkedinUrl: "#"
  },
  {
    id: "linda-weber",
    name: "Linda Weber",
    title: "Treasury Operations Lead",
    category: "Practice Leader",
    bio: "Expertise in payments modernization, digital banking, and systems integration.",
    fullBio: "Linda Weber brings extensive experience in banking technology, treasury management, and financial services operations. Her expertise spans payments modernization, digital banking platforms, systems integration, and product management.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/bridge2partners-staging.firebasestorage.app/o/images%2FUntitled%20(82).png?alt=media&token=76a8e68d-54f4-4546-a592-b94aeff51c64",
    linkedinUrl: "#"
  },
  {
    id: "chris-caulfield",
    name: "Chris Caulfield",
    title: "Practice Leader",
    category: "Practice Leader",
    bio: "Guides banks through complex digital and operational transformations.",
    fullBio: "Chris Caulfield is an accomplished financial services leader with extensive experience guiding banks and financial institutions through complex digital and operational transformations. As a former Senior Partner at West Monroe, Chris led the firm’s Banking practice.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/bridge2partners-staging.firebasestorage.app/o/images%2FChris%20C.png?alt=media&token=69c281e4-e759-4417-a13b-9ae92973daa9",
    linkedinUrl: "#"
  },
  {
    id: "krithika-kumar",
    name: "Krithika Kumar",
    title: "EVP of Client Solutions",
    category: "Practice Leader",
    bio: "Deep expertise in IT solution delivery and quality engineering.",
    fullBio: "Krithika Kumar is a senior technology and banking leader with deep expertise in digital transformation, IT solution delivery, and quality engineering for financial institutions. As Executive Vice President of Client Solutions and Delivery at Go-Live Faster, she helps banks accelerate digital adoption.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/bridge2partners-staging.firebasestorage.app/o/images%2FKrithika%20K.png?alt=media&token=d9b15470-1296-46b4-bdf2-2b04ccf906b2",
    linkedinUrl: "#"
  },
  {
    id: "aaron-weissberger",
    name: "Aaron Weissberger",
    title: "Practice Leader",
    category: "Practice Leader",
    bio: "30+ years driving technology-enabled transformation and operational excellence.",
    fullBio: "Aaron Weissberger is a seasoned executive with over 30 years of experience driving technology-enabled transformation and operational excellence for financial services and technology organizations. With a foundation in Big Four consulting, Aaron has led large-scale initiatives in digital strategy.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/bridge2partners-staging.firebasestorage.app/o/images%2FAaron%20W.png?alt=media&token=53d3590a-fd65-46fc-9ba6-2466c0eba115",
    linkedinUrl: "#"
  },
  {
    id: "srinivas-haridas",
    name: "Srinivas Haridas",
    title: "Practice Leader",
    category: "Practice Leader",
    bio: "Specialized in data engineering, advanced analytics, and AI/ML.",
    fullBio: "Srinivas Haridas is a banking and fintech leader specialized in data engineering, advanced analytics, AI/ML, and business intelligence for regulated financial institutions. At the intersection of banking and tech, he’s built and led platforms that transform raw data into actionable insight.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/bridge2partners-staging.firebasestorage.app/o/images%2FSrinivas.png?alt=media&token=454fe68d-e644-4f75-9738-2d29bdfb5d9d",
    linkedinUrl: "#"
  },
  {
    id: "anthony-lockard",
    name: "Anthony 'Tony' Lockard",
    title: "Practice Leader",
    category: "Practice Leader",
    bio: "Executive technologist in application development and systems integration.",
    fullBio: "Anthony 'Tony' Lockard is an executive technologist with deep experience in banking and financial services technology, particularly in application development, systems integration, and digital transformation. He has guided banks through modernization of legacy systems.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/bridge2partners-staging.firebasestorage.app/o/images%2FAnthony%20L.png?alt=media&token=c8185d06-27f7-49a5-b3b3-a1d3825c25fd",
    linkedinUrl: "#"
  },
  {
    id: "albert-plunkett",
    name: "Albert Plunkett",
    title: "Practice Leader",
    category: "Practice Leader",
    bio: "Expertise in digital channels, core modernization, and cloud migrations.",
    fullBio: "Albert Plunkett is a banking technology leader with expertise in digital channels, core banking modernization, payments integration, and on-premise/cloud migrations. He has guided financial institutions through transformations of their core systems and digital originations.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/bridge2partners-staging.firebasestorage.app/o/images%2FAP.png?alt=media&token=96c00020-efdb-4322-94ae-5e5a04b945f1",
    linkedinUrl: "#"
  },
  {
    id: "liza-anne-dejulio",
    name: "Liza Anne S. DeJulio",
    title: "Client Success Team",
    category: "Client Success",
    bio: "FinTech delivery and enterprise client partner.",
    fullBio: "Liza Anne S. DeJulio is a seasoned banking and fintech leader with decades of experience as both a banking operations executive and a FinTech delivery and enterprise client partner. She brings deep knowledge of digital banking, payments, card processing, back-office operations, and automation.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/bridge2partners-staging.firebasestorage.app/o/images%2FLiza%20Anne.png?alt=media&token=07bbe10c-96fe-4381-815f-ff6c7e58e1d0",
    linkedinUrl: "#"
  },

  {
    id: "clint-thompson",
    name: "Clint Thompson",
    title: "Strategic Advisor",
    category: "Strategic Advisor",
    bio: "Shapes business development, growth, and corporate strategy.",
    fullBio: "Clint plays an active role in shaping the firm’s business development, growth, and corporate strategy. Drawing on two decades of experience in banking and digital transformation, he works closely with leadership to expand market presence, strengthen competitive positioning, and unlock enterprise value.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/bridge2partners-staging.firebasestorage.app/o/images%2FClint%20T.png?alt=media&token=768016dd-2c56-4e5e-85fa-f4e1fa1e605e",
    linkedinUrl: "#"
  },
  {
    id: "anthony-klick",
    name: "Anthony Klick",
    title: "Strategic Advisor",
    category: "Strategic Advisor",
    bio: "Decades of experience leading transformative initiatives for global banks.",
    fullBio: "Anthony Klick is a seasoned financial services strategist with decades of experience leading transformative initiatives for global banks and financial institutions. His expertise spans banking strategy, digital transformation, customer experience, and operational excellence.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/bridge2partners-staging.firebasestorage.app/o/images%2FAnthony%20K.png?alt=media&token=e9f9924a-81ce-41ae-a4b1-33b1c7fe878c",
    linkedinUrl: "#"
  },
  {
    id: "hernan-hernandez",
    name: "Hernan Hernandez",
    title: "Strategic Advisor",
    category: "Strategic Advisor",
    bio: "Investment banking, corporate development, and strategic advisory.",
    fullBio: "Hernan Hernandez is a seasoned financial services leader with over 30 years of experience in investment banking, corporate development, and strategic advisory for financial institutions. As an investment banker for Credit Suisse and MJC Partners, Hernan specializes in M&A advisory.",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/bridge2partners-staging.firebasestorage.app/o/images%2FHernan%20H.png?alt=media&token=62db2cd4-58a2-4a99-bcf8-8a89531ed141",
    linkedinUrl: "#"
  }
];
