import { GenreKey, Movie, UserProfile } from '../types/movie';
import commandBunkerImg from '../assets/images/hero_harbi_cyber_command_1791486187511.jpg';
import cyberVaultImg from '../assets/images/operation_cryptography_unit_1791486209992.jpg';
import telemetryGridImg from '../assets/images/operation_red_team_grid_1791486219920.jpg';
import hardwareLabImg from '../assets/images/operation_zero_day_lab_1791486200128.jpg';

export const GENRE_FILTERS: { key: GenreKey; label: string }[] = [
  { key: 'all', label: 'جميع التصنيفات' },
  { key: 'action', label: 'أكشن وإثارة' },
  { key: 'scifi', label: 'خيال علمي' },
  { key: 'drama', label: 'دراما وجريمة' },
  { key: 'mystery', label: 'غموض وتاريخ' },
  { key: 'documentary', label: 'وثائقيات' },
];

export const PROFILES: UserProfile[] = [
  {
    id: 'ahmed',
    name: 'أحمد',
    initials: 'أ',
    color: '#E50914',
    isKids: false,
  },
  {
    id: 'sara',
    name: 'سارة',
    initials: 'س',
    color: '#2563EB',
    isKids: false,
  },
  {
    id: 'kids',
    name: 'أطفال',
    initials: 'ط',
    color: '#16A34A',
    isKids: true,
  },
];

export const MOVIES: Movie[] = [
  {
    id: 'eclipse-of-sand',
    title: 'كسوف الرمال',
    originalTitle: 'Eclipse of Sand',
    type: 'movie',
    year: 2026,
    ageRating: '+16',
    durationLabel: '2س 18د',
    durationSeconds: 8280,
    quality: '4K Dolby Vision',
    genres: ['scifi', 'action'],
    genreLabel: 'خيال علمي وتشويق',
    matchScore: 98,
    synopsis:
      'في صحراء شاسعة تحكمها العواصف المغناطيسية، يكتشف مهندس معزول مسلة قديمة تبث إشارات زمنية تهدد بإعادة تشكيل تاريخ الحضارة البشرية.',
    director: 'طارق المنصور',
    cast: ['كريم عبد العزيز', 'هند صبري', 'ظافر العابدين', 'سلمى أبو ضيف'],
    isOriginal: true,
    isTrending: true,
    topRank: 1,
    artworkTheme: 'eclipse-desert',
    accentColor: '#E50914',
    subtitles: [
      {
        startSec: 0,
        endSec: 8,
        ar: 'السماء فوق الربع الخالي لم تعد تعكس الضوء كما نعرفه.',
        en: 'The sky above the Empty Quarter no longer reflects light as we know it.',
      },
      {
        startSec: 8,
        endSec: 16,
        ar: 'النبضة القادمة من تحت الكثبان تتكرر كل أربعين ثانية بدقة تامة.',
        en: 'The pulse from beneath the dunes repeats every forty seconds with absolute precision.',
      },
      {
        startSec: 16,
        endSec: 25,
        ar: 'إذا دخلنا النطاق الداخلي قبل الغروب، فلن يكون هناك طريق للعودة.',
        en: 'If we enter the inner perimeter before sunset, there will be no turning back.',
      },
    ],
  },
  {
    id: 'subterranean-protocol',
    title: 'بروتوكول العمق',
    originalTitle: 'Subterranean Protocol',
    type: 'series',
    year: 2026,
    ageRating: '+18',
    durationLabel: 'موسمان · 12 حلقة',
    durationSeconds: 3120,
    quality: '4K HDR',
    genres: ['action', 'mystery'],
    genreLabel: 'تشويق استخباراتي',
    matchScore: 97,
    synopsis:
      'داخل منشأة محصنة تحت الجليد، يحاول فريق من محللي التشفير فك شيفرة قمر صناعي مفقود قبل أن تنقطع الاتصالات العالمية بالكامل.',
    director: 'باسل الخطيب',
    cast: ['باسل خياط', 'نيللي كريم', 'إياد نصار', 'ريهام عبد الغفور'],
    isOriginal: true,
    isTrending: true,
    topRank: 2,
    artworkTheme: 'command-bunker',
    imageSrc: commandBunkerImg,
    accentColor: '#DC2626',
    seasons: [
      {
        number: 1,
        title: 'الموسم الأول: النفق الصفري',
        episodes: [
          {
            id: 'sp-s1-e1',
            number: 1,
            title: 'الإشارة المفقودة',
            durationMinutes: 52,
            durationLabel: '52 دقيقة',
            synopsis:
              'تنقطع جميع قنوات الاتصال الفضائية فوق المحيط الأطلسي، ويُستدعى طارق إلى المقر السفلي في منتصف الليل.',
            theme: 'command-bunker',
          },
          {
            id: 'sp-s1-e2',
            number: 2,
            title: 'الخزانة الرابعة',
            durationMinutes: 48,
            durationLabel: '48 دقيقة',
            synopsis:
              'اكتشاف خادم غير مسجل داخل قطاع التشفير يثير الشكوك حول وجود اختراق داخلي قديم.',
            theme: 'cyber-vault',
          },
          {
            id: 'sp-s1-e3',
            number: 3,
            title: 'موجة العودة',
            durationMinutes: 55,
            durationLabel: '55 دقيقة',
            synopsis:
              'تنجح ليلى في اعتراض تردد عكسي يكشف موقع المحطة العائمة في المياه الدولية.',
            theme: 'telemetry-grid',
          },
        ],
      },
      {
        number: 2,
        title: 'الموسم الثاني: شيفرة الصمت',
        episodes: [
          {
            id: 'sp-s2-e1',
            number: 1,
            title: 'ما بعد الجليد',
            durationMinutes: 54,
            durationLabel: '54 دقيقة',
            synopsis:
              'يبدأ الفريق مهمة سرية لاستعادة الصندوق الأسود من محطة الأبحاث المهجورة.',
            theme: 'frozen-observatory',
          },
          {
            id: 'sp-s2-e2',
            number: 2,
            title: 'لوحة السيليكون',
            durationMinutes: 50,
            durationLabel: '50 دقيقة',
            synopsis:
              'فحص الدوائر المادية يكشف عن معالج لم يُصمم لأي نظام تجاري معروف.',
            theme: 'hardware-lab',
          },
        ],
      },
    ],
    subtitles: [
      {
        startSec: 0,
        endSec: 9,
        ar: 'مستوى الأمان الرابع تم تجاوزه منذ ثلاث ساعات دون أي إنذار.',
        en: 'Level four security was bypassed three hours ago without a single alarm.',
      },
      {
        startSec: 9,
        endSec: 18,
        ar: 'افصل جميع الخوادم الاحتياطية الآن واترك قناة القياس فقط.',
        en: 'Isolate all backup servers now and leave only the telemetry channel open.',
      },
    ],
  },
  {
    id: 'midnight-bridge',
    title: 'جسر منتصف الليل',
    originalTitle: 'Midnight Bridge',
    type: 'movie',
    year: 2025,
    ageRating: '+16',
    durationLabel: '1س 56د',
    durationSeconds: 6960,
    quality: '4K HDR',
    genres: ['action', 'drama'],
    genreLabel: 'أكشن وجريمة',
    matchScore: 95,
    synopsis:
      'سائق عمليات سابق يُجبر على تنفيذ رحلة أخيرة عبر مدينة تغرق في المطر لتسليم حقيبة مشفرة خلال تسعين دقيقة قبل الفجر.',
    director: 'مروان حامد',
    cast: ['أحمد عز', 'أمينة خليل', 'آسر ياسين'],
    isTrending: true,
    topRank: 3,
    artworkTheme: 'midnight-bridge',
    accentColor: '#E50914',
    subtitles: [
      {
        startSec: 0,
        endSec: 8,
        ar: 'المطر يمسح آثار الإطارات، لكنه لا يمسح أرقام اللوحات.',
        en: 'The rain washes away tire tracks, not license plates.',
      },
      {
        startSec: 8,
        endSec: 17,
        ar: 'أمامك سبع دقائق للعبور قبل أن تُغلق بوابات الجسر الجنوبي.',
        en: 'You have seven minutes to cross before the south bridge gates lock down.',
      },
    ],
  },
  {
    id: 'orbital-horizon',
    title: 'الأفق المداري',
    originalTitle: 'Orbital Horizon',
    type: 'movie',
    year: 2026,
    ageRating: '+13',
    durationLabel: '2س 24د',
    durationSeconds: 8640,
    quality: '4K Dolby Vision',
    genres: ['scifi', 'drama'],
    genreLabel: 'خيال علمي ودراما',
    matchScore: 96,
    synopsis:
      'على متن محطة مدارية تدور على ارتفاع 400 كيلومتر، يتوجب على قائدة البعثة إنقاذ طاقمها بعد عاصفة شمسية تعزلهم عن كوكب الأرض.',
    director: 'نادين لبكي',
    cast: ['منى زكي', 'خالد النبوي', 'تيم حسن'],
    isOriginal: true,
    isTrending: true,
    topRank: 4,
    isKidFriendly: true,
    artworkTheme: 'orbital-ring',
    accentColor: '#38BDF8',
    subtitles: [
      {
        startSec: 0,
        endSec: 9,
        ar: 'الأكسجين في الوحدة الثالثة يكفي لاثنتي عشرة ساعة فقط.',
        en: 'Oxygen in Module Three will last for twelve hours only.',
      },
      {
        startSec: 9,
        endSec: 18,
        ar: 'انظري إلى الأفق.. لم أشاهد شروقاً بهذه الدقة من قبل.',
        en: 'Look at the horizon... I have never seen a sunrise this sharp before.',
      },
    ],
  },
  {
    id: 'vault-level-4',
    title: 'قبو التشفير',
    originalTitle: 'Level 4 Crypto',
    type: 'movie',
    year: 2025,
    ageRating: '+16',
    durationLabel: '2س 04د',
    durationSeconds: 7440,
    quality: '4K HDR',
    genres: ['mystery', 'action'],
    genreLabel: 'غموض وسرقة ذكية',
    matchScore: 93,
    synopsis:
      'مهندسة أمن مالي تخطط لاقتحام أعمق خزانة بيانات في العالم لإثبات براءة شقيقها من جريمة رقمية لم يرتكبها.',
    director: 'عمرو سلامة',
    cast: ['صبا مبارك', 'ماجد الكدواني', 'أحمد مالك'],
    isTrending: true,
    topRank: 5,
    artworkTheme: 'cyber-vault',
    imageSrc: cyberVaultImg,
    accentColor: '#F59E0B',
    subtitles: [
      {
        startSec: 0,
        endSec: 9,
        ar: 'الباب الفولاذي يزن تسعة أطنان، لكن المفتاح الحقيقي موجود في الكود.',
        en: 'The steel door weighs nine tons, yet the real key lies inside the code.',
      },
    ],
  },
  {
    id: 'cairo-noir-1954',
    title: 'أزقة الضباب',
    originalTitle: 'Alleys of Mist',
    type: 'series',
    year: 2025,
    ageRating: '+16',
    durationLabel: 'موسم واحد · 8 حلقات',
    durationSeconds: 2880,
    quality: '4K HDR',
    genres: ['drama', 'mystery'],
    genreLabel: 'دراما نوار وتحقيق',
    matchScore: 94,
    synopsis:
      'في شوارع وسط المدينة الشتوية، يحقق صحفي عنيد في سلسلة اختفاءات غامضة تقود إلى ملفات منسية منذ خمسينيات القرن الماضي.',
    director: 'تامر محسن',
    cast: ['خالد الصاوي', 'تارا عماد', 'محمد فراج'],
    isOriginal: true,
    topRank: 6,
    artworkTheme: 'noir-alley',
    accentColor: '#D97706',
    seasons: [
      {
        number: 1,
        title: 'الموسم الأول',
        episodes: [
          {
            id: 'am-s1-e1',
            number: 1,
            title: 'رسالة بلا طابع',
            durationMinutes: 48,
            durationLabel: '48 دقيقة',
            synopsis:
              'تصل رسالة مجهولة إلى مكتب الجريدة في منتصف الليل تحمل عنوان زقاق مهجور.',
            theme: 'noir-alley',
          },
          {
            id: 'am-s1-e2',
            number: 2,
            title: 'الشاهد الصامت',
            durationMinutes: 46,
            durationLabel: '46 دقيقة',
            synopsis:
              'يكتشف المحقق أن آخر من شاهد الضحية هو عازف قديم في مقهى النيل.',
            theme: 'ancient-library',
          },
        ],
      },
    ],
    subtitles: [
      {
        startSec: 0,
        endSec: 9,
        ar: 'المدينة لا تنام في الشتاء؛ إنها فقط تخفض صوتها.',
        en: 'The city does not sleep in winter; it merely lowers its voice.',
      },
    ],
  },
  {
    id: 'abyss-sanctuary',
    title: 'معبد الأعماق',
    originalTitle: 'Abyss Sanctuary',
    type: 'documentary',
    year: 2026,
    ageRating: 'G',
    durationLabel: '1س 38د',
    durationSeconds: 5880,
    quality: '4K Dolby Vision',
    genres: ['documentary', 'mystery'],
    genreLabel: 'وثائقي واستكشاف',
    matchScore: 92,
    synopsis:
      'رحلة غوص علمية غير مسبوقة على عمق ثلاثة آلاف متر لتصوير أطلال حجرية غارقة وكائنات مضيئة في أعماق البحر الأحمر.',
    director: 'د. رامي سليم',
    cast: ['فريق الاستكشاف البحري الدولي'],
    isOriginal: true,
    topRank: 7,
    isKidFriendly: true,
    artworkTheme: 'ocean-abyss',
    accentColor: '#06B6D4',
    subtitles: [
      {
        startSec: 0,
        endSec: 9,
        ar: 'على عمق ألفي متر، يختفي ضوء الشمس وتبدأ الحياة المضيئة ذاتياً.',
        en: 'At two thousand meters deep, sunlight vanishes and bioluminescent life begins.',
      },
    ],
  },
  {
    id: 'silicon-anatomy',
    title: 'تشريح السيليكون',
    originalTitle: 'Silicon Anatomy',
    type: 'documentary',
    year: 2025,
    ageRating: '+13',
    durationLabel: '1س 44د',
    durationSeconds: 6240,
    quality: 'Full HD',
    genres: ['documentary', 'scifi'],
    genreLabel: 'وثائقي تقني',
    matchScore: 91,
    synopsis:
      'نظرة نادرة داخل مختبرات الهندسة العكسية، حيث يفكك العلماء الرقائق الدقيقة لاكتشاف أسرار الحوسبة الفائقة والأمن السيبراني.',
    director: 'عمر الشريف الابن',
    cast: ['خبراء أشباه الموصلات'],
    topRank: 8,
    isKidFriendly: true,
    artworkTheme: 'hardware-lab',
    imageSrc: hardwareLabImg,
    accentColor: '#10B981',
    subtitles: [
      {
        startSec: 0,
        endSec: 9,
        ar: 'كل رقاقة تحكي قصة ملايين الترانزستورات المرتبطة بدقة مجهرية.',
        en: 'Every microchip tells the story of millions of transistors wired at microscopic scale.',
      },
    ],
  },
  {
    id: 'andalus-gardens',
    title: 'أقواس قرطبة',
    originalTitle: 'Arches of Cordoba',
    type: 'series',
    year: 2024,
    ageRating: '+13',
    durationLabel: 'موسم واحد · 10 حلقات',
    durationSeconds: 3000,
    quality: '4K HDR',
    genres: ['drama', 'mystery'],
    genreLabel: 'دراما تاريخية',
    matchScore: 95,
    synopsis:
      'ملحمة تاريخية بصرية عن مهندسة فلك ومترجمة مخطوطات تسعى لحماية مكتبة الأندلس الكبرى من الاندثار وسط التحولات السياسية.',
    director: 'حاتم علي',
    cast: ['سلافة معمار', 'قصي خولي', 'رشيد عساف'],
    isOriginal: true,
    topRank: 9,
    isKidFriendly: true,
    artworkTheme: 'andalus-arch',
    accentColor: '#F59E0B',
    seasons: [
      {
        number: 1,
        title: 'الموسم الأول: بيت الحكمة',
        episodes: [
          {
            id: 'ac-s1-e1',
            number: 1,
            title: 'ظلال الرخام',
            durationMinutes: 50,
            durationLabel: '50 دقيقة',
            synopsis:
              'تصل قافلة المخطوطات النادرة إلى قرطبة محملة بخرائط فلكية لم تُترجم من قبل.',
            theme: 'andalus-arch',
          },
          {
            id: 'ac-s1-e2',
            number: 2,
            title: 'الأسطرلاب الذهبي',
            durationMinutes: 49,
            durationLabel: '49 دقيقة',
            synopsis:
              'سباق مع الزمن لإعادة بناء أداة الرصد قبل الخسوف القمري الكلي.',
            theme: 'ancient-library',
          },
        ],
      },
    ],
    subtitles: [
      {
        startSec: 0,
        endSec: 9,
        ar: 'الحبر يبقى أطول من الحديد، والمعرفة تعبر القرون بصمت.',
        en: 'Ink outlasts iron, and knowledge crosses centuries in silence.',
      },
    ],
  },
  {
    id: 'frozen-bastion',
    title: 'المرصد المتجمد',
    originalTitle: 'Frozen Bastion',
    type: 'movie',
    year: 2026,
    ageRating: '+16',
    durationLabel: '2س 09د',
    durationSeconds: 7740,
    quality: '4K Dolby Vision',
    genres: ['action', 'scifi'],
    genreLabel: 'تشويق وبقاء',
    matchScore: 93,
    synopsis:
      'في قلب عاصفة قطبية لا تهدأ، تحاول عالمة أرصاد الدفاع عن بيانات المناخ المحفوظة داخل مرصد جبلي معزول بعد وصول زوار غير متوقعين.',
    director: 'خالد يوسف',
    cast: ['دينا الشربيني', 'عمرو يوسف', 'محمد ممدوح'],
    isTrending: true,
    topRank: 10,
    artworkTheme: 'frozen-observatory',
    accentColor: '#3B82F6',
    subtitles: [
      {
        startSec: 0,
        endSec: 9,
        ar: 'درجة الحرارة بالخارج أربعون تحت الصفر، والمولد الاحتياطي ينفد.',
        en: 'It is forty below outside, and the backup generator is running dry.',
      },
    ],
  },
  {
    id: 'satcom-frequency',
    title: 'تردد المراقبة',
    originalTitle: 'Telemetry Signal',
    type: 'movie',
    year: 2025,
    ageRating: '+16',
    durationLabel: '1س 52د',
    durationSeconds: 6720,
    quality: '4K HDR',
    genres: ['mystery', 'action'],
    genreLabel: 'إثارة تقنية',
    matchScore: 89,
    synopsis:
      'فني اتصالات يلتقط بثاً مشوشاً عبر أجهزة الراديو التناظرية القديمة، ليكتشف شبكة تجسس تعمل خارج تغطية الأقمار الصناعية الحديثة.',
    director: 'شريف عرفة',
    cast: ['أحمد حلمي', 'يسرا اللوزي', 'محمود حميدة'],
    artworkTheme: 'telemetry-grid',
    imageSrc: telemetryGridImg,
    accentColor: '#22C55E',
    subtitles: [
      {
        startSec: 0,
        endSec: 9,
        ar: 'الموجة لا تكذب؛ هناك جهاز إرسال يعمل على تردد 12.45 غيغاهرتز.',
        en: 'The waveform never lies; a transmitter is active on 12.45 gigahertz.',
      },
    ],
  },
  {
    id: 'neon-monsoon',
    title: 'أمطار النيون',
    originalTitle: 'Neon Monsoon',
    type: 'series',
    year: 2026,
    ageRating: '+16',
    durationLabel: 'موسم واحد · 6 حلقات',
    durationSeconds: 2700,
    quality: '4K Dolby Vision',
    genres: ['scifi', 'action'],
    genreLabel: 'سايبربانك وتشويق',
    matchScore: 94,
    synopsis:
      'في مدينة عمودية لا تتوقف أمطارها، تكتشف مبرمجة ذاكرة رقمية أن ذكريات السكان تُباع في السوق السوداء.',
    director: 'هادي الباجوري',
    cast: ['ياسمين صبري', 'شريف سلامة', 'محمد شاهين'],
    isOriginal: true,
    artworkTheme: 'neon-rain',
    accentColor: '#E50914',
    seasons: [
      {
        number: 1,
        title: 'الموسم الأول: الذاكرة السائلة',
        episodes: [
          {
            id: 'nm-s1-e1',
            number: 1,
            title: 'النسخة المفقودة',
            durationMinutes: 45,
            durationLabel: '45 دقيقة',
            synopsis:
              'تستيقظ سلمى لتجد أربع ساعات من يومها ممسوحة من السجل العصبي.',
            theme: 'neon-rain',
          },
          {
            id: 'nm-s1-e2',
            number: 2,
            title: 'السوق الليلي',
            durationMinutes: 47,
            durationLabel: '47 دقيقة',
            synopsis:
              'مطاردة وسط الأبراج الزجاجية للوصول إلى بائع الذكريات الأصلي.',
            theme: 'midnight-bridge',
          },
        ],
      },
    ],
    subtitles: [
      {
        startSec: 0,
        endSec: 9,
        ar: 'كل ذكرى لها ثمن، لكن النسيان هو الأغلى دائماً.',
        en: 'Every memory has a price, yet forgetting is always the costliest.',
      },
    ],
  },
  {
    id: 'crimson-horizon-voyage',
    title: 'رحلة الأفق القرمزي',
    originalTitle: 'Crimson Horizon',
    type: 'movie',
    year: 2024,
    ageRating: 'G',
    durationLabel: '1س 40د',
    durationSeconds: 6000,
    quality: '4K HDR',
    genres: ['documentary', 'drama'],
    genreLabel: 'مغامرة عائلية',
    matchScore: 90,
    synopsis:
      'رحلة بحرية وصحراوية ملهمة يتتبع فيها صانع أفلام شاب مسارات الرحالة القدماء عبر ثلاث قارات بحثاً عن أسرار الملاحة الفلكية.',
    director: 'سعد هنداوي',
    cast: ['آدم الشرقاوي', 'مايان السيد'],
    isKidFriendly: true,
    artworkTheme: 'crimson-horizon',
    accentColor: '#F97316',
    subtitles: [
      {
        startSec: 0,
        endSec: 9,
        ar: 'النجوم كانت أول خريطة عرفها الإنسان لعبور البحار.',
        en: 'The stars were the very first map humankind used to cross the seas.',
      },
    ],
  },
  {
    id: 'lost-manuscripts',
    title: 'حراس المخطوطات',
    originalTitle: 'Keepers of Ink',
    type: 'documentary',
    year: 2025,
    ageRating: 'G',
    durationLabel: '1س 28د',
    durationSeconds: 5280,
    quality: 'Full HD',
    genres: ['documentary', 'mystery'],
    genreLabel: 'وثائقي ثقافي',
    matchScore: 91,
    synopsis:
      'قصة أمناء مكتبات يرممون مئات المخطوطات النادرة باستخدام تقنيات التصوير الطيفي لكشف نصوص مخفية تحت الحبر القديم.',
    director: 'ليلى المراكشي',
    cast: ['مختبر الترميم الدولي'],
    isKidFriendly: true,
    artworkTheme: 'ancient-library',
    accentColor: '#EAB308',
    subtitles: [
      {
        startSec: 0,
        endSec: 9,
        ar: 'تحت الأشعة فوق البنفسجية، تعود الكلمات الممحاة إلى الحياة.',
        en: 'Under ultraviolet light, erased words return to life.',
      },
    ],
  },
];

export const INITIAL_MY_LIST: string[] = [
  'eclipse-of-sand',
  'subterranean-protocol',
  'orbital-horizon',
];

export const INITIAL_WATCH_PROGRESS = {
  'subterranean-protocol': {
    seconds: 1740,
    durationSeconds: 3120,
    episodeId: 'sp-s1-e1',
    updatedAt: Date.now() - 3600 * 1000 * 4,
  },
  'midnight-bridge': {
    seconds: 4120,
    durationSeconds: 6960,
    updatedAt: Date.now() - 3600 * 1000 * 18,
  },
  'orbital-horizon': {
    seconds: 2650,
    durationSeconds: 8640,
    updatedAt: Date.now() - 3600 * 1000 * 30,
  },
  'andalus-gardens': {
    seconds: 1200,
    durationSeconds: 3000,
    episodeId: 'ac-s1-e1',
    updatedAt: Date.now() - 3600 * 1000 * 48,
  },
};

const DAY_MS = 24 * 3600 * 1000;

export const INITIAL_WATCH_HISTORY: Record<
  string,
  { movieId: string; completedAt: number; episodeId?: string }
> = {
  'eclipse-of-sand': {
    movieId: 'eclipse-of-sand',
    completedAt: Date.now() - 2 * 3600 * 1000,
  },
  'cairo-noir-1954': {
    movieId: 'cairo-noir-1954',
    completedAt: Date.now() - DAY_MS * 1 - 5 * 3600 * 1000,
    episodeId: 'am-s1-e2',
  },
  'vault-level-4': {
    movieId: 'vault-level-4',
    completedAt: Date.now() - DAY_MS * 3,
  },
  'neon-monsoon': {
    movieId: 'neon-monsoon',
    completedAt: Date.now() - DAY_MS * 6,
    episodeId: 'nm-s1-e2',
  },
  'abyss-sanctuary': {
    movieId: 'abyss-sanctuary',
    completedAt: Date.now() - DAY_MS * 11,
  },
};

export const INITIAL_KIDS_WATCH_HISTORY: Record<
  string,
  { movieId: string; completedAt: number; episodeId?: string }
> = {
  'crimson-horizon-voyage': {
    movieId: 'crimson-horizon-voyage',
    completedAt: Date.now() - 4 * 3600 * 1000,
  },
  'lost-manuscripts': {
    movieId: 'lost-manuscripts',
    completedAt: Date.now() - DAY_MS * 2,
  },
};
