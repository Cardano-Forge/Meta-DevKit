import { JsonEditor } from "json-edit-react";
import React from "react";
import { useRxData } from "rxdb-hooks";

import { StepComponent, StepHeader } from "./step-components";
import LoaderComponent from "~/components/loader-component";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import ValuesIcon from "~/icons/values.icon";
import { getAttributesDistributions } from "~/lib/get/get-attributes-distributions";
import { jerTheme } from "~/lib/json-editor";
import type { MetadataSchemaCollection, MetadataCollection } from "~/lib/types";

export default function MetadataStructure() {
  const { result, isFetching } = useRxData<MetadataCollection>(
    "metadata",
    (collection) => collection.find(),
  );

  const { result: schemaResult, isFetching: isFetchingSchema } =
    useRxData<MetadataSchemaCollection>("metadataSchema", (collection) =>
      collection.find(),
    );

  if (isFetching || isFetchingSchema) return <LoaderComponent />;

  const metadatas: MetadataCollection[] = result.map(
    (doc) => doc.toJSON() as MetadataCollection,
  );

  const schema: MetadataSchemaCollection | undefined = schemaResult.map(
    (doc) => doc.toJSON() as MetadataSchemaCollection,
  )[0];

  if (!schema || !metadatas) return <div>No data found.</div>;

  const distribution = getAttributesDistributions(metadatas, schema);

  return (
    <StepComponent>
      <StepHeader title="Metadata strucutre" />
      <Accordion type="single" collapsible>
        <AccordionItem value="distribution">
          <AccordionTrigger className="hover:no-underline">
            <div className="ml-2 flex flex-row items-center gap-4 text-white/60">
              <div className="items-center justify-center rounded-full border border-white/60 p-2">
                <ValuesIcon className="h-4 w-4" />
              </div>
              {`Value's distribution`}
            </div>
          </AccordionTrigger>
          <AccordionContent className="rounded-xl bg-card p-1">
            <JsonEditor
              data={distribution}
              theme={jerTheme}
              rootFontSize={18}
              minWidth={"100%"}
              collapse={1}
              enableClipboard={false} // Disabled copy to clipboard
              restrictEdit={() => true} // Disabled edit
              restrictAdd={() => true} // Disabled add
              restrictDelete={() => true} // Disabled delete
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </StepComponent>
  );
}
