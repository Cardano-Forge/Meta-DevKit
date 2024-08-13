import type { IconProps } from ".";

export default function SummaryIcon({ className }: IconProps) {
  return (
    <svg
      width="16"
      height="20"
      viewBox="0 0 16 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3 1.75C2.66848 1.75 2.35054 1.8817 2.11612 2.11612C1.8817 2.35054 1.75 2.66848 1.75 3V17C1.75 17.3315 1.8817 17.6495 2.11612 17.8839C2.35054 18.1183 2.66848 18.25 3 18.25H13C13.3315 18.25 13.6495 18.1183 13.8839 17.8839C14.1183 17.6495 14.25 17.3315 14.25 17V7.41416C14.25 7.41411 14.25 7.41421 14.25 7.41416C14.2499 7.34792 14.2236 7.28424 14.1768 7.23741L8.76267 1.82333C8.71584 1.77648 8.65224 1.75006 8.586 1.75C8.58595 1.75 8.58605 1.75 8.586 1.75H3ZM1.05546 1.05546C1.57118 0.539731 2.27065 0.25 3 0.25H8.586C9.05005 0.250099 9.49523 0.434509 9.82333 0.76267M9.82333 0.76267L15.2373 6.17659C15.2372 6.17656 15.2373 6.17662 15.2373 6.17659C15.5654 6.50469 15.7499 6.94979 15.75 7.41384V17C15.75 17.7293 15.4603 18.4288 14.9445 18.9445C14.4288 19.4603 13.7293 19.75 13 19.75H3C2.27065 19.75 1.57118 19.4603 1.05546 18.9445C0.539731 18.4288 0.25 17.7293 0.25 17V3C0.25 2.27065 0.539731 1.57118 1.05546 1.05546M11 8.25C11.4142 8.25 11.75 8.58579 11.75 9V15C11.75 15.4142 11.4142 15.75 11 15.75C10.5858 15.75 10.25 15.4142 10.25 15V9C10.25 8.58579 10.5858 8.25 11 8.25ZM8 10.25C8.41421 10.25 8.75 10.5858 8.75 11V15C8.75 15.4142 8.41421 15.75 8 15.75C7.58579 15.75 7.25 15.4142 7.25 15V11C7.25 10.5858 7.58579 10.25 8 10.25ZM5 12.25C5.41421 12.25 5.75 12.5858 5.75 13V15C5.75 15.4142 5.41421 15.75 5 15.75C4.58579 15.75 4.25 15.4142 4.25 15V13C4.25 12.5858 4.58579 12.25 5 12.25Z"
        fill="currentColor"
      />
    </svg>
  );
}