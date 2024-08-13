import Icons from "./icons";
import Buttons from "./buttons";
import Loader from "~/components/loader";
import { Typography } from "~/components/typography";
import Typographies from "./typographies";

export default function StyleGuidePage() {
  return (
    <main className="flex min-h-screen flex-col bg-background text-white">
      <div className="container flex flex-col gap-4 px-4 py-16">
        <Typography as="h1">Style guide</Typography>
        <div className="mt-4 flex flex-row items-center gap-4">
          <Typography as="h2">Loader :</Typography>
          <Loader />
          <Loader className="loader-white" />
        </div>
        <Typographies />
        <Buttons />
        <Icons />
      </div>
    </main>
  );
}
