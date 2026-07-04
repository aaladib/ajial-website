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
  { id: "why", label: "لماذا أجيال", href: "#why" },
  { id: "contact", label: "تواصل معنا", href: "#contact" },
  { id: "app", label: "تطبيق أجيال", href: "/app", cta: true },
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

const PROJECTS = [
  {
    id: 1,
    image: "/projects/steel-01.png",
    title: "أعمال معدنية",
    description: "من أعمال الشركة في تنفيذ الهياكل والتوصيلات المعدنية.",
    location: "الرياض، المملكة العربية السعودية",
  },
  {
    id: 2,
    image: "/projects/steel-02.png",
    title: "هناجر ومستودعات",
    description: "من أعمال الشركة في تنفيذ الهياكل المعدنية للهناجر والمستودعات.",
    location: "الرياض، المملكة العربية السعودية",
  },
  {
    id: 3,
    image: "/projects/sandwich-panel-01.jpeg",
    title: "ساندوتش بانل",
    description: "من أعمال الشركة في تركيب ألواح الساندوتش بانل.",
    location: "الرياض، المملكة العربية السعودية",
  },
  {
    id: 4,
    image: "/projects/construction-01.jpeg",
    title: "مقاولات إنشائية",
    description: "من أعمال الشركة في تنفيذ الأعمال الإنشائية والخرسانية.",
    location: "الرياض، المملكة العربية السعودية",
  },
  {
    id: 5,
    image: "/projects/construction-02.jpeg",
    title: "موقع تنفيذ",
    description: "من مواقع تنفيذ مشاريع الشركة.",
    location: "الرياض، المملكة العربية السعودية",
  },
  {
    id: 6,
    image: "/projects/construction-03.jpeg",
    title: "أعمال الموقع",
    description: "من سير الأعمال في أحد مواقع تنفيذ الشركة.",
    location: "الرياض، المملكة العربية السعودية",
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

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavClick = () => setMenuOpen(false);

  return (
    <header className="site-header">
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
        <a href="#home" className="brand" onClick={handleNavClick}>
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
              <li key={link.id}>
                <a
                  href={link.href}
                  onClick={handleNavClick}
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
        <p className="hero-eyebrow">مقاولات عامة | أعمال معدنية | مقاولات إنشائية | تشطيبات</p>
        <h1>شركة أجيال المتطورة للاستثمار</h1>
        <p className="hero-subtitle">
          مقاولات معدنية، وأعمال إنشائية، وتشطيبات — تحت مظلة عمل واحدة.
        </p>
        <p className="hero-text">
          شركة مقاولات عامة تعمل في قطاعات الأعمال المعدنية، والمقاولات الإنشائية،
          وأعمال التشطيب، وتقدم خدماتها في المملكة العربية السعودية.
        </p>
        <div className="hero-actions">
          <a href="/app" className="btn btn-accent">الدخول إلى التطبيق</a>
          <a href="#contact" className="btn btn-outline-light">تواصل معنا</a>
        </div>
        <ul className="hero-sector-tags">
          <li>الأعمال المعدنية</li>
          <li>المقاولات الإنشائية</li>
          <li>أعمال التشطيب</li>
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
        <div className="workshop-grid">
          {WORKSHOP_IMAGES.map((item, index) => (
            <Reveal key={item.id} className="workshop-item" delay={(index % 3) * 100}>
              <img src={item.image} alt={item.caption} className="workshop-image" loading="lazy" />
              <span className="workshop-caption">{item.caption}</span>
            </Reveal>
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

function Projects() {
  return (
    <section id="projects" className="section projects">
      <div className="container">
        <div className="section-heading">
          <span className="section-label">معرض المشاريع</span>
          <h2>نماذج بطاقات المشاريع</h2>
        </div>
        <div className="projects-grid">
          {PROJECTS.map((project, index) => (
            <Reveal key={project.id} className="project-card" delay={index * 100}>
              <div className="project-image-frame">
                <img src={project.image} alt={project.title} className="project-image" loading="lazy" />
              </div>
              <div className="project-body">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-meta">
                  <span>الموقع: {project.location}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyAjial() {
  return (
    <section id="why" className="section why-ajial">
      <div className="container">
        <div className="section-heading">
          <span className="section-label">لماذا أجيال</span>
          <h2>أسباب الثقة في التعامل معنا</h2>
        </div>
        <div className="why-grid">
          {WHY_AJIAL.map((reason, index) => (
            <Reveal key={reason.title} className="why-card" delay={(index % 2) * 100}>
              <span className="why-number">{String(index + 1).padStart(2, "0")}</span>
              <h3>{reason.title}</h3>
              <p>{reason.description}</p>
            </Reveal>
          ))}
        </div>
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

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-col footer-brand-col">
          <div className="footer-brand">
            <img src="/logo.png" alt="شعار أجيال المتطورة للاستثمار" className="footer-logo" />
            <span className="footer-brand-name">أجيال المتطورة للاستثمار</span>
          </div>
          <p className="footer-desc">
            شركة مقاولات عامة تعمل في الأعمال المعدنية والمقاولات الإنشائية
            وأعمال التشطيب في الرياض، المملكة العربية السعودية.
          </p>
        </div>

        <div className="footer-col">
          <h4>روابط سريعة</h4>
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <a href={link.href}>{link.label}</a>
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

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Sectors />
        <Workshop />
        <Methodology />
        <Projects />
        <WhyAjial />
        <Contact />
        <AppTeaser />
      </main>
      <Footer />
    </>
  );
}
