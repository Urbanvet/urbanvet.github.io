const Language = { EN: 'EN', DE: 'DE' };
const Page = { HOME: 'HOME', SERVICES: 'SERVICES', ABOUT: 'ABOUT', BLOG: 'BLOG', BLOG_POST: 'BLOG_POST', CONTACT: 'CONTACT', IMPRESSUM: 'IMPRESSUM', PRIVACY: 'PRIVACY' };
const SITE_URL = 'https://urbanvet.de';
// Base path the site is served under: '' = domain root (production),
// e.g. '/urbanvet.github.io' for a GitHub project-pages preview.
// Injected via globalThis.__BASE_PATH__ (build sandbox / inline <script>).
const BASE_PATH = ((typeof globalThis !== 'undefined' && globalThis.__BASE_PATH__) || '').replace(/\/$/, '');
const SITE_NAME = 'UrbanVet';
const PERSON_NAME = 'Susanne Repanelis';
const SITE_PHONE = '0171 64 94 610';
const SITE_PHONE_LINK = '+491716494610';
const SITE_EMAIL = 'info@urbanvet.de';
const DEFAULT_OG_IMAGE = 'logo-main.png';
const PAGE_PATHS = {
  [Language.DE]: {
    [Page.HOME]: '/',
    [Page.SERVICES]: '/leistungen',
    [Page.ABOUT]: '/ueber-mich',
    [Page.BLOG]: '/blog',
    [Page.CONTACT]: '/kontakt',
    [Page.IMPRESSUM]: '/impressum',
    [Page.PRIVACY]: '/datenschutz'
  },
  [Language.EN]: {
    [Page.HOME]: '/en',
    [Page.SERVICES]: '/en/services',
    [Page.ABOUT]: '/en/about',
    [Page.BLOG]: '/en/blog',
    [Page.CONTACT]: '/en/contact',
    [Page.IMPRESSUM]: '/en/imprint',
    [Page.PRIVACY]: '/en/privacy'
  }
};
const BLOG_BASE_PATHS = {
  [Language.DE]: '/blog',
  [Language.EN]: '/en/blog'
};
const BOOKING_LINKS = {
  [Language.DE]: 'https://www.termin.vet/urbanvet/termin_buchen/de',
  [Language.EN]: 'https://www.termin.vet/urbanvet/termin_buchen/en'
};
const BOOKING_BUTTON_IMAGE_SRC = 'assets/termin-buchen.svg';
const WHATSAPP_URL = 'https://wa.me/491716494610';
const ROUTE_REDIRECT_PARAM = 'route';
const PAGE_QUERY_MAP = {
  [Page.HOME]: 'home',
  [Page.SERVICES]: 'services',
  [Page.ABOUT]: 'about',
  [Page.BLOG]: 'blog',
  [Page.CONTACT]: 'contact',
  [Page.IMPRESSUM]: 'impressum',
  [Page.PRIVACY]: 'datenschutz'
};
const QUERY_PAGE_MAP = Object.fromEntries(Object.entries(PAGE_QUERY_MAP).map(([page, slug]) => [slug, page]));
const EMERGENCY_SERVICE_URL = 'https://tieraerztekammer-berlin.de/notdienst/';
const SERVICE_ICON_SRC = 'p2.png';
const BULLET_ICON_SRC = 'p1.png';
const UKFlagIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 60 30", className: "w-8 h-auto" }, React.createElement('g', { clipPath: "url(#s)" }, React.createElement('path', { d: "M0 0v30h60V0z", fill: "#012169" }), React.createElement('path', { d: "M0 0l60 30m0-30L0 30", stroke: "#fff", strokeWidth: "6" }), React.createElement('path', { d: "M0 0l60 30m0-30L0 30", clipPath: "url(#t)", stroke: "#C8102E", strokeWidth: "4" }), React.createElement('path', { d: "M30 0v30M0 15h60", stroke: "#fff", strokeWidth: "10" }), React.createElement('path', { d: "M30 0v30M0 15h60", stroke: "#C8102E", strokeWidth: "6" })), React.createElement('defs', null, React.createElement('clipPath', { id: "s" }, React.createElement('path', { d: "M0 0v30h60V0z" })), React.createElement('clipPath', { id: "t" }, React.createElement('path', { d: "M30 15h30v15zv15h-30zH0z" }))));
const DEFlagIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 5 3", className: "w-8 h-auto" }, React.createElement('path', { d: "M0 0h5v3H0z" }), React.createElement('path', { d: "M0 1h5v2H0z", fill: "#D00" }), React.createElement('path', { d: "M0 2h5v1H0z", fill: "#FFCE00" }));

function MissingAssetPlaceholder({ label, className, style }) {
  return React.createElement(
    'div',
    {
      className: `flex items-center justify-center text-center text-xs sm:text-sm font-medium text-gray-500 bg-white/80 border border-dashed border-gray-400 ${className || ''}`.trim(),
      style
    },
    label
  );
}

function AssetImage({
  src,
  alt,
  imageClassName,
  placeholderClassName,
  imageStyle,
  placeholderStyle,
  loading = 'lazy'
}) {
  const [failed, setFailed] = React.useState(false);
  const label = src.split('/').pop();

  if (failed) {
    return React.createElement(MissingAssetPlaceholder, {
      label,
      className: placeholderClassName || imageClassName,
      style: placeholderStyle
    });
  }

  return React.createElement('img', {
    src,
    alt,
    loading,
    className: imageClassName,
    style: imageStyle,
    onError: () => setFailed(true)
  });
}

function SectionDivider() {
  const [failed, setFailed] = React.useState(false);

  return React.createElement(
    'div',
    { className: "w-full h-[60px]" },
    !failed && React.createElement('img', {
      src: 'logo-divider.png',
      alt: '',
      'aria-hidden': true,
      className: 'hidden',
      onError: () => setFailed(true)
    }),
    failed
      ? React.createElement(MissingAssetPlaceholder, {
          label: 'logo-divider.png',
          className: 'w-full h-full border-x-0'
        })
      : React.createElement('div', {
          className: "w-full h-full",
          style: {
            backgroundImage: "url('logo-divider.png')",
            backgroundRepeat: 'repeat-x',
            backgroundPosition: 'center',
            backgroundSize: 'auto 100%'
          }
        })
  );
}

const buildExternalLink = (href, label) => React.createElement('a', {
  href,
  target: '_blank',
  rel: 'noopener noreferrer',
  className: 'font-semibold text-red-700 hover:underline'
}, label);

const ServiceImageIcon = ({ className = 'h-[6.75rem] w-[6.75rem]', placeholderClassName = 'h-[6.75rem] w-[6.75rem] text-[10px]' }) => React.createElement(AssetImage, {
  src: SERVICE_ICON_SRC,
  alt: '',
  imageClassName: `${className} object-contain`.trim(),
  placeholderClassName: `${placeholderClassName} items-center justify-center`.trim(),
  loading: 'eager'
});

const BulletImageIcon = ({ className = 'h-10 w-10', placeholderClassName = 'h-10 w-10 text-[9px]' }) => React.createElement(AssetImage, {
  src: BULLET_ICON_SRC,
  alt: '',
  imageClassName: `${className} object-contain`.trim(),
  placeholderClassName: `${placeholderClassName} items-center justify-center`.trim(),
  loading: 'eager'
});

const buildSharedInfoSections = (language) => language === Language.DE ? {
  openingHours: {
    title: 'Öffnungszeiten',
    lines: [
      'Montag – Freitag: 10:00 – 18:00 Uhr',
      'Termine außerhalb der regulären Öffnungszeiten sind nach Vereinbarung möglich.'
    ]
  },
  emergencies: {
    title: 'Notfälle',
    lines: [
      'Montag – Freitag: 18:00 – 22:00 Uhr',
      'Samstag – Sonntag: 10:00 – 22:00 Uhr',
      React.createElement(React.Fragment, null, 'Bei akuten, lebensbedrohlichen medizinischen Notfällen wenden Sie sich bitte umgehend an eine tierärztliche Notfallklinik:'),
      buildExternalLink(EMERGENCY_SERVICE_URL, 'Notdienst Tierärztekammer Berlin')
    ]
  },
  serviceArea: {
    title: 'Einzugsgebiet',
    lines: [
      'UrbanVet ist ein mobiler Tierarztservice in Berlin und bietet tierärztliche Betreuung direkt bei Ihnen zu Hause.',
      'Hausbesuche sind im gesamten Berliner Stadtgebiet sowie in den umliegenden Regionen möglich.'
    ]
  }
} : {
  openingHours: {
    title: 'Opening Hours',
    lines: [
      'Monday – Friday: 10:00 AM – 6:00 PM',
      'Appointments outside regular opening hours may be arranged by appointment.'
    ]
  },
  emergencies: {
    title: 'Emergencies',
    lines: [
      'Monday – Friday: 6:00 PM – 10:00 PM',
      'Saturday – Sunday: 10:00 AM – 10:00 PM',
      React.createElement(React.Fragment, null, 'In the case of acute, life-threatening medical emergencies, please contact a veterinary emergency clinic immediately:'),
      buildExternalLink(EMERGENCY_SERVICE_URL, 'Berlin Veterinary Emergency Service')
    ]
  },
  serviceArea: {
    title: 'Service Area',
    lines: [
      'UrbanVet is a mobile veterinary service in Berlin, providing veterinary care directly in the comfort of your home.',
      'Home visits are available throughout Berlin and the surrounding areas.'
    ]
  }
};

const TEXTS = {
  [Language.EN]: {
    nav: { [Page.HOME]: 'Home', [Page.SERVICES]: 'Services', [Page.ABOUT]: 'About Me', [Page.BLOG]: 'Blog', [Page.CONTACT]: 'Contact', [Page.IMPRESSUM]: 'Legal Notice', [Page.PRIVACY]: 'Privacy Policy' },
    home: {
      heroLeadLines: ['Special care for your special pet.', 'In the comfort of your home.'],
      heroSubtitle: 'English speaking mobile veterinary care for dogs and cats in Berlin and Brandenburg – gentle, personal, and dedicated to your pet.',
      ctaButton: 'Book a home visit',
      introTitle: '',
      introParagraphs: [
        'For many pets, travelling to a veterinary clinic and waiting in a waiting room can be very stressful. Cats in particular often react sensitively to unfamiliar surroundings.',
        'With UrbanVet, your veterinarian comes directly to your home. Examinations and treatment can take place in your pet’s familiar environment, where they often feel much calmer and more secure.',
        'I take time for thorough examinations, individual advice, and treatment tailored to the needs of your pet.',
        'UrbanVet offers mobile veterinary home visits for dogs and cats in Berlin and Brandenburg – for veterinary care built on calm, trust, and personal attention.'
      ],
      aboutTitle: 'About me',
      aboutText: 'Animals have always been a central part of my life, and I knew early on that I wanted to become a veterinarian.',
      infoSections: buildSharedInfoSections(Language.EN)
    },
    services: {
      title: 'Services – UrbanVet',
      subtitle: 'Mobile veterinary care for dogs and cats in Berlin and Brandenburg – calm, personal, and with time for your pet.',
      items: [
        {
          id: 'vaccinations-preventive-care',
          title: 'Vaccinations & Preventive Care',
          description: 'For a long, healthy life for your pet.',
          longDescription: 'For a long, healthy life for your pet:',
          subServices: [
            'General health checks',
            'Vaccinations for dogs and cats',
            'Senior wellness programs',
            'EU pet passport & travel medicine',
            'Parasite prevention: fleas, ticks, worms',
            'Nutritional advice & weight management'
          ]
        },
        {
          id: 'emergency-home-visits',
          title: 'Emergency & Home Visits',
          description: 'Fast help directly in the comfort of your home.',
          longDescription: 'Fast help directly in the comfort of your home:',
          subServices: [
            'Wound care & emergency treatment',
            'Emergency consultation outside regular opening hours',
            'Medication support on site',
            'Euthanasia'
          ]
        },
        {
          id: 'internal-medicine-diagnostics',
          title: 'Internal Medicine & Diagnostics',
          description: 'Holistic examination and treatment for your pet’s health.',
          longDescription: 'Holistic examination and treatment for your pet’s health:',
          subServices: [
            'Diagnostics & treatment for gastrointestinal problems',
            'Endocrine conditions (diabetes, thyroid, adrenal disease)',
            'Kidney and urinary tract diseases',
            'Laboratory testing & rapid tests'
          ]
        },

        {
          id: 'geriatrics-palliative-care',
          title: 'Geriatrics & Palliative Care',
          description: 'Respectful support during sensitive stages of life.',
          longDescription: 'Respectful support during sensitive stages of life:',
          subServices: [
            'Senior checks & age-appropriate care',
            'Pain therapy',
            'Palliative care at home'
          ]
        },
        {
          id: 'behavioral-medicine',
          title: 'Behavioral Medicine',
          description: 'For a more harmonious life together.',
          longDescription: 'For a more harmonious life together:',
          subServices: [
            'Behavior counseling for dogs and cats',
            'Stress-free living together with dogs and cats',
            'Support for anxiety, aggression, or stress',
            'Medication-assisted behavior therapy'
          ]
        },
        {
          id: 'additional-services',
          title: 'Additional Services',
          description: 'Individual guidance and practical support.',
          longDescription: 'Individual guidance and practical support:',
          subServices: [
            'Advice before adopting a pet',
            'Travel advice & health certificates',
            'Vaccination and medication reminders'
          ]
        }
      ],
      costsTitle: 'Costs & Billing',
      costsContent: React.createElement(React.Fragment, null,
        React.createElement('p', null, 'At UrbanVet, my services are billed according to the ', React.createElement('strong', null, 'new German Veterinary Fee Schedule (GOT, version 2022)'), ', effective nationwide since November 22, 2022.'),
        React.createElement('p', null, 'To ensure full transparency, all pet owners receive a ', React.createElement('strong', null, 'detailed invoice'), ', which can also be submitted to your pet insurance. On request, I am happy to provide an overview of typical services and costs by phone.'),
        React.createElement('p', { className: 'font-semibold text-gray-900 mb-0' }, 'Mandatory charges according to GOT:'),
        React.createElement('p', null, React.createElement('strong', null, 'Home visit fee & travel allowance:'), ' For every home visit, the legally required travel allowance and home visit fee are applied.'),
        React.createElement('p', { className: 'font-semibold text-gray-900 mb-0' }, 'Payment options:'),
        React.createElement('ul', { className: 'list-none pl-0 mt-0 space-y-2' },
          React.createElement('li', null, 'Cash'),
          React.createElement('li', null, 'Credit card (Visa, Mastercard)'),
          React.createElement('li', null, 'Maestro (EC card)'),
          React.createElement('li', null, 'Google Pay & Apple Pay')
        )
      )
    },
    about: {
      title: 'About me',
      profileName: 'Susanne Repanelis',
      profileRole: 'Veterinarian',
      paragraphs: [
        'Animals have always been a central part of my life, and I knew early on that I wanted to become a veterinarian. After studying Veterinary Medicine in Vienna, I gained extensive experience in small animal care across Austria, Greece, and Germany – in clinics, practices, and mobile veterinary services.',
        React.createElement(React.Fragment, null, 'With ', React.createElement('strong', null, 'UrbanVet'), ', I bring veterinary care directly to your home in Berlin and Brandenburg. This avoids transport stress and waiting rooms, allowing your pet to feel calm and safe. I tailor every examination and treatment to your pet’s individual needs, using ', React.createElement('strong', null, 'calming pheromones for cats'), ' or a ', React.createElement('strong', null, 'calm, respectful approach for dogs'), '.'),
        React.createElement(React.Fragment, null, 'I combine modern, evidence-based veterinary medicine with a holistic perspective. Where appropriate, I also use ', React.createElement('strong', null, 'homeopathic remedies or plant-based therapies (phytotherapy)'), ' to support treatment. My personal motto: ', React.createElement('strong', null, '“What helps, we use.”'), ' Every pet is unique – and so should their care be.'),
        React.createElement(React.Fragment, null, 'I am also passionate about ', React.createElement('strong', null, 'behavioral medicine'), ' for dogs and cats. Alongside veterinary care, I train as a dog trainer to offer guidance on behavior, training, and everyday life – from rescue dogs to city companions.'),
        React.createElement(React.Fragment, null, 'With ', React.createElement('strong', null, 'UrbanVet'), ', you get professional, compassionate, and personalized mobile veterinary care – right at your home. I speak ', React.createElement('strong', null, 'German, English, and Greek'), '.')
      ]
    },
    blog: {
      title: 'UrbanVet Blog',
      subtitle: 'Tips and insights from veterinary life and everyday care for dogs and cats.',
      back_button: 'Back to Blog',
      posts: [
        {
          title: 'Mobile Vet Home Visit: How to Prepare Your Pet and Home',
          summary: 'How to prepare your home for a veterinary house call. Practical tips for dogs, cats, and nervous pets.',
          content: React.createElement(React.Fragment, null,
            React.createElement('p', null, 'How to prepare your home for a veterinary house call. Tips for dogs, cats and nervous pets from a mobile veterinarian in Berlin.'),
            React.createElement('p', null, React.createElement('a', { href: 'en/services', className: 'text-red-700 font-semibold hover:underline' }, 'Services')),
            React.createElement('p', null, 'As a mobile veterinarian in Berlin, I come directly to your home. For many animals, this is much less stressful than visiting a veterinary clinic. To make the appointment as calm and smooth as possible for your pet, a few simple preparations can help.'),
            React.createElement('p', null, 'With the following tips, you can help ensure that I can examine and treat your pet effectively during the veterinary home visit.'),
            React.createElement('h2', null, '1. A Calm Environment – Relaxed Humans, Relaxed Animals'),
            React.createElement('p', null, 'Animals are very sensitive to our emotions. If you remain calm and relaxed, your dog or cat will often pick up on that.'),
            React.createElement('p', null, 'Make sure you allow enough time before the appointment so you do not feel rushed. Try to avoid loud music, vacuuming, or having many unfamiliar people in the room.'),
            React.createElement('p', null, 'If small children are present, it may help to choose a quieter room for the examination. You can also reassure your pet beforehand by gently talking to them, petting them, or following a small calming routine.'),
            React.createElement('h2', null, '2. The Right Space for Examination and Laptop'),
            React.createElement('p', null, 'For many examinations, I need a clean and well-lit surface. A stable table or counter at a comfortable height works best.'),
            React.createElement('p', null, 'It is also helpful to have a little space nearby for my laptop and medical equipment. A power outlet nearby is useful, but not essential.'),
            React.createElement('p', null, 'For large dogs, examinations are often performed on the floor. A non-slip mat or carpet can help your dog stand comfortably and safely.'),
            React.createElement('h2', null, '3. Favorite Treats and Familiar Items'),
            React.createElement('p', null, 'Positive experiences can make a big difference. Please have the following ready:'),
            React.createElement('ul', null,
              React.createElement('li', null, 'your pet’s favorite treats'),
              React.createElement('li', null, 'possibly a favorite toy'),
              React.createElement('li', null, 'or a familiar blanket')
            ),
            React.createElement('p', null, 'These can help distract and reward your pet during the examination and create a more positive experience during the veterinary home visit.'),
            React.createElement('p', null, React.createElement('a', { href: 'en/services', className: 'text-red-700 font-semibold hover:underline' }, 'Services')),
            React.createElement('h2', null, '4. Preparing Shy or Anxious Cats'),
            React.createElement('p', null, 'For cats in particular, good preparation is very important.'),
            React.createElement('p', null, 'If possible, choose a smaller room where the cat can stay before my arrival. Common hiding places such as under the bed or behind large cabinets should ideally be blocked beforehand so the cat remains accessible.'),
            React.createElement('p', null, 'If your cat has outdoor access, please do not let them outside shortly before the appointment. Indoor cats should ideally remain in the prepared room as well.'),
            React.createElement('p', null, 'This helps avoid unnecessary stress for both the pet and the owner.'),
            React.createElement('h2', null, '5. Preparing Nervous or Uncertain Dogs'),
            React.createElement('p', null, 'For nervous or anxious dogs, a little preparation can make a big difference. Please put a leash or collar on your dog before my arrival, so we can guide them safely if needed.'),
            React.createElement('p', null, 'In some situations, a muzzle can be helpful, especially if the dog is very stressed. It is important that the dog is already familiar with the muzzle and ideally has had positive experiences with it.'),
            React.createElement('p', null, 'For some dogs, an examination or treatment outside, such as in the garden or in front of the house, can actually be more relaxing than inside the home.'),
            React.createElement('p', null, 'Feel free to contact me beforehand so we can find the best solution for your pet together.'),
            React.createElement('h2', null, '6. Preparing Documents and Information'),
            React.createElement('p', null, 'Even during a veterinary home visit, some information is very important. If available, please have the following ready:'),
            React.createElement('ul', null,
              React.createElement('li', null, 'vaccination booklet or EU pet passport'),
              React.createElement('li', null, 'previous medical reports or laboratory results'),
              React.createElement('li', null, 'any available X-rays'),
              React.createElement('li', null, 'a list of current medications')
            ),
            React.createElement('p', null, 'It is also helpful to make a short note about your pet’s current symptoms:'),
            React.createElement('ul', null,
              React.createElement('li', null, 'When did they start?'),
              React.createElement('li', null, 'What exactly have you noticed?'),
              React.createElement('li', null, 'In which situations do they occur?')
            ),
            React.createElement('p', null, 'Many pet owners also like to write down their questions beforehand, so nothing is forgotten during the appointment.'),
            React.createElement('h2', null, '7. Preparing the Environment for Special Situations'),
            React.createElement('p', null, 'Some treatments require a little more preparation.'),
            React.createElement('p', null, 'For blood tests or infusions, a quiet and well-lit area is particularly helpful. For older or physically limited animals, non-slip mats or blankets can provide extra stability.'),
            React.createElement('p', null, 'If multiple pets live in the household, it is often best to keep the other animals in a different room during the examination, so everyone stays calmer.'),
            React.createElement('h2', null, 'Checklist Before My Veterinary Home Visit'),
            React.createElement('ul', null,
              React.createElement('li', null, 'Appointment time noted and enough time planned'),
              React.createElement('li', null, 'Quiet room prepared'),
              React.createElement('li', null, 'Table or surface cleared for examination'),
              React.createElement('li', null, 'Favorite treats or toys ready'),
              React.createElement('li', null, 'Cat in prepared room, hiding places secured'),
              React.createElement('li', null, 'Dog wearing collar or leash'),
              React.createElement('li', null, 'Vaccination booklet, medical records and medication list ready'),
              React.createElement('li', null, 'Your questions written down')
            ),
            React.createElement('p', null, 'Tip: A well-prepared appointment makes the veterinary home visit much more relaxed for your pet. In the familiar environment of home, many examinations can be carried out more calmly and with less stress.'),
            React.createElement('p', null, React.createElement('a', { href: 'en/contact', className: 'text-red-700 font-semibold hover:underline' }, 'Contact'))
          )
        },
        {
          title: 'When Should My Pet See a Veterinarian? Important Warning Signs in Dogs and Cats',
          summary: 'Which warning signs should always be taken seriously in dogs and cats.',
          content: React.createElement(React.Fragment, null,
            React.createElement('p', null, 'Most pet owners know their animals very well. Small changes in behavior or health are often noticed quickly. However, it is not always clear when a veterinary visit is really necessary.'),
            React.createElement('p', null, 'As a mobile veterinarian in Berlin, I often see pet owners who are unsure whether they should act immediately or wait a little longer. In general, it is always better to ask a veterinarian too early rather than too late.'),
            React.createElement('p', null, 'The following warning signs should always be taken seriously.'),
            React.createElement('h2', null, '1. Loss of Appetite'),
            React.createElement('p', null, 'If your pet suddenly stops eating, there can be many reasons.'),
            React.createElement('p', null, 'Cats require special attention: 24 hours without food can already become problematic.'),
            React.createElement('p', null, 'Dogs should also be monitored closely, especially if other symptoms such as vomiting, diarrhea, or lethargy occur.'),
            React.createElement('h2', null, '2. Vomiting or Diarrhea'),
            React.createElement('p', null, 'Occasional vomiting or diarrhea can sometimes be harmless.'),
            React.createElement('p', null, 'However, if the symptoms occur repeatedly, last longer than 24 hours, or your pet appears weak, a veterinary examination is recommended.'),
            React.createElement('p', null, 'This is particularly important for puppies, kittens, or older animals, as dehydration can become dangerous quickly.'),
            React.createElement('h2', null, '3. Limping or Signs of Pain'),
            React.createElement('p', null, 'If your pet suddenly starts limping, avoids movement, or shows signs of pain, the cause should be investigated.'),
            React.createElement('p', null, 'Sometimes it may simply be a minor strain, but in other cases injuries, joint problems, or foreign objects could be involved.'),
            React.createElement('h2', null, '4. Changes in Behavior'),
            React.createElement('p', null, 'Sudden behavioral changes can be an important warning sign, for example:'),
            React.createElement('ul', null,
              React.createElement('li', null, 'unusual tiredness'),
              React.createElement('li', null, 'hiding or withdrawal'),
              React.createElement('li', null, 'aggression or restlessness'),
              React.createElement('li', null, 'unusual vocalization')
            ),
            React.createElement('p', null, 'Especially in cats, behavioral changes are often one of the first signs of illness or pain.'),
            React.createElement('h2', null, '5. Problems Urinating or Defecating'),
            React.createElement('p', null, 'If your pet has difficulty urinating, goes to the litter box very frequently, or shows blood in the urine, this should be examined by a veterinarian.'),
            React.createElement('p', null, 'In male cats especially, a urinary blockage can become life-threatening.'),
            React.createElement('p', null, React.createElement('a', { href: 'en/services', className: 'text-red-700 font-semibold hover:underline' }, 'Services')),
            React.createElement('h2', null, '6. Coughing or Breathing Problems'),
            React.createElement('p', null, 'Persistent coughing, rapid breathing, or breathing difficulties should always be taken seriously. These symptoms can indicate infections, heart disease, or other health issues.'),
            React.createElement('h2', null, '7. Wounds or Injuries'),
            React.createElement('p', null, 'Even smaller wounds can become infected. Bite wounds, deep cuts, or strong swelling should always be evaluated by a veterinarian.'),
            React.createElement('h2', null, 'When in Doubt, Act Early'),
            React.createElement('p', null, 'You know your pet best. If you feel that something is not right, it is worth having it checked.'),
            React.createElement('p', null, 'Many examinations can also be performed during a veterinary home visit, which is much less stressful for many animals.'),
            React.createElement('p', null, React.createElement('a', { href: 'en/contact', className: 'text-red-700 font-semibold hover:underline' }, 'Contact'))
          )
        },
        {
          title: 'Pet Emergency: When You Should See a Veterinarian Immediately',
          summary: 'Acute emergency situations in pets where every minute counts.',
          content: React.createElement(React.Fragment, null,
            React.createElement('p', null, 'Some situations are true emergencies and require immediate veterinary attention. In these cases, every minute counts.'),
            React.createElement('p', null, 'If you notice any of the following symptoms, you should act quickly.'),
            React.createElement('h2', null, 'Difficulty Breathing'),
            React.createElement('p', null, 'If your pet is struggling to breathe, breathing very rapidly, or has bluish gums or tongue, this is an acute emergency and requires immediate veterinary care.'),
            React.createElement('h2', null, 'Seizures'),
            React.createElement('p', null, 'A seizure can be very frightening to witness. During the seizure, try to protect your pet from injury and avoid touching the mouth. After the episode, seek veterinary help as soon as possible.'),
            React.createElement('h2', null, 'Suspected Poisoning'),
            React.createElement('p', null, 'If your pet may have ingested something toxic, for example medications, poison bait, toxic plants, or chocolate, you should contact a veterinarian immediately.'),
            React.createElement('h2', null, 'Severe Pain'),
            React.createElement('p', null, 'Animals often show pain through signs such as:'),
            React.createElement('ul', null,
              React.createElement('li', null, 'whining or crying'),
              React.createElement('li', null, 'extreme restlessness'),
            React.createElement('li', null, 'a hunched or tense posture'),
              React.createElement('li', null, 'aggressive or unusual behavior')
            ),
            React.createElement('p', null, 'Sudden and severe pain should always be taken seriously.'),
            React.createElement('p', null, React.createElement('a', { href: 'en/services', className: 'text-red-700 font-semibold hover:underline' }, 'Services')),
            React.createElement('h2', null, 'Severe Bleeding or Serious Injuries'),
            React.createElement('p', null, 'After accidents, falls, or bite wounds, a prompt veterinary examination is very important.'),
            React.createElement('h2', null, 'Swallowing a Foreign Object'),
            React.createElement('p', null, 'If your pet has swallowed toys, bones, or other objects, this can cause dangerous intestinal blockages and requires veterinary attention.'),
            React.createElement('h2', null, 'Collapse or Loss of Consciousness'),
            React.createElement('p', null, 'If your pet suddenly collapses or becomes unresponsive, it is always considered an emergency.'),
            React.createElement('h2', null, 'When in Doubt, Act Early'),
            React.createElement('p', null, 'If you are unsure whether it is an emergency, it is always better to seek veterinary advice quickly.'),
            React.createElement('p', null, 'As a mobile veterinarian, I can assess many situations directly at your home. In acute emergencies, I can also determine whether immediate treatment at a veterinary clinic is necessary.'),
            React.createElement('p', null, React.createElement('a', { href: 'en/contact', className: 'text-red-700 font-semibold hover:underline' }, 'Contact'))
          )
        }
      ]
    },
    contactPage: {
      title: 'Get in Touch',
      subtitle: 'Ready to schedule a visit or have a question? Contact UrbanVet.',
      email: 'info@urbanvet.de',
      phoneLabel: 'Call us directly:',
      infoSections: buildSharedInfoSections(Language.EN)
    },
    impressum: {
      title: 'Legal Notice',
      content: `
        <h2>Information pursuant to § 5 DDG (German Digital Services Act)</h2>
        <p>Tierarztpraxis UrbanVet Berlin<br>
        Susanne Repanelis<br>
        Fontanestraße 32<br>
        12049 Berlin<br>
        Germany</p>
        <h2>Contact</h2>
        <p>Phone: <a href="tel:+491716494610">+49 171 64 94 610</a><br>
        Email: <a href="mailto:info@urbanvet.de">info@urbanvet.de</a></p>
        <h2>Professional information</h2>
        <p><strong>Statutory professional title:</strong> Veterinarian (Tierärztin), awarded in Austria</p>
        <p><strong>Competent chamber:</strong> Tierärztekammer Berlin (Berlin Chamber of Veterinarians), Littenstraße 108, 10179 Berlin, Germany, <a href="https://tieraerztekammer-berlin.de/" target="_blank" rel="noopener noreferrer">tieraerztekammer-berlin.de</a></p>
        <p><strong>Professional regulations</strong> (available in German):</p>
        <ul>
          <li>Professional Code of the Berlin Chamber of Veterinarians (Berufsordnung), <a href="https://tieraerztekammer-berlin.de/wp-content/uploads/2024/06/Berufsordnung_inkl_1_Aenderung_2016-11-10.pdf" target="_blank" rel="noopener noreferrer">PDF</a></li>
          <li>Federal Veterinary Act (Bundes-Tierärzteordnung, BTÄO), <a href="https://www.gesetze-im-internet.de/b_o/" target="_blank" rel="noopener noreferrer">gesetze-im-internet.de/b_o</a></li>
          <li>Veterinary Fee Schedule (Gebührenordnung für Tierärztinnen und Tierärzte, GOT), <a href="https://www.gesetze-im-internet.de/got_2022/" target="_blank" rel="noopener noreferrer">gesetze-im-internet.de/got_2022</a></li>
        </ul>
        <h2>Responsible for content pursuant to § 18 (2) MStV</h2>
        <p>Susanne Repanelis, address as above</p>
        <h2>Consumer dispute resolution</h2>
        <p>We are neither willing nor obliged to participate in dispute resolution proceedings before a consumer arbitration board.</p>
        <h2>Data protection</h2>
        <p>How we handle your data is explained in our <a href="en/privacy">Privacy Policy</a>.</p>
      `
    },
    privacy: {
      title: 'Privacy Policy',
      content: `
        <p>This policy explains which personal data we process when you visit this website and when we treat your animal, and which rights you have. This English version is provided for convenience. The <a href="datenschutz">German version</a> is legally binding.</p>
        <h2>1. Controller</h2>
        <p>Susanne Repanelis<br>
        Tierarztpraxis UrbanVet Berlin<br>
        Fontanestraße 32<br>
        12049 Berlin, Germany<br>
        Phone: <a href="tel:+491716494610">+49 171 64 94 610</a><br>
        Email: <a href="mailto:info@urbanvet.de">info@urbanvet.de</a></p>
        <p>If you have questions about data protection or want to exercise your rights, you can reach us using these contact details.</p>
        <h2>2. Summary</h2>
        <ul>
          <li>When you open the website, our hosting provider processes technically necessary access data.</li>
          <li>Your choice in the cookie banner is stored so that we can respect it and prove it.</li>
          <li>Google services (Tag Manager, Analytics, Ads) are only loaded after you have consented. Without your consent, no data is sent to Google.</li>
          <li>If you contact us, book an appointment or have your animal treated, we process the information needed for that.</li>
        </ul>
        <h2>3. Hosting and access data</h2>
        <p>This website is served via GitHub Pages, provided by GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, USA. When you open a page, technically necessary data is processed, in particular your IP address, date and time of access, the requested address, the previously visited page (referrer) and information about your browser and operating system. The website cannot be delivered without this data. It also serves the security and stability of the service, for example to fend off attacks.</p>
        <p>The legal basis is our legitimate interest in providing the website securely and reliably (Art. 6(1)(f) GDPR). We do not receive access logs ourselves and do not analyse this data. Data may be transferred to the USA. According to GitHub, it participates in the EU-U.S. Data Privacy Framework, for which the European Commission has adopted an adequacy decision (Art. 45 GDPR). See <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" target="_blank" rel="noopener noreferrer">GitHub's privacy statement</a> for details.</p>
        <h2>4. SSL/TLS encryption</h2>
        <p>For security reasons, this website uses SSL/TLS encryption. You can recognise an encrypted connection by "https://" in the address bar and the lock icon in your browser.</p>
        <h2>5. Cookie banner and consent management (Usercentrics)</h2>
        <p>We use the consent management platform Usercentrics, provided by Usercentrics GmbH, Sendlinger Straße 7, 80331 Munich, Germany, to request and manage your consent. On your first visit, the banner shows which services we would like to use. You can accept all, reject all or choose individually.</p>
        <p>This involves processing your decision for each service, a random consent ID, date and time, the banner version, the language, your IP address and information about your browser, device and the referring page. Your decision is stored in your browser's local storage so that the banner does not reappear on every visit. Usercentrics stores the record of consent on our behalf for one year.</p>
        <p>The legal basis is our legal obligation to be able to demonstrate consent (Art. 6(1)(c) GDPR in conjunction with Art. 7(1) GDPR). Storing your choice in your browser is strictly necessary for this (§ 25(2) no. 2 TDDDG).</p>
        <p><strong>Changing your choice or withdrawing consent:</strong> You can change your settings at any time with effect for the future, via "Cookie settings" in the footer of every page, via the fingerprint icon at the bottom left, or right here:</p>
        <p><button type="button" class="legal-button" data-cookie-settings>Open cookie settings</button></p>
        <h2>6. Google services (only with your consent)</h2>
        <p>We only use the following services if you have consented in the cookie banner. Before that, no Google script is loaded and no data is sent to Google. The provider in each case is Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Ireland ("Google").</p>
        <p>The legal basis is your consent (Art. 6(1)(a) GDPR, § 25(1) TDDDG). You can withdraw it at any time via the cookie settings. Processing carried out before the withdrawal remains lawful.</p>
        <p><strong>Transfers to third countries:</strong> Google also processes data on servers outside the EU, in particular in the USA. Google LLC is certified under the EU-U.S. Data Privacy Framework, for which an adequacy decision of the European Commission exists (Art. 45 GDPR). For transfers to other third countries, Google uses the EU Standard Contractual Clauses (Art. 46(2)(c) GDPR).</p>
        <h3>Google Tag Manager</h3>
        <p>We use Google Tag Manager to integrate the Google services listed below and to control when they are triggered. Tag Manager itself does not set cookies or create user profiles. Loading it does, however, transmit your IP address to Google, which is why we only load it after you have consented.</p>
        <h3>Google Analytics 4</h3>
        <p>Google Analytics shows us how our website is used so that we can improve it. It records, for example, pages viewed, time spent, clicks, the page you came from, device type, browser and your approximate location (country, city). Your IP address is only used for this rough location and is not stored by Google Analytics 4. Analysis is pseudonymous, based on a random identifier, and does not allow us to identify you personally.</p>
        <p>Cookies: <code>_ga</code> and <code>_ga_&lt;ID&gt;</code>, each for up to 2 years. Recorded event data is deleted after 14 months at the latest. Google processes this data as our processor.</p>
        <p>In addition to withdrawing consent via the cookie settings, you can use the <a href="https://tools.google.com/dlpage/gaoptout?hl=en" target="_blank" rel="noopener noreferrer">Google Analytics opt-out browser add-on</a>.</p>
        <h3>Google Ads and conversion tracking</h3>
        <p>We advertise on Google. To measure how well these ads work, we use Google Ads conversion tracking. If you reached our website through one of our ads and then click our phone number, our email address or the WhatsApp button, Google learns that the ad led to a contact. We only see aggregated figures, for example how many contacts came from ads, and cannot identify individual people from them.</p>
        <p>For this purpose, cookies such as <code>_gcl_au</code> and <code>_gcl_aw</code> (90 days each) are set, which store an identifier of the ad click (Conversion Linker).</p>
        <h3>Google Ads remarketing</h3>
        <p>Remarketing allows us to show UrbanVet ads to people who have visited our website when they later browse other websites or use Google services. Google sets cookies for this, including on the domain doubleclick.net (for example <code>IDE</code> or <code>test_cookie</code>), and builds pseudonymous audiences. If you are signed in to Google, Google may link your visit to your Google account, depending on your account settings. You can also turn off personalised ads at <a href="https://myadcenter.google.com/" target="_blank" rel="noopener noreferrer">myadcenter.google.com</a>.</p>
        <p>For Google Ads (conversion tracking and remarketing), Google is an independent controller alongside us. More information: <a href="https://policies.google.com/technologies/ads?hl=en" target="_blank" rel="noopener noreferrer">How Google uses cookies in advertising</a> and <a href="https://policies.google.com/privacy?hl=en" target="_blank" rel="noopener noreferrer">Google Privacy Policy</a>.</p>
        <h3>Google Consent Mode</h3>
        <p>We use Google Consent Mode. Usercentrics tells the Google services which purposes you have consented to (statistics, advertising, personalisation), and the services follow that choice. If, for example, you only consent to statistics, the advertising services do not run at all or only in a restricted mode without cookies and without personalisation. If you reject everything, none of the Google services are loaded.</p>
        <h2>7. Fonts</h2>
        <p>This website does not load fonts from third-party servers. Text is displayed in your device's standard fonts.</p>
        <h2>8. Online booking via termin.vet</h2>
        <p>For online appointment booking we use termin.vet, a service of vetpraxis.de GmbH &amp; Co. KG, Dorfstr. 15, 84069 Schierling, Germany. The "Book appointment" button on our website is an image stored on our own server. Only when you click it does the termin.vet booking page open in a new window.</p>
        <p>There, the provider processes the information you enter for the booking on our behalf, such as your name, contact details, information about your animal and the requested appointment. The legal basis is arranging and carrying out the treatment (Art. 6(1)(b) GDPR). The booking page is additionally subject to termin.vet's own privacy information.</p>
        <h2>9. Contact by phone, email or WhatsApp</h2>
        <p>If you call or write to us, we process your information (for example name, phone number, email address and your request) to answer you. If it concerns a treatment or an appointment, the legal basis is Art. 6(1)(b) GDPR, otherwise our legitimate interest in answering your request (Art. 6(1)(f) GDPR). We delete the data once it is no longer needed and no statutory retention obligations apply.</p>
        <p><strong>WhatsApp:</strong> The WhatsApp button takes you to WhatsApp, a service of WhatsApp Ireland Limited, Merrion Road, Dublin 4, D04 X2K5, Ireland. If you write to us there, WhatsApp processes your phone number, your profile and connection data, among other things. Message content is end-to-end encrypted. Data may be transferred to Meta Platforms, Inc. in the USA, which is certified under the EU-U.S. Data Privacy Framework. Using WhatsApp is voluntary, you can reach us just as well by phone or email.</p>
        <h2>10. Data processed during veterinary treatment</h2>
        <p>To treat your animal, we process your contact details and the address for the home visit, information about your animal (for example medical history, findings, diagnoses, treatments, medication and vaccinations) and billing data.</p>
        <p>The legal basis is the treatment contract (Art. 6(1)(b) GDPR). Where the law imposes documentation and retention obligations on us, for example veterinary professional law, veterinary medicines law or commercial and tax law, the legal basis is Art. 6(1)(c) GDPR.</p>
        <p><strong>Recipients:</strong> We only pass on data if this is necessary for treatment or billing, if we are legally obliged to do so or if you ask us to. Recipients may include diagnostic laboratories, co-treating or referring veterinarians and veterinary clinics, payment and billing service providers, our tax advisor, authorities within the scope of statutory reporting obligations and, at your request, your pet health insurer.</p>
        <p><strong>Retention:</strong> We store this data for as long as it is needed for the treatment and beyond that for the statutory retention periods (depending on the document, generally up to ten years).</p>
        <h2>11. Your rights</h2>
        <p>You have the right to:</p>
        <ul>
          <li>access the data stored about you (Art. 15 GDPR)</li>
          <li>rectification of inaccurate data (Art. 16 GDPR)</li>
          <li>erasure of your data, unless a retention obligation applies (Art. 17 GDPR)</li>
          <li>restriction of processing (Art. 18 GDPR)</li>
          <li>data portability (Art. 20 GDPR)</li>
          <li>withdraw consent with effect for the future (Art. 7(3) GDPR)</li>
        </ul>
        <div class="legal-note">
          <p><strong>Right to object under Art. 21 GDPR</strong></p>
          <p>Where we process data on the basis of our legitimate interest (Art. 6(1)(f) GDPR), you may object at any time on grounds relating to your particular situation. We will then stop processing the data unless we can demonstrate compelling legitimate grounds that override your interests, or the processing serves the establishment, exercise or defence of legal claims.</p>
        </div>
        <p><strong>Right to lodge a complaint:</strong> You can lodge a complaint with a data protection supervisory authority (Art. 77 GDPR). The authority responsible for us is the Berliner Beauftragte für Datenschutz und Informationsfreiheit (Berlin Commissioner for Data Protection and Freedom of Information), Alt-Moabit 59-61, 10555 Berlin, Germany, <a href="https://www.datenschutz-berlin.de/" target="_blank" rel="noopener noreferrer">datenschutz-berlin.de</a>.</p>
        <h2>12. Provision of data and automated decisions</h2>
        <p>You can use this website without providing any personal information yourself. For a treatment we need the information required for it, without it we cannot perform the treatment contract. No automated decision-making within the meaning of Art. 22 GDPR takes place.</p>
        <h2>13. Changes</h2>
        <p>We update this privacy policy when our website, the services we use or the legal situation change. The version published here applies.</p>
        <p class="legal-meta">Last updated: October 2026</p>
      `
    },
    footer: { tagline: 'Calm mobile veterinary care.', legalNavLabel: 'Legal', imprint: 'Legal Notice', privacy: 'Privacy Policy', cookieSettings: 'Cookie settings', phoneLabel: 'Phone', openingHoursLabel: 'Opening Hours', scheduleLine1: 'Monday – Friday: 10:00 AM – 6:00 PM', scheduleLine2: 'Emergency hours Monday – Friday: 6:00 PM – 10:00 PM', scheduleLine3: 'Emergency hours Saturday – Sunday: 10:00 AM – 10:00 PM', appointmentNote: 'Appointments outside regular opening hours may be arranged by appointment. Please feel free to contact me to arrange a suitable appointment time.' }
  },
  [Language.DE]: {
    nav: { [Page.HOME]: 'Startseite', [Page.SERVICES]: 'Leistungen', [Page.ABOUT]: 'Über Mich', [Page.BLOG]: 'Blog', [Page.CONTACT]: 'Kontakt', [Page.IMPRESSUM]: 'Impressum', [Page.PRIVACY]: 'Datenschutz' },
    home: {
      heroLeadLines: ['Mit Liebe für Tiere.', 'Tiermedizin bei Ihnen zu Hause.'],
      heroSubtitle: 'Mobile Tierarztpraxis für Hunde und Katzen in Berlin und Brandenburg persönlich, stressfrei und mit Zeit für Sie und Ihr Tier.',
      ctaButton: 'Termin vereinbaren',
      introTitle: '',
      introParagraphs: [
        'Der Weg zum Tierarzt und das Warten im Wartezimmer sind für viele Tiere sehr belastend. Katzen reagieren oft empfindlich auf fremde Umgebung.',
        'Mit UrbanVet besucht Sie Ihre Tierärztin zu Hause. Untersuchung und Behandlung können in der vertrauten Umgebung Ihres Tieres erheblich ruhiger und entspannter ablaufen.',
        'Ich nehme mir Zeit für gründliche Untersuchung, individuelle Beratung und eine Behandlung, die auf die Bedürfnisse Ihres Tieres abgestimmt ist.',
        'UrbanVet bietet mobile tierärztliche Hausbesuche für Hunde und Katzen in Berlin und Brandenburg – für eine medizinische Versorgung mit Ruhe, Vertrauen und persönlicher Betreuung.'
      ],
      aboutTitle: 'Über Mich',
      aboutText: 'Tiere waren schon immer ein großer Teil meines Lebens und ich wusste schon früh, dass ich Tierärztin werden möchte.',
      infoSections: buildSharedInfoSections(Language.DE)
    },
    services: {
      title: 'Leistungen – UrbanVet',
      subtitle: 'Mobile Tierarztpraxis für Hunde und Katzen in Berlin und Brandenburg – ruhig, persönlich und mit Zeit für Ihr Tier.',
      items: [
        {
          id: 'impfungen-vorsorge',
          title: 'Impfungen & Vorsorge',
          description: 'Für ein langes, gesundes Leben Ihres Tieres.',
          longDescription: 'Für ein langes, gesundes Leben Ihres Tieres:',
          subServices: [
            'Allgemeine Gesundheitschecks',
            'Impfungen für Hunde & Katzen',
            'Vorsorgeprogramme für Senioren',
            'EU-Heimtierausweis & Reisemedizin',
            'Parasitenprophylaxe: Flöhe, Zecken, Würmer',
            'Ernährungsberatung & Gewichtsmanagement'
          ]
        },
        {
          id: 'notfall-hausbesuche',
          title: 'Notfall- & Hausbesuche',
          description: 'Schnelle Hilfe direkt bei Ihnen zu Hause.',
          longDescription: 'Schnelle Hilfe direkt bei Ihnen zu Hause:',
          subServices: [
            'Wundversorgung & Notfallbehandlung',
            'Notfallsprechstunde außerhalb der regulären Zeiten',
            'Medikamentenversorgung vor Ort',
            'Euthanasie'
          ]
        },
        {
          id: 'innere-medizin-diagnostik',
          title: 'Innere Medizin & Diagnostik',
          description: 'Ganzheitliche Untersuchung und Behandlung für die Gesundheit Ihres Tieres.',
          longDescription: 'Ganzheitliche Untersuchung und Behandlung für die Gesundheit Ihres Tieres:',
          subServices: [
            'Diagnostik & Therapie von Magen-Darm-Beschwerden',
            'Endokrinologische Erkrankungen (Diabetes, Schilddrüse, Nebennieren)',
            'Nieren- und Harnwegserkrankungen',
            'Laboruntersuchungen & Schnelltests'
          ]
        },

        {
          id: 'geriatrie-palliativpflege',
          title: 'Geriatrie & Palliativpflege',
          description: 'Respektvolle Betreuung in sensiblen Lebensphasen.',
          longDescription: 'Respektvolle Betreuung in sensiblen Lebensphasen:',
          subServices: [
            'Seniorenchecks & altersgerechte Betreuung',
            'Schmerztherapie',
            'Palliativpflege zu Hause'
          ]
        },
        {
          id: 'verhaltensmedizin',
          title: 'Verhaltensmedizin',
          description: 'Für ein harmonisches Zusammenleben.',
          longDescription: 'Für ein harmonisches Zusammenleben:',
          subServices: [
            'Verhaltensberatung für Hunde & Katzen',
            'Stressfreies Zusammenleben mit Hund und Katze',
            'Unterstützung bei Angst, Aggression oder Stress',
            'Medikamentöse Verhaltenstherapie'
          ]
        },
        {
          id: 'zusaetzliche-services',
          title: 'Zusätzliche Services',
          description: 'Individuelle Beratung & Organisation.',
          longDescription: 'Individuelle Beratung & Organisation:',
          subServices: [
            'Beratung vor Anschaffung eines Haustieres',
            'Reiseberatung & Gesundheitszeugnisse',
            'Impf- und Medikamentenerinnerungen'
          ]
        }
      ],
      costsTitle: 'Welche Kosten fallen an?',
      costsContent: React.createElement(React.Fragment, null,
        React.createElement('p', null, 'Bei UrbanVet berechne ich meine Leistungen nach der ', React.createElement('strong', null, 'neuen Gebührenordnung für Tierärzte (GOT, Version 2022)'), ', die seit dem 22.11.2022 bundesweit gilt.'),
        React.createElement('p', null, 'Um Ihnen größtmögliche Transparenz zu bieten, erhalten alle Tierhalterinnen und Tierhalter ', React.createElement('strong', null, 'eine detaillierte Rechnung'), ', die Sie auch für Ihre Tierkrankenversicherung einreichen können. Auf Wunsch gebe ich vorab telefonisch Auskunft zu den üblichen Leistungen und Preisen.'),
        React.createElement('p', { className: 'font-semibold text-gray-900 mb-0' }, 'Pflichtleistungen laut GOT:'),
        React.createElement('p', null, React.createElement('strong', null, 'Hausbesuchsgebühr & Wegegeld:'), ' Für jeden Hausbesuch berechne ich das gesetzlich vorgeschriebene Wegegeld sowie die Hausbesuchsgebühr.'),
        React.createElement('p', { className: 'font-semibold text-gray-900 mb-0' }, 'Zahlungsmöglichkeiten:'),
        React.createElement('ul', { className: 'list-none pl-0 mt-0 space-y-2' },
          React.createElement('li', null, 'Barzahlung'),
          React.createElement('li', null, 'Kreditkarte (Visa, Mastercard)'),
          React.createElement('li', null, 'Maestro (EC-Karte)'),
          React.createElement('li', null, 'Google Pay & Apple Pay')
        )
      )
    },
    about: {
      title: 'Über Mich',
      profileName: 'Susanne Repanelis',
      profileRole: 'Tierärztin',
      paragraphs: [
        'Tiere haben schon immer einen großen Teil meines Lebens ausgefüllt, und schon früh wusste ich: Ich möchte Tierärztin werden. Nach meinem Studium der Veterinärmedizin in Wien konnte ich in Österreich, Griechenland und Deutschland wertvolle Erfahrung in der Kleintiermedizin sammeln – sowohl in Praxen und Kliniken als auch in mobilen Tierarztpraxen.',
        React.createElement(React.Fragment, null, 'Mit ', React.createElement('strong', null, 'UrbanVet'), ', meiner mobilen Tierarztpraxis für Berlin und Brandenburg, bringe ich die Praxis direkt zu Ihnen nach Hause. So vermeiden Sie Transportstress und Wartezimmer für Ihr Tier. Ich nehme mir die Zeit, die Ihr Tier wirklich braucht, und passe jede Untersuchung und Behandlung individuell an. Bei Katzen setze ich bei Bedarf beruhigende Pheromone ein, um eine entspannte Atmosphäre zu schaffen. Bei Hunden achte ich auf einen ruhigen, respektvollen und angstfreien Ablauf – immer maßgeschneidert auf Ihren Hund.'),
        React.createElement(React.Fragment, null, 'In meiner täglichen Arbeit verbinde ich moderne, evidenzbasierte Tiermedizin mit einem ganzheitlichen Blick auf Ihr Tier. Neben klassischen Behandlungen können, wenn sinnvoll, auch ', React.createElement('strong', null, 'Homöopathika oder pflanzliche Therapien (Phytotherapie)'), ' unterstützend eingesetzt werden. Mein persönliches Motto lautet: ', React.createElement('strong', null, '„Was hilft, das nehmen wir.“'), ' Jedes Tier ist einzigartig – und genauso sollte auch seine Behandlung sein.'),
        React.createElement(React.Fragment, null, 'Mein Interesse gilt zudem der ', React.createElement('strong', null, 'Verhaltensmedizin'), ' bei Hunden und Katzen. Parallel zu meiner tierärztlichen Tätigkeit bilde ich mich zur Hundetrainerin weiter, sodass ich Sie umfassend zu Hundetraining, Verhalten und Alltag mit Ihrem Vierbeiner beraten kann – vom Tierschutzhund bis zum Stadthund.'),
        React.createElement(React.Fragment, null, 'Mit ', React.createElement('strong', null, 'UrbanVet'), ' erhalten Sie hochwertige mobile Tiermedizin in Berlin und Brandenburg: professionelle Tierarztbehandlungen mit Ruhe, Empathie und Zeit – direkt bei Ihnen zu Hause. Ich spreche ', React.createElement('strong', null, 'Deutsch, Englisch und Griechisch'), '.')
      ]
    },
    blog: {
      title: 'UrbanVet Blog',
      subtitle: 'Tipps und Einblicke rund um Hunde, Katzen und stressfreie Tiermedizin.',
      back_button: 'Zurück zum Blog',
      posts: [
        {
          title: 'Mobiler Tierarzt Hausbesuch: So bereitest du dein Tier und Zuhause optimal vor',
          summary: 'So bereitest du dein Zuhause optimal auf einen Tierarzt-Hausbesuch vor – mit Tipps für Hunde, Katzen und nervöse Tiere.',
          content: React.createElement(React.Fragment, null,
            React.createElement('p', null, 'So bereitest du dein Zuhause optimal auf einen Tierarzt-Hausbesuch vor. Tipps für Hunde, Katzen und nervöse Tiere vom mobilen Tierarzt in Berlin.'),
            React.createElement('p', null, React.createElement('a', { href: 'leistungen', className: 'text-red-700 font-semibold hover:underline' }, 'Leistungen')),
            React.createElement('p', null, 'Als mobiler Tierarzt in Berlin komme ich direkt zu dir nach Hause. Für viele Tiere ist das deutlich entspannter als ein Besuch in der Praxis. Damit der Termin für dein Tier möglichst ruhig und stressfrei abläuft, helfen ein paar einfache Vorbereitungen.'),
            React.createElement('p', null, 'Mit den folgenden Tipps sorgst du dafür, dass ich dein Tier bei meinem Tierarzt-Hausbesuch optimal untersuchen und behandeln kann.'),
            React.createElement('h2', null, '1. Ruhige Atmosphäre – entspannte Menschen, entspannte Tiere'),
            React.createElement('p', null, 'Tiere spüren unsere Stimmung sehr genau. Wenn du selbst ruhig und gelassen bist, überträgt sich das oft direkt auf deinen Hund oder deine Katze.'),
            React.createElement('p', null, 'Plane daher genügend Zeit ein, damit du vor dem Termin nicht hetzen musst. Vermeide möglichst laute Musik, Staubsauger oder viele fremde Personen im Raum.'),
            React.createElement('p', null, 'Wenn kleine Kinder im Haushalt sind, kann es sinnvoll sein, während der Untersuchung einen ruhigeren Raum zu wählen. Du kannst dein Tier vorher gerne beruhigen – mit Streicheln, ruhigem Zusprechen oder einem kleinen Entspannungsritual.'),
            React.createElement('h2', null, '2. Der richtige Platz für Untersuchung und Laptop'),
            React.createElement('p', null, 'Für viele Untersuchungen brauche ich eine saubere, gut beleuchtete Fläche. Ideal ist ein stabiler Tisch oder eine Arbeitsfläche in angenehmer Höhe.'),
            React.createElement('p', null, 'Daneben sollte etwas Platz für meinen Laptop und Instrumente sein. Eine Steckdose in der Nähe ist hilfreich, aber nicht zwingend notwendig.'),
            React.createElement('p', null, 'Bei großen Hunden arbeite ich häufig auch am Boden. Hier hilft eine rutschfeste Unterlage oder ein Teppich, damit der Hund sicher stehen kann.'),
            React.createElement('h2', null, '3. Lieblingsleckerlis und vertraute Dinge'),
            React.createElement('p', null, 'Positive Erfahrungen helfen enorm. Bitte halte daher bereit:'),
            React.createElement('ul', null,
              React.createElement('li', null, 'die Lieblingsleckerlis deines Tieres'),
              React.createElement('li', null, 'eventuell ein Lieblingsspielzeug'),
              React.createElement('li', null, 'oder eine vertraute Decke')
            ),
            React.createElement('p', null, 'Damit können wir dein Tier während der Untersuchung ablenken, belohnen und den Tierarztbesuch zu Hause mit etwas Positivem verknüpfen.'),
            React.createElement('p', null, React.createElement('a', { href: 'leistungen', className: 'text-red-700 font-semibold hover:underline' }, 'Leistungen')),
            React.createElement('h2', null, '4. Vorbereitung bei scheuen oder ängstlichen Katzen'),
            React.createElement('p', null, 'Gerade bei Katzen ist eine gute Vorbereitung besonders wichtig.'),
            React.createElement('p', null, 'Wähle am besten einen kleineren Raum, in den die Katze vor meinem Besuch gebracht wird. Typische Verstecke wie unter dem Bett oder hinter großen Schränken sollten möglichst vorher blockiert werden, damit die Katze für die Untersuchung gut erreichbar bleibt.'),
            React.createElement('p', null, 'Wenn deine Katze Freigang hat, lass sie bitte kurz vor dem Termin nicht mehr nach draußen. Wohnungskatzen bleiben idealerweise ebenfalls im vorbereiteten Raum.'),
            React.createElement('p', null, 'So vermeiden wir unnötigen Stress für Tier und Halter.'),
            React.createElement('h2', null, '5. Vorbereitung bei aufgeregten oder unsicheren Hunden'),
            React.createElement('p', null, 'Bei nervösen oder unsicheren Hunden hilft eine gute Vorbereitung. Lege deinem Hund bitte vor meinem Besuch eine Leine oder ein Halsband an, damit wir ihn bei Bedarf sicher führen können.'),
            React.createElement('p', null, 'In manchen Situationen kann auch ein Maulkorb sinnvoll sein, besonders wenn der Hund sehr gestresst ist. Wichtig ist dabei, dass der Hund den Maulkorb bereits kennt und möglichst positiv daran gewöhnt ist.'),
            React.createElement('p', null, 'Bei einigen Hunden funktioniert eine Untersuchung oder Behandlung draußen – zum Beispiel im Garten oder vor dem Haus – deutlich entspannter als in der Wohnung.'),
            React.createElement('p', null, 'Sprich mich gerne vorher an, damit wir gemeinsam die beste Lösung für deinen Schatz finden können.'),
            React.createElement('h2', null, '6. Unterlagen und Informationen bereitlegen'),
            React.createElement('p', null, 'Auch bei einem Tierarzt-Hausbesuch sind einige Informationen wichtig. Bitte halte – wenn vorhanden – bereit:'),
            React.createElement('ul', null,
              React.createElement('li', null, 'Impfpass oder EU-Heimtierausweis'),
              React.createElement('li', null, 'frühere Befunde oder Laborergebnisse'),
              React.createElement('li', null, 'eventuell vorhandene Röntgenbilder'),
              React.createElement('li', null, 'eine Liste der aktuellen Medikamente')
            ),
            React.createElement('p', null, 'Hilfreich ist außerdem eine kurze Notiz zu den aktuellen Beschwerden:'),
            React.createElement('ul', null,
              React.createElement('li', null, 'Seit wann bestehen sie?'),
              React.createElement('li', null, 'Wie äußern sie sich genau?'),
              React.createElement('li', null, 'In welchen Situationen treten sie auf?')
            ),
            React.createElement('p', null, 'Viele Tierhalter schreiben sich auch ihre Fragen vorher auf, damit beim Termin nichts vergessen wird.'),
            React.createElement('h2', null, '7. Umgebung für besondere Situationen'),
            React.createElement('p', null, 'Manche Behandlungen benötigen etwas mehr Vorbereitung.'),
            React.createElement('p', null, 'Bei Blutabnahmen oder Infusionen ist ein ruhiger, gut beleuchteter Platz besonders wichtig. Bei älteren oder körperlich eingeschränkten Tieren können rutschfeste Unterlagen zusätzlichen Halt geben.'),
            React.createElement('p', null, 'Wenn mehrere Tiere im Haushalt leben, ist es oft sinnvoll, die anderen Tiere während der Behandlung in einem anderen Raum unterzubringen, damit alle entspannter bleiben.'),
            React.createElement('h2', null, 'Checkliste vor meinem Tierarzt-Hausbesuch'),
            React.createElement('ul', null,
              React.createElement('li', null, 'Terminzeit notiert und genügend Zeit eingeplant'),
              React.createElement('li', null, 'Ruhigen Raum vorbereitet'),
              React.createElement('li', null, 'Tisch oder Fläche für Untersuchung frei gemacht'),
              React.createElement('li', null, 'Lieblingsleckerlis oder Spielzeug bereitgelegt'),
              React.createElement('li', null, 'Katze im vorbereiteten Raum, Verstecke gesichert'),
              React.createElement('li', null, 'Hund mit Halsband oder Leine im Raum'),
              React.createElement('li', null, 'Impfpass, Befunde und Medikamentenliste bereitgelegt'),
              React.createElement('li', null, 'Eigene Fragen notiert')
            ),
            React.createElement('p', null, 'Tipp: Ein gut vorbereiteter Termin macht den Tierarzt-Hausbesuch für dein Tier deutlich entspannter. In der vertrauten Umgebung zu Hause können viele Untersuchungen ruhiger und stressfreier durchgeführt werden.'),
            React.createElement('p', null, React.createElement('a', { href: 'kontakt', className: 'text-red-700 font-semibold hover:underline' }, 'Kontakt'))
          )
        },
        {
          title: 'Wann sollte mein Tier zum Tierarzt? Wichtige Warnzeichen bei Hund und Katze',
          summary: 'Diese Warnzeichen bei Hund und Katze solltest du ernst nehmen.',
          content: React.createElement(React.Fragment, null,
            React.createElement('p', null, 'Als Tierhalter kennt man sein Tier meist sehr gut. Kleine Veränderungen im Verhalten oder in der Gesundheit fallen deshalb schnell auf. Doch nicht immer ist sofort klar, wann ein Tierarztbesuch wirklich notwendig ist.'),
            React.createElement('p', null, 'Als mobiler Tierarzt in Berlin erlebe ich häufig, dass Tierhalter unsicher sind, ob sie schon handeln sollten oder noch abwarten können. Grundsätzlich gilt: Lieber einmal zu früh nachfragen als zu spät.'),
            React.createElement('p', null, 'Die folgenden Warnzeichen sollten ernst genommen werden.'),
            React.createElement('h2', null, '1. Appetitlosigkeit'),
            React.createElement('p', null, 'Wenn dein Tier plötzlich nicht mehr frisst, kann das viele Ursachen haben.'),
            React.createElement('p', null, 'Bei Katzen ist besondere Vorsicht geboten: Bereits 24 Stunden ohne Futter können problematisch werden.'),
            React.createElement('p', null, 'Bei Hunden sollte ebenfalls aufmerksam beobachtet werden, vor allem wenn zusätzlich Symptome wie Erbrechen, Durchfall oder Mattigkeit auftreten.'),
            React.createElement('h2', null, '2. Erbrechen oder Durchfall'),
            React.createElement('p', null, 'Gelegentliches Erbrechen oder Durchfall kann harmlos sein.'),
            React.createElement('p', null, 'Wenn die Symptome jedoch mehrmals auftreten, länger als 24 Stunden anhalten oder dein Tier zusätzlich schwach wirkt, sollte eine tierärztliche Untersuchung erfolgen.'),
            React.createElement('p', null, 'Besonders bei Welpen, Kitten oder älteren Tieren kann Flüssigkeitsverlust schnell gefährlich werden.'),
            React.createElement('h2', null, '3. Lahmheit oder Schmerzen'),
            React.createElement('p', null, 'Wenn dein Tier plötzlich humpelt, sich ungern bewegt oder Schmerzen zeigt, sollte die Ursache abgeklärt werden.'),
            React.createElement('p', null, 'Manchmal handelt es sich nur um eine leichte Überlastung – in anderen Fällen können Verletzungen, Gelenkprobleme oder Fremdkörper dahinterstecken.'),
            React.createElement('h2', null, '4. Veränderungen im Verhalten'),
            React.createElement('p', null, 'Plötzliche Veränderungen können ein wichtiges Warnsignal sein. Dazu gehören zum Beispiel:'),
            React.createElement('ul', null,
              React.createElement('li', null, 'ungewöhnliche Müdigkeit'),
              React.createElement('li', null, 'Rückzug oder Verstecken'),
              React.createElement('li', null, 'Aggressivität oder Unruhe'),
              React.createElement('li', null, 'ungewöhnliche Lautäußerungen')
            ),
            React.createElement('p', null, 'Gerade bei Katzen sind Verhaltensänderungen oft ein erstes Zeichen für Schmerzen oder Krankheit.'),
            React.createElement('h2', null, '5. Probleme beim Urinieren oder Kotabsatz'),
            React.createElement('p', null, 'Wenn dein Tier Schwierigkeiten beim Wasserlassen hat, häufiger auf die Toilette geht oder Blut im Urin zu sehen ist, sollte das zeitnah untersucht werden.'),
            React.createElement('p', null, 'Vor allem bei Katern kann eine Harnröhrenverstopfung lebensbedrohlich sein.'),
            React.createElement('p', null, React.createElement('a', { href: 'leistungen', className: 'text-red-700 font-semibold hover:underline' }, 'Leistungen')),
            React.createElement('h2', null, '6. Husten oder Atemprobleme'),
            React.createElement('p', null, 'Anhaltender Husten, schnelle Atmung oder Atemnot sollten immer ernst genommen werden. Diese Symptome können auf Infektionen, Herzprobleme oder andere Erkrankungen hinweisen.'),
            React.createElement('h2', null, '7. Wunden oder Verletzungen'),
            React.createElement('p', null, 'Auch kleinere Verletzungen können sich entzünden. Bei Bisswunden, tiefen Schnitten oder starken Schwellungen ist eine tierärztliche Behandlung wichtig.'),
            React.createElement('h2', null, 'Wann lieber früher handeln'),
            React.createElement('p', null, 'Du kennst dein Tier am besten. Wenn du das Gefühl hast, dass etwas nicht stimmt, lohnt sich eine Abklärung.'),
            React.createElement('p', null, 'Viele Untersuchungen lassen sich auch bei einem Tierarzt-Hausbesuch in der vertrauten Umgebung durchführen, was für viele Tiere deutlich weniger Stress bedeutet.'),
            React.createElement('p', null, React.createElement('a', { href: 'kontakt', className: 'text-red-700 font-semibold hover:underline' }, 'Kontakt'))
          )
        },
        {
          title: 'Notfall beim Haustier: Wann du sofort tierärztliche Hilfe brauchst',
          summary: 'Akute Notfälle beim Haustier – wann jede Minute zählt.',
          content: React.createElement(React.Fragment, null,
            React.createElement('p', null, 'Manche Situationen sind echte Notfälle und sollten sofort tierärztlich abgeklärt werden. In diesen Fällen zählt jede Minute.'),
            React.createElement('p', null, 'Wenn eines der folgenden Symptome auftritt, solltest du schnell handeln.'),
            React.createElement(AssetImage, { src: 'livisto.png', alt: 'Infografik zu Haustier-Notfällen', imageClassName: 'w-full h-auto rounded-lg shadow-lg my-8', placeholderClassName: 'w-full min-h-[420px] rounded-lg shadow-lg my-8 px-4' }),
            React.createElement('h2', null, 'Atemnot'),
            React.createElement('p', null, 'Wenn dein Tier stark nach Luft ringt, sehr schnell atmet oder bläuliche Schleimhäute hat, handelt es sich um einen akuten Notfall.'),
            React.createElement('h2', null, 'Krampfanfälle'),
            React.createElement('p', null, 'Ein Krampfanfall kann sehr beängstigend wirken. Während des Anfalls solltest du dein Tier vor Verletzungen schützen und nach dem Anfall möglichst schnell tierärztliche Hilfe suchen.'),
            React.createElement('h2', null, 'Vergiftungsverdacht'),
            React.createElement('p', null, 'Wenn dein Tier möglicherweise etwas Giftiges aufgenommen hat, zum Beispiel Medikamente, Giftköder, Pflanzen oder Schokolade, solltest du sofort einen Tierarzt kontaktieren.'),
            React.createElement('h2', null, 'Starke Schmerzen'),
            React.createElement('p', null, 'Tiere zeigen Schmerzen oft durch:'),
            React.createElement('ul', null,
              React.createElement('li', null, 'Jaulen oder Wimmern'),
              React.createElement('li', null, 'starke Unruhe'),
              React.createElement('li', null, 'gekrümmte Körperhaltung'),
              React.createElement('li', null, 'aggressives Verhalten')
            ),
            React.createElement('p', null, 'Plötzlich auftretende starke Schmerzen sollten immer ernst genommen werden.'),
            React.createElement('p', null, React.createElement('a', { href: 'leistungen', className: 'text-red-700 font-semibold hover:underline' }, 'Leistungen')),
            React.createElement('h2', null, 'Starke Blutungen oder schwere Verletzungen'),
            React.createElement('p', null, 'Nach Unfällen, Stürzen oder Bissverletzungen ist eine schnelle Untersuchung wichtig.'),
            React.createElement('h2', null, 'Fremdkörper aufgenommen'),
            React.createElement('p', null, 'Wenn dein Tier Spielzeug, Knochenstücke oder andere Gegenstände verschluckt hat, kann das zu gefährlichen Darmproblemen führen.'),
            React.createElement('h2', null, 'Kollaps oder Bewusstlosigkeit'),
            React.createElement('p', null, 'Wenn dein Tier plötzlich zusammenbricht oder nicht mehr reagiert, handelt es sich immer um einen Notfall.'),
            React.createElement('h2', null, 'Im Zweifel lieber einmal zu früh handeln'),
            React.createElement('p', null, 'Wenn du unsicher bist, ob ein Notfall vorliegt, ist es immer besser, schnell tierärztlichen Rat einzuholen.'),
            React.createElement('p', null, 'Als mobiler Tierarzt kann ich viele Situationen direkt bei dir zu Hause beurteilen. In akuten Notfällen kann ich außerdem einschätzen, ob eine sofortige Behandlung in einer Tierklinik notwendig ist.'),
            React.createElement('p', null, React.createElement('a', { href: 'kontakt', className: 'text-red-700 font-semibold hover:underline' }, 'Kontakt'))
          )
        }
      ]
    },
    contactPage: {
      title: 'Kontakt',
      subtitle: 'Möchten Sie einen Termin vereinbaren oder haben Sie eine Frage? Kontaktieren Sie UrbanVet.',
      email: 'info@urbanvet.de',
      phoneLabel: 'Rufen Sie direkt an:',
      infoSections: buildSharedInfoSections(Language.DE)
    },
    impressum: {
      title: 'Impressum',
      content: `
        <h2>Angaben gemäß § 5 DDG</h2>
        <p>Tierarztpraxis UrbanVet Berlin<br>
        Susanne Repanelis<br>
        Fontanestraße 32<br>
        12049 Berlin</p>
        <h2>Kontakt</h2>
        <p>Telefon: <a href="tel:+491716494610">0171 64 94 610</a><br>
        E-Mail: <a href="mailto:info@urbanvet.de">info@urbanvet.de</a></p>
        <h2>Berufsrechtliche Angaben</h2>
        <p><strong>Gesetzliche Berufsbezeichnung:</strong> Tierärztin, verliehen in Österreich</p>
        <p><strong>Zuständige Kammer:</strong> Tierärztekammer Berlin, Littenstraße 108, 10179 Berlin, <a href="https://tieraerztekammer-berlin.de/" target="_blank" rel="noopener noreferrer">tieraerztekammer-berlin.de</a></p>
        <p><strong>Berufsrechtliche Regelungen:</strong></p>
        <ul>
          <li>Berufsordnung der Tierärztekammer Berlin, <a href="https://tieraerztekammer-berlin.de/wp-content/uploads/2024/06/Berufsordnung_inkl_1_Aenderung_2016-11-10.pdf" target="_blank" rel="noopener noreferrer">als PDF abrufbar</a></li>
          <li>Bundes-Tierärzteordnung (BTÄO), <a href="https://www.gesetze-im-internet.de/b_o/" target="_blank" rel="noopener noreferrer">gesetze-im-internet.de/b_o</a></li>
          <li>Gebührenordnung für Tierärztinnen und Tierärzte (GOT), <a href="https://www.gesetze-im-internet.de/got_2022/" target="_blank" rel="noopener noreferrer">gesetze-im-internet.de/got_2022</a></li>
        </ul>
        <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
        <p>Susanne Repanelis, Anschrift wie oben</p>
        <h2>Verbraucherstreitbeilegung</h2>
        <p>Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
        <h2>Datenschutz</h2>
        <p>Wie wir mit Ihren Daten umgehen, lesen Sie in unserer <a href="datenschutz">Datenschutzerklärung</a>.</p>
      `
    },
    privacy: {
      title: 'Datenschutzerklärung',
      content: `
        <p>Hier erfahren Sie, welche personenbezogenen Daten wir beim Besuch dieser Website und bei der Behandlung Ihres Tieres verarbeiten und welche Rechte Sie dabei haben.</p>
        <h2>1. Verantwortliche</h2>
        <p>Susanne Repanelis<br>
        Tierarztpraxis UrbanVet Berlin<br>
        Fontanestraße 32<br>
        12049 Berlin<br>
        Telefon: <a href="tel:+491716494610">0171 64 94 610</a><br>
        E-Mail: <a href="mailto:info@urbanvet.de">info@urbanvet.de</a></p>
        <p>Bei Fragen zum Datenschutz oder wenn Sie Ihre Rechte ausüben möchten, erreichen Sie uns unter diesen Kontaktdaten.</p>
        <h2>2. Das Wichtigste in Kürze</h2>
        <ul>
          <li>Beim Aufruf der Website verarbeitet unser Hosting-Anbieter technisch notwendige Zugriffsdaten.</li>
          <li>Ihre Auswahl im Cookie-Banner wird gespeichert, damit wir sie beachten und nachweisen können.</li>
          <li>Google-Dienste (Tag Manager, Analytics, Ads) werden erst geladen, nachdem Sie zugestimmt haben. Ohne Ihre Zustimmung werden keine Daten an Google übertragen.</li>
          <li>Wenn Sie uns kontaktieren, einen Termin buchen oder Ihr Tier behandeln lassen, verarbeiten wir die dafür nötigen Angaben.</li>
        </ul>
        <h2>3. Hosting und Zugriffsdaten</h2>
        <p>Diese Website wird über GitHub Pages bereitgestellt. Anbieter ist die GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, USA. Beim Aufruf einer Seite werden technisch notwendige Daten verarbeitet, insbesondere Ihre IP-Adresse, Datum und Uhrzeit des Zugriffs, die aufgerufene Adresse, die zuvor besuchte Seite (Referrer) sowie Angaben zu Browser und Betriebssystem. Ohne diese Daten kann die Website nicht ausgeliefert werden. Außerdem dienen sie der Sicherheit und Stabilität des Dienstes, etwa zur Abwehr von Angriffen.</p>
        <p>Rechtsgrundlage ist unser berechtigtes Interesse an einer sicheren und zuverlässigen Bereitstellung der Website (Art. 6 Abs. 1 lit. f DSGVO). Wir selbst erhalten keine Zugriffsprotokolle und werten diese Daten nicht aus. Dabei können Daten in die USA übermittelt werden. GitHub nimmt nach eigenen Angaben am EU-US Data Privacy Framework teil, für das die EU-Kommission einen Angemessenheitsbeschluss erlassen hat (Art. 45 DSGVO). Mehr dazu in der <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" target="_blank" rel="noopener noreferrer">Datenschutzerklärung von GitHub</a>.</p>
        <h2>4. SSL/TLS-Verschlüsselung</h2>
        <p>Diese Website nutzt aus Sicherheitsgründen eine SSL/TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie an „https://“ in der Adresszeile und am Schloss-Symbol Ihres Browsers.</p>
        <h2>5. Cookie-Banner und Einwilligungsverwaltung (Usercentrics)</h2>
        <p>Für die Abfrage und Verwaltung Ihrer Einwilligungen nutzen wir die Consent-Management-Plattform Usercentrics der Usercentrics GmbH, Sendlinger Straße 7, 80331 München. Beim ersten Besuch zeigt Ihnen das Banner, welche Dienste wir einsetzen möchten. Sie können allen zustimmen, alle ablehnen oder einzeln auswählen.</p>
        <p>Verarbeitet werden dabei Ihre Entscheidung je Dienst, eine zufällige Einwilligungs-ID, Datum und Uhrzeit, die Version des Banners, die Sprache, Ihre IP-Adresse sowie Angaben zu Browser, Gerät und aufrufender Seite. Ihre Entscheidung wird im lokalen Speicher (Local Storage) Ihres Browsers abgelegt, damit das Banner nicht bei jedem Besuch erneut erscheint. Usercentrics speichert den Einwilligungsnachweis in unserem Auftrag für ein Jahr.</p>
        <p>Rechtsgrundlage ist unsere gesetzliche Pflicht, Einwilligungen nachweisen zu können (Art. 6 Abs. 1 lit. c DSGVO in Verbindung mit Art. 7 Abs. 1 DSGVO). Das Speichern Ihrer Auswahl in Ihrem Browser ist dafür unbedingt erforderlich (§ 25 Abs. 2 Nr. 2 TDDDG).</p>
        <p><strong>Auswahl ändern oder Einwilligung widerrufen:</strong> Sie können Ihre Einstellungen jederzeit mit Wirkung für die Zukunft ändern, über „Cookie-Einstellungen“ im Fußbereich jeder Seite, über das Fingerabdruck-Symbol unten links oder direkt hier:</p>
        <p><button type="button" class="legal-button" data-cookie-settings>Cookie-Einstellungen öffnen</button></p>
        <h2>6. Google-Dienste (nur mit Ihrer Einwilligung)</h2>
        <p>Die folgenden Dienste setzen wir nur ein, wenn Sie im Cookie-Banner zugestimmt haben. Vorher wird kein Skript von Google geladen und es werden keine Daten an Google übertragen. Anbieter ist jeweils die Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland („Google“).</p>
        <p>Rechtsgrundlage ist Ihre Einwilligung (Art. 6 Abs. 1 lit. a DSGVO, § 25 Abs. 1 TDDDG). Sie können sie jederzeit über die Cookie-Einstellungen widerrufen. Die bis dahin erfolgte Verarbeitung bleibt rechtmäßig.</p>
        <p><strong>Übermittlung in Drittländer:</strong> Google verarbeitet Daten auch auf Servern außerhalb der EU, insbesondere in den USA. Die Google LLC ist unter dem EU-US Data Privacy Framework zertifiziert, für das ein Angemessenheitsbeschluss der EU-Kommission besteht (Art. 45 DSGVO). Für Übermittlungen in andere Drittländer nutzt Google die EU-Standardvertragsklauseln (Art. 46 Abs. 2 lit. c DSGVO).</p>
        <h3>Google Tag Manager</h3>
        <p>Mit dem Google Tag Manager binden wir die unten genannten Google-Dienste ein und steuern, wann sie ausgelöst werden. Der Tag Manager selbst setzt keine Cookies und erstellt keine Nutzerprofile. Beim Laden wird jedoch Ihre IP-Adresse an Google übermittelt. Deshalb laden wir ihn erst nach Ihrer Zustimmung.</p>
        <h3>Google Analytics 4</h3>
        <p>Google Analytics zeigt uns, wie unsere Website genutzt wird, damit wir sie verbessern können. Erfasst werden zum Beispiel aufgerufene Seiten, Verweildauer, Klicks, die Seite, von der Sie kommen, Gerätetyp, Browser und Ihr ungefährer Standort (Land, Stadt). Ihre IP-Adresse wird nur für diese grobe Standortbestimmung genutzt und von Google Analytics 4 nicht gespeichert. Die Auswertung erfolgt pseudonym über eine zufällige Kennung. Wir können Sie damit nicht persönlich identifizieren.</p>
        <p>Cookies: <code>_ga</code> und <code>_ga_&lt;ID&gt;</code>, jeweils bis zu 2 Jahre. Die erfassten Ereignisdaten werden spätestens nach 14 Monaten gelöscht. Google verarbeitet diese Daten als unser Auftragsverarbeiter.</p>
        <p>Neben dem Widerruf über die Cookie-Einstellungen können Sie das <a href="https://tools.google.com/dlpage/gaoptout?hl=de" target="_blank" rel="noopener noreferrer">Browser-Add-on zur Deaktivierung von Google Analytics</a> nutzen.</p>
        <h3>Google Ads und Conversion-Tracking</h3>
        <p>Wir werben mit Anzeigen bei Google. Um den Erfolg dieser Anzeigen zu messen, nutzen wir das Conversion-Tracking von Google Ads. Sind Sie über eine unserer Anzeigen auf die Website gekommen und klicken Sie hier auf unsere Telefonnummer, unsere E-Mail-Adresse oder den WhatsApp-Button, erfährt Google, dass die Anzeige zu einer Kontaktaufnahme geführt hat. Wir sehen nur zusammengefasste Zahlen, etwa wie viele Kontaktaufnahmen über Anzeigen zustande kamen, und können daraus keine einzelnen Personen erkennen.</p>
        <p>Dafür werden Cookies wie <code>_gcl_au</code> und <code>_gcl_aw</code> (jeweils 90 Tage) gesetzt, in denen eine Kennung des Anzeigenklicks gespeichert wird (Conversion Linker).</p>
        <h3>Google Ads Remarketing</h3>
        <p>Mit Remarketing können wir Menschen, die unsere Website besucht haben, später auf anderen Websites und in Google-Diensten Anzeigen von UrbanVet zeigen. Dazu setzt Google Cookies, auch auf der Domain doubleclick.net (zum Beispiel <code>IDE</code> oder <code>test_cookie</code>), und bildet pseudonyme Zielgruppen. Sind Sie bei Google angemeldet, kann Google Ihren Besuch je nach Ihren Kontoeinstellungen mit Ihrem Google-Konto verknüpfen. Personalisierte Werbung können Sie zusätzlich unter <a href="https://myadcenter.google.com/" target="_blank" rel="noopener noreferrer">myadcenter.google.com</a> abschalten.</p>
        <p>Für Google Ads (Conversion-Tracking und Remarketing) ist Google neben uns eigenständig verantwortlich. Mehr dazu: <a href="https://policies.google.com/technologies/ads?hl=de" target="_blank" rel="noopener noreferrer">Wie Google Cookies in der Werbung verwendet</a> und <a href="https://policies.google.com/privacy?hl=de" target="_blank" rel="noopener noreferrer">Datenschutzerklärung von Google</a>.</p>
        <h3>Google Consent Mode</h3>
        <p>Wir nutzen den Consent Mode von Google. Usercentrics teilt den Google-Diensten mit, welchen Zwecken Sie zugestimmt haben (Statistik, Werbung, Personalisierung), und die Dienste richten sich danach. Stimmen Sie zum Beispiel nur der Statistik zu, werden die Werbedienste nicht oder nur eingeschränkt ohne Cookies und ohne Personalisierung ausgeführt. Lehnen Sie alles ab, wird keiner der Google-Dienste geladen.</p>
        <h2>7. Schriftarten</h2>
        <p>Diese Website lädt keine Schriftarten von fremden Servern. Die Texte werden in den Standardschriften Ihres Geräts angezeigt.</p>
        <h2>8. Online-Terminbuchung über termin.vet</h2>
        <p>Für die Online-Terminbuchung nutzen wir termin.vet, einen Dienst der vetpraxis.de GmbH &amp; Co. KG, Dorfstr. 15, 84069 Schierling. Der Button „Termin buchen“ auf unserer Website ist eine bei uns gespeicherte Grafik. Erst wenn Sie ihn anklicken, öffnet sich die Buchungsseite von termin.vet in einem neuen Fenster.</p>
        <p>Dort verarbeitet der Anbieter in unserem Auftrag die Angaben, die Sie für die Buchung machen, etwa Name, Kontaktdaten, Angaben zu Ihrem Tier und den gewünschten Termin. Rechtsgrundlage ist die Vereinbarung und Durchführung der Behandlung (Art. 6 Abs. 1 lit. b DSGVO). Für die Buchungsseite selbst gelten ergänzend die Datenschutzhinweise von termin.vet.</p>
        <h2>9. Kontakt per Telefon, E-Mail oder WhatsApp</h2>
        <p>Wenn Sie uns anrufen oder schreiben, verarbeiten wir Ihre Angaben (zum Beispiel Name, Telefonnummer, E-Mail-Adresse und Ihr Anliegen), um Ihre Anfrage zu beantworten. Geht es um eine Behandlung oder einen Termin, ist Rechtsgrundlage Art. 6 Abs. 1 lit. b DSGVO, sonst unser berechtigtes Interesse an der Beantwortung Ihrer Anfrage (Art. 6 Abs. 1 lit. f DSGVO). Wir löschen die Daten, sobald sie nicht mehr benötigt werden und keine gesetzlichen Aufbewahrungspflichten bestehen.</p>
        <p><strong>WhatsApp:</strong> Über den WhatsApp-Button gelangen Sie zu WhatsApp, einem Dienst der WhatsApp Ireland Limited, Merrion Road, Dublin 4, D04 X2K5, Irland. Schreiben Sie uns dort, verarbeitet WhatsApp unter anderem Ihre Telefonnummer, Ihr Profil und Verbindungsdaten. Die Nachrichteninhalte sind Ende-zu-Ende-verschlüsselt. Dabei können Daten an die Meta Platforms, Inc. in den USA übermittelt werden, die unter dem EU-US Data Privacy Framework zertifiziert ist. Die Nutzung ist freiwillig, Sie erreichen uns genauso per Telefon oder E-Mail.</p>
        <h2>10. Daten im Rahmen der tierärztlichen Behandlung</h2>
        <p>Für die Behandlung Ihres Tieres verarbeiten wir Ihre Kontaktdaten und die Adresse für den Hausbesuch, Angaben zu Ihrem Tier (zum Beispiel Vorgeschichte, Befunde, Diagnosen, Behandlungen, Arzneimittel und Impfungen) sowie Abrechnungsdaten.</p>
        <p>Rechtsgrundlage ist der Behandlungsvertrag (Art. 6 Abs. 1 lit. b DSGVO). Soweit uns das Gesetz Dokumentations- und Aufbewahrungspflichten auferlegt, etwa das tierärztliche Berufsrecht, das Tierarzneimittelrecht oder das Handels- und Steuerrecht, ist Rechtsgrundlage Art. 6 Abs. 1 lit. c DSGVO.</p>
        <p><strong>Empfänger:</strong> Wir geben Daten nur weiter, wenn es für Behandlung oder Abrechnung erforderlich ist, wir gesetzlich dazu verpflichtet sind oder Sie es wünschen. Empfänger können sein: Untersuchungslabore, mitbehandelnde oder überweisende Tierärztinnen, Tierärzte und Tierkliniken, Zahlungs- und Abrechnungsdienstleister, unsere Steuerberatung, Behörden im Rahmen gesetzlicher Meldepflichten sowie auf Ihren Wunsch Ihre Tierkrankenversicherung.</p>
        <p><strong>Speicherdauer:</strong> Wir speichern diese Daten, solange es für die Behandlung erforderlich ist, und darüber hinaus für die Dauer der gesetzlichen Aufbewahrungsfristen (je nach Unterlage in der Regel bis zu zehn Jahre).</p>
        <h2>11. Ihre Rechte</h2>
        <p>Sie haben das Recht auf:</p>
        <ul>
          <li>Auskunft über die zu Ihrer Person gespeicherten Daten (Art. 15 DSGVO)</li>
          <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
          <li>Löschung Ihrer Daten, soweit keine Aufbewahrungspflicht entgegensteht (Art. 17 DSGVO)</li>
          <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
          <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
          <li>Widerruf erteilter Einwilligungen mit Wirkung für die Zukunft (Art. 7 Abs. 3 DSGVO)</li>
        </ul>
        <div class="legal-note">
          <p><strong>Widerspruchsrecht nach Art. 21 DSGVO</strong></p>
          <p>Verarbeiten wir Daten auf Grundlage unseres berechtigten Interesses (Art. 6 Abs. 1 lit. f DSGVO), können Sie aus Gründen, die sich aus Ihrer besonderen Situation ergeben, jederzeit widersprechen. Wir verarbeiten die Daten dann nicht mehr, es sei denn, wir können zwingende schutzwürdige Gründe nachweisen, die Ihre Interessen überwiegen, oder die Verarbeitung dient der Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen.</p>
        </div>
        <p><strong>Beschwerderecht:</strong> Sie können sich bei einer Datenschutz-Aufsichtsbehörde beschweren (Art. 77 DSGVO). Für uns zuständig ist die Berliner Beauftragte für Datenschutz und Informationsfreiheit, Alt-Moabit 59-61, 10555 Berlin, <a href="https://www.datenschutz-berlin.de/" target="_blank" rel="noopener noreferrer">datenschutz-berlin.de</a>.</p>
        <h2>12. Bereitstellung von Daten und automatisierte Entscheidungen</h2>
        <p>Sie können diese Website nutzen, ohne selbst Angaben zu Ihrer Person zu machen. Für eine Behandlung benötigen wir die dafür erforderlichen Angaben, ohne sie können wir den Behandlungsvertrag nicht durchführen. Eine automatisierte Entscheidungsfindung im Sinne von Art. 22 DSGVO findet nicht statt.</p>
        <h2>13. Änderungen</h2>
        <p>Wir passen diese Datenschutzerklärung an, wenn sich unsere Website, die eingesetzten Dienste oder die Rechtslage ändern. Es gilt die jeweils hier veröffentlichte Fassung.</p>
        <p class="legal-meta">Stand: Oktober 2026</p>
      `
    },
    footer: { tagline: 'Mobile Tiermedizin mit Ruhe.', legalNavLabel: 'Rechtliches', imprint: 'Impressum', privacy: 'Datenschutz', cookieSettings: 'Cookie-Einstellungen', phoneLabel: 'Telefon', openingHoursLabel: 'Öffnungszeiten', scheduleLine1: 'Montag – Freitag: 10:00 – 18:00 Uhr', scheduleLine2: 'Notfälle Montag – Freitag: 18:00 – 22:00 Uhr', scheduleLine3: 'Notfälle Samstag – Sonntag: 10:00 – 22:00 Uhr', appointmentNote: 'Termine außerhalb der regulären Öffnungszeiten sind nach Vereinbarung möglich. Kontaktieren Sie mich gerne, um einen passenden Termin zu vereinbaren.' }
  }
};

const ALL_SERVICES = {
  [Language.EN]: TEXTS.EN.services.items.map((service) => ({ ...service, icon: React.createElement(ServiceImageIcon, null) })),
  [Language.DE]: TEXTS.DE.services.items.map((service) => ({ ...service, icon: React.createElement(ServiceImageIcon, null) }))
};
const BLOG_MEDIA = [
  {
    slug: 'home-visit-preparation',
    publishedAt: '2026-02-20',
    displayDate: {
      [Language.EN]: 'February 20, 2026',
      [Language.DE]: '20. Februar 2026'
    },
    imageUrl: 'assets/blog/home-visit-preparation.jpg',
    imageAlt: {
      [Language.EN]: 'Illustration of a calm home prepared for a veterinary house call with a dog, cat, checklist, and medical bag.',
      [Language.DE]: 'Illustration eines ruhigen Zuhauses fuer den Tierarzt-Hausbesuch mit Hund, Katze, Checkliste und Arzttasche.'
    }
  },
  {
    slug: 'warning-signs-dogs-cats',
    publishedAt: '2026-03-08',
    displayDate: {
      [Language.EN]: 'March 8, 2026',
      [Language.DE]: '8. März 2026'
    },
    imageUrl: 'assets/blog/warning-signs.jpg',
    imageAlt: {
      [Language.EN]: 'Illustration of a dog and cat with symptom markers and a veterinary checklist about warning signs.',
      [Language.DE]: 'Illustration von Hund und Katze mit Warnsymbolen und einer tieraerztlichen Checkliste zu Warnzeichen.'
    }
  },
  {
    slug: 'pet-emergency-warning-signs',
    publishedAt: '2026-03-11',
    displayDate: {
      [Language.EN]: 'March 11, 2026',
      [Language.DE]: '11. März 2026'
    },
    imageUrl: 'assets/blog/pet-emergency.jpg',
    imageAlt: {
      [Language.EN]: 'Illustration of a pet emergency with a first-aid bag, urgent heartbeat line, and dog and cat silhouettes.',
      [Language.DE]: 'Illustration eines Haustier-Notfalls mit Erste-Hilfe-Tasche, EKG-Linie sowie Hund- und Katzensilhouetten.'
    }
  }
];
const BLOG_READ_MORE_LABEL = {
  [Language.EN]: 'Read more',
  [Language.DE]: 'Mehr lesen'
};

const buildPostsForLanguage = (language) => TEXTS[language].blog.posts.map((post, index) => {
  const media = BLOG_MEDIA[index];
  return {
    ...post,
    id: `post-${media.slug}-${language.toLowerCase()}`,
    slug: media.slug,
    language,
    imageUrl: media.imageUrl,
    imageAlt: media.imageAlt[language],
    publishedAt: media.publishedAt,
    date: media.displayDate[language],
    readMoreLabel: BLOG_READ_MORE_LABEL[language]
  };
});

const ALL_POSTS = {
  [Language.EN]: buildPostsForLanguage(Language.EN),
  [Language.DE]: buildPostsForLanguage(Language.DE)
};
const NAV_LINKS = [{ page: Page.HOME }, { page: Page.SERVICES }, { page: Page.ABOUT }, { page: Page.BLOG }];

const { useState, useEffect, useRef } = React;

const toAbsoluteUrl = (path) => new URL(path, `${SITE_URL}/`).href;

const setMetaByName = (name, content) => {
  const element = document.querySelector(`meta[name="${name}"]`);
  if (element) element.setAttribute('content', content);
};

const setMetaByProperty = (property, content) => {
  const element = document.querySelector(`meta[property="${property}"]`);
  if (element) element.setAttribute('content', content);
};

const getLanguageHomePath = (language) => (PAGE_PATHS[language] || PAGE_PATHS[Language.DE])[Page.HOME];

// Reverse lookup: absolute path -> { language, page } for all static pages.
const PATH_TO_NAV = (() => {
  const map = {};
  Object.keys(PAGE_PATHS).forEach((language) => {
    Object.keys(PAGE_PATHS[language]).forEach((page) => {
      map[PAGE_PATHS[language][page]] = { language, page };
    });
  });
  return map;
})();

const normalizePath = (rawPath) =>
  (rawPath || '/').split('?')[0].split('#')[0].replace(/\/+$/, '') || '/';

const buildUrl = ({ language, page, post }) => {
  const pages = PAGE_PATHS[language] || PAGE_PATHS[Language.DE];
  let path;
  if (page === Page.BLOG_POST && post) {
    const base = BLOG_BASE_PATHS[language] || BLOG_BASE_PATHS[Language.DE];
    path = `${base}/${post.slug}`;
  } else {
    path = pages[page] || pages[Page.HOME];
  }
  return new URL(`${SITE_URL}${BASE_PATH}${path}`);
};

// Translate a real pathname (or ?route= value) back into navigation intent.
const resolveNavigationFromPath = (rawPath) => {
  let stripped = rawPath || '/';
  if (BASE_PATH && stripped.indexOf(BASE_PATH) === 0) {
    stripped = stripped.slice(BASE_PATH.length) || '/';
  }
  const path = normalizePath(stripped);

  const staticMatch = PATH_TO_NAV[path];
  if (staticMatch) {
    return { language: staticMatch.language, page: staticMatch.page, postSlug: null };
  }

  const enBlogPrefix = `${BLOG_BASE_PATHS[Language.EN]}/`;
  const deBlogPrefix = `${BLOG_BASE_PATHS[Language.DE]}/`;
  if (path.startsWith(enBlogPrefix)) {
    return { language: Language.EN, page: Page.BLOG_POST, postSlug: path.slice(enBlogPrefix.length) };
  }
  if (path.startsWith(deBlogPrefix)) {
    return { language: Language.DE, page: Page.BLOG_POST, postSlug: path.slice(deBlogPrefix.length) };
  }

  const language = path === '/en' || path.startsWith('/en/') ? Language.EN : Language.DE;
  return { language, page: Page.HOME, postSlug: null };
};

const getInitialNavigationState = () => {
  const params = new URLSearchParams(window.location.search);
  const routeParam = params.get(ROUTE_REDIRECT_PARAM);
  const langParam = params.get('lang');

  let language;
  let requestedPage;
  let postSlug;

  // Local file:// preview has no real paths, so keep using explicit query params.
  if (!routeParam && window.location.protocol === 'file:') {
    language = langParam === 'en' ? Language.EN : Language.DE;
    requestedPage = QUERY_PAGE_MAP[params.get('page')] || Page.HOME;
    postSlug = params.get('post');
  } else {
    const resolved = resolveNavigationFromPath(routeParam || window.location.pathname);
    language = resolved.language;
    requestedPage = resolved.page;
    postSlug = resolved.postSlug;
    if (langParam === 'en') language = Language.EN;
    else if (langParam === 'de') language = Language.DE;
  }

  const availablePosts = ALL_POSTS[language];
  const selectedPost = postSlug ? availablePosts.find((post) => post.slug === postSlug) || null : null;
  const resolvedPage = selectedPost
    ? Page.BLOG_POST
    : (requestedPage === Page.BLOG_POST ? Page.BLOG : requestedPage);

  return {
    language,
    currentPage: resolvedPage,
    currentPost: selectedPost
  };
};

const getLocalizedPostForLanguage = (language, post) => {
  if (!post) return null;
  return ALL_POSTS[language].find((candidate) => candidate.slug === post.slug) || null;
};

const syncBrowserHistoryEntry = ({ language, currentPage, currentPost, mode = 'replace' }) => {
  const normalizedPage = currentPage === Page.BLOG_POST && !currentPost ? Page.BLOG : currentPage;
  const normalizedPost = normalizedPage === Page.BLOG_POST ? currentPost : null;
  const nextUrl = new URL(buildUrl({ language, page: normalizedPage, post: normalizedPost }).href);
  const historyMethod = mode === 'push' ? 'pushState' : 'replaceState';
  const browserUrl = window.location.protocol === 'file:'
    ? (() => {
        const localParams = new URLSearchParams();
        localParams.set('lang', language.toLowerCase());
        if (normalizedPage !== Page.HOME) {
          localParams.set('page', PAGE_QUERY_MAP[normalizedPage]);
        }
        if (normalizedPage === Page.BLOG_POST && normalizedPost) {
          localParams.set('post', normalizedPost.slug);
        }
        const queryString = localParams.toString();
        return queryString ? `${window.location.pathname}?${queryString}` : window.location.pathname;
      })()
    : nextUrl.pathname;

  window.history[historyMethod](
    {
      urbanVet: true,
      language,
      currentPage: normalizedPage,
      postSlug: normalizedPost?.slug || null
    },
    '',
    browserUrl
  );
};

const getSeoData = ({ language, currentPage, currentPost }) => {
  const isGerman = language === Language.DE;
  const baseTitle = isGerman
    ? 'UrbanVet | Mobile Tierarztpraxis fuer Hunde und Katzen in Berlin'
    : 'UrbanVet | English Speaking Mobile Vet for Dogs and Cats in Berlin';
  const baseDescription = isGerman
    ? 'UrbanVet ist die mobile Tierarztpraxis fuer Hunde und Katzen in Berlin und Brandenburg mit Hausbesuchen auf Deutsch und Englisch.'
    : 'UrbanVet provides calm bilingual veterinary home visits for dogs and cats in Berlin and Brandenburg in English and German.';
  const pageMeta = {
    [Page.HOME]: {
      title: baseTitle,
      description: baseDescription
    },
    [Page.SERVICES]: {
      title: isGerman
        ? 'Leistungen | Mobile Tierarztpraxis Berlin | UrbanVet'
        : 'Services | Mobile Vet Berlin | UrbanVet',
      description: isGerman
        ? 'Mobile Tierarzt-Leistungen fuer Hunde und Katzen in Berlin und Brandenburg: Vorsorge, Diagnostik, Innere Medizin, Hausbesuche und Notfallversorgung.'
        : 'Mobile veterinary services in Berlin and Brandenburg for dogs and cats: preventive care, diagnostics, internal medicine, home visits, and urgent care.'
    },
    [Page.ABOUT]: {
      title: isGerman
        ? 'Ueber Mich | Susanne Repanelis | UrbanVet'
        : 'About | Susanne Repanelis | UrbanVet',
      description: isGerman
        ? 'Lernen Sie Susanne Repanelis kennen, Ihre mobile Tieraerztin fuer Hausbesuche in Berlin und Brandenburg.'
        : 'Meet Susanne Repanelis, your mobile veterinarian for calm home visits in Berlin and Brandenburg.'
    },
    [Page.BLOG]: {
      title: isGerman
        ? 'Blog | Tipps fuer Hunde und Katzen | UrbanVet'
        : 'Blog | Tips for Dogs and Cats | UrbanVet',
      description: isGerman
        ? 'UrbanVet Blog mit praktischen Tipps zu Hausbesuchen, Warnzeichen und Notfaellen bei Hund und Katze.'
        : 'UrbanVet blog with practical advice on home visits, warning signs, and pet emergencies for dogs and cats.'
    },
    [Page.CONTACT]: {
      title: isGerman
        ? 'Kontakt | Tierarzt Hausbesuch Berlin | UrbanVet'
        : 'Contact | Mobile Vet Home Visits Berlin | UrbanVet',
      description: isGerman
        ? 'Kontaktieren Sie UrbanVet fuer einen Tierarzt-Hausbesuch in Berlin und Brandenburg.'
        : 'Contact UrbanVet to schedule a veterinary home visit in Berlin and Brandenburg.'
    },
    [Page.IMPRESSUM]: {
      title: isGerman
        ? 'Impressum | UrbanVet'
        : 'Legal Notice | UrbanVet',
      description: isGerman
        ? 'Impressum der mobilen Tierarztpraxis UrbanVet in Berlin: Anbieter, Kontakt und berufsrechtliche Angaben.'
        : 'Legal notice for UrbanVet, the mobile veterinary practice in Berlin: provider, contact and professional information.'
    },
    [Page.PRIVACY]: {
      title: isGerman
        ? 'Datenschutzerklärung | UrbanVet'
        : 'Privacy Policy | UrbanVet',
      description: isGerman
        ? 'Datenschutzerklärung von UrbanVet: welche Daten wir auf der Website und in der Praxis verarbeiten, welche Dienste wir einsetzen und welche Rechte Sie haben.'
        : 'Privacy policy of UrbanVet: which data we process on the website and in the practice, which services we use and what rights you have.'
    }
  };

  if (currentPage === Page.BLOG_POST && currentPost) {
    const articleTitle = `${currentPost.title} | UrbanVet Blog`;
    return {
      title: articleTitle,
      description: currentPost.summary,
      ogType: 'article',
      image: toAbsoluteUrl(currentPost.imageUrl),
      jsonLd: {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'VeterinaryCare',
            '@id': `${SITE_URL}#organization`,
            name: SITE_NAME,
            url: SITE_URL,
            telephone: SITE_PHONE_LINK,
            email: SITE_EMAIL,
            areaServed: ['Berlin', 'Brandenburg'],
            availableLanguage: ['de', 'en'],
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Fontanestrasse 32',
              postalCode: '12049',
              addressLocality: 'Berlin',
              addressCountry: 'DE'
            }
          },
          {
            '@type': 'BlogPosting',
            headline: currentPost.title,
            description: currentPost.summary,
            datePublished: currentPost.publishedAt,
            dateModified: currentPost.publishedAt,
            inLanguage: isGerman ? 'de-DE' : 'en-GB',
            image: [toAbsoluteUrl(currentPost.imageUrl)],
            mainEntityOfPage: buildUrl({ language, page: currentPage, post: currentPost }).href,
            author: {
              '@type': 'Person',
              name: 'Susanne Repanelis'
            },
            publisher: {
              '@type': 'Organization',
              name: SITE_NAME,
              logo: {
                '@type': 'ImageObject',
                url: toAbsoluteUrl(DEFAULT_OG_IMAGE)
              }
            }
          }
        ]
      }
    };
  }

  return {
    ...pageMeta[currentPage],
    ogType: 'website',
    image: toAbsoluteUrl(DEFAULT_OG_IMAGE),
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'VeterinaryCare',
          '@id': `${SITE_URL}#organization`,
          name: SITE_NAME,
          url: SITE_URL,
          telephone: SITE_PHONE_LINK,
          email: SITE_EMAIL,
          areaServed: ['Berlin', 'Brandenburg'],
          availableLanguage: ['de', 'en'],
          medicalSpecialty: ['Small Animal Medicine', 'Behavioral Medicine'],
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Fontanestrasse 32',
            postalCode: '12049',
            addressLocality: 'Berlin',
            addressCountry: 'DE'
          }
        },
        {
          '@type': 'WebSite',
          '@id': `${SITE_URL}#website`,
          url: SITE_URL,
          name: SITE_NAME,
          inLanguage: isGerman ? 'de-DE' : 'en-GB'
        },
        {
          '@type': 'WebPage',
          url: buildUrl({ language, page: currentPage }).href,
          name: pageMeta[currentPage].title,
          description: pageMeta[currentPage].description,
          inLanguage: isGerman ? 'de-DE' : 'en-GB'
        }
      ]
    }
  };
};

const ServiceCard = ({ service }) => React.createElement('div', { className: "bg-gray-50 rounded-lg p-6 text-center transform hover:-translate-y-2 transition-transform duration-300 shadow-sm hover:shadow-xl h-full cursor-pointer" }, React.createElement('div', { className: "flex justify-center items-center mb-4" }, service.icon), React.createElement('h3', { className: "text-xl font-semibold mb-2 text-gray-900 leading-snug" }, service.title), React.createElement('p', { className: "text-gray-600 leading-7" }, service.description));

const InfoCardsSection = ({ infoSections }) => {
  if (!infoSections || !Object.keys(infoSections).length) return null;

  return React.createElement('section', { className: "py-16 lg:py-24 bg-[#EFEFEF]" },
    React.createElement('div', { className: "max-w-6xl mx-auto px-4" },
      React.createElement('div', { className: "grid md:grid-cols-3 gap-8" },
        Object.values(infoSections).map((section) => React.createElement('div', { key: section.title, className: "bg-white/85 border border-gray-200 rounded-[1.75rem] shadow-sm p-6 text-left h-full" },
          React.createElement('h3', { className: "text-2xl font-bold text-gray-900 mb-4" }, section.title),
          React.createElement('div', { className: "space-y-3 text-gray-700 leading-7" },
            section.lines.map((line, index) => React.createElement('p', { key: index }, line))
          )
        ))
      )
    )
  );
};


const BLOG_EMPHASIS = {
  'home-visit-preparation': {
    [Language.EN]: [
      'mobile veterinarian in Berlin', 'veterinary home visit', 'veterinary house call',
      'favorite treats', 'favorite toy', 'familiar blanket', 'smaller room',
      'do not let them outside shortly before the appointment', 'put a leash or collar on your dog before my arrival',
      'a muzzle can be helpful', 'examination or treatment outside', 'the best solution for your pet together',
      'vaccination booklet or EU pet passport', 'previous medical reports or laboratory results',
      'any available X-rays', 'a list of current medications', 'Checklist Before My Veterinary Home Visit',
      'Tip: A well-prepared appointment makes the veterinary home visit much more relaxed for your pet.'
    ],
    [Language.DE]: [
      'mobiler Tierarzt in Berlin', 'Tierarzt-Hausbesuch', 'Lieblingsleckerlis', 'Lieblingsspielzeug',
      'vertraute Decke', 'kleineren Raum', 'lass sie bitte kurz vor dem Termin nicht mehr nach draußen',
      'eine Leine oder ein Halsband an', 'ein Maulkorb sinnvoll sein', 'Untersuchung oder Behandlung draußen',
      'die beste Lösung für deinen Schatz finden können', 'Impfpass oder EU-Heimtierausweis',
      'frühere Befunde oder Laborergebnisse', 'eventuell vorhandene Röntgenbilder', 'eine Liste der aktuellen Medikamente',
      'Checkliste vor meinem Tierarzt-Hausbesuch', 'Tipp: Ein gut vorbereiteter Termin macht den Tierarzt-Hausbesuch für dein Tier deutlich entspannter.'
    ]
  },
  'warning-signs-dogs-cats': {
    [Language.EN]: [
      'The following warning signs should always be taken seriously.', 'Cats require special attention: 24 hours without food can already become problematic.',
      'However, if the symptoms occur repeatedly, last longer than 24 hours, or your pet appears weak, a veterinary examination is recommended.',
      'Sudden behavioral changes can be an important warning sign, for example:', 'In male cats especially, a urinary blockage can become life-threatening.',
      'Persistent coughing, rapid breathing, or breathing difficulties should always be taken seriously.',
      'When in Doubt, Act Early', 'You know your pet best.'
    ],
    [Language.DE]: [
      'Die folgenden Warnzeichen sollten ernst genommen werden.', 'Bereits 24 Stunden ohne Futter können problematisch werden.',
      'Wenn die Symptome jedoch mehrmals auftreten, länger als 24 Stunden anhalten oder dein Tier zusätzlich schwach wirkt, sollte eine tierärztliche Untersuchung erfolgen.',
      'Plötzliche Veränderungen können ein wichtiges Warnsignal sein.', 'Vor allem bei Katern kann eine Harnröhrenverstopfung lebensbedrohlich sein.',
      'Anhaltender Husten, schnelle Atmung oder Atemnot sollten immer ernst genommen werden.',
      'Wann lieber früher handeln', 'Du kennst dein Tier am besten.'
    ]
  },
  'pet-emergency-warning-signs': {
    [Language.EN]: [
      'Some situations are true emergencies and require immediate veterinary attention.', 'every minute counts',
      'acute emergency', 'seek veterinary help as soon as possible', 'contact a veterinarian immediately',
      'Sudden and severe pain should always be taken seriously.', 'requires veterinary attention',
      'it is always considered an emergency', 'When in Doubt, Act Early'
    ],
    [Language.DE]: [
      'Manche Situationen sind echte Notfälle und sollten sofort tierärztlich abgeklärt werden.', 'jede Minute',
      'akuten Notfall', 'möglichst schnell tierärztliche Hilfe', 'sofort einen Tierarzt kontaktieren',
      'Plötzlich auftretende starke Schmerzen sollten immer ernst genommen werden.', 'gefährlichen Darmproblemen',
      'handelt es sich immer um einen Notfall', 'Im Zweifel lieber einmal zu früh handeln'
    ]
  }
};

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const emphasizeText = (text, phrases, keyPrefix = 't') => {
  if (!text || !phrases?.length) return text;
  const sorted = [...phrases].filter(Boolean).sort((a, b) => b.length - a.length);
  let parts = [text];
  sorted.forEach((phrase) => {
    const pattern = escapeRegExp(phrase);
    const splitter = new RegExp(`(${pattern})`, 'gi');
    const matcher = new RegExp(`^${pattern}$`, 'i');
    parts = parts.flatMap((part) => {
      if (typeof part !== 'string') return [part];
      const split = part.split(splitter);
      return split.filter(Boolean).map((segment) => matcher.test(segment) ? { __strong: segment } : segment);
    });
  });
  return parts.map((part, index) => {
    if (typeof part === 'string') return part;
    return React.createElement('strong', { key: `${keyPrefix}-${index}` }, part.__strong);
  });
};

const transformNodeWithEmphasis = (node, phrases, keyPath = '0') => {
  if (node === null || node === undefined || typeof node === 'boolean') return node;
  if (typeof node === 'string') return emphasizeText(node, phrases, keyPath);
  if (Array.isArray(node)) return node.map((child, index) => transformNodeWithEmphasis(child, phrases, `${keyPath}-${index}`));
  if (!React.isValidElement(node)) return node;
  const originalChildren = node.props?.children;
  const transformedChildren = React.Children.map(originalChildren, (child, index) => transformNodeWithEmphasis(child, phrases, `${keyPath}-${index}`));
  return React.cloneElement(node, { ...node.props, key: node.key || keyPath }, transformedChildren);
};

const isParagraphWithSingleAnchor = (node) => {
  if (!React.isValidElement(node) || node.type !== 'p') return false;
  const children = React.Children.toArray(node.props?.children).filter(Boolean);
  return children.length === 1 && React.isValidElement(children[0]) && children[0].type === 'a';
};

const renderBlogPostContent = (post) => {
  const phrases = BLOG_EMPHASIS?.[post.slug]?.[post.language] || [];
  const rawChildren = React.Children.toArray(post.content?.props?.children || post.content || []);
  return rawChildren.map((child, index) => {
    let transformed = transformNodeWithEmphasis(child, phrases, `blog-${post.slug}-${index}`);

    if (React.isValidElement(transformed) && transformed.type === 'p' && index === 0) {
      transformed = React.cloneElement(transformed, { className: 'blog-subtitle', key: transformed.key || `subtitle-${index}` });
    } else if (isParagraphWithSingleAnchor(transformed)) {
      const anchor = React.Children.toArray(transformed.props.children)[0];
      const buttonAnchor = React.cloneElement(anchor, {
        className: 'inline-block bg-red-700 text-white font-bold py-3 px-8 rounded-full hover:bg-red-800 transition-colors text-lg shadow-lg hover:shadow-xl transform hover:scale-105'
      });
      transformed = React.createElement('div', { className: 'blog-buttonline', key: transformed.key || `link-${index}` }, buttonAnchor);
    } else if (React.isValidElement(transformed) && transformed.type === 'h2') {
      transformed = React.cloneElement(transformed, { className: 'blog-section-heading', key: transformed.key || `h2-${index}` });
    }

    if (React.isValidElement(transformed) && transformed.type === 'p') {
      const textValue = React.Children.toArray(transformed.props.children).map((child) => typeof child === 'string' ? child : '').join('').trim();
      if (/^(Tip:|Tipp:)/.test(textValue)) {
        transformed = React.cloneElement(transformed, { className: `blog-tip ${transformed.props.className || ''}`.trim(), key: transformed.key || `tip-${index}` });
      }
    }

    return transformed;
  });
};

const HomeLogoButton = ({ onClick }) => React.createElement('div', { className: "cursor-pointer", onClick }, React.createElement(AssetImage, { src: 'logo-small.png', alt: 'UrbanVet Logo', imageClassName: 'h-16 w-auto', placeholderClassName: 'h-16 min-w-[180px] px-4', loading: 'eager' }));

const LanguageSwitcher = ({ language, onChange, buttonClassName = 'p-1' }) => React.createElement('div', { className: "flex items-center space-x-2" },
  React.createElement('button', { onClick: () => onChange(Language.EN), className: `${buttonClassName} rounded-full ${language === Language.EN ? 'bg-red-100' : ''}` }, React.createElement(UKFlagIcon, null)),
  React.createElement('button', { onClick: () => onChange(Language.DE), className: `${buttonClassName} rounded-full ${language === Language.DE ? 'bg-red-100' : ''}` }, React.createElement(DEFlagIcon, null))
);

const WhatsAppIcon = () => React.createElement('svg', { viewBox: "0 0 32 32", className: "h-5 w-5", fill: "currentColor", 'aria-hidden': true },
  React.createElement('path', { d: "M19.11 17.21c-.28-.14-1.65-.81-1.9-.9-.25-.09-.43-.14-.62.14-.19.28-.71.9-.88 1.08-.16.19-.33.21-.61.07-.28-.14-1.17-.43-2.24-1.38-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.13-.12.28-.33.42-.49.14-.16.19-.28.28-.47.09-.19.05-.35-.02-.5-.07-.14-.62-1.49-.84-2.04-.22-.53-.45-.46-.62-.47h-.53c-.19 0-.5.07-.76.35-.26.28-1 1-.99 2.43 0 1.43 1.04 2.82 1.19 3.02.14.19 2.04 3.12 5.03 4.25.71.31 1.27.49 1.71.63.72.23 1.37.2 1.88.12.57-.08 1.75-.71 1.99-1.4.25-.69.25-1.28.17-1.4-.07-.12-.26-.19-.54-.33M16.01 5.33c-5.87 0-10.63 4.76-10.63 10.63 0 1.87.49 3.7 1.41 5.31L5.33 26.67l5.52-1.44c1.55.85 3.3 1.29 5.15 1.29h.01c5.87 0 10.63-4.76 10.63-10.63 0-2.85-1.11-5.54-3.13-7.55a10.57 10.57 0 0 0-7.5-3.11m0 19.29h-.01c-1.58 0-3.13-.43-4.48-1.25l-.32-.19-3.27.85.87-3.19-.21-.33a8.7 8.7 0 0 1-1.33-4.6c0-4.81 3.92-8.73 8.74-8.73 2.33 0 4.52.91 6.17 2.56a8.68 8.68 0 0 1 2.56 6.17c0 4.81-3.92 8.73-8.73 8.73" })
);

const BookingButton = ({ language, className = '' }) => React.createElement('a', {
  href: BOOKING_LINKS[language],
  target: '_blank',
  rel: 'noopener noreferrer',
  className: `inline-flex items-center justify-center ${className}`.trim()
},
  React.createElement('img', {
    src: BOOKING_BUTTON_IMAGE_SRC,
    title: language === Language.DE ? 'Termin buchen' : 'Book appointment',
    alt: language === Language.DE ? 'Online-Terminbuchung' : 'Online appointment booking',
    className: 'w-[176px] sm:w-[188px] h-auto'
  })
);

const BlogPostCard = ({ post, onClick }) => React.createElement('div', { onClick: onClick, className: "bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-gray-200/70 cursor-pointer hover:-translate-y-1" }, React.createElement(AssetImage, { src: post.imageUrl, alt: post.imageAlt || post.title, imageClassName: "w-full h-52 object-cover", placeholderClassName: "w-full h-52 px-4" }), React.createElement('div', { className: "p-6" }, React.createElement('p', { className: "text-sm text-gray-500 mb-2 font-medium" }, post.date), React.createElement('h3', { className: "text-xl font-bold mb-3 text-gray-900 group-hover:text-red-700 transition-colors leading-snug" }, post.title), React.createElement('p', { className: "text-gray-700 leading-7" }, post.summary), React.createElement('div', { className: "mt-5 text-red-700 font-semibold group-hover:underline" }, post.readMoreLabel)));

const HomePage = ({ content, onNavigate, services, language }) => React.createElement('div', null,
    React.createElement('section', { className: "text-center pt-0 pb-20 lg:pt-0 lg:pb-32 px-4 bg-[#EFEFEF]" },
        React.createElement('div', { className: "max-w-4xl mx-auto flex flex-col items-center" },
            React.createElement(AssetImage, { src: "logo-main.png", alt: "UrbanVet Logo", imageClassName: "w-3/4 max-w-lg h-auto mb-4", placeholderClassName: "w-3/4 max-w-lg min-h-[180px] mb-4 px-4", loading: "eager" }),
            React.createElement('h1', { className: "text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-[1.15]" },
                content.home.heroLeadLines.map((line, index) => React.createElement(React.Fragment, { key: `${line}-${index}` },
                    React.createElement('span', { className: "block" }, line)
                ))
            ),
            React.createElement('p', { className: "text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto" }, content.home.heroSubtitle),
            React.createElement(BookingButton, { language: language })
        )
    ),
    React.createElement(SectionDivider, null),
    React.createElement(InfoCardsSection, { infoSections: content.home.infoSections }),
    React.createElement(SectionDivider, null),
    React.createElement('section', { id: "services", className: "py-16 lg:py-24 bg-[#EFEFEF]" },
        React.createElement('div', { className: "max-w-7xl mx-auto px-4" },
            React.createElement('h2', { className: "text-3xl lg:text-4xl font-bold text-center mb-2 text-gray-900" }, content.services.title),
            React.createElement('p', { className: "text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto" }, content.services.subtitle),
            React.createElement('div', { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-8" },
                services.map(service => React.createElement('div', { key: service.id, onClick: () => onNavigate(Page.SERVICES, service.id) }, React.createElement(ServiceCard, { service: service })))
            )
        )
    ),
    React.createElement(SectionDivider, null),
    React.createElement('section', { className: "py-16 lg:py-24 bg-[#EFEFEF]" },
        React.createElement('div', { className: "max-w-4xl mx-auto px-4 text-center" },
            React.createElement('h2', { className: "text-3xl lg:text-4xl font-bold text-gray-900 mb-4" }, content.home.aboutTitle),
            React.createElement('div', { className: "prose prose-lg text-gray-700 mx-auto" }, React.createElement('p', null, content.home.aboutText)),
            React.createElement('button', { onClick: () => onNavigate(Page.ABOUT), className: "mt-8 text-red-700 font-semibold hover:underline" }, language === Language.DE ? 'Mehr über mich erfahren →' : 'Learn more about me →')
        )
    ),
    React.createElement(SectionDivider, null),
    React.createElement('section', { className: "py-16 lg:py-24 bg-[#EFEFEF]" },
        React.createElement('div', { className: "max-w-5xl mx-auto px-4" },
            content.home.introTitle ? React.createElement('h2', { className: "text-3xl lg:text-4xl font-bold text-gray-900 mb-8 text-center" }, content.home.introTitle) : null,
            React.createElement('div', { className: "grid md:grid-cols-3 gap-10 items-stretch" },
                React.createElement('div', { className: "md:col-span-1" },
                    React.createElement(AssetImage, { src: "sapu.jpg", alt: "Sapu", imageClassName: "rounded-lg shadow-xl w-full h-auto object-cover", placeholderClassName: "rounded-lg shadow-xl w-full min-h-[360px] px-4" })
                ),
                React.createElement('div', { className: "md:col-span-2 flex flex-col" },
                    React.createElement('div', { className: "prose prose-lg max-w-none text-gray-700" },
                        content.home.introParagraphs.map((paragraph, index) => React.createElement('p', { key: index, className: "mb-6" }, paragraph))
                    ),
                    React.createElement('div', { className: "mt-8 md:mt-auto md:pt-6 text-center" },
                        React.createElement(BookingButton, { language: language })
                    )
                )
            )
        )
    )
);

const ServicesPage = ({ content, services }) => React.createElement('div', { className: "min-h-screen bg-[#EFEFEF]" },
    React.createElement('div', { className: "max-w-7xl mx-auto px-4" },
        React.createElement('h1', { className: "text-4xl lg:text-5xl font-bold text-center mb-4 text-gray-900 pt-8 lg:pt-12" }, content.title),
        React.createElement('p', { className: "text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto" }, content.subtitle),
        React.createElement('div', null,
            services.map((service, index) => React.createElement(React.Fragment, { key: service.id },
                React.createElement('section', { id: service.id, className: "scroll-mt-24 py-8" },
                    React.createElement('div', null,
                        React.createElement('div', { className: "flex items-center gap-4 sm:gap-6" },
                            React.createElement('div', { className: "flex-shrink-0" }, React.createElement(ServiceImageIcon, { className: 'h-20 w-20 sm:h-[7.5rem] sm:w-[7.5rem]', placeholderClassName: 'h-20 w-20 sm:h-[7.5rem] sm:w-[7.5rem] text-[10px]' })),
                            React.createElement('h2', { className: "text-3xl font-bold text-gray-900 leading-tight mb-0" }, service.title)
                        ),
                        React.createElement('p', { className: "text-lg text-gray-700 font-semibold mt-4 mb-4 max-w-none" }, service.longDescription)
                    ),
                    React.createElement('div', { className: "mt-4" },
                        React.createElement('ul', { className: "grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4" },
                            service.subServices.map((item, subIndex) => React.createElement('li', { key: subIndex, className: "flex items-start" },
                                React.createElement('span', { className: "mr-3 flex-shrink-0 -mt-1" }, React.createElement(BulletImageIcon, null)),
                                React.createElement('span', { className: "text-gray-700 text-lg" }, item)
                            ))
                        )
                    )
                ),
                index < services.length - 1 && React.createElement(SectionDivider, null)
            ))
        ),
        React.createElement(SectionDivider, null),
        React.createElement('section', { className: "py-8 pb-16" },
            React.createElement('div', { className: "max-w-4xl" },
                React.createElement('h2', { className: "text-3xl font-bold text-gray-900 mb-6" }, content.costsTitle),
                React.createElement('div', { className: "prose prose-lg max-w-none text-gray-700" }, content.costsContent)
            )
        )
    )
);

const AboutPage = ({ content }) => React.createElement('div', { className: "py-16 lg:py-24 min-h-screen bg-[#EFEFEF]" }, React.createElement('div', { className: "max-w-4xl mx-auto px-4" }, React.createElement('h1', { className: "text-4xl lg:text-5xl font-bold text-gray-900 mb-6 text-center" }, content.about.title), React.createElement(SectionDivider, null), React.createElement('div', { className: "grid md:grid-cols-3 gap-12 items-start mt-8" }, React.createElement('div', { className: "md:col-span-1 space-y-6" }, ["suzanne1.jpg", "suzanne2.jpg", "suzanne3.jpg", "suzanne4.jpg", "suzanne5.jpg"].map((src, index) => React.createElement(AssetImage, { key: src, src, alt: `${PERSON_NAME} ${index + 1}`, imageClassName: "rounded-lg shadow-xl w-full h-auto object-cover", placeholderClassName: "rounded-lg shadow-xl w-full min-h-[360px] px-4" }))), React.createElement('div', { className: "md:col-span-2" }, React.createElement('div', { className: "space-y-6 text-gray-700 text-lg leading-8" }, React.createElement('div', { className: "space-y-1 text-gray-900" }, React.createElement('p', { className: "text-2xl font-bold mb-0" }, content.about.profileName), React.createElement('p', { className: "text-xl font-semibold mb-0" }, content.about.profileRole)), content.about.paragraphs.map((paragraph, index) => React.createElement('p', { key: index }, paragraph)))))));

const BlogPage = ({ content, posts, onViewPost }) => React.createElement('div', { className: "py-16 lg:py-24 min-h-screen bg-[#EFEFEF]" }, React.createElement('div', { className: "max-w-6xl mx-auto px-4" }, React.createElement('h1', { className: "text-4xl lg:text-5xl font-bold text-center mb-4 text-gray-900" }, content.blog.title), React.createElement('p', { className: "text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto" }, content.blog.subtitle), React.createElement(SectionDivider, null), React.createElement('div', { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8" }, posts.map(post => React.createElement(BlogPostCard, { key: post.id, post: post, onClick: () => onViewPost(post) })))));

const BlogPostPage = ({ post, onBack, backButtonText }) => React.createElement('div', { className: "py-16 lg:py-24 bg-[#EFEFEF] min-h-screen" }, React.createElement('div', { className: "max-w-4xl mx-auto px-4" }, React.createElement('button', { onClick: onBack, className: "text-red-700 font-semibold hover:underline mb-8" }, `← ${backButtonText}`), React.createElement('article', { className: "bg-white/85 rounded-[2rem] shadow-sm border border-gray-200/70 overflow-hidden" }, React.createElement('div', { className: "px-6 md:px-10 pt-8 md:pt-10" }, React.createElement('div', { className: "blog-badge inline-flex items-center rounded-full text-sm font-semibold px-4 py-1.5 mb-4" }, 'UrbanVet Blog'), React.createElement('h1', { className: "text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight", style: { fontFamily: "Georgia, 'Times New Roman', serif", letterSpacing: '-0.01em' } }, post.title), React.createElement('p', { className: "text-base md:text-lg text-gray-500 mb-8" }, post.date)), React.createElement(AssetImage, { src: post.imageUrl, alt: post.imageAlt || post.title, imageClassName: "w-full h-auto max-h-[500px] object-cover", placeholderClassName: "w-full min-h-[320px] px-4" }), React.createElement('div', { className: "px-6 md:px-10 py-8 md:py-10" }, React.createElement('div', { className: "blog-rich-content max-w-none" }, renderBlogPostContent(post))))));

const ContactPage = ({ content, language }) => React.createElement('div', { className: "py-16 lg:py-24 min-h-screen bg-[#EFEFEF]" }, React.createElement('div', { className: "max-w-6xl mx-auto px-4 text-center" }, React.createElement('h1', { className: "text-4xl lg:text-5xl font-bold text-gray-900 mb-4" }, content.contactPage.title), React.createElement('p', { className: "text-lg text-gray-600 mb-8 max-w-2xl mx-auto" }, content.contactPage.subtitle), React.createElement(SectionDivider, null), React.createElement('div', { className: "my-8" }, React.createElement('p', { className: "text-lg text-gray-600 mb-4" }, content.contactPage.phoneLabel), React.createElement('div', { className: "flex flex-col items-center gap-3" }, React.createElement('a', { href: `tel:${SITE_PHONE_LINK}`, className: "inline-block bg-red-700 text-white font-bold py-3 px-8 rounded-full hover:bg-red-800 transition-colors text-lg shadow-lg hover:shadow-xl transform hover:scale-105" }, SITE_PHONE), React.createElement('a', { href: WHATSAPP_URL, target: '_blank', rel: 'noopener noreferrer', className: "inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105", 'aria-label': 'WhatsApp' }, React.createElement(WhatsAppIcon, null)))), React.createElement('p', { className: "text-lg text-gray-600 mb-4 mt-8" }, 'E-Mail:'), React.createElement('a', { href: `mailto:${content.contactPage.email}`, className: "inline-block bg-red-700 text-white font-bold py-3 px-8 rounded-full hover:bg-red-800 transition-colors text-lg shadow-lg hover:shadow-xl transform hover:scale-105" }, content.contactPage.email), React.createElement('div', { className: "mt-8" }, React.createElement(BookingButton, { language: language })), React.createElement('div', { className: "mt-12" }, React.createElement(InfoCardsSection, { infoSections: content.contactPage.infoSections }))));

const openCookieSettings = () => {
  if (typeof window !== 'undefined' && window.UC_UI && typeof window.UC_UI.showSecondLayer === 'function') {
    window.UC_UI.showSecondLayer();
  }
};

// Legal texts are HTML strings; buttons marked data-cookie-settings reopen the Usercentrics dialog.
const handleLegalContentClick = (event) => {
  if (event.target.closest && event.target.closest('[data-cookie-settings]')) {
    event.preventDefault();
    openCookieSettings();
  }
};

const FOOTER_LINK_CLASS = "font-semibold transition-colors hover:text-red-200 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white";

const LegalPage = ({ text }) => React.createElement('div', { className: "py-16 lg:py-24 min-h-screen bg-[#EFEFEF]" }, React.createElement('div', { className: "max-w-4xl mx-auto px-4" }, React.createElement('h1', { className: "text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-8 break-words hyphens-auto" }, text.title), React.createElement(SectionDivider, null), React.createElement('div', { className: "legal-content mt-10", onClick: handleLegalContentClick, dangerouslySetInnerHTML: { __html: text.content } })));

function App({ initialNavigation: providedInitialNavigation } = {}) {
  const initialNavigation = providedInitialNavigation || getInitialNavigationState();
  const [language, setLanguage] = useState(initialNavigation.language);
  const [currentPage, setCurrentPage] = useState(initialNavigation.currentPage);
  const [currentPost, setCurrentPost] = useState(initialNavigation.currentPost);
  const [targetAnchor, setTargetAnchor] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const historyInitializedRef = useRef(false);

  const content = TEXTS[language];
  const allServices = ALL_SERVICES[language];
  const allPosts = ALL_POSTS[language];

  const applyNavigationState = ({ nextLanguage = language, nextPage, nextPost = null, nextAnchor = null, historyMode = 'replace', scrollToTop = true }) => {
    const localizedPost = nextPage === Page.BLOG_POST ? getLocalizedPostForLanguage(nextLanguage, nextPost) : null;

    setLanguage(nextLanguage);
    setCurrentPage(nextPage);
    setCurrentPost(localizedPost);
    setTargetAnchor(nextAnchor || null);

    if (scrollToTop && !nextAnchor) {
      window.scrollTo(0, 0);
    }

    syncBrowserHistoryEntry({
      language: nextLanguage,
      currentPage: nextPage,
      currentPost: localizedPost,
      mode: historyMode
    });
  };

  const handleLanguageChange = (nextLanguage) => {
    const translatedPost = currentPage === Page.BLOG_POST ? getLocalizedPostForLanguage(nextLanguage, currentPost) : null;

    if (currentPage === Page.HOME) {
      applyNavigationState({ nextLanguage, nextPage: Page.HOME, historyMode: 'replace', scrollToTop: false });
      return;
    }

    syncBrowserHistoryEntry({
      language: nextLanguage,
      currentPage: Page.HOME,
      currentPost: null,
      mode: 'replace'
    });

    applyNavigationState({
      nextLanguage,
      nextPage: currentPage,
      nextPost: translatedPost,
      nextAnchor: targetAnchor,
      historyMode: 'push',
      scrollToTop: false
    });
  };

  const handleNavigate = (page, anchor) => {
    if (page === Page.HOME && currentPage !== Page.HOME) {
      window.history.back();
      return;
    }

    applyNavigationState({
      nextPage: page,
      nextAnchor: anchor || null,
      historyMode: page === Page.HOME ? 'replace' : (currentPage === Page.HOME ? 'push' : 'replace'),
      scrollToTop: !anchor
    });
  };

  const handleViewPost = (post) => {
    applyNavigationState({
      nextPage: Page.BLOG_POST,
      nextPost: post,
      historyMode: currentPage === Page.HOME ? 'push' : 'replace',
      scrollToTop: true
    });
  };

  const handleMobileNav = (page, anchor) => {
    handleNavigate(page, anchor);
    setIsMenuOpen(false);
  };

  useEffect(() => {
    if (currentPage === Page.SERVICES && targetAnchor) {
      const element = document.getElementById(targetAnchor);
      if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        setTargetAnchor(null);
      }
    }
  }, [currentPage, targetAnchor]);

  useEffect(() => {
    document.documentElement.lang = language.toLowerCase();
  }, [language]);

  useEffect(() => {
    if (historyInitializedRef.current) return;
    historyInitializedRef.current = true;

    const initialPost = initialNavigation.currentPage === Page.BLOG_POST
      ? getLocalizedPostForLanguage(initialNavigation.language, initialNavigation.currentPost)
      : null;

    if (initialNavigation.currentPage === Page.HOME) {
      syncBrowserHistoryEntry({
        language: initialNavigation.language,
        currentPage: Page.HOME,
        currentPost: null,
        mode: 'replace'
      });
      return;
    }

    syncBrowserHistoryEntry({
      language: initialNavigation.language,
      currentPage: Page.HOME,
      currentPost: null,
      mode: 'replace'
    });

    syncBrowserHistoryEntry({
      language: initialNavigation.language,
      currentPage: initialNavigation.currentPage,
      currentPost: initialPost,
      mode: 'push'
    });
  }, [initialNavigation]);

  useEffect(() => {
    const handlePopState = () => {
      const nextNavigation = getInitialNavigationState();
      setLanguage(nextNavigation.language);
      setCurrentPage(nextNavigation.currentPage);
      setCurrentPost(nextNavigation.currentPost);
      setTargetAnchor(null);
      setIsMenuOpen(false);
      window.scrollTo(0, 0);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    const resolvedPage = currentPage === Page.BLOG_POST && !currentPost ? Page.BLOG : currentPage;
    const localizedPost = currentPost ? (ALL_POSTS[language].find((post) => post.slug === currentPost.slug) || currentPost) : null;
    const seo = getSeoData({ language, currentPage: resolvedPage, currentPost: localizedPost });
    const canonicalUrl = buildUrl({ language, page: resolvedPage, post: localizedPost }).href;
    const germanUrl = buildUrl({
      language: Language.DE,
      page: resolvedPage,
      post: localizedPost ? ALL_POSTS[Language.DE].find((post) => post.slug === localizedPost.slug) || null : null
    }).href;
    const englishUrl = buildUrl({
      language: Language.EN,
      page: resolvedPage,
      post: localizedPost ? ALL_POSTS[Language.EN].find((post) => post.slug === localizedPost.slug) || null : null
    }).href;

    document.title = seo.title;
    setMetaByName('description', seo.description);
    setMetaByProperty('og:type', seo.ogType);
    setMetaByProperty('og:title', seo.title);
    setMetaByProperty('og:description', seo.description);
    setMetaByProperty('og:url', canonicalUrl);
    setMetaByProperty('og:image', seo.image);
    setMetaByProperty('og:locale', language === Language.DE ? 'de_DE' : 'en_GB');
    setMetaByName('twitter:title', seo.title);
    setMetaByName('twitter:description', seo.description);
    setMetaByName('twitter:image', seo.image);
    document.getElementById('canonical-link')?.setAttribute('href', canonicalUrl);
    document.getElementById('alternate-de')?.setAttribute('href', germanUrl);
    document.getElementById('alternate-en')?.setAttribute('href', englishUrl);
    document.getElementById('alternate-default')?.setAttribute('href', germanUrl);
    const structuredDataElement = document.getElementById('structured-data');
    if (structuredDataElement) {
      structuredDataElement.textContent = JSON.stringify(seo.jsonLd);
    }
  }, [language, currentPage, currentPost]);

  const renderPage = () => {
    switch (currentPage) {
      case Page.HOME: return React.createElement(HomePage, { content, onNavigate: handleNavigate, services: allServices, language });
      case Page.SERVICES: return React.createElement(ServicesPage, { content: content.services, services: allServices });
      case Page.ABOUT: return React.createElement(AboutPage, { content });
      case Page.BLOG: return React.createElement(BlogPage, { content, posts: allPosts, onViewPost: handleViewPost });
      case Page.BLOG_POST: return currentPost ? React.createElement(BlogPostPage, { post: currentPost, onBack: () => handleNavigate(Page.BLOG), backButtonText: content.blog.back_button }) : React.createElement(BlogPage, { content, posts: allPosts, onViewPost: handleViewPost });
      case Page.CONTACT: return React.createElement(ContactPage, { content, language });
      case Page.IMPRESSUM: return React.createElement(LegalPage, { text: content.impressum });
      case Page.PRIVACY: return React.createElement(LegalPage, { text: content.privacy });
      default: return React.createElement(HomePage, { content, onNavigate: handleNavigate, services: allServices, language });
    }
  };

  return (
    React.createElement('div', { className: "bg-[#EFEFEF] text-gray-800 font-sans overflow-x-hidden" },
      React.createElement('header', { className: "fixed top-0 left-0 right-0 bg-[#EFEFEF] shadow-md z-50 h-20 flex items-center" },
        React.createElement('nav', { className: "container mx-auto px-4 flex justify-between items-center w-full" },
          React.createElement('div', { className: "hidden md:flex w-full items-center gap-6" },
            React.createElement('div', { className: "flex-shrink-0" },
              React.createElement(HomeLogoButton, { onClick: () => handleNavigate(Page.HOME) })
            ),
            React.createElement('div', { className: "flex-shrink-0" }, React.createElement('button', { onClick: () => handleNavigate(Page.CONTACT), className: "bg-red-700 text-white font-bold py-2 px-6 rounded-full hover:bg-red-800 transition-colors text-lg shadow-md hover:shadow-lg transform hover:scale-105" }, content.nav[Page.CONTACT])),
            React.createElement('div', { className: "flex-1 min-w-0 flex items-center justify-end" },
              React.createElement('div', { className: "flex-1 flex justify-center items-center gap-3 lg:gap-5 min-w-0" },
                NAV_LINKS.map(link => React.createElement('button', { key: link.page, onClick: () => handleNavigate(link.page), className: `text-lg font-semibold transition-colors px-1 lg:px-2 whitespace-nowrap ${currentPage === link.page ? 'text-red-700' : 'text-gray-600 hover:text-red-700'}` }, content.nav[link.page]))
              ),
              React.createElement('div', { className: "pl-6 lg:pl-10 flex-shrink-0" }, React.createElement(LanguageSwitcher, { language: language, onChange: handleLanguageChange }))
            )
          ),
          React.createElement('div', { className: "md:hidden w-full flex items-center justify-between" },
            React.createElement('div', { className: "flex-1 flex justify-start" },
              React.createElement(HomeLogoButton, { onClick: () => handleNavigate(Page.HOME) })
            ),
            React.createElement('div', { className: "flex-shrink-0" }, React.createElement('button', { onClick: () => handleNavigate(Page.CONTACT), className: "bg-red-700 text-white font-bold py-2 px-5 rounded-full hover:bg-red-800 transition-colors text-base shadow-md" }, content.nav[Page.CONTACT])),
            React.createElement('div', { className: "flex-1 flex justify-end" },
              React.createElement('button', { onClick: () => setIsMenuOpen(true), className: "text-gray-700" },
                React.createElement('svg', { className: "w-8 h-8", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M4 6h16M4 12h16m-7 6h7" }))
              )
            )
          )
        )
      ),
      React.createElement('div', { className: `fixed top-0 right-0 h-full w-full bg-[#EFEFEF] z-50 transform menu-panel ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}` },
        React.createElement('div', { className: "flex justify-end p-4" },
          React.createElement('button', { onClick: () => setIsMenuOpen(false), className: "text-gray-700" },
            React.createElement('svg', { className: "w-8 h-8", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M6 18L18 6M6 6l12 12" }))
          )
        ),
        React.createElement('div', { className: "flex flex-col items-center justify-center h-full -mt-16 space-y-8" },
          NAV_LINKS.map(link => React.createElement('button', { key: `mobile-${link.page}`, onClick: () => handleMobileNav(link.page), className: `text-3xl font-bold transition-colors ${currentPage === link.page ? 'text-red-700' : 'text-gray-700 hover:text-red-700'}` }, content.nav[link.page])),
          React.createElement(LanguageSwitcher, { language: language, onChange: (nextLanguage) => { handleLanguageChange(nextLanguage); setIsMenuOpen(false); }, buttonClassName: 'p-2' })
        )
      ),
      React.createElement('main', { className: "pt-20" }, renderPage()),
      React.createElement('footer', { className: "bg-red-700 text-white" },
        React.createElement('div', { className: "container mx-auto px-4 py-8 grid gap-8 md:grid-cols-3 items-start text-center md:text-left" },
          React.createElement('div', null,
            React.createElement('h4', { className: "font-bold text-lg" }, 'UrbanVet'),
            React.createElement('p', { className: "text-red-200 mt-1" }, content.footer.tagline),
            React.createElement('div', { className: "mt-4 text-sm text-red-100" },
              React.createElement('p', { className: "font-semibold text-white" }, content.footer.phoneLabel),
              React.createElement('a', { href: `tel:${SITE_PHONE_LINK}`, className: "hover:text-white transition-colors" }, SITE_PHONE)
            )
          ),
          React.createElement('div', { className: "text-sm text-red-100 md:px-4" },
            React.createElement('p', { className: "font-semibold text-white mb-2" }, content.footer.openingHoursLabel),
            React.createElement('p', null, content.footer.scheduleLine1),
            content.footer.scheduleLine2 ? React.createElement('p', { className: "mt-1" }, content.footer.scheduleLine2) : null,
            content.footer.scheduleLine3 ? React.createElement('p', { className: "mt-1" }, content.footer.scheduleLine3) : null,
            React.createElement('p', { className: "mt-3 leading-6" }, content.footer.appointmentNote)
          ),
          React.createElement('div', { className: "text-center md:text-left md:justify-self-end" },
            React.createElement('nav', { 'aria-label': content.footer.legalNavLabel },
              React.createElement('ul', { className: "flex flex-col items-center md:items-start gap-2" },
                [Page.IMPRESSUM, Page.PRIVACY].map((page) => React.createElement('li', { key: page },
                  React.createElement('a', {
                    href: buildUrl({ language, page }).pathname,
                    onClick: (event) => {
                      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
                      event.preventDefault();
                      handleNavigate(page);
                    },
                    'aria-current': currentPage === page ? 'page' : undefined,
                    className: FOOTER_LINK_CLASS
                  }, page === Page.IMPRESSUM ? content.footer.imprint : content.footer.privacy)
                )),
                React.createElement('li', null,
                  React.createElement('button', { type: 'button', onClick: openCookieSettings, className: FOOTER_LINK_CLASS }, content.footer.cookieSettings)
                )
              )
            ),
            React.createElement('div', { className: "text-sm text-red-200 mt-4 leading-5" },
              React.createElement('p', null, `© ${new Date().getFullYear()} UrbanVet.`),
              React.createElement('p', null, 'All rights reserved.')
            )
          )
        )
      )
    )
  );
}

// Exports so the build (Node) can server-render and read SEO data.
const UrbanVet = { App, getSeoData, buildUrl, toAbsoluteUrl, ALL_POSTS, PAGE_PATHS, BLOG_BASE_PATHS, Language, Page, SITE_URL, SITE_NAME };
if (typeof globalThis !== 'undefined') { globalThis.UrbanVet = UrbanVet; }
if (typeof module !== 'undefined' && module.exports) { module.exports = UrbanVet; }

// Old single-URL links (?lang=de&page=impressum, still used by external sites)
// land on the home page markup; send them to the real path instead.
const getLegacyQueryRedirect = () => {
  if (window.location.protocol === 'file:') return null;
  const params = new URLSearchParams(window.location.search);
  const page = QUERY_PAGE_MAP[params.get('page')];
  if (!page || params.get(ROUTE_REDIRECT_PARAM)) return null;
  const language = params.get('lang') === 'en' ? Language.EN : Language.DE;
  const post = page === Page.BLOG && params.get('post')
    ? ALL_POSTS[language].find((candidate) => candidate.slug === params.get('post')) || null
    : null;
  return buildUrl({ language, page: post ? Page.BLOG_POST : page, post }).pathname + window.location.hash;
};

// Browser-only mount. Hydrate the pre-rendered markup if present, otherwise render fresh.
if (typeof document !== 'undefined' && typeof ReactDOM !== 'undefined') {
  const rootElement = document.getElementById('root');
  const legacyRedirect = getLegacyQueryRedirect();
  if (legacyRedirect) {
    window.location.replace(legacyRedirect);
  } else if (rootElement) {
    const tree = React.createElement(React.StrictMode, null, React.createElement(App, null));
    if (rootElement.firstElementChild) {
      ReactDOM.hydrateRoot(rootElement, tree);
    } else {
      ReactDOM.createRoot(rootElement).render(tree);
    }
  }
}
