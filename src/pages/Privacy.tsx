import { Link } from "react-router-dom";
import LegalLayout from "./LegalLayout";

const sections = [
  {
    title: "1. Who we are",
    body: (
      <>
        Gitmate is a developer networking and collaboration platform available at{" "}
        <a className="underline underline-offset-4" href="https://gitmate.org">gitmate.org</a>.
        This Privacy Policy explains how Gitmate collects, uses, stores, and discloses
        information when you use the platform.
      </>
    ),
  },
  {
    title: "2. Information we collect",
    body: (
      <>
        <p className="mb-3">Depending on the features you use, Gitmate may collect:</p>
        <ul className="list-disc space-y-2 pl-6">
          <li><strong>Account and sign-in information:</strong> information returned by your sign-in provider, such as your name, email address, and profile image, where those fields are made available and you authorize access.</li>
          <li><strong>Developer profile information:</strong> information you choose to add, such as your bio, skills, interests, experience, and collaboration preferences.</li>
          <li><strong>GitHub information:</strong> public profile and contribution information, and any additional GitHub data you explicitly authorize Gitmate to access when you connect GitHub. The specific data available depends on the permissions you grant.</li>
          <li><strong>Platform activity:</strong> profile views, recommendations, matches, interactions, and basic technical logs needed to operate and secure the service.</li>
          <li><strong>Messages:</strong> messages and related metadata when you use Gitmate's communication features.</li>
          <li><strong>Support communications:</strong> information you provide when you contact us for help.</li>
        </ul>
      </>
    ),
  },
  {
    title: "3. Information from Google sign-in",
    body: (
      <>
        If you sign in with Google, Gitmate receives the information permitted by the Google
        sign-in flow and the permissions you grant. This may include your basic account
        identifier, name, email address, and profile picture. We use this information to
        authenticate you, create or maintain your account, associate your sign-in with your
        account, and help protect the service from misuse.
        <p className="mt-3">
          Gitmate does not sell Google user data. We do not use Google user data for
          advertising, and we do not transfer it to third parties except as needed to provide
          the service, comply with law, protect users, or as described in this policy.
          We do not use Google user data to develop, improve, or train generalized AI or
          machine-learning models.
        </p>
      </>
    ),
  },
  {
    title: "4. How we use information",
    body: (
      <ul className="list-disc space-y-2 pl-6">
        <li>Create, authenticate, and manage your account.</li>
        <li>Display your developer profile and help you discover relevant developers.</li>
        <li>Generate profile recommendations and matches based on available profile, skills, interests, and developer information.</li>
        <li>Enable communication between users who connect through the platform.</li>
        <li>Operate, maintain, troubleshoot, and secure Gitmate.</li>
        <li>Respond to support requests and communicate important service or policy changes.</li>
        <li>Meet legal obligations and enforce our Terms of Service.</li>
      </ul>
    ),
  },
  {
    title: "5. Legal bases and choices",
    body: (
      <>
        Where applicable law requires a legal basis, we process information to provide the
        service you request, based on your consent where applicable, to pursue legitimate
        interests such as security and service reliability, and to comply with legal
        obligations. You can choose what optional profile information to provide and can
        stop using connected-provider features by revoking access through that provider.
      </>
    ),
  },
  {
    title: "6. How we share information",
    body: (
      <>
        <p className="mb-3">We may disclose information in these limited circumstances:</p>
        <ul className="list-disc space-y-2 pl-6">
          <li><strong>With other Gitmate users:</strong> profile information you make available and messages or interactions you choose to send.</li>
          <li><strong>Service providers:</strong> vendors that host, store, secure, or operate parts of Gitmate, only as needed to provide those services.</li>
          <li><strong>Legal and safety reasons:</strong> where disclosure is reasonably necessary to comply with law, respond to valid legal process, protect rights or safety, or investigate abuse.</li>
          <li><strong>Business changes:</strong> in connection with a merger, acquisition, or transfer of the service, subject to appropriate safeguards and applicable law.</li>
        </ul>
        <p className="mt-3">We do not sell personal information. We do not share Google user data with third parties for their own advertising purposes.</p>
      </>
    ),
  },
  {
    title: "7. Storage, security, and retention",
    body: (
      <>
        Gitmate uses technical and organizational measures intended to protect information.
        No method of transmission or storage is completely secure, and we cannot guarantee
        absolute security. We retain information for as long as needed to provide the
        service, maintain legitimate business records, resolve disputes, enforce agreements,
        and meet legal obligations. Retention periods vary by information type and purpose.
      </>
    ),
  },
  {
    title: "8. Your choices and account deletion",
    body: (
      <>
        You may update profile information through available account features. You can
        request access to, correction of, or deletion of personal information by emailing{" "}
        <a className="underline underline-offset-4" href="mailto:abu112abu112abu112@gmail.com">abu112abu112abu112@gmail.com</a>.
        We may need to verify your identity before fulfilling a request. Some information
        may be retained where required by law or for legitimate security, dispute-resolution,
        or recordkeeping purposes. You can also revoke Google access from your Google
        Account's third-party connections settings; revocation does not automatically delete
        information already stored by Gitmate, so contact us separately if you want it deleted.
      </>
    ),
  },
  {
    title: "9. Cookies and technical data",
    body: (
      <>
        Gitmate may use cookies or similar technologies that are necessary for sign-in,
        session management, security, preferences, and core site functionality. Your browser
        may allow you to block cookies, but some features may not work correctly if you do.
        Server logs may include technical information such as timestamps, request details,
        and error records used for reliability and security.
      </>
    ),
  },
  {
    title: "10. International processing",
    body: (
      <>
        Your information may be processed in countries other than the country where you
        live, depending on where Gitmate and its service providers operate. Where required,
        we take steps intended to provide appropriate safeguards for international transfers.
      </>
    ),
  },
  {
    title: "11. Children's privacy",
    body: (
      <>
        Gitmate is intended for users who are at least 18 years old, or the age of majority
        where they live if higher. We do not knowingly collect personal information from
        children. If you believe a child has provided personal information, contact us so we
        can review and take appropriate action.
      </>
    ),
  },
  {
    title: "12. Changes to this policy",
    body: (
      <>
        We may update this Privacy Policy as Gitmate changes. We will update the date below
        when changes are made. If a change materially affects how information is handled,
        we will provide notice through the platform or another appropriate method where
        required by law.
      </>
    ),
  },
  {
    title: "13. Contact us",
    body: (
      <>
        Questions or privacy requests can be sent to{" "}
        <a className="underline underline-offset-4" href="mailto:abu112abu112abu112@gmail.com">abu112abu112abu112@gmail.com</a>.
      </>
    ),
  },
];

export default function Privacy() {
  return <LegalLayout kind="privacy" sections={sections} />;
}
