/**
 * Reviews data.Edit this file to add, remove, or modify reviews.
 *
 * Each review has:
 *  - id: unique identifier
 *  - name: reviewer name
 *  - role: { nl, en }.job title in both languages
 *  - text: { nl, en }.review text in both languages
 *  - rating: 1–5 stars
 *  - date: date string (shown as-is)
 *  - verified: show "Verified purchase" badge
 */

export type Review = {
  id: string;
  name: string;
  role: { nl: string; en: string };
  text: { nl: string; en: string };
  rating: number;
  date: string;
  verified: boolean;
};

const reviews: Review[] = [
  {
    id: 'jan',
    name: 'Jan Peeters',
    role: { nl: 'Automonteur', en: 'Auto Mechanic' },
    text: {
      nl: 'De Norvia Gel Glove is het geld absoluut waard! Ik werk dagelijks met olie en vet, en mijn handen zijn nog nooit zo schoon en verzorgd geweest.',
      en: 'The Norvia Gel Glove is absolutely worth the money! I work with oil and grease daily, and my hands have never been this clean and well-maintained.',
    },
    rating: 5,
    date: '2025-01-15',
    verified: true,
  },
  {
    id: 'annelies',
    name: 'Annelies De Smedt',
    role: { nl: 'Schilder', en: 'Painter' },
    text: {
      nl: 'Ik was sceptisch, maar de gel handschoen werkt echt! Het schoonmaken na een klus is nu zo veel sneller en makkelijker. Mijn handen voelen ook veel zachter aan.',
      en: "I was skeptical, but the gel glove really works! Cleaning up after a job is so much faster and easier now. My hands feel much softer too.",
    },
    rating: 5,
    date: '2025-02-03',
    verified: true,
  },
  {
    id: 'dirk',
    name: 'Dirk Martens',
    role: { nl: 'Bouwvakker', en: 'Construction Worker' },
    text: {
      nl: 'Eindelijk geen droge en geïrriteerde handen meer! De Norvia Gel Glove beschermt mijn handen perfect en is ook nog eens verzorgend.',
      en: 'Finally no more dry and irritated hands! The Norvia Gel Glove protects my hands perfectly and is also caring.',
    },
    rating: 5,
    date: '2025-01-28',
    verified: true,
  },
  {
    id: 'lisa',
    name: 'Lisa van Dijk',
    role: { nl: 'Kapster', en: 'Hairdresser' },
    text: {
      nl: 'Als kapster werk ik dagelijks met haarverf en chemicaliën. Met Norvia hoef ik geen handschoenen meer te dragen die steeds scheuren. Mijn handen blijven schoon en zacht.',
      en: 'As a hairdresser I work with hair dye and chemicals daily. With Norvia I no longer need to wear gloves that keep tearing. My hands stay clean and soft.',
    },
    rating: 5,
    date: '2025-03-10',
    verified: true,
  },
  {
    id: 'mark',
    name: 'Mark Jansen',
    role: { nl: 'Dakdekker', en: 'Roofer' },
    text: {
      nl: 'Bitumen en teer waren altijd een nachtmerrie om van mijn handen te krijgen. Met Norvia Gel Glove spoel ik het gewoon af met water. Echt ongelooflijk.',
      en: 'Bitumen and tar were always a nightmare to get off my hands. With Norvia Gel Glove I just rinse it off with water. Truly incredible.',
    },
    rating: 5,
    date: '2025-02-20',
    verified: true,
  },
  {
    id: 'peter',
    name: 'Peter Willems',
    role: { nl: 'Garagehouder', en: 'Garage Owner' },
    text: {
      nl: 'Ik heb 15 flessen besteld voor mijn hele team. De jongens zijn enthousiast.schone handen zonder gedoe met wegwerphandschoenen. Geweldig product.',
      en: "I ordered 15 bottles for my entire team. The guys are enthusiastic.clean hands without the hassle of disposable gloves. Great product.",
    },
    rating: 5,
    date: '2025-04-05',
    verified: true,
  },
];

export default reviews;
