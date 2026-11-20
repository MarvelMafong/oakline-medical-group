export type Article = {
  slug: string; title: string; category: string; tags: string[]; author: string; authorSlug: string; date: string; updated: string;
  img: string; imgPos?: string; summary: string; sections: { h: string; p: string[] }[]; refs: { t: string; url: string }[]; related: string[];
};

export const ARTICLES: Article[] = [
  {
    slug: 'what-to-bring-to-your-first-visit', title: 'What to bring to your first visit', category: 'Visit prep', tags: ['first visit', 'checklist', 'paperwork'],
    author: 'Dr. Jordan Ellis', authorSlug: 'jordan-ellis', date: '2026-03-04', updated: '2026-09-12', img: 'gallery-reception',
    summary: 'A short checklist that makes check-in quick and leaves more time for your questions.',
    sections: [
      { h: 'The short list', p: ['Bring a photo ID, your insurance card and a list of the medicines you take. That is enough for most first visits.', 'If you use a pharmacy regularly, write down its name and location. It saves time if your doctor needs to send a prescription.'] },
      { h: 'Your medicine list', p: ['Include prescriptions, over-the-counter products, vitamins and anything you take only now and then. Add the dose and how often you take it, if you know.', 'Photos of the labels on your phone work well. So does a clear handwritten list. The goal is a complete picture, not perfect paperwork.'] },
      { h: 'Records from other clinics', p: ['If you have recent records, such as vaccine cards or the names of doctors you have seen, bring them. If not, our staff can help you ask for them after your visit.'] },
      { h: 'Questions you want answered', p: ['Write down two or three things you would like to talk about. Visits can move quickly, and a short list keeps the important things from slipping away.', 'You are welcome to bring a friend or family member for support.'] },
      { h: 'Arriving', p: ['Plan to arrive about ten minutes early. If you need an interpreter, large print or help getting around, tell our front desk when we call to confirm your time.'] },
    ],
    refs: [{ t: 'MedlinePlus: talking with your health care provider', url: 'https://medlineplus.gov/' }], related: ['questions-worth-asking-your-doctor', 'how-appointment-requests-work', 'keeping-a-simple-medicine-list'],
  },
  {
    slug: 'getting-the-most-from-a-checkup', title: 'Getting the most from a checkup', category: 'Everyday health', tags: ['checkup', 'prevention', 'primary care'],
    author: 'Dr. Maya Okafor', authorSlug: 'maya-okafor', date: '2026-03-18', updated: '2026-08-02', img: 'dept-primary-care', imgPos: '50% 30%',
    summary: 'Simple ways to prepare, so a routine checkup turns into a plan you can follow.',
    sections: [
      { h: 'Why routine visits matter', p: ['A checkup is a chance to talk about your health when nothing is wrong. Your doctor can update vaccines, review screenings that fit your age and answer questions that have been on your mind.'] },
      { h: 'Before you go', p: ['Think about what has changed since your last visit, such as sleep, stress, activity or new medicines. You do not need to diagnose anything. Just notice what is different.', 'Bring your medicine list and note any questions in your phone.'] },
      { h: 'During the visit', p: ['Say what matters most to you first. If you only have time for one topic, start there.', 'If something is unclear, ask your doctor to say it another way. Good explanations are part of good care.'] },
      { h: 'After the visit', p: ['Before you leave, repeat back the next steps in your own words. Ask when and how you will hear about any tests, and who to call if you have questions.'] },
    ],
    refs: [{ t: 'MedlinePlus: health screening and checkups', url: 'https://medlineplus.gov/' }], related: ['questions-worth-asking-your-doctor', 'what-to-bring-to-your-first-visit', 'what-to-expect-from-a-test-or-scan'],
  },
  {
    slug: 'questions-worth-asking-your-doctor', title: 'Questions worth asking your doctor', category: 'Talking with your team', tags: ['questions', 'communication', 'plain language'],
    author: 'Dr. Jordan Ellis', authorSlug: 'jordan-ellis', date: '2026-04-02', updated: '2026-07-19', img: 'hero-consultation',
    summary: 'A handful of open questions that help you leave a visit knowing what happens next.',
    sections: [
      { h: 'Start with the plan', p: ['What is the next step, and when will it happen? That one question covers a lot. It brings out the timing, who is responsible and what you need to do.'] },
      { h: 'Ask about choices', p: ['Are there other options? What are the good and not-so-good parts of each? Your doctor can explain the choices, and you decide with them what fits your life.'] },
      { h: 'Ask about the words', p: ['If a word is new, ask what it means. Doctors use shorthand without noticing. You are never interrupting by asking for plain language.'] },
      { h: 'Ask about follow up', p: ['How will I hear about test results? Who should I call with questions? What should I do if something changes before the next visit?'] },
      { h: 'Take notes', p: ['Ask if it is okay to write things down or record a short voice note for yourself. Most doctors are happy to pause so you can catch up.'] },
    ],
    refs: [{ t: 'MedlinePlus: questions to ask your doctor', url: 'https://medlineplus.gov/' }], related: ['getting-the-most-from-a-checkup', 'what-to-bring-to-your-first-visit', 'keeping-a-simple-medicine-list'],
  },
  {
    slug: 'helping-your-child-feel-ready-for-a-doctor-visit', title: 'Helping your child feel ready for a doctor visit', category: 'Family', tags: ['children', 'pediatrics', 'parents'],
    author: 'Dr. Sam Rivera', authorSlug: 'sam-rivera', date: '2026-04-21', updated: '2026-09-01', img: 'stage-parents-and-children', imgPos: '50% 40%',
    summary: 'Gentle, honest ways to prepare children of different ages for a visit.',
    sections: [
      { h: 'Be honest and simple', p: ['Tell your child where you are going and why, in a sentence or two. Children cope better when they know what to expect than when they are surprised.'] },
      { h: 'Make room for play', p: ['A toy stethoscope and a quick game of doctor can turn an unknown place into a familiar one. Let your child examine a stuffed animal and take the lead.'] },
      { h: 'Bring comfort', p: ['A favorite blanket, a book or a snack can help. Tell the team about anything that helps your child feel calm.'] },
      { h: 'Teens deserve a voice', p: ['Older children and teens often do best when they are included in the conversation. Encourage them to ask their own questions, even if you are in the room.'] },
      { h: 'Celebrate afterward', p: ['A small treat or a park stop afterward helps the visit end on a good note and makes the next one easier.'] },
    ],
    refs: [{ t: 'CDC: vaccines and immunizations', url: 'https://www.cdc.gov/vaccines/' }], related: ['what-to-bring-to-your-first-visit', 'getting-the-most-from-a-checkup', 'how-appointment-requests-work'],
  },
  {
    slug: 'a-plain-guide-to-your-skin-check', title: 'A plain guide to your skin check', category: 'Skin care', tags: ['skin', 'dermatology', 'checks'],
    author: 'Dr. Naomi Hart', authorSlug: 'naomi-hart', date: '2026-05-06', updated: '2026-08-21', img: 'dept-dermatology', imgPos: '50% 40%',
    summary: 'What a skin check usually involves, and how to make it comfortable and useful.',
    sections: [
      { h: 'What happens', p: ['At a skin check, your dermatologist looks carefully at the skin on your body, often using a small lighted magnifier. You can ask for a gown and a private moment to change.'] },
      { h: 'Before the visit', p: ['Come with clean skin and no heavy makeup or nail polish if you can. Note any spots you want to point out. You do not need to decide whether a spot is important. Your doctor can look.'] },
      { h: 'Talking it through', p: ['Ask your dermatologist what they are looking for and what they see. If they suggest a follow-up, ask when and why.'] },
      { h: 'Looking after your skin at home', p: ['Daily sun protection, gentle cleansing and moisturizing are simple habits that help many people. Ask your doctor what fits your skin and your routine.', 'This article is general information and cannot tell you whether a spot is a concern. Only an exam can do that.'] },
    ],
    refs: [{ t: 'American Academy of Dermatology: public resources', url: 'https://www.aad.org/' }], related: ['getting-the-most-from-a-checkup', 'questions-worth-asking-your-doctor', 'keeping-a-simple-medicine-list'],
  },
  {
    slug: 'talking-about-heart-health', title: 'Talking about heart health, step by step', category: 'Heart health', tags: ['heart', 'cardiology', 'prevention'],
    author: 'Dr. Casey Morgan', authorSlug: 'casey-morgan', date: '2026-05-27', updated: '2026-10-05', img: 'dept-cardiology', imgPos: '50% 20%',
    summary: 'A calm way to prepare for a conversation about your heart and what matters to you.',
    sections: [
      { h: 'Start with you', p: ['Heart care works best when it fits your life. Before a visit, think about what you want to be able to do, such as walking with a friend, playing with grandchildren or traveling.'] },
      { h: 'Know your family story', p: ['If you know about heart conditions in your family, write them down. You do not need all the details. A rough picture helps your doctor.'] },
      { h: 'Understand the tests', p: ['If your doctor suggests a test, ask what it measures, how to prepare and how you will hear the results. Our Diagnostics team coordinates scheduling.'] },
      { h: 'Keep your team connected', p: ['Share your cardiologist visit with your primary care doctor. At Oakline they work from the same plan, which means fewer repeated questions.', 'This article is general information. If you feel unwell right now, do not wait: call 911 in an emergency.'] },
    ],
    refs: [{ t: 'American Heart Association: patient resources', url: 'https://www.heart.org/' }], related: ['what-to-expect-from-a-test-or-scan', 'questions-worth-asking-your-doctor', 'keeping-a-simple-medicine-list'],
  },
  {
    slug: 'what-to-expect-from-a-test-or-scan', title: 'What to expect from a test or scan', category: 'Tests and imaging', tags: ['tests', 'imaging', 'diagnostics'],
    author: 'Dr. Theo Vance', authorSlug: 'theo-vance', date: '2026-06-10', updated: '2026-09-28', img: 'dept-diagnostics', imgPos: '50% 55%',
    summary: 'How to prepare, what the day looks like and how results reach your doctor.',
    sections: [
      { h: 'Before you arrive', p: ['Your doctor orders the test, and our staff will tell you how to prepare. Some tests ask you to avoid food or drink for a time. Others need nothing special. Follow the instructions you were given.'] },
      { h: 'On the day', p: ['Bring the order, a photo ID and your insurance card. Tell the technologist if you are anxious or have trouble lying still. They can explain each step and help you get comfortable.'] },
      { h: 'Comfort matters', p: ['Wear comfortable clothing without metal if you can. You may be asked to change into a gown. Ask for a blanket if the room feels cool.'] },
      { h: 'After the test', p: ['Your doctor reviews the results and talks them through with you. Ask how and when you will hear. Waiting is hard, so it helps to know the plan in advance.'] },
    ],
    refs: [{ t: 'MedlinePlus: medical tests', url: 'https://medlineplus.gov/' }], related: ['talking-about-heart-health', 'getting-the-most-from-a-checkup', 'what-to-bring-to-your-first-visit'],
  },
  {
    slug: 'keeping-a-simple-medicine-list', title: 'Keeping a simple medicine list', category: 'Everyday health', tags: ['medicines', 'checklist', 'organization'],
    author: 'Dr. Maya Okafor', authorSlug: 'maya-okafor', date: '2026-07-08', updated: '2026-10-15', img: 'stage-older-adults', imgPos: '50% 30%',
    summary: 'A one-page list that makes every visit smoother, for you and for anyone who helps you.',
    sections: [
      { h: 'What goes on the list', p: ['Write down the name of each medicine, the dose and how often you take it. Include vitamins, supplements and things you take only sometimes.'] },
      { h: 'Keep it where you can find it', p: ['A note in your phone, a photo of the page or a card in your wallet all work. Share a copy with someone you trust.'] },
      { h: 'Update it', p: ['Change the list whenever something starts, stops or changes. Bring it to every visit, even if you think nothing has changed.'] },
      { h: 'Ask about it', p: ['At each visit, ask whether the list matches what your doctor has on file. It is a quick check that keeps everyone on the same page.'] },
    ],
    refs: [{ t: 'MedlinePlus: medicines and your health', url: 'https://medlineplus.gov/' }], related: ['what-to-bring-to-your-first-visit', 'questions-worth-asking-your-doctor', 'getting-the-most-from-a-checkup'],
  },
  {
    slug: 'how-appointment-requests-work', title: 'How an appointment request works', category: 'Visit prep', tags: ['appointments', 'requests', 'first visit'],
    author: 'Dr. Jordan Ellis', authorSlug: 'jordan-ellis', date: '2026-08-12', updated: '2026-10-30', img: 'hero-care-team',
    summary: 'What happens after you send a request, and why a request is not a confirmed appointment.',
    sections: [
      { h: 'You send a request', p: ['Choose a department, a doctor if you have a preference and a time that suits you. We never ask about symptoms or medical history in a request.'] },
      { h: 'Our staff reply', p: ['A person on our team reviews your request and contacts you to confirm a time, or to offer another one. Until then, your request is not a confirmed appointment.'] },
      { h: 'You can check or change it', p: ['Use your request reference and last name on the Check a request page to see your status, ask to reschedule or cancel.'] },
      { h: 'Urgent needs', p: ['A request is not the right path for an urgent problem. Call the front desk, or call 911 in an emergency.'] },
    ],
    refs: [], related: ['what-to-bring-to-your-first-visit', 'getting-the-most-from-a-checkup', 'helping-your-child-feel-ready-for-a-doctor-visit'],
  },
];

export const articleBySlug = (s: string) => ARTICLES.find((a) => a.slug === s);
export const wordCount = (a: Article) => a.sections.reduce((n, s) => n + s.p.join(' ').split(/\s+/).length, 0);
export const readMins = (a: Article) => Math.max(2, Math.round(wordCount(a) / 200));
export const CATEGORIES = [...new Set(ARTICLES.map((a) => a.category))];
export const TAGS = [...new Set(ARTICLES.flatMap((a) => a.tags))].sort();
export const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
