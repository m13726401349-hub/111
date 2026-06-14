const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_PATTERN = /^\+?[0-9][0-9\s().-]{6,19}$/;

function json(status, body) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}

function clean(value, max = 2000) {
  return String(value || "").trim().slice(0, max);
}

async function sendEmail(data, env) {
  if (!env.RESEND_API_KEY || !env.INQUIRY_TO_EMAIL) return false;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: env.INQUIRY_FROM_EMAIL || "Website Inquiry <onboarding@resend.dev>",
      to: [env.INQUIRY_TO_EMAIL],
      reply_to: data.email,
      subject: `[RUIYUAN 询盘] ${data.name}${data.company ? ` - ${data.company}` : ""}`,
      text: [
        `姓名：${data.name}`,
        `邮箱：${data.email}`,
        `电话：${data.phone}`,
        `公司：${data.company || "未填写"}`,
        `国家/地区：${data.country || "未填写"}`,
        `产品需求：${data.product || "未填写"}`,
        `留言：${data.message || "未填写"}`,
        `来源页面：${data.pageUrl || "未知"}`,
      ].join("\n"),
    }),
  });

  if (!response.ok) throw new Error("邮件发送失败");
  return true;
}

async function saveToSupabase(data, env) {
  if (!env.SUPABASE_URL || !env.SUPABASE_SERVICE_ROLE_KEY) return false;

  const response = await fetch(`${env.SUPABASE_URL}/rest/v1/inquiries`, {
    method: "POST",
    headers: {
      apikey: env.SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      name: data.name,
      email: data.email,
      phone: data.phone,
      company: data.company || null,
      country: data.country || null,
      product: data.product || null,
      message: data.message || null,
      page_url: data.pageUrl || null,
    }),
  });

  if (!response.ok) throw new Error("数据库写入失败");
  return true;
}

export default async function handler(request, context = {}) {
  if (request.method !== "POST") return json(405, { message: "仅支持 POST 请求。" });

  const env = context.env || globalThis.process?.env || {};
  const body = await request.json().catch(() => ({}));
  const data = {
    name: clean(body.name, 120),
    email: clean(body.email, 180),
    phone: clean(body.phone, 60),
    company: clean(body.company, 180),
    country: clean(body.country, 120),
    product: clean(body.product, 180),
    message: clean(body.message, 2000),
    website: clean(body.website, 200),
    formStartedAt: Number(body.formStartedAt || 0),
    pageUrl: clean(body.pageUrl, 500),
  };

  if (data.website) return json(200, { message: "提交成功。" });
  if (!data.name || !data.email || !data.phone) {
    return json(400, { message: "请填写姓名、邮箱和电话。" });
  }
  if (!EMAIL_PATTERN.test(data.email)) return json(400, { message: "邮箱格式不正确。" });
  if (!PHONE_PATTERN.test(data.phone)) return json(400, { message: "电话格式不正确。" });
  if (!data.formStartedAt || Date.now() - data.formStartedAt < 2500) {
    return json(429, { message: "提交速度过快，请稍后重试。" });
  }

  if (env.TURNSTILE_SECRET_KEY) {
    const verification = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          secret: env.TURNSTILE_SECRET_KEY,
          response: clean(body.turnstileToken, 2048),
        }),
      },
    ).then((response) => response.json());

    if (!verification.success) return json(400, { message: "验证码验证失败。" });
  }

  try {
    const [emailed, stored] = await Promise.all([
      sendEmail(data, env),
      saveToSupabase(data, env),
    ]);

    if (!emailed && !stored) {
      return json(503, {
        message: "询盘接口尚未配置收件邮箱或数据库，请联系网站管理员。",
      });
    }

    return json(200, { message: "提交成功。我们的业务团队会尽快与您联系。" });
  } catch {
    return json(502, { message: "提交失败，请稍后重试或通过其他方式联系我们。" });
  }
}
