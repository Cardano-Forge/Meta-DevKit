import { IconProps } from ".";

export default function NextIcon({ className }: IconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M14.4697 3.46967C14.7626 3.17678 15.2374 3.17678 15.5303 3.46967L21.5303 9.46967C21.8232 9.76256 21.8232 10.2374 21.5303 10.5303L15.5303 16.5303C15.2374 16.8232 14.7626 16.8232 14.4697 16.5303C14.1768 16.2374 14.1768 15.7626 14.4697 15.4697L19.1893 10.75H11C9.08305 10.75 7.17884 11.4818 5.83033 12.8303C4.48182 14.1788 3.75 16.083 3.75 18V20C3.75 20.4142 3.41421 20.75 3 20.75C2.58579 20.75 2.25 20.4142 2.25 20V18C2.25 15.717 3.11818 13.4212 4.76967 11.7697C6.42116 10.1182 8.71695 9.25 11 9.25H19.1893L14.4697 4.53033C14.1768 4.23744 14.1768 3.76256 14.4697 3.46967Z"
        fill="currentColor"
      />
    </svg>
  );
}
