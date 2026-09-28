// Section heading in the site's style, e.g. "Here Come the Experts!".
// `squiggle` is the trailing word(s) that get the hand-drawn underline.
// Heading level comes from `as` (default h2); size always from classes.
export default function SectionHeading({ as: Tag = 'h2', squiggle, className = '', children }) {
  return (
    <Tag
      className={`font-raleway font-medium text-[56px] leading-[65px] sm:text-[24px] sm:leading-[32px] ${className}`}
    >
      {children}
      {squiggle ? (
        <span className="relative inline-block ml-4 sm:ml-2">
          {squiggle}
          <img
            src="/Experts/squiggly_line.svg"
            alt=""
            aria-hidden="true"
            className="absolute left-1/2 -translate-x-1/2 w-[100%] -mt-2 sm:hidden"
          />
        </span>
      ) : null}
    </Tag>
  );
}
