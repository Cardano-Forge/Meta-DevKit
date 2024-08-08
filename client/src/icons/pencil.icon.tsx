import type { IconProps } from ".";

export default function PencilIcon({ className }: IconProps) {
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
        d="M18.5 3.74966C18.0358 3.74966 17.5906 3.93407 17.2623 4.26232L16.2927 5.23199L18.768 7.70733L19.7377 6.73766C20.0659 6.40941 20.2503 5.96421 20.2503 5.49999C20.2503 5.03578 20.0659 4.59057 19.7377 4.26232C19.4094 3.93407 18.9642 3.74966 18.5 3.74966ZM20.7983 7.79832C21.4079 7.18877 21.7503 6.36204 21.7503 5.49999C21.7503 4.63795 21.4079 3.81122 20.7983 3.20166C20.1888 2.59211 19.362 2.24966 18.5 2.24966C17.638 2.24966 16.8112 2.59211 16.2017 3.20166L14.7021 4.70119C14.702 4.70135 14.7023 4.70103 14.7021 4.70119C14.702 4.70135 14.7014 4.70198 14.7012 4.70214L2.46967 16.9337C2.32902 17.0743 2.25 17.2651 2.25 17.464V21.036C2.25 21.4502 2.58579 21.786 3 21.786H6.5C6.69891 21.786 6.88968 21.707 7.03033 21.5663L20.7983 7.79832ZM17.7073 8.76799L15.232 6.29265L3.75 17.7747V20.286H6.18934L17.7073 8.76799Z"
        fill="currentColor"
      />
    </svg>
  );
}
