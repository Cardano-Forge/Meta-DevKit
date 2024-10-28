"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { type RxDocument } from "rxdb";
import { useRxData } from "rxdb-hooks";

import Loader from "~/components/loader";
import { type ProjectCollection } from "~/lib/types";

const ActiveProjectContext = React.createContext<
  RxDocument<ProjectCollection> | undefined
>(undefined);

export const useActiveProject = () => {
  return React.useContext(ActiveProjectContext);
};

export const ActiveProjectProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const pathname = usePathname();
  const router = useRouter();

  const { result, isFetching } = useRxData<ProjectCollection>(
    "project",
    (collection) => collection.find(),
  );

  if (isFetching)
    return (
      <main className="container flex h-[100vh] flex-wrap place-content-center">
        <Loader />
      </main>
    );

  if (pathname === "/" && !!result[0]?.id) router.push("/metadata-structure"); // On "/" and as active project ~> "/metadata-structure"

  if (pathname !== "/" && !result[0]) router.push("/"); // On "/:any" and as no active project ~> "/""

  if (result[0])
    return (
      <ActiveProjectContext.Provider value={result[0]}>
        {children}
      </ActiveProjectContext.Provider>
    );
  else return children;
};
