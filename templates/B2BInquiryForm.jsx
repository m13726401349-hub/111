import { useRef, useState } from "react";

const initialValues = {
  name: "",
  email: "",
  phone: "",
  company: "",
  country: "",
  product: "",
  message: "",
  website: "",
  consent: false,
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const phonePattern = /^\+?[0-9][0-9\s().-]{6,19}$/;

export default function B2BInquiryForm({ endpoint = "/api/inquiry" }) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const startedAt = useRef(Date.now());

  const validate = () => {
    const next = {};
    if (!values.name.trim()) next.name = "请填写姓名。";
    if (!values.email.trim()) next.email = "请填写邮箱。";
    else if (!emailPattern.test(values.email)) next.email = "请输入有效邮箱。";
    if (!values.phone.trim()) next.phone = "请填写电话。";
    else if (!phonePattern.test(values.phone)) next.phone = "请输入有效国际电话。";
    if (!values.consent) next.consent = "请勾选信息处理同意项。";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const update = (event) => {
    const { name, value, type, checked } = event.target;
    setValues((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const submit = async (event) => {
    event.preventDefault();
    if (!validate()) {
      setStatus({ type: "error", message: "请完成必填项并修正格式。" });
      return;
    }

    setSubmitting(true);
    setStatus({ type: "info", message: "正在提交，请稍候…" });
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          formStartedAt: startedAt.current,
          pageUrl: window.location.href,
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message);
      setValues(initialValues);
      setErrors({});
      startedAt.current = Date.now();
      setStatus({ type: "success", message: result.message });
    } catch (error) {
      setStatus({ type: "error", message: error.message || "提交失败，请稍后重试。" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="inquiry-form inquiry-form-premium" onSubmit={submit} noValidate>
      <div className="form-grid">
        <Field label="姓名" required error={errors.name}>
          <input name="name" value={values.name} onChange={update} placeholder="请输入您的姓名" />
        </Field>
        <Field label="邮箱" required error={errors.email}>
          <input name="email" type="email" value={values.email} onChange={update} placeholder="name@company.com" />
        </Field>
        <Field label="电话" required error={errors.phone}>
          <input name="phone" type="tel" value={values.phone} onChange={update} placeholder="+86 138 0000 0000" />
        </Field>
        <Field label="公司名称">
          <input name="company" value={values.company} onChange={update} placeholder="请输入公司或组织名称" />
        </Field>
        <Field label="国家 / 地区">
          <input name="country" value={values.country} onChange={update} placeholder="例如：中国、德国、阿联酋" />
        </Field>
        <Field label="产品需求">
          <input name="product" value={values.product} onChange={update} placeholder="例如：阻燃 PA66" />
        </Field>
        <Field label="留言" full>
          <textarea name="message" value={values.message} onChange={update} maxLength={2000} placeholder="请描述应用与性能需求" />
        </Field>
      </div>
      <input className="honeypot" name="website" value={values.website} onChange={update} tabIndex={-1} autoComplete="off" />
      <label className="consent-row">
        <input name="consent" type="checkbox" checked={values.consent} onChange={update} />
        <span>我同意为回复询盘而处理以上信息。 <strong>*</strong></span>
      </label>
      {errors.consent && <span className="field-error">{errors.consent}</span>}
      <button className="btn form-submit" disabled={submitting} type="submit">
        {submitting ? "正在提交…" : "提交询盘"}
      </button>
      {status.message && <div className={`form-status is-${status.type}`}>{status.message}</div>}
    </form>
  );
}

function Field({ label, required, error, full, children }) {
  return (
    <div className={`field${full ? " field-full" : ""}${error ? " has-error" : ""}`}>
      <label>{label} {required && <span className="required-mark">*</span>}</label>
      {children}
      <span className="field-error">{error || ""}</span>
    </div>
  );
}
