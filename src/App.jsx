import React, { useEffect, useRef, useState } from "react";

function Reveal({ children, as: Tag = "div", className = "", delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? "reveal-visible" : ""} ${className}`.trim()}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}

const NAV_LINKS = [
  { id: "home", label: "الرئيسية", href: "#home" },
  { id: "about", label: "من نحن", href: "#about" },
  { id: "sectors", label: "قطاعات الأعمال", href: "#sectors" },
  { id: "workshop", label: "ورشة الحديد", href: "#workshop" },
  { id: "methodology", label: "منهجية العمل", href: "#methodology" },
  { id: "projects", label: "معرض المشاريع", href: "#projects" },
  { id: "services", label: "خدمات أجيال المسعّرة", href: "#services", action: "services" },
  { id: "why", label: "لماذا أجيال", href: "#why" },
  { id: "contact", label: "تواصل معنا", href: "#contact" },
  { id: "app", label: "تطبيق أجيال", href: "/app", cta: true },
];

const AJIAL_WHATSAPP = "966555095652";

function buildWhatsAppLink(message) {
  return `https://wa.me/${AJIAL_WHATSAPP}?text=${encodeURIComponent(message)}`;
}

function formatUnit(unit) {
  if (unit === "م²") return <span className="unit-nowrap">م<sup>2</sup></span>;
  if (unit === "م³") return <span className="unit-nowrap">م<sup>3</sup></span>;
  return unit;
}

const SERVICE_CATEGORIES = [
  { id: "metal", label: "الأعمال المعدنية والهياكل" },
  { id: "finishing", label: "أعمال التشطيب" },
  { id: "shell", label: "أعمال العظم" },
  { id: "custom", label: "طلب عرض مشروع خاص" },
];

/**
 * أسعار مبدئية قابلة للتعديل من هنا فقط.
 * كل الأسعار تقديرية وتخضع لمراجعة أجيال قبل الاعتماد (موضح للعميل بالواجهة).
 */
const SERVICES = [
  // الأعمال المعدنية والهياكل
  {
    id: "metal-sandwich-room",
    category: "metal",
    name: "غرف سندوتش بانل",
    description: "غرف جاهزة بألواح الساندوتش بانل بمقاسات ثابتة.",
    pricingType: "fixed",
    price: null,
    unit: "غرفة",
    minQty: null,
    fixedOptions: [
      { id: "3x3", label: "غرفة 3×3 م", price: 9000 },
      { id: "3x6", label: "غرفة 3×6 م", price: 16000 },
      { id: "6x6", label: "غرفة 6×6 م", price: 28000 },
    ],
    includes: [],
    excludes: [],
    duration: null,
    requiresReview: true,
    sortOrder: 1,
  },
  {
    id: "metal-sandwich-panel",
    category: "metal",
    name: "ألواح سندوتش بانل",
    description: "توريد وتركيب ألواح الساندوتش بانل للأسقف والجدران.",
    pricingType: "direct",
    price: 250,
    unit: "م²",
    minQty: null,
    fixedOptions: [],
    includes: [],
    excludes: [],
    duration: null,
    requiresReview: true,
    sortOrder: 2,
  },
  {
    id: "metal-fence",
    category: "metal",
    name: "أسوار حديد",
    description: "تصنيع وتركيب أسوار حديد بارتفاعات وتصاميم مختلفة.",
    pricingType: "direct",
    price: 220,
    unit: "م.ط",
    minQty: null,
    fixedOptions: [],
    includes: [],
    excludes: [],
    duration: null,
    requiresReview: true,
    sortOrder: 3,
  },
  {
    id: "metal-gate",
    category: "metal",
    name: "بوابات حديد",
    description: "بوابات حديد جاهزة بمقاسات قياسية للمركبات والمشاة.",
    pricingType: "fixed",
    price: null,
    unit: "بوابة",
    minQty: null,
    fixedOptions: [
      { id: "pedestrian", label: "بوابة مشاة", price: 1200 },
      { id: "single-car", label: "بوابة سيارة مفردة", price: 2800 },
      { id: "double-car", label: "بوابة سيارتين", price: 4500 },
    ],
    includes: [],
    excludes: [],
    duration: null,
    requiresReview: true,
    sortOrder: 4,
  },
  {
    id: "metal-handrail",
    category: "metal",
    name: "درابزين",
    description: "تصنيع وتركيب درابزين حديد للسلالم والمنصات.",
    pricingType: "direct",
    price: 180,
    unit: "م.ط",
    minQty: null,
    fixedOptions: [],
    includes: [],
    excludes: [],
    duration: null,
    requiresReview: true,
    sortOrder: 5,
  },
  {
    id: "metal-hangar",
    category: "metal",
    name: "هناجر ومستودعات",
    description: "تصميم وتنفيذ هناجر ومستودعات معدنية حسب متطلبات المشروع.",
    pricingType: "quote",
    price: null,
    unit: null,
    minQty: null,
    fixedOptions: [],
    includes: [],
    excludes: [],
    duration: null,
    requiresReview: true,
    sortOrder: 6,
  },
  {
    id: "metal-canopy",
    category: "metal",
    name: "مظلات مواقف",
    description: "تركيب مظلات مواقف سيارات بهياكل معدنية.",
    pricingType: "direct",
    price: 550,
    unit: "م²",
    minQty: 9,
    fixedOptions: [],
    includes: [],
    excludes: [],
    duration: null,
    requiresReview: true,
    sortOrder: 7,
  },

  // أعمال التشطيب
  {
    id: "finishing-gypsum",
    category: "finishing",
    name: "جبس بورد",
    description: "تنفيذ أسقف وقواطع الجبس بورد.",
    pricingType: "direct",
    price: 45,
    unit: "م²",
    minQty: null,
    fixedOptions: [],
    includes: [],
    excludes: [],
    duration: null,
    requiresReview: true,
    sortOrder: 1,
  },
  {
    id: "finishing-paint-interior",
    category: "finishing",
    name: "دهان داخلي",
    description: "أعمال دهان الجدران والأسقف الداخلية.",
    pricingType: "direct",
    price: 18,
    unit: "م²",
    minQty: null,
    fixedOptions: [],
    includes: [],
    excludes: [],
    duration: null,
    requiresReview: true,
    sortOrder: 2,
  },
  {
    id: "finishing-paint-exterior",
    category: "finishing",
    name: "دهان خارجي",
    description: "أعمال دهان الواجهات والأسطح الخارجية.",
    pricingType: "direct",
    price: 25,
    unit: "م²",
    minQty: null,
    fixedOptions: [],
    includes: [],
    excludes: [],
    duration: null,
    requiresReview: true,
    sortOrder: 3,
  },
  {
    id: "finishing-plastering",
    category: "finishing",
    name: "لياسة",
    description: "أعمال لياسة الجدران والأسقف.",
    pricingType: "direct",
    price: 30,
    unit: "م²",
    minQty: null,
    fixedOptions: [],
    includes: [],
    excludes: [],
    duration: null,
    requiresReview: true,
    sortOrder: 4,
  },
  {
    id: "finishing-flooring",
    category: "finishing",
    name: "أرضيات",
    description: "توريد وتركيب أرضيات بأنواعها.",
    pricingType: "direct",
    price: 60,
    unit: "م²",
    minQty: null,
    fixedOptions: [],
    includes: [],
    excludes: [],
    duration: null,
    requiresReview: true,
    sortOrder: 5,
  },
  {
    id: "finishing-epoxy",
    category: "finishing",
    name: "إيبوكسي",
    description: "تنفيذ أرضيات الإيبوكسي.",
    pricingType: "direct",
    price: 45,
    unit: "م²",
    minQty: null,
    fixedOptions: [],
    includes: [],
    excludes: [],
    duration: null,
    requiresReview: true,
    sortOrder: 6,
  },

  // أعمال العظم
  {
    id: "shell-concrete",
    category: "shell",
    name: "خرسانة",
    description: "أعمال الخرسانة المسلحة للمشروع.",
    pricingType: "direct",
    price: 280,
    unit: "م³",
    minQty: null,
    fixedOptions: [],
    includes: [],
    excludes: [],
    duration: null,
    requiresReview: true,
    sortOrder: 1,
  },
  {
    id: "shell-ground-slab",
    category: "shell",
    name: "صبة أرضية",
    description: "تنفيذ الصبة الأرضية للمشروع.",
    pricingType: "direct",
    price: 35,
    unit: "م²",
    minQty: null,
    fixedOptions: [],
    includes: [],
    excludes: [],
    duration: null,
    requiresReview: true,
    sortOrder: 2,
  },
  {
    id: "shell-block",
    category: "shell",
    name: "بلوك",
    description: "أعمال البناء بالبلوك.",
    pricingType: "direct",
    price: 40,
    unit: "م²",
    minQty: null,
    fixedOptions: [],
    includes: [],
    excludes: [],
    duration: null,
    requiresReview: true,
    sortOrder: 3,
  },
  {
    id: "shell-foundations",
    category: "shell",
    name: "قواعد",
    description: "تنفيذ قواعد الأساسات الخرسانية حسب التصميم الإنشائي.",
    pricingType: "quote",
    price: null,
    unit: null,
    minQty: null,
    fixedOptions: [],
    includes: [],
    excludes: [],
    duration: null,
    requiresReview: true,
    sortOrder: 4,
  },
  {
    id: "shell-annex",
    category: "shell",
    name: "ملاحق",
    description: "تنفيذ ملاحق ومباني إضافية حسب متطلبات المشروع.",
    pricingType: "quote",
    price: null,
    unit: null,
    minQty: null,
    fixedOptions: [],
    includes: [],
    excludes: [],
    duration: null,
    requiresReview: true,
    sortOrder: 5,
  },
];

const SECTORS = [
  {
    id: "metal",
    number: "01",
    title: "الأعمال المعدنية",
    items: [
      "الهياكل المعدنية",
      "الهناجر والمستودعات",
      "الساندوتش بانل",
      "المظلات المعدنية",
      "السلالم والمنصات المعدنية",
      "الأعمال المعدنية المساندة",
    ],
  },
  {
    id: "construction",
    number: "02",
    title: "المقاولات الإنشائية",
    items: [
      "الأعمال الخرسانية",
      "أعمال المباني",
      "الترميم والتأهيل",
      "إدارة وتنفيذ الأعمال الإنشائية",
    ],
  },
  {
    id: "finishing",
    number: "03",
    title: "أعمال التشطيب",
    items: [
      "التشطيبات الداخلية",
      "التشطيبات الخارجية",
      "تشطيب المكاتب والمعارض",
      "الدهانات",
      "الأرضيات",
      "الأسقف",
      "القواطع والأعمال التكميلية",
    ],
  },
];

const METHODOLOGY_STEPS = [
  {
    number: "01",
    title: "التواصل ودراسة المتطلبات",
    description: "استقبال طلب العميل وفهم نطاق العمل والاحتياجات الأساسية للمشروع.",
  },
  {
    number: "02",
    title: "المعاينة والدراسة الفنية",
    description: "معاينة الموقع وتحديد المتطلبات الفنية واللوجستية اللازمة للتنفيذ.",
  },
  {
    number: "03",
    title: "التخطيط والتنسيق",
    description: "وضع خطة تنفيذ واضحة تشمل الجدول الزمني والموارد والتنسيق بين الأعمال المختلفة.",
  },
  {
    number: "04",
    title: "التنفيذ الميداني",
    description: "تنفيذ الأعمال في الموقع وفق الخطة المعتمدة ومتابعة سير العمل أولاً بأول.",
  },
  {
    number: "05",
    title: "الجودة والتفتيش",
    description: "مراجعة الأعمال المنفذة والتأكد من مطابقتها للمواصفات الفنية المعتمدة.",
  },
  {
    number: "06",
    title: "التسليم والمتابعة",
    description: "تسليم العمل للعميل والمتابعة بعد التسليم عند الحاجة.",
  },
];

const WORKSHOP_IMAGES = [
  { id: 1, image: "/projects/steeling-02.png", caption: "قص وتشكيل الحديد" },
  { id: 2, image: "/projects/steeling-01.jpeg", caption: "أعمال اللحام" },
  { id: 3, image: "/projects/steeling-03.png", caption: "تجهيز ومعالجة السطح" },
  { id: 4, image: "/projects/steeling-015.png", caption: "الطلاء والدهان" },
  { id: 5, image: "/projects/steeling-04.png", caption: "التحميل والنقل" },
  { id: 6, image: "/projects/steeling-06.jpeg", caption: "خارج الورشة" },
];

const PROJECT_TEXT = [
  {
    title: "مشاريعنا في الأعمال الخرسانية",
    slug: "concrete-works-riyadh",
    location: "الرياض، المملكة العربية السعودية",
    category: "مقاولات إنشائية",
    description: "من مشاريع الشركة في تنفيذ الأعمال الإنشائية والخرسانية.",
  },
  {
    title: "مشاريعنا في أعمال التشطيبات",
    slug: "finishing-riyadh",
    location: "الرياض، المملكة العربية السعودية",
    category: "أعمال التشطيب",
    description: "من مشاريع الشركة في تنفيذ أعمال التشطيبات الداخلية والخارجية.",
  },
  {
    title: "مشاريعنا في الهناجر والمستودعات",
    slug: "hanjar-riyadh",
    location: "الرياض، المملكة العربية السعودية",
    category: "الأعمال المعدنية",
    description: "من مشاريع الشركة في تنفيذ الهياكل المعدنية للهناجر والمستودعات.",
  },
  {
    title: "مشاريعنا في أعمال الساندوتش بانل",
    slug: "sandwich-panel-riyadh",
    location: "الرياض، المملكة العربية السعودية",
    category: "الأعمال المعدنية",
    description: "من مشاريع الشركة في تركيب ألواح الساندوتش بانل.",
  },
  {
    title: "مشاريعنا في الأعمال الخشبية",
    slug: "Woodwork",
    location: "الرياض، المملكة العربية السعودية",
    category: "أعمال التشطيب",
    description: "من مشاريع الشركة في تنفيذ الأعمال الخشبية والتكميلية.",
  },
];

const WHY_AJIAL = [
  {
    title: "نطاق أعمال متكامل",
    description: "تغطية قطاعات الأعمال المعدنية والمقاولات الإنشائية وأعمال التشطيب تحت مظلة واحدة.",
  },
  {
    title: "منهجية عمل واضحة",
    description: "خطوات محددة من دراسة المتطلبات وحتى التسليم والمتابعة.",
  },
  {
    title: "فريق فني متخصص",
    description: "كوادر فنية لكل قطاع من قطاعات العمل بما يخدم طبيعة كل مشروع.",
  },
  {
    title: "الالتزام بمعايير الجودة والسلامة",
    description: "متابعة تنفيذ الأعمال وفق المواصفات الفنية المعتمدة في كل مرحلة.",
  },
];

const CREDENTIALS = [
  { label: "السجل التجاري", value: "1009069810" },
  { label: "الرقم الوطني الموحد", value: "7040974326" },
  { label: "الرقم الضريبي", value: "312397372600003" },
  { label: "عضوية الهيئة السعودية للمقاولين", value: "638863880" },
];

function Header({ onNavigate, onOpenServices }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return undefined;

    const updateHeaderHeight = () => {
      document.documentElement.style.setProperty("--header-h", `${el.offsetHeight}px`);
    };

    updateHeaderHeight();
    const observer = new ResizeObserver(updateHeaderHeight);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleBrandClick = () => {
    setMenuOpen(false);
    if (onNavigate) onNavigate();
  };

  const handleLinkClick = (link) => (event) => {
    setMenuOpen(false);
    if (link.action === "services") {
      event.preventDefault();
      if (onOpenServices) onOpenServices();
    } else if (!link.cta && onNavigate) {
      onNavigate();
    }
  };

  return (
    <header className="site-header" ref={headerRef}>
      <div className="top-bar">
        <div className="container top-bar-inner">
          <div className="top-bar-info">
            <a href="tel:+966555095652" dir="ltr">+966 55 509 5652</a>
            <span className="top-bar-divider" />
            <a href="mailto:info@ajialinvestments.com">info@ajialinvestments.com</a>
          </div>
          <span className="top-bar-location">الرياض، المملكة العربية السعودية</span>
        </div>
      </div>

      <div className="container header-inner">
        <a href="#home" className="brand" onClick={handleBrandClick}>
          <img src="/logo.png" alt="شعار أجيال المتطورة للاستثمار" className="brand-logo" />
          <span className="brand-text">
            <span className="brand-name">أجيال المتطورة للاستثمار</span>
            <span className="brand-tagline">General Contracting</span>
          </span>
        </a>

        <button
          className="menu-toggle"
          aria-label="فتح القائمة"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`main-nav ${menuOpen ? "open" : ""}`}>
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.id} className={link.cta ? "nav-cta-item" : undefined}>
                <a
                  href={link.href}
                  onClick={handleLinkClick(link)}
                  className={link.cta ? "nav-cta-link" : undefined}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="hero">
      <div className="container hero-content">
        <p className="hero-eyebrow">شركة أجيال المتطورة للاستثمار — مقاولات عامة، الرياض</p>
        <h1>
          نبني <span className="hero-highlight">أجيالاً</span>
        </h1>
        <p className="hero-text">
          مقاولات وأعمال إنشائية، هياكل معدنية، وتشطيبات — تُنفّذ بدقة وتُسلّم بثقة.
        </p>
        <div className="hero-actions">
          <a
            href={buildWhatsAppLink("مرحباً، أرغب بالبدء بمشروع جديد مع أجيال المتطورة للاستثمار.")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-accent"
          >
            ابدأ مشروعك
          </a>
          <a href="#projects" className="btn btn-outline-light">شاهد أعمالنا</a>
        </div>
        <ul className="hero-sector-tags">
          <li>مقاولات عامة</li>
          <li>أعمال إنشائية</li>
          <li>تشطيبات</li>
          <li>الأعمال المعدنية</li>
        </ul>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="section about">
      <div className="container about-grid">
        <Reveal className="about-text">
          <div className="section-heading section-heading-start">
            <span className="section-label">من نحن</span>
            <h2>شركة أجيال المتطورة للاستثمار</h2>
          </div>
          <p>
            شركة أجيال المتطورة للاستثمار شركة مقاولات عامة مقرها الرياض،
            المملكة العربية السعودية. تعمل الشركة على تنفيذ الأعمال المعدنية
            والمقاولات الإنشائية وأعمال التشطيب ضمن نطاق عمل متكامل يخدم
            متطلبات المشاريع المختلفة.
          </p>
          <p>
            تعتمد الشركة على منهجية عمل واضحة تبدأ من دراسة متطلبات المشروع
            وتنتهي بالتسليم والمتابعة، بهدف تنفيذ الأعمال وفق المواصفات
            الفنية المعتمدة.
          </p>
        </Reveal>

        <Reveal className="about-facts" delay={120}>
          <div className="about-fact">
            <span className="about-fact-label">المقر الرئيسي</span>
            <span className="about-fact-value">الرياض، المملكة العربية السعودية</span>
          </div>
          <div className="about-fact">
            <span className="about-fact-label">النشاط</span>
            <span className="about-fact-value">مقاولات عامة</span>
          </div>
          <div className="about-fact">
            <span className="about-fact-label">نطاق العمل</span>
            <span className="about-fact-value">أعمال معدنية، مقاولات إنشائية، تشطيبات</span>
            <a
              href="https://drive.google.com/file/d/1556BhTPDLIRQ-aZU7fZTDMC7W69pXKdr/view?usp=drivesdk"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-accent about-profile-btn"
            >
              تحميل بروفايل الشركة
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Sectors() {
  return (
    <section id="sectors" className="section sectors">
      <div className="container">
        <div className="section-heading">
          <span className="section-label">قطاعات الأعمال</span>
          <h2>مجالات عمل متكاملة</h2>
        </div>
        <div className="sectors-grid">
          {SECTORS.map((sector, index) => (
            <Reveal key={sector.id} className="sector-card" delay={index * 100}>
              <span className="sector-number">{sector.number}</span>
              <h3>{sector.title}</h3>
              <ul>
                {sector.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Workshop() {
  const [active, setActive] = useState(0);
  const total = WORKSHOP_IMAGES.length;
  const touchStartX = useRef(null);

  const go = (dir) => {
    setActive((prev) => (prev + dir + total) % total);
  };

  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(diff) > 40) {
      // RTL: swipe left (negative) => next
      go(diff < 0 ? 1 : -1);
    }
    touchStartX.current = null;
  };

  return (
    <section id="workshop" className="section workshop">
      <div className="container">
        <div className="section-heading section-heading-light">
          <span className="section-label">أعمال الحديد في ورشتنا</span>
          <h2>ورشة الحديد - الرياض</h2>
        </div>
        <p className="workshop-intro">
          ننفّذ مراحل تصنيع وتجهيز الحديد داخل ورشتنا بالرياض، من القص واللحام
          حتى المعالجة والطلاء والتحميل.
        </p>

        <div
          className="workshop-carousel"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <button
            type="button"
            className="workshop-arrow workshop-arrow-right"
            onClick={() => go(-1)}
            aria-label="السابق"
          >
            ›
          </button>

          <div className="workshop-stage">
            {WORKSHOP_IMAGES.map((item, index) => {
              let pos = index - active;
              if (pos > total / 2) pos -= total;
              if (pos < -total / 2) pos += total;
              const state =
                pos === 0 ? "center" : pos === 1 ? "left" : pos === -1 ? "right" : "hidden";
              return (
                <figure
                  key={item.id}
                  className={`workshop-slide workshop-slide-${state}`}
                  onClick={() => state !== "center" && setActive(index)}
                >
                  <img src={item.image} alt={item.caption} className="workshop-image" loading="lazy" />
                  {state === "center" && (
                    <figcaption className="workshop-caption">{item.caption}</figcaption>
                  )}
                </figure>
              );
            })}
          </div>

          <button
            type="button"
            className="workshop-arrow workshop-arrow-left"
            onClick={() => go(1)}
            aria-label="التالي"
          >
            ‹
          </button>
        </div>

        <div className="workshop-dots">
          {WORKSHOP_IMAGES.map((item, index) => (
            <button
              key={item.id}
              type="button"
              className={`workshop-dot ${index === active ? "active" : ""}`}
              onClick={() => setActive(index)}
              aria-label={`صورة ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Methodology() {
  return (
    <section id="methodology" className="section methodology">
      <div className="container">
        <div className="section-heading">
          <span className="section-label">منهجية العمل</span>
          <h2>من الدراسة إلى التسليم</h2>
        </div>
        <div className="methodology-grid">
          {METHODOLOGY_STEPS.map((step, index) => (
            <Reveal key={step.number} className="methodology-card" delay={(index % 3) * 100}>
              <span className="methodology-number">{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects({ manifest, onSelectProject }) {
  const projects = manifest.map((entry) => {
    const text = PROJECT_TEXT.find((item) => item.slug === entry.slug) || {};
    return {
      slug: entry.slug,
      coverImage: entry.coverImage,
      title: text.title || entry.slug,
      category: text.category || "",
      description: text.description || "",
      location: text.location || "الرياض، المملكة العربية السعودية",
    };
  });

  return (
    <section id="projects" className="section projects">
      <div className="container">
        <div className="section-heading">
          <span className="section-label">معرض المشاريع</span>
          <h2>مشاريع الشركة</h2>
        </div>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <Reveal key={project.slug} className="project-card" delay={index * 100}>
              <button
                type="button"
                className="project-card-trigger"
                onClick={() => onSelectProject(project.slug)}
              >
                <div className="project-image-frame">
                  <img src={project.coverImage} alt={project.title} className="project-image" loading="lazy" />
                  {project.category && <span className="project-category">{project.category}</span>}
                </div>
                <div className="project-body">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-meta">
                    <span>الموقع: {project.location}</span>
                  </div>
                  <span className="project-view-more">عرض التفاصيل</span>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectDetails({ project, onBack }) {
  const text = PROJECT_TEXT.find((item) => item.slug === project.slug) || {};

  return (
    <main className="section project-details">
      <div className="container">
        <button type="button" className="project-back-link" onClick={onBack}>
          العودة إلى معرض المشاريع
        </button>
        <div className="section-heading section-heading-start">
          {text.category && <span className="section-label">{text.category}</span>}
          <h2>{text.title || project.slug}</h2>
        </div>
        {text.description && <p className="project-details-description">{text.description}</p>}
        {text.location && <p className="project-details-location">الموقع: {text.location}</p>}
        <div className="project-details-grid">
          {project.images.map((src, index) => (
            <div className="project-details-image-frame" key={src}>
              <img
                src={src}
                alt={`${text.title || project.slug} ${index + 1}`}
                className="project-details-image"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

function ServiceCard({ service, index = 0, onAddToCart, onRequestQuote }) {
  const [qty, setQty] = useState(service.minQty || 1);
  const [selectedOptionId, setSelectedOptionId] = useState(
    service.fixedOptions && service.fixedOptions.length > 0 ? service.fixedOptions[0].id : null
  );
  const [optionQty, setOptionQty] = useState(1);

  const selectedOption = service.fixedOptions?.find((option) => option.id === selectedOptionId);
  const effectiveQty = service.minQty ? Math.max(qty, service.minQty) : qty;
  const directTotal = service.pricingType === "direct" ? service.price * effectiveQty : 0;
  const fixedTotal = service.pricingType === "fixed" && selectedOption ? selectedOption.price * optionQty : 0;

  const handleAdd = () => {
    if (service.pricingType === "direct") {
      onAddToCart({
        mergeKey: service.id,
        name: service.name,
        qty: effectiveQty,
        unit: service.unit,
        unitPrice: service.price,
        total: directTotal,
      });
    } else if (service.pricingType === "fixed" && selectedOption) {
      onAddToCart({
        mergeKey: `${service.id}:${selectedOption.id}`,
        name: `${service.name} - ${selectedOption.label}`,
        qty: optionQty,
        unit: service.unit,
        unitPrice: selectedOption.price,
        total: fixedTotal,
      });
    }
  };

  return (
    <div className="service-card" style={{ animationDelay: `${(index % 6) * 70}ms` }}>
      <h3>{service.name}</h3>
      {service.description && <p className="service-description">{service.description}</p>}

      {service.pricingType === "quote" && (
        <div className="service-calc">
          <span className="service-quote-badge">يحتاج عرض سعر</span>
          <button
            type="button"
            className="btn btn-outline service-action-btn"
            onClick={() => onRequestQuote(service)}
          >
            اطلب عرض سعر عبر واتساب
          </button>
        </div>
      )}

      {service.pricingType === "direct" && (
        <div className="service-calc">
          <div className="service-price-row">
            <span className="service-price">
              {service.price.toLocaleString()} ريال / {formatUnit(service.unit)}
            </span>
            {service.minQty && (
              <span className="service-min">
                الحد الأدنى {service.minQty} {formatUnit(service.unit)}
              </span>
            )}
          </div>
          <label className="service-qty-label">
            <span className="service-qty-caption">الكمية ({formatUnit(service.unit)})</span>
            <input
              type="number"
              min={service.minQty || 1}
              step="0.5"
              value={qty}
              onChange={(event) => setQty(Number(event.target.value) || 0)}
              className="service-qty-input"
            />
          </label>
          <div className="service-total">الإجمالي: {directTotal.toLocaleString()} ريال</div>
          <button type="button" className="btn btn-primary service-action-btn" onClick={handleAdd}>
            أضف للسلة
          </button>
        </div>
      )}

      {service.pricingType === "fixed" && (
        <div className="service-calc">
          <div className="service-options">
            {service.fixedOptions.map((option) => (
              <label key={option.id} className="service-option">
                <input
                  type="radio"
                  name={`${service.id}-option`}
                  checked={selectedOptionId === option.id}
                  onChange={() => setSelectedOptionId(option.id)}
                />
                <span className="service-option-label">{option.label}</span>
                <span className="service-option-price">{option.price.toLocaleString()} ريال</span>
              </label>
            ))}
          </div>
          <label className="service-qty-label">
            الكمية
            <input
              type="number"
              min="1"
              value={optionQty}
              onChange={(event) => setOptionQty(Number(event.target.value) || 1)}
              className="service-qty-input"
            />
          </label>
          <div className="service-total">الإجمالي: {fixedTotal.toLocaleString()} ريال</div>
          <button type="button" className="btn btn-primary service-action-btn" onClick={handleAdd}>
            أضف للسلة
          </button>
        </div>
      )}
    </div>
  );
}

function ServicesCatalog() {
  const [activeCategory, setActiveCategory] = useState("metal");
  const [cart, setCart] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [orderNotes, setOrderNotes] = useState("");
  const [customProjectDetails, setCustomProjectDetails] = useState("");
  const [showCartToast, setShowCartToast] = useState(false);
  const cartToastTimeoutRef = useRef(null);
  const cartRef = useRef(null);

  useEffect(() => {
    return () => {
      if (cartToastTimeoutRef.current) clearTimeout(cartToastTimeoutRef.current);
    };
  }, []);

  const categoryServices = SERVICES.filter((service) => service.category === activeCategory).sort(
    (a, b) => a.sortOrder - b.sortOrder
  );

  const showAddedToCartToast = () => {
    setShowCartToast(true);
    if (cartToastTimeoutRef.current) clearTimeout(cartToastTimeoutRef.current);
    cartToastTimeoutRef.current = setTimeout(() => setShowCartToast(false), 4000);
  };

  const scrollToCart = () => {
    cartRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const addToCart = (item) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex((line) => line.mergeKey === item.mergeKey);
      if (existingIndex === -1) return [...prev, item];
      const updated = [...prev];
      const existing = updated[existingIndex];
      const qty = existing.qty + item.qty;
      updated[existingIndex] = { ...existing, qty, total: existing.unitPrice * qty };
      return updated;
    });
    showAddedToCartToast();
  };
  const removeFromCart = (mergeKey) =>
    setCart((prev) => prev.filter((item) => item.mergeKey !== mergeKey));
  const cartTotal = cart.reduce((sum, item) => sum + item.total, 0);
  const canSubmitCart = customerName.trim() !== "" && customerPhone.trim() !== "";

  const requestServiceQuote = (service) => {
    const message = [
      "مرحباً، أرغب بطلب عرض سعر للخدمة التالية:",
      `الخدمة: ${service.name}`,
      `رابط الصفحة: ${window.location.href}`,
    ].join("\n");
    window.open(buildWhatsAppLink(message), "_blank", "noopener,noreferrer");
  };

  const sendCartOrder = () => {
    if (!canSubmitCart) return;
    const servicesList = cart
      .map((item) => `- ${item.name} (${item.qty} ${item.unit}) - ${item.total.toLocaleString()} ريال`)
      .join("\n");
    const quantitiesList = cart.map((item) => `${item.name}: ${item.qty} ${item.unit}`).join("، ");
    const message = [
      `اسم العميل: ${customerName || "-"}`,
      `رقم الجوال: ${customerPhone || "-"}`,
      "الخدمات المطلوبة:",
      servicesList,
      `الكميات: ${quantitiesList}`,
      `الإجمالي التقريبي: ${cartTotal.toLocaleString()} ريال (تقديري ويخضع لمراجعة أجيال)`,
      `ملاحظات: ${orderNotes || "-"}`,
      `رابط الصفحة: ${window.location.href}`,
    ].join("\n");
    window.open(buildWhatsAppLink(message), "_blank", "noopener,noreferrer");
  };

  const sendCustomProjectRequest = () => {
    const message = [
      "مرحباً، أرغب بطلب عرض سعر لمشروع خاص.",
      `اسم العميل: ${customerName || "-"}`,
      `رقم الجوال: ${customerPhone || "-"}`,
      `تفاصيل المشروع: ${customProjectDetails || "-"}`,
      `رابط الصفحة: ${window.location.href}`,
    ].join("\n");
    window.open(buildWhatsAppLink(message), "_blank", "noopener,noreferrer");
  };

  return (
    <main className="services-page">
      <div className="services-hero">
        <div className="container">
          <div className="section-heading section-heading-light">
            <span className="section-label">خدمات أجيال المسعّرة</span>
            <h2>كتالوج خدمات المقاولات</h2>
          </div>

          <p className="services-intro">
            شركة أجيال المتطورة للاستثمار شركة مقاولات عامة تعمل في الأعمال المعدنية،
            وأعمال العظم، وأعمال التشطيب. الأسعار أدناه مبدئية لتسهيل التواصل، ويمكن
            طلب عرض سعر مباشر عبر واتساب لأي خدمة.
          </p>
        </div>
      </div>

      <div className="section services-content">
        <div className="container">
          <div className="services-notice">
            <p>الأسعار تقديرية/مبدئية وتخضع لمراجعة أجيال قبل الاعتماد.</p>
            <p>الأسعار داخل الرياض فقط ما لم يُذكر غير ذلك.</p>
            <p>الأسعار لا تشمل الأعمال الإضافية غير المذكورة في الوصف.</p>
            <p>لا يوجد دفع إلكتروني حالياً، سيتم تأكيد الطلب عبر فريق أجيال.</p>
          </div>

          <div className="services-tabs">
            {SERVICE_CATEGORIES.map((category) => {
              const count = SERVICES.filter((service) => service.category === category.id).length;
              return (
                <button
                  key={category.id}
                  type="button"
                  className={`services-tab-btn ${activeCategory === category.id ? "active" : ""}`}
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.label}
                  {count > 0 && <span className="services-tab-count">{count}</span>}
                </button>
              );
            })}
          </div>

          {activeCategory === "custom" ? (
          <div className="custom-project-panel">
            <h3>طلب عرض مشروع خاص</h3>
            <p>
              إذا كان مشروعك لا يندرج ضمن الخدمات المذكورة، أرسل تفاصيله وسيتواصل
              معك فريق أجيال لتقديم عرض سعر مناسب.
            </p>
            <label className="services-form-label">
              اسم العميل
              <input
                type="text"
                value={customerName}
                onChange={(event) => setCustomerName(event.target.value)}
                className="services-form-input"
              />
            </label>
            <label className="services-form-label">
              رقم الجوال
              <input
                type="tel"
                value={customerPhone}
                onChange={(event) => setCustomerPhone(event.target.value)}
                className="services-form-input"
              />
            </label>
            <label className="services-form-label">
              تفاصيل المشروع
              <textarea
                value={customProjectDetails}
                onChange={(event) => setCustomProjectDetails(event.target.value)}
                className="services-form-textarea"
                rows={4}
              />
            </label>
            <button type="button" className="btn btn-primary" onClick={sendCustomProjectRequest}>
              إرسال الطلب عبر واتساب
            </button>
          </div>
        ) : (
          <div className="services-grid">
            {categoryServices.map((service, index) => (
              <ServiceCard
                key={service.id}
                service={service}
                index={index}
                onAddToCart={addToCart}
                onRequestQuote={requestServiceQuote}
              />
            ))}
          </div>
        )}

        <div className="cart-panel" ref={cartRef}>
          <h3>سلة الطلبات</h3>
          {cart.length === 0 ? (
            <p className="cart-empty">لا توجد بنود مضافة بعد.</p>
          ) : (
            <>
              <div className="cart-items">
                {cart.map((item) => (
                  <div className="cart-item" key={item.mergeKey}>
                    <div className="cart-item-info">
                      <span className="cart-item-name">{item.name}</span>
                      <span className="cart-item-detail">
                        {item.qty} {formatUnit(item.unit)}
                      </span>
                    </div>
                    <span className="cart-item-total">{item.total.toLocaleString()} ريال</span>
                    <button
                      type="button"
                      className="cart-item-remove"
                      onClick={() => removeFromCart(item.mergeKey)}
                      aria-label="إزالة البند"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              <div className="cart-total-row">
                <span>الإجمالي التقريبي</span>
                <span>{cartTotal.toLocaleString()} ريال</span>
              </div>
              <label className="services-form-label">
                اسم العميل
                <input
                  type="text"
                  value={customerName}
                  onChange={(event) => setCustomerName(event.target.value)}
                  className="services-form-input"
                />
              </label>
              <label className="services-form-label">
                رقم الجوال
                <input
                  type="tel"
                  value={customerPhone}
                  onChange={(event) => setCustomerPhone(event.target.value)}
                  className="services-form-input"
                />
              </label>
              <label className="services-form-label">
                ملاحظات
                <textarea
                  value={orderNotes}
                  onChange={(event) => setOrderNotes(event.target.value)}
                  className="services-form-textarea"
                  rows={3}
                />
              </label>
              <p className="cart-form-hint">الاسم ورقم الجوال مطلوبان لإرسال الطلب.</p>
              <button
                type="button"
                className="btn btn-accent cart-submit-btn"
                onClick={sendCartOrder}
                disabled={!canSubmitCart}
              >
                إرسال الطلب عبر واتساب
              </button>
            </>
          )}
        </div>
        </div>
      </div>

      <div className={`cart-toast ${showCartToast ? "show" : ""}`} role="status" aria-live="polite">
        <span>تمت إضافة الطلب إلى السلة</span>
        <button type="button" className="cart-toast-button" onClick={scrollToCart}>
          عرض السلة
        </button>
      </div>
    </main>
  );
}

function WhyAjial() {
  const cardRef = useRef(null);
  const [started, setStarted] = useState(false);
  const [revealed, setRevealed] = useState(0); // number of items fully shown
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return undefined;
    if (revealed >= WHY_AJIAL.length) return undefined;
    setLoading(true);
    const spin = setTimeout(() => {
      setLoading(false);
      setRevealed((n) => n + 1);
    }, 650);
    return () => clearTimeout(spin);
  }, [started, revealed]);

  return (
    <section id="why" className="section why-ajial">
      <div className="container">
        <div className="section-heading">
          <span className="section-label">لماذا أجيال</span>
          <h2>أسباب الثقة في التعامل معنا</h2>
        </div>
        <div className="why-card-single" ref={cardRef}>
          <ul className="why-list">
            {WHY_AJIAL.map((reason, index) => (
              <li
                key={reason.title}
                className={`why-list-item ${index < revealed ? "shown" : ""}`}
              >
                <span className="why-check" aria-hidden="true">✓</span>
                <span className="why-list-title">{reason.title}</span>
              </li>
            ))}
          </ul>
          {loading && revealed < WHY_AJIAL.length && (
            <div className="why-loader" aria-hidden="true">
              <span className="why-spinner" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Credentials() {
  return (
    <section id="credentials" className="section credentials">
      <div className="container">
        <div className="section-heading">
          <span className="section-label">التوثيق الرسمي</span>
          <h2>بيانات الشركة النظامية</h2>
        </div>
        <div className="credentials-grid">
          {CREDENTIALS.map((item, index) => (
            <Reveal key={item.label} className="credential-card" delay={(index % 2) * 100}>
              <span className="credential-label">{item.label}</span>
              <span className="credential-value" dir="ltr">{item.value}</span>
            </Reveal>
          ))}
        </div>
        <p className="credentials-note">جميع البيانات قابلة للتحقق عبر الجهات الرسمية.</p>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="section contact">
      <div className="container">
        <div className="section-heading">
          <span className="section-label">تواصل معنا</span>
          <h2>ابدأ التواصل مع فريقنا</h2>
        </div>
        <Reveal className="contact-panel">
          <div className="contact-info">
            <div className="contact-item">
              <span className="contact-label">الهاتف / واتساب</span>
              <a href="tel:+966555095652" dir="ltr">+966 55 509 5652</a>
            </div>
            <div className="contact-item">
              <span className="contact-label">البريد الإلكتروني</span>
              <a href="mailto:info@ajialinvestments.com">info@ajialinvestments.com</a>
            </div>
            <div className="contact-item">
              <span className="contact-label">الموقع</span>
              <span>الرياض، المملكة العربية السعودية</span>
            </div>
          </div>
          <div className="contact-actions">
            <a
              href="https://wa.me/966555095652"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              تواصل عبر واتساب
            </a>
            <a href="mailto:info@ajialinvestments.com" className="btn btn-outline">
              راسلنا عبر البريد الإلكتروني
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function AppTeaser() {
  return (
    <section id="app" className="section app-teaser">
      <Reveal className="container app-teaser-inner">
        <div className="section-heading section-heading-light">
          <span className="section-label">تطبيق أجيال</span>
          <h2>تطبيق خاص بشركة أجيال المتطورة للاستثمار</h2>
        </div>
        <p className="app-teaser-text">
          نعمل حالياً على تطوير تطبيق خاص بالشركة لتسهيل التواصل ومتابعة الخدمات.
          سيتم الإعلان عن تفاصيله لاحقاً.
        </p>
        <a href="/app" className="btn btn-accent">الدخول إلى التطبيق</a>
      </Reveal>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="section final-cta">
      <div className="container">
        <Reveal className="final-cta-panel">
          <h2>مشروعك القادم يبدأ من معاينة واضحة</h2>
          <p className="final-cta-text">
            تواصل معنا وشاركنا فكرة مشروعك، ونرتب لك الخطوة الأولى بوضوح.
          </p>
          <a
            href={buildWhatsAppLink("مرحباً، أرغب بمشاركة فكرة مشروعي مع أجيال المتطورة للاستثمار.")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-accent"
          >
            تواصل واتساب
          </a>
        </Reveal>
      </div>
    </section>
  );
}

function Footer({ onNavigate, onOpenServices }) {
  const year = new Date().getFullYear();

  const handleLinkClick = (link) => (event) => {
    if (link.action === "services") {
      event.preventDefault();
      if (onOpenServices) onOpenServices();
    } else if (onNavigate) {
      onNavigate();
    }
  };

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-col footer-brand-col">
          <div className="footer-brand">
            <img src="/logo.png" alt="شعار أجيال المتطورة للاستثمار" className="footer-logo" loading="lazy" />
            <span className="footer-brand-name">أجيال المتطورة للاستثمار</span>
          </div>
          <p className="footer-desc">
            شركة مقاولات عامة تعمل في الأعمال المعدنية والمقاولات الإنشائية
            وأعمال التشطيب في الرياض، المملكة العربية السعودية.
          </p>
          <div className="footer-social">
            <a
              href="https://www.instagram.com/ajial.contracting/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="تابعنا على إنستغرام"
              className="footer-social-link"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a
              href="https://www.facebook.com/ajialinvestments"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="تابعنا على فيسبوك"
              className="footer-social-link"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            <a
              href="https://x.com/azez_adeeb_"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="تابعنا على إكس (تويتر)"
              className="footer-social-link"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
              </svg>
            </a>
          </div>

          <div className="footer-map">
            <iframe
              title="موقع أجيال المتطورة للاستثمار على الخريطة"
              src="https://www.google.com/maps?q=Yahya%20Ibn%20Abi%20Kathir%2C%20An%20Noor%2C%20Riyadh%2014321&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="footer-map-frame"
            ></iframe>
            <a
              href="https://maps.app.goo.gl/vtUjFHqQ4XKxsYAVA"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-map-link"
            >
              احصل على الاتجاهات
            </a>
          </div>
        </div>

        <div className="footer-col">
          <h4>روابط سريعة</h4>
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <a href={link.href} onClick={handleLinkClick(link)}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-col">
          <h4>قطاعات الأعمال</h4>
          <ul>
            {SECTORS.map((sector) => (
              <li key={sector.id}>
                <a href="#sectors">{sector.title}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-col">
          <h4>تواصل معنا</h4>
          <ul className="footer-contact-list">
            <li>
              <a href="tel:+966555095652" dir="ltr">+966 55 509 5652</a>
            </li>
            <li>
              <a href="mailto:info@ajialinvestments.com">info@ajialinvestments.com</a>
            </li>
            <li>الرياض، المملكة العربية السعودية</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p>© {year} شركة أجيال المتطورة للاستثمار. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
}

function getRouteFromLocation() {
  const params = new URLSearchParams(window.location.search);
  if (window.location.pathname === "/app" || params.get("view") === "services") {
    return { type: "services" };
  }
  const project = params.get("project");
  if (project) return { type: "project", slug: project };
  return { type: "home" };
}

export default function App() {
  const [manifest, setManifest] = useState([]);
  const [route, setRoute] = useState(getRouteFromLocation);

  useEffect(() => {
    fetch("/projects/manifest.json")
      .then((res) => res.json())
      .then(setManifest)
      .catch(() => setManifest([]));
  }, []);

  useEffect(() => {
    const onPopState = () => setRoute(getRouteFromLocation());
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const goHome = () => {
    if (route.type === "home") return;
    const url = new URL("/", window.location.origin);
    window.history.pushState({}, "", url);
    setRoute({ type: "home" });
    window.scrollTo(0, 0);
  };

  const openProject = (slug) => {
    const url = new URL("/", window.location.origin);
    url.searchParams.set("project", slug);
    window.history.pushState({}, "", url);
    setRoute({ type: "project", slug });
    window.scrollTo(0, 0);
  };

  const openServices = () => {
    const url = new URL("/", window.location.origin);
    url.searchParams.set("view", "services");
    window.history.pushState({}, "", url);
    setRoute({ type: "services" });
    window.scrollTo(0, 0);
  };

  const activeProject =
    route.type === "project" ? manifest.find((item) => item.slug === route.slug) : null;

  return (
    <>
      <Header onNavigate={goHome} onOpenServices={openServices} />
      {route.type === "project" && activeProject ? (
        <ProjectDetails project={activeProject} onBack={goHome} />
      ) : route.type === "services" ? (
        <ServicesCatalog />
      ) : (
        <main>
          <Hero />
          <About />
          <Sectors />
          <Workshop />
          <Methodology />
          <Projects manifest={manifest} onSelectProject={openProject} />
          <WhyAjial />
          <Credentials />
          <Contact />
          <AppTeaser />
          <FinalCta />
        </main>
      )}
      <Footer onNavigate={goHome} onOpenServices={openServices} />
    </>
  );
}
