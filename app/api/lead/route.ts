import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const runtime = 'nodejs';

// ---- Branded email helpers ----
const BIZ = 'Kevin Hatcher Excavation';
const PHONE = '(208) 920-3352';
const PHONE_TEL = '+12089203352';
const BRAND = '#f6991e';
const INK = '#363636';

const esc = (s: string) =>
  (s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Bulletproof (Outlook-safe) button used for the phone/email CTAs.
function emailButton(href: string, label: string): string {
  return (
    `<table role="presentation" border="0" cellspacing="0" cellpadding="0" style="margin:4px auto;"><tr>` +
    `<td align="center" bgcolor="${BRAND}" style="border-radius:8px;">` +
    `<a href="${href}" style="display:inline-block;padding:14px 30px;font-family:Arial,Helvetica,sans-serif;font-size:16px;font-weight:bold;color:#ffffff;text-decoration:none;border-radius:8px;">${label}</a>` +
    `</td></tr></table>`
  );
}

// Wraps body content in the branded card (amber top bar, header, charcoal footer).
function emailShell(title: string, bodyHtml: string): string {
  return (
    `<!DOCTYPE html><html><body style="margin:0;padding:0;background:#f4f2ec;">` +
    `<table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background:#f4f2ec;padding:24px 0;"><tr><td align="center">` +
    `<table role="presentation" width="560" border="0" cellspacing="0" cellpadding="0" style="max-width:560px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e8e4da;">` +
    `<tr><td style="height:6px;line-height:6px;font-size:6px;background:${BRAND};">&nbsp;</td></tr>` +
    `<tr><td style="padding:28px 32px 4px;">` +
    `<div style="font-family:Arial,Helvetica,sans-serif;font-size:12px;letter-spacing:1.5px;text-transform:uppercase;color:${BRAND};font-weight:bold;">${BIZ}</div>` +
    `<h1 style="margin:6px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:22px;color:${INK};">${title}</h1>` +
    `</td></tr>` +
    `<tr><td style="padding:14px 32px 28px;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:#4a4a45;">${bodyHtml}</td></tr>` +
    `<tr><td style="padding:18px 32px;background:${INK};font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.6;color:#d6d3cc;">` +
    `${BIZ} &nbsp;&middot;&nbsp; <a href="tel:${PHONE_TEL}" style="color:#ffffff;text-decoration:none;">${PHONE}</a><br>Serving Sandpoint &amp; North Idaho` +
    `</td></tr></table></td></tr></table></body></html>`
  );
}

type LeadBody = {
  name?: string;
  email?: string;
  phone?: string;
  service?: string;
  message?: string;
};

export async function POST(req: Request) {
  let body: LeadBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  const name = (body.name || '').trim();
  const email = (body.email || '').trim();
  const phone = (body.phone || '').trim();
  const service = (body.service || '').trim();
  const message = (body.message || '').trim();

  if (!name || !email) {
    return NextResponse.json({ error: 'Name and email are required.' }, { status: 400 });
  }

  // ---- 1. Save the lead to Supabase ----
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

  let saved = false;
  try {
    if (url && anonKey) {
      const supabase = createClient(url, anonKey);
      const { error } = await supabase
        .from('exc_leads')
        .insert([{ name, email, phone, service, message }]);
      if (!error) saved = true;
    }
  } catch {
    // Swallow — we'll still try email, and report below.
  }

  // ---- 2. Best-effort emails via Resend (only if configured) ----
  const resendKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.LEAD_TO_EMAIL;      // business owner
  const fromEmail = process.env.LEAD_FROM_EMAIL;  // verified sender on your domain

  if (resendKey && toEmail && fromEmail) {
    try {
      const { Resend } = await import('resend');
      const resend = new Resend(resendKey);
      const sender = `${BIZ} <${fromEmail}>`;
      const first = name.split(' ')[0] || 'there';

      // ---- Notification to the business ----
      const custTel = phone.replace(/[^0-9+]/g, '');
      const detailRows = [
        ['Name', esc(name)],
        ['Email', `<a href="mailto:${esc(email)}" style="color:${BRAND};text-decoration:none;">${esc(email)}</a>`],
        ['Phone', phone ? esc(phone) : '—'],
        ['Service', service ? esc(service) : '—'],
      ]
        .map(
          ([k, v]) =>
            `<tr><td style="padding:8px 12px 8px 0;color:#8a8577;vertical-align:top;white-space:nowrap;">${k}</td>` +
            `<td style="padding:8px 0;color:${INK};font-weight:bold;">${v}</td></tr>`
        )
        .join('');
      const notifyCta = custTel
        ? emailButton(`tel:${custTel}`, `📞 Call ${esc(first)}`)
        : emailButton(`mailto:${esc(email)}`, `✉️ Email ${esc(first)}`);
      const notifyBody =
        `<p style="margin:0 0 16px;">You have a new quote request from the website:</p>` +
        `<table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="border-top:1px solid #e8e4da;border-bottom:1px solid #e8e4da;margin-bottom:18px;">${detailRows}</table>` +
        `<div style="color:#8a8577;margin:0 0 4px;">Message</div>` +
        `<div style="margin:0 0 22px;color:${INK};">${message ? esc(message).replace(/\n/g, '<br>') : '—'}</div>` +
        notifyCta;

      await resend.emails.send({
        from: sender,
        to: toEmail,
        replyTo: email,
        subject: `New quote request from ${name}`,
        html: emailShell('New Quote Request', notifyBody),
        text:
          `New lead from the ${BIZ} website:\n\n` +
          `Name: ${name}\nEmail: ${email}\nPhone: ${phone || '—'}\n` +
          `Service: ${service || '—'}\n\nMessage:\n${message || '—'}`,
      });

      // ---- Confirmation to the customer ----
      const confirmBody =
        `<p style="margin:0 0 16px;">Hi ${esc(first)},</p>` +
        `<p style="margin:0 0 16px;">Thanks for reaching out to ${BIZ}! We&rsquo;ve received your request and will get back to you shortly with a free quote.</p>` +
        `<p style="margin:0 0 18px;">Need to reach us sooner? Give us a call:</p>` +
        emailButton(`tel:${PHONE_TEL}`, `📞 Call ${PHONE}`) +
        `<p style="margin:22px 0 0;color:#8a8577;font-size:14px;">We look forward to working with you.</p>`;

      await resend.emails.send({
        from: sender,
        to: email,
        subject: `We got your request — ${BIZ}`,
        html: emailShell('Thanks for Reaching Out!', confirmBody),
        text:
          `Hi ${first},\n\n` +
          `Thanks for reaching out to ${BIZ}. We've received your request and will get ` +
          `back to you shortly with a free quote.\n\nCall us: ${PHONE}\n\n— ${BIZ}`,
      });
    } catch {
      // Email failed — that's fine, the lead is what matters.
    }
  }

  // As long as we saved OR email is off, treat as success so the form still works
  // during early setup. If nothing at all is configured, still return ok so the
  // customer isn't blocked — but log server-side.
  if (!saved && !(url && anonKey)) {
    console.warn('Lead received but Supabase env vars are not set yet.');
  }

  return NextResponse.json({ ok: true, saved });
}
