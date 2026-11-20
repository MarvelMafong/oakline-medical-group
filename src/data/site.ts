export const SITE = {
  name: 'Oakline Medical Group',
  short: 'Oakline',
  tagline: 'Care that connects every stage of life.',
  phone: '(404) 555-0142',
  tel: '+14045550142',
  addressLine: 'Central Perimeter, Sandy Springs, Georgia',
  address: ['100 Oakline Plaza, Suite 200', 'Sandy Springs, GA 30328'],
  hours: 'Monday to Friday, 8 AM to 5 PM',
  formNote: 'Demonstration form. Requests are not sent to a clinic.',
  fine: 'Oakline Medical Group is a fictional clinic, and Oakline is a working name pending trademark and domain checks.',
};

export type Dept = {
  slug: string;
  name: string;
  short: string;
  img: string;
  imgPos?: string;
  card: string; // bento class
  intro: string;
  who: string;
  services: { t: string; d: string }[];
  visit: string[];
  faqs: { q: string; a: string }[];
  connects: string[];
};

export const DEPTS: Dept[] = [
  {
    slug: 'primary-care', name: 'Primary Care', short: 'Checkups and everyday health', img: 'dept-primary-care', card: 'pc',
    intro: 'Primary care is the home base for your health. Your Oakline primary care doctor gets to know you, keeps your records in one place and connects you to the other five departments when you need them.',
    who: 'Adults and teens who want one doctor for checkups, vaccines, screenings, and questions about everyday health.',
    services: [
      { t: 'Annual and routine checkups', d: 'Time to talk through your health, update vaccines and plan the year ahead.' },
      { t: 'Screenings and prevention', d: 'Age-appropriate screenings explained in plain words, with time for your questions.' },
      { t: 'Ongoing care planning', d: 'Regular visits for long-term health needs, with one plan shared across your team.' },
      { t: 'Referrals and coordination', d: 'A direct line to Cardiology, Dermatology, Women\'s Health, Diagnostics and Pediatrics.' },
    ],
    visit: ['Bring a photo ID, your insurance card and a list of the medicines you take.', 'Plan to arrive ten minutes early for check-in.', 'Your doctor listens first, then talks through next steps with you.'],
    faqs: [
      { q: 'Can I choose my primary care doctor?', a: 'Yes. Pick a doctor in the request form or choose "First available" and our staff will match you.' },
      { q: 'Do you offer same-day visits?', a: 'Same-day times depend on the schedule. Call the front desk to ask, or request the next open time online.' },
      { q: 'What if I need a specialist?', a: 'Your primary care doctor will help arrange the next step inside Oakline, so your care stays connected.' },
    ],
    connects: ['Pediatrics', "Women's Health", 'Cardiology', 'Dermatology', 'Diagnostics'],
  },
  {
    slug: 'womens-health', name: "Women's Health", short: 'Care for each season of life', img: 'dept-womens-health', card: 'wh', imgPos: '22% 28%',
    intro: 'Women\'s Health offers private, unhurried visits for every season of life, from routine exams to planning ahead, with a team that explains each step.',
    who: 'Women and girls of any age who want routine exams, screenings, family planning conversations or support through life changes.',
    services: [
      { t: 'Well-woman exams', d: 'Routine exams and screenings with time to ask anything.' },
      { t: 'Family planning conversations', d: 'Options explained clearly, with no pressure.' },
      { t: 'Support through life changes', d: 'Guidance and follow-up as your needs change over the years.' },
      { t: 'Coordinated referrals', d: 'Easy hand-offs to Primary Care, Diagnostics and Cardiology.' },
    ],
    visit: ['Bring a photo ID and your insurance card.', 'You are welcome to bring a friend or family member.', 'Ask for a chaperone or an interpreter at any time.'],
    faqs: [
      { q: 'Can I request a woman doctor?', a: 'Yes. Mention your preference in the request and our staff will do their best to match it.' },
      { q: 'How long is a routine visit?', a: 'Plan for about 30 to 45 minutes, including check-in.' },
      { q: 'Can I see Women\'s Health and Primary Care on the same day?', a: 'Often, yes. Tell our staff when we call to confirm and we will look at back-to-back times.' },
    ],
    connects: ['Primary Care', 'Diagnostics', 'Cardiology'],
  },
  {
    slug: 'pediatrics', name: 'Pediatrics', short: 'Friendly visits for growing families', img: 'dept-pediatrics', card: 'pe',
    intro: 'Pediatrics at Oakline makes visits easy for children and calm for parents, with bright rooms, clear explanations and one team for the whole family.',
    who: 'Babies, children and teens, and the parents and caregivers who support them.',
    services: [
      { t: 'Well-child visits', d: 'Growth checks and routine care at every age.' },
      { t: 'Vaccines', d: 'Schedules explained plainly, with time for your questions.' },
      { t: 'School and camp forms', d: 'Paperwork handled at visits so it does not become a chore.' },
      { t: 'Family connection', d: 'Easy coordination with Primary Care for parents and grandparents.' },
    ],
    visit: ['Bring your child\'s vaccine record if you have one.', 'Comfort items and snacks are welcome.', 'Tell us about any worries and we will make time for them.'],
    faqs: [
      { q: 'At what age can my child start seeing a pediatrician here?', a: 'We welcome families from the first weeks of life through the teen years.' },
      { q: 'Can the whole family see the doctors on the same day?', a: 'We can often arrange back-to-back times. Mention it when we call to confirm.' },
      { q: 'What should I bring?', a: 'A photo ID for the parent or guardian, an insurance card and any vaccine records.' },
    ],
    connects: ['Primary Care', 'Dermatology', 'Diagnostics'],
  },
  {
    slug: 'cardiology', name: 'Cardiology', short: 'Heart care, explained plainly', img: 'dept-cardiology', card: 'cd',
    intro: 'Cardiology at Oakline focuses on clear explanations. Your cardiologist works with your primary care doctor, so every part of your heart care is shared and easy to follow.',
    who: 'Adults who have been referred for heart care, or who want a conversation about heart health.',
    services: [
      { t: 'Heart health consultations', d: 'A calm conversation about your heart health and what matters to you.' },
      { t: 'Coordinated testing', d: 'Tests scheduled with our Diagnostics team, with results shared in one place.' },
      { t: 'Follow-up visits', d: 'Regular check-ins with a plan you understand.' },
      { t: 'Shared care', d: 'Your primary care doctor stays in the loop at every step.' },
    ],
    visit: ['Bring a photo ID, your insurance card and a list of your medicines.', 'Bring any records from other clinics if you have them.', 'Your cardiologist explains each step in plain words.'],
    faqs: [
      { q: 'Do I need a referral?', a: 'Many plans ask for one. Call your insurer or our front desk if you are unsure.' },
      { q: 'Can my tests happen on the same day?', a: 'Often, yes. Cardiology and Diagnostics coordinate times where they can.' },
      { q: 'What if I have chest pain right now?', a: 'This website is not for urgent care. Call 911 for an emergency.' },
    ],
    connects: ['Primary Care', 'Diagnostics', "Women's Health"],
  },
  {
    slug: 'dermatology', name: 'Dermatology', short: 'Skin care, start to follow up', img: 'dept-dermatology', card: 'dm',
    intro: 'Dermatology offers skin care from the first question to the follow-up visit, with careful exams and plans that are easy to follow at home.',
    who: 'Children and adults with skin, hair or nail questions, and anyone who wants a skin check.',
    services: [
      { t: 'Skin checks', d: 'A careful look with time to talk about what you have noticed.' },
      { t: 'Ongoing skin care', d: 'Plans you can follow at home, reviewed at follow-up visits.' },
      { t: 'Family skin care', d: 'Visits for children and adults, with one team.' },
      { t: 'Coordinated referrals', d: 'Easy hand-offs to Primary Care and Diagnostics.' },
    ],
    visit: ['Bring a photo ID and your insurance card.', 'Come with clean, makeup-free skin if you can.', 'Write down any spots you want to point out.'],
    faqs: [
      { q: 'Can I show photos of a skin concern?', a: 'Bring them to your visit. This website does not collect photos or health details.' },
      { q: 'How long is a visit?', a: 'Most skin visits take 20 to 30 minutes.' },
      { q: 'Do you see children?', a: 'Yes. Mention your child\'s age in the call to confirm.' },
    ],
    connects: ['Primary Care', 'Pediatrics', 'Diagnostics'],
  },
  {
    slug: 'diagnostics', name: 'Diagnostics', short: 'Tests and imaging, coordinated', img: 'dept-diagnostics', card: 'dx', imgPos: '50% 55%',
    intro: 'Diagnostics brings tests and imaging under the same roof as your care team, so results reach your doctor quickly and you are not left wondering where they went.',
    who: 'Patients of any Oakline department who need tests or imaging ordered by their doctor.',
    services: [
      { t: 'Imaging', d: 'Scans scheduled with clear instructions about what to expect.' },
      { t: 'Lab and test coordination', d: 'Tests ordered by your Oakline doctor, linked to your plan.' },
      { t: 'Preparation guidance', d: 'Plain-language steps before your appointment.' },
      { t: 'Results shared with your team', d: 'Your doctor reviews results and talks them through with you.' },
    ],
    visit: ['Bring your doctor\'s order, a photo ID and your insurance card.', 'Follow any preparation steps you were given.', 'Tell the technologist about anything that would make you more comfortable.'],
    faqs: [
      { q: 'Do I need an order from a doctor?', a: 'Yes. Diagnostics tests are ordered by your doctor and scheduled with our staff.' },
      { q: 'How do I get my results?', a: 'Your doctor reviews them and talks them through with you.' },
      { q: 'Can I get a test without seeing a doctor first?', a: 'Please call the front desk to talk through the right first step.' },
    ],
    connects: ['Primary Care', 'Cardiology', "Women's Health"],
  },
];

export const deptBySlug = (s: string) => DEPTS.find((d) => d.slug === s);
export const deptByName = (n: string) => DEPTS.find((d) => d.name === n);

export type Doc = {
  slug: string; name: string; dept: string; role: string; img: string; imgPos?: string;
  bio: string; specialties: string[]; languages: string[]; accepting: boolean;
  schedule: { day: number; start: string; end: string }[]; // day: 0 Sun
};

const MWF = (s = '09:00', e = '16:30') => [1, 3, 5].map((day) => ({ day, start: s, end: e }));
const TTH = (s = '09:00', e = '16:30') => [2, 4].map((day) => ({ day, start: s, end: e }));
const MTWTH = (s = '08:30', e = '16:00') => [1, 2, 3, 4].map((day) => ({ day, start: s, end: e }));

export const DOCS: Doc[] = [
  { slug: 'jordan-ellis', name: 'Dr. Jordan Ellis', dept: 'primary-care', role: 'Primary Care physician', img: 'doctor-portrait-01', imgPos: '50% 14%', bio: 'Dr. Ellis leads our Primary Care team and likes to start every visit by listening. Their approach is simple: explain things in plain words, plan together and keep your care connected across Oakline.', specialties: ['Annual checkups', 'Preventive care', 'Care planning'], languages: ['English', 'Spanish'], accepting: true, schedule: MWF() },
  { slug: 'maya-okafor', name: 'Dr. Maya Okafor', dept: 'primary-care', role: 'Primary Care physician', img: 'staff-okafor', bio: 'Dr. Okafor cares for adults and teens and enjoys long-term relationships with patients. She keeps visits unhurried and follow-ups clear.', specialties: ['Preventive care', 'Adult primary care', 'Vaccines'], languages: ['English', 'French'], accepting: true, schedule: TTH('08:30', '16:00').concat([{ day: 5, start: '08:30', end: '12:00' }]) },
  { slug: 'sam-rivera', name: 'Dr. Sam Rivera', dept: 'pediatrics', role: 'Pediatrician', img: 'doctor-portrait-02', imgPos: '50% 14%', bio: 'Dr. Rivera makes visits friendly for children and calm for parents. They answer questions without rushing and coordinate with Primary Care for the whole family.', specialties: ['Well-child visits', 'Vaccines', 'Family care'], languages: ['English', 'Spanish'], accepting: true, schedule: MTWTH() },
  { slug: 'elena-brooks', name: 'Dr. Elena Brooks', dept: 'womens-health', role: "Women's Health physician", img: 'staff-brooks', imgPos: '50% 30%', bio: 'Dr. Brooks provides private, respectful care for women at every stage. She takes time to explain options and welcomes questions.', specialties: ['Well-woman exams', 'Family planning conversations', 'Preventive screening'], languages: ['English', 'Portuguese'], accepting: true, schedule: MWF('09:00', '16:00') },
  { slug: 'tara-lindqvist', name: 'Dr. Tara Lindqvist', dept: 'womens-health', role: "Women's Health physician", img: 'staff-lindqvist', imgPos: '50% 30%', bio: 'Dr. Lindqvist supports women through life changes with clear information and steady follow-up.', specialties: ['Routine exams', 'Life-stage care', 'Care coordination'], languages: ['English', 'Swedish'], accepting: false, schedule: TTH('09:30', '16:30') },
  { slug: 'casey-morgan', name: 'Dr. Casey Morgan', dept: 'cardiology', role: 'Cardiologist', img: 'doctor-portrait-03', imgPos: '50% 14%', bio: 'Dr. Morgan explains heart health in plain words and works closely with your primary care doctor, so every part of your care is shared.', specialties: ['Heart health consultations', 'Shared care', 'Follow-up planning'], languages: ['English'], accepting: true, schedule: [2, 3, 4].map((day) => ({ day, start: '09:00', end: '16:00' })) },
  { slug: 'samuel-whitaker', name: 'Dr. Samuel Whitaker', dept: 'cardiology', role: 'Cardiologist', img: 'staff-whitaker', imgPos: '50% 20%', bio: 'Dr. Whitaker has a calm, teaching style. He likes patients to leave knowing what was found, what it means and what happens next.', specialties: ['Heart health consultations', 'Coordinated testing', 'Second opinions on care plans'], languages: ['English', 'Arabic'], accepting: true, schedule: [1, 4, 5].map((day) => ({ day, start: '08:30', end: '15:30' })) },
  { slug: 'naomi-hart', name: 'Dr. Naomi Hart', dept: 'dermatology', role: 'Dermatologist', img: 'staff-hart', imgPos: '50% 30%', bio: 'Dr. Hart provides careful skin exams for adults and children and builds plans that fit into daily life.', specialties: ['Skin checks', 'Family skin care', 'Follow-up plans'], languages: ['English', 'Korean'], accepting: true, schedule: MTWTH('09:00', '16:00').slice(0, 3) },
  { slug: 'theo-vance', name: 'Dr. Theo Vance', dept: 'diagnostics', role: 'Diagnostic physician', img: 'staff-vance', imgPos: '50% 22%', bio: 'Dr. Vance oversees tests and imaging at Oakline and makes sure results reach your care team quickly.', specialties: ['Imaging coordination', 'Results review', 'Preparation guidance'], languages: ['English', 'German'], accepting: true, schedule: MWF('08:30', '15:30') },
];
export const docBySlug = (s: string) => DOCS.find((d) => d.slug === s);
export const docsOf = (dept: string) => DOCS.filter((d) => d.dept === dept);

export const REASONS = [
  'New patient visit', 'Routine or annual checkup', 'Follow-up visit', 'Vaccines or screening visit',
  'Paperwork or referral visit', 'Other scheduling request',
];
export const WINDOWS = ['Morning', 'Afternoon', 'Late day'] as const;
export const WINDOW_HOURS: Record<string, string> = { Morning: '8 AM to 12 PM', Afternoon: '12 PM to 3 PM', 'Late day': '3 PM to 5 PM' };
export const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] as const;
export const STATUSES = ['Requested', 'Confirmed', 'Rescheduled', 'Cancelled', 'Completed'] as const;
export type Status = (typeof STATUSES)[number];
export const windowOf = (time: string) => { const h = Number(time.slice(0, 2)); return h < 12 ? 'Morning' : h < 15 ? 'Afternoon' : 'Late day'; };
