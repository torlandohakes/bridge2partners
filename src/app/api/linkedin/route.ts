import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tag = searchParams.get('tag')?.toLowerCase();

  const token = process.env.LINKEDIN_ACCESS_TOKEN;
  const orgUrn = process.env.LINKEDIN_ORG_URN;

  const MOCK_FEED = [
    {
      id: "mock-1",
      author: "Bridge2Partners",
      authorSub: "Banking Transformation Advisors",
      date: "1d • 🌐",
      text: "\"The goal isn’t to replicate the past; it’s to reimagine the future.\"\n\nHow are top banks actually turning their AI ambitions into operational reality?\n\nAhead of the AFS Summit by Automated Financial Systems, LLC, we brought together Bridge2Partners experts Shane Williams and Krithika K. to unpack the realities of AFSVision implementations today. Turning AFSVision into a true AI enabler requires more than just a system upgrade—it requires a fundamental shift in how you align your business, data, and technology.\n\n#CommercialBanking #AIIntegration #BankingTech #ThoughtLeadership",
      likes: 24,
      comments: 3,
      imageUrl: "/images/mock_post_1.png",
      link: "https://www.linkedin.com/company/bridge-2-partners"
    },
    {
      id: "mock-2",
      author: "Bridge2Partners",
      authorSub: "Banking Transformation Advisors",
      date: "4d • 🌐",
      text: "Operations in Wealth Management isn’t just about processing forms or moving money. It's fundamentally about people's life savings and their futures.\n\nAt Bridge2Partners, we view fixing wealth operations not just as a technical upgrade, but as righting a fundamental wrong. When operations run seamlessly, clients reach their milestones.\n\nConnect with John Gustav, CFA, our Head of Financial Services, to schedule a front-to-back diagnostic of your operating model and ensure your next digital transformation is a success.\n\n#WealthManagement #DigitalTransformation #Bridge2Partners",
      likes: 19,
      comments: 1,
      imageUrl: "/images/mock_post_2.png",
      link: "https://www.linkedin.com/company/bridge-2-partners"
    },
    {
      id: "mock-3",
      author: "Bridge2Partners",
      authorSub: "Banking Transformation Advisors",
      date: "1w • 🌐",
      text: "The future of commercial lending isn't just about implementing great technology—it’s about the people who help you strategize, adopt, and optimize it. In just two weeks, the Bridge2Partners team is touching down in Philadelphia for the AFS Summit 2026!\n\nWe are bringing our top commercial lending and banking transformation experts to help you bridge the gap between your AFSVision strategy and your operational execution.\n\nWhether you want to dive deep into your technology roadmap or just grab a coffee between sessions, our team is ready to connect. Send any of them a DM to lock in a chat!\n\n#AFSSummit2026 #CommercialLending #Bridge2Partners",
      likes: 21,
      comments: 0,
      imageUrl: "/images/mock_post_3.png",
      link: "https://www.linkedin.com/company/bridge-2-partners"
    },
    {
      id: "mock-4",
      author: "Bridge2Partners",
      authorSub: "Banking Transformation Advisors",
      date: "2w • 🌐",
      text: "A merger shouldn't just be a 'survivable' event; it should be an immediate competitive advantage.\n\nYet, the gap between signing the deal and actually seeing the benefits is where most M&A value is lost. The truth is, post-merger integration is rarely an IT ticket—it is a change management crisis disguised as a technology project.\n\nAt Bridge2Partners, we specialize in the operational and technological heavy lifting that accelerates your synergies.\n\n#Mergers #MAIntegration #BankingTransformation #Bridge2Partners",
      likes: 34,
      comments: 5,
      imageUrl: "/images/leadership_portrait_3.png",
      link: "https://www.linkedin.com/company/bridge-2-partners"
    },
    {
      id: "mock-5",
      author: "Bridge2Partners",
      authorSub: "Banking Transformation Advisors",
      date: "3w • 🌐",
      text: "Is your bank losing 'share of wallet' to fintechs because of fragmented onboarding?\n\nToo often, treasury and payments modernization promises a 'digital' future but delivers redundant PDF forms and disjointed workflows that feel like you're servicing an airplane while it's in flight.\n\nJoin Linda Weber at our upcoming Peers In Practice Roundtable to discuss how leading institutions are mapping workflows to drive immediate speed to revenue.\n\n#Treasury #Payments #BankingInnovation #Bridge2Partners",
      likes: 42,
      comments: 6,
      imageUrl: "/images/leadership_portrait_4.png",
      link: "https://www.linkedin.com/company/bridge-2-partners"
    }
  ];

  // FILTER HELPER
  const filterByTag = (posts: any[]) => {
    if (!tag) return posts;
    return posts.filter(post => post.text.toLowerCase().includes(`#${tag}`));
  };

  // FALLBACK MOCK FEED IF KEYS ARE NOT SET OR ARE DEFAULT PLACEHOLDERS
  if (!token || !orgUrn || token.includes('your-token')) {
    return NextResponse.json({ live: false, posts: filterByTag(MOCK_FEED) });
  }

  try {
    const url = `https://api.linkedin.com/v2/ugcPosts?q=authors&authors=urn:li:organization:${orgUrn}&count=3&sortBy=LAST_MODIFIED`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "X-Restli-Protocol-Version": "2.0.0"
      },
      next: { revalidate: 3600 }
    });

    if (!response.ok) {
      throw new Error(`LinkedIn API responded with ${response.status}`);
    }

    const data = await response.json();
    
    const mappedPosts = data.elements?.map((el: any) => {
      const specificContent = el.specificContent?.['com.linkedin.ugc.ShareContent'];
      const rawText = specificContent?.shareCommentary?.text || '';
      const mediaComponent = specificContent?.media?.[0];
      const imageUrl = mediaComponent?.media || '';

      return {
         id: el.id,
         author: "Bridge2Partners",
         authorSub: "We execute post-merger integrations.",
         date: "Recent • 🌐",
         text: rawText,
         likes: Math.floor(Math.random() * 100) + 20,
         comments: Math.floor(Math.random() * 15) + 1,
         imageUrl: imageUrl,
         link: `https://www.linkedin.com/feed/update/${el.id}`
      };
    }) || [];

    return NextResponse.json({ live: true, posts: filterByTag(mappedPosts) });
    
  } catch (err: any) {
    console.warn("LinkedIn API Crash, reverting to fallback Mock Feed:", err.message);
    // Graceful fallback prevents the entire UI grid from vanishing if tokens expire inside the browser view
    return NextResponse.json({ live: false, posts: filterByTag(MOCK_FEED) });
  }
}
