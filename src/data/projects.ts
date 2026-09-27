// Central content model for case studies.
//
// `body` is a small block schema (heading/paragraph/list/stats/quote) rather
// than raw HTML or markdown, so the case study template
// (src/app/work/[slug]/page.tsx) can render each block type with consistent,
// on-brand styling and motion — add a project here and it automatically
// looks right, no per-project markup needed.
//
// The whole site sits behind a single password gate (see src/proxy.ts,
// src/app/locked/, src/app/api/unlock/route.ts, and SITE_PASSWORD in
// .env.local.example) — every route requires it, so there's no per-project
// `protected` flag here.
//
// Add `hideFromIndex: true` to a project to also leave it off the home page
// and /work index (for NDA/stealth work), reachable only by direct link —
// still behind the same site-wide password like everything else.

export type MetaItem = { label: string; value: string };

/** A single image reference. `width`/`height` are the source file's actual
 * pixel dimensions (not display size) — required by next/image for local
 * public/ files to prevent layout shift while the image loads. */
export type ImageRef = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type ContentBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "stats"; items: { label: string; value: string }[] }
  | { type: "quote"; text: string; attribution?: string }
  /** A single full-width image, optionally captioned. */
  | { type: "image"; image: ImageRef; caption?: string }
  /** A responsive grid of 2+ related images (e.g. a set of screens), with an
   * optional caption labeling the group as a whole. */
  | { type: "gallery"; images: ImageRef[]; caption?: string };

export type Project = {
  slug: string;
  title: string;
  /** Short teaser shown on cards (home + /work index) */
  summary: string;
  role: string;
  year: string;
  tags: string[];
  /** Thumbnail shown on project cards (home + /work index). */
  image?: ImageRef;
  /** Duration / Team / Platforms / Scope, shown at the top of the case study */
  meta?: MetaItem[];
  body: ContentBlock[];
  /** Hide the card from the home page and /work index (for NDA/stealth
   * work) — still reachable by direct link, and still behind the site-wide
   * password like every other page. */
  hideFromIndex?: boolean;
};

export const projects: Project[] = [
  {
    slug: "patient-portal",
    title: "A unified patient portal: myMedidata",
    summary:
      "Creating a unified patient portal for remote clinical trial participation.",
    role: "Lead Product Designer",
    year: "2020–2024",
    tags: ["Product Discovery", "Design Systems", "0→1"],
    image: {
      src: "/images/home/patient-portal-thumb.png",
      alt: "myMedidata logo beside an illustration of a globe with patients using devices",
      width: 1200,
      height: 675,
    },
    meta: [
      { label: "Duration", value: "Jun 2020 – Jan 2024" },
      { label: "Team", value: "Patient Cloud" },
      { label: "Platforms", value: "Web, iOS, Android" },
      {
        label: "Scope of work",
        value:
          "Product Discovery, UI/UX, Service Design, Prototyping & User Testing, Design System",
      },
    ],
    body: [
      { type: "heading", text: "Background" },
      {
        type: "paragraph",
        text: "Medidata is the leading provider of SaaS solutions for clinical research. I joined their Patient Cloud team in early 2020, during the peak of the COVID-19 pandemic. Life was rapidly changing: social-distancing laws were enforced, nasal swabs for testing became routine, and we anxiously awaited the availability of a vaccine. In response to these societal shifts, our team set out to launch a product that would facilitate participation in this new remote world.",
      },
      {
        type: "image",
        image: {
          src: "/images/work/patient-portal/hero-onboarding.png",
          alt: "myMedidata shown on a laptop and tablet, displaying an illustrated globe onboarding screen",
          width: 1808,
          height: 1002,
        },
      },
      { type: "heading", text: "Discovery: the clinical trial landscape" },
      {
        type: "paragraph",
        text: "The patient experience was disjointed and required various tools and channels — exposure and awareness through online databases, marketing, and word-of-mouth; informed consent via paper forms or the Rave eConsent app; symptom tracking and outcomes reporting through the separate Patient Cloud app. COVID-19 was rapidly increasing awareness of clinical research, and healthcare organizations were taking action.",
      },
      {
        type: "gallery",
        caption:
          "Survey data on clinical trial awareness and interest in remote participation, gathered from 5,500+ clinical trial participants and 150+ healthcare organizations.",
        images: [
          {
            src: "/images/work/patient-portal/stat-awareness-chart.png",
            alt: "Bar chart: 78% of clinical trial participants say clinical research has increased their awareness of research, versus 72% of those who never participated",
            width: 1176,
            height: 980,
          },
          {
            src: "/images/work/patient-portal/stat-remote-interest-chart.png",
            alt: "Bar chart showing interest from healthcare organizations in remote patient monitoring, decentralized trials, and remote site visits",
            width: 1176,
            height: 980,
          },
        ],
      },
      {
        type: "quote",
        text: "Design a patient-centric offering that enables our business partners to offer flexible study builds and protocols.",
        attribution: "Our challenge",
      },
      { type: "heading", text: "Understanding the patient experience" },
      {
        type: "paragraph",
        text: "To drive product discovery and strategic direction, I led both remote and in-person design studios. Our team drew from real patient and customer experiences, challenges, and anecdotes to inform product decisions — with the goal of better understanding the patient and site experience, and identifying where Medidata could add value across the clinical trial journey.",
      },
      {
        type: "gallery",
        caption: "In-person design studios, and an affinity map synthesizing patient empathy research.",
        images: [
          {
            src: "/images/work/patient-portal/design-studio-collage.jpg",
            alt: "Collage of photos from an in-person design studio workshop with sticky notes and whiteboards",
            width: 2720,
            height: 1730,
          },
          {
            src: "/images/work/patient-portal/patient-empathy-map.png",
            alt: "Patient empathy map affinity diagram organized by Read, Feel, Do, and Think",
            width: 2880,
            height: 1922,
          },
        ],
      },
      {
        type: "paragraph",
        text: "The most prominent theme we discovered was patient burden: participants have careers, family, friends, and hobbies, and participating in clinical research shouldn't interfere with any of it.",
      },
      {
        type: "image",
        image: {
          src: "/images/work/patient-portal/concierge-illustration.png",
          alt: "Illustration of two people each interacting with a device, representing a concierge-style support model",
          width: 2880,
          height: 1632,
        },
      },
      {
        type: "quote",
        text: "Patients need a concierge to guide and support them, making clinical trial participation flexible enough to maintain their careers, family time, and hobbies.",
        attribution: "Problem statement",
      },
      { type: "heading", text: "Unifying the experience under a single login" },
      {
        type: "paragraph",
        text: "Before myMedidata, our eConsent and ePRO (patient-reported outcomes) services were offered separately, requiring multiple logins — and eConsent wasn't even accessible outside of clinical trial sites. Consent involves learning about and deciding to participate in a trial; ePRO requires reporting symptoms, outcomes, and diaries throughout it. The challenge was making these two very different workflows feel like one cohesive product.",
      },
      {
        type: "gallery",
        caption: "The unified eConsent and ePRO activity flow, and the modular activity pattern behind it.",
        images: [
          {
            src: "/images/work/patient-portal/econsent-signature-flow.png",
            alt: "Phone screens showing the eConsent flow, from reading the bill of rights to signing consent",
            width: 4364,
            height: 1668,
          },
          {
            src: "/images/work/patient-portal/activity-consent-screens.png",
            alt: "Phone screens showing the Next Activity home screen and consent steps for a study called Simplify",
            width: 943,
            height: 601,
          },
        ],
      },
      {
        type: "list",
        items: [
          "Display the patient's \"Next Activity\" prominently, with all other activities just one click away",
          "Allow patients to choose where, when, and how they participate",
          "Design modular activity patterns that could scale as more products joined myMedidata",
        ],
      },
      {
        type: "gallery",
        caption: "The modular activity pattern, designed to scale as more products joined myMedidata.",
        images: [
          {
            src: "/images/work/patient-portal/activity-workflow-diagram.png",
            alt: "Diagram of the activity workflow, showing connected steps from registration to activation",
            width: 2658,
            height: 892,
          },
          {
            src: "/images/work/patient-portal/modular-activity-grid.png",
            alt: "Grid diagram of modular activity types that can be combined per study",
            width: 2970,
            height: 1068,
          },
        ],
      },
      { type: "heading", text: "Enhancing human communication" },
      {
        type: "paragraph",
        text: "Clinical research participation is daunting and often fuels anxiety and questions. Early discovery made clear that human-to-human communication couldn't be replaced — only augmented. One of our first additions was myMedidata LIVE, giving patients and study staff video-visit capabilities from any internet-connected device, so patients could raise concerns from the comfort of home.",
      },
      {
        type: "image",
        image: {
          src: "/images/work/patient-portal/mymedidata-live-video-visit.png",
          alt: "myMedidata LIVE video visit shown on a tablet and a monitor, connecting a patient with a doctor",
          width: 1096,
          height: 1442,
        },
      },
      { type: "heading", text: "Designing for a global audience" },
      {
        type: "paragraph",
        text: "Medidata serves organizations worldwide, so we designed for a global patient population from the start — accounting for right-to-left languages, stacking elements to leave room for translation expansion, swapping culturally-specific icons (a thumbs-up can be derogatory in some cultures) for more universal graphics, and making sure our illustrations represented our actual user base.",
      },
      {
        type: "gallery",
        caption:
          "English/German localization, culturally-sensitive icon exploration, inclusive illustrations, and identity-inclusive form fields.",
        images: [
          {
            src: "/images/work/patient-portal/localization-en-de.png",
            alt: "Side-by-side phone screens showing the same activity screen localized in English and German",
            width: 935,
            height: 889,
          },
          {
            src: "/images/work/patient-portal/icon-sensitivity-exploration.png",
            alt: "Exploration of a thumbs-up icon versus a medal icon for approval, since a thumbs-up can be derogatory in some cultures",
            width: 7610,
            height: 4236,
          },
          {
            src: "/images/work/patient-portal/diverse-patient-illustrations.png",
            alt: "Circle of illustrated patient avatars representing a diverse range of ages, ethnicities, and appearances",
            width: 1360,
            height: 1360,
          },
          {
            src: "/images/work/patient-portal/inclusive-form-fields.png",
            alt: "Form fields for gender identity, timezone, and country of residence, with a tooltip explaining why the information is needed",
            width: 3280,
            height: 1818,
          },
        ],
      },
      {
        type: "image",
        caption:
          "Registration screens localized for German-speaking patients drove a 71.4% increase in sign-up completion for that audience.",
        image: {
          src: "/images/work/patient-portal/expansion-ratio-stat.png",
          alt: "Sign Up screen shown in English and Registrieren screen in German, next to a 71.4% expansion ratio stat",
          width: 1128,
          height: 684,
        },
      },
      { type: "heading", text: "Designing for ease: familiar patterns" },
      {
        type: "paragraph",
        text: "We avoided reinventing the wheel wherever possible — leaning on familiar ePRO controls like face scales and VAS scales, and native iOS patterns like UIPickerView, to reduce cognitive load. On the writing side, we replaced clinical jargon with plain, everyday language to build trust and set clear expectations.",
      },
      {
        type: "image",
        image: {
          src: "/images/work/patient-portal/ui-pattern-screens.png",
          alt: "Three phone screens showing familiar UI patterns used across myMedidata, including pickers and scales",
          width: 1471,
          height: 759,
        },
      },
      { type: "heading", text: "Retrospective" },
      {
        type: "paragraph",
        text: "I consider myMedidata the most impactful project of my career. It challenged me to view problems from multiple perspectives, and I worked closely with engineering and QA to maintain high design fidelity throughout. It was my first time designing a truly global product, and the first time I interviewed, hired, and mentored junior designers — learning firsthand that a good design leader sets their team up for success. Looking back, I wish I'd had more time and resources to refine the design system and add analytics to keep informing product decisions with real usage data.",
      },
      {
        type: "image",
        caption: "A page from the myMedidata design system: color, type, and component specs.",
        image: {
          src: "/images/work/patient-portal/design-system-sheet.png",
          alt: "Design system reference sheet showing color palette, typography scale, and component library",
          width: 5128,
          height: 3212,
        },
      },
    ],
  },
  {
    slug: "ax-app",
    title: "A celebration of anime: Anime Expo App",
    summary:
      "Streamlining content discovery and attendance planning for North America's premier anime convention.",
    role: "Product Designer",
    year: "2023",
    tags: ["Personal Project", "Mobile", "Research"],
    image: {
      src: "/images/home/ax-app-thumb.jpg",
      alt: "Four phone screens from the Anime Expo app displayed against a red background",
      width: 2586,
      height: 1276,
    },
    meta: [
      { label: "Duration", value: "Jan 2023 – Mar 2023" },
      { label: "Team", value: "Personal Project" },
      { label: "Platforms", value: "iOS" },
      {
        label: "Scope of work",
        value:
          "Product Discovery, UI/UX, Service Design, Prototyping & User Testing, Design Language",
      },
    ],
    body: [
      {
        type: "paragraph",
        text: "Disclaimer: this is a personal project, not affiliated with Anime Expo or SPJA. The views in this case study are strictly my own, and all proposed solutions are the result of my personal discovery and research.",
      },
      { type: "heading", text: "Overview" },
      {
        type: "paragraph",
        text: "Anime Expo is the largest celebration of anime and Japanese pop culture in North America, bringing in hundreds of thousands of guests and generating millions of dollars for local businesses every year. Its mobile app for iOS and Android is meant to guide and inform attendees throughout the convention.",
      },
      {
        type: "image",
        image: {
          src: "/images/work/ax-app/convention-crowd.jpg",
          alt: "Crowd of attendees filling the convention center hallway at Anime Expo",
          width: 4096,
          height: 2731,
        },
      },
      {
        type: "stats",
        items: [
          { label: "Attendees", value: "392,000+" },
          { label: "Revenue for local businesses", value: "$100mil+" },
          { label: "Exhibitors", value: "400+" },
          { label: "Hours of programming", value: "1,000+" },
        ],
      },
      { type: "heading", text: "Defining user archetypes" },
      {
        type: "paragraph",
        text: "Based on interviews, surveys, and research into attendee communities, I organized attendees into four archetypes spanning planning affinity and convention experience: Strategic Explorers (meticulous, but a bit overwhelmed as first-timers), Strategic Veterans (refined planners drawing on past experience), Adaptive Explorers (spontaneous first-timers who treat the event as an adventure), and Adaptive Veterans (comfortable with uncertainty, trusting instinct).",
      },
      {
        type: "gallery",
        caption: "Illustrated personas for each of the four attendee archetypes.",
        images: [
          {
            src: "/images/work/ax-app/archetype-strategic-explorer.png",
            alt: "Illustrated persona for the Strategic Explorer archetype: a meticulous first-timer, a bit overwhelmed",
            width: 480,
            height: 480,
          },
          {
            src: "/images/work/ax-app/archetype-strategic-veteran.png",
            alt: "Illustrated persona for the Strategic Veteran archetype: a refined planner drawing on past experience",
            width: 480,
            height: 480,
          },
          {
            src: "/images/work/ax-app/archetype-adaptive-explorer.png",
            alt: "Illustrated persona for the Adaptive Explorer archetype: a spontaneous first-timer treating the event as an adventure",
            width: 480,
            height: 480,
          },
          {
            src: "/images/work/ax-app/archetype-adaptive-veteran.png",
            alt: "Illustrated persona for the Adaptive Veteran archetype: comfortable with uncertainty, trusting instinct",
            width: 480,
            height: 480,
          },
        ],
      },
      { type: "heading", text: "Unraveling the attendee experience" },
      {
        type: "list",
        items: [
          "Testing participants were deterred by being greeted with an advertisement on open",
          "The landing page presented too many options, leading to choice paralysis",
          "Side navigation was hard to find, hiding important pages from discovery",
          "Lack of context made browsing difficult",
          "Maps were illegible and hard to make sense of",
          "Many pages were web views, which broke on the convention center's spotty wifi",
        ],
      },
      {
        type: "gallery",
        caption: "The original app: a cluttered landing page, buried navigation, and an illegible map.",
        images: [
          {
            src: "/images/work/ax-app/old-app-screens.jpg",
            alt: "Three screens from the original Anime Expo app on a red background",
            width: 4096,
            height: 2021,
          },
          {
            src: "/images/work/ax-app/old-app-butler-cafe.png",
            alt: "Original app screen for a Butler Cafe exhibitor, styled with dense Victorian-style graphics",
            width: 1170,
            height: 2532,
          },
          {
            src: "/images/work/ax-app/old-app-things-to-do.png",
            alt: "Original app's Things to do at AX list screen with ticketed events, activities, and schedule links",
            width: 1170,
            height: 2532,
          },
          {
            src: "/images/work/ax-app/old-app-artist-alley.png",
            alt: "Original app's Artist Alley screen, a dense unstructured list of artists",
            width: 1170,
            height: 2532,
          },
          {
            src: "/images/work/ax-app/old-app-map.png",
            alt: "Original app's convention map, small and difficult to read",
            width: 1170,
            height: 2532,
          },
        ],
      },
      {
        type: "image",
        caption: "The original information architecture — a large part of the problem was findability.",
        image: {
          src: "/images/work/ax-app/old-app-ia-diagram.png",
          alt: "Diagram of the original app's information architecture, organized in a radial layout",
          width: 5760,
          height: 4096,
        },
      },
      { type: "heading", text: "Re-imagining the app" },
      {
        type: "list",
        items: [
          "A new front-door experience — bright, vibrant illustrations and an onboarding flow that sets expectations",
          "Progressive disclosure — grouping content into a few sections instead of overwhelming users upfront",
          "A mobile-friendly map — shows the user's location, landmark details, and the quickest route to a booth",
          "Gentle reminders — notifications for schedule, agenda, and amenity updates",
          "Bookmarking for exhibitors — lets attendees save booths to revisit later, improving engagement despite long lines",
        ],
      },
      {
        type: "gallery",
        caption: "A friendlier front door: bright illustrations and a permissions flow that sets expectations.",
        images: [
          {
            src: "/images/work/ax-app/onboarding-welcome.png",
            alt: "Onboarding welcome screen for the redesigned Anime Expo app, with illustrated character art",
            width: 375,
            height: 812,
          },
          {
            src: "/images/work/ax-app/onboarding-location.png",
            alt: "Onboarding screen requesting location access, with illustrated character art",
            width: 375,
            height: 812,
          },
          {
            src: "/images/work/ax-app/onboarding-notifications.png",
            alt: "Onboarding screen requesting notification permissions, with illustrated character art",
            width: 375,
            height: 812,
          },
          {
            src: "/images/work/ax-app/new-app-explore-home.png",
            alt: "Redesigned app's Explore home screen with Things to do, Artist Alley, Exhibitors, and Talent sections",
            width: 375,
            height: 812,
          },
        ],
      },
      {
        type: "gallery",
        caption: "Progressive disclosure: content grouped into a few clear sections instead of one long list.",
        images: [
          {
            src: "/images/work/ax-app/new-app-side-nav.png",
            alt: "Redesigned app's side navigation menu, organized into clear grouped sections",
            width: 1170,
            height: 2532,
          },
          {
            src: "/images/work/ax-app/new-app-things-to-do.png",
            alt: "Redesigned Things to do screen with Event Schedule and Activities sections",
            width: 375,
            height: 812,
          },
          {
            src: "/images/work/ax-app/new-app-schedule-view.png",
            alt: "Redesigned schedule screen with a filterable list of events by day",
            width: 375,
            height: 812,
          },
          {
            src: "/images/work/ax-app/new-app-agenda-view.png",
            alt: "Redesigned personal agenda view showing a timeline of saved events",
            width: 4096,
            height: 2216,
          },
        ],
      },
      {
        type: "gallery",
        caption: "A mobile-friendly map with the user's live location and the quickest route to a booth.",
        images: [
          {
            src: "/images/work/ax-app/new-app-maps-overview.png",
            alt: "Redesigned Maps screen offering a Convention Center Map and Exterior Map",
            width: 375,
            height: 812,
          },
          {
            src: "/images/work/ax-app/new-app-booth-detail.png",
            alt: "Booth detail screen for Booth A01 with a Start route button",
            width: 375,
            height: 812,
          },
          {
            src: "/images/work/ax-app/new-app-active-route.png",
            alt: "Active turn-by-turn route on the convention center map to a selected booth",
            width: 375,
            height: 812,
          },
        ],
      },
      {
        type: "gallery",
        caption: "Gentle reminders: lock-screen notifications and a Notifications tab organized by type.",
        images: [
          {
            src: "/images/work/ax-app/notification-lock-screen.png",
            alt: "iPhone lock screen showing a push notification about an updated event schedule",
            width: 375,
            height: 812,
          },
          {
            src: "/images/work/ax-app/notifications-all.png",
            alt: "Notifications screen showing the All tab with a mix of announcements and reminders",
            width: 375,
            height: 812,
          },
          {
            src: "/images/work/ax-app/notifications-announcements.png",
            alt: "Notifications screen filtered to the Announcements tab",
            width: 375,
            height: 812,
          },
          {
            src: "/images/work/ax-app/notifications-reminders.png",
            alt: "Notifications screen filtered to the Reminders tab",
            width: 375,
            height: 812,
          },
        ],
      },
      {
        type: "gallery",
        caption: "Bookmarking exhibitors in context, so attendees can revisit favorites later.",
        images: [
          {
            src: "/images/work/ax-app/bookmarking-in-context.jpg",
            alt: "Photo of a phone at a convention booth, prompting to open the exhibitor's page in the app",
            width: 375,
            height: 812,
          },
          {
            src: "/images/work/ax-app/bookmarking-prompt.png",
            alt: "App prompt to open an exhibitor called NeonPaws Artistry in the Anime Expo app",
            width: 375,
            height: 812,
          },
          {
            src: "/images/work/ax-app/bookmarking-exhibitor-page.png",
            alt: "Exhibitor detail page for NeonPaws Artistry with a Save Artist button",
            width: 375,
            height: 812,
          },
          {
            src: "/images/work/ax-app/bookmarking-saved-state.png",
            alt: "Exhibitor page after saving, showing it was saved by 150 other people and a Remove from Saved Artists button",
            width: 375,
            height: 812,
          },
        ],
      },
      { type: "heading", text: "Outcomes and results" },
      {
        type: "paragraph",
        text: "Task-based usability testing, surveys, and interviews showed dramatically higher success rates and a much-improved perception of the app.",
      },
      {
        type: "image",
        image: {
          src: "/images/work/ax-app/usability-testing-session.jpg",
          alt: "Usability testing session with a laptop and a phone connected on a desk during a task-based test",
          width: 2920,
          height: 2232,
        },
      },
      {
        type: "stats",
        items: [
          { label: "Locating an event", value: "2:24 → 0:31" },
          { label: "Locating an amenity", value: "1:51 → 0:27" },
          { label: "Adding an event to agenda", value: "0:45 → 0:07" },
          { label: "Locating an exhibitor on the map", value: "3:49 → 0:08" },
          { label: "Critical errors", value: "4 → 0" },
        ],
      },
      { type: "heading", text: "What's next" },
      {
        type: "paragraph",
        text: "Moderated usability tests are valuable, but the next step would be validating at scale — defining success metrics around funnel conversion and feature usage with a broader group. The real-time map also took some creative liberties in this exercise; a real implementation would need product and engineering support, likely evaluating a dedicated indoor-mapping solution like MapsPeople.",
      },
      { type: "heading", text: "Retrospective" },
      {
        type: "paragraph",
        text: "This project sharpened how I think about designing beyond the screen — understanding the whole ecosystem of users, digital solutions, and physical environment is what makes an experience genuinely enjoyable. It also reinforced that visual design has to extend the brand, not just be legible: Anime Expo's identity carries decades of art and inclusivity that the design needs to honor. And with as much content as the event has, a large share of the real work was taxonomy, information architecture, and navigation — organizing everything to match how attendees actually think about it.",
      },
      {
        type: "gallery",
        caption: "The design system behind it: semantic colors, typography, and a shared component library.",
        images: [
          {
            src: "/images/work/ax-app/design-system-offline-state.png",
            alt: "App offline state screen used to demonstrate design system states",
            width: 1170,
            height: 2532,
          },
          {
            src: "/images/work/ax-app/design-system-colors.png",
            alt: "Design system reference showing semantic background and foreground color tokens",
            width: 4096,
            height: 3869,
          },
          {
            src: "/images/work/ax-app/design-system-typography.png",
            alt: "Design system reference showing the typography scale from large title to caption",
            width: 1624,
            height: 886,
          },
          {
            src: "/images/work/ax-app/design-system-components.png",
            alt: "Design system reference sheet showing the shared component library",
            width: 4014,
            height: 2314,
          },
        ],
      },
    ],
  },
  {
    slug: "confidential-project",
    title: "Confidential Project",
    summary:
      "Example of an NDA-covered case study kept off the public index — replace or delete once you have real stealth content.",
    role: "Product Designer",
    year: "2024",
    tags: ["NDA", "Example"],
    hideFromIndex: true,
    body: [
      {
        type: "paragraph",
        text: "This is a placeholder demonstrating the password-protection system — see the README for how it works. Replace this project with real NDA work, or delete it from src/data/projects.ts.",
      },
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
