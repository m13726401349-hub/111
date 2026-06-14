const pageName = document.body.dataset.page || "home";
const isEnglishPage = document.documentElement.lang.toLowerCase().startsWith("en");

const navItems = isEnglishPage
  ? [
      ["home", "Home", "index.html"],
      ["products", "Products", "products.html"],
      ["applications", "Applications", "index.html#applications"],
      ["blog", "Insights", "blog-en.html"],
      ["about", "About", "about.html"],
      ["contact", "Contact", "contact.html"],
    ]
  : [
      ["home", "首页", "index.html"],
      ["products", "产品中心", "products.html"],
      ["applications", "应用领域", "index.html#applications"],
      ["blog", "博客", "blog.html"],
      ["about", "关于瑞元", "about.html"],
      ["contact", "联系我们", "contact.html"],
    ];

const headerTarget = document.querySelector("[data-site-header]");
if (headerTarget) {
  headerTarget.innerHTML = `
    <header class="site-header">
      <div class="container header-inner">
        <a class="brand" href="index.html" aria-label="${isEnglishPage ? "RUIYUAN home" : "RUIYUAN 瑞元首页"}">
          <strong>RUIYUAN</strong><span>瑞元</span>
        </a>
        <nav class="main-nav" id="main-nav" aria-label="${isEnglishPage ? "Main navigation" : "主导航"}">
          ${navItems
            .map(
              ([key, label, href]) =>
                `<a class="${pageName === key ? "active" : ""}" href="${href}">${label}</a>`,
            )
            .join("")}
        </nav>
        <label class="language-switch" aria-label="${isEnglishPage ? "Select language" : "选择语言"}">
          <span>${isEnglishPage ? "Language" : "语言"}</span>
          <select data-language-switcher>
            <option value="zh-CN"${isEnglishPage ? "" : " selected"}>中文</option>
            <option value="en"${isEnglishPage ? " selected" : ""}>English</option>
            <option value="ko">한국어</option>
            <option value="ru">Русский</option>
          </select>
        </label>
        <a class="nav-cta" href="contact.html">${isEnglishPage ? "Get a Solution" : "获取产品方案"}</a>
        <button class="menu-toggle" aria-label="${isEnglishPage ? "Open navigation" : "打开导航"}" aria-controls="main-nav" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>`;
}

const languageSwitcher = document.querySelector("[data-language-switcher]");
if (languageSwitcher) {
  const pageFile = window.location.pathname.split("/").pop() || "index.html";
  const languagePairs = {
    "blog.html": { en: "blog-en.html" },
    "blog-en.html": { "zh-CN": "blog.html" },
    "blog-pa66-selection-guide.html": { en: "pa6-vs-pa66-material-selection-guide.html" },
    "pa6-vs-pa66-material-selection-guide.html": { "zh-CN": "blog-pa66-selection-guide.html" },
    "blog-flame-retardant-pa66.html": { en: "flame-retardant-pa66-electrical-connectors-guide.html" },
    "flame-retardant-pa66-electrical-connectors-guide.html": { "zh-CN": "blog-flame-retardant-pa66.html" },
    "blog-reinforced-pa66-molding.html": { en: "glass-filled-pa66-injection-molding-guide.html" },
    "glass-filled-pa66-injection-molding-guide.html": { "zh-CN": "blog-reinforced-pa66-molding.html" },
  };

  languageSwitcher.addEventListener("change", () => {
    const targetLanguage = languageSwitcher.value;

    const pairedPage = languagePairs[pageFile]?.[targetLanguage];
    if (pairedPage) {
      window.location.href = pairedPage;
      return;
    }

    if (
      (targetLanguage === "zh-CN" && !isEnglishPage) ||
      (targetLanguage === "en" && isEnglishPage)
    ) {
      return;
    }

    const publicUrl =
      window.location.protocol === "file:"
        ? `https://ruiyuan99.com/${pageFile}`
        : window.location.href;
    const translateUrl = new URL("https://translate.google.com/translate");
    translateUrl.searchParams.set("sl", "auto");
    translateUrl.searchParams.set("tl", targetLanguage);
    translateUrl.searchParams.set("u", publicUrl);
    window.location.href = translateUrl.toString();
  });
}

const footerTarget = document.querySelector("[data-site-footer]");
if (footerTarget) {
  const footerCopy = isEnglishPage
    ? {
        company: "Dongguan Ruiyuan Engineering Plastics Co., Ltd. focuses on PA66 engineering plastics and modified material solutions for industrial sourcing and manufacturing projects.",
        navigation: "Navigation",
        products: "Products",
        applications: "Applications",
        blog: "Insights",
        about: "About RUIYUAN",
        contact: "Contact Us",
        publicInfo: "Public Information",
        store: "RUIYUAN 1688 Store",
        storeTitle: "Visit the RUIYUAN 1688 store",
        address: "No. 680, Sutong 6th Road, Dajingjiu Plastics City, Changping Town, Dongguan, Guangdong, China",
        copyright: "© 2026 RUIYUAN Engineering Plastics",
        boundary: "Content is based on company-supplied information. Certifications and customer cases are not fabricated.",
      }
    : {
        company: "东莞市瑞元工程塑料有限公司，专注 PA66 工程塑料及改性材料方案，为制造企业提供材料选型、定制与项目支持。",
        navigation: "网站导航",
        products: "产品中心",
        applications: "应用领域",
        blog: "博客",
        about: "关于瑞元",
        contact: "联系我们",
        publicInfo: "公开信息",
        store: "1688 瑞元店铺",
        storeTitle: "访问瑞元 1688 店铺",
        address: "广东省东莞市常平镇大京九塑胶城塑通六路680",
        copyright: "© 2026 RUIYUAN 瑞元工程塑料",
        boundary: "页面内容依据企业建站信息表整理，未虚构认证与客户案例。",
      };
  footerTarget.innerHTML = `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <a class="brand" href="index.html"><strong>RUIYUAN</strong><span>瑞元</span></a>
            <p>${footerCopy.company}</p>
          </div>
          <div>
            <h2 class="footer-heading">${footerCopy.navigation}</h2>
            <div class="footer-links">
              <a href="products.html">${footerCopy.products}</a>
              <a href="index.html#applications">${footerCopy.applications}</a>
              <a href="${isEnglishPage ? "blog-en.html" : "blog.html"}">${footerCopy.blog}</a>
              <a href="about.html">${footerCopy.about}</a>
              <a href="contact.html">${footerCopy.contact}</a>
            </div>
          </div>
          <div>
            <h2 class="footer-heading">${footerCopy.publicInfo}</h2>
            <div class="footer-links">
              <span>东莞市瑞元工程塑料有限公司</span>
              <a href="https://ruiyuan99.com" rel="noopener" target="_blank">ruiyuan99.com</a>
              <a href="https://dgdongheng.1688.com/?spm=a261y.7663282.shopNavigation.2.510cbceeBHTkzu&amp;offerId=1057130753514&amp;td_page_id=PC-UNLOGIN-GYP-2025" rel="noopener" target="_blank" title="${footerCopy.storeTitle}">${footerCopy.store}</a>
              <span>${footerCopy.address}</span>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <span>${footerCopy.copyright}</span>
          <span>${footerCopy.boundary}</span>
        </div>
      </div>
    </footer>`;
}

if (document.body.dataset.article) {
  const modalCopy = isEnglishPage
    ? {
        close: "Close inquiry form",
        title: "Need a PA66 material recommendation for your project?",
        description: "Share the application, performance target, and expected volume. We will organize the material direction and next technical questions.",
        requirements: "Requirements",
        placeholder: "Application, performance target and estimated volume",
        consent: "I agree that this information may be processed to reply to my inquiry.",
      }
    : {
        close: "关闭询盘弹窗",
        title: "需要一份适合您项目的 PA66 选型建议？",
        description: "请留下基本信息和应用要求，我们会据此整理材料方向与下一步沟通重点。",
        requirements: "Requirements",
        placeholder: "Application, performance target and estimated volume",
        consent: "同意为回复询盘而处理以上信息。",
      };
  document.body.insertAdjacentHTML(
    "beforeend",
    `
      <div class="inquiry-modal" data-inquiry-modal aria-hidden="true">
        <button class="modal-backdrop" type="button" data-close-inquiry aria-label="${modalCopy.close}"></button>
        <section class="modal-dialog" role="dialog" aria-modal="true" aria-labelledby="inquiry-modal-title">
          <button class="modal-close" type="button" data-close-inquiry aria-label="${modalCopy.close}">×</button>
          <span class="modal-kicker">PROJECT INQUIRY</span>
          <h2 id="inquiry-modal-title">${modalCopy.title}</h2>
          <p>${modalCopy.description}</p>
          <form class="modal-form" data-b2b-inquiry data-endpoint="/api/inquiry" novalidate>
            <div class="field">
              <label for="modal-name">Name <span class="required-mark">*</span></label>
              <input id="modal-name" name="name" autocomplete="name" placeholder="Your name" required />
              <span class="field-error" data-error-for="name"></span>
            </div>
            <div class="field">
              <label for="modal-email">Email <span class="required-mark">*</span></label>
              <input id="modal-email" name="email" type="email" autocomplete="email" placeholder="name@company.com" required />
              <span class="field-error" data-error-for="email"></span>
            </div>
            <div class="field">
              <label for="modal-phone">Phone <span class="required-mark">*</span></label>
              <input id="modal-phone" name="phone" type="tel" autocomplete="tel" placeholder="+86 138 0000 0000" required />
              <span class="field-error" data-error-for="phone"></span>
            </div>
            <div class="field">
              <label for="modal-message">${modalCopy.requirements}</label>
              <textarea id="modal-message" name="message" maxlength="2000" placeholder="${modalCopy.placeholder}"></textarea>
            </div>
            <div class="honeypot" aria-hidden="true">
              <label for="modal-website">Website</label>
              <input id="modal-website" name="website" tabindex="-1" autocomplete="off" />
            </div>
            <label class="consent-row">
              <input type="checkbox" name="consent" required />
              <span>${modalCopy.consent} <strong>*</strong></span>
            </label>
            <span class="field-error consent-error" data-error-for="consent"></span>
            <input type="hidden" name="formStartedAt" value="" />
            <input type="hidden" name="product" value="PA66 blog inquiry" />
            <button class="btn form-submit" type="submit">
              <span data-submit-label>Send Your Requirements</span>
              <span class="submit-spinner" aria-hidden="true"></span>
            </button>
            <div class="form-status" role="status" aria-live="polite"></div>
          </form>
        </section>
      </div>
    `,
  );
}

const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");
if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const open = mainNav.classList.toggle("open");
    document.body.classList.toggle("menu-open", open);
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute(
      "aria-label",
      isEnglishPage
        ? open
          ? "Close navigation"
          : "Open navigation"
        : open
          ? "关闭导航"
          : "打开导航",
    );
  });

  mainNav.addEventListener("click", () => {
    mainNav.classList.remove("open");
    document.body.classList.remove("menu-open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
}

document.querySelectorAll(".faq-question").forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.closest(".faq-item");
    const open = item.classList.toggle("open");
    button.setAttribute("aria-expanded", String(open));
  });
});

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const internationalPhonePattern = /^\+?[0-9][0-9\s().-]{6,19}$/;
const inquiryMessages = isEnglishPage
  ? {
      name: "Please enter your name.",
      emailRequired: "Please enter your email.",
      emailInvalid: "Enter a valid business email, for example name@company.com.",
      phoneRequired: "Please enter your phone number.",
      phoneInvalid: "Enter a valid international phone number, for example +1 555 010 1000.",
      consent: "Please agree to the information-processing notice.",
      incomplete: "Complete the required fields marked with * and correct the highlighted entries.",
      submittingLabel: "Submitting",
      submittingStatus: "Securely submitting your inquiry. Please wait.",
      unavailable: "The inquiry endpoint is temporarily unavailable. Please try again later.",
      success: "Thank you. Our team will contact you about your requirements.",
      failure: "Submission failed. Check your connection or contact the website administrator.",
      defaultLabel: "Send Your Requirements",
    }
  : {
      name: "请填写姓名。",
      emailRequired: "请填写邮箱。",
      emailInvalid: "请输入有效的邮箱地址，例如 name@company.com。",
      phoneRequired: "请填写电话。",
      phoneInvalid: "请输入有效电话，并建议包含国际区号，例如 +86 138 0000 0000。",
      consent: "请勾选信息处理同意项。",
      incomplete: "请完成标有 * 的必填项，并修正红色提示后再提交。",
      submittingLabel: "正在提交",
      submittingStatus: "正在安全提交您的询盘，请稍候…",
      unavailable: "提交接口暂不可用，请稍后重试。",
      success: "提交成功。我们的业务团队会尽快与您联系。",
      failure: "提交失败，请检查网络或联系网站管理员。",
      defaultLabel: "提交询盘",
    };

function setFieldState(form, name, message = "") {
  const input = form.elements[name];
  const error = form.querySelector(`[data-error-for="${name}"]`);
  const field = input?.closest(".field");

  if (error) error.textContent = message;
  if (field) {
    field.classList.toggle("has-error", Boolean(message));
    field.classList.toggle(
      "has-valid",
      !message && Boolean(input?.value?.trim()),
    );
  }
}

function validateInquiryField(form, name) {
  const input = form.elements[name];
  const value = input?.value?.trim() || "";
  let message = "";

  if (name === "name" && !value) message = inquiryMessages.name;
  if (name === "email") {
    if (!value) message = inquiryMessages.emailRequired;
    else if (!emailPattern.test(value)) message = inquiryMessages.emailInvalid;
  }
  if (name === "phone") {
    if (!value) message = inquiryMessages.phoneRequired;
    else if (!internationalPhonePattern.test(value)) {
      message = inquiryMessages.phoneInvalid;
    }
  }
  if (name === "consent" && !input?.checked) message = inquiryMessages.consent;

  setFieldState(form, name, message);
  return !message;
}

document.querySelectorAll("[data-b2b-inquiry]").forEach((form) => {
  const startedAt = form.elements.formStartedAt;
  const messageInput = form.elements.message;
  const characterCount = form.querySelector("[data-character-count]");
  const submitButton = form.querySelector(".form-submit");
  const submitLabel = form.querySelector("[data-submit-label]");
  const status = form.querySelector(".form-status");
  const endpoint = form.dataset.endpoint || "/api/inquiry";
  const requiredFields = ["name", "email", "phone", "consent"];

  if (startedAt) startedAt.value = String(Date.now());

  const updateCharacterCount = () => {
    if (characterCount && messageInput) {
      characterCount.textContent = `${messageInput.value.length} / 2000`;
    }
  };
  updateCharacterCount();
  messageInput?.addEventListener("input", updateCharacterCount);

  [...form.elements].forEach((input) => {
    if (!input.name || input.type === "hidden") return;
    input.addEventListener("blur", () => {
      if (requiredFields.includes(input.name)) validateInquiryField(form, input.name);
    });
    input.addEventListener("input", () => {
      if (input.closest(".field")?.classList.contains("has-error")) {
        validateInquiryField(form, input.name);
      }
    });
    input.addEventListener("change", () => {
      if (input.name === "consent") validateInquiryField(form, "consent");
    });
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    status.className = "form-status";
    status.textContent = "";

    const valid = requiredFields.map((name) => validateInquiryField(form, name)).every(Boolean);
    if (!valid) {
      status.classList.add("is-error");
      status.textContent = inquiryMessages.incomplete;
      form.querySelector(".has-error input, .has-error select, .has-error textarea")?.focus();
      return;
    }

    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());
    payload.pageUrl = window.location.href;

    submitButton.disabled = true;
    submitButton.classList.add("is-loading");
    submitLabel.textContent = inquiryMessages.submittingLabel;
    status.classList.add("is-info");
    status.textContent = inquiryMessages.submittingStatus;

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.message || inquiryMessages.unavailable);
      }

      status.className = "form-status is-success";
      status.textContent = result.message || inquiryMessages.success;
      form.reset();
      if (startedAt) startedAt.value = String(Date.now());
      updateCharacterCount();
      form.querySelectorAll(".has-valid, .has-error").forEach((field) => {
        field.classList.remove("has-valid", "has-error");
      });
    } catch (error) {
      status.className = "form-status is-error";
      status.textContent = error.message || inquiryMessages.failure;
    } finally {
      submitButton.disabled = false;
      submitButton.classList.remove("is-loading");
      submitLabel.textContent = inquiryMessages.defaultLabel;
    }
  });
});

document.querySelectorAll("[data-inquiry-form]:not([data-b2b-inquiry])").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const status = form.querySelector(".form-status");
    const name = form.querySelector("[name='name']")?.value.trim();
    status.textContent = `${name ? `${name}，` : ""}需求信息已在本页完成校验。正式上线前请接入企业邮箱或 CRM 接口。`;
    form.reset();
  });
});

const inquiryModal = document.querySelector("[data-inquiry-modal]");
if (inquiryModal) {
  let modalOpenedAutomatically = false;
  const sessionKey = "ruiyuanArticleInquiryShown";

  const openInquiryModal = (automatic = false) => {
    inquiryModal.classList.add("open");
    inquiryModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    inquiryModal.querySelector("input[name='name']")?.focus();
    if (automatic) {
      modalOpenedAutomatically = true;
      sessionStorage.setItem(sessionKey, "1");
    }
  };

  const closeInquiryModal = () => {
    inquiryModal.classList.remove("open");
    inquiryModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
  };

  document.querySelectorAll("[data-open-inquiry]").forEach((button) => {
    button.addEventListener("click", () => openInquiryModal(false));
  });
  inquiryModal.querySelectorAll("[data-close-inquiry]").forEach((button) => {
    button.addEventListener("click", closeInquiryModal);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && inquiryModal.classList.contains("open")) closeInquiryModal();
  });

  const mayAutoOpen = () =>
    !modalOpenedAutomatically &&
    !sessionStorage.getItem(sessionKey) &&
    !inquiryModal.classList.contains("open");

  const scrollTrigger = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollable > 0 && window.scrollY / scrollable >= 0.4 && mayAutoOpen()) {
      openInquiryModal(true);
      window.removeEventListener("scroll", scrollTrigger);
    }
  };
  window.addEventListener("scroll", scrollTrigger, { passive: true });

  window.setTimeout(() => {
    if (mayAutoOpen()) openInquiryModal(true);
  }, 30000);

  document.addEventListener("mouseout", (event) => {
    if (
      event.clientY <= 0 &&
      !event.relatedTarget &&
      window.matchMedia("(pointer: fine)").matches &&
      mayAutoOpen()
    ) {
      openInquiryModal(true);
    }
  });
}

const filterButtons = document.querySelectorAll("[data-filter]");
const catalogCards = document.querySelectorAll("[data-category]");
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    catalogCards.forEach((card) => {
      card.hidden = filter !== "all" && card.dataset.category !== filter;
    });
  });
});

const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("visible"));
}
