import type { IconProps } from ".";

export default function NoteIcon({ className }: IconProps) {
  return (
    <svg
      width="20"
      height="18"
      viewBox="0 0 20 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M3 1.75C2.66848 1.75 2.35054 1.8817 2.11612 2.11612C1.8817 2.35054 1.75 2.66848 1.75 3V11C1.75 11.3315 1.8817 11.6495 2.11612 11.8839C2.35054 12.1183 2.66848 12.25 3 12.25H6C6.19891 12.25 6.38968 12.329 6.53033 12.4697L10 15.9393L13.4697 12.4697C13.6103 12.329 13.8011 12.25 14 12.25H17C17.3315 12.25 17.6495 12.1183 17.8839 11.8839C18.1183 11.6495 18.25 11.3315 18.25 11V3C18.25 2.66848 18.1183 2.35054 17.8839 2.11612C17.6495 1.8817 17.3315 1.75 17 1.75H3ZM1.05546 1.05546C1.57118 0.539731 2.27065 0.25 3 0.25H17C17.7293 0.25 18.4288 0.539731 18.9445 1.05546C19.4603 1.57118 19.75 2.27065 19.75 3V11C19.75 11.7293 19.4603 12.4288 18.9445 12.9445C18.4288 13.4603 17.7293 13.75 17 13.75H14.3107L10.5303 17.5303C10.2374 17.8232 9.76256 17.8232 9.46967 17.5303L5.68934 13.75H3C2.27065 13.75 1.57118 13.4603 1.05546 12.9445C0.539731 12.4288 0.25 11.7293 0.25 11V3C0.25 2.27065 0.539731 1.57118 1.05546 1.05546ZM4.25 5C4.25 4.58579 4.58579 4.25 5 4.25H15C15.4142 4.25 15.75 4.58579 15.75 5C15.75 5.41421 15.4142 5.75 15 5.75H5C4.58579 5.75 4.25 5.41421 4.25 5ZM4.25 9C4.25 8.58579 4.58579 8.25 5 8.25H9C9.41421 8.25 9.75 8.58579 9.75 9C9.75 9.41421 9.41421 9.75 9 9.75H5C4.58579 9.75 4.25 9.41421 4.25 9Z"
        fill="currentColor"
      />
    </svg>
  );
}
