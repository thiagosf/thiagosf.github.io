import { Signature } from '../../shared/Signature'
import { ContactLinkCard } from './ContactLinkCard'
import type { ContactSectionProps } from './types'

export function ContactSection({
  contactLinks,
  onLinkClick,
}: ContactSectionProps) {
  return (
    <section id="contact" className="contact-section page-width">
      <p className="eyebrow">04 / Contact</p>
      <div className="contact-heading">
        <h2>
          Something in mind?
          <br />
          Let’s make it real.
        </h2>
        <Signature />
      </div>
      <div className="contact-bottom">
        <p>
          Have a project, an interesting challenge,
          <br />
          or just want to say hello? I’m all ears.
        </p>
        <div className="contact-links">
          {contactLinks?.length ? (
            contactLinks.map((link, index) => (
              <ContactLinkCard
                key={link.id}
                link={link}
                index={index}
                isVisible
                onLinkClick={onLinkClick}
              />
            ))
          ) : (
            <p>No contact information provided.</p>
          )}
        </div>
      </div>
    </section>
  )
}
