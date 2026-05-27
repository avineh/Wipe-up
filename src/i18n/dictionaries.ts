// import { dd } from "framer-motion/client";

export const dictionaries = {
  en: {
    nav: {
      roadmap: 'Roadmap',
      team: 'Team',
      plan: 'Plan & Financials',
      quickGlance: 'Quick Glance',
      technology: 'Technology',
      investors: 'Investors',
      faq: 'FAQ',
      contact: 'Contact',
      investNow: 'Invest Now',
      switchLang: 'HE'
    },
    hero: {
      title: 'WipeUp',
      subtitle: 'A New Hygiene Experience.',
      downloadPptx: 'Download Pitch Deck (PPTX)',
      downloadPdf: 'Download Pitch Deck (PDF)',
      viewOnePagerEn: 'View One Pager (EN)',
      viewOnePagerHe: 'View One Pager (HE)',
    },
    roadmap: {
      title: 'Roadmap – From Concept to Execution',
      completed: {
        title: 'Completed Stages',
        items: [
          { title: 'Ideation & Proof of Concept (POC)', text: 'A functional prototype was built, successfully demonstrating micro-mist wetting without tearing the paper.' },
          { title: 'Global Go-To-Market Strategy & Market Analysis', text: 'Market analysis across the US, Europe, Japan, and Israel, identifying a 15–20% adoption potential in the Israeli market.' },
          { title: 'Intellectual Property Protection (Patent analysis)', text: 'Patent application No. 327637 filed under an accelerated track, protecting the spiral mechanism and consumable lock-in system.' },
          { title: 'Full Engineering Definition & PRD Completion', text: 'Completion of PRD Version 6.0, including a fully closed-system architecture.' }
        ]
      },
      current: {
        title: 'Current Stage',
        items: [
          { title: 'Engineering Documentation', text: 'Transition from conceptual designs to full engineering documentation (STEP files + BOM).' },
          { title: 'The Green Track – De-risking Seed Investment', text: 'The venture is now on "The Green Track": the business significance of completing the POC and early engineering definition is dramatic de-risking for Seed-stage investors. Since technological feasibility is proven and specifications are aligned, the risk of design failure during the prototype phase is virtually zero. This significantly shortens Time-to-Market and secures mass production costs against unexpected budget overruns. This represents the highest value-add of the current stage.' }
        ]
      },
      future: {
        title: 'Future Milestones',
        items: [
          { title: 'Months 0–5', text: 'Development of a complete engineering prototype for presentation to paper corporations.' },
          { title: 'Months 6–12', text: 'Establishment of manufacturing infrastructure (CAPEX: ₪490,000), including cutting and packaging machines.' },
          { title: 'Months 12–18', text: 'Pilot in Israel (local production via partners like Hogla/Sano to reduce logistics costs), CE/FDA certification, and global launch.' }
        ]
      },
      registeredDesign: {
        title: 'Legal Milestone – Registered Design Approved',
        items: [
          { title: 'Legal Impact', text: 'This approval grants the company verified, exclusive intellectual property rights over the product\'s aesthetics, visual form, and ergonomics. It establishes an immediate legal barrier, completely blocking competitors from cloning or mimicking the device\'s appearance and allowing rapid enforcement against infringements.' },
          { title: 'Operational Impact', text: 'This approval eliminates any risk of future design-related legal injunctions, clearing the path for direct investment in mass-production injection molds (Tooling) with absolute confidence, ensuring long-term supply chain stability.' }
        ]
      }
    },
    team: {
      title: 'Human Capital – Team & Ownership',
      members: [
        { name: 'Asher', role: 'Founder & VP Operations', desc: 'A hygiene domain expert with deep industry knowledge, responsible for supplier relations, global paper manufacturers, and leading market research.' },
        { name: 'Avi Nehama', role: 'Partner, VP R&D & Information Systems', desc: 'Brings a strong IT background. Leads digital infrastructure, website development, investment platforms, and technical synchronization. Equity: 18%' },
        { name: 'Shimon', role: 'Operations & Procurement Manager', desc: 'Handles financial operations, banking activities, regulatory processes, and legal registrations.' }
      ]
    },
    financials: {
      title: 'Work Plan & Financials',
      investmentToDate: '~₪320,000',
      investmentDesc: '(₪200K cash + ₪120K founder work hours)',
      fundingRequirement: '₪900,000',
      allocation: [
        { label: 'R&D (Prototype)', value: '$20K–$25K' },
        { label: 'CAPEX', value: '₪490K' },
        { label: 'IP & Regulation', value: '₪85K' }
      ],
      capexBreakdown: [
        { label: 'Main machine', value: '₪300K' },
        { label: 'Packaging', value: '₪40K' },
        { label: 'Shrink', value: '₪20K' },
        { label: 'Office & infrastructure', value: '₪130K' }
      ],
      opex: '~₪22,000/month (rent, taxes, insurance)'
    },
    quickGlance: {
      title: 'Quick Glance',
      scene1: 'Wet wipes clog pipes and bidets require plumbing. Traditional dry paper is primitive and uncomfortable.',
      scene2: 'Choose your comfort: Press Button A for custom-length dry paper, or Button B for perfectly moistened paper via our internal micro-mist system.',
      scene3: 'A 23° ceramic blade cuts cleanly. Enjoy a hygienic, eco-friendly bidet experience without the plumbing.'
    },
    technology: {
      title: 'Technical Overview (Specs & IP)',
      specs: [
        { title: 'Dispensing & Cutting', text: 'Custom length (0-30cm) with IR sensors + rotary encoder (±2mm accuracy)' },
        { title: 'Moistening System', text: 'Dermatologically approved liquid spray system that won\'t clog' },
        { title: 'Power & Protection', text: '2 AA lithium batteries (8–12 months), IPX4 moisture resistance' }
      ],
      ip: {
        title: 'Patent No. 327637',
        items: [
          'Dual-dispensing (Dry/Wet) mechanism',
          '450mm spiral path & mist regulation',
          'Proprietary lock-in mechanism for consumables'
        ],
        extensionsTitle: 'Extensions',
        extensions: [
          'Baby version (hypoallergenic)',
          'Institutional version (anti-vandal design)'
        ]
      }
    },
    investors: {
      title: 'Investor Portal',
      valuation: '₪2.4M',
      valuationLabel: 'Pre-money valuation',
      termsTitle: 'Investment Terms',
      terms: [
        { stage: 'Current stage', terms: '$20,000 per 1% (minimum 10%)' },
        { stage: 'Post-prototype', terms: '$50,000 per 1%' },
        { stage: 'Post-pilot projection', terms: '~$10M valuation (~$100K per 1%)' }
      ],
      modelTitle: 'Business Model (Razor & Blades)',
      modelItems: [
        'High-penetration device pricing (~$25)',
        '100% Lock-in on proprietary paper rolls & liquid',
        'Annual revenue per household: ~$88',
        'Gross profit per household: ~$52'
      ]
    },
    faq: {
      title: 'FAQ – Investor & Customer Insights',
      questions: [
        { q: 'How does the Lock-in model work?', a: 'A proprietary asymmetric sleeve ensures only original consumables activate the wet function.' },
        { q: 'Does it require plumbing or professional installation?', a: 'No plumbing is required. It is a simple wall-mounted device powered by batteries, functioning as a complete bidet alternative.' },
        { q: 'Will the paper clog my pipes?', a: 'No. Unlike standard wet wipes that cause severe plumbing issues, WipeUp uses standard toilet paper that is moistened on demand, making it 100% flushable and eco-friendly.' },
        { q: 'What does the patent cover?', a: 'The spiral path (450mm), micro-mist system, and consumable detection mechanism.' },
        { q: 'How is the ₪2.4M valuation justified?', a: 'Based on: ₪320K already invested, Engineering maturity (PRD), IP protection, $90B market potential.' },
        { q: 'Logistics?', a: 'Centralized device production + localized paper production to reduce shipping costs.' },
        { q: 'Maintenance?', a: 'Minimal. Powered by standard AA batteries (8–12 months).' },
        { q: 'Is the liquid safe?', a: 'Yes. Dermatologically tested, hypoallergenic, alcohol-free, pH-balanced, compliant with CE/FDA standards.' },
        { q: 'Expected profitability per household?', a: '~$88 revenue, ~$52 gross profit annually.' }
      ]
    },
    contact: {
      title: 'Contact',
      cta: 'Want more details? Contact us for full technical and investment data.',
      form: {
        name: 'Name',
        phone: 'Phone',
        email: 'Email',
        company: 'Company',
        message: 'Message',
        userType: 'I am a...',
        types: {
          investor: 'Investor',
          partner: 'Business Partner',
          customer: 'Interested Customer'
        },
        newsletter: 'Sign up for newsletter',
        submit: 'Send Message',
        success: 'Thank you! Your information has been received. The WipeUp team will get back to you shortly.'
      }
    }
  },
  he: {
    nav: {
      roadmap: 'מפת דרכים',
      team: 'צוות',
      plan: 'תוכנית ופיננסים',
      quickGlance: 'מבט מהיר',
      technology: 'טכנולוגיה',
      investors: 'משקיעים',
      faq: 'שאלות ותשובות',
      contact: 'צור קשר',
      investNow: 'השקע עכשיו',
      switchLang: 'EN'
    },
    hero: {
      title: 'WipeUp',
      subtitle: 'חוויית היגיינה חדשה.',
      downloadPptx: 'הורדת מצגת (PPTX)',
      downloadPdf: 'הורדת מצגת (PDF)',
      viewOnePagerEn: 'צפייה בתקציר (אנגלית)',
      viewOnePagerHe: 'צפייה בתקציר (עברית)',
    },
    roadmap: {
      title: 'מפת דרכים – מקונספט לביצוע',
      completed: {
        title: 'שלבים שהושלמו',
        items: [
          { title: 'הוכחת היתכנות (POC)', text: 'אב-טיפוס עובד מדגים בהצלחה הרטבה באמצעות ערפל-מיקרו ללא קריעת הנייר.' },
          { title: 'אסטרטגיית חדירה לשוק גלובלית וניתוח שוק', text: 'ניתוח שוק בארה"ב, אירופה, יפן וישראל, עם פוטנציאל אימוץ של 15-20% בשוק הישראלי.' },
          { title: 'הגנה על קניין רוחני (בחינת פטנטביליות)', text: 'בקשת פטנט מס\' 327637 הוגשה במסלול מזורז, המגנה על המנגנון הספירלי ונעילת החומרים המתכלים.' },
          { title: 'אפיון הנדסי מלא והשלמת PRD', text: 'השלמת PRD גרסה 6.0, כולל ארכיטקטורת מערכת סגורה מלאה.' }
        ]
      },
      current: {
        title: 'שלב נוכחי',
        items: [
          { title: 'תיעוד הנדסי', text: 'מעבר מעיצובים קונספטואליים לתיעוד הנדסי מלא (קבצי STEP + BOM).' },
          { title: 'המסלול הירוק – הפחתת סיכונים', text: 'המיזם נמצא כעת ב"מסלול הירוק": השלמת ה-POC ואפיון הנדסי מוקדם משמעותם הפחתת סיכונים דרמטית עבור משקיעי Seed. היתכנות טכנולוגית כבר הוכחה והמפרט מיושר, כך שהסיכון לכשל תכנוני בשלב האב-טיפוס שואף לאפס. זה מקצר משמעותית את זמן ההגעה לשוק ומגן על עלויות הייצור ההמוני מפני חריגות תקציב בלתי צפויות. זהו הערך המוסף הגבוה ביותר של השלב הנוכחי.' }
        ]
      },
      future: {
        title: 'אבני דרך עתידיות',
        items: [
          { title: 'חודשים 0–5', text: 'פיתוח אב-טיפוס הנדסי מלא להצגה לתאגידי נייר.' },
          { title: 'חודשים 6–12', text: 'הקמת תשתית ייצור (השקעה הונית: ₪490,000), כולל מכונות חיתוך ואריזה.' },
          { title: 'חודשים 12–18', text: 'פיילוט בישראל (ייצור מקומי בשיתוף פעולה להפחתת עלויות לוגיסטיקה), אישורי CE/FDA, והשקה גלובלית.' }
        ]
      },
      registeredDesign: {
        title: 'אבני דרך משפטית – אישור מדגם רשום',
        items: [
          { title: 'ממד משפטי', text: 'אישור זה מעניק לחברה זכויות קניין רוחני מוכחות ובלעדיות מוחלטת על האסתטיקה, הצורה החזותית והארגונומיה של המוצר. הוא יוצר מחסום משפטי מיידי שמונע לחלוטין מתחרים להעתיק או לחקות את מראה המכשיר, ומאפשר אכיפה מהירה כנגד הפרות.' },
          { title: 'ממד תפעולי', text: 'אישור זה מסיר כל סיכון לעיכובים משפטיים עתידיים הקשורים לעיצוב, ופותח את הדרך להשקעה ישירה בבניית תבניות ההזרקה ההמוניות (Tooling) בביטחון מוחלט, ובכך מבטיח יציבות ארוכת טווח בשרשרת האספקה.' }
        ]
      }
    },
    team: {
      title: 'הון אנושי – צוות ובעלות',
      members: [
        { name: 'אשר', role: 'מייסד וסמנכ"ל תפעול', desc: 'מומחה בתחום ההיגיינה עם היכרות עמוקה של התעשייה, אחראי על קשרי ספקים, יצרני נייר גלובליים והובלת מחקרי שוק.' },
        { name: 'אבי נחמה', role: 'שותף, סמנכ"ל מו"פ ומערכות מידע', desc: 'רקע עשיר ב-IT. מוביל את התשתית הדיגיטלית, פיתוח האתר, פלטפורמות השקעה וסנכרון טכני. החזקה: 18%' },
        { name: 'שמעון', role: 'מנהל תפעול ורכש', desc: 'מטפל בפעולות פיננסיות, פעילות בנקאית, תהליכים רגולטוריים ורישומים משפטיים.' }
      ]
    },
    financials: {
      title: 'תוכנית עבודה ופיננסים',
      investmentToDate: '~₪320,000',
      investmentDesc: '(₪200K מזומן + ₪120K שעות עבודת מייסדים)',
      fundingRequirement: '₪900,000',
      allocation: [
        { label: 'מו"פ (אב-טיפוס)', value: '$20K–$25K' },
        { label: 'השקעה הונית', value: '₪490K' },
        { label: 'קניין רוחני ורגולציה', value: '₪85K' }
      ],
      capexBreakdown: [
        { label: 'מכונה מרכזית', value: '₪300K' },
        { label: 'אריזה', value: '₪40K' },
        { label: 'שרינק', value: '₪20K' },
        { label: 'משרד ותשתיות', value: '₪130K' }
      ],
      opex: '~₪22,000/חודש (שכירות, מיסים, ביטוח)'
    },
    quickGlance: {
      title: 'מבט מהיר',
      scene1: 'מגבונים לחים סותמים את הצנרת והתקנת בידה דורשת אינסטלציה. הניקיון המסורתי בנייר יבש הוא פרימיטיבי ולא נוח.',
      scene2: 'בחרו את הנוחות שלכם: לחצו על כפתור א\' לנייר יבש באורך מותאם אישית, או על כפתור ב\' לנייר לח במידה המושלמת, באמצעות מערכת ערפל-מיקרו פנימית.',
      scene3: 'להב קרמי ב-23° חותך בצורה חלקה. תיהנו מחוויית בידה היגיינית וידידותית לסביבה, ללא צורך באינסטלציה.'
    },
    technology: {
      title: 'סקירה טכנית (מפרט וקניין רוחני)',
      specs: [
        { title: 'ניפוק וחיתוך', text: 'אורך מותאם אישית (0-30 ס"מ) עם חיישני אינפרא אדום + מקודד סיבובי (דיוק חיתוך של ±2 מ"מ)' },
        { title: 'מערכת הרטבה', text: 'מערכת התזת נוזל מאושרת דרמטולוגית שאינה סותמת את המתזים' },
        { title: 'כוח והגנה', text: '2 סוללות ליתיום AA (8-12 חודשים), עמידות ללחות IPX4' }
      ],
      ip: {
        title: 'פטנט מס\' 327637',
        items: [
          'מנגנון ניפוק כפול (יבש/לח)',
          'מסלול ספירלי (450 מ"מ) וויסות הנוזל',
          'מנגנון נעילת חומרים מתכלים ייחודי'
        ],
        extensionsTitle: 'הרחבות',
        extensions: [
          'גרסת תינוקות (היפואלרגנית)',
          'גרסה מוסדית (עיצוב מונע ונדליזם)'
        ]
      }
    },
    investors: {
      title: 'פורטל משקיעים',
      valuation: '₪2.4M',
      valuationLabel: 'הערכת שווי לפני הכסף',
      termsTitle: 'תנאי השקעה',
      terms: [
        { stage: 'שלב נוכחי', terms: '$20,000 לכל 1% (מינימום 10%)' },
        { stage: 'לאחר אב-טיפוס', terms: '$50,000 לכל 1%' },
        { stage: 'תחזית לאחר פיילוט', terms: 'הערכת שווי ~$10M (~$100K לכל 1%)' }
      ],
      modelTitle: 'מודל עסקי (סכין ולהבים)',
      modelItems: [
        'תמחור חדירה תחרותי למכשיר (~$25)',
        'נעילת לקוחות (Lock-in) לגלילי נייר ונוזל ייעודיים',
        'הכנסה שנתית למשק בית: ~$88',
        'רווח גולמי למשק בית: ~$52'
      ]
    },
    faq: {
      title: 'שאלות ותשובות – תובנות משקיעים ולקוחות',
      questions: [
        { q: 'כיצד עובד מודל הנעילה?', a: 'שרוול אסימטרי ייחודי מבטיח שרק חומרים מתכלים מקוריים יפעילו את הפונקציה הרטובה.' },
        { q: 'האם נדרשת התקנה מקצועית או אינסטלציה?', a: 'לא נדרשת אינסטלציה. המכשיר מתחבר בקלות לקיר ומופעל על ידי סוללות, ומהווה תחליף בידה מלא.' },
        { q: 'האם הנייר יסתום את הצנרת?', a: 'לא. בניגוד למגבונים לחים סטנדרטיים הגורמים לנזקי צנרת קשים, WipeUp משתמש בנייר טואלט שמוזרק עליו נוזל רק בעת השימוש, כך שהוא 100% נשטף באסלה וידידותי לסביבה.' },
        { q: 'מה מכסה הפטנט?', a: 'המסלול הספירלי (450 מ"מ), מערכת ערפל-המיקרו, ומנגנון זיהוי החומרים המתכלים.' },
        { q: 'איך מוצדקת הערכת השווי של 2.4 מיליון ₪?', a: 'מבוסס על: 320 אלף ₪ שכבר הושקעו, בשלות הנדסית (PRD), הגנה על קניין רוחני, פוטנציאל שוק של 90 מיליארד דולר.' },
        { q: 'לוגיסטיקה?', a: 'ייצור מכשירים מרוכז + ייצור נייר מקומי להפחתת עלויות שילוח.' },
        { q: 'תחזוקה?', a: 'מינימלית. מופעל על ידי סוללות AA סטנדרטיות (8-12 חודשים).' },
        { q: 'האם הנוזל בטוח?', a: 'כן. מאושר דרמטולוגית, היפואלרגני, ללא אלכוהול, מאוזן pH, תואם לתקני CE/FDA.' },
        { q: 'רווחיות צפויה למשק בית?', a: '~$88 הכנסה, ~$52 רווח גולמי בשנה.' }
      ]
    },
    contact: {
      title: 'צור קשר',
      cta: 'מעוניינים בפרטים נוספים? צרו קשר לקבלת הנתונים הטכניים ונתוני ההשקעה המלאים.',
      form: {
        name: 'שם',
        phone: 'טלפון',
        email: 'אימייל',
        company: 'חברה',
        message: 'הודעה',
        userType: 'אני...',
        types: {
          investor: 'משקיע',
          partner: 'שותף עסקי',
          customer: 'לקוח מתעניין'
        },
        newsletter: 'הרשמה לניוזלטר',
        submit: 'שלח הודעה',
        success: 'תודה! המידע שלך התקבל. צוות WipeUp יחזור אליך בקרוב.'
      }
    }
  }
};

export type Dictionary = typeof dictionaries.en;
