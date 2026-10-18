import { Link } from "react-router-dom";
import LegalLayout from "./LegalLayout";

const sections = [
  {
    title: "1. Agreement to these terms",
    body: (
      <>
        These Terms of Service ("Terms") govern your access to and use of Gitmate at{" "}
        <a className="underline underline-offset-4" href="https://gitmate.org">gitmate.org</a>
        {" "}and its related features. By creating an account or using Gitmate, you agree to
        these Terms. If you do not agree, do not use the service.
      </>
    ),
  },
  {
    title: "2. About Gitmate",
    body: (
      <>
        Gitmate is a developer networking and collaboration platform designed to help users
        discover developers, view developer profiles, receive recommendations, connect, and
        communicate. Features may change, be added, or be discontinued over time.
      </>
    ),
  },
  {
    title: "3. Eligibility and accounts",
    body: (
      <>
        You must be at least 18 years old, or the age of majority where you live if higher,
        to use Gitmate. You must provide accurate information, keep your account credentials
        secure, and promptly notify us if you believe your account has been accessed without
        permission. You are responsible for activity that occurs through your account,
        except to the extent applicable law provides otherwise.
      </>
    ),
  },
  {
    title: "4. Acceptable use",
    body: (
      <>
        You agree not to:
        <ul className="mt-3 list-disc space-y-2 pl-6">
          <li>Use Gitmate for unlawful, fraudulent, abusive, threatening, or harassing conduct.</li>
          <li>Impersonate another person or misrepresent your identity, skills, affiliations, or experience.</li>
          <li>Scrape, harvest, or collect information about users without authorization.</li>
          <li>Attempt to bypass security, access accounts or systems without permission, or interfere with the platform.</li>
          <li>Upload malware, spam users, or send unsolicited or deceptive communications.</li>
          <li>Use Gitmate in a way that infringes another person's intellectual-property, privacy, or other rights.</li>
          <li>Use automated access methods that place unreasonable load on the service or violate applicable rules.</li>
        </ul>
      </>
    ),
  },
  {
    title: "5. Your content and profile",
    body: (
      <>
        You retain rights you have in content you submit, subject to rights you have granted
        to others and applicable law. You give Gitmate a limited, non-exclusive permission
        to host, store, reproduce, display, and process your submitted content as reasonably
        necessary to operate, secure, and provide the service. You are responsible for
        ensuring that you have the rights needed to submit your content. You should not
        publish confidential information or information you do not want other users to see.
      </>
    ),
  },
  {
    title: "6. Third-party services",
    body: (
      <>
        Gitmate may allow you to sign in with Google or connect to third-party services such
        as GitHub. Those services are governed by their own terms and privacy policies.
        Gitmate is not responsible for third-party services, their availability, or changes
        they make. You are responsible for reviewing and complying with the terms that apply
        to your use of those services.
      </>
    ),
  },
  {
    title: "7. Recommendations and connections",
    body: (
      <>
        Gitmate may use information such as profile details, skills, interests, and available
        developer activity to suggest profiles or connections. Recommendations are provided
        to help users discover potential collaborators; they are not guarantees of a user's
        identity, qualifications, conduct, compatibility, or future performance. You are
        responsible for evaluating people you interact with and exercising appropriate care.
      </>
    ),
  },
  {
    title: "8. Messages and interactions",
    body: (
      <>
        You are responsible for the messages and content you send to other users. Do not use
        messaging features for harassment, fraud, spam, threats, or unlawful activity.
        Avoid sharing passwords, financial details, private credentials, or other sensitive
        information through messages. We may investigate reports of misuse and take action
        consistent with these Terms and applicable law.
      </>
    ),
  },
  {
    title: "9. Intellectual property",
    body: (
      <>
        Gitmate and its original software, branding, design, and other materials are owned
        by Gitmate or its licensors and are protected by applicable laws. These Terms grant
        you a limited, revocable, non-transferable right to use the service for its intended
        purpose. You may not copy, modify, distribute, reverse engineer, or create derivative
        works from the service except where applicable law permits or we authorize it in writing.
      </>
    ),
  },
  {
    title: "10. Feedback",
    body: (
      <>
        If you send suggestions or feedback, you permit Gitmate to use them without
        restriction or compensation to you, provided this does not limit rights that cannot
        be waived under applicable law.
      </>
    ),
  },
  {
    title: "11. Availability and changes",
    body: (
      <>
        We aim to keep Gitmate available and reliable, but we do not guarantee uninterrupted,
        error-free, or secure operation. We may modify, suspend, or discontinue features,
        including for maintenance, security, legal, or operational reasons.
      </>
    ),
  },
  {
    title: "12. Suspension and termination",
    body: (
      <>
        You may stop using Gitmate at any time and may request account deletion using the
        contact details below. We may restrict, suspend, or terminate access if we reasonably
        believe you have violated these Terms, created risk for users or the service, or if
        we are required to do so by law. Where appropriate and lawful, we may provide notice.
        Sections that by their nature should continue after termination will survive.
      </>
    ),
  },
  {
    title: "13. Disclaimers",
    body: (
      <>
        To the extent permitted by law, Gitmate is provided "as is" and "as available,"
        without warranties of any kind, express or implied. We do not warrant that profiles,
        third-party data, recommendations, or user-submitted information are accurate,
        complete, current, or reliable. Nothing in these Terms excludes warranties or rights
        that cannot lawfully be excluded.
      </>
    ),
  },
  {
    title: "14. Limitation of liability",
    body: (
      <>
        To the maximum extent permitted by applicable law, Gitmate and its operators will not
        be liable for indirect, incidental, special, consequential, exemplary, or punitive
        damages, or loss of data, profits, goodwill, or business opportunities arising from
        your use of the service. Nothing in these Terms limits liability where such limitation
        is prohibited by law. Any other limitation applies only to the extent permitted by
        the law that governs the claim.
      </>
    ),
  },
  {
    title: "15. Indemnity",
    body: (
      <>
        To the extent permitted by law, you agree to be responsible for claims, losses, and
        reasonable expenses arising from your unlawful use of Gitmate, your content, or your
        material violation of these Terms, except to the extent caused by our own unlawful
        conduct or where such responsibility cannot legally be imposed on you.
      </>
    ),
  },
  {
    title: "16. Privacy",
    body: (
      <>
        Our collection and use of personal information is described in the{" "}
        <Link className="underline underline-offset-4" to="/privacy">Privacy Policy</Link>.
        By using Gitmate, you acknowledge that you have had the opportunity to read it.
      </>
    ),
  },
  {
    title: "17. Changes to these Terms",
    body: (
      <>
        We may update these Terms from time to time. We will change the "Last updated" date
        when an update is made. Where required by law, we will provide notice of material
        changes. Continued use after revised Terms take effect means you accept the revised
        Terms to the extent permitted by law.
      </>
    ),
  },
  {
    title: "18. Governing law",
    body: (
      <>
        These Terms are subject to the laws that apply to the operator of Gitmate and the
        user's location, without limiting mandatory consumer protections that apply to you.
        Before publishing, the operator should specify the appropriate governing-law
        jurisdiction and dispute-resolution venue with qualified legal advice.
      </>
    ),
  },
  {
    title: "19. Contact",
    body: (
      <>
        Questions about these Terms or requests relating to your account can be sent to{" "}
        <a className="underline underline-offset-4" href="mailto:abu112abu112abu112@gmail.com">abu112abu112abu112@gmail.com</a>.
      </>
    ),
  },
];

export default function TermsOfService() {
  return <LegalLayout kind="terms" sections={sections} />;
}
