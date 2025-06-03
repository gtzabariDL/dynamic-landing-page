import type { PropsWithChildren } from "react";
import { Helmet } from "react-helmet-async";

interface WithScriptLoad {
  onScriptLoad: VoidFunction;
  scriptSrc: string;
}

interface WithoutScriptLoad {
  onScriptLoad?: never;
  scriptSrc?: never;
}

export type EventHelmetProps = WithScriptLoad | WithoutScriptLoad;

export const EventHelmet = ({ onScriptLoad, scriptSrc, children }: PropsWithChildren<EventHelmetProps>) => (
  <Helmet
    onChangeClientState={(_, addedTags) => {
      if (!onScriptLoad || !scriptSrc || !addedTags?.scriptTags) {
        return;
      }

      const scriptTag = addedTags.scriptTags.find((tag) => tag.getAttribute("src") === scriptSrc);
      if (!scriptTag) {
        return;
      }

      scriptTag.onload = onScriptLoad;
    }}
  >
    {children}
  </Helmet>
);
